# V1_INTELLIGENCE_SPEC.md

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


## Purpose

Define how Growth Action V1 can be more intelligent than the current manual workflow without pretending that advanced modelling already exists.

This is **not** a universal performance-marketing playbook. It is the first DaMENSCH-specific decision policy to validate and then encode.

---

# 1. Intelligence architecture

V1 should separate five layers.

## Layer 1 — deterministic metric engine

Calculate consistently from raw/normalized data:
- ROAS,
- CTR,
- CPM,
- CVR,
- CPA,
- spend/budget changes,
- rolling 1/3/7/14-day summaries,
- ad spend concentration,
- creative/ad age,
- recent intervention state.

The LLM must not do arithmetic that can be deterministic.

## Layer 2 — data sufficiency / safety

Before any recommendation:
- check freshness,
- minimum history,
- conversion sample sufficiency,
- missing mandatory fields,
- conflicting current state,
- known hard constraints.

Outputs:
- SAFE TO ASSESS,
- NEEDS CONTEXT,
- INSUFFICIENT EVIDENCE.

## Layer 3 — transparent V1 rule hypotheses

Rules combine multiple signals into:
- SCALE,
- REDUCE,
- HOLD,
- RCA-lite bucket,
- confidence.

Rules are account-specific, inspectable and configurable.

Do not hide them inside a prompt.

## Layer 4 — evidence synthesizer

Build a structured evidence object:
- supporting signals,
- contradicting signals,
- account policy used,
- hard constraint used,
- missing context,
- confidence rationale.

## Layer 5 — LLM explanation layer

The LLM can:
- compress evidence into the five-field card,
- write the Why? explanation,
- identify a missing contextual question from a predefined evidence gap,
- make the recommendation legible.

The LLM cannot:
- invent thresholds,
- invent Meta rules,
- override safety states,
- create causal claims unsupported by evidence,
- silently change action/magnitude calculated by the policy engine.

---

# 2. V1 visible decision card

Only:

1. Action
2. Magnitude
3. One-line reason
4. RCA bucket
5. Confidence

Everything else lives in Why?.

---

# 3. Initial triage logic — hypothesis, not final thresholds

These patterns are starting hypotheses to test against 3–5 live ad sets.

## SCALE candidate

Evidence may include:
- ROAS/efficiency above account target at the current spend level,
- recent windows stable or improving,
- no contradictory recent intervention,
- no hard business constraint,
- sufficient conversion/sample evidence.

Magnitude in V1 should follow a configured **DaMENSCH account policy** after the operator test. It is not presented as universal Meta best practice.

## REDUCE candidate

Evidence may include:
- efficiency below acceptable account range across more than one window,
- deterioration persists rather than appearing in one noisy day,
- no recent scale-up/change that plausibly requires waiting,
- enough sample,
- no reason to classify as “needs context” instead.

DaMENSCH currently reduces gradually; exact magnitude remains an account policy parameter to validate.

## HOLD / LEAVE ALONE

Evidence may include:
- performance near acceptable range,
- conflicting windows,
- high volatility / weak sample,
- recent intervention makes another change premature,
- unclear RCA where action could do harm.

A correct HOLD is positive product value.

---

# 4. RCA-lite rules — transparent hypothesis framework

## Bucket A — SPEND / SCALING EFFECT

Possible supporting signals:
- known budget/spend increase preceded the efficiency decline,
- spend expanded while ROAS declined in a way that remains consistent with the account’s observed operating range,
- creative signals do not simultaneously show strong deterioration.

Contradicting signals:
- budget/spend stable,
- creative performance deteriorating strongly,
- business context explains movement better.

V1 language:
> “Likely spend/scaling effect”

Never:
> “Scaling caused the decline.”

## Bucket B — LIKELY CREATIVE DETERIORATION

Possible supporting signals:
- ad-set budget/spend broadly stable,
- ROAS deteriorates,
- CTR deteriorates and/or CPM rises,
- spend becomes concentrated in a small number of ads,
- dominant ads are older and their own performance is deteriorating,
- Meta is not shifting spend toward newer stronger alternatives.

Contradicting signals:
- recent budget expansion plausibly explains efficiency movement,
- CTR/creative metrics are stable,
- conversion-side deterioration occurs without upper-funnel deterioration,
- known business constraint/event exists.

V1 language:
> “Likely creative deterioration — medium confidence”

Never:
> “Creative fatigue detected” unless evidence standard is explicitly validated.

## Bucket C — BUSINESS / EXTERNAL CONTEXT REQUIRED

Use when:
- media data cannot distinguish the cause,
- a known inventory/promotion/pricing/product constraint could reverse the recommendation,
- performance moves without a clear spend or creative signature.

Ask one minimum question, not a questionnaire.

## Bucket D — UNCLEAR / INSUFFICIENT EVIDENCE

Use when:
- signals conflict,
- sample is weak,
- data is stale,
- recent changes make interpretation premature,
- important required fields are missing.

This bucket is a feature, not a failure.

---

# 5. Confidence model

V1 confidence should be deterministic/structured, not an LLM feeling.

Candidate factors:
- data completeness,
- data freshness,
- sample/conversion sufficiency,
- agreement of multiple windows,
- agreement of independent evidence types,
- absence/presence of contradictory signals,
- recent intervention ambiguity,
- missing business context.

Use only `HIGH / MEDIUM / LOW`.

A HIGH recommendation with important contradictory evidence is not allowed.

Exact scoring is TO VALIDATE after the operator test.

---

# 6. Magnitude

Shaktimaan correctly moved multi-stage plans to V1.1.

V1 still needs a next-step magnitude.

The first magnitude engine should:
- use DaMENSCH’s current operating policy as a configurable account policy,
- make the policy visible in Why?,
- never claim it is a universal Meta rule,
- be validated in the operator test.

Rule challenge moves to V1.1.

---

# 7. Implementation inference

Given yesterday:
- recommendation action/value,
- user final decision/value,

and today:
- current budget/state,

infer:
- IMPLEMENTED AS APPROVED,
- IMPLEMENTED DIFFERENTLY,
- DEFERRED / NOT IMPLEMENTED,
- UNKNOWN.

Do not infer outcome causality from this state.

---

# 8. Operator test is the intelligence gate

Before locking thresholds/parameters:

Run 3–5 live ad sets.

For every disagreement, classify the missing intelligence as one of:
- missing field,
- missing business context,
- wrong rule,
- wrong threshold,
- wrong magnitude,
- wrong RCA classification,
- insufficient-data safeguard missing,
- operator heuristic itself questionable.

Only then encode the first rule parameters.

---

# 9. Research deferred until Milestone 1 works

Do not block V1 on:
- spend-response curve fitting,
- change-point detection,
- anomaly models,
- saturation modelling,
- causal inference,
- learned rule optimization.

After Milestone 1 passes, test whether one of these materially improves operator decisions.

---

# 10. Intelligence acceptance criteria

A V1 recommendation is valid only if:
- the required data is present,
- the action is produced by an inspectable policy/evidence path,
- the RCA bucket has supporting evidence,
- contradictory evidence is available in Why?,
- confidence reflects uncertainty,
- the LLM did not invent the decision,
- HOLD/NEEDS CONTEXT is possible,
- the operator can understand the card without founder explanation.
