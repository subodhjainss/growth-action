# V1_PRD.md

## Accepted clarification — overall budget planning, 4 October 2026

- V1.1 includes collaborative overall Meta budget planning: the user and tool establish an overall spend envelope, relevant performance objective/target and hard constraints, then assess proposed scale-up, scale-down and unchanged budgets together. Revisit the plan using observed results, preserving uncertainty and operator approval.
- Distinguish permission to increase total spend from a numeric spend ceiling. Targets and ceilings must be explicit; do not infer safe magnitude or profitable additional demand from permission alone.
- Planning across platforms belongs in V2. Independent Google decisioning remains required in V1.1; this does not authorize cross-platform allocation in V1.1.
- V1 continues recommending the next individual budget action. Overall planning does not enter V1, authorize automatic execution or imply a fitted spend-response model.


## Accepted clarification — controlled improvement, 4 October 2026

- V1 and V1.1 remain D2C/fashion. Additional business types, including digital products and made-to-order businesses, belong in V2.
- Controlled improvement is required in V1.1: research official Meta/Google updates and practitioner hypotheses; propose evidence-backed policy or statistical-method changes; evaluate them before activation; jointly review rule changes with the user. This supersedes older text that defers all policy learning to V2.
- Learning never silently changes spending recommendations. Preserve policy/model versions, supporting evidence, approval and the ability to restore the previous version. New platform capabilities do not automatically become product capabilities.
- V1 retains its existing foundations: business context, corrections, decision history, distinct recommended/decided/implemented/observed states, and recorded policy versions. No autonomous rule rewriting, advanced model training or automatic Meta execution is added to V1.
- Business understanding combines website evidence with user-confirmed objectives, targets and constraints. Within D2C/fashion, identify relevant stock, fulfillment and marketing-budget constraints without adding inventory optimization. A business label does not substitute for confirmed facts.
- Statistical improvements require adequate reliable history and evaluation on separate later cases. Positive before/after outcomes are not causal proof, and saved context is not model training. Predictive fatigue, alerts and full creative workflows are not implicitly authorized by this milestone.


## Accepted clarification — Google and intelligence, 4 October 2026

- Google support is required in V1.1, not deferred to V2. Connect/upload and assess Meta or Google independently; customers can add the other platform later. Each needs platform-appropriate data checks, evidence and decision rules. This does not authorize cross-platform budget allocation or automatic execution.
- Essential context is a prerequisite for affected actionable recommendations. Infer platform objectives from verified source data and ask only for missing/ambiguous facts; business intent, targets and hard constraints cannot be invented.
- Recommendation intelligence is the priority. The existing candidate policy is a specification, not a working or validated engine. UI progress must not imply that independent recommendation quality, magnitude selection or operator validation is complete.


## Accepted update — 4 October 2026

- **Objective boundary — accepted 4 October 2026:** V1 budget recommendations cover sales/purchase objectives only. Identify traffic objectives and show an explicit unsupported-objective state; never assess them against sales ROAS targets. Unknown or incompatible objectives block budget recommendations. **Traffic-objective decisioning is required in V1.1, not V2**, before claiming support for pilots that require it. Validate objective-appropriate metrics, targets, magnitude rules, safety checks and implementation inference with the operator; do not assume CTR alone is sufficient.

This update overrides conflicting ingestion and budget-scope statements below.

- **V1 main ingestion path:** read-only Meta Marketing API connection to the DaMENSCH ad account. CSV/export upload remains the fallback only. Both routes must satisfy the same mandatory data contract; do not weaken intelligence to accommodate access delays.
- **Product edge to prove:** read current account data, remember prior decisions, and check observed configuration against the operator’s final decision. Approval is not implementation; observations are descriptive, not causal proof.
- **V1 budget scope:** recommend budget changes only for ad sets with independently controlled budgets. Read and identify shared campaign-budget objects, but show an explicit unsupported-budget-control state rather than treating campaign budget or ad-set spend as an editable ad-set budget.
- **Required V1.1:** shared campaign-budget decisioning, including affected ad sets, the correct editable budget object, supporting campaign/ad-set evidence, and implementation inference at that object. This is required before external pilots whose accounts depend on campaign budgets; do not describe those accounts as supported until verified.
- **Access dependency:** confirm the Meta app/business relationship, authorized account access, read permissions, and applicable API access tier. Own-account Standard permission access and external-client Advanced permission access are different. A successful read is required before claiming access works. No verified current approval turnaround is available from this research; record the app dashboard’s actual requirements/estimate when available.
- Gate 0 now checks the read-only connection and its returned data against the contract, with exports as fallback. Gate 1 still precedes final thresholds, magnitude rules, RCA triggers and confidence cutoffs.


## Growth Action V1 — Preliminary Product Requirements

**Status:** build-ready structure, with one intelligence gate still required: `OPERATOR_TEST.md`.

---

# 1. Objective

Build a live Meta-first D2C/fashion decision product that:

> tells a performance-marketing operator which ad sets need a budget action today, which should be left alone, what next budget change is recommended, and why.

V1 must add intelligence beyond the existing report while reducing repeated operator work.

---

# 2. User

Primary:
- daily performance-marketing operator.

Secondary:
- Head of Performance/Growth as adopter/decision maker.

---

# 3. V1 scope

## In
- upload/import required Meta performance data,
- saved field mapping,
- normalized history,
- bounded business context,
- data sufficiency checks,
- triage,
- scale/reduce/hold/no-action,
- RCA-lite transparent rules,
- next-step budget magnitude,
- five-field decision card,
- Why? evidence view,
- Approve/Edit/Reject,
- persistence,
- next-import implementation inference,
- decision/observation history.

## Out
- Meta write execution,
- proactive alerts,
- staged scale plans,
- rule challenge,
- advanced statistical models,
- full creative workflow,
- full RCA,
- inventory optimization,
- POAS/LTV,
- Google/cross-platform,
- generalization beyond D2C/fashion.

---

# 4. Core screens

## 4.1 Demo / entry
Purpose:
- explain the output with synthetic data.

No real DaMENSCH data in code/repo.

## 4.2 Account setup
Capture:
- optimization mode,
- target performance metric/value,
- hard business constraint if one exists,
- one-time saved mapping.

## 4.3 Import
User uploads required export(s).

System:
- validates file,
- maps to canonical schema,
- shows missing mandatory fields,
- stores normalized data,
- never logs raw rows publicly.

## 4.4 Decision Feed
Top-level summary plus cards.

Card shows only:
- Action
- Magnitude
- One-line reason
- RCA bucket
- Confidence

Card state:
- needs action,
- leave alone,
- needs context,
- insufficient evidence.

## 4.5 Why? drawer/page
Shows:
- supporting evidence,
- contradicting evidence,
- relevant windows,
- recent intervention,
- business context used,
- policy/threshold used,
- missing context,
- what would change recommendation.

## 4.6 Decision interaction
- Approve
- Edit
- Reject

Store original recommendation and final operator decision separately.

## 4.7 History
Show chronological:
- recommendation,
- operator decision,
- inferred implementation,
- next observed state.

Keep simple; not a reporting dashboard.

---

# 5. Domain states

## Assessment
- SAFE_TO_ASSESS
- CANNOT_ASSESS

## Triage
- NEEDS_ACTION
- LEAVE_ALONE
- NEEDS_CONTEXT
- INSUFFICIENT_EVIDENCE

## Recommendation action
- SCALE_UP
- SCALE_DOWN
- HOLD

## RCA
- SPEND_SCALING_EFFECT
- LIKELY_CREATIVE_DETERIORATION
- BUSINESS_CONTEXT_REQUIRED
- UNCLEAR

## Operator decision
- APPROVED
- EDITED
- REJECTED
- NO_ACTION_CONFIRMED

## Implementation
- IMPLEMENTED_AS_APPROVED
- IMPLEMENTED_DIFFERENTLY
- NOT_IMPLEMENTED_OR_DEFERRED
- UNKNOWN

## Confidence
- HIGH
- MEDIUM
- LOW

---

# 6. Core entities

## Account
- id
- owner/user
- platform
- currency
- timezone
- optimization_mode
- target_metric
- target_value
- hard_constraint
- mapping_version

## ImportBatch
- id
- account_id
- imported_at
- source_type: CSV / META_API
- data_through_date
- freshness_state
- validation_state
- mapping_version

## AdSetDaily
Canonical fields from `V1_DATA_CONTRACT.md`.

## AdDaily
Canonical fields from `V1_DATA_CONTRACT.md`.

## Recommendation
- id
- account_id
- adset_id
- generated_at
- action
- recommended_budget/value
- reason_one_line
- rca_bucket
- confidence
- evidence object
- rule/policy version
- source import IDs

## OperatorDecision
- recommendation_id
- decision
- final_value if edited
- reason optional
- decided_at

## ImplementationInference
- recommendation_id
- state
- observed_value
- inferred_at
- evidence import ID

## Observation
- recommendation_id
- observed_at
- summary metrics
- explicit note: descriptive, not causal.

---

# 7. Functional requirements

## FR-1 Import and mapping
- accept one or more CSV exports,
- first upload can map fields,
- mapping is saved,
- later uploads reuse mapping automatically,
- missing mandatory fields block assessment.

## FR-2 Data normalization
- derive canonical metrics consistently,
- generate 1/3/7/14-day windows from daily raw data,
- do not depend on spreadsheet precomputed windows if raw daily data exists.

## FR-3 Safety gate
- stale/incomplete data yields CANNOT_ASSESS or per-adset NEEDS_CONTEXT/INSUFFICIENT_EVIDENCE.

## FR-4 Triage
- classify each eligible ad set.

## FR-5 RCA-lite
- use inspectable simple rules,
- capture supporting and contradicting evidence,
- uncertainty permitted.

## FR-6 Decision recommendation
- scale/reduce/hold,
- produce next-step magnitude using validated DaMENSCH account policy,
- no staged multi-step plan in V1.

## FR-7 Card
- show only five visible fields.

## FR-8 Why?
- expose evidence path.

## FR-9 Human decision
- approve/edit/reject,
- preserve original recommendation separately.

## FR-10 Implementation inference
- on later import compare observed budget/state with final operator decision,
- infer implementation state where possible,
- unknown if ambiguous.

## FR-11 Memory
- next recommendation can access prior recommendation, decision and implementation state.

## FR-12 Persistence
- closing/reopening preserves account context, mappings and history.

---

# 8. Non-functional requirements

## Privacy/security
- no real DaMENSCH data in public repo,
- no access tokens/secrets in repo,
- no real rows in fixtures/tests,
- uploads/access scoped to authenticated user/account,
- errors/logs must not dump raw upload rows.

## Explainability
Every material recommendation must have an evidence object independent of LLM prose.

## Determinism
Given the same normalized data, policy version and context, the action/magnitude/RCA should not randomly change because an LLM phrased something differently.

## Auditability
Recommendation records which policy version and import batch produced it.

---

# 9. Acceptance tests

## AT-1 First import
A real export maps to canonical schema without code edits.

## AT-2 Repeat import
Second export uses saved mapping.

## AT-3 Insufficient data
Missing mandatory field produces an explicit block rather than a recommendation.

## AT-4 Five-field card
Operator sees exactly:
- action,
- magnitude,
- one-line reason,
- RCA,
- confidence.

## AT-5 Why?
Operator can inspect evidence/uncertainty.

## AT-6 No-action
At least one realistic test case can produce HOLD/LEAVE ALONE.

## AT-7 Decision separation
Approved recommendation is not marked implemented.

## AT-8 Next-day implementation
Next import can infer approved vs implemented differently vs unknown.

## AT-9 Persistence
Close/reopen preserves context/history.

## AT-10 Operator intelligence gate
Must meet `OPERATOR_TEST.md` PASS before claiming decision engine is validated.

---

# 10. Build sequence

Gate 0: inspect real exports against `V1_DATA_CONTRACT.md`.  
Gate 1: run `OPERATOR_TEST.md`.  
Then:

1. auth/account shell,
2. CSV upload + saved mapping,
3. canonical data model,
4. deterministic metrics/windows,
5. safety/triage engine,
6. RCA-lite rule engine,
7. recommendation magnitude,
8. five-field feed + Why?,
9. approve/edit/reject,
10. next-import implementation inference,
11. history/persistence,
12. synthetic demo data and submission hardening.

If mandatory data cannot be supplied by exports without team engineering, replace/augment ingestion with read-only Meta API. Do not change the decision product.

## Additional acceptance tests — accepted 4 October 2026

### AT-11 Read-only main path
An authorized DaMENSCH connection fetches the required daily performance and object configuration without any Meta write operation. The account can be refreshed without repeated CSV preparation. Failed access/freshness is explicit; CSV fallback uses the same normalized contract.

### AT-12 Budget ownership safety
An independently budgeted ad set can receive a validated recommendation. A shared campaign-budget ad set is visibly unsupported for budget changes in V1 and cannot receive a fabricated ad-set budget magnitude. Unknown budget ownership blocks action.

### V1.1 campaign-budget acceptance gate
Before piloting an account that relies on shared campaign budgets, verify a complete campaign-budget recommendation, evidence across affected ad sets, operator review, persistence and later implementation inference against the correct budget object. No automatic execution.

### AT-13 Objective safety
Sales/purchase ad sets may receive recommendations after all other gates pass. Traffic ad sets are explicitly unsupported for budget recommendations in V1 and never evaluated against sales ROAS policy. Unknown/incompatible objectives block action.

### Required V1.1 traffic-objective acceptance gate
Before claiming traffic support for external pilots, validate objective-appropriate evidence, targets, action/magnitude policy and safety states with an operator; prove the review, persistence and implementation-inference flow. This requirement must not be deferred to V2 without explicit scope approval.

### Required V1.1 controlled-improvement acceptance gate

Before claiming controlled learning works, demonstrate that a researched proposal includes source dates, intended benefit and affected policy; that evaluation on separate cases records unsafe recommendations and regressions; that user approval activates an explicit new version; and that prior decisions retain their original version. Rejected/unapproved proposals must not affect live recommendations. Demonstrate restoring the previous version. Do not claim statistically superior performance from the small V1 operator test.

### Required V1.1 overall Meta planning acceptance gate

Demonstrate that a user can establish/edit the overall Meta spend envelope and objective, review a coherent set of proposed increases/decreases/unchanged budgets, and see how the total planned budget relates to the envelope. Distinguish configured budget from observed spend and forecast outcomes. Shared campaign budgets must not double-count their ad sets. Each actionable proposal needs supported evidence, magnitude, safety checks and the correct budget owner. Persist plan versions and operator decisions separately from inferred implementation and observed outcomes; do not claim guaranteed ROAS or causal uplift. Cross-platform allocation remains V2.
