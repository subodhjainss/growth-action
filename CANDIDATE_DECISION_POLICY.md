# Candidate decision policy — operator-test preparation

Status: UNVALIDATED. Prepared 4 October 2026 for OPERATOR_TEST.md.
This is a reasoning specification, not an implemented or validated model.
Authority: current PRODUCT.md, V1_DATA_CONTRACT.md and V1_INTELLIGENCE_SPEC.md.
Requirements: FR-2 through FR-6 and FR-11. Acceptance targets: AT-3, AT-6, AT-10, AT-12 and AT-13.

## Assumptions and boundaries

Private business-context research is a set of leads, not confirmed current policy. Old rules, compressed chat summaries, undated notes and inferred historical behavior must remain explicitly unconfirmed. Absence of revocation does not establish current validity; absence of an activity-log match does not establish rejection or nonimplementation. Resolve context only when it can materially change the selected case, and never treat a historical before/after audit as causal evidence of value created or destroyed.

An additional private team optimization draft has been reviewed. The builder clarified that it is directional guidance: operators use judgment and adjust it rather than following it as written. It is not an executable account policy or the full V1 engine. Its confidential parameters and detailed review stay under ignored runtime data. Use it to identify evidence worth inspecting and questions worth testing; do not import its percentages, thresholds, waiting periods or causal claims into the engine. Ask the operator about a draft conflict only if it materially affects a test decision. Budget magnitudes require independently confirmed provisional policy or an explicitly documented policy gap.

Useful additional candidate checks: revenue concentration in a single day, spending versus available budget, and creative-mix changes. Metric movement is not causal proof. Do not infer delayed-click revenue timing without verified action-reporting settings. Do not assign numeric contribution shares without a defined, validated calculation; metric aggregation must use the appropriate denominator. Derived average order value may provide supporting evidence only where purchase/value definitions are complete and consistent.

Sales/purchase objectives and independently controlled ad-set budgets only in V1. Meta read-only access is the main source; exports are fallback. No new statistical modelling, automatic execution, fitted spend-response curve, or automatic policy learning. Account targets, spend-band policies, magnitude limits, sample requirements, waiting periods and confidence cutoffs remain UNVALIDATED and unset. Transcript heuristics are evidence to test, not defaults to execute.

## 1. Establish what we actually know

For each ad set, attach source, observation time, date coverage, objective, budget owner/type, currency, timezone and attribution definition. Distinguish current object state from historical performance. Never copy today's budget into historical days. Never substitute spend for budget.

Check freshness, complete-day coverage, duplicate/conflicting rows, missing days, consistent metric definitions, inactive status and ad-to-ad-set linkage. A missing row is not automatically a zero-spend day. Track revised attribution data by import rather than silently treating observations from different imports as identical.

Missing mandatory source data blocks assessment. Unknown objective or budget control blocks a budget action. Shared campaign budgets and traffic objectives receive explicit V1 limitations. A recent material change or hard business constraint is carried into the assessment before action selection.

## 2. Calculate evidence without a language model

For each complete 1/3/7/14-day window, aggregate raw totals first:

- ROAS = purchase value / spend.
- CTR = consistently defined clicks / impressions.
- CPM = spend × 1,000 / impressions.
- CVR = purchases / the same click definition.
- CPA = spend / purchases.

Zero denominators produce unavailable ratios, not invented zeros or infinity. Preserve their underlying counts. Do not average daily ratios to obtain a multi-day ratio.

Calculate daily spend and known budget deltas; top-one/top-three ad spend shares; each dominant ad's performance; ad age when available; changes in the spend mix; and time since a known implemented intervention. Ad creation age is not necessarily the age of the underlying creative.

Alongside the familiar rolling windows, compare recent days with the preceding non-overlapping days where coverage permits. The 1/3/7/14-day windows share observations: agreement among them is not four independent confirmations. With 28 days, compare the latest 14 with the preceding 14, while noting business and intervention differences.

Describe daily dispersion, counts, zero-purchase days, and whether a single day dominates the result. These are descriptive checks, not statistical significance, calibrated probability, or proof of causation. Unequal windows are labelled and never described as equivalent samples.

Reach is not additive across dates because people can appear on multiple days. Do not sum daily reach or average daily frequency and call either a unique multi-day exposure measure. Omit unsupported aggregate exposure claims.

## 3. Safety before action

Evaluate in this order:

1. Is the object supported and active, and is its current editable budget known?
2. Is the mandatory evidence fresh, complete and consistently measured?
3. Could a missing business fact reverse the proposed action?
4. Is the sample sufficient under an explicit account policy?
5. Is a recent intervention still unresolved or too recent under that policy?
6. Do materially contradictory signals remain?

Unknown sufficiency or waiting thresholds must stay visible. Unset policy does not silently pass a check.

Proposed distinction to validate with Subrat: HOLD means evidence supports keeping the current budget; INSUFFICIENT EVIDENCE means we cannot defensibly choose a budget action. Both avoid a change, but only HOLD asserts an assessed no-action decision. NEEDS CONTEXT identifies a specific missing fact that could change the recommendation. This distinction is a candidate interpretation, not a locked change to product behavior.

## 4. Select an action through an inspectable path

| Candidate | Evidence to examine | Reasons to withhold it |
|---|---|---|
| SCALE UP | Efficiency acceptable under account target/policy at current spend; recent trajectory credible; sufficient purchases; creative mix supports delivery | Hard constraint, unresolved intervention, weak sample, deterioration or conflicting evidence |
| SCALE DOWN | Efficiency outside account policy; weakness persists beyond a single day; adequate evidence; recent spend and intervention considered | A lower ROAS remains acceptable at expanded spend; missing context; recent change requires observation |
| HOLD | Assessed performance supports remaining at current budget, or an explicit validated waiting policy applies | Essential facts are missing: use a safety state rather than claiming an assessed HOLD |
| NEEDS CONTEXT | One missing business/policy fact can reverse the action | Ask only that minimum useful question |
| INVESTIGATE / INSUFFICIENT EVIDENCE | Missing critical measurements, unresolved contradictions or inadequate evidence | Never convert uncertainty into a confident action |

No fixed ROAS threshold and no universal percentage change. An account-wide target may be insufficient to decide acceptable performance at different spends; request the relevant policy gap rather than fitting a curve or inventing spend bands.

## 5. Classify possible causes separately

Action confidence and cause evidence are assessed separately. A clear action need not imply a clear cause; do not force the RCA bucket to match the action.

- Spend/scaling effect: observed spend/budget expansion precedes weaker efficiency, without strong simultaneous creative deterioration. A spend change alone does not establish that the operator changed budget.
- Likely creative deterioration: examine delivery stability, declining ad performance, click/impression metrics, spend concentration, creative age and mix changes together. CPM alone does not identify fatigue or market competition.
- Business/external context required: a known constraint or unexplained conversion-side movement needs a specific contextual check. Do not claim an inventory or site problem without evidence.
- Unclear: supporting signatures are weak, competing explanations remain, or mandatory evidence is missing.

Every bucket records supporting and contradicting evidence. These patterns require operator validation; they are not automatic triggers yet.

## 6. Magnitude and confidence

Magnitude uses a separately recorded account policy, with percentage and absolute limits only if explicitly supplied for testing. Record its source and UNVALIDATED status. Do not publish confidential policy values in this document. An action candidate with no defensible magnitude is incomplete; mark the missing policy instead of presenting it as an actionable SCALE recommendation. HOLD retains the observed current budget without implying execution.

HIGH / MEDIUM / LOW derives from completeness, freshness, sample evidence, independent evidence types, contradictions and intervention ambiguity. Numeric scoring/cutoffs are unset. Important contradictions prohibit HIGH. Labels in the blind test must include a rationale and remain UNVALIDATED; no percentage certainty.

## 7. Record evidence before writing prose

For every candidate retain: source import/observation identifiers, as-of date, calculations and denominators, relevant windows, supporting signals, contradictions, missing facts, hard constraints, recent recommendations/decisions/implementation, policy source/version, confidence rationale and what would change the answer.

The language model may shorten this evidence into the one-line reason and Why? explanation. It may not change action, budget magnitude, RCA or confidence, invent measurements, or hide a safety state. Explanations must remain usable if the language model is unavailable.

## 8. Tomorrow's independent comparison

1. Freeze the data/context package and candidate policy version before either answer is revealed.
2. Select 3–5 current supported ad sets, including ambiguous cases rather than just obvious winners/losers.
3. Keep actual account data, policy values and completed answer sheets outside the repository.
4. Operator and candidate independently record the five fields plus Why? evidence using OPERATOR_TEST.md.
5. A missing pre-test policy yields an explicitly incomplete result, not a guessed threshold. Record the gap before seeing the operator's answer.
6. Compare actions, magnitudes, cause evidence, restraint, missing context and unsafe claims. Classify every meaningful disagreement.
7. Apply the documented PASS criteria. If revised after comparison, label that correction as post-test; it does not retroactively improve the blind-test score. Recheck revised logic on another case before claiming it works.

Passing this small test supports initial operator usefulness, not statistical superiority or proven ROI. Zero dangerous recommendations and at least one useful incremental insight remain the gate.

## Remaining dependencies

## Source-handling decisions after Gate 0 recheck

- Preserve ad-set-level performance as the native evidence for ad-set budget assessment and ad-level performance as the native evidence for creative assessment. Never move purchases between objects or force totals to reconcile. Record cross-level discrepancies and withhold any reasoning whose validity depends on their agreement; use INSUFFICIENT EVIDENCE if the discrepancy could change the action.
- Preserve missing-action-entry markers separately from reported zeros. A purchase count with absent purchase value cannot safely yield a zero-value creative ROAS. Do not fill absent values until the source semantics are verified; block affected value-based evidence where necessary.
- A completed calendar day can still have provisional attribution. Preserve retrieval time and data revisions; never assume yesterday's performance is final merely because the day ended.
- Current attribution labels and connector-default request parameters are not verified historical measurement settings. Do not claim comparability beyond the available evidence.
- An object budget and timestamp are separate from activity-log assumptions. Unknown event timezone or old budget type prevents exact intervention timing/type claims; retain uncertainty instead of silently applying account timezone.
- Budget-control labels are accepted only when supported by explicit configuration evidence. Conflicting budget fields block magnitude recommendations until resolved. Avoid interpreting residual budget-remaining or bid-strategy fields as proof of a current campaign budget.
- These are conservative candidate source-handling rules, not a passed operator intelligence test. No real values or identifiers belong in this specification.

- Real data package and Gate 0 inspection.
- Authorized Meta access and field verification.
- Private account targets, optimization mode, hard constraints and relevant recent changes.
- Explicit provisional magnitude/sufficiency/waiting policy, or documented missing-policy states.
- Subrat's independent review tomorrow.

Next action: inspect the incoming data privately and produce the first candidate evidence sheet before revealing either side's answers.

## Target semantics — accepted correction

Distinguish the minimum acceptable efficiency guardrail from the desired overall average and any verified spend-specific expectations. Clearing the floor alone does not trigger scaling; an individual object below the desired overall average is not automatically a reduction. Aggregate ROAS uses total compatible purchase value divided by total compatible spend. Keep actual account targets private and sourced. Historical transcript examples are directional; latest explicit user context overrides them. This adds correct context handling to V1, not overall planning or spend-response modelling.
