import type { BusinessContext, DailyRow, ImportData, Snapshot } from "./types";
export const demoContext: BusinessContext = {
  website: "https://threadandform.example",
  brandName: "Thread & Form",
  products: "Everyday essentials, layers and tees",
  customers: "People who value comfortable everyday clothing",
  positioning: "Thoughtful essentials, made for daily wear",
  offers: "No current offer confirmed",
  notes: "Invented brand and data for the interactive demo.",
  minimumRoas: 2.4,
  targetRoas: 3.2,
  optimizationMode: "balanced",
  constraintStatus: "none",
  constraintNotes: "",
};
export function demoData(now = new Date()): ImportData {
  const days = 28;
  const adsets: DailyRow[] = [],
    ads: DailyRow[] = [];
  const snapshots: Snapshot[] = [];
  const cases = [
    {
      id: "demo-tees",
      name: "Everyday tees",
      budget: 10000,
      old: 3.1,
      recent: 3.9,
    },
    {
      id: "demo-layers",
      name: "Weekend layers",
      budget: 8000,
      old: 3.45,
      recent: 3.4,
    },
    {
      id: "demo-knit",
      name: "Soft knitwear",
      budget: 6000,
      old: 2.8,
      recent: 1.85,
    },
    {
      id: "demo-new",
      name: "New arrivals",
      budget: 5000,
      old: 3.0,
      recent: 3.8,
    },
    {
      id: "demo-shared",
      name: "Studio collection",
      budget: 4000,
      old: 3.0,
      recent: 3.7,
    },
  ];
  for (const c of cases) {
    const shared = c.id === "demo-shared";
    snapshots.push({
      adsetId: c.id,
      campaignId: shared ? "demo-cbo" : "demo-sales",
      adsetName: c.name,
      campaignName: shared ? "Collection discovery" : "Everyday essentials",
      status: "ACTIVE",
      objective: "OUTCOME_SALES",
      budget: shared ? null : c.budget,
      budgetOwner: shared ? "campaign" : "adset",
      budgetType: "daily",
      observedAt: now.toISOString(),
      attribution: "Synthetic consistent attribution",
    });
    for (let i = 0; i < days; i++) {
      if (c.id === "demo-new" && i < days - 4) continue;
      const date = new Date(
        Date.UTC(
          now.getUTCFullYear(),
          now.getUTCMonth(),
          now.getUTCDate() - days + i,
        ),
      )
        .toISOString()
        .slice(0, 10);
      const spend = c.budget * (0.97 + (i % 3) * 0.015),
        roas = (i >= days - 7 ? c.recent : c.old) + ((i % 3) - 1) * 0.06;
      const purchases = Math.max(1, Math.round((spend * roas) / 1800));
      const row: DailyRow = {
        date,
        accountId: "demo-account",
        campaignId: shared ? "demo-cbo" : "demo-sales",
        campaignName: shared ? "Collection discovery" : "Everyday essentials",
        adsetId: c.id,
        adsetName: c.name,
        spend: Math.round(spend * 100) / 100,
        impressions: Math.round(spend * 8),
        clicks: Math.round(spend * 0.085),
        purchases,
        value: Math.round(spend * roas * 100) / 100,
      };
      adsets.push(row);
      for (let j = 0; j < 2; j++) {
        const share = j === 0 ? 0.6 : 0.4;
        ads.push({
          ...row,
          adId: c.id + "-ad-" + j,
          adName: j === 0 ? "Everyday comfort" : "Fit in motion",
          spend: Math.round(row.spend * share * 100) / 100,
          impressions: Math.round(row.impressions * share),
          clicks: Math.round((row.clicks ?? 0) * share),
          purchases:
            j === 0
              ? Math.round(purchases * 0.6)
              : purchases - Math.round(purchases * 0.6),
          value: Math.round((row.value ?? 0) * share * 100) / 100,
        });
      }
    }
  }
  return {
    adsets,
    ads,
    snapshots,
    events: [],
    currency: "INR",
    timezone: "UTC",
    fetchedAt: now.toISOString(),
    measurementVerified: true,
    source: "demo",
  };
}
