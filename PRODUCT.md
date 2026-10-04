# PRODUCT.md

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


## Growth Action — AI-native performance marketing manager

**Status:** Product scope locked by Shaktimaan, with the conditions incorporated below.  
**V1 domain:** D2C / fashion  
**V1 platform:** Meta first  
**V1 primary decision:** ad-set budget decision  
**Primary user:** daily performance-marketing operator  
**Economic goal:** better ROI on ad spend

---

## 0. Product principles

1. The intelligence layer is the product. Do not weaken it merely to fit an existing spreadsheet.
2. Use the simplest ingestion route that provides the mandatory intelligence data with low operator effort.
3. Start with saved exports. Promote read-only Meta API access into V1 only if exports cannot provide the mandatory data contract or create material repeated operator work.
4. Remove work; do not replace analysis with data-entry work.
5. Approval is not implementation.
6. Observed performance is not automatically caused by the previous recommendation.
7. No-action is a valid intelligent decision.
8. Missing context must block overconfident action.
9. Team heuristics are hypotheses/policies, not universal truths.
10. DaMENSCH raw data, spend, ROAS, exports, tokens and business-sensitive context must never be committed to the public GitHub repository.

---

# 1. The job

## Primary job

> When a performance marketing executive is reviewing ad campaigns, I want to know which ads need action today, what action needs to be taken, and why, so I can make the campaign decision confidently.

Better ROI is the economic reason to use Growth Action, but it is a downstream outcome, not the immediate job-done moment.

## First V1 decision

> Which Meta ad sets need budget action today, which should be left alone, and—when action is warranted—what budget change should the operator make and why?

V1 decision states:

- SCALE UP
- SCALE DOWN
- HOLD / LEAVE ALONE
- NEEDS CONTEXT
- INVESTIGATE / INSUFFICIENT EVIDENCE

**V1 does not include a multi-stage scale-up plan.** It recommends the next budget action and magnitude. Staged scale plans move to V1.1.

## Other real moments

Real but later:
- proactive alert when ROAS/performance deteriorates,
- new-creative launch strategy,
- weekly management review,
- full diagnosis of business causes,
- cross-platform/business optimization.

---

# 2. The switch

## What they fire

The manual daily process of moving between the reporting layer, Ads Manager and other sheets, interpreting performance, investigating what is happening, deciding what to do, and remembering yesterday's decisions.

V1 still leaves actual execution in Meta, so it must remove enough analysis/diagnosis work to create a net reduction in effort.

## Push

The current workflow is inefficient, difficult to scale through people/training, can produce suboptimal decisions, and can create costly mistakes.

## Pull

Marketing decisions should be made against the organization’s objectives rather than only platform constraints or platform-local optimization.

## Anxiety

The operator worries that the AI does not understand the business, product, customer, account context or constraints well enough to influence meaningful ad spend.

## Adoption friction to test

Do not assume habit is irrelevant. Explicitly test whether:
- uploading/connecting data,
- reviewing recommendations,
- correcting missing context,
- moving between Growth Action and Meta

adds enough work to weaken adoption.

---

# 3. Current operator workflow

From the 3 Oct operator session:

1. Open the D2C Ads report and review ad sets, usually sorted by spend.
2. Compare performance across recent windows such as 1/3/7/14 days.
3. Interpret ROAS relative to spend level; the same ROAS is not expected at every spend.
4. Tentatively scale, reduce, hold or investigate.
5. If ambiguous, inspect deeper signals in Ads Manager such as top-spending creatives, creative age, CPM, CTR and conversion behavior.
6. Decide action and magnitude, or deliberately do nothing.
7. Implement manually in Meta.
8. Observe later and mentally connect the new state with what changed.

The team explicitly said basic scale-up/down math is easier than deeper diagnosis. Existing tools were seen as weak when they mostly automated rules the team still had to define.

---

# 4. Growth Action V1 flow

## Step 1 — INGEST + CHECK

Growth Action receives the mandatory V1 data contract.

Before assessing the account it validates:
- freshness,
- required fields,
- required history,
- attribution/settings consistency where relevant,
- known objective/target,
- known hard constraint,
- previous recommendation/decision/implementation context.

If critical data is missing or stale:

> **CANNOT ASSESS SAFELY**

Never show “everything is fine” when the product cannot know that.

### Ingestion policy

**Default V1 route:** saved CSV/export mapping.

**Escalation rule:** read-only Meta API is allowed in V1 if one or more mandatory data fields cannot be obtained reliably from saved exports, or if obtaining them creates material repeated operator effort.

Do not build an API integration for polish. Do not reject an API integration if the intelligence layer genuinely requires it.

---

## Step 2 — TRIAGE

Every ad set receives one state:

- **NEEDS ACTION**
- **LEAVE ALONE**
- **NEEDS CONTEXT**
- **INVESTIGATE / INSUFFICIENT EVIDENCE**

Do not manufacture recommendations simply because a metric moved.

---

## Step 3 — RCA-LITE

RCA-lite is a V1 must-have because otherwise V1 risks becoming basic rule automation.

V1 RCA buckets:

1. **SPEND / SCALING EFFECT**  
   Available evidence is consistent with a change in efficiency after spend/budget changed.

2. **LIKELY CREATIVE DETERIORATION**  
   Available ad/ad-set evidence is consistent with creative weakness/fatigue/concentration.

3. **BUSINESS / EXTERNAL CONTEXT REQUIRED**  
   Media data cannot safely explain the movement or a known business fact could reverse the action.

4. **UNCLEAR / INSUFFICIENT EVIDENCE**  
   Signals conflict or are too weak.

### RCA-lite is not hard-coded folklore

Rules are transparent, account-specific hypotheses.

Example style:

> Stable budget + deteriorating ROAS + deteriorating CTR + concentration in older top-spend creatives → likely creative deterioration, medium confidence.

Not:

> CTR down = creative fatigue.

The rule engine must expose the evidence that fired and the evidence that contradicts it.

---

## Step 4 — DECISION CARD

The operator sees only five things by default:

1. **Action**
2. **Magnitude**
3. **One-line reason**
4. **RCA bucket**
5. **Confidence**

Example:

> **SCALE UP**  
> ₹40K → ₹44K  
> ROAS remains above the account target at this spend and the recent trend is stable.  
> RCA: Spend/scaling effect  
> Confidence: High

Everything else sits behind **Why?**

### “Why?” view

May include:
- what changed,
- trend/evidence,
- relevant windows,
- current spend/budget,
- business context used,
- recent intervention history,
- missing/uncertain context,
- what not to change,
- revisit condition,
- exact rule/evidence path that produced the RCA,
- evidence against the recommendation.

The “Why?” view is evidence, not another report.

---

## Step 5 — DECIDE

- **APPROVE**
- **EDIT**
- **REJECT**

For HOLD/LEAVE ALONE, record deliberate no-action.

For NEEDS CONTEXT, ask only for the minimum missing fact that can change the decision.

Approval is never stored as implementation.

---

## Step 6 — IMPLEMENTATION INFERENCE

Execution remains manual in Meta in V1.

On the next data import, compare the new account state with the prior recommendation and decision.

Possible states:
- IMPLEMENTED AS APPROVED
- IMPLEMENTED DIFFERENTLY
- DEFERRED / NOT IMPLEMENTED
- UNKNOWN

Manual confirmation is a fallback only when the data cannot resolve the state.

---

## Step 7 — OBSERVE + REMEMBER

Persist:
- recommendation,
- operator decision,
- implementation inference,
- actual value when known,
- next observed performance state.

Use that history as context in the next cycle.

Do not claim causal proof from simple before/after movement.

---

# 5. Onboarding

### Approved first-use sequence — 4 October 2026

Website → editable business understanding → minimum relevant contextual questions → read-only Meta connection or CSV fallback → validated first decisions. Use bounded public website facts with sources; do not infer private profitability targets, stock or budget limits. Users can correct inferred context. The existing one-time essential context requirements still apply, without asking the operator to supply the whole intelligence layer. Screen details and wording are being agreed in DESIGN.md before implementation. No billing feature or automatic execution is added by this sequence.

## Principle

> Configure once, infer continuously, ask only when missing context can materially change a decision.

## Minimum one-time business context

1. Primary optimization mode: scale / efficiency / balanced.
2. Primary performance target.
3. Known hard business constraint that can invalidate a media-only recommendation.
4. Recent intentional account change that is not visible in the imported data, only when material.

Do not begin with a consulting questionnaire.

## First value

> These are the ad sets that need attention today, these are the ones I would leave alone, and here is why.

---

# 6. V1 boundaries

## V1 must have

### Data
- Meta first.
- Mandatory V1 data contract.
- Saved mappings.
- Low repeated operator effort.
- CSV/export route by default.
- Read-only Meta API only if required by the mandatory intelligence contract.
- Persistent normalized history.

### Intelligence
- data validation,
- triage,
- scale up,
- scale down,
- hold/no-action,
- next-step magnitude,
- RCA-lite transparent rules,
- confidence,
- uncertainty / insufficient-evidence state.

### Decision
- five-field card,
- Why? evidence view,
- Approve / Edit / Reject,
- decision history.

### Learning/memory
- recommended ≠ decided ≠ implemented ≠ observed,
- infer implementation from next import where possible,
- use prior state in next recommendation.

### Persistence
- context,
- mappings,
- normalized data,
- decisions,
- implementation states,
- observations.

## V1 deliberately excludes

- live write/execution into Meta,
- proactive alerts,
- multi-stage scale plans,
- spend-response curves,
- change-point detection,
- advanced statistical modelling,
- rule challenge,
- policy learning,
- full creative-attention workflow,
- full creative semantic analysis,
- full RCA,
- inventory optimization,
- POAS/LTV,
- Google + Meta allocation,
- other business models.

---

# 7. V1.1

Start quickly after V1 works.

Purpose:

> Prove that an external D2C/fashion operator will adopt the workflow, not only that DaMENSCH can be pushed to use it.

V1.1 candidates:
- external self-serve onboarding,
- read-only Meta connection if not already required,
- staged scale plan,
- rule challenge,
- spend-response modelling,
- change-point/anomaly methods if validated,
- second decision family: creative attention,
- stronger RCA-lite,
- external repeat-use test.

Creative-attention states:
- HEALTHY
- WATCH
- REFRESH LIKELY NEEDED
- INSUFFICIENT EVIDENCE

---

# 8. V2+

Preserve:
- automatic execution with guardrails/audit/rollback,
- proactive monitoring,
- full RCA,
- inventory/supply,
- COGS/margin/POAS,
- LTV/customer quality,
- creative direction and launch strategy,
- creative briefs/production prioritization,
- Google + Meta cross-platform allocation,
- policy learning across many decisions/outcomes,
- weekly management layer,
- other business models,
- broader AI Growth CMO operating system.

---

# 9. Riskiest guess and test

## Riskiest guess

> Given the available data and business context, Growth Action can make a Meta ad-set budget recommendation that an experienced operator considers better than, or meaningfully additive to, the decision they would have made themselves.

## Test before decision-engine build

Use 3–5 live/current ad sets where a decision genuinely exists.

The operator independently records:
- action,
- magnitude,
- why,
- what not to change,
- confidence,
- missing context.

Growth Action / the proposed logic independently produces:
- action,
- magnitude,
- one-line reason,
- RCA bucket,
- confidence,
- Why? evidence.

Compare only after both are recorded.

## Useful additional reasoning

Counts when Growth Action:
- surfaces a relevant fact/trend the operator missed,
- correctly recommends restraint,
- identifies missing context that can reverse the decision,
- changes the operator’s action/magnitude,
- provides a more defensible explanation.

## Dangerous recommendation

Includes:
- acting on stale/missing critical data,
- ignoring a known hard constraint,
- reacting to short-term noise without enough evidence,
- presenting an ambiguous RCA as certain,
- high confidence despite contradictory evidence.

## Pass

- at least one genuinely useful incremental insight across the set,
- zero dangerous recommendations,
- unsupported claims are absent or explicitly uncertain,
- operator understands the five-field decision without founder explanation.

## Strong pass

The operator changes a planned action or magnitude because the reasoning is better.

## Fail

The output mostly restates the existing report, requires the operator to supply all the intelligence, or generates dangerously confident decisions.

---

# 10. Data/privacy constraint

The public GitHub repository must never contain:
- DaMENSCH raw exports,
- raw spend/ROAS/account data,
- business-sensitive context,
- access tokens,
- secrets,
- debug fixtures copied from real data,
- logs containing uploaded rows.

The repository may contain:
- code,
- schemas,
- empty templates,
- synthetic/demo data,
- documented example payloads with invented values.

See `DATA_SECURITY.md`.

---

# 11. Intelligence principle

V1 intelligence may use simple deterministic rules, but the rules must be:
- evidence-based,
- inspectable,
- account-configurable where appropriate,
- tested against the operator,
- uncertainty-aware.

Advanced modelling is not a prerequisite for Milestone 1.

After Milestone 1 works, research can determine whether statistical methods materially improve decisions.

Do not default to sending a CSV to an LLM.

---

# 12. Current build order

1. Validate the mandatory data contract against real DaMENSCH exports / available Meta fields.
2. Run the 3–5 ad-set operator test.
3. Record the rule/evidence gaps.
4. Lock V1 rule parameters and minimum required fields.
5. Build ingestion + normalization.
6. Build triage + RCA-lite + recommendation generation.
7. Build five-field Decision Feed + Why?.
8. Build Approve/Edit/Reject + persistence.
9. Import next-day data and infer implementation.
10. Only after this works, consider V1.1 intelligence expansion.
