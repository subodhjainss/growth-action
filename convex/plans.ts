import { query, mutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { v, ConvexError } from "convex/values";
import type { Recommendation, Snapshot } from "../domain/types";
import { evaluatePlan } from "../domain/planning";
const resultValidator = v.object({
  _id: v.id("budgetPlans"),
  _creationTime: v.number(),
  accountId: v.id("accounts"),
  ownerId: v.id("users"),
  importId: v.id("imports"),
  version: v.number(),
  status: v.literal("DRAFT"),
  envelope: v.union(v.number(), v.null()),
  objective: v.string(),
  reason: v.string(),
  proposedBudgets: v.any(),
  evaluation: v.any(),
  contextSnapshot: v.any(),
  sourceSnapshots: v.any(),
  restoredFrom: v.optional(v.id("budgetPlans")),
  createdAt: v.number(),
});
export const get = query({
  args: { accountId: v.optional(v.id("accounts")) },
  returns: v.array(resultValidator),
  handler: async (ctx, args) => {
    const ownerId = await getAuthUserId(ctx);
    if (!ownerId) return [];
    const account = args.accountId
      ? await ctx.db.get(args.accountId)
      : await ctx.db
          .query("accounts")
          .withIndex("by_owner", (q) => q.eq("ownerId", ownerId))
          .first();
    if (!account || account.ownerId !== ownerId)
      throw new ConvexError("This workspace is not available.");
    return ctx.db
      .query("budgetPlans")
      .withIndex("by_account", (q) => q.eq("accountId", account._id))
      .order("desc")
      .take(20);
  },
});
export const save = mutation({
  args: {
    accountId: v.id("accounts"),
    importId: v.id("imports"),
    envelope: v.union(v.number(), v.null()),
    objective: v.string(),
    reason: v.string(),
    proposedBudgets: v.any(),
    restoredFrom: v.optional(v.id("budgetPlans")),
  },
  returns: v.id("budgetPlans"),
  handler: async (ctx, args) => {
    const ownerId = await getAuthUserId(ctx);
    if (!ownerId)
      throw new ConvexError("Sign in to save a private budget draft.");
    const account = await ctx.db.get(args.accountId);
    if (!account || account.ownerId !== ownerId)
      throw new ConvexError("This workspace is not available.");
    const latest = await ctx.db
      .query("imports")
      .withIndex("by_account_status", (q) =>
        q.eq("accountId", account._id).eq("status", "complete"),
      )
      .order("desc")
      .first();
    if (!latest || latest._id !== args.importId)
      throw new ConvexError(
        "A newer import is available. Review current budgets before saving this draft.",
      );
    if (
      !args.objective.trim() ||
      args.objective.length > 500 ||
      !args.reason.trim() ||
      args.reason.length > 1000
    )
      throw new ConvexError(
        "Add a short objective and a reason for this draft.",
      );
    if (
      args.envelope !== null &&
      (!Number.isFinite(args.envelope) ||
        args.envelope <= 0 ||
        args.envelope > 100000000 ||
        Math.abs(args.envelope * 100 - Math.round(args.envelope * 100)) >
          0.00001)
    )
      throw new ConvexError(
        "Enter a positive daily budget ceiling with at most two decimal places.",
      );
    if (
      !args.proposedBudgets ||
      typeof args.proposedBudgets !== "object" ||
      Array.isArray(args.proposedBudgets) ||
      JSON.stringify(args.proposedBudgets).length > 12000
    )
      throw new ConvexError("The proposed budgets are invalid.");
    const proposed = args.proposedBudgets as Record<string, number>,
      entries = Object.entries(proposed);
    if (
      entries.length > 100 ||
      entries.some(
        ([key, value]) =>
          !key ||
          key.length > 200 ||
          ["__proto__", "constructor", "prototype"].includes(key) ||
          !Number.isFinite(value) ||
          value <= 0 ||
          value > 100000000 ||
          Math.abs(value * 100 - Math.round(value * 100)) > 0.00001,
      )
    )
      throw new ConvexError(
        "Enter valid positive budgets with at most two decimal places.",
      );
    const records = await ctx.db
      .query("recommendations")
      .withIndex("by_import", (q) => q.eq("importId", latest._id))
      .take(100);
    const cards = records.map((x) => x.payload as Recommendation);
    const snapshots = latest.data.snapshots as Snapshot[];
    for (const [id, value] of entries) {
      const rec = cards.find((c) => c.adsetId === id),
        snapshot = snapshots?.find((s) => s.adsetId === id);
      if (!rec || !snapshot)
        throw new ConvexError(
          "This draft contains an ad set outside the current import.",
        );
      const changed =
        rec.currentBudget === null ||
        Math.abs(value - rec.currentBudget) > 0.005;
      if (
        changed &&
        (snapshot.budgetOwner !== "adset" ||
          snapshot.budgetType !== "daily" ||
          snapshot.status.toUpperCase() !== "ACTIVE" ||
          !/^(OUTCOME_SALES|CONVERSIONS|SALES)$/i.test(snapshot.objective) ||
          snapshot.budget === null ||
          snapshot.budget <= 0 ||
          rec.evidence.safety.length)
      )
        throw new ConvexError(
          "Resolve the ad-set safety or budget-ownership issue before changing its draft budget.",
        );
    }
    const evaluation = evaluatePlan(cards, proposed, args.envelope);
    if (evaluation.errors.length)
      throw new ConvexError(evaluation.errors.slice(0, 3).join(" "));
    if (args.restoredFrom) {
      const restored = await ctx.db.get(args.restoredFrom);
      if (
        !restored ||
        restored.ownerId !== ownerId ||
        restored.accountId !== account._id
      )
        throw new ConvexError("This earlier draft is not available.");
    }
    const last = await ctx.db
      .query("budgetPlans")
      .withIndex("by_account", (q) => q.eq("accountId", account._id))
      .order("desc")
      .first();
    return ctx.db.insert("budgetPlans", {
      accountId: account._id,
      ownerId,
      importId: latest._id,
      version: (last?.version ?? 0) + 1,
      status: "DRAFT",
      envelope: args.envelope,
      objective: args.objective.trim(),
      reason: args.reason.trim(),
      proposedBudgets: Object.fromEntries(entries),
      evaluation,
      contextSnapshot: account.context,
      sourceSnapshots: snapshots ?? [],
      ...(args.restoredFrom ? { restoredFrom: args.restoredFrom } : {}),
      createdAt: Date.now(),
    });
  },
});
