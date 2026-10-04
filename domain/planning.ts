import type { Recommendation } from "./types";
export interface PlanRow {
  adsetId: string;
  name: string;
  currentBudget: number | null;
  proposedBudget: number | null;
  editable: boolean;
  included: boolean;
  reason: string;
}
export interface PlanEvaluation {
  currentTotal: number;
  plannedTotal: number;
  delta: number;
  errors: string[];
  scopeIncomplete: boolean;
  excludedCount: number;
  rows: PlanRow[];
}
const cents = (n: number) => Math.round(n * 100);
export function evaluatePlan(
  cards: Recommendation[],
  proposed: Record<string, number>,
  envelope: number | null,
): PlanEvaluation {
  const errors: string[] = [];
  const ids = new Set(cards.map((c) => c.adsetId));
  if (cards.length === 0)
    errors.push("Import current budget evidence before saving a plan.");
  if (new Set(cards.map((c) => c.adsetId)).size !== cards.length)
    errors.push("Duplicate budget objects cannot enter a plan.");
  if (!proposed || typeof proposed !== "object" || Array.isArray(proposed))
    throw new Error("Budget choices must be an object.");
  for (const id of Object.keys(proposed))
    if (!ids.has(id))
      errors.push("A budget choice does not belong to the current import.");
  if (
    envelope !== null &&
    (!Number.isFinite(envelope) ||
      envelope <= 0 ||
      envelope > 1e9 ||
      Math.abs(envelope * 100 - Math.round(envelope * 100)) > 0.001)
  )
    errors.push(
      "Enter a positive daily envelope with at most two decimal places.",
    );
  const rows: PlanRow[] = cards.map((card) => {
    const ownerBlocked = card.evidence.safety.some((s) =>
      /shared campaign|ownership is unknown|positive current daily budget/i.test(
        s,
      ),
    );
    const included =
      card.currentBudget !== null && card.currentBudget > 0 && !ownerBlocked;
    const editable =
      included &&
      card.evidence.safety.length === 0 &&
      card.evidence.missing.every((m) => /UNVALIDATED|Gate 1/i.test(m));
    const chosen = Object.prototype.hasOwnProperty.call(proposed, card.adsetId)
      ? proposed[card.adsetId]
      : card.currentBudget;
    if (
      chosen !== null &&
      (!Number.isFinite(chosen) ||
        chosen <= 0 ||
        chosen > 1e8 ||
        Math.abs(chosen * 100 - Math.round(chosen * 100)) > 0.001)
    )
      errors.push(
        `${card.name}: enter a positive budget with at most two decimal places.`,
      );
    if (chosen !== card.currentBudget && !editable)
      errors.push(
        `${card.name}: resolve the listed evidence gaps before changing its draft budget.`,
      );
    return {
      adsetId: card.adsetId,
      name: card.name,
      currentBudget: card.currentBudget,
      proposedBudget: included ? chosen : null,
      editable,
      included,
      reason: editable
        ? "Operator-entered choice; final recommendation policy is still unvalidated."
        : (card.evidence.safety[0] ??
          card.evidence.missing[0] ??
          "Budget control could not be verified."),
    };
  });
  const currentCents = rows
    .filter((r) => r.included)
    .reduce((s, r) => s + cents(r.currentBudget ?? 0), 0);
  const proposedCents = rows
    .filter((r) => r.included)
    .reduce((s, r) => s + cents(r.proposedBudget ?? 0), 0);
  if (
    envelope !== null &&
    Number.isFinite(envelope) &&
    proposedCents > cents(envelope)
  )
    errors.push(
      "The included daily budgets exceed your envelope. Reduce the draft or change the envelope.",
    );
  const excludedCount = rows.filter((r) => !r.included).length;
  return {
    currentTotal: currentCents / 100,
    plannedTotal: proposedCents / 100,
    delta: (proposedCents - currentCents) / 100,
    errors: [...new Set(errors)],
    scopeIncomplete: excludedCount > 0,
    excludedCount,
    rows,
  };
}
