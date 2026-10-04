# Intelligence research — 4 October 2026

Research notes, not executable policy. Covers candidate FR-3–FR-6 evidence and operator-test preparation. No application code, final thresholds, or scope changes. Private account assessment stays under ignored Data/. This is an initial targeted review, not an exhaustive literature review or proof of superiority.

## Evidence ladder

Forum advice supplies hypotheses and operator pain points. Prefer source documentation for platform behavior, original studies for statistical methods, and account-specific validation for decision parameters. A popular claim or an impressive reported ROAS is not independent validation. Vendor promotion, missing denominators, survivor bias, and unreported interventions weaken forum evidence.

## Practitioner discussions examined

- [FacebookAds: handling creative fatigue](https://www.reddit.com/r/FacebookAds/comments/1vtlg0y/how_are_you_handling_creative_fatigue/). Operators describe replacement-production delays and using several signals. Advice conflicts: short creative lifetimes versus ads working for years; fixed frequency thresholds versus no fixed replacement calendar. Many comments promote products. Take the workflow need; reject the claimed universal lifetimes and platform-reset rules unless independently verified.
- [FacebookAds: knowing whether fatigue is the problem](https://www.reddit.com/r/FacebookAds/comments/1w6z8n6/how_do_you_know_creative_fatigue_is_the_problem/). Useful diagnostic question, but self-reported discussions cannot establish cause. Preserve competing explanations.
- [PPC: how much and where to scale](https://www.reddit.com/r/PPC/comments/16eadfm/scaling_up_campaigns_how_do_i_decide_how_much_to/). Scaling and replacement are linked operator concerns; advice is not a validated magnitude policy.

## Primary research and applicability

| Source | What it establishes | Limit for Growth Action |
|---|---|---|
| [Fatigue-Aware Ad Creative Selection](https://arxiv.org/html/1908.08936v2), Moriwaki et al. | An exposure-aware creative-selection algorithm evaluated in production | Selection inside an advertising system is a different task from diagnosing Meta daily exports; do not transplant its results or parameters |
| [Yahoo soft frequency capping](https://arxiv.org/abs/2312.05052) | User–ad exposure features were used in click prediction and evaluated online | Aggregate daily frequency is not user–ad exposure history; its reported revenue lift is not a forecast for our product |
| [Creative fatigue screening with path signatures](https://arxiv.org/html/2509.09758v5), Shaw | Candidate trajectory-based detection; reports warning and alert-burden evaluation | Synthetic panel, operational CTR-based onset definition rather than independently verified real fatigue. Promising research, not production proof; advanced detection remains outside V1 |
| [NIST proportions control charts](https://www.itl.nist.gov/div898/handbook/pmc/section3/pmc332.htm) | Binomial proportion monitoring under a stable probability and independent units | Repeated people, changing delivery, placement mix, and attribution break easy assumptions. Millions of impressions do not automatically give millions of independent observations |
| [Time-uniform confidence sequences](https://arxiv.org/abs/1810.08240), Howard et al. | Methods for uncertainty statements that remain valid during repeated monitoring under specified assumptions | Daily checking across many creatives requires a monitoring design and multiplicity handling. This does not make nonrandomized observations causal; not a V1 implementation commitment |

Attempted [Meta fatigue help page](https://www.facebook.com/business/help/1346816142327858) redirected to login. Its contents were not verified. No platform threshold or learning-reset claim from third-party summaries has been adopted.

## Statistical approach to investigate

1. Establish measurement first: attribution definitions, complete versus provisional dates, missing action entries, current and historic interventions. Preserve source revisions.
2. Start with the same creative's own history under reasonably comparable conditions. Match weekdays when possible; report promotion, spend, placement, and mix differences. Campaign age alone is not creative exposure age.
3. Describe sustained movement and daily variation before fitting a model. Rates use their original denominators. CTR measures response, CPA/ROAS economics; their algebraic relationships do not make them independent confirmations.
4. For later statistical evaluation, compare uncertainty methods: binomial intervals only where assumptions fit; day/block resampling only with adequate history and dependence checks; sequential monitoring when checking repeatedly. Purchase-to-link-click ratio is not necessarily a binomial conversion probability because attributed purchases can include other routes.
5. ROAS uncertainty needs purchase-value variability, attribution maturity and day dependence. Aggregate purchase counts and total value do not justify a precise revenue confidence interval. A simple ratio is not an incremental return estimate.
6. Separate an emerging-risk flag, evidence of deterioration, and a budget action. A flag must not automatically pause a still-effective ad or prescribe creative changes.

No statistical test run here establishes causal fatigue or profitable scaling. The available short account history supports descriptive assessment, not a calibrated prediction.

## Benchmarks

Proposed reference hierarchy, subject to validation: verified business goal and acceptable acquisition economics; the object's comparable account history; comparable campaign/creative cohorts; industry figures as orientation only. Segment by objective, attribution, geography, prospecting/remarketing where verifiable, promotion, product category and actual spend. Do not create sparse combinations and call them reliable benchmarks.

Campaign days determine available evidence and intervention maturity, not a universal ROAS target. Budget affects exposure and business risk but does not specify acceptable return by itself. Historic high ROAS is not proof of headroom. The operator supplies business facts; the product should calculate and propose the action rather than ask the operator to author every rule.

## Early warning validation

The user wants preparation time before economic deterioration. A warning before revenue collapses can be investigated; predicting before any detectable change cannot be promised. Define the warning horizon using actual replacement lead time. Evaluate on chronologically held-out account histories: useful warning lead time, false warnings per creative-week, missed deteriorations, revenue/spend at risk, and whether suggested action was useful. Avoid defining truth solely by the same CTR threshold the detector uses. Include independent review and competing causes.

Need longer historic ad-level observations, intervention and promotion history, revised attribution snapshots, verified window-level reach/frequency where available, and production lead time. Request only fields the chosen evaluation actually uses; no user-level data requirement for V1.

V1 can strengthen inspectable multi-signal RCA and sufficiency now. Predictive fatigue models, warning screens, alerts and creative workflows require an explicit scope decision; none was silently added to V1 or V1.1.
