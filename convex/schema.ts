import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";
export default defineSchema({
  ...authTables,
  accounts: defineTable({
    ownerId: v.id("users"),
    platform: v.literal("META"),
    externalAccountId: v.optional(v.string()),
    currency: v.optional(v.string()),
    timezone: v.optional(v.string()),
    context: v.any(),
    mapping: v.any(),
    updatedAt: v.number(),
  }).index("by_owner", ["ownerId"]),
  imports: defineTable({
    accountId: v.id("accounts"),
    ownerId: v.id("users"),
    data: v.any(),
    source: v.union(v.literal("CSV"), v.literal("META_API")),
    status: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_account", ["accountId"])
    .index("by_account_status", ["accountId", "status"]),
  importChunks: defineTable({
    accountId: v.id("accounts"),
    importId: v.id("imports"),
    kind: v.union(
      v.literal("adsets"),
      v.literal("ads"),
      v.literal("snapshots"),
      v.literal("events"),
    ),
    rows: v.any(),
    sequence: v.number(),
  }).index("by_import", ["importId"]),
  recommendations: defineTable({
    accountId: v.id("accounts"),
    ownerId: v.id("users"),
    importId: v.id("imports"),
    adsetId: v.string(),
    payload: v.any(),
    policyVersion: v.string(),
    createdAt: v.number(),
  })
    .index("by_account", ["accountId"])
    .index("by_import", ["importId"]),
  decisions: defineTable({
    accountId: v.id("accounts"),
    ownerId: v.id("users"),
    recommendationId: v.id("recommendations"),
    decision: v.union(
      v.literal("APPROVED"),
      v.literal("EDITED"),
      v.literal("REJECTED"),
      v.literal("NO_ACTION_CONFIRMED"),
    ),
    finalBudget: v.union(v.number(), v.null()),
    reason: v.string(),
    createdAt: v.number(),
  })
    .index("by_account", ["accountId"])
    .index("by_recommendation", ["recommendationId"]),
  budgetPlans: defineTable({
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
  }).index("by_account", ["accountId"]),
  implementations: defineTable({
    accountId: v.id("accounts"),
    ownerId: v.id("users"),
    recommendationId: v.id("recommendations"),
    decisionId: v.id("decisions"),
    importId: v.id("imports"),
    state: v.union(
      v.literal("IMPLEMENTED_AS_APPROVED"),
      v.literal("IMPLEMENTED_DIFFERENTLY"),
      v.literal("NOT_IMPLEMENTED_OR_DEFERRED"),
      v.literal("UNKNOWN"),
    ),
    observedBudget: v.union(v.number(), v.null()),
    note: v.string(),
    observedAt: v.number(),
  })
    .index("by_account", ["accountId"])
    .index("by_decision", ["decisionId"]),
});
