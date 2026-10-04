# SOURCES.md

## Accepted update — 4 October 2026

- **Objective boundary — accepted 4 October 2026:** V1 budget recommendations cover sales/purchase objectives only. Identify traffic objectives and show an explicit unsupported-objective state; never assess them against sales ROAS targets. Unknown or incompatible objectives block budget recommendations. **Traffic-objective decisioning is required in V1.1, not V2**, before claiming support for pilots that require it. Validate objective-appropriate metrics, targets, magnitude rules, safety checks and implementation inference with the operator; do not assume CTR alone is sufficient.

This update overrides conflicting ingestion and budget-scope statements below.

- **V1 main ingestion path:** read-only Meta Marketing API connection to the DaMENSCH ad account. CSV/export upload remains the fallback only. Both routes must satisfy the same mandatory data contract; do not weaken intelligence to accommodate access delays.
- **Product edge to prove:** read current account data, remember prior decisions, and check observed configuration against the operator’s final decision. Approval is not implementation; observations are descriptive, not causal proof.
- **V1 budget scope:** recommend budget changes only for ad sets with independently controlled budgets. Read and identify shared campaign-budget objects, but show an explicit unsupported-budget-control state rather than treating campaign budget or ad-set spend as an editable ad-set budget.
- **Required V1.1:** shared campaign-budget decisioning, including affected ad sets, the correct editable budget object, supporting campaign/ad-set evidence, and implementation inference at that object. This is required before external pilots whose accounts depend on campaign budgets; do not describe those accounts as supported until verified.
- **Access dependency:** confirm the Meta app/business relationship, authorized account access, read permissions, and applicable API access tier. Own-account Standard permission access and external-client Advanced permission access are different. A successful read is required before claiming access works. No verified current approval turnaround is available from this research; record the app dashboard’s actual requirements/estimate when available.
- Gate 0 now checks the read-only connection and its returned data against the contract, with exports as fallback. Gate 1 still precedes final thresholds, magnitude rules, RCA triggers and confidence cutoffs.


## Product source

Primary operator research:
- `Perf Marketing catchup - 2026_10_03 15_33 IST - Notes by Gemini.docx`
- 3 Oct 2026 discussion with DaMENSCH performance-marketing operators.

Key operator-derived points:
- daily ad-set review,
- ROAS interpreted relative to spend,
- multi-window trend review,
- gradual scaling/reduction heuristics,
- deliberate no-action for erratic performance,
- deeper creative investigation in Ads Manager,
- RCA considered higher-effort than basic scale math,
- prior tools seen as low value when the team had to supply the intelligence.

## Meta API verification

Meta official Postman workspace (Facebook Marketing API), checked 4 Oct 2026:
- https://www.postman.com/meta/facebook-marketing-api/overview
- https://www.postman.com/meta/facebook-marketing-api/documentation/0zr4mes/facebook-marketing-api-mapi
- https://www.postman.com/meta/facebook-marketing-api/request/i3u5n9r/getadsetdetailsforaccount
- https://www.postman.com/meta/facebook-marketing-api/request/uisas2z/getadsfromaccountidwithfields

Verified examples include:
- Insights data at daily increments with account/campaign/ad-set/ad identifiers, actions/action values, impressions, clicks, spend, reach, frequency and related metrics.
- Ad-set fields including daily budget, optimization goal, effective status, created/updated times and learning-stage information.
- Ad fields including ad-set/creative linkage, effective status, created time and updated time.
- Meta onboarding guidance that own-account use can use Standard Access with relevant ads permissions, while managing other organizations’ accounts requires Advanced Access.

Treat the actual API version/field availability for the configured Meta app as something Codex must verify at implementation time.

## Access research — 4 October 2026

Meta's official Postman documentation was consulted again:
https://www.postman.com/meta/facebook-marketing-api/documentation/0zr4mes/facebook-marketing-api-mapi

It distinguishes Standard permission access for own-account use from Advanced permission access for other organizations' accounts. Request only the read permissions needed for this product; do not request write access merely because examples include it. Confirm the app/business/account setup and separate API-tier requirements in the actual dashboard.

The official authorization and App Review pages could not be retrieved during this check:
- https://developers.facebook.com/docs/marketing-api/overview/authorization/
- https://developers.facebook.com/docs/apps/review/
- https://developers.facebook.com/docs/apps/review/faqs/

**Approval timing: unverified.** Do not promise immediate access, a fixed number of days, or external pilot readiness. Check the live dashboard and prove one authorized read. No connection was attempted during this documentation update.
