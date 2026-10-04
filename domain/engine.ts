import type {
  BusinessContext,
  BudgetEvent,
  DailyRow,
  Decision,
  Evidence,
  Implementation,
  ImportData,
  Recommendation,
  Snapshot,
  WindowMetrics,
} from "./types";
export const POLICY_VERSION = "candidate-2026-10-04-v1";
const round = (x: number) => Math.round(x * 100) / 100;
const money = (x: number, currency = "INR") =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(x);
const shift = (s: string, n: number) =>
  new Date(Date.parse(s + "T00:00:00Z") + n * 86400000)
    .toISOString()
    .slice(0, 10);
export function validateImport(data: ImportData): string[] {
  const issues: string[] = [];
  if (!data.adsets.length) issues.push("Daily ad-set performance is missing.");
  if (!data.ads.length)
    issues.push(
      "Daily ad performance is missing; creative evidence cannot be assessed.",
    );
  if (!data.snapshots.length)
    issues.push("Current ad-set settings are missing.");
  if (!/^[A-Z]{3}$/.test(data.currency))
    issues.push("Choose the account currency.");
  try {
    new Intl.DateTimeFormat("en", { timeZone: data.timezone }).format();
  } catch {
    issues.push("Choose a valid account timezone.");
  }
  if (!Number.isFinite(Date.parse(data.fetchedAt)))
    issues.push("A valid source observation time is required.");
  if (data.adsets.length + data.ads.length > 12000)
    issues.push(
      "This import exceeds 12,000 daily records. Split the date range.",
    );
  if (data.snapshots.length > 200 || data.events.length > 1000)
    issues.push("This import exceeds the supported settings/history size.");
  const accountIds = new Set(
    [...data.adsets, ...data.ads].map((x) => x.accountId),
  );
  if (accountIds.size > 1)
    issues.push("Import one advertising account at a time.");
  for (const [kind, rows] of [
    ["Ad-set", data.adsets],
    ["Ad", data.ads],
  ] as const) {
    const seen = new Set<string>();
    rows.forEach((r, index) => {
      const row = index + 2;
      if (
        !/^\d{4}-\d{2}-\d{2}$/.test(r.date) ||
        !Number.isFinite(Date.parse(r.date + "T00:00:00Z")) ||
        shift(r.date, 0) !== r.date
      )
        issues.push(`${kind} row ${row}: invalid date.`);
      if (
        !r.accountId ||
        !r.adsetId ||
        !r.campaignId ||
        !r.adsetName ||
        !r.campaignName ||
        (kind === "Ad" && (!r.adId || !r.adName))
      )
        issues.push(`${kind} row ${row}: missing identity fields.`);
      for (const k of [
        "spend",
        "impressions",
        "clicks",
        "purchases",
        "value",
      ] as const) {
        const val = r[k];
        if (val !== null && (!Number.isFinite(val) || val < 0))
          issues.push(`${kind} row ${row}: invalid ${k}.`);
      }
      const key = `${r.date}:${kind === "Ad" ? r.adId : r.adsetId}`;
      if (seen.has(key))
        issues.push(`${kind} row ${row}: duplicate date and object.`);
      seen.add(key);
    });
  }
  const snapshots = new Set<string>();
  for (const s of data.snapshots) {
    if (snapshots.has(s.adsetId))
      issues.push("Duplicate current ad-set settings.");
    snapshots.add(s.adsetId);
    if (s.budget !== null && (!Number.isFinite(s.budget) || s.budget < 0))
      issues.push("A current budget is invalid.");
    if (!Number.isFinite(Date.parse(s.observedAt)))
      issues.push("A settings observation time is invalid.");
  }
  const identity = new Set(data.adsets.map((x) => x.adsetId));
  if (data.ads.some((x) => !identity.has(x.adsetId)))
    issues.push("Some ads have no matching ad-set daily records.");
  return [...new Set(issues)].slice(0, 30);
}
export function metrics(
  rows: DailyRow[],
  start: string,
  end: string,
): WindowMetrics {
  const selected = rows.filter((x) => x.date >= start && x.date <= end);
  const sum = (
    key: "spend" | "impressions" | "clicks" | "purchases" | "value",
  ) => selected.reduce((t, x) => t + (x[key] ?? 0), 0);
  const missing = (["clicks", "purchases", "value"] as const).filter((k) =>
    selected.some((r) => r[k] === null),
  );
  const spend = sum("spend"),
    impressions = sum("impressions"),
    clicks = missing.includes("clicks") ? null : sum("clicks"),
    purchases = missing.includes("purchases") ? null : sum("purchases"),
    value = missing.includes("value") ? null : sum("value");
  const ratio = (a: number | null, b: number | null) =>
    a !== null && b !== null && b > 0 ? a / b : null;
  return {
    start,
    end,
    days: new Set(selected.map((x) => x.date)).size,
    expectedDays:
      Math.round((Date.parse(end) - Date.parse(start)) / 86400000) + 1,
    spend,
    purchases,
    value,
    roas: ratio(value, spend),
    ctr: ratio(clicks, impressions),
    cpm: ratio(spend * 1000, impressions),
    cvr: ratio(purchases, clicks),
    cpa: ratio(spend, purchases),
    missing,
  };
}
function accountDay(now: Date, tz: string) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: tz,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}
export function assessImport(
  data: ImportData,
  context: BusinessContext,
  options: {
    policyValidated?: boolean;
    demo?: boolean;
    now?: Date;
    priorDecisions?: Decision[];
  } = {},
): Recommendation[] {
  // Production parameters remain unset until the independent operator gate. No caller can turn them into product truth.
  const demo = options.demo === true && data.source === "demo";
  const now = options.now ?? new Date();
  let today: string;
  try {
    today = accountDay(now, data.timezone);
  } catch {
    today = now.toISOString().slice(0, 10);
  }
  const yesterday = shift(today, -1);
  const max =
    data.adsets
      .map((x) => x.date)
      .filter((x) => x < today)
      .sort()
      .at(-1) ?? yesterday;
  const end = max < yesterday ? max : yesterday;
  return data.snapshots.map((s) => {
    const rows = data.adsets.filter((x) => x.adsetId === s.adsetId);
    const recent = metrics(rows, shift(end, -6), end),
      previous = metrics(rows, shift(end, -13), shift(end, -7)),
      recent3 = metrics(rows, shift(end, -2), end),
      previous3 = metrics(rows, shift(end, -5), shift(end, -3));
    const supporting: string[] = [],
      contradicting: string[] = [],
      missing: string[] = [],
      safety: string[] = [];
    if (s.budgetOwner !== "adset")
      safety.push(
        s.budgetOwner === "campaign"
          ? "Shared campaign budgets are supported in V1.1; this ad set has no independent budget."
          : "Budget ownership is unknown.",
      );
    if (!/^(OUTCOME_SALES|CONVERSIONS|SALES)$/i.test(s.objective))
      safety.push(
        "This objective is not verified as a supported sales objective.",
      );
    if (s.status.toUpperCase() !== "ACTIVE")
      safety.push("The ad set is not active.");
    if (s.budget === null || s.budget <= 0 || s.budgetType !== "daily")
      safety.push("A positive current daily budget is required.");
    if (end < yesterday)
      safety.push(
        "Daily performance does not include yesterday in the account timezone.",
      );
    if (
      Date.parse(data.fetchedAt) > now.getTime() + 300000 ||
      Date.parse(s.observedAt) > now.getTime() + 300000
    )
      safety.push("Source observation time is in the future.");
    if (now.getTime() - Date.parse(s.observedAt) > 48 * 3600000)
      safety.push(
        "Current budget settings need a fresh read (prototype freshness guard: 48 hours).",
      );
    if (recent.days !== 7 || previous.days !== 7)
      safety.push(
        "Two complete seven-day periods are unavailable. Short-history evidence is incomplete.",
      );
    if (recent.missing.length || previous.missing.length)
      safety.push(
        "Purchases, clicks or purchase value contain absent entries; they were not changed to zeros.",
      );
    if (!data.measurementVerified)
      missing.push(
        "Confirm compatible click/purchase definitions and attribution across the imported periods.",
      );
    if (context.minimumRoas === undefined)
      missing.push("The minimum acceptable ROAS is missing.");
    if (context.targetRoas === undefined)
      missing.push("The desired overall ROAS is missing.");
    if (context.constraintStatus === "unknown")
      missing.push(
        "Relevant business constraints are unknown; a budget change needs review.",
      );
    if (context.constraintStatus === "known")
      missing.push(
        "A business constraint needs review before a budget change.",
      );
    const prior = (options.priorDecisions ?? [])
      .filter(
        (d) =>
          d.adsetId === s.adsetId && Number.isFinite(Date.parse(d.decidedAt)),
      )
      .sort((a, b) => b.decidedAt.localeCompare(a.decidedAt))[0];
    if (prior) {
      supporting.push(
        `Previous operator decision: ${prior.decision} on ${prior.decidedAt}.${prior.reason ? ` Reason: ${prior.reason}` : ""}`,
      );
      if (prior.decision === "REJECTED") {
        contradicting.push(
          "The operator rejected the prior recommendation. Their reason is retained; rejection does not silently rewrite policy.",
        );
      } else if (
        prior.finalBudget !== null &&
        prior.baselineBudget !== null &&
        Math.abs(prior.finalBudget - prior.baselineBudget) > 0.005
      ) {
        const observed = inferImplementation(prior, s);
        if (observed.state !== "Done as approved") {
          safety.push(
            `The prior approved change is ${observed.state.toLowerCase()}; resolve it before proposing another budget change.`,
          );
        } else {
          supporting.push(
            "Current configuration matches the prior final amount; this does not prove who made the change or its effect.",
          );
          const decisionDay = accountDay(
            new Date(prior.decidedAt),
            data.timezone,
          );
          if (!rows.some((x) => x.date > decisionDay && x.date <= end)) {
            safety.push(
              "The prior approved change has no subsequent complete-day performance; do not stack a new change.",
            );
          }
        }
      }
    }
    const ev =
      data.events
        .filter((x) => x.adsetId === s.adsetId)
        .sort((a, b) => a.changedAt.localeCompare(b.changedAt))
        .at(-1) ?? null;
    if (ev) {
      const dates = rows.filter(
        (x) => x.date > ev.changedAt.slice(0, 10) && x.date <= end,
      );
      if (!dates.length)
        safety.push(
          "The latest budget change has no subsequent complete-day performance. Do not stack another change.",
        );
      if (!ev.timezoneVerified)
        contradicting.push(
          "Budget-event timezone is unverified; exact intervention timing is uncertain.",
        );
    }
    const ads = data.ads.filter(
      (x) => x.adsetId === s.adsetId && x.date >= recent.start && x.date <= end,
    );
    const adSpend = new Map<string, number>();
    for (const a of ads)
      adSpend.set(a.adId ?? "", (adSpend.get(a.adId ?? "") ?? 0) + a.spend);
    const values = [...adSpend.values()].sort((a, b) => b - a),
      total = values.reduce((a, b) => a + b, 0);
    const top = total ? values[0] / total : null,
      top3 = total
        ? values.slice(0, 3).reduce((a, b) => a + b, 0) / total
        : null;
    if (!ads.length)
      contradicting.push(
        "Ad-level evidence is missing; creative cause cannot be assessed.",
      );
    // Preserve disagreement instead of reconciling purchases between levels.
    for (const day of rows.filter(
      (x) => x.date >= recent.start && x.date <= end,
    )) {
      const a = ads.filter((x) => x.date === day.date);
      if (!a.length) continue;
      if (
        a.every((x) => x.purchases !== null) &&
        day.purchases !== null &&
        Math.abs(
          a.reduce((t, x) => t + (x.purchases ?? 0), 0) - day.purchases,
        ) > 0.001
      ) {
        contradicting.push(
          "Ad and ad-set purchase totals disagree; creative-to-budget conclusions require investigation.",
        );
        break;
      }
    }
    if (recent.roas !== null && previous.roas !== null)
      supporting.push(
        `Seven-day ROAS ${previous.roas.toFixed(2)} → ${recent.roas.toFixed(2)}, using non-overlapping periods.`,
      );
    if (recent3.roas !== null && previous3.roas !== null)
      supporting.push(
        `Three-day ROAS ${previous3.roas.toFixed(2)} → ${recent3.roas.toFixed(2)}.`,
      );
    if (recent.purchases !== null)
      supporting.push(
        `${recent.purchases} reported purchases across the latest seven days; volume alone is not a validated sample test.`,
      );
    if (recent.cpa !== null && previous.cpa !== null)
      supporting.push(
        `Cost per purchase ${money(previous.cpa, data.currency)} → ${money(recent.cpa, data.currency)}.`,
      );
    if (
      recent.ctr !== null &&
      previous.ctr !== null &&
      recent.ctr < previous.ctr
    )
      contradicting.push(
        "Click response weakened. This alone does not establish creative fatigue.",
      );
    if (
      recent.roas !== null &&
      previous.roas !== null &&
      recent3.roas !== null &&
      previous3.roas !== null &&
      (recent.roas - previous.roas) * (recent3.roas - previous3.roas) < 0
    )
      contradicting.push(
        "The weekly and shorter comparisons point in different directions.",
      );
    let action: Recommendation["action"] = "INSUFFICIENT EVIDENCE",
      nextBudget: number | null = null,
      reason =
        "The final decision and sizing policy have not passed the operator test.",
      confidence: Recommendation["confidence"] = "Low";
    if (safety.length) reason = safety[0];
    else if (missing.length) {
      action = "NEEDS CONTEXT";
      reason = missing[0];
    } else if (demo) {
      // Invented illustrative policy ONLY for synthetic demo, never for a customer's account.
      const r = recent.roas ?? 0,
        p = previous.roas ?? 0,
        r3 = recent3.roas ?? 0,
        p3 = previous3.roas ?? 0;
      if (
        r < (context.minimumRoas ?? 2.4) &&
        r3 < (context.minimumRoas ?? 2.4)
      ) {
        action = "SCALE DOWN";
        nextBudget = round((s.budget ?? 0) * 0.95);
        reason =
          "Return is below the demo minimum in both recent periods; review a small reduction.";
      } else if (r >= (context.targetRoas ?? 3.2) && r > p && r3 >= p3) {
        action = "SCALE UP";
        nextBudget = round((s.budget ?? 0) * 1.05);
        reason =
          "Returns improved across comparable periods; review a small demo increase.";
      } else {
        action = "HOLD";
        nextBudget = s.budget;
        reason =
          "The synthetic evidence supports leaving this budget unchanged.";
      }
      confidence = "Medium";
    } else
      missing.push(
        "Action, sample, observation and magnitude parameters remain UNVALIDATED pending Gate 1.",
      );
    const dominantAds = [...adSpend.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([adId, spend]) => {
        const adRows = data.ads.filter(
          (a) => a.adsetId === s.adsetId && a.adId === adId,
        );
        const latest = [...adRows].sort((a, b) =>
          b.date.localeCompare(a.date),
        )[0];
        const created = latest?.adCreatedAt;
        const validCreated =
          created &&
          /(Z|[+-]\d{2}:?\d{2})$/.test(created) &&
          Number.isFinite(Date.parse(created)) &&
          Date.parse(created) <= now.getTime();
        return {
          adId,
          name: latest?.adName ?? adId,
          creativeId: latest?.creativeId || null,
          status: latest?.adStatus || null,
          createdAt: validCreated ? created : null,
          ageDays: validCreated
            ? Math.floor((now.getTime() - Date.parse(created!)) / 86400000)
            : null,
          firstSeenDate: adRows.map((a) => a.date).sort()[0] ?? "",
          spendShare: total ? spend / total : 0,
          recent: metrics(adRows, recent.start, end),
          previous: metrics(adRows, previous.start, previous.end),
        };
      });
    if (dominantAds.some((a) => a.ageDays === null))
      contradicting.push(
        "Known creation times are missing or unverified for some dominant ads. First appearance in this import is not creative age; no age-based fatigue claim is supported.",
      );
    const evidence: Evidence = {
      recent,
      previous,
      recent1: metrics(rows, end, end),
      recent14: metrics(rows, shift(end, -13), end),
      dominantAds,
      recent3,
      previous3,
      supporting,
      contradicting,
      missing,
      safety,
      policyVersion: POLICY_VERSION,
      confidenceReason: demo
        ? "Illustrative confidence under an invented synthetic policy; not statistically calibrated."
        : "Low because policy validation and/or material evidence is incomplete.",
      topAdShare: top,
      topThreeShare: top3,
      lastEvent: ev,
      suggestedTestBudget: null,
      measurementNote:
        "Complete calendar days may still receive attribution revisions. Matching current attribution labels does not verify historical settings.",
      goalNote:
        "The minimum is a guardrail; the desired overall average is not an individual scale/reduce trigger.",
      sampleNote:
        "No final sample-size or intervention waiting threshold is validated. Seven-day comparison is a descriptive prototype requirement, not statistical proof.",
    };
    return {
      key: `${data.fetchedAt}:${s.adsetId}`,
      adsetId: s.adsetId,
      name: s.adsetName,
      campaignName: s.campaignName,
      action,
      currentBudget: s.budget,
      nextBudget,
      magnitude:
        nextBudget !== null
          ? action === "HOLD"
            ? `${money(nextBudget, data.currency)}/day`
            : `${money(s.budget ?? 0, data.currency)} → ${money(nextBudget, data.currency)}/day`
          : "No change recommended",
      reason,
      rca: "Unclear",
      confidence,
      evidence,
      observedAt: s.observedAt,
      isDemo: demo,
      policyValidated: false,
    };
  });
}
export function inferImplementation(
  decision: Decision,
  snapshot: Snapshot | undefined,
): Implementation {
  const base = {
    decisionId: decision.id,
    observedBudget: snapshot?.budget ?? null,
    observedAt: snapshot?.observedAt ?? "",
    state: "Unable to verify" as Implementation["state"],
    note: "A later comparable budget snapshot is needed.",
  };
  if (
    decision.decision === "REJECTED" ||
    decision.decision === "NO_ACTION_CONFIRMED" ||
    decision.action === "HOLD"
  )
    return {
      ...base,
      note: "No budget change was approved; implementation is not required.",
    };
  if (
    !snapshot ||
    snapshot.adsetId !== decision.adsetId ||
    snapshot.budgetOwner !== "adset" ||
    snapshot.budgetType !== "daily" ||
    snapshot.budget === null ||
    decision.finalBudget === null ||
    decision.baselineBudget === null ||
    Date.parse(snapshot.observedAt) <= Date.parse(decision.decidedAt)
  )
    return base;
  if (Math.abs(snapshot.budget - decision.finalBudget) < 0.005)
    return {
      ...base,
      state: "Done as approved",
      note: "Observed budget matches the final decision. Actor, exact change time and causality are not established.",
    };
  if (Math.abs(snapshot.budget - decision.baselineBudget) < 0.005)
    return {
      ...base,
      state: "Not done yet",
      note: "At this read, the budget still matches the decision-time baseline. Intermediate changes cannot be ruled out.",
    };
  return {
    ...base,
    state: "Done differently",
    note: "The observed budget changed but differs from approval. This does not fulfill the approved change.",
  };
}
