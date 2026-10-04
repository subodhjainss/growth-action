# IDEA_SCOPE.md

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


## GrowthX Build Sprint — Control Plane

**Product working title:** Growth Action — Paid Media Decision Agent  
**Primary track:** AI Agent as a Service  
**Sprint:** 2–17 October 2026  
**Builder:** Solo  
**Fixed stack:** Codex (or Claude Code), GitHub, Convex (app hosting + login)  
**Submission deadline:** Saturday, 17 October 2026, before 11:00 AM IST

---

# UDAYAN KICKOFF LOCK — 2 OCT 2026

> This section is the idea lock for Shaktimaan. User-authored lines preserve the builder's own language with only obvious dictation cleanup. Research/inference is explicitly labeled and is not presented as user wording.

## IDEA LOCK · Build Sprint

**The idea, in one line — [USER-STATED]:**  
“Growth Action is an AI-native performance marketing manager.”

**Why me — [USER-STATED]:**  
“None, but I’m willing to risk it.”

**Why-me rule status — [WORKING-INFERENCE]:** This does **not** pass Udayan's Why Me test today. Do not manufacture an advantage. The builder is choosing to proceed despite this weakness.

## GOAL

**The one goal they hire it for — [USER-STATED]:**  
**Money.** “I hire Growth Action because I want to get better ROI on my ad spend.”

**Delta 4 — today's path — [USER-STATED, lightly cleaned]:**
1. They analyse creative-wise spend in a Google spreadsheet.
2. They look at how much is being spent and how performance and spend are trending over time.
3. Based on that, they decide whether they need to change budgets, come up with a new creative, or change something else.
4. They also keep track of what competitors are doing and take ideas from that.
5. A lot of the analysis and decision-making is manual, so reaction time is slower and decisions are often based on trendlines rather than deeper statistical analysis.

**Delta 4 — with Growth Action — [USER-STATED]:**
1. Open Growth Action.
2. See the recommendations and why those recommendations are being made.
3. Approve the recommendations — yes or no.
4. Eventually, execution becomes automatic.

**Why ChatGPT alone is not enough — [USER-STATED, lightly cleaned]:**  
“Growth Action has to be a tool and an agent. ChatGPT alone cannot do it because the system needs historical context — what decisions were made yesterday, what impact those decisions had, and what the system learned from them. That learning should improve decision-making and improve the next recommendation. It needs an ongoing learning process so it becomes smarter over time.”

**ChatGPT kill-rule status — [WORKING-INFERENCE]:** **Conditionally passes only if persistent decision memory + outcome feedback materially changes future recommendations.** If the product is merely “upload ad data → get LLM advice,” kill it.

**The sin it rides — [USER-STATED]:**  
“Greed — getting more return from the same ad spend.”

## USER

**The trigger — [USER-STATED]:**  
“A Head of Performance Marketing opens Growth Action every day to get a quick understanding of what’s going on and whether everything is on track.”

**Today's path, step by step — [USER-STATED, lightly cleaned]:**  
Creative-wise spend and performance are analysed in Google spreadsheets; spend/performance trends are reviewed; the team decides whether budgets, creatives, or something else should change; competitor activity is also watched for ideas; analysis and decisions are substantially manual.

**Who they trust on this decision — [USER-STATED]:**  
“Other experts, agencies, Google/Meta account teams, and performance-marketing communities.”

**Would they pay? — [USER-STATED]:**  
“Yes, they will pay. We are also looking for a paid tool, but we are not getting something which really does what we need. If the tool is good enough, there is definitely a real willingness to pay.”

**Payment evidence — [VERIFIED WEB, 2 Oct 2026]:** Paid products already exist in this category. Triple Whale sells Moby/Actions as part of paid plans and Madgicx sells AI Marketer for Meta optimization. This validates willingness to pay for adjacent outcomes, not willingness to pay for Growth Action specifically.

## PRODUCT

**Onboarding — [USER-STATED, lightly cleaned]:**  
“Start with some sort of plug-in that connects to their current social-media/performance layer. It should immediately show the drawbacks in the current way of working — how late they are reacting, how much they are losing, etc. That becomes the proof that the product is useful.”

**Onboarding evidence constraint — [WORKING-INFERENCE]:** “How much they are losing” must be defensibly calculable from available data. Do not invent precise loss numbers. Sprint fallback may use exports/manual upload even though the desired onboarding vision is a plug-in/connection.

**The core loop — user stories [ASSISTANT-DRAFTED FROM USER'S PRIOR STATEMENTS; USER AUTHORIZED]:**
1. As a Head of Performance Marketing, I want to open Growth Action every day and quickly understand what is going on and whether everything is on track, so I know where I need to intervene.
2. As a Head of Performance Marketing, I want Growth Action to tell me when a budget needs to shift and why, so I can make the decision faster without manually analysing spreadsheets and trendlines.
3. As a Head of Performance Marketing, I want early warning when a creative is starting to weaken, so I can prepare or change the creative before performance drops significantly.
4. As a Head of Performance Marketing, I want to understand what direction of creative is working better across many creatives, so I know what kind of creative to make next.
5. As a Head of Performance Marketing, I want the system to remember what decisions were made earlier and what happened after those decisions, so the next recommendation becomes smarter rather than starting from scratch every day.

**Coming back — [USER-APPROVED]:**  
“They come back every day because paid-media performance keeps changing, and Growth Action becomes more useful as it remembers previous decisions and their impact.”

**The AI-first part — [USER-APPROVED]:**  
“The AI uses current performance data together with historical context — what decisions were made before, what impact those decisions had, and what was learned from them — to improve the next recommendation over time.”

**Implementation clarification for the sprint — [WORKING-INFERENCE]:** “Learning” means persistent decision/outcome memory that changes the context/policy for the next recommendation. Do **not** assume online fine-tuning or model-weight updates are required for v1.

## MARKET

**Tailwinds — [VERIFIED WEB + INFERENCE]:**
- **Agentic media buying is being funded directly:** Concord announced a **$3M seed round on 23 Jun 2026** for an agentic media-buying platform that turns briefs into live campaigns and manages pacing/optimization across platforms. Source: https://www.prnewswire.com/news-releases/concord-raises-3m-to-build-agentic-execution-for-media-buying-302805900.html
- **Agents that run/grow businesses are attracting larger rounds:** Runable announced **$21M on 26 Aug 2026**; its product direction explicitly includes running ads and closing the loop from underperformance to action. Source: https://runable.com/blogs/runable-grow
- **The category is shipping, not only being funded:** Triple Whale made **Moby Actions for Media Buying generally available in July 2026**, with connected-platform actions and recurring automations. Source: https://www.triplewhale.com/product-updates
- **Timing inference:** The market is moving from AI that explains performance toward AI that can recommend and execute marketing actions. That supports the timing of the problem, but also raises the bar for differentiation.
- **Google Trends:** **NOT VERIFIED in this pass. Do not claim a Trends result.**

**Competitors — [ASSISTANT-RESEARCHED; USER DELEGATED]:**

1. **Triple Whale / Moby Actions — closest direct competitor.** It reviews connected performance, can apply media-buying rules, proposes actions for review, supports approve/reject/change, and can execute supported actions on connected platforms. Component references worth studying: the action card (recommendation + reasoning + approve/reject/discuss), approval-vs-automation controls, and action history. Sources: https://www.triplewhale.com/moby-ai/actions and https://kb.triplewhale.com/en/articles/11932150-what-are-moby-actions
2. **Madgicx / AI Marketer.** It continuously audits Meta accounts, generates daily recommendations from account data/history, and prepares changes for the user to launch. Component reference: daily recommendation queue with a direct “what should I do next?” orientation. Sources: https://madgicx.com/ai-marketer and https://academy.madgicx.com/lessons/how-to-use-ai-marketer
3. **The manual workflow itself.** Google/Meta + spreadsheets + operator judgement + agencies/account teams/communities, sometimes supplemented by AI tools, is the incumbent behavior to beat.

**Competitive conclusion — [WORKING-INFERENCE]:** “AI recommendations for media buying” is not a defensible wedge by itself. Growth Action must prove that persistent decision memory + learning from the outcomes of prior interventions makes the next decision materially better and more account-specific.

**Teardown status:** The competitor facts above are researched. The screenshot-based teardown Udayan asked the builder to do is **not yet personally completed**. Capture component screenshots before UI implementation if useful; do not copy a competitor wholesale.

**Size and fit — [USER-STATED]:**  
“Close circle: 4–5 people at different companies who should be willing to hear me out and evaluate it seriously. Extended network: realistically 100–200 such people, depending on how good the product is.”

**Distribution rule status — [WORKING-INFERENCE]:** Below Udayan's comfort zone: fewer than 10 in the close circle and below the 200–300 extended-network check. This does not kill the idea, but it is a real GTM weakness.

## KILL-RULE AUDIT

1. **Can ChatGPT do it?** Conditional pass only if persistent memory/outcome feedback changes future decisions; otherwise **kill it**.
2. **Is AI at the core?** Pass as currently defined: reasoning across performance + historical decisions/outcomes is central to the loop. Remove AI and the locked product no longer performs the decision job.
3. **Licence/regulatory dependency?** Pass for current v1: no regulated licence is intrinsic. Do not make live ad-platform API approval a blocker; export/manual input is an allowed sprint fallback.
4. **Uncollectable data?** Pass provisionally: the builder can access real paid-media data and real operators. The no-code/operator test still needs to prove the available fields are sufficient.

---

# 0. How to use this file

This file is the build control plane. When a new idea appears during the sprint, do **not** silently add it to v1. Put it in the Parking Lot / V2+ section unless it is required to make the locked core flow work.

The sprint optimizes for **depth of decision quality over breadth of features**. If time gets tight, cut integrations, automation, dashboards, channels, and edge cases before cutting the quality of the core decision loop.

The central product test is not “Can we make a smart-looking dashboard?” It is:

> Can the agent make a paid-media decision that an experienced performance marketer considers context-aware, non-naive, and useful enough to act on — while also knowing when **not** to intervene?

---

# 1. Provenance rules

Keep three statement types separate throughout product work:

- **[USER-STATED]** — directly stated by the builder/user.
- **[SOURCE-DOC]** — present in the original *AI Growth CMO Strategy* document.
- **[WORKING-INFERENCE]** — product reasoning/hypothesis that still requires validation.

Do not convert a working inference into a “fact” without evidence from users, source material, or observed product behavior.

Do not invent platform capabilities, APIs, attribution quality, learning-window rules, or performance thresholds.

---

# 2. Locked idea

## One-sentence product

**User-authored lock:** “Growth Action is an AI-native performance marketing manager.”

**Operational definition:** Growth Action is an AI paid-media decision agent that watches campaign and creative performance, identifies when intervention is actually warranted, and gives the marketer a prioritized action with evidence, restraint, and next-step direction.

## Person

**Primary user:** Head of Performance Marketing / senior media buyer managing meaningful Google and/or Meta spend.

## Pain

Performance teams spend meaningful expert bandwidth repeatedly interpreting campaign, ad-set, and creative data to decide:

- what actually changed,
- whether the change is signal or noise,
- whether intervention is justified now,
- what to change,
- what **not** to disturb,
- and what creative direction should be produced next.

Acting too late can waste spend. Acting too quickly can damage a campaign’s learning or performance. Current reporting and spreadsheets help explain what happened, but the interpretation → decision → action loop remains substantially manual.

## Core action

> **User supplies paid-media performance + creative context → agent identifies meaningful changes → recommends exactly what to do or explicitly says “do nothing yet” → user approves / rejects / edits → agent records the decision and uses that history in the next analysis.**

## Product object

The primary object is a **Decision Feed**, not a dashboard.

Every item should help answer: **What should the marketer do next, and why now?**

---

# 3. Decision types in v1

V1 supports exactly three decision families.

## 3.1 Budget intervention

The system should identify when budget intervention is warranted and produce a concrete, reviewable recommendation.

A useful recommendation should eventually include:

- what changed,
- why the change matters,
- whether action is warranted now,
- recommended action (increase / decrease / reallocate / hold),
- proposed magnitude when defensible,
- what should remain untouched,
- evidence used,
- confidence / uncertainty,
- when to revisit.

**Non-goal:** naive rules such as “ROAS down → reduce budget.”

## 3.2 Creative early warning

The system should detect credible early deterioration in a creative and distinguish between:

- **WATCH** — evidence is weak or too early,
- **PREPARE REPLACEMENT** — deterioration is credible enough to start creative production,
- **CHANGE NOW** — action is warranted,
- **NO ACTION** — current evidence does not justify intervention.

**Non-goal:** “CTR down = creative fatigued.”

## 3.3 Creative direction

The system should help answer:

> What is working about the winning creatives, and what creative hypothesis deserves the next production slot?

Direction may eventually be derived from dimensions such as hook, format, offer, visual treatment, product/benefit, creator style, copy angle, or other labels relevant to the advertiser.

V1 may use manual or lightweight tagging if automatic creative understanding is not yet reliable.

**Non-goal:** generic “make more UGC” or “refresh the creative” advice without evidence.

---

# 4. The required fourth action: restraint

**NO ACTION is a first-class recommendation.**

The agent must be capable of saying:

> The evidence does not yet justify disturbing the campaign. Keep current settings, watch these indicators, and review again when condition X occurs or at the next review point.

This is essential because the product is intended to behave like an operator, not an alert generator.

---

# 5. Decision-card contract

Every Growth Action should use this structure as far as the available evidence allows:

1. **Action status** — e.g. HOLD / WATCH / PREPARE / INCREASE / DECREASE / REALLOCATE / CHANGE NOW.
2. **What changed** — the observed pattern.
3. **Why it matters** — practical implication.
4. **Recommended action** — what the operator should do.
5. **Why now** — why intervention is or is not justified at this moment.
6. **What not to change** — explicit restraint.
7. **Evidence** — metrics, trend, comparison, or recent history used.
8. **Confidence / uncertainty** — where the recommendation is weak or context is missing.
9. **Revisit condition** — what should trigger the next review.
10. **User response** — Approve / Edit / Reject.
11. **Execution state** — Not done / Done / Deferred.
12. **Decision memory** — what changed after this action, so tomorrow’s recommendation knows recent history.

If the system cannot produce a defensible action, it should produce **NO ACTION / NEEDS CONTEXT**, not fill the gap with generic advice.

---

# 6. V1 — what it does

V1 should:

- accept real paid-media performance data through a practical input route (CSV/export/manual mapping is acceptable),
- accept enough creative context to distinguish and compare creatives,
- analyze recent performance in context rather than only a single snapshot,
- produce a prioritized Decision Feed,
- cover the three locked decision families,
- explicitly support restraint / no-action decisions,
- let the user approve, reject, or edit a recommendation,
- record recommendations and user actions,
- use recent decision/action history in the next analysis,
- work without the builder verbally explaining every screen,
- be live at a URL,
- use Convex for the app/login/data layer as required by the sprint,
- be pushed to a public GitHub repository by submission.

---

# 7. V1 — what it does not do

V1 does **not**:

- optimize inventory or stock,
- perform assortment planning,
- optimize discounting,
- optimize POAS or LTV,
- use COGS/profitability as a required input,
- automatically execute budget changes inside Google or Meta,
- require Shopify,
- require BetterCommerce,
- require any specific commerce platform,
- become a generic growth copilot,
- optimize CRM, retention, lifecycle, pricing, SEO, landing pages, or merchandising,
- attempt full cross-business P&L optimization,
- pretend to have universal performance-marketing rules,
- generate advice when evidence is insufficient.

---

# 8. Platform and data philosophy

## Platform-agnostic product

The product concept is not tied to Shopify or any particular commerce platform.

The builder’s own business uses BetterCommerce, which is a useful constraint: commerce-specific integrations must not define the product architecture.

## Manual ingestion is acceptable in v1

A high-quality decision engine on exported data is preferable to shallow intelligence hidden behind polished integrations.

Priority order:

1. correct decision object,
2. useful reasoning,
3. memory of recent actions,
4. reliable user flow,
5. automated ingestion later.

## Human-in-the-loop

V1 ends in a concrete, actionable recommendation plus approval/edit/reject and execution tracking.

Automatic platform execution is deliberately deferred until recommendation quality earns trust.

---

# 9. Riskiest assumption

> **Given the data realistically available to a performance marketer, Growth Action can make decisions that an experienced media buyer considers sufficiently context-aware and non-naive to trust — rather than generic LLM commentary.**

The sprint must attack this assumption before investing in integrations or polish.

---

# 10. Pre-build gate — 30-minute no-code risk test (Saturday 3 Oct, before implementation)

**Friday 2 Oct is lock-only. This test happens Saturday 3 Oct before implementation.**

Take one recent real account/time window.

Provide the same campaign / ad-set / creative performance information available to the operator. Before the performance-marketing lead reveals what they would have done, manually create **five Decision Cards** using the contract in Section 5.

For each card, ask the operator:

- Would you take this action?
- Would you explicitly avoid this action?
- Is this recommendation too early?
- Is it too late?
- What critical context is missing?
- Is any recommendation dangerous?
- Did the agent notice anything you had not prioritized?
- What evidence would change your answer?

**Pass condition:** at least some cards are judged genuinely useful and no catastrophic misunderstanding of the job is discovered.

**Failure condition:** the operator consistently says the recommendations are generic, missing essential context, or unsafe.

**If the test fails:** do not add more features. Narrow the decision family until one class of decision can be made credibly.

---

# 11. Decision-policy extraction — team input

The operator session should explicitly extract the real decision policy.

## Budget decision questions

- Think of the last real budget shift: what evidence triggered it?
- What did you inspect before deciding “change it now”?
- Which signals are leading vs lagging?
- What recent changes would make you wait?
- When does a budget shift become too small to matter or too large to be safe?
- What are the common false alarms?

## Restraint questions

- What makes you intentionally not touch a campaign despite short-term weakness?
- How do recent budget/bid/creative changes alter your interpretation?
- What minimum evidence or elapsed time do you require before another intervention?

## Creative fatigue questions

- What are the earliest credible signs of deterioration?
- Which metrics matter only in combination?
- What looks like fatigue but often is not?
- How do audience, placement, frequency, or delivery changes affect your judgment?
- When do you start producing replacements versus actually stopping the current creative?

## Creative direction questions

- How are 50+ creatives named/tagged today?
- Which dimensions are actually useful: hook, format, offer, creator, visual style, product, copy angle, etc.?
- How do you distinguish a winning *creative* from a winning *direction*?
- What does the creative team need to make the next asset?

Record these answers as product policy inputs; do not silently convert them into hard rules without testing.

---

# 12. First three users

1. **Own Head of Performance Marketing** — internal, real data, observed usage.
2. **Head of Performance Marketing at HomeLane** — direct personal outreach.
3. **Head of Performance Marketing at JioFinance** — direct personal outreach.

Testing principle: do not ask “Do you like it?” Ask them to use it against a real or recent decision and show where they stop trusting it.

---

# 13. Primary sell-week channel

**Primary:** direct 1:1 outreach to performance-marketing leaders in the builder’s network.

**Public channel:** LinkedIn, using real product output (Decision Feed / decision card) rather than generic “AI for marketing” positioning.

Founder/investor and performance/growth communities are secondary distribution surfaces where the builder already has access.

---

# 14. Saturday numbers to capture

Capture actual numbers; do not manufacture vanity metrics.

- number of real organizations/accounts/datasets analyzed,
- number of Decision Cards generated,
- number accepted unchanged,
- number edited,
- number rejected,
- number marked unsafe / wrong,
- number actually executed,
- number explicitly held/no-action,
- number of repeat users / second decision cycles,
- external users beyond the builder’s own company,
- buyer/pilot conversations,
- paid pilot / payment, if achieved,
- time taken from data input to usable action,
- qualitative evidence of “caught something I had not prioritized,” if it genuinely occurs.

---

# 15. Six Build Sprint milestones

## Milestone 1 — Saturday 3 Oct
### Ugly, hardcoded, complete flow live

**Goal:** one ugly but complete end-to-end flow, deployed to Convex and pushed to GitHub.

The flow may use a hardcoded/sample dataset and a narrow decision policy.

**Required flow:**

1. user logs in,
2. user sees or loads a dataset,
3. system produces at least one Decision Card,
4. Decision Card contains action + evidence + restraint,
5. user approves/edits/rejects,
6. decision is stored,
7. page reload retains the decision state,
8. app is reachable at a live URL,
9. repo contains the working app.

**Acceptance test:** a person who did not build it can complete the flow without a verbal walkthrough.

**If behind, cut to this:** one hardcoded advertiser, one decision family, one Decision Card, one approve/reject action. Keep the full loop; cut breadth.

---

## Milestone 2 — Sunday 4 Oct
### Real-data v1 of the decision engine

**Goal:** replace the fake core with the smallest real input → decision loop.

**Required:**

- import at least one real exported dataset,
- basic field mapping or a fixed template,
- at least two of the three decision families functioning on real data,
- no-action / restraint can appear,
- previous user decision is visible to the next analysis,
- product is still usable at the live URL.

**Acceptance test:** the builder’s own Performance Marketing Head can use the app against a real/recent decision and understand the recommendation without explanation.

**If behind, cut to this:** one decision family on real data, but make it deep and credible. Do not add integrations to compensate for weak reasoning.

---

## Milestone 3 — Monday 5 to Wednesday 7 Oct
### Operator validation and policy correction

**Goal:** learn where experienced operators stop trusting the product.

**Monday 5 Oct — scheduled user tasks:**

- observe own Performance Marketing Head use the product,
- run at least one real-data session,
- log every confusion, disagreement, edit, and unsafe recommendation,
- contact HomeLane and JioFinance performance heads and schedule sessions.

**Tuesday 6 Oct — scheduled tasks:**

- test with at least one external performance-marketing leader if available,
- publish one focused LinkedIn post showing the problem/decision object, not a broad AI-CMO claim,
- collect direct replies / objections,
- update decision policy only from observed evidence.

**Wednesday 7 Oct:**

- use Q&A for blockers that are still real,
- freeze the remaining v1 decision model by end of day,
- no new decision families after this point.

**Acceptance test:** at least two experienced operators have used/reviewed a real decision flow, and the top trust failures are documented with fixes or explicit exclusions.

**If behind, cut to this:** own team + one external operator; one decision family; focus only on eliminating dangerous/generic recommendations.

---

## Milestone 4 — Thursday 8 to Friday 9 Oct
### Finish the product; no new scope

**Goal:** turn the validated core into something ready to sell Friday night.

**Required:**

- stable input flow,
- stable Decision Feed,
- decision history/memory works,
- approve/edit/reject works,
- execution state works,
- basic empty/error states,
- clear copy explaining what the action means,
- enough onboarding that a new user can try it,
- no new feature families.

**Acceptance test:** a new tester can get from login to a useful decision without the builder explaining the interface.

**If behind, cut to this:** remove design polish, secondary screens, secondary decision families, and convenience features. Keep one trusted complete flow.

---

## Milestone 5 — Saturday 10 to Friday 16 Oct
### Sell, observe, and fold buyer feedback into the locked core

**Saturday 10–Sunday 11:**

- attend/use GTM masterclass learnings,
- create short product video,
- begin direct outreach,
- make the first real attempt to sell/pilot the product.

**Monday 12 Oct — scheduled GTM task:**

- go live on LinkedIn/socials with the product,
- direct-message relevant operators/buyers,
- ask for a real dataset / decision session, not “feedback.”

**Tuesday 13 Oct — scheduled post:**

- publish a follow-up based on a real insight, objection, or decision pattern,
- continue 1:1 outreach.

**Wednesday 14–Friday 16:**

- one useful public post per day,
- run buyer/user sessions,
- fold feedback back only into the locked core,
- record outcomes and numbers for submission.

**Acceptance test:** at least one stranger/external operator has materially used the product or completed a real decision session; a real sales/pilot ask has been made.

**If behind, cut to this:** stop polishing. Use direct outreach, guided onboarding, and manual data help to get one external person through the core loop.

---

## Milestone 6 — Saturday 17 Oct, before 11:00 AM IST
### Verify, capture evidence, and submit

**Reserve Saturday morning for submission work only. No feature building.**

**Required:**

- verify live URL works,
- verify login works,
- verify one full Decision Feed flow,
- verify public GitHub repo,
- capture screenshots of product and numbers,
- compile final usage / validation / sales numbers,
- submit before 11:00 AM IST.

**Acceptance test:** live product + public repo + numbers are all submitted and independently openable.

**If behind, cut to this:** submit the simplest stable product that completes the core loop. Do not risk the submission for one last feature.

---

# 16. Definition of v1 success

V1 is successful if it proves at least one of these strongly:

1. an experienced media buyer trusts some decisions enough to act on them,
2. the agent catches a meaningful decision earlier or more clearly than the normal workflow,
3. the agent correctly recommends restraint when an inexperienced system would overreact,
4. an external operator returns with another dataset / decision cycle,
5. someone agrees to a pilot or pays.

A pretty dashboard with no trusted decision is not success.

---

# 17. V2 — preserved roadmap (not sprint scope)

V2 begins only after the v1 decision engine earns trust.

## 17.1 Profitability / POAS layer

Add business economics so the agent can distinguish multiple routes to similar ROAS and prefer the route that produces better profit outcomes.

Potential inputs:

- margin / COGS,
- contribution margin,
- product economics,
- POAS,
- customer acquisition economics.

Goal: move from “media-efficient” decisions to “business-efficient” decisions.

## 17.2 LTV / customer-quality layer

Bring in downstream customer quality so two campaigns with similar immediate ROAS can be differentiated by longer-term value.

Potential inputs:

- cohort LTV,
- repeat purchase rate,
- customer quality segments,
- retention outcomes.

## 17.3 Inventory / supply-aware demand control

Reintroduce the original supply-demand pain:

- low-stock winning products,
- stockout risk,
- demand pacing,
- assortment constraints,
- when to keep demand momentum versus throttle,
- reallocation to alternatives,
- interactions with discounting and inventory decisions.

The product must remain commerce-platform agnostic; BetterCommerce, Shopify, and other systems should map into a common business model rather than define the core logic.

## 17.4 Cross-platform budget arbitrage

Compare and reallocate across Google and Meta (and later other paid channels) using business-aware outcomes rather than only platform-reported ROAS.

## 17.5 Automated creative understanding

Move beyond manual labels to multimodal analysis of 50+ creatives.

Potential capabilities:

- automatic creative tagging,
- hook/theme extraction,
- visual pattern recognition,
- offer/copy clustering,
- creative-direction performance analysis,
- direction-level trend detection.

## 17.6 Creative brief generation

When the agent recommends a new creative direction, generate a structured brief that explains:

- why the direction was selected,
- which winning patterns it inherits,
- which fatigue pattern it avoids,
- what should be tested next.

## 17.7 Better ingestion

Add reliable connectors after product value is proven:

- Google Ads,
- Meta Ads,
- commerce platforms,
- CRM/CDP inputs,
- analytics sources.

## 17.8 Notification surfaces

Daily/exception-based summaries through web dashboard and possibly Slack/email once the core decision feed is trusted.

---

# 18. V3 / beyond — AI Growth CMO vision

The long-term vision can expand from paid-media decisioning into a business-aware growth operating system.

Possible future capabilities:

- real-time / near-real-time cross-platform monitoring,
- portfolio-level profit optimization,
- inventory-aware pacing and stockout avoidance,
- COGS and margin-aware allocation,
- LTV-aware acquisition,
- discounting decisions tied to demand and inventory,
- assortment planning support,
- channel budget allocation,
- creative production prioritization,
- predictive waste / “Waste Audit” across prior periods,
- automated anomaly detection,
- approval policies by risk level,
- direct execution inside ad platforms,
- automatic rollback / safeguards,
- full audit trail of recommendations and actions,
- policy learning from approved/rejected decisions,
- business-specific decision memory,
- CRM / retention integration,
- strategic portfolio view for CMO / CBO / growth leadership,
- tactical operator view for media buyers.

The eventual loop is:

> **Ingest business + marketing truth → detect meaningful change → reason about trade-offs → recommend action or restraint → get approval where required → execute → observe outcome → learn from the result.**

This is the broader AI Growth CMO direction. It is deliberately **not** the two-week sprint scope.

---

# 19. Parking lot — mandatory destination for mid-build ideas

Any feature suggested after scope lock goes here first.

| Idea | Why it is attractive | Why it is not required for v1 | Revisit |
|---|---|---|---|
| Live Google Ads API ingestion | Reduces manual data work | Does not prove decision quality | V2 |
| Live Meta Ads API ingestion | Same | Same | V2 |
| Automatic campaign execution | Closes the loop | Dangerous before trust | V2/V3 |
| POAS optimization | Strong business differentiation | Requires economics + attribution inputs | V2 |
| LTV optimization | Better long-term allocation | Requires downstream customer data | V2 |
| Inventory / stock awareness | Directly addresses original founder pain | Adds supply/commerce complexity | V2 |
| BetterCommerce integration | Useful for builder’s own company | Product must remain platform-agnostic | V2 |
| Shopify integration | Useful for many DTC brands | Must not define architecture | V2 |
| Discounting optimization | Connects demand and supply | New decision domain | V2/V3 |
| Assortment planning | High business value | New domain and data model | V2/V3 |
| Auto creative tagging | Helps 50+ creative analysis | Can start with manual tags | V2 |
| AI creative briefs | Actionable creative output | Direction quality must be proven first | V2 |
| Slack alerts | Convenient | Not core value | V2 |
| Waste Audit | Strong acquisition wedge | Separate workflow from daily decision feed | V2 |
| CRM / retention | Broadens growth scope | Outside paid-media wedge | V3 |
| Multi-channel CMO dashboard | Strategic visibility | Risks dashboard bloat | V3 |

Add every new idea here unless the user explicitly reopens scope.

---

# 20. Scope-change rule

A proposed v1 addition is allowed only if all three are true:

1. without it, the core decision loop cannot be tested credibly,
2. it can be implemented without endangering the next milestone,
3. it improves decision quality or trust, not merely polish.

Otherwise: Parking Lot.

---

# 21. Next single action

**Tonight (2 Oct): send `IDEA_LOCK.md` / this lock section to Shaktimaan. Tomorrow (3 Oct), before implementation, run the 30-minute no-code risk test with the own Head of Performance Marketing using one recent real account/time window and produce five Decision Cards.**
