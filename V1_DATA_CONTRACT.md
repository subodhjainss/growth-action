# V1_DATA_CONTRACT.md

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

Define the minimum data Growth Action V1 needs to make a credible Meta ad-set budget decision plus RCA-lite.

**Principle:** do not dumb down the intelligence to fit the current DaMENSCH sheet. First define the mandatory data. Then use the cheapest ingestion route that provides it with low operator effort.

**V1 default:** saved exports with saved mapping.  
**Escalation:** read-only Meta API becomes a V1 requirement only if exports cannot provide the mandatory fields reliably or create material repeated work.

---

# 1. What we know from the operator session

Confirmed in the current workflow:
- review happens mainly at ad-set level,
- daily spend matters,
- ROAS is reviewed across multiple windows,
- expected ROAS changes with spend,
- operators sometimes deliberately wait when the trend is erratic,
- creative diagnosis requires deeper inspection of top-spending creatives, age, CPM/CTR and performance,
- basic scale-up/down logic is easier than RCA.

The current internal report is therefore **not assumed to be sufficient for RCA-lite**.

---

# 2. Canonical ingestion model

Growth Action should normalize incoming data into three logical datasets.

The physical ingestion may be one export, multiple exports, or an API. The product should not care once data is normalized.

## Dataset A — `adset_daily`

One row per **ad set × calendar day**.

### Mandatory identity/context

| Field | Required | Why |
|---|---:|---|
| date | yes | rolling windows + implementation comparison |
| account_id | yes | tenant/account scope |
| campaign_id | yes | hierarchy |
| campaign_name | yes | operator readability |
| adset_id | yes | stable decision key |
| adset_name | yes | operator readability |
| objective / optimization_goal | yes if available; otherwise one-time config | different objectives require different evaluation |
| currency | yes, once/account | correct magnitudes |
| account_timezone | yes, once/account | daily window consistency |

### Mandatory operating state

| Field | Required | Why |
|---|---:|---|
| daily_budget or equivalent current budget | yes | magnitude recommendation + implementation inference |
| effective_status/status | yes | do not recommend against inactive objects |
| spend | yes | scale state + efficiency |
| impressions | yes | derive CPM/CTR context |
| clicks or outbound/link clicks | yes | derive CTR/CVR |
| conversions/purchases | yes for conversion campaigns | sample size + CVR/CPA |
| conversion_value/purchase_value | yes for ROAS-based decisions | derive ROAS |
| reach | preferred | exposure context |
| frequency | preferred | exposure/creative context |

### Derived by Growth Action, not trusted from spreadsheet formulas

- ROAS = conversion value / spend
- CTR
- CPM
- CVR
- CPA / cost per purchase
- daily budget change
- daily spend change
- rolling 1/3/7/14-day summaries
- trend direction
- variance/volatility descriptors
- time since last known budget intervention

---

## Dataset B — `ad_daily`

One row per **ad/creative × calendar day**.

This is mandatory for credible V1 RCA-lite if the product wants to classify “likely creative deterioration”.

### Mandatory

| Field | Required | Why |
|---|---:|---|
| date | yes | time pattern |
| ad_id | yes | stable creative/ad key |
| ad_name | yes | readability |
| adset_id | yes | connect creative evidence to ad-set decision |
| campaign_id | yes | hierarchy |
| effective_status/status | yes | active vs inactive |
| spend | yes | spend concentration |
| impressions | yes | CPM/CTR |
| clicks or outbound/link clicks | yes | CTR/CVR |
| conversions/purchases | yes for conversion campaigns | creative conversion evidence |
| conversion_value/purchase_value | yes for ROAS decisions | creative ROAS |
| reach | preferred | exposure |
| frequency | preferred | exposure/fatigue context |

### Object metadata — mandatory if available through export/API

| Field | Priority | Why |
|---|---:|---|
| ad_created_time / start_time | high | age of top-spend creative |
| ad_updated_time | medium | detect recent edits |
| creative_id | medium | distinguish creative object from ad |
| configured/effective status | high | current usability |

### Derived

- ad-level ROAS
- CTR / CPM / CVR / CPA
- share of ad-set spend by ad
- top-1 / top-3 spend concentration
- creative/ad age
- change in creative mix over time
- whether dominant creatives are improving/deteriorating

---

## Dataset C — `adset_snapshot`

Current object/configuration state, one row per ad set per import.

### Mandatory

| Field | Required | Why |
|---|---:|---|
| snapshot_at | yes | know when state was observed |
| adset_id | yes | key |
| daily_budget / current budget | yes | action + implementation inference |
| effective_status | yes | current state |
| optimization_goal/objective | preferred | evaluation context |
| created_time | preferred | maturity |
| updated_time | preferred | recent edit clue |
| learning_stage_info | optional / API-dependent | useful context, not required until verified |

If the daily performance export already contains reliable current budget/status, Dataset C can be created from it.

---

# 3. One-time business context

V1 onboarding should ask only:

| Context | Required |
|---|---:|
| optimization mode: scale / efficiency / balanced | yes |
| target performance metric/value (e.g. target ROAS) | yes |
| one known hard business constraint that can invalidate a media-only recommendation | yes if one exists |
| material recent change not visible in imported data | only when relevant |

Operator heuristics (for example current max % budget change) should be stored separately as **account policy**, not as ground truth.

---

# 4. Minimum history and freshness

## Minimum history

- **14 complete days:** minimum to reproduce the team’s current 1/3/7/14-day context.
- **28 days:** preferred for baseline comparison and better RCA evidence.

Do not block the first test if only 14 days are available, but downgrade confidence.

## Freshness

For the daily V1 workflow:
- latest complete-day data should normally include yesterday,
- partial current-day data must be explicitly marked partial if used,
- stale data must block a confident “account is fine” message.

---

# 5. Attribution/config consistency

Growth Action must avoid comparing inconsistent measurement settings as if they were the same time series.

Store where possible:
- attribution setting/window,
- account timezone,
- currency,
- objective/optimization goal.

If these cannot be read from the export, ask/record them once.

---

# 6. Source strategy

## Route A — saved Ads Manager/report exports

Use if the mandatory contract can be fulfilled without the team building a new internal report.

Desired operator experience:

> Run/save the same export preset → upload → Growth Action maps automatically.

No repeated column mapping.

### Likely export set

Logical requirement, not a fixed UI instruction:
1. ad-set daily performance/config view,
2. ad-level daily performance view,
3. optional object/config snapshot if budget/status/age are missing.

If one export can satisfy multiple logical datasets, use one.

## Route B — read-only Meta Marketing API

Promote into V1 if:
- mandatory fields are unavailable or unreliable in exports,
- export preparation becomes repeated work,
- object metadata needed for RCA/implementation inference is otherwise unavailable.

Verified current Meta official Postman examples show:
- Insights requests can return IDs/names, actions/action_values, impressions, clicks, spend, frequency, reach and other metrics with daily `time_increment=1`.
- Ad-set object queries expose fields including `daily_budget`, `optimization_goal`, `effective_status`, `created_time`, `updated_time`, and `learning_stage_info`.
- Ad object queries expose `adset_id`, `creative`, `effective_status`, `created_time`, and `updated_time`.
- Meta’s official Postman onboarding says Standard Access with `ads_read`/`ads_management` is sufficient when an app manages its own ad account; managing other people’s ad accounts needs Advanced Access. V1.1 external connectivity must therefore be treated separately.

Sources (official Meta Postman workspace):
- https://www.postman.com/meta/facebook-marketing-api/overview
- https://www.postman.com/meta/facebook-marketing-api/documentation/0zr4mes/facebook-marketing-api-mapi
- https://www.postman.com/meta/facebook-marketing-api/request/i3u5n9r/getadsetdetailsforaccount
- https://www.postman.com/meta/facebook-marketing-api/request/uisas2z/getadsfromaccountidwithfields

---

# 7. Current DaMENSCH report coverage — status

From the operator transcript, confirmed present/used:
- ad-set identity,
- spend,
- ROAS across multiple windows,
- at least some conversion context.

Not sufficiently confirmed from the transcript:
- clean daily raw rows rather than precomputed windows,
- ad-level daily history in the same export,
- current daily budget per ad set,
- ad creation/update time,
- frequency/reach at ad level,
- consistent attribution metadata,
- object status/history.

**Action:** inspect one real export before coding ingestion. Do not make the team build a new sheet until this gap is checked.

---

# 8. Mandatory vs optional decision rule

A field is **mandatory** only when its absence makes a V1 decision or RCA bucket unsafe.

When a non-mandatory field is absent:
- reduce confidence,
- omit unsupported reasoning,
- do not invent it.

When a mandatory field is absent:
- return NEEDS CONTEXT / CANNOT ASSESS,
- or change ingestion route.

---

# 9. Data contract acceptance test

The contract is accepted when one real DaMENSCH data package can be normalized so that for each test ad set Growth Action can answer:

1. What is the current/recent budget and spend?
2. What happened to ROAS/CTR/CPM/CVR/CPA across relevant windows?
3. Did a recent budget/state change occur?
4. Which ads/creatives are consuming the ad-set spend?
5. Are those dominant creatives changing in performance or age?
6. Is there enough data to say SCALE / REDUCE / HOLD / NEEDS CONTEXT?
7. Is there enough evidence to choose one RCA-lite bucket without pretending certainty?
8. On tomorrow’s import, can we infer whether the approved budget change happened?

If not, the data route is insufficient.

## Budget ownership addition — accepted 4 October 2026

Mandatory before any budget-change recommendation: identify whether budget is independently controlled by the ad set, controlled by its campaign, or unknown. Store the controlling object ID, budget type and observed current value with its observation time. Verify actual source fields at Gate 0. Never substitute spend for budget. A current object value must not be backfilled as historical daily budget; missing historical budget/intervention evidence must remain explicit.
