# CODEX_HANDOFF.md

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


## Growth Action — Build handoff

Read this first.

### Canonical file order

1. `PRODUCT.md` — product behavior and version boundaries.
2. `V1_DATA_CONTRACT.md` — required data; decides CSV vs API.
3. `OPERATOR_TEST.md` — intelligence gate before final decision rules.
4. `V1_INTELLIGENCE_SPEC.md` — how v1 intelligence is structured.
5. `V1_PRD.md` — screens, entities, states, requirements and acceptance tests.
6. `DATA_SECURITY.md` — non-negotiable public-repo/privacy rules.
7. Older `IDEA_SCOPE.md` / `IDEA_LOCK.md` / `CODEX_CONTEXT.md` — background only where they do not conflict with these files.

If an older file conflicts with this build pack, this build pack wins.

---

# Current locked product

Meta-first, D2C/fashion, ad-set budget decisioning.

V1:
- low-friction saved export ingestion by default,
- read-only Meta API only if the mandatory data contract requires it,
- triage,
- scale/reduce/hold/no-action,
- RCA-lite,
- next-step magnitude,
- five-field decision card,
- Why? evidence,
- approve/edit/reject,
- implementation inference from the next import,
- memory/persistence.

Do not add:
- automatic execution,
- proactive alerts,
- staged scale plans,
- rule challenge,
- advanced statistical models,
- full creative workflow,
- full RCA,
- POAS/LTV/inventory optimization.

---

# Build gate

`CANDIDATE_DECISION_POLICY.md` prepares the independent operator test. It is a specification only: no implemented model, final thresholds or validated superiority is implied.

Do **not** invent final rule thresholds.

Before locking the decision engine:
1. inspect a real DaMENSCH export against `V1_DATA_CONTRACT.md`,
2. run `OPERATOR_TEST.md` on 3–5 live ad sets,
3. convert the observed gaps into:
   - mandatory fields,
   - rule parameters,
   - safety gates,
   - RCA evidence.

You may scaffold data models/UI before the test, but mark rule parameters as unvalidated.

---

# Critical product constraints

- The intelligence layer must not be reduced to fit the current internal sheet.
- The team should not have to build a new report unless direct export/API options fail.
- RCA-lite rules are transparent hypotheses, not folklore.
- LLM does explanation/context synthesis, not numeric truth.
- HOLD/INSUFFICIENT EVIDENCE are valid outcomes.
- Approval ≠ implementation.
- Public repo contains no real DaMENSCH data.

---

# Five-field card contract

Visible:
1. Action
2. Magnitude
3. One-line reason
4. RCA bucket
5. Confidence

Behind `Why?`:
- supporting evidence,
- contradicting evidence,
- relevant windows,
- recent intervention,
- context,
- policy used,
- missing information,
- what would change the recommendation.

---

# First coding outcome

After Gate 0/1, produce the smallest end-to-end flow:

> upload saved export(s) → normalize → validate → triage one or more ad sets → generate five-field cards → open Why? → approve/edit/reject → persist → upload next-day export → infer implementation state.

Use synthetic fixtures in the repository.

---

# Session protocol

At the start:
- state which acceptance test you are completing,
- list assumptions,
- name any data/API dependency.

At the end:
- say what is real,
- what is hardcoded,
- what is unvalidated,
- what sensitive data was used and confirm it was not written to repo,
- name the next single action.

Do not silently widen scope.
