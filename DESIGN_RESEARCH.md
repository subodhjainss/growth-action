# Design research — first-use and daily review

Date: 4 October 2026. Status: research and proposal; not an approved DESIGN.md or permission to implement.

## Evidence limits

Reviewed public websites and official product documentation. No competitor account was created, no paid service was started and no authenticated product walkthrough was completed. Public marketing examples are references, not proof of production behavior. Pixel-level screenshot analysis and mobile interaction checks remain pending; no visual tokens have been chosen.

## Component references

### Website entry and business-context confirmation — Relay Studio

Source: https://relaystudio.ai/
Additional public screens: https://relaystudio.ai/sign-in and https://relaystudio.ai/sign-up

Observed: the public entry asks for a website/App Store URL, offers a description fallback, describes learning the brand before brief one-tap questions, and illustrates an editable brand summary. Public sign-up uses email/password or Google. We have not verified the precise order of the authenticated onboarding.

Take: one small starting task; show what the product learned; make correction easy; progressively ask questions. This is the reference for first-use behavior, not a requirement to copy its content workflow.

Ignore: TikTok publishing, swiping as the only approval control, calendar/content production and subscription mechanics. Consequential budget decisions need explicit, accessible review controls.

### Decision review — Triple Whale Moby Actions

Sources:
- https://www.triplewhale.com/moby-ai/actions
- https://kb.triplewhale.com/en/articles/11932150-what-are-moby-actions

Observed in documentation: proposed actions are queued for attention and opened for review; old/new values and reasoning are exposed with approval, rejection or requested revisions. An actions log records status and detail. Its examples support execution, which Growth Action V1 deliberately excludes.

Take: concrete proposed change; a clearly scoped review; supporting explanation next to the decision; visible historical status. Preserve Growth Action's five-field card contract and independent evidence object.

Ignore: broad execution/creative/commerce workflow and reliance on the user writing full optimization rules. In Growth Action, approval saves a decision and never implies a Meta change occurred.

### Workspace and context — Pixis Prism

Sources:
- https://prism-docs.pixis.ai/overview/interface-layout
- https://prism-docs.pixis.ai/onboarding/setup-first-brand
- https://prism-docs.pixis.ai/onboarding/connect-ad-accounts
- https://prism-docs.pixis.ai/brand-knowledge/detailed-guide/step-1-basic

Observed in documentation: navigation, central chat and reusable-work panels; brand setup includes website/country; advertising accounts connect afterward; business knowledge is scoped to brand/accounts.

Take: clear current business/account, persistent context, explicit connection states and reusable historical work.

Ignore: multi-panel complexity, multiple platform/agent choices and asking customers to author numeric optimization rules. Website-derived context is not a verified performance policy.

## Proposed Growth Action flow — awaiting confirmation

First visit: website → editable business understanding → minimum decision-relevant questions → authenticated account connection or CSV fallback → validation → first decisions → saved operator decision.

Return visit: today’s decisions → Why? and review → manual change in Meta → later refresh/import → implementation status and observation history.

Screen structure: website entry; guided setup with business review and data connection as steps; decisions; history. Sign-in occurs before accessing/storing confidential advertising data. The exact point for creating an account is still to agree, rather than copying an unverified competitor sequence.

The first-results view should become the ordinary decisions screen after onboarding. Avoid creating a separate throwaway audit/dashboard. Becoming a customer does not automatically add a billing/paywall feature to V1; pricing and commitment timing are unresolved.

## Website context boundaries

Extract a bounded set of public business facts relevant to the ad-set job: brand identity, product categories, positioning, publicly advertised prices/offers, intended audience as an explicitly inferred description, and markets where stated. Attach sources and observation dates. Let the user correct or remove claims.

Do not infer profitability targets, acceptable risk, private stock, revenue, conversion rates or budget caps from the site. A published discount may be conditional or expired. Public business understanding alone never produces real budget recommendations.

Use balanced as the proposed default, while preserving varying account goals. Ask only when a missing fact can materially reverse a recommendation. The operator validates product output rather than supplying the entire intelligence layer.

## Enjoyable without adding work

Show useful discoveries progressively, keep progress truthful, and make each step a small task. Recognizing the business is the first reward; a defensible decision on real account data is the value proof. No fake findings, manufactured savings, arbitrary loading celebrations or forced playful interactions.

## States still to resolve with the builder

Website inaccessible/incorrect, incomplete discovery, incorrect inferred context, unsupported account/objective/budget type, declined/expired Meta access, invalid CSVs, stale/provisional data, no action required, insufficient evidence, incorrect recommendation, save/refresh failures and uncertain implementation.

Each surface needs first-visit and returning empty states, loading, error/recovery and done behavior. Exact words and button labels remain unset for the builder's review, one screen at a time. Mobile state-preview instructions are required after implementation.
