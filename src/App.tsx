import { useEffect, useRef, useState } from "react";
import { useAction, useMutation, useQuery, useConvexAuth } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { anyApi } from "convex/server";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  Plus,
  Check,
  ChevronDown,
  ChevronRight,
  LogOut,
  Menu,
  X,
  Upload,
  Link2,
  ShieldCheck,
  RefreshCw,
  History,
  MessageSquare,
  AlertTriangle,
  CheckCircle2,
  Clock3,
  ExternalLink,
  FileText,
  FlaskConical,
  Settings2,
  Info,
  Loader2,
  Search,
  TrendingUp,
  TrendingDown,
  Minus,
  Download,
  Eye,
} from "lucide-react";
import type {
  BusinessContext,
  Decision,
  Implementation,
  ImportData,
  Recommendation,
} from "../domain/types";
import {
  assessImport,
  inferImplementation,
  validateImport,
} from "../domain/engine";
import { demoContext, demoData } from "../domain/demo";
import {
  assemble,
  applySavedMapping,
  saveMapping,
  downloadTemplates,
  fieldMapping,
  parseFile,
  type ParsedFile,
} from "./importCsv";
const api = anyApi;
type Screen = "website" | "brand" | "setup" | "today" | "history";
interface DemoState {
  context: BusinessContext;
  data: ImportData;
  cards: Recommendation[];
  decisions: Decision[];
  implementations: Implementation[];
}
const blank: BusinessContext = {
  website: "",
  brandName: "",
  products: "",
  customers: "",
  positioning: "",
  offers: "",
  notes: "",
  constraintStatus: "unknown",
  constraintNotes: "",
  optimizationMode: "balanced",
};
function safeError(e: unknown) {
  const text =
    e instanceof Error ? e.message : "Something went wrong. Please try again.";
  const match = text.match(/Uncaught ConvexError:\s*([^\n]+)/);
  if (match) return match[1];
  return /request id|server error|\[CONVEX/i.test(text)
    ? "This request could not be completed. Your saved work is still available. Try again."
    : text;
}
function useDemo() {
  const [state, setState] = useState<DemoState | null>(() => {
    try {
      const v = JSON.parse(
        localStorage.getItem("growth-action-synthetic-demo-v1") ?? "null",
      );
      return v?.data?.source === "demo" ? v : null;
    } catch {
      return null;
    }
  });
  useEffect(() => {
    if (state)
      localStorage.setItem(
        "growth-action-synthetic-demo-v1",
        JSON.stringify(state),
      );
    else localStorage.removeItem("growth-action-synthetic-demo-v1");
  }, [state]);
  return [state, setState] as const;
}
const money = (n: number | null, c = "INR") =>
  n === null
    ? "Unavailable"
    : new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: c,
        maximumFractionDigits: 0,
      }).format(n);
function MathField() {
  return (
    <div className="math-field" aria-hidden="true">
      <span className="math-bracket">{"{"}</span>
      <span className="math-delta">Δ</span>
      <span className="math-plus">+</span>
      <span className="math-equation">ROAS = value / spend</span>
      <svg className="math-connection" viewBox="0 0 160 160">
        <path d="M30 35L115 80L60 135" />
        <circle cx="30" cy="35" r="7" />
        <circle cx="115" cy="80" r="10" />
        <circle cx="60" cy="135" r="6" />
      </svg>
      <span className="math-arrow">↗</span>
      <i className="dot dot-a" />
      <i className="dot dot-b" />
      <i className="dot dot-c" />
    </div>
  );
}
function Logo({ onClick }: { onClick: () => void }) {
  return (
    <button className="logo" onClick={onClick} aria-label="Growth Action home">
      <span className="logo-mark">
        <ArrowUpRight size={23} />
      </span>
      Growth Action<span className="logo-dot">.</span>
    </button>
  );
}
function Busy({ text }: { text: string }) {
  return (
    <div role="status" className="busy">
      <Loader2 className="spin" size={20} />
      {text}
    </div>
  );
}
function ErrorBox({ text }: { text: string }) {
  return (
    <div role="alert" className="error-box">
      <AlertTriangle size={18} />
      <span>{text}</span>
    </div>
  );
}
function Notice({ children }: { children: React.ReactNode }) {
  return (
    <div className="notice">
      <Info size={17} />
      <div>{children}</div>
    </div>
  );
}
export default function App() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { signIn, signOut } = useAuthActions();
  const inspect = useAction(api.website.inspect);
  const saveContext = useMutation(api.workspace.saveContext);
  const beginImport = useMutation(api.workspace.beginImport);
  const appendChunk = useMutation(api.workspace.appendImportChunk);
  const finalizeImport = useMutation(api.workspace.finalizeImport);
  const decide = useMutation(api.workspace.decide);
  const workspace = useQuery(
    api.workspace.get,
    isAuthenticated ? {} : "skip",
  ) as any;
  const savedHistory = useQuery(
    api.workspace.history,
    isAuthenticated ? {} : "skip",
  ) as any[] | undefined;
  const [demo, setDemo] = useDemo();
  const [demoActive, setDemoActive] = useState(false);
  const [screen, setScreen] = useState<Screen>("website");
  const [context, setContext] = useState<BusinessContext>(blank);
  const [website, setWebsite] = useState("");
  const [busy, setBusy] = useState("");
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const [authMode, setAuthMode] = useState<"signIn" | "signUp">("signUp");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [correction, setCorrection] = useState("");
  const [editBrand, setEditBrand] = useState(false);
  const [source, setSource] = useState<"meta" | "csv">("meta");
  const [files, setFiles] = useState<ParsedFile[]>([]);
  const [currency, setCurrency] = useState("INR");
  const [timezone, setTimezone] = useState("Asia/Kolkata");
  const [fetchedAt, setFetchedAt] = useState(
    new Date().toISOString().slice(0, 16),
  );
  const [verified, setVerified] = useState(false);
  const [min, setMin] = useState("");
  const [target, setTarget] = useState("");
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [editing, setEditing] = useState<string | null>(null);
  const [editedAmount, setEditedAmount] = useState("");
  const [decisionNote, setDecisionNote] = useState("");
  const [historyOpen, setHistoryOpen] = useState<string | null>(null);
  const didRestore = useRef(false);
  useEffect(() => {
    if (workspace && !didRestore.current) {
      didRestore.current = true;
      setContext(workspace.context);
      setMin(workspace.context.minimumRoas?.toString() ?? "");
      setTarget(workspace.context.targetRoas?.toString() ?? "");
      if (workspace.latestImport?.data.currency)
        setCurrency(workspace.latestImport.data.currency);
      if (workspace.latestImport?.data.timezone)
        setTimezone(workspace.latestImport.data.timezone);
      setScreen(workspace.latestImport ? "today" : "setup");
    }
  }, [workspace]);
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);
  useEffect(() => {
    setError("");
    window.scrollTo({ top: 0 });
  }, [screen]);
  const liveContext = demoActive && demo ? demo.context : context;
  const cards: Recommendation[] =
    demoActive && demo ? demo.cards : (workspace?.recommendations ?? []);
  const currencyUsed = demoActive
    ? "INR"
    : (workspace?.latestImport?.data?.currency ?? currency);
  const realDecisions: Decision[] = (workspace?.decisions ?? []).map(
    (x: any) => {
      const rec = cards.find((c) => (c as any)._id === x.recommendationId);
      return {
        id: x._id,
        recommendationKey: rec?.key ?? "",
        adsetId: rec?.adsetId ?? "",
        name: rec?.name ?? "",
        action: rec?.action ?? "INSUFFICIENT EVIDENCE",
        decision: x.decision,
        baselineBudget: rec?.currentBudget ?? null,
        finalBudget: x.finalBudget,
        reason: x.reason,
        decidedAt: new Date(x.createdAt).toISOString(),
        originalRecommendation: rec,
      };
    },
  );
  const decisions = demoActive && demo ? demo.decisions : realDecisions;
  const implementations: Implementation[] =
    demoActive && demo
      ? demo.implementations
      : (workspace?.implementations ?? []).map((x: any) => ({
          decisionId: x.decisionId,
          state: (
            {
              IMPLEMENTED_AS_APPROVED: "Done as approved",
              IMPLEMENTED_DIFFERENTLY: "Done differently",
              NOT_IMPLEMENTED_OR_DEFERRED: "Not done yet",
              UNKNOWN: "Unable to verify",
            } as any
          )[x.state],
          observedBudget: x.observedBudget,
          observedAt: new Date(x.observedAt).toISOString(),
          note: x.note,
        }));
  const reviewed = cards.filter((c) =>
    decisions.some((d) => d.recommendationKey === c.key),
  ).length;
  function navigate(s: Screen) {
    setScreen(s);
    setMobileMenu(false);
  }
  function startDemo() {
    const data = demoData(),
      ctx = { ...demoContext };
    const state = demo ?? {
      context: ctx,
      data,
      cards: assessImport(data, ctx, { demo: true }),
      decisions: [],
      implementations: [],
    };
    setDemo(state);
    setDemoActive(true);
    setScreen("today");
    setToast("Synthetic demo opened. These are invented examples.");
  }
  async function readWebsite(e: React.FormEvent) {
    e.preventDefault();
    if (!website.trim()) return;
    setError("");
    setBusy("I’m reading your website.");
    try {
      const result = await inspect({ url: website.trim() });
      setContext({
        ...blank,
        website: result.sourceUrl,
        brandName: result.brandName,
        products: result.products,
        customers: result.customers,
        positioning: result.positioning,
        offers: result.offers,
      });
      setScreen("brand");
    } catch (e) {
      setError(safeError(e));
    } finally {
      setBusy("");
    }
  }
  function manuallyStart() {
    setContext({ ...blank, website, brandName: "" });
    setEditBrand(true);
    setScreen("brand");
  }
  function correctBrand(e: React.FormEvent) {
    e.preventDefault();
    if (!correction.trim()) return;
    const next = { ...context };
    let mapped = false;
    for (const line of correction.split("\n")) {
      const match = line.match(
        /^(products|customers|positioning|offers|brand|name)\s*:\s*(.*)$/i,
      );
      if (match) {
        const key = /brand|name/i.test(match[1])
          ? "brandName"
          : match[1].toLowerCase();
        (next as any)[key] = match[2];
        mapped = true;
      }
    }
    if (!mapped) {
      next.notes = [next.notes, correction.trim()].filter(Boolean).join("\n");
    }
    setContext(next);
    setCorrection("");
    setToast(
      mapped
        ? "Your business summary is updated."
        : "Your correction is saved as business context. You can also edit each summary field.",
    );
  }
  async function authenticate(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(
      authMode === "signUp"
        ? "Creating your private workspace."
        : "Signing you in.",
    );
    try {
      await signIn("password", {
        email: email.trim(),
        password,
        flow: authMode,
      });
      setPassword("");
      setToast("Signed in. Your account data stays in your private workspace.");
    } catch (e) {
      setError(
        "Sign-in failed. Check your email and password, or switch between creating an account and signing in.",
      );
    } finally {
      setBusy("");
    }
  }
  async function uploadFiles(list: FileList | null) {
    if (!list) return;
    setError("");
    setBusy("Reading file headers and checking formats.");
    try {
      const parsed = (await Promise.all([...list].map(parseFile))).map((f) =>
        applySavedMapping(f, workspace?.account?.mapping ?? workspace?.mapping),
      );
      setFiles((old) => [
        ...old.filter((o) => !parsed.some((p) => p.name === o.name)),
        ...parsed,
      ]);
    } catch (e) {
      setError(safeError(e));
    } finally {
      setBusy("");
    }
  }
  async function importCsv(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      const minimum = Number(min),
        desired = Number(target);
      if (
        !Number.isFinite(minimum) ||
        minimum <= 0 ||
        !Number.isFinite(desired) ||
        desired <= 0 ||
        desired < minimum
      )
        throw new Error(
          "Enter a positive minimum and an overall target at least as high as the minimum.",
        );
      const newContext = {
        ...context,
        minimumRoas: minimum,
        targetRoas: desired,
      };
      const data = assemble(files, {
        currency,
        timezone,
        fetchedAt: new Date(
          fetchedAt.endsWith("Z") ? fetchedAt : fetchedAt + "Z",
        ).toISOString(),
        measurementVerified: verified,
      });
      const issues = validateImport(data);
      if (issues.length) throw new Error(issues.slice(0, 4).join(" "));
      setBusy("Saving context and preparing your private import.");
      const accountId = await saveContext({ context: newContext });
      const metadata = {
        currency: data.currency,
        timezone: data.timezone,
        fetchedAt: data.fetchedAt,
        measurementVerified: data.measurementVerified,
        source: "csv",
      };
      const mapping = saveMapping(
        files,
        workspace?.account?.mapping ?? workspace?.mapping,
      );
      const importId = await beginImport({ accountId, metadata, mapping });
      let sequence = 0;
      const count =
        data.adsets.length +
        data.ads.length +
        data.snapshots.length +
        data.events.length;
      let done = 0;
      for (const kind of ["adsets", "ads", "snapshots", "events"] as const)
        for (let i = 0; i < data[kind].length; i += 150) {
          const rows = data[kind].slice(i, i + 150);
          await appendChunk({ importId, kind, rows, sequence: sequence++ });
          done += rows.length;
          setBusy(
            `Saving validated records: ${done.toLocaleString()} of ${count.toLocaleString()}.`,
          );
        }
      await finalizeImport({ importId });
      setContext(newContext);
      setFiles([]);
      setScreen("today");
      setToast(
        "Import saved. Evidence is ready; unvalidated policy is clearly marked.",
      );
    } catch (e) {
      setError(safeError(e));
    } finally {
      setBusy("");
    }
  }
  async function recordDecision(
    card: Recommendation,
    kind: Decision["decision"],
    amount?: number,
    note = "",
  ) {
    setError("");
    setBusy("Saving your decision.");
    try {
      if (demoActive && demo) {
        if (demo.decisions.some((d) => d.recommendationKey === card.key))
          throw new Error("This decision is already saved.");
        const d: Decision = {
          id: crypto.randomUUID(),
          recommendationKey: card.key,
          adsetId: card.adsetId,
          name: card.name,
          action: card.action,
          decision: kind,
          baselineBudget: card.currentBudget,
          finalBudget:
            kind === "REJECTED"
              ? null
              : (amount ?? card.nextBudget ?? card.currentBudget),
          reason: note,
          decidedAt: new Date().toISOString(),
          originalRecommendation: card,
        };
        setDemo({ ...demo, decisions: [d, ...demo.decisions] });
      } else
        await decide({
          recommendationId: (card as any)._id,
          decision: kind,
          ...(amount !== undefined ? { finalBudget: amount } : {}),
          reason: note,
        });
      setEditing(null);
      setToast(
        kind === "REJECTED"
          ? "Rejected. Your original recommendation stays in history."
          : kind === "NO_ACTION_CONFIRMED"
            ? "No change recorded."
            : "Decision saved. No Meta settings were changed.",
      );
    } catch (e) {
      setError(safeError(e));
    } finally {
      setBusy("");
    }
  }
  function simulateRead(mode: "matches" | "different" | "unchanged") {
    if (!demo) return;
    const simulatedTime = new Date(Date.now() + 86400000).toISOString();
    const updated = {
      ...demo.data,
      snapshots: demo.data.snapshots.map((s) => {
        const d = demo.decisions.find(
          (x) =>
            x.adsetId === s.adsetId &&
            x.finalBudget !== null &&
            x.action !== "HOLD" &&
            x.decision !== "REJECTED",
        );
        return {
          ...s,
          observedAt: simulatedTime,
          budget: d
            ? mode === "matches"
              ? d.finalBudget
              : mode === "different"
                ? Math.round(
                    ((d.finalBudget ?? 0) + (d.baselineBudget ?? 0)) / 2,
                  )
                : d.baselineBudget
            : s.budget,
        };
      }),
    };
    const imps = demo.decisions
      .filter((d) => d.action !== "HOLD" && d.decision !== "REJECTED")
      .map((d) =>
        inferImplementation(
          d,
          updated.snapshots.find((s) => s.adsetId === d.adsetId),
        ),
      );
    setDemo({
      ...demo,
      data: updated,
      implementations: [...imps, ...demo.implementations],
    });
    setToast(
      "Simulated next-day read saved. No external account was read or changed.",
    );
  }
  function evidence(card: Recommendation) {
    const ev = card.evidence;
    const d = decisions.find((x) => x.recommendationKey === card.key);
    const imp = d ? implementations.find((x) => x.decisionId === d.id) : null;
    return (
      <div className="evidence-panel">
        <div className="evidence-heading">
          <FlaskConical size={18} />
          <h3>The evidence behind this decision</h3>
        </div>
        <div className="metrics-grid">
          {[
            ["Recent 7 days", ev.recent],
            ["Previous 7 days", ev.previous],
          ].map(([label, m]: any) => (
            <div key={label}>
              <span>{label}</span>
              <strong>
                {m.roas === null ? "Unavailable" : `${m.roas.toFixed(2)}× ROAS`}
              </strong>
              <small>
                {m.start} → {m.end}
              </small>
              <small>
                {m.days}/{m.expectedDays} days · {m.purchases ?? "Unknown"}{" "}
                purchases
              </small>
            </div>
          ))}
        </div>
        <div className="evidence-columns">
          <section>
            <h4>Supporting signals</h4>
            <ul>
              {ev.supporting.length ? (
                ev.supporting.map((x, i) => <li key={i}>{x}</li>)
              ) : (
                <li>No sufficient supporting signals yet.</li>
              )}
            </ul>
          </section>
          <section>
            <h4>What gives us pause</h4>
            <ul>
              {[...ev.contradicting, ...ev.safety, ...ev.missing].map(
                (x, i) => (
                  <li key={i}>{x}</li>
                ),
              )}
              {!ev.contradicting.length &&
                !ev.safety.length &&
                !ev.missing.length && (
                  <li>
                    No additional contradictions in this synthetic example.
                  </li>
                )}
            </ul>
          </section>
        </div>
        <p className="evidence-foot">{ev.goalNote}</p>
        <p className="evidence-foot">{ev.measurementNote}</p>
        {ev.topAdShare !== null && (
          <p className="evidence-foot">
            Largest ad: {(ev.topAdShare * 100).toFixed(1)}% of ad-level spend.
            Concentration alone does not prove fatigue.
          </p>
        )}
        <details>
          <summary>Calculation definitions & policy</summary>
          <p>
            ROAS = purchase value ÷ spend. CTR = link clicks ÷ impressions. CPA
            = spend ÷ purchases. Ratios use total numerators and denominators,
            not averages of daily ratios. Reach is not summed.
          </p>
          <p>{ev.sampleNote}</p>
          <p>{ev.confidenceReason}</p>
          <p>
            Policy: {ev.policyVersion} · UNVALIDATED
            {card.isDemo ? " · invented demo parameters" : ""}.
          </p>
          <p>
            Settings observed: {new Date(card.observedAt).toLocaleString()}.
          </p>
        </details>
        {d && (
          <div className="observation-detail">
            <h4>Decision versus implementation</h4>
            <p>
              Original recommendation: {card.magnitude}. Your final decision:{" "}
              {money(d.finalBudget, currencyUsed)}
              {d.finalBudget !== null ? "/day" : ""}.
            </p>
            {imp ? (
              <>
                <p>
                  Observed: {money(imp.observedBudget, currencyUsed)} at{" "}
                  {new Date(imp.observedAt).toLocaleString()}.
                </p>
                <p>{imp.note}</p>
              </>
            ) : (
              <p>Awaiting a later read. Approval is not implementation.</p>
            )}
          </div>
        )}
      </div>
    );
  }
  function decisionCard(card: Recommendation) {
    const d = decisions.find((x) => x.recommendationKey === card.key),
      imp = d ? implementations.find((x) => x.decisionId === d.id) : null,
      open = selected === card.key;
    const Icon =
      card.action === "SCALE UP"
        ? TrendingUp
        : card.action === "SCALE DOWN"
          ? TrendingDown
          : card.action === "HOLD"
            ? Minus
            : Search;
    const tone =
      card.action === "SCALE UP"
        ? "scale"
        : card.action === "SCALE DOWN"
          ? "reduce"
          : card.action === "HOLD"
            ? "hold"
            : "uncertain";
    const canApprove =
      card.isDemo && ["SCALE UP", "SCALE DOWN", "HOLD"].includes(card.action);
    return (
      <article
        className={`decision-card ${open ? "expanded" : ""}`}
        key={card.key}
      >
        <div className="card-title">
          <span className={`card-symbol ${tone}`}>
            <Icon size={21} />
          </span>
          <div>
            <h2>{card.name}</h2>
            <span className="campaign-name">{card.campaignName}</span>
          </div>
          {card.isDemo && <span className="tiny-label">Synthetic</span>}
        </div>
        <dl className="five-fields">
          <div>
            <dt>Action</dt>
            <dd>
              <span className={`action-tag ${tone}`}>
                {card.action === "HOLD" ? "HOLD / LEAVE ALONE" : card.action}
              </span>
            </dd>
          </div>
          <div>
            <dt>Magnitude</dt>
            <dd className="budget-value">{card.magnitude}</dd>
          </div>
          <div>
            <dt>One-line reason</dt>
            <dd>{card.reason}</dd>
          </div>
          <div>
            <dt>RCA bucket</dt>
            <dd>{card.rca}</dd>
          </div>
          <div>
            <dt>Confidence</dt>
            <dd>
              <span className="confidence">{card.confidence}</span>
            </dd>
          </div>
        </dl>
        {d && (
          <div className="workflow-state">
            <span className="decision-saved">
              <CheckCircle2 size={15} />
              {d.decision === "REJECTED"
                ? "Rejected"
                : d.decision === "NO_ACTION_CONFIRMED"
                  ? "No change recorded"
                  : d.decision === "EDITED"
                    ? "Edited & approved"
                    : "Approved"}
            </span>
            {d.action !== "HOLD" &&
              d.decision !== "REJECTED" &&
              d.decision !== "NO_ACTION_CONFIRMED" && (
                <span
                  className={`implementation-state ${imp?.state === "Done as approved" ? "success" : "attention"}`}
                >
                  <Clock3 size={15} />
                  {imp?.state ?? "Awaiting next read"}
                </span>
              )}
          </div>
        )}
        <div className="card-controls">
          <button
            className="text-button"
            onClick={() => setSelected(open ? null : card.key)}
            aria-expanded={open}
          >
            {open ? "Close evidence" : "Why?"}
            <ChevronDown size={16} className={open ? "rotated" : ""} />
          </button>
          {!d && (
            <div className="review-actions">
              {canApprove ? (
                <button
                  className="button compact"
                  disabled={!!busy}
                  onClick={() => recordDecision(card, "APPROVED")}
                >
                  {card.action === "HOLD" ? "Keep budget" : "Approve"}
                  <Check size={15} />
                </button>
              ) : (
                <button
                  className="button-secondary compact"
                  disabled={!!busy}
                  onClick={() => recordDecision(card, "NO_ACTION_CONFIRMED")}
                >
                  Record no change
                </button>
              )}
              <button
                className="button-secondary compact"
                disabled={!!busy || card.evidence.safety.length > 0}
                onClick={() => {
                  setEditing(card.key);
                  setEditedAmount(
                    String(card.nextBudget ?? card.currentBudget ?? ""),
                  );
                  setDecisionNote("");
                }}
              >
                {card.isDemo ? "Edit" : "Record my decision"}
              </button>
              <button
                className="reject-button"
                disabled={!!busy}
                onClick={() => recordDecision(card, "REJECTED")}
              >
                Reject
              </button>
            </div>
          )}
        </div>
        {editing === card.key && (
          <form
            className="edit-panel"
            onSubmit={(e) => {
              e.preventDefault();
              const amount = Number(editedAmount);
              if (!Number.isFinite(amount) || amount <= 0) {
                setError("Enter a positive daily budget.");
                return;
              }
              if (!decisionNote.trim()) {
                setError("Add a reason for your edited decision.");
                return;
              }
              void recordDecision(card, "EDITED", amount, decisionNote);
            }}
          >
            <h3>Your budget decision</h3>
            <p>
              The original recommendation stays in history. This saves your
              choice; it does not change Meta.
            </p>
            <label>
              Final daily budget ({currencyUsed})
              <input
                type="number"
                min="1"
                step="0.01"
                value={editedAmount}
                onChange={(e) => setEditedAmount(e.target.value)}
                required
              />
            </label>
            <label>
              Why are you choosing this amount?
              <textarea
                value={decisionNote}
                onChange={(e) => setDecisionNote(e.target.value)}
                required
                maxLength={2000}
              />
            </label>
            <div className="form-actions">
              <button className="button compact" disabled={!!busy}>
                Save edited decision
              </button>
              <button
                type="button"
                className="text-button"
                onClick={() => setEditing(null)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
        {open && evidence(card)}
      </article>
    );
  }
  const filtered = cards.filter(
    (c) =>
      (filter === "All" ||
        (filter === "To review" &&
          !decisions.some((d) => d.recommendationKey === c.key)) ||
        (filter === "Reviewed" &&
          decisions.some((d) => d.recommendationKey === c.key)) ||
        (filter === "Needs attention" &&
          ["NEEDS CONTEXT", "INSUFFICIENT EVIDENCE"].includes(c.action))) &&
      c.name.toLowerCase().includes(search.toLowerCase()),
  );
  const appScreen = screen === "today" || screen === "history";
  return (
    <div className={`app ${appScreen ? "workspace-mode" : "onboarding-mode"}`}>
      <header className="header">
        <div className="header-inner">
          <Logo onClick={() => navigate(cards.length ? "today" : "website")} />
          {appScreen ? (
            <>
              <nav className="desktop-nav">
                <button
                  className={screen === "today" ? "active" : ""}
                  onClick={() => navigate("today")}
                >
                  Today
                </button>
                <button
                  className={screen === "history" ? "active" : ""}
                  onClick={() => navigate("history")}
                >
                  History
                </button>
              </nav>
              <div className="header-right">
                <span className="account-name">
                  {liveContext.brandName || "Your business"}
                </span>
                <button
                  className="icon-button"
                  aria-label="Open business settings"
                  onClick={() => {
                    setDemoActive(false);
                    setScreen("brand");
                  }}
                >
                  <Settings2 size={19} />
                </button>
                {isAuthenticated && (
                  <button
                    className="icon-button"
                    aria-label="Sign out"
                    onClick={async () => {
                      await signOut();
                      didRestore.current = false;
                      setContext(blank);
                      setScreen("website");
                    }}
                  >
                    <LogOut size={19} />
                  </button>
                )}
                <button
                  className="icon-button mobile-only"
                  aria-label="Open navigation"
                  onClick={() => setMobileMenu(!mobileMenu)}
                >
                  <Menu size={21} />
                </button>
              </div>
            </>
          ) : (
            <div className="header-right">
              <span className="read-only-header">
                <ShieldCheck size={15} />
                Read-only by design
              </span>
              <button
                className="text-button"
                onClick={() => {
                  setAuthMode("signIn");
                  setScreen("setup");
                }}
              >
                Sign in
                <ArrowUpRight size={15} />
              </button>
            </div>
          )}
        </div>
        {mobileMenu && (
          <nav className="mobile-nav">
            <button onClick={() => navigate("today")}>Today</button>
            <button onClick={() => navigate("history")}>History</button>
          </nav>
        )}
      </header>
      {demoActive && appScreen && (
        <div className="demo-banner">
          <FlaskConical size={16} />
          <span>
            Interactive demo · invented data and unvalidated example rules
          </span>
          <button
            onClick={() => {
              setDemoActive(false);
              setScreen(isAuthenticated ? "setup" : "website");
            }}
          >
            Use my data
            <ArrowRight size={14} />
          </button>
        </div>
      )}
      {toast && (
        <div role="status" className="toast">
          <CheckCircle2 size={17} />
          {toast}
        </div>
      )}
      {screen === "website" && (
        <main className="website-screen">
          <MathField />
          <div className="hero-content">
            <h1>
              Ad budget decisions
              <br />
              that understand
              <br />
              <span className="underlined">your business.</span>
            </h1>
            <p className="hero-subtitle">
              Start with your website. Get recommendations
              <br className="desktop-break" /> shaped by your business and its
              goals.
            </p>
            <form className="website-form" onSubmit={readWebsite}>
              <label className="sr-only" htmlFor="website">
                Your business website
              </label>
              <div className="website-input">
                <Link2 size={21} />
                <input
                  id="website"
                  placeholder="Your business website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  autoComplete="url"
                  maxLength={500}
                  disabled={!!busy}
                  required
                />
              </div>
              <button className="button hero-button" disabled={!!busy}>
                {busy ? (
                  <Loader2 className="spin" size={19} />
                ) : (
                  "Understand my business"
                )}
                {!busy && <ArrowRight size={19} />}
              </button>
            </form>
            {busy && <Busy text={busy} />}{" "}
            {error && (
              <>
                <ErrorBox text={error} />
                <button className="text-button" onClick={manuallyStart}>
                  Enter my brand details instead
                  <ArrowRight size={16} />
                </button>
              </>
            )}
            <div className="hero-demo">
              <span>Want to see how it works first?</span>
              <button onClick={startDemo}>
                Explore the demo
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
          <footer className="onboarding-footer">
            <span>Less second-guessing. More considered decisions.</span>
            <span>Meta-first · Built for D2C & fashion</span>
          </footer>
        </main>
      )}
      {screen === "brand" && (
        <main className="onboarding-card-screen">
          <div className="step-line">
            <button className="text-button" onClick={() => navigate("website")}>
              <ArrowLeft size={16} />
              Back
            </button>
            <span>Understand → Connect → Decide</span>
          </div>
          <div className="brand-layout">
            <div className="brand-intro">
              <span className="large-symbol" aria-hidden="true">
                {"{"}
                <span>you</span>
                {"}"}
              </span>
              <h1>
                Here’s what
                <br />I understood.
              </h1>
              <p>
                Your business comes first.
                <br />
                Make this feel like you.
              </p>
              <div className="source-note">
                <Eye size={16} />
                Website metadata & your corrections.
                <br />
                Review before using it.
              </div>
            </div>
            <div className="brand-summary">
              <div className="brand-summary-title">
                <h2>{context.brandName || "Your brand"}</h2>
                <button
                  className="text-button"
                  onClick={() => setEditBrand(!editBrand)}
                >
                  {editBrand ? "Finish editing" : "Edit details"}
                  <Settings2 size={15} />
                </button>
              </div>
              {editBrand && (
                <label>
                  Brand name
                  <input
                    value={context.brandName}
                    onChange={(e) =>
                      setContext({ ...context, brandName: e.target.value })
                    }
                    maxLength={200}
                  />
                </label>
              )}{" "}
              {(
                ["products", "customers", "positioning", "offers"] as const
              ).map((key) => (
                <div className="summary-row" key={key}>
                  <span>{key[0].toUpperCase() + key.slice(1)}</span>
                  {editBrand ? (
                    <textarea
                      aria-label={key}
                      rows={2}
                      value={context[key]}
                      onChange={(e) =>
                        setContext({ ...context, [key]: e.target.value })
                      }
                      maxLength={1000}
                    />
                  ) : (
                    <p>{context[key] || "Not confirmed yet"}</p>
                  )}
                </div>
              ))}
              {context.notes && (
                <div className="summary-row">
                  <span>Your context</span>
                  <p className="preserve-lines">{context.notes}</p>
                </div>
              )}
              <form className="correction-form" onSubmit={correctBrand}>
                <label htmlFor="correction">Anything to add or correct?</label>
                <div className="correction-input">
                  <textarea
                    id="correction"
                    placeholder="Tell me what I missed. Use “Products:” to update a field, or add a note."
                    value={correction}
                    onChange={(e) => setCorrection(e.target.value)}
                    maxLength={2000}
                  />
                  <button
                    className="icon-button coral"
                    aria-label="Save correction"
                    disabled={!correction.trim()}
                  >
                    <ArrowUpRight size={22} />
                  </button>
                </div>
              </form>
              <div className="brand-next">
                <button
                  className="button"
                  onClick={() => {
                    setSource("meta");
                    navigate("setup");
                  }}
                >
                  Connect my ad account
                  <ArrowRight size={18} />
                </button>
                <button
                  className="text-button"
                  onClick={() => {
                    setSource("csv");
                    navigate("setup");
                  }}
                >
                  Upload CSVs instead
                </button>
                <small>
                  <ShieldCheck size={14} />
                  Read-only. You stay in control of every change.
                </small>
              </div>
            </div>
          </div>
        </main>
      )}
      {screen === "setup" && (
        <main className="setup-screen">
          <div className="step-line">
            <button className="text-button" onClick={() => navigate("brand")}>
              <ArrowLeft size={16} />
              Your business
            </button>
            <span>Understand → Connect → Decide</span>
          </div>
          <div className="setup-heading">
            <h1>
              {isAuthenticated
                ? "Let’s look at your ads."
                : "A private space for your decisions."}
            </h1>
            <p>
              {isAuthenticated
                ? "Bring the evidence. We’ll show what it can—and can’t—tell us."
                : "Sign in before connecting or uploading confidential account data."}
            </p>
          </div>
          {error && <ErrorBox text={error} />} {busy && <Busy text={busy} />}
          {!isAuthenticated ? (
            <div className="auth-layout">
              <form className="auth-form" onSubmit={authenticate}>
                <h2>
                  {authMode === "signUp"
                    ? "Create your account"
                    : "Welcome back"}
                </h2>
                <label>
                  Email
                  <input
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    maxLength={200}
                  />
                </label>
                <label>
                  Password
                  <input
                    type="password"
                    autoComplete={
                      authMode === "signUp"
                        ? "new-password"
                        : "current-password"
                    }
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={8}
                    required
                  />
                </label>
                <small>
                  Use at least 8 characters. Never enter your Meta password
                  here.
                </small>
                <button className="button" disabled={!!busy || isLoading}>
                  {authMode === "signUp"
                    ? "Create private workspace"
                    : "Sign in"}
                  <ArrowRight size={17} />
                </button>
                <button
                  type="button"
                  className="text-button"
                  onClick={() =>
                    setAuthMode(authMode === "signUp" ? "signIn" : "signUp")
                  }
                >
                  {authMode === "signUp"
                    ? "Already have an account? Sign in"
                    : "New here? Create an account"}
                </button>
              </form>
              <div className="auth-assurance">
                <ShieldCheck size={37} />
                <h2>
                  Your data.
                  <br />
                  Your decisions.
                </h2>
                <p>
                  Imports and decision history are scoped to your signed-in
                  account. Approving a recommendation never changes your ads.
                </p>
                <button className="text-button" onClick={startDemo}>
                  Try the synthetic demo first
                  <ArrowRight size={17} />
                </button>
              </div>
            </div>
          ) : (
            <div className="setup-body">
              <div className="connection-switch">
                <button
                  className={source === "meta" ? "selected" : ""}
                  onClick={() => setSource("meta")}
                >
                  <Link2 size={18} />
                  Connect Meta<span>Preferred</span>
                </button>
                <button
                  className={source === "csv" ? "selected" : ""}
                  onClick={() => setSource("csv")}
                >
                  <Upload size={18} />
                  Upload CSVs
                </button>
              </div>
              {source === "meta" ? (
                <div className="meta-panel">
                  <span className="connection-orbit" aria-hidden="true">
                    <Link2 size={35} />
                  </span>
                  <h2>A live connection, with read-only access.</h2>
                  <p>
                    Performance, budgets and settings in one place. No repeated
                    exports—and no automatic changes.
                  </p>
                  <Notice>
                    Live Meta access hasn’t been configured yet. This build
                    cannot connect your account or read it live. Use the CSV
                    fallback while access is established.
                  </Notice>
                  <button className="button" onClick={() => setSource("csv")}>
                    Continue with CSVs
                    <ArrowRight size={18} />
                  </button>
                  <details>
                    <summary>What connection setup needs</summary>
                    <p>
                      An authorized Meta app/account, the correct read
                      permissions and successful field verification. Codex’s MCP
                      authorization is separate from the product’s connection.
                      Never paste tokens into this app, chat or a public file.
                    </p>
                  </details>
                </div>
              ) : (
                <form onSubmit={importCsv} className="csv-form">
                  <div className="csv-intro">
                    <h2>Bring your saved Meta exports.</h2>
                    <p>
                      Daily ad-set performance, daily ad performance and current
                      budget settings. Reuse the same export format next time.
                    </p>
                  </div>
                  <label className="upload-zone">
                    <Upload size={27} />
                    <strong>Choose your CSV files</strong>
                    <span>
                      Select the export package together · up to 12 MB per file
                    </span>
                    <input
                      type="file"
                      accept=".csv,text/csv"
                      multiple
                      onChange={(e) => void uploadFiles(e.target.files)}
                      disabled={!!busy}
                    />
                  </label>
                  {files.length > 0 && (
                    <ul className="file-list">
                      {files.map((f) => (
                        <li key={f.name}>
                          <FileText size={17} />
                          <span>
                            {f.name}
                            <small>
                              {f.kind} · {f.rows.length.toLocaleString()} rows ·{" "}
                              {f.mappingSource === "saved"
                                ? "Saved mapping reused"
                                : "Review mapping below"}
                            </small>
                          </span>
                          <button
                            type="button"
                            className="icon-button"
                            aria-label={`Remove ${f.name}`}
                            onClick={() =>
                              setFiles(files.filter((x) => x.name !== f.name))
                            }
                          >
                            <X size={16} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                  {files.map((file) => (
                    <details
                      className="export-guide"
                      key={`mapping-${file.name}`}
                    >
                      <summary>
                        Review columns: {file.name}
                        <ChevronDown size={16} />
                      </summary>
                      <p>
                        Choose only equivalent fields. Link clicks and outbound
                        clicks are different metrics; changing a label does not
                        change its meaning. Blank selections stay missing.
                      </p>
                      <label>
                        Dataset for {file.name}
                        <select
                          value={file.kind}
                          onChange={(e) =>
                            setFiles(
                              files.map((f) =>
                                f.name === file.name
                                  ? {
                                      ...f,
                                      kind: e.target
                                        .value as ParsedFile["kind"],
                                      mappingSource: "edited",
                                    }
                                  : f,
                              ),
                            )
                          }
                        >
                          <option value="unknown">Choose dataset</option>
                          <option value="adsets">Daily ad sets</option>
                          <option value="ads">Daily ads</option>
                          <option value="settings">Ad-set settings</option>
                          <option value="campaigns">Campaign settings</option>
                          <option value="events">Budget events</option>
                          <option value="adsettings">Ad settings</option>
                        </select>
                      </label>
                      <div className="form-grid">
                        {Object.keys(fieldMapping).map((key) => (
                          <label key={key}>
                            {key}
                            <select
                              aria-label={`${file.name}: ${key}`}
                              value={file.columns?.[key] ?? ""}
                              onChange={(e) =>
                                setFiles(
                                  files.map((f) =>
                                    f.name === file.name
                                      ? {
                                          ...f,
                                          columns: {
                                            ...f.columns,
                                            [key]: e.target.value,
                                          },
                                          mappingSource: "edited",
                                        }
                                      : f,
                                  ),
                                )
                              }
                            >
                              <option value="">Not provided</option>
                              {file.headers.map((h) => (
                                <option key={h} value={h}>
                                  {h}
                                </option>
                              ))}
                            </select>
                          </label>
                        ))}
                      </div>
                      <small>
                        These choices are saved privately and reused for exports
                        with the same columns, even when the filename changes.
                      </small>
                    </details>
                  ))}
                  <details className="export-guide">
                    <summary>
                      How to get the right data from Meta
                      <ChevronDown size={16} />
                    </summary>
                    <ol>
                      <li>
                        In Ads Manager reporting, choose ad-set level and a
                        daily breakdown. Export 28 days where possible,
                        including spend, impressions, link clicks, website
                        purchases, purchase value and IDs.
                      </li>
                      <li>
                        Repeat at ad level with ad and ad-set IDs. Keep dates
                        and attribution definitions consistent.
                      </li>
                      <li>
                        Include current ad-set status, objective, daily budget,
                        budget owner/type and observation time. Export settings
                        separately if your report does not contain them.
                      </li>
                      <li>
                        Keep blank metrics blank. Use the same saved report
                        preset on future exports.
                      </li>
                    </ol>
                    <p>
                      Meta’s interface and available columns vary. These are
                      data requirements, not a verified click-by-click guide.
                      Missing fields will be flagged; you don’t need to create
                      another reporting sheet.
                    </p>
                    <button
                      className="text-button"
                      type="button"
                      onClick={downloadTemplates}
                    >
                      <Download size={16} />
                      Download empty field templates
                    </button>
                  </details>
                  <details className="export-guide">
                    <summary>
                      Inspect supported field mapping
                      <ChevronDown size={16} />
                    </summary>
                    <p>
                      Recognized export headers are mapped automatically and the
                      column choices are saved privately. Review unsupported
                      names rather than accepting a guessed match.
                    </p>
                    <div className="mapping-list">
                      {Object.entries(fieldMapping)
                        .slice(0, 16)
                        .map(([key, values]) => (
                          <div key={key}>
                            <strong>{key}</strong>
                            <span>{values.join(", ")}</span>
                          </div>
                        ))}
                    </div>
                  </details>
                  <div className="form-section">
                    <h3>Account and measurement</h3>
                    <div className="form-grid">
                      <label>
                        Currency
                        <select
                          value={currency}
                          onChange={(e) => setCurrency(e.target.value)}
                        >
                          <option value="INR">INR — Indian rupee</option>
                          <option value="USD">USD — US dollar</option>
                          <option value="GBP">GBP — British pound</option>
                          <option value="EUR">EUR — Euro</option>
                        </select>
                      </label>
                      <label>
                        Account timezone
                        <select
                          aria-label="Account timezone"
                          value={timezone}
                          onChange={(e) => setTimezone(e.target.value)}
                        >
                          <option>Asia/Kolkata</option>
                          <option>UTC</option>
                          <option>America/New_York</option>
                          <option>America/Los_Angeles</option>
                          <option>Europe/London</option>
                        </select>
                      </label>
                    </div>
                    <label>
                      Source data fetched at (UTC)
                      <input
                        type="datetime-local"
                        value={fetchedAt}
                        onChange={(e) => setFetchedAt(e.target.value)}
                        required
                      />
                    </label>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={verified}
                        onChange={(e) => setVerified(e.target.checked)}
                      />
                      <span>
                        I verified that attribution and purchase/click
                        definitions are compatible across these exports.
                      </span>
                    </label>
                  </div>
                  <div className="form-section">
                    <h3>What should good performance mean?</h3>
                    <p>
                      The minimum is a guardrail. Your desired overall average
                      is a different goal.
                    </p>
                    <div className="form-grid">
                      <label>
                        Minimum acceptable ROAS
                        <input
                          type="number"
                          min="0.01"
                          step="0.01"
                          value={min}
                          onChange={(e) => setMin(e.target.value)}
                          placeholder="Your minimum"
                          required
                        />
                      </label>
                      <label>
                        Desired overall ROAS
                        <input
                          type="number"
                          min="0.01"
                          step="0.01"
                          value={target}
                          onChange={(e) => setTarget(e.target.value)}
                          placeholder="Your overall goal"
                          required
                        />
                      </label>
                    </div>
                    <label>
                      Optimization mode
                      <select
                        value={context.optimizationMode ?? "balanced"}
                        onChange={(e) =>
                          setContext({
                            ...context,
                            optimizationMode: e.target.value as any,
                          })
                        }
                      >
                        <option value="balanced">Balanced</option>
                        <option value="scale">Scale</option>
                        <option value="efficiency">Efficiency</option>
                      </select>
                    </label>
                    <label>
                      Any known constraint that could reverse a budget decision?
                      <select
                        value={context.constraintStatus}
                        onChange={(e) =>
                          setContext({
                            ...context,
                            constraintStatus: e.target.value as any,
                          })
                        }
                      >
                        <option value="unknown">I don’t know yet</option>
                        <option value="none">No known constraint</option>
                        <option value="known">Yes, add context</option>
                      </select>
                    </label>
                    {context.constraintStatus === "known" && (
                      <label>
                        Constraint details
                        <textarea
                          value={context.constraintNotes}
                          onChange={(e) =>
                            setContext({
                              ...context,
                              constraintNotes: e.target.value,
                            })
                          }
                          placeholder="For example, a product or fulfillment restriction"
                          maxLength={1000}
                        />
                      </label>
                    )}
                  </div>
                  <Notice>
                    This is a candidate build. Real imports receive calculated
                    evidence and explicit safety states; final budget-change
                    rules still need the independent operator test.
                  </Notice>
                  <button
                    className="button wide"
                    disabled={!!busy || !files.length}
                  >
                    Validate and review decisions
                    <ArrowRight size={18} />
                  </button>
                </form>
              )}
            </div>
          )}
        </main>
      )}
      {screen === "today" && (
        <main className="workspace">
          <div className="page-heading">
            <div>
              <h1>
                Your budget decisions today
                <span className="heading-dot">.</span>
              </h1>
              <p>
                Know what needs attention. Understand why. Keep the final say.
              </p>
            </div>
            <button
              className="button-secondary"
              onClick={() =>
                demoActive ? simulateRead("matches") : navigate("setup")
              }
              disabled={!!busy}
            >
              <RefreshCw size={17} />
              {demoActive ? "Simulate next read" : "Refresh with CSV"}
            </button>
          </div>
          <div className="workspace-meta">
            <span>
              <ShieldCheck size={15} />
              No automatic Meta changes
            </span>
            <span>
              {demoActive
                ? "Synthetic snapshot"
                : workspace?.latestImport
                  ? `Imported ${new Date(workspace.latestImport.importedAt).toLocaleString()}`
                  : "No import yet"}
            </span>
            <span>
              {reviewed} of {cards.length} reviewed
            </span>
          </div>
          {!demoActive && (
            <Notice>
              Policy validation is pending. Calculated evidence is available,
              but this app will not invent actionable budget amounts. Record an
              operator decision or resolve the listed gaps.
            </Notice>
          )}
          {error && <ErrorBox text={error} />} {busy && <Busy text={busy} />}
          {demoActive && (
            <details className="demo-controls">
              <summary>
                <FlaskConical size={16} />
                Test tomorrow’s implementation states
                <ChevronDown size={15} />
              </summary>
              <p>
                Approve or edit a synthetic scale decision first, then simulate
                a read. These controls never call Meta.
              </p>
              <div className="form-actions">
                <button
                  className="button-secondary compact"
                  onClick={() => simulateRead("matches")}
                >
                  Budget matches approval
                </button>
                <button
                  className="button-secondary compact"
                  onClick={() => simulateRead("different")}
                >
                  Budget changed differently
                </button>
                <button
                  className="button-secondary compact"
                  onClick={() => simulateRead("unchanged")}
                >
                  Budget unchanged
                </button>
                <button
                  className="text-button"
                  onClick={() => {
                    const data = demoData();
                    setDemo({
                      context: demoContext,
                      data,
                      cards: assessImport(data, demoContext, { demo: true }),
                      decisions: [],
                      implementations: [],
                    });
                    setToast("Synthetic demo reset.");
                  }}
                >
                  Reset demo
                </button>
              </div>
            </details>
          )}
          <div className="queue-toolbar">
            <div className="filter-tabs">
              {["All", "To review", "Reviewed", "Needs attention"].map((f) => (
                <button
                  key={f}
                  className={filter === f ? "selected" : ""}
                  onClick={() => setFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
            <label className="search-box">
              <Search size={16} />
              <input
                aria-label="Find an ad set"
                placeholder="Find an ad set"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>
          </div>
          {!cards.length ? (
            <div className="empty-state">
              <FileText size={35} />
              <h2>
                {isAuthenticated && workspace === undefined
                  ? "Loading your workspace…"
                  : "Your first decisions start with evidence."}
              </h2>
              <p>
                Connect or upload your account data, or explore the invented
                demo.
              </p>
              <button className="button" onClick={() => navigate("setup")}>
                Bring my data
                <ArrowRight size={17} />
              </button>
              <button className="text-button" onClick={startDemo}>
                Explore the demo
              </button>
            </div>
          ) : !filtered.length ? (
            <div className="empty-state">
              <CheckCircle2 size={35} />
              <h2>
                {filter === "To review"
                  ? "You’ve reviewed every card."
                  : "No cards match this view."}
              </h2>
              <p>
                {filter === "To review"
                  ? "Your decisions are saved. Implementation still needs a later read."
                  : "Change the filter or search to see your decisions."}
              </p>
              <button
                className="text-button"
                onClick={() => {
                  setFilter("All");
                  setSearch("");
                }}
              >
                See all decisions
              </button>
            </div>
          ) : (
            <div className="decision-list">{filtered.map(decisionCard)}</div>
          )}
          <footer className="workspace-footer">
            A decision is a choice. Implementation is a separate observation.
          </footer>
        </main>
      )}
      {screen === "history" && (
        <main className="workspace">
          <div className="page-heading">
            <div>
              <h1>
                Decisions, with a memory<span className="heading-dot">.</span>
              </h1>
              <p>
                What we recommended. What you decided. What changed afterward.
              </p>
            </div>
            <button
              className="button-secondary"
              onClick={() => navigate("today")}
            >
              <ArrowLeft size={16} />
              Back to Today
            </button>
          </div>
          {(() => {
            if (!demoActive && isAuthenticated && savedHistory === undefined)
              return <Busy text="Loading your decision history…" />;
            const history =
              demoActive && demo
                ? demo.decisions.map((d) => ({
                    ...d,
                    recommendation: d.originalRecommendation,
                    implementations: demo.implementations.filter(
                      (i) => i.decisionId === d.id,
                    ),
                  }))
                : (savedHistory ?? []).map((d: any) => ({
                    id: d._id,
                    decision: d.decision,
                    finalBudget: d.finalBudget,
                    reason: d.reason,
                    decidedAt: new Date(d.createdAt).toISOString(),
                    recommendation: d.recommendation,
                    implementations: (d.implementations ?? []).map(
                      (i: any) => ({
                        state: (
                          {
                            IMPLEMENTED_AS_APPROVED: "Done as approved",
                            IMPLEMENTED_DIFFERENTLY: "Done differently",
                            NOT_IMPLEMENTED_OR_DEFERRED: "Not done yet",
                            UNKNOWN: "Unable to verify",
                          } as any
                        )[i.state],
                        observedBudget: i.observedBudget,
                        note: i.note,
                        observedAt: new Date(i.observedAt).toISOString(),
                      }),
                    ),
                  }));
            return history.length ? (
              <div className="history-list">
                {history.map((d: any) => (
                  <article className="history-item" key={d.id}>
                    <button
                      className="history-toggle"
                      onClick={() =>
                        setHistoryOpen(historyOpen === d.id ? null : d.id)
                      }
                      aria-expanded={historyOpen === d.id}
                    >
                      <span>
                        <strong>
                          {d.recommendation?.name ?? "Saved decision"}
                        </strong>
                        <small>{new Date(d.decidedAt).toLocaleString()}</small>
                      </span>
                      <span className="history-status">
                        {d.decision === "REJECTED"
                          ? "Rejected"
                          : d.decision === "NO_ACTION_CONFIRMED"
                            ? "No change"
                            : d.decision === "EDITED"
                              ? "Edited & approved"
                              : "Approved"}
                        <ChevronDown size={17} />
                      </span>
                    </button>
                    {historyOpen === d.id && (
                      <div className="history-detail">
                        <div className="history-compare">
                          <section>
                            <h3>Recommended</h3>
                            <p>{d.recommendation?.action}</p>
                            <strong>{d.recommendation?.magnitude}</strong>
                          </section>
                          <section>
                            <h3>Decided</h3>
                            <p>{d.decision}</p>
                            <strong>
                              {money(d.finalBudget, currencyUsed)}
                            </strong>
                          </section>
                        </div>
                        {d.reason && <p>Your reason: {d.reason}</p>}
                        <h3>Implementation observations</h3>
                        {d.implementations.length ? (
                          d.implementations.map((i: any, n: number) => (
                            <div className="history-observation" key={n}>
                              <span
                                className={
                                  i.state === "Done as approved"
                                    ? "success-text"
                                    : "attention-text"
                                }
                              >
                                {i.state}
                              </span>
                              <p>
                                {money(i.observedBudget, currencyUsed)} ·{" "}
                                {new Date(i.observedAt).toLocaleString()}
                              </p>
                              <small>{i.note}</small>
                            </div>
                          ))
                        ) : (
                          <p>
                            {d.decision === "REJECTED" ||
                            d.decision === "NO_ACTION_CONFIRMED"
                              ? "No budget change approved."
                              : "Awaiting a later import. Approval is not implementation."}
                          </p>
                        )}
                        <details>
                          <summary>Original evidence and policy</summary>
                          <p>{d.recommendation?.reason}</p>
                          <ul>
                            {d.recommendation?.evidence.supporting.map(
                              (s: string, n: number) => (
                                <li key={n}>{s}</li>
                              ),
                            )}
                          </ul>
                          <p>
                            Policy {d.recommendation?.evidence.policyVersion}.
                            Original recommendation preserved.
                          </p>
                        </details>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <History size={36} />
                <h2>No decisions saved yet.</h2>
                <p>Your first approval, edit or rejection will appear here.</p>
                <button className="button" onClick={() => navigate("today")}>
                  Review today’s decisions
                  <ArrowRight size={16} />
                </button>
              </div>
            );
          })()}
        </main>
      )}
    </div>
  );
}
