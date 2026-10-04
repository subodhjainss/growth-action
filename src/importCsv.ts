import Papa from "papaparse";
import type {
  BudgetEvent,
  DailyRow,
  ImportData,
  Snapshot,
} from "../domain/types";
export interface ParsedFile {
  name: string;
  headers: string[];
  rows: Record<string, string>[];
  kind:
    | "adsets"
    | "ads"
    | "settings"
    | "campaigns"
    | "events"
    | "adsettings"
    | "unknown";
}
const clean = (x: string) =>
  x
    .replace(/^\uFEFF/, "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "");
const aliases: Record<string, string[]> = {
  date: ["date", "day", "reporting_starts", "reporting_start"],
  accountId: ["account_id"],
  campaignId: ["campaign_id"],
  campaignName: ["campaign_name"],
  adsetId: ["adset_id", "ad_set_id"],
  adsetName: ["adset_name", "ad_set_name"],
  adId: ["ad_id"],
  adName: ["ad_name"],
  spend: ["amount_spent_inr", "amount_spent", "spend"],
  impressions: ["impressions"],
  clicks: ["link_clicks", "link_clicks_all", "outbound_clicks"],
  purchases: ["website_purchases", "purchases"],
  value: [
    "website_purchase_value_inr",
    "website_purchase_value",
    "purchases_conversion_value",
    "purchase_conversion_value",
    "conversion_value",
  ],
  budget: ["daily_budget_inr", "daily_budget", "current_daily_budget_inr"],
  status: ["effective_status", "status", "delivery"],
  objective: ["objective", "campaign_objective", "optimization_goal"],
  owner: ["budget_level", "budget_owner"],
  budgetType: ["budget_type"],
  observed: ["settings_exported_at", "snapshot_at", "observed_at"],
  attribution: ["attribution_setting"],
  created: ["created_time"],
  updated: ["last_updated_time", "updated_time"],
};
export const fieldMapping = aliases;
function get(r: Record<string, string>, key: string) {
  for (const alias of aliases[key] ?? [key]) {
    if (r[alias] !== undefined && r[alias] !== "") return r[alias];
  }
  return "";
}
function num(s: string) {
  if (!s || /^(—|-|n\/a|not available)$/i.test(s)) return null;
  const n = Number(s.replace(/[,₹$£€%]/g, ""));
  if (!Number.isFinite(n))
    throw new Error("A numeric field contains text. Check the export format.");
  return n;
}
function stamp(s: string, fallback: string) {
  if (!s) return fallback;
  const n = Date.parse(s);
  if (!Number.isFinite(n))
    throw new Error(
      "A settings timestamp cannot be read. Use ISO timestamps with a timezone.",
    );
  return new Date(n).toISOString();
}
export async function parseFile(file: File): Promise<ParsedFile> {
  if (file.size > 12 * 1024 * 1024)
    throw new Error("Each CSV must be under 12 MB. Split the date range.");
  const result = Papa.parse<Record<string, string>>(await file.text(), {
    header: true,
    skipEmptyLines: "greedy",
    transformHeader: clean,
  });
  if (result.errors.length)
    throw new Error(
      `${file.name}: CSV structure is invalid. Check headers and row lengths.`,
    );
  const headers = result.meta.fields ?? [];
  let kind: ParsedFile["kind"] = "unknown";
  if (headers.includes("changed_at") && headers.includes("object_id"))
    kind = "events";
  else if (
    headers.some((x) => aliases.date.includes(x)) &&
    headers.some((x) => aliases.spend.includes(x))
  )
    kind = headers.includes("ad_id") ? "ads" : "adsets";
  else if (headers.includes("ad_id")) kind = "adsettings";
  else if (headers.includes("adset_id") || headers.includes("ad_set_id"))
    kind = "settings";
  else if (headers.includes("campaign_id")) kind = "campaigns";
  return { name: file.name, headers, rows: result.data, kind };
}
export function assemble(
  files: ParsedFile[],
  meta: {
    currency: string;
    timezone: string;
    fetchedAt: string;
    measurementVerified: boolean;
  },
): ImportData {
  const result: ImportData = {
    adsets: [],
    ads: [],
    snapshots: [],
    events: [],
    ...meta,
    source: "csv",
  };
  const campaigns = new Map<string, Record<string, string>>();
  const settings = new Map<string, Record<string, string>>();
  const names = new Map<string, Record<string, string>>();
  for (const f of files) {
    for (const r of f.rows) {
      if (f.kind === "campaigns") campaigns.set(get(r, "campaignId"), r);
      if (f.kind === "settings") settings.set(get(r, "adsetId"), r);
      if (f.kind === "adsettings") names.set(get(r, "adId"), r);
    }
  }
  for (const f of files) {
    for (const r of f.rows) {
      if (f.kind === "adsets" || f.kind === "ads") {
        const ad = names.get(get(r, "adId")) ?? {};
        const id = get(r, "adsetId") || get(ad, "adsetId");
        const st = settings.get(id) ?? {};
        const campaignId =
          get(r, "campaignId") ||
          get(st, "campaignId") ||
          get(ad, "campaignId");
        const ca = campaigns.get(campaignId) ?? {};
        const impressions = num(get(r, "impressions")),
          spend = num(get(r, "spend"));
        if (spend === null || impressions === null)
          throw new Error(
            `${f.name}: spend and impressions are required numeric columns.`,
          );
        const d: DailyRow = {
          date: get(r, "date").slice(0, 10),
          accountId: get(r, "accountId"),
          campaignId,
          campaignName:
            get(r, "campaignName") ||
            get(st, "campaignName") ||
            get(ca, "campaignName"),
          adsetId: id,
          adsetName: get(r, "adsetName") || get(st, "adsetName"),
          spend,
          impressions,
          clicks: num(get(r, "clicks")),
          purchases: num(get(r, "purchases")),
          value: num(get(r, "value")),
        };
        if (f.kind === "ads") {
          d.adId = get(r, "adId");
          d.adName = get(r, "adName") || get(ad, "adName");
          result.ads.push(d);
        } else result.adsets.push(d);
        if (f.kind === "adsets" && !settings.has(id) && get(r, "budget"))
          settings.set(id, r);
      }
      if (f.kind === "events") {
        const event: BudgetEvent = {
          adsetId: r.object_id,
          changedAt: stamp(r.changed_at, meta.fetchedAt),
          oldBudget: num(r.old_budget_inr ?? ""),
          newBudget: num(r.new_budget_inr ?? "") ?? 0,
          timezoneVerified: false,
        };
        result.events.push(event);
      }
    }
  }
  for (const [id, r] of settings) {
    const ca = campaigns.get(get(r, "campaignId")) ?? {};
    const owner = get(r, "owner").toLowerCase();
    const campaignBudget = num(get(ca, "budget"));
    let budgetOwner: Snapshot["budgetOwner"] = "unknown";
    if (
      /campaign|cbo/.test(owner) ||
      (campaignBudget !== null && campaignBudget > 0)
    )
      budgetOwner = "campaign";
    else if (/ad.?set|abo/.test(owner)) budgetOwner = "adset";
    // A budget number alone does not establish control. Explicit field required.
    const budgetType: Snapshot["budgetType"] =
      get(r, "budgetType").toLowerCase().includes("daily") ||
      get(r, "budgetType").toLowerCase().includes("per day")
        ? "daily"
        : get(r, "budgetType").toLowerCase().includes("lifetime")
          ? "lifetime"
          : "unknown";
    result.snapshots.push({
      adsetId: id,
      campaignId: get(r, "campaignId"),
      adsetName: get(r, "adsetName"),
      campaignName: get(r, "campaignName") || get(ca, "campaignName"),
      status: get(r, "status"),
      objective: get(ca, "objective") || get(r, "objective"),
      budget: num(get(r, "budget")),
      budgetOwner,
      budgetType,
      observedAt: stamp(get(r, "observed"), meta.fetchedAt),
      attribution: get(r, "attribution"),
      createdAt: get(r, "created"),
      updatedAt: get(r, "updated"),
    });
  }
  return result;
}
export function downloadTemplates() {
  const templates: Record<string, string> = {
    "adset_daily_template.csv":
      "date,account_id,campaign_id,campaign_name,adset_id,adset_name,spend,impressions,link_clicks,purchases,purchase_conversion_value\n",
    "ad_daily_template.csv":
      "date,account_id,campaign_id,campaign_name,adset_id,adset_name,ad_id,ad_name,spend,impressions,link_clicks,purchases,purchase_conversion_value\n",
    "adset_settings_template.csv":
      "campaign_id,campaign_name,adset_id,adset_name,effective_status,objective,budget_owner,budget_type,daily_budget,snapshot_at,attribution_setting\n",
  };
  for (const [name, text] of Object.entries(templates)) {
    const url = URL.createObjectURL(new Blob([text], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
}
