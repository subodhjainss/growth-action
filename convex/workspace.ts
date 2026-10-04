import {
  query,
  mutation,
  type MutationCtx,
  type QueryCtx,
} from "./_generated/server";
import type { Id } from "./_generated/dataModel";
import { getAuthUserId } from "@convex-dev/auth/server";
import { v, ConvexError } from "convex/values";
import {
  assessImport,
  validateImport,
  inferImplementation,
} from "../domain/engine";
import type {
  BusinessContext,
  ImportData,
  Decision,
  Recommendation,
} from "../domain/types";
const contextValidator = v.object({
  website: v.string(),
  brandName: v.string(),
  products: v.string(),
  customers: v.string(),
  positioning: v.string(),
  offers: v.string(),
  notes: v.string(),
  minimumRoas: v.optional(v.number()),
  targetRoas: v.optional(v.number()),
  optimizationMode: v.optional(
    v.union(v.literal("balanced"), v.literal("scale"), v.literal("efficiency")),
  ),
  constraintStatus: v.union(
    v.literal("unknown"),
    v.literal("none"),
    v.literal("known"),
  ),
  constraintNotes: v.string(),
});
async function owner(ctx: MutationCtx | QueryCtx) {
  const id = await getAuthUserId(ctx);
  if (!id) throw new ConvexError("Sign in to use your private workspace.");
  return id;
}
async function account(ctx: MutationCtx | QueryCtx, id: Id<"accounts">) {
  const user = await owner(ctx),
    a = await ctx.db.get(id);
  if (!a || a.ownerId !== user)
    throw new ConvexError("This workspace is not available.");
  return a;
}
export const get = query({
  args: {},
  returns: v.any(),
  handler: async (ctx) => {
    const user = await getAuthUserId(ctx);
    if (!user) return null;
    const a = await ctx.db
      .query("accounts")
      .withIndex("by_owner", (q) => q.eq("ownerId", user))
      .first();
    if (!a) return null;
    const latest = await ctx.db
      .query("imports")
      .withIndex("by_account_status", (q) =>
        q.eq("accountId", a._id).eq("status", "complete"),
      )
      .order("desc")
      .first();
    const recs = latest
      ? await ctx.db
          .query("recommendations")
          .withIndex("by_import", (q) => q.eq("importId", latest!._id))
          .take(100)
      : [];
    const decisions = await ctx.db
      .query("decisions")
      .withIndex("by_account", (q) => q.eq("accountId", a._id))
      .order("desc")
      .take(100);
    const implementations = await ctx.db
      .query("implementations")
      .withIndex("by_account", (q) => q.eq("accountId", a._id))
      .order("desc")
      .take(200);
    return {
      accountId: a._id,
      context: a.context,
      mapping: a.mapping,
      latestImport: latest
        ? { id: latest._id, data: latest.data, importedAt: latest.createdAt }
        : null,
      recommendations: recs.map((r) => ({ ...r.payload, _id: r._id })),
      decisions,
      implementations,
    };
  },
});
export const saveContext = mutation({
  args: { context: contextValidator },
  returns: v.id("accounts"),
  handler: async (ctx, { context }) => {
    const user = await owner(ctx);
    if (JSON.stringify(context).length > 20000)
      throw new ConvexError("Please shorten the business context.");
    for (const value of [context.minimumRoas, context.targetRoas])
      if (
        value !== undefined &&
        (!Number.isFinite(value) || value <= 0 || value > 1000)
      )
        throw new ConvexError("Enter a positive ROAS value.");
    if (
      context.minimumRoas !== undefined &&
      context.targetRoas !== undefined &&
      context.targetRoas < context.minimumRoas
    )
      throw new ConvexError(
        "The overall target cannot be below the minimum ROAS.",
      );
    const a = await ctx.db
      .query("accounts")
      .withIndex("by_owner", (q) => q.eq("ownerId", user))
      .first();
    if (a) {
      await ctx.db.patch(a._id, { context, updatedAt: Date.now() });
      return a._id;
    }
    return ctx.db.insert("accounts", {
      ownerId: user,
      platform: "META",
      context,
      mapping: {},
      updatedAt: Date.now(),
    });
  },
});
export const importData = mutation({
  args: { accountId: v.id("accounts"), data: v.any(), mapping: v.any() },
  returns: v.object({
    importId: v.id("imports"),
    recommendationCount: v.number(),
  }),
  handler: async (ctx, args) => persistImport(ctx, args),
});
async function persistImport(
  ctx: MutationCtx,
  args: { accountId: Id<"accounts">; data: ImportData; mapping: any },
  existingId?: Id<"imports">,
) {
  const a = await account(ctx, args.accountId);
  const data = args.data as ImportData;
  if (
    !data ||
    !Array.isArray(data.adsets) ||
    !Array.isArray(data.ads) ||
    !Array.isArray(data.snapshots) ||
    !Array.isArray(data.events)
  )
    throw new ConvexError("The import is missing its required sections.");
  if (
    data.adsets.length + data.ads.length > 12000 ||
    data.snapshots.length > 100 ||
    data.events.length > 1000 ||
    JSON.stringify(data).length > 6000000
  )
    throw new ConvexError(
      "This import is too large. Use a smaller date range or fewer ad sets.",
    );
  if (!existingId && JSON.stringify(data).length > 800000)
    throw new ConvexError("Use chunked upload for this import.");
  for (const row of [...data.adsets, ...data.ads]) {
    if (
      !row ||
      typeof row !== "object" ||
      typeof row.date !== "string" ||
      ["accountId", "campaignId", "campaignName", "adsetId", "adsetName"].some(
        (k) => typeof (row as any)[k] !== "string",
      ) ||
      !Number.isFinite(row.spend) ||
      !Number.isFinite(row.impressions)
    )
      throw new ConvexError(
        "Some daily records have invalid mandatory fields.",
      );
  }
  for (const snap of data.snapshots) {
    if (
      !snap ||
      typeof snap.adsetId !== "string" ||
      typeof snap.campaignId !== "string" ||
      typeof snap.status !== "string" ||
      typeof snap.objective !== "string" ||
      !["adset", "campaign", "unknown"].includes(snap.budgetOwner) ||
      !["daily", "lifetime", "unknown"].includes(snap.budgetType)
    )
      throw new ConvexError(
        "Some settings records have invalid mandatory fields.",
      );
  }
  for (const event of data.events) {
    if (
      !event ||
      typeof event.adsetId !== "string" ||
      !Number.isFinite(Date.parse(event.changedAt)) ||
      !Number.isFinite(event.newBudget) ||
      event.newBudget < 0 ||
      typeof event.timezoneVerified !== "boolean"
    )
      throw new ConvexError("Some budget events are invalid.");
  }
  if (data.source !== "csv")
    throw new ConvexError(
      "Only CSV imports are available until live Meta access is verified.",
    );
  const issues = validateImport(data);
  if (issues.length) throw new ConvexError(issues.slice(0, 5).join(" "));
  const externalAccountId = data.adsets[0]?.accountId;
  if (a.externalAccountId && a.externalAccountId !== externalAccountId)
    throw new ConvexError(
      "This workspace is linked to another Meta account. Do not mix account histories.",
    );
  if (
    (a.currency && a.currency !== data.currency) ||
    (a.timezone && a.timezone !== data.timezone)
  )
    throw new ConvexError(
      "Currency or timezone differs from the saved account. Confirm account metadata before importing.",
    );
  const recs = assessImport(data, a.context as BusinessContext, {
    policyValidated: false,
    demo: false,
  });
  const now = Date.now();
  const id =
    existingId ??
    (await ctx.db.insert("imports", {
      accountId: a._id,
      ownerId: a.ownerId,
      data,
      source: "CSV",
      status: "complete",
      createdAt: now,
    }));
  if (existingId)
    await ctx.db.patch(existingId, {
      status: "complete",
      data: { ...data, adsets: [], ads: [], events: [] },
      createdAt: now,
    });
  for (const r of recs.slice(0, 100))
    await ctx.db.insert("recommendations", {
      accountId: a._id,
      ownerId: a.ownerId,
      importId: id,
      adsetId: r.adsetId,
      payload: r,
      policyVersion: r.evidence.policyVersion,
      createdAt: now,
    });
  const decisions = await ctx.db
    .query("decisions")
    .withIndex("by_account", (q) => q.eq("accountId", a._id))
    .order("desc")
    .take(100);
  for (const d of decisions) {
    if (d.decision === "REJECTED") continue;
    const original = await ctx.db.get(d.recommendationId);
    if (!original) continue;
    const r = original.payload as Recommendation;
    const decision: Decision = {
      id: d._id,
      recommendationKey: r.key,
      adsetId: r.adsetId,
      name: r.name,
      action: r.action,
      decision: d.decision,
      baselineBudget: r.currentBudget,
      finalBudget: d.finalBudget,
      reason: d.reason,
      decidedAt: new Date(d.createdAt).toISOString(),
      originalRecommendation: r,
    };
    const result = inferImplementation(
      decision,
      data.snapshots.find((s) => s.adsetId === r.adsetId),
    );
    const states = {
      "Done as approved": "IMPLEMENTED_AS_APPROVED",
      "Done differently": "IMPLEMENTED_DIFFERENTLY",
      "Not done yet": "NOT_IMPLEMENTED_OR_DEFERRED",
      "Unable to verify": "UNKNOWN",
    } as const;
    await ctx.db.insert("implementations", {
      accountId: a._id,
      ownerId: a.ownerId,
      recommendationId: original._id,
      decisionId: d._id,
      importId: id,
      state: states[result.state],
      observedBudget: result.observedBudget,
      note: result.note,
      observedAt: Number.isFinite(Date.parse(result.observedAt))
        ? Date.parse(result.observedAt)
        : now,
    });
  }
  await ctx.db.patch(a._id, {
    mapping: args.mapping,
    externalAccountId,
    currency: data.currency,
    timezone: data.timezone,
    updatedAt: now,
  });
  return { importId: id, recommendationCount: recs.length };
}

export const decide = mutation({
  args: {
    recommendationId: v.id("recommendations"),
    decision: v.union(
      v.literal("APPROVED"),
      v.literal("EDITED"),
      v.literal("REJECTED"),
      v.literal("NO_ACTION_CONFIRMED"),
    ),
    finalBudget: v.optional(v.number()),
    reason: v.optional(v.string()),
  },
  returns: v.id("decisions"),
  handler: async (ctx, args) => {
    const user = await owner(ctx);
    const r = await ctx.db.get(args.recommendationId);
    if (!r || r.ownerId !== user)
      throw new ConvexError("This recommendation is not available.");
    const latest = await ctx.db
      .query("imports")
      .withIndex("by_account_status", (q) =>
        q.eq("accountId", r.accountId).eq("status", "complete"),
      )
      .order("desc")
      .first();
    if (!latest || latest._id !== r.importId)
      throw new ConvexError(
        "A newer import is available. Review the current recommendation first.",
      );
    const existing = await ctx.db
      .query("decisions")
      .withIndex("by_recommendation", (q) => q.eq("recommendationId", r._id))
      .first();
    if (existing)
      throw new ConvexError(
        "A decision is already saved for this recommendation.",
      );
    const rec = r.payload as Recommendation;
    let budget: number | null = null;
    if (args.decision === "APPROVED") {
      if (rec.action !== "HOLD" || rec.nextBudget === null)
        throw new ConvexError(
          "Budget-change policy is not validated. This recommendation cannot be approved.",
        );
      budget = rec.nextBudget;
    }
    if (args.decision === "NO_ACTION_CONFIRMED") {
      budget = rec.currentBudget;
    }
    if (args.decision === "EDITED") {
      if (rec.evidence.safety.length > 0)
        throw new ConvexError(
          "Resolve the data safety issues before recording a budget change.",
        );
      if (
        args.finalBudget === undefined ||
        !Number.isFinite(args.finalBudget) ||
        args.finalBudget <= 0 ||
        args.finalBudget > 100000000
      )
        throw new ConvexError("Enter a valid positive daily budget.");
      if (!args.reason?.trim())
        throw new ConvexError(
          "Record why you are choosing this operator-led change.",
        );
      budget = args.finalBudget;
    }
    if ((args.reason ?? "").length > 2000)
      throw new ConvexError("Please shorten the decision note.");
    return ctx.db.insert("decisions", {
      accountId: r.accountId,
      ownerId: user,
      recommendationId: r._id,
      decision: args.decision,
      finalBudget: budget,
      reason: args.reason ?? "",
      createdAt: Date.now(),
    });
  },
});
export const history = query({
  args: {},
  returns: v.any(),
  handler: async (ctx) => {
    const user = await getAuthUserId(ctx);
    if (!user) return [];
    const a = await ctx.db
      .query("accounts")
      .withIndex("by_owner", (q) => q.eq("ownerId", user))
      .first();
    if (!a) return [];
    const decisions = await ctx.db
      .query("decisions")
      .withIndex("by_account", (q) => q.eq("accountId", a._id))
      .order("desc")
      .take(100);
    return Promise.all(
      decisions.map(async (d) => ({
        ...d,
        recommendation: (await ctx.db.get(d.recommendationId))?.payload ?? null,
        implementations: await ctx.db
          .query("implementations")
          .withIndex("by_decision", (q) => q.eq("decisionId", d._id))
          .order("desc")
          .take(20),
      })),
    );
  },
});

export const beginImport = mutation({
  args: { accountId: v.id("accounts"), metadata: v.any(), mapping: v.any() },
  returns: v.id("imports"),
  handler: async (ctx, args) => {
    const a = await account(ctx, args.accountId);
    if (
      JSON.stringify(args.metadata).length > 10000 ||
      JSON.stringify(args.mapping).length > 10000
    )
      throw new ConvexError("Import metadata is too large.");
    return ctx.db.insert("imports", {
      accountId: a._id,
      ownerId: a.ownerId,
      data: { metadata: args.metadata, mapping: args.mapping },
      source: "CSV",
      status: "uploading",
      createdAt: Date.now(),
    });
  },
});
export const appendImportChunk = mutation({
  args: {
    importId: v.id("imports"),
    kind: v.union(
      v.literal("adsets"),
      v.literal("ads"),
      v.literal("snapshots"),
      v.literal("events"),
    ),
    rows: v.any(),
    sequence: v.number(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const user = await owner(ctx);
    const i = await ctx.db.get(args.importId);
    if (!i || i.ownerId !== user || i.status !== "uploading")
      throw new ConvexError("This upload is not available.");
    if (
      !Array.isArray(args.rows) ||
      args.rows.length > 200 ||
      JSON.stringify(args.rows).length > 200000
    )
      throw new ConvexError("Upload smaller record batches.");
    const chunks = await ctx.db
      .query("importChunks")
      .withIndex("by_import", (q) => q.eq("importId", i._id))
      .take(150);
    if (
      chunks.length >= 100 ||
      chunks.some((c) => c.sequence === args.sequence)
    )
      throw new ConvexError("Too many upload chunks or a duplicate chunk.");
    await ctx.db.insert("importChunks", {
      accountId: i.accountId,
      importId: i._id,
      kind: args.kind,
      rows: args.rows,
      sequence: args.sequence,
    });
    return null;
  },
});
export const finalizeImport = mutation({
  args: { importId: v.id("imports") },
  returns: v.object({
    importId: v.id("imports"),
    recommendationCount: v.number(),
  }),
  handler: async (ctx, args) => {
    const user = await owner(ctx);
    const i = await ctx.db.get(args.importId);
    if (!i || i.ownerId !== user || i.status !== "uploading")
      throw new ConvexError("This upload is not available.");
    const chunks = await ctx.db
      .query("importChunks")
      .withIndex("by_import", (q) => q.eq("importId", i._id))
      .take(100);
    const data = {
      ...i.data.metadata,
      adsets: [],
      ads: [],
      snapshots: [],
      events: [],
      source: "csv",
    } as ImportData;
    for (const c of chunks.sort((a, b) => a.sequence - b.sequence))
      (data[c.kind] as any[]).push(...c.rows);
    return persistImport(
      ctx,
      { accountId: i.accountId, data, mapping: i.data.mapping },
      i._id,
    );
  },
});
