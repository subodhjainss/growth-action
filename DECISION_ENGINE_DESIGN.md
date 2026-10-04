# V1 decision-engine design

Status: implementation preparation, 4 October 2026. No working engine or passed operator gate. Implements the separation in V1_INTELLIGENCE_SPEC.md; candidate rules remain in CANDIDATE_DECISION_POLICY.md. Newer approved amendments govern scope. No confidential account values in this document.

## Requirements and assumptions

FR-1–FR-12; AT-1–AT-10, AT-12 and AT-13. Read-only main path and CSV fallback share normalization. D2C/fashion sales objectives and independently controlled ad-set budgets only. Do not weaken the contract to fit one source. Final action thresholds, magnitude parameters, waiting periods and confidence cutoffs wait for Gate 1. This design does not approve automatic execution or overall planning in V1.

## One assessment path

Source import → normalized observations → deterministic calculations → safety checks → candidate action and magnitude policy → structured evidence → explanation → operator decision → later implementation observation.

Source records and derived evidence retain their observation times. Assessment uses a fixed import/context/policy version, so a later import does not silently rewrite an earlier recommendation.

## Data and context

Keep daily ad-set/ad performance separate from current object snapshots and activity events. Preserve reported zero, absent entry, unavailable field and missing row as different states. Keep source-native metrics; do not move purchases to force cross-level agreement. Current attribution labels, objectives and budgets do not establish historic configuration.

Business context records minimum efficiency, desired overall average, optimization mode and any verified spend-specific expectations separately, with source, scope and confirmation time. Constraints can be known, explicitly absent or unknown. Unknown does not fabricate a problem or imply safety: block only affected claims/actions, identify the specific unresolved dependency. Website inferences remain distinguishable from user-confirmed facts.

## Calculation component — FR-2

Aggregate raw numerators and denominators before calculating ratios. Compute 1/3/7/14 windows, nonoverlapping comparisons and weekday-matched descriptions where supported. Report coverage and missingness with every result. Reach is not summed across dates. Purchase-to-click ratio is a descriptive measurement, not necessarily the probability a particular click converts.

Include spend and known budget changes, intervention chronology, daily variation, dominant-ad shares and within-ad changes. Overlapping windows and algebraically related metrics are not independent votes. Current object age is not underlying creative exposure age.

## Safety component — FR-3 / AT-3, AT-12, AT-13

First identify supported objective, active state and editable budget owner. Check required measurements, date freshness, attribution compatibility and material cross-level discrepancies. Then evaluate relevant constraints, intervention evidence and sample sufficiency under an explicit policy.

Unsupported objective/control gets an explicit limitation. Missing material business fact yields NEEDS CONTEXT. Missing or contradictory required measurements yields INVESTIGATE / INSUFFICIENT EVIDENCE. Do not turn these into an assessed HOLD. Unset sample/waiting parameters cannot silently pass. A new budget without any post-change observations cannot inherit the old budget's performance.

## Action and cause — FR-4/FR-5

Use inspectable paths rather than prompt intuition. SCALE requires acceptable economics, credible performance evidence and a defensible next amount. REDUCE requires adequately supported unacceptable performance and review of interventions/competing evidence. HOLD requires evidence supporting no change; it is not the default name for missing information.

Passing the minimum is not an automatic SCALE trigger. Falling below the desired overall average is not automatically REDUCE. The aggregate objective provides context but does not implement account allocation in V1. Never predict incremental return from historic blended ROAS.

Classify RCA separately. Each proposed cause carries supporting and opposing signals. Creative deterioration needs actual ad-level evidence; weakening CTR alone is insufficient. Budget edits preceding decline support a hypothesis, not causal proof. UNCLEAR is valid even when an action is defensible.

## Magnitude — FR-6

Keep business facts separate from the product's proposed intervention policy. The product proposes a next amount; the customer does not have to author the reasoning. For operator preparation, recorded historical steps can anchor explicitly UNVALIDATED candidates, but cannot establish safe/optimal amounts.

After Gate 1, encode a separately versioned account policy with validated step selection, applicable absolute/percentage limits, risk allowance and review conditions. Any approved rounding must stay within those limits. If required policy is unset, retain the gap and withhold an actionable SCALE/REDUCE card. No future response curve or guaranteed result. Do not stack unobserved interventions.

## Evidence and presentation — FR-7/FR-8

Persist calculation references, supporting/contradicting evidence, safety outcome, source/context/policy versions, intervention state, missing facts, confidence rationale and what could change the answer. Only action, magnitude, one-line reason, RCA bucket and confidence appear on the visible card; everything else goes behind Why.

The language model may shorten verified evidence and phrase a predefined contextual question. It cannot change policy outputs, perform new arithmetic or override gates. If explanation fails, use deterministic evidence text without losing the decision. HIGH/MEDIUM/LOW labels require a validated structured policy; no fabricated probability.

## Review and memory — FR-9–FR-12

Persist recommendation, operator approval/edit/rejection, implementation observation and later performance separately. Edits do not overwrite the original. Compare later budget snapshots to the decided budget at the correct object. A matching value supports implementation inference, not certainty about actor, timing or causality; contradictory observations remain visible. Approval never equals execution.

## Implementation sequence and proof

1. Normalization and calculation functions: synthetic cases with missing values, unequal coverage, zero denominators and conflicting snapshots. AT-1/AT-2/AT-3.
2. Safety and evidence functions: synthetic shared budgets, traffic objectives, recent edits and absent post-change observations. AT-3/AT-12/AT-13.
3. Freeze private operator pack; independently compare real cases. AT-10. Record gaps before revealing answers; revised policy needs another case.
4. Encode only validated action/magnitude/confidence parameters; check identical inputs reproduce identical decisions. AT-5/AT-6.
5. Convex persistence and human-review flow; demonstrate edit/reject history and implementation inference. AT-7/AT-8/AT-9.
6. Build the agreed screen flow; verify five-field cards, Why and contextual/error states. AT-4/AT-5. Prove actual read-only access separately for AT-11.

Use the fixed Convex stack. No new infrastructure or app implementation authorized by this document. No additional tests beyond those necessary to prove the above behavior.

## Version boundaries

V1.1 adds controlled improvement, overall Meta planning, shared campaign budgets, traffic-objective support and independent Google decisioning. Proposed learned changes require separate evaluation and explicit approval, with version history and restoration. Additional business types and cross-platform planning remain V2. Predictive fatigue and full creative workflows are not implicitly included.
