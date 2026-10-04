export type ConstraintStatus = "unknown" | "none" | "known";
export interface BusinessContext {
  website: string;
  brandName: string;
  products: string;
  customers: string;
  positioning: string;
  offers: string;
  notes: string;
  minimumRoas?: number;
  targetRoas?: number;
  optimizationMode?: "balanced" | "scale" | "efficiency";
  constraintStatus: ConstraintStatus;
  constraintNotes: string;
}
export interface DailyRow {
  date: string;
  accountId: string;
  campaignId: string;
  campaignName: string;
  adsetId: string;
  adsetName: string;
  adId?: string;
  adName?: string;
  spend: number;
  impressions: number;
  clicks: number | null;
  purchases: number | null;
  value: number | null;
  reach?: number | null;
  frequency?: number | null;
}
export interface Snapshot {
  adsetId: string;
  campaignId: string;
  adsetName: string;
  campaignName: string;
  status: string;
  objective: string;
  budget: number | null;
  budgetOwner: "adset" | "campaign" | "unknown";
  budgetType: "daily" | "lifetime" | "unknown";
  observedAt: string;
  attribution?: string;
  createdAt?: string;
  updatedAt?: string;
}
export interface BudgetEvent {
  adsetId: string;
  changedAt: string;
  oldBudget: number | null;
  newBudget: number;
  timezoneVerified: boolean;
}
export interface ImportData {
  adsets: DailyRow[];
  ads: DailyRow[];
  snapshots: Snapshot[];
  events: BudgetEvent[];
  currency: string;
  timezone: string;
  fetchedAt: string;
  measurementVerified: boolean;
  source: "csv" | "meta" | "demo";
}
export type Action =
  | "SCALE UP"
  | "SCALE DOWN"
  | "HOLD"
  | "NEEDS CONTEXT"
  | "INSUFFICIENT EVIDENCE";
export interface WindowMetrics {
  start: string;
  end: string;
  days: number;
  expectedDays: number;
  spend: number;
  purchases: number | null;
  value: number | null;
  roas: number | null;
  ctr: number | null;
  cpm: number | null;
  cvr: number | null;
  cpa: number | null;
  missing: string[];
}
export interface Evidence {
  recent: WindowMetrics;
  previous: WindowMetrics;
  recent3: WindowMetrics;
  previous3: WindowMetrics;
  supporting: string[];
  contradicting: string[];
  missing: string[];
  safety: string[];
  policyVersion: string;
  confidenceReason: string;
  topAdShare: number | null;
  topThreeShare: number | null;
  lastEvent: BudgetEvent | null;
  suggestedTestBudget: number | null;
  measurementNote: string;
  goalNote: string;
  sampleNote: string;
}
export interface Recommendation {
  key: string;
  adsetId: string;
  name: string;
  campaignName: string;
  action: Action;
  currentBudget: number | null;
  nextBudget: number | null;
  magnitude: string;
  reason: string;
  rca:
    | "Unclear"
    | "Business context required"
    | "Possible creative deterioration"
    | "Possible spend / scaling effect";
  confidence: "Low" | "Medium" | "High";
  evidence: Evidence;
  observedAt: string;
  isDemo: boolean;
  policyValidated: boolean;
}
export interface Decision {
  id: string;
  recommendationKey: string;
  adsetId: string;
  name: string;
  action: Action;
  decision: "APPROVED" | "EDITED" | "REJECTED" | "NO_ACTION_CONFIRMED";
  baselineBudget: number | null;
  finalBudget: number | null;
  reason: string;
  decidedAt: string;
  originalRecommendation: Recommendation;
}
export interface Implementation {
  decisionId: string;
  state:
    | "Done as approved"
    | "Done differently"
    | "Not done yet"
    | "Unable to verify";
  observedBudget: number | null;
  observedAt: string;
  note: string;
}
