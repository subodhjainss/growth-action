# AGENTS.md — Growth Action

## 1. How the product works

Interface: responsive web app for phone and desktop. The core action is reviewing the next Meta ad-set budget decision, understanding Why, and saving approval/edit/rejection. Core screens: Website, Business understanding, Account setup, Today and History. V1.1 adds the explicitly manual Plan workspace.

Business logic: deterministic calculations and safety checks construct structured evidence before any explanation. V1 supports sales/purchase objectives and independently controlled daily ad-set budgets. Minimum efficiency, desired overall average and verified spend-specific expectations are separate. Real final rule parameters remain UNVALIDATED until the independent operator test; never let demo rules become customer rules. Approval saves a decision; later configuration reads infer implementation separately.

Database: Convex auth tables hold identities/sessions. accounts stores owner-scoped business context and saved mappings; imports stores package state/metadata; importChunks stores bounded normalized performance/settings/history batches; recommendations stores original five fields/evidence/policy version; decisions stores the user's final choice without overwriting recommendations; implementations stores later configuration observations; budgetPlans stores immutable manual draft versions, source/context snapshots, daily envelope and restore lineage. Index every read and authorize ownership in Convex.

Third party: Convex provides backend/database/auth/static hosting. Meta read-only Marketing API is the main intended path, but actual app access is not configured; CSV is the working fallback. Public website reading is a bounded server-side metadata request, not an LLM analysis. Any future AI/Meta secrets live in Convex environment variables, separately set in dev and production. Never ask the builder to paste secrets in chat. No alternative hosting/auth/database.

Not in V1: automatic ad execution, proactive alerts, staged scale plans, self-rewriting rules, advanced models, full creative workflow/RCA, inventory/POAS/LTV optimization, shared campaign-budget action, traffic-objective action, Google allocation or other business models.

When a bug names a part, inspect that part first, find the cause and say if the evidence points elsewhere.

## 2. How we work

Read IDEA_SCOPE.md, PRODUCT.md, PLAN.md and PROGRESS.md first; DESIGN.md before screen work. Then read the authoritative build pack: CODEX_HANDOFF.md, V1_DATA_CONTRACT.md, OPERATOR_TEST.md, V1_INTELLIGENCE_SPEC.md, V1_PRD.md, DATA_SECURITY.md and SOURCES.md. Older CODEX_CONTEXT.md and IDEA_LOCK.md are background. Accepted later amendments override conflicting older text; current build authority remains the first eight files in the original handoff. This reading shortcut never weakens their requirements.

Use plain words, explain necessary terms, ask one question at a time and announce the next action briefly. Do not pause after each status update. Ask only for a material product decision, missing business fact or genuinely required permission. The builder explicitly authorized autonomous overnight completion, design choices, tests, screenshots, fixes and deployment on 4–5 October; that authorization replaces confirmation pauses for this work. For a future unapproved milestone, explain intended behavior and plan before code and obtain the required product agreement once, without repeatedly asking.

Work one coherent milestone end to end. Park unrelated new requests in PLAN.md unless the builder explicitly changes scope. Check actual behavior before saying it works. Give phone instructions with a live link; distinguish a screenshot from a functional app. Fix causes, not symptoms, and protect money/permission/state logic with meaningful tests.

Use installed skills when applicable. The fixed stack is Codex/GitHub/Convex; no other host/database/auth. Source files, libraries and routine implementation choices are ours to decide. Record assumptions, behavior changes, remaining hardcoded/unvalidated choices and data handling.

Preserve recommended / decided / implemented / observed. A mismatching changed budget is Done differently, never Done as approved. Missing evidence is Unable to verify, not Not done yet. Shared campaign spend redistribution is not an ad-set budget edit. Configuration matches do not prove actor, exact time or causality.

Save working checkpoints to git. Push/deploy only checked authorized milestones; do not claim pushing deploys. Do not rewrite history or force-push. Keep PROGRESS.md factual. Larger independent work batches are preferred over repeated yes/ok pauses.

## 3. Shipping and privacy

Deploy: npm run deploy, via @convex-dev/static-hosting. Git push never deploys. Live/repo addresses are recorded in README.md after actual verification; don't invent them.

Convex JWT_PRIVATE_KEY and JWKS live in Convex environment variables; SITE_URL matches the deployment. Only the public VITE_CONVEX_URL may reach the frontend. No secret in a VITE_ variable, source or committed file. .env.local and all private data paths are ignored. Every ownership/permission/size check is enforced in Convex, not only in the interface.

Never commit real DaMENSCH exports, account IDs, actual performance, confidential business context, raw rows/logs, tokens, lightly anonymized data or sensitive screenshots. Tests and public screenshots use entirely invented records. Keep existing private data in ignored Data/ and protect case variants before any staging. Review all staged files before public push. Source/background documents with confidential content are also ignored.

Before sharing: open live site signed out at phone width and walk the core flow. Builder should also use their physical phone on mobile data. Browser emulation is not a claim that a physical device was tested.

## 4. The AI call

No LLM call is enabled in the current candidate build and no provider key is configured. Website metadata and deterministic decision evidence work without one. Do not describe these as model training or full AI website understanding.

When configured, business/explanation calls run in Convex actions through the supported Convex agent component, with server-side input size, rate and output limits. The builder's provider monthly spending cap must be explicitly set; no invented paid allowance. Select and verify a supported model at integration time, not a placeholder name presented as working. Use minimum necessary evidence, never full raw uploads. Preserve deterministic fallback explanations when the provider fails.

The LLM may summarize verified facts, explain evidence and phrase the minimum contextual question. It must never do deterministic arithmetic, invent thresholds/Meta rules, alter action/magnitude/confidence, override safety, fabricate causes or silently rewrite policy.

## 5. Approved roadmap

V1/V1.1 remain D2C/fashion. V1.1 requires controlled researched/tested/user-approved improvement with policy/model versions and restoration; overall Meta budget planning; shared campaign-budget support; traffic objectives; and independent Google connection/decisioning. External pilots requiring these capabilities are not supported before their gates pass. Planning across platforms and additional business types belong in V2. Researching statistical ideas does not silently authorize advanced prediction in V1.

## Continued overnight build

V1 repeat-import column choices now persist by header signature; changed headers require review. Prior operator decisions feed next-import evidence and unresolved changes block stacked recommendations.
V1.1 Plan is a manual foundation, not validated allocation or approved execution. Server enforces current import, budget scope, safety gaps, envelope, money precision and private ownership. A restore creates a new version after current-evidence validation. No shared campaign/traffic/Google support or final V1.1 acceptance is implied by the Plan tab.
