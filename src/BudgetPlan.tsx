import { useEffect, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { anyApi } from "convex/server";
import {
  ArrowLeft,
  ArrowRight,
  Clock3,
  Info,
  RotateCcw,
  Save,
} from "lucide-react";
import type { BusinessContext, Recommendation } from "../domain/types";
import { evaluatePlan, type PlanEvaluation } from "../domain/planning";
const api = anyApi;
interface SavedPlan {
  _id: string;
  version: number;
  createdAt: number;
  envelope: number | null;
  objective: string;
  reason: string;
  proposedBudgets: Record<string, number>;
  evaluation: PlanEvaluation;
  restoredFrom?: string;
}
const demoKey = "growth-action-synthetic-budget-plans-v1";
export function BudgetPlan({
  cards,
  context,
  currency,
  accountId,
  importId,
  isDemo,
  onBack,
}: {
  cards: Recommendation[];
  context: BusinessContext;
  currency: string;
  accountId?: string;
  importId?: string;
  isDemo: boolean;
  onBack: () => void;
}) {
  const saved = useQuery(
    api.plans.get,
    !isDemo && accountId ? { accountId } : "skip",
  ) as SavedPlan[] | undefined;
  const save = useMutation(api.plans.save);
  const [demoPlans, setDemoPlans] = useState<SavedPlan[]>(() => {
    if (!isDemo) return [];
    try {
      return JSON.parse(localStorage.getItem(demoKey) ?? "[]");
    } catch {
      return [];
    }
  });
  const [budgets, setBudgets] = useState<Record<string, number>>({});
  const [ceiling, setCeiling] = useState("");
  const [objective, setObjective] = useState(
    "Balance growth and efficiency within the business constraints.",
  );
  const [reason, setReason] = useState("");
  const [restoredFrom, setRestoredFrom] = useState<string | undefined>();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (isDemo) localStorage.setItem(demoKey, JSON.stringify(demoPlans));
  }, [demoPlans, isDemo]);
  const versions = isDemo ? demoPlans : (saved ?? []);
  const envelope = ceiling.trim() ? Number(ceiling) : null;
  const plan = evaluatePlan(cards, budgets, envelope);
  const money = (n: number | null) =>
    n === null
      ? "Not verified"
      : new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency,
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        }).format(n);
  async function record(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");
    if (plan.errors.length) {
      setError(plan.errors[0]);
      return;
    }
    setBusy(true);
    try {
      if (!reason.trim()) throw new Error("Add why you are saving this draft.");
      if (isDemo) {
        const entry: SavedPlan = {
          _id: crypto.randomUUID(),
          version: (versions[0]?.version ?? 0) + 1,
          createdAt: Date.now(),
          envelope,
          objective,
          reason: reason.trim(),
          proposedBudgets: { ...budgets },
          evaluation: structuredClone(plan),
          ...(restoredFrom ? { restoredFrom } : {}),
        };
        setDemoPlans([entry, ...demoPlans].slice(0, 20));
      } else {
        if (!accountId || !importId)
          throw new Error("Import current budget evidence first.");
        await save({
          accountId,
          importId,
          envelope,
          objective,
          reason: reason.trim(),
          proposedBudgets: budgets,
          ...(restoredFrom ? { restoredFrom } : {}),
        });
      }
      setRestoredFrom(undefined);
      setMessage(
        "Draft version saved. No recommendation was approved and no Meta budget changed.",
      );
    } catch (e) {
      setError(
        e instanceof Error && !/CONVEX|request id/i.test(e.message)
          ? e.message
          : "Could not save this draft. Your previous versions are safe. Check the envelope or refresh the import and retry.",
      );
    } finally {
      setBusy(false);
    }
  }
  function restore(v: SavedPlan) {
    setBudgets({ ...v.proposedBudgets });
    setCeiling(v.envelope === null ? "" : String(v.envelope));
    setObjective(v.objective);
    setReason(
      `Restoring choices from version ${v.version} for review against the current import.`,
    );
    setRestoredFrom(v._id);
    setMessage(
      "Earlier choices loaded. Review current evidence, then save a new version. The original stays unchanged.",
    );
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  return (
    <main className="workspace planning-screen">
      <div className="page-heading">
        <div>
          <h1>
            Plan your Meta budgets<span className="heading-dot">.</span>
          </h1>
          <p>
            A daily envelope, considered choices and a record of each version.
          </p>
        </div>
        <button className="button-secondary" onClick={onBack}>
          <ArrowLeft size={16} />
          Back to Today
        </button>
      </div>
      <div className="notice">
        <Info size={17} />
        <div>
          V1.1 planning foundation. These are your manual draft choices, not
          validated allocation recommendations. Configured budget is not actual
          spend; this screen does not forecast ROAS or change ads.
        </div>
      </div>
      {plan.scopeIncomplete && (
        <div role="status" className="notice">
          <Info size={17} />
          <div>
            <strong>Partial account scope.</strong> {plan.excludedCount} budget{" "}
            {plan.excludedCount === 1 ? "object is" : "objects are"} not
            included because control or current configuration is unverified.
            Totals below cover included independent daily budgets only. They are
            not the whole Meta account.
          </div>
        </div>
      )}
      {message && (
        <div role="status" className="plan-message">
          {message}
        </div>
      )}
      {error && (
        <div role="alert" className="error-box">
          {error}
        </div>
      )}
      <form onSubmit={record}>
        <section className="plan-intent">
          <h2>What are we planning toward?</h2>
          <div className="form-grid">
            <label>
              Daily budget envelope (optional)
              <input
                type="number"
                min="0.01"
                step="0.01"
                value={ceiling}
                onChange={(e) => setCeiling(e.target.value)}
                placeholder="No numeric ceiling set"
              />
            </label>
            <label>
              Plan objective
              <input
                value={objective}
                onChange={(e) => setObjective(e.target.value)}
                maxLength={500}
                required
              />
            </label>
          </div>
          <p>
            Minimum ROAS: {context.minimumRoas ?? "Not confirmed"} · Desired
            overall ROAS: {context.targetRoas ?? "Not confirmed"}. Neither
            number predicts the result of this draft.
          </p>
        </section>
        <section className="plan-summary" aria-label="Included budget totals">
          <div>
            <span>Current included budget</span>
            <strong>{money(plan.currentTotal)}/day</strong>
          </div>
          <ArrowRight size={22} />
          <div>
            <span>Draft included budget</span>
            <strong>{money(plan.plannedTotal)}/day</strong>
          </div>
          <div>
            <span>Change</span>
            <strong>
              {plan.delta > 0 ? "+" : ""}
              {money(plan.delta)}/day
            </strong>
          </div>
        </section>
        <section className="plan-rows">
          <h2>Your budget choices</h2>
          {plan.rows.map((row) => (
            <div className="plan-row" key={row.adsetId}>
              <div>
                <h3>{row.name}</h3>
                <p>{row.reason}</p>
                {!row.included && (
                  <span className="tiny-label">Excluded from totals</span>
                )}
              </div>
              <span className="plan-current">
                Current {money(row.currentBudget)}/day
              </span>
              <label>
                Draft daily budget
                <input
                  aria-label={`${row.name} draft daily budget`}
                  type="number"
                  min="0.01"
                  max="100000000"
                  step="0.01"
                  value={
                    row.included
                      ? (budgets[row.adsetId] ?? row.currentBudget ?? "")
                      : ""
                  }
                  placeholder="Unavailable"
                  disabled={!row.editable || busy}
                  onChange={(e) =>
                    setBudgets({
                      ...budgets,
                      [row.adsetId]: Number(e.target.value),
                    })
                  }
                />
              </label>
            </div>
          ))}
        </section>
        {plan.errors.length > 0 && (
          <div role="alert" className="error-box">
            <div>
              {plan.errors.map((x, i) => (
                <p key={i}>{x}</p>
              ))}
            </div>
          </div>
        )}
        <label className="plan-reason">
          Why save this version?
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            maxLength={1000}
            required
            placeholder="What changed, or what should the next review remember?"
          />
        </label>
        <button
          className="button"
          disabled={busy || plan.errors.length > 0 || !cards.length}
        >
          <Save size={17} />
          {busy
            ? "Saving draft…"
            : restoredFrom
              ? "Save restored choices as new version"
              : "Save draft version"}
        </button>
      </form>
      <section className="plan-versions">
        <h2>Earlier versions</h2>
        {!isDemo && accountId && saved === undefined ? (
          <p role="status">Loading your saved plans…</p>
        ) : versions.length === 0 ? (
          <p>No plan versions yet. Your first saved draft will appear here.</p>
        ) : (
          versions.map((v) => (
            <article className="plan-version" key={v._id}>
              <div>
                <h3>Version {v.version} · Draft</h3>
                <small>
                  <Clock3 size={13} />
                  {new Date(v.createdAt).toLocaleString()}
                </small>
                <p>{v.reason}</p>
                <p>
                  {money(v.evaluation.plannedTotal)}/day ·{" "}
                  {v.evaluation.scopeIncomplete
                    ? "Partial scope"
                    : "Included scope"}
                  {v.restoredFrom ? " · Restored choices" : ""}
                </p>
              </div>
              <button
                className="button-secondary"
                type="button"
                onClick={() => restore(v)}
              >
                <RotateCcw size={16} />
                Use these choices
              </button>
            </article>
          ))
        )}
      </section>
    </main>
  );
}
