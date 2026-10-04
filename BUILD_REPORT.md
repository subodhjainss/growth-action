# Overnight build report — 5 October 2026

This is a functioning candidate, not a passed intelligence gate or completed external pilot.

## What works

- Responsive five-screen onboarding/daily/history flow, approved playful-science styling, readable phone layout, self-hosted font and editable sourced business summary.
- Bounded public website metadata reads, safe redirect handling and private-address rejection. No LLM inference claimed.
- Convex email/password authentication, owner-scoped context/imports/recommendations/decisions/history and bounded CSV upload chunks.
- Header aliases, canonical performance/settings data, missing-value preservation, deterministic weighted metrics/windows, contradictions/safety evidence and five-field cards with Why.
- Synthetic-only scale/reduce/hold examples with Approve/Edit/Reject, original recommendation preservation, reload persistence and separate later implementation states.
- Real imports refuse unvalidated numeric recommendations. Operator decisions can be recorded only within server-enforced safety limits.
- Correct-budget-object implementation inference; mismatch is Done differently, never completion. Observation history does not prove actor or cause.

## Acceptance status

| Test | Status and limit |
| --- | --- |
| AT-1 first import | Synthetic browser import works. Real package structure was privately inspected earlier; no real-runtime import was used in this overnight build. Real end-to-end acceptance remains open. |
| AT-2 repeat mapping | Versioned custom column choices persist and are reused by matching header sets, including changed filenames. Browser repeat import and parser tests pass; changed columns require review. |
| AT-3 insufficient data | Missing/invalid fields block explicitly; unit/server/browser checks use invented data. |
| AT-4 five fields | Rendered cards show the required five recommendation fields, with identity and separate workflow state. |
| AT-5 Why | Deterministic evidence, contradictions, gaps, windows and policy labels visible. |
| AT-6 hold | Working synthetic HOLD example. Real validated no-action policy still gated. |
| AT-7 separation | Approval is saved separately from awaiting observation; browser verified. |
| AT-8 next-day inference | Synthetic browser mismatch plus deterministic matching/unchanged/unknown/wrong-owner tests. Real account tomorrow-read acceptance remains open. |
| AT-9 persistence | Private invented import/decision survives reload; demo state persists separately. |
| AT-10 operator gate | NOT PASSED. Independent 3–5 ad-set test required. |
| AT-11 live read-only | NOT CONNECTED. Honest unavailable state; CSV fallback works. |
| AT-12 ownership | Shared/unknown ownership blocks. Real validated ABO actions still gated. |
| AT-13 objectives | Incompatible/unknown objectives block. Final sales policy still gated. |

## Hard-coded and unvalidated

Prior operator decisions/reasons now enter subsequent evidence; unresolved budget changes block stacked recommendations. Seven-day comparisons, a three-day supporting view, snapshot freshness limits and intervention safeguards are transparent prototype choices. Demo sizing is an invented 5% example, not an account rule. Confidence labels are illustrative/uncalibrated. RCA is Unclear until validated cause rules exist. Optimization preferences are stored, not a spend-response model. Full natural-language correction/explanation is not connected; field-prefix corrections and direct edits work.

No predictive fatigue, advanced statistical model, automatic execution or self-changing agent was added. V1.1 required capabilities remain in PLAN.md rather than being silently pushed to V2.

## Verification and remaining checks

Calculation, parser and decision-memory tests pass. Three multi-step browser flows passed on the live development host: review/implementation/history, first-time phone onboarding, and private signup/import/persistence/logged-out isolation. Production backend signup/private persistence/sign-out isolation passed. All three flows also passed on the published production frontend. npm run deploy completed successfully.

Screenshots in design/screens/ use invented data only. Phone-width browser checks are not a physical-phone/mobile-data check. No real account data was used in overnight runtime tests, screenshots or fixtures. Private original exports/source material, confidential historical context and secrets were excluded from public Git staging; the staged privacy-pattern scan reported no findings.

Next gate: freeze the candidate, refresh private evidence and run OPERATOR_TEST.md independently on 3–5 current ad sets. Enable actionable account policy only after it passes. Separately establish product-level read-only Meta access; Codex MCP access is not an app connection.
