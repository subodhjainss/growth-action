import { test } from "node:test";
import assert from "node:assert/strict";
import { evaluatePlan } from "../domain/planning";
import { demoData, demoContext } from "../domain/demo";
import { assessImport } from "../domain/engine";
const now = new Date("2026-10-05T08:00:00Z");
const cards = assessImport(demoData(now), demoContext, { demo: true, now });
test("planning uses integer money sums, includes readonly ABO budgets and excludes campaign-controlled spend", () => {
  const plan = evaluatePlan(
    cards,
    { "demo-tees": 10500, "demo-knit": 5700 },
    null,
  );
  assert.equal(plan.currentTotal, 29000);
  assert.equal(plan.plannedTotal, 29200);
  assert.equal(plan.delta, 200);
  assert.equal(plan.scopeIncomplete, true);
  assert.equal(plan.excludedCount, 1);
  assert.equal(plan.errors.length, 0);
  assert.equal(
    plan.rows.find((r) => r.adsetId === "demo-new")!.editable,
    false,
  );
});
test("envelope and evidence safeguards cannot be bypassed by a draft", () => {
  assert(
    evaluatePlan(cards, { "demo-tees": 11000 }, 29000).errors.some((x) =>
      x.includes("envelope"),
    ),
  );
  assert(
    evaluatePlan(cards, { "demo-new": 4500 }, null).errors.some((x) =>
      x.includes("gaps"),
    ),
  );
  assert(evaluatePlan(cards, { "not-this-import": 1 }, null).errors.length > 0);
  assert(evaluatePlan(cards, { "demo-tees": NaN }, null).errors.length > 0);
  assert(evaluatePlan(cards, { "demo-tees": 10.123 }, null).errors.length > 0);
});
