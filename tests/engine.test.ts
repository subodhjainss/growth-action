import assert from "node:assert/strict";
import { test } from "node:test";
import {
  assessImport,
  inferImplementation,
  metrics,
  validateImport,
} from "../domain/engine";
import { demoContext, demoData } from "../domain/demo";
import type { Decision } from "../domain/types";
const now = new Date("2026-10-05T08:00:00Z");
test("real customer data never inherits synthetic sizing policy", () => {
  const data = demoData(now);
  data.source = "csv";
  const cards = assessImport(data, demoContext, {
    demo: true,
    now,
    policyValidated: true,
  });
  assert(cards.every((c) => !c.isDemo && !c.policyValidated));
  assert(cards.every((c) => c.nextBudget === null));
});
test("demo demonstrates scale reduce hold and safety blocks", () => {
  const data = demoData(now);
  const cards = assessImport(data, demoContext, { demo: true, now });
  assert.equal(validateImport(data).length, 0);
  assert.deepEqual(
    cards.map((c) => c.action),
    [
      "SCALE UP",
      "HOLD",
      "SCALE DOWN",
      "INSUFFICIENT EVIDENCE",
      "INSUFFICIENT EVIDENCE",
    ],
  );
});
test("absent values preserved and block value-based assessment", () => {
  const data = demoData(now);
  data.adsets.find(
    (x) => x.adsetId === "demo-tees" && x.date === "2026-10-04",
  )!.value = null;
  const c = assessImport(data, demoContext, { demo: true, now })[0];
  assert.equal(c.action, "INSUFFICIENT EVIDENCE");
  assert.equal(c.evidence.recent.roas, null);
});
test("window ratios use totals and zero denominators are unavailable", () => {
  const d = demoData(now);
  const row = d.adsets[0];
  const m = metrics(
    [
      { ...row, date: "2026-10-01", spend: 1, value: 10 },
      { ...row, date: "2026-10-02", spend: 9, value: 9 },
    ],
    "2026-10-01",
    "2026-10-02",
  );
  assert.equal(m.roas, 1.9);
  assert.equal(
    metrics([{ ...row, spend: 0 }], "2026-09-07", "2026-10-04").roas,
    null,
  );
});
test("later configuration distinguishes approval, mismatch, baseline and unknown", () => {
  const d = demoData(now);
  const c = assessImport(d, demoContext, { demo: true, now })[0];
  const decision: Decision = {
    id: "d1",
    recommendationKey: c.key,
    adsetId: c.adsetId,
    name: c.name,
    action: c.action,
    decision: "APPROVED",
    baselineBudget: 10000,
    finalBudget: 10500,
    reason: "",
    decidedAt: now.toISOString(),
    originalRecommendation: c,
  };
  const s = { ...d.snapshots[0], observedAt: "2026-10-06T08:00:00Z" };
  assert.equal(
    inferImplementation(decision, { ...s, budget: 10500 }).state,
    "Done as approved",
  );
  assert.equal(
    inferImplementation(decision, { ...s, budget: 10250 }).state,
    "Done differently",
  );
  assert.equal(
    inferImplementation(decision, { ...s, budget: 10000 }).state,
    "Not done yet",
  );
  assert.equal(
    inferImplementation(decision, d.snapshots[0]).state,
    "Unable to verify",
  );
  assert.equal(
    inferImplementation(decision, { ...s, budgetOwner: "campaign" }).state,
    "Unable to verify",
  );
  assert.equal(
    inferImplementation({ ...decision, decision: "REJECTED" }, s).state,
    "Unable to verify",
  );
});
test("new increase without post-intervention evidence cannot be stacked", () => {
  const d = demoData(now);
  d.events = [
    {
      adsetId: "demo-tees",
      changedAt: "2026-10-04T20:00:00Z",
      oldBudget: 8000,
      newBudget: 10000,
      timezoneVerified: true,
    },
  ];
  assert.equal(
    assessImport(d, demoContext, { demo: true, now })[0].action,
    "INSUFFICIENT EVIDENCE",
  );
});
test("duplicate keys, future observations and wrong objectives cannot pass", () => {
  const d = demoData(now);
  d.adsets.push(d.adsets[0]);
  assert(validateImport(d).some((x) => x.includes("duplicate")));
  d.snapshots[0].objective = "OUTCOME_TRAFFIC";
  assert.equal(
    assessImport(d, demoContext, { demo: true, now })[0].action,
    "INSUFFICIENT EVIDENCE",
  );
});
test("pending prior approval blocks a second change and retains the operator reason", () => {
  const data = demoData(now);
  const card = assessImport(data, demoContext, { demo: true, now })[0];
  const prior: Decision = {
    id: "prior",
    recommendationKey: "older",
    adsetId: card.adsetId,
    name: card.name,
    action: card.action,
    decision: "APPROVED",
    baselineBudget: card.currentBudget,
    finalBudget: card.nextBudget,
    reason: "Wait for the new budget to settle.",
    decidedAt: "2026-10-04T08:00:00Z",
    originalRecommendation: card,
  };
  const assessed = assessImport(data, demoContext, {
    demo: true,
    now,
    priorDecisions: [prior],
  })[0];
  assert.equal(assessed.action, "INSUFFICIENT EVIDENCE");
  assert(
    assessed.evidence.safety.some((x) => x.includes("prior approved change")),
  );
  assert(assessed.evidence.supporting.some((x) => x.includes(prior.reason)));
  const rejected = assessImport(data, demoContext, {
    demo: true,
    now,
    priorDecisions: [{ ...prior, decision: "REJECTED" }],
  })[0];
  assert.equal(rejected.action, "SCALE UP");
  assert(rejected.evidence.contradicting.some((x) => x.includes("rejected")));
});
test("descriptive windows and reported ad age do not invent creative fatigue", () => {
  const data = demoData(now);
  for (const row of data.ads) {
    row.adCreatedAt = "2026-09-01T08:00:00Z";
    row.adStatus = "ACTIVE";
    row.creativeId = "fictional-creative";
  }
  const card = assessImport(data, demoContext, { demo: true, now })[0];
  assert.equal(card.evidence.recent1?.expectedDays, 1);
  assert.equal(card.evidence.recent14?.expectedDays, 14);
  assert.equal(card.evidence.dominantAds?.[0].ageDays, 34);
  assert.equal(card.rca, "Unclear");
  for (const row of data.ads) row.adCreatedAt = "";
  const missing = assessImport(data, demoContext, { demo: true, now })[0];
  assert.equal(missing.evidence.dominantAds?.[0].ageDays, null);
  assert(
    missing.evidence.contradicting.some((x) => x.includes("not creative age")),
  );
});
