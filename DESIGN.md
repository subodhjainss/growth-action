# DESIGN.md

Read this before building or changing any screen. For the authorized overnight build, resolve routine choices and record them here. Ask only about a material new product choice outside the agreed scope.

Status: five-screen structure and playful-science direction approved 4 October. Exact tokens and remaining states completed under the builder’s autonomous overnight authorization on 5 October 2026. The implementation record below supersedes earlier pending wording. Screens have been checked in an actual browser at desktop and 390-pixel phone width; this is not a physical-phone test.

## 1. The feeling, in labels

Approved direction: **playful science**. Expressive onboarding becomes a focused daily decision workspace.

- **Meaningful mathematical marks:** brackets, arrows, dots and faint real metric relationships express evidence coming together; no random or fabricated equations implying scientific validation.
- **Fun colour accents:** coral, teal and yellow bring energy to onboarding against a warm light background with readable dark text. The implemented tokens are recorded below.
- **Conversational discoveries:** brief sourced brand findings make first use personal without invented praise or progress.
- **Quiet decision cards:** five decision fields carry the recommendation; workflow status remains separate, and calculations/evidence sit inside Why.
- **Gentle purposeful motion:** onboarding marks may assemble or connect without suggesting that unfinished calculations have completed. Respect reduced-motion preferences and keep content readable without animation.

## 2. References, one per component

Website entry and business understanding: https://relaystudio.ai/
Take: website as the small first task, editable understanding of the business, brief relevant questions.
Ignore: content generation, swiping to approve consequential budget changes, TikTok publishing and subscription mechanics.

Decision review: https://www.triplewhale.com/moby-ai/actions
Take: concrete proposed budget change, inspectable explanation and explicit review controls.
Ignore: automatic execution and broad commerce/creative features.

Workspace context: https://prism-docs.pixis.ai/overview/interface-layout
Take: clear business/account identity and persistent context.
Ignore: multi-panel chat complexity and requiring users to author the intelligence rules.

Research details and evidence limits: DESIGN_RESEARCH.md.

## 3. Type and colour

Font: self-hosted DM Sans, weights 400/500/600/700. No external font request.
Sizes: responsive hero 44–76 px; page heading 32–48 px; card heading 20 px; body 14–16 px. Secondary labels 12–13 px, never use tiny text for a decision value.
Colours: ink #18283a on warm #f8f6ef; white cards; primary button #cf412c with white text; teal #087c7a for supporting accents; yellow #edb72d for decoration; errors use deep coral plus explicit text. Coral #ec563e is decorative, not small white-text controls.
Controls: visible keyboard focus, comfortable touch areas, labelled inputs, reduced-motion support. One dominant next action per screen; Why/Edit stay within Today.

## 4. Screens

Approved first-use flow: website → review what we understood → minimum relevant questions → connect Meta or upload CSV fallback → validated first decisions.

Approved return-use flow: today's decisions → Why? and approve/edit/reject → manual implementation in Meta → refresh/import → implementation status and history.

Account creation must precede access to or storage of confidential advertising data. Exact sign-in placement remains to agree. No billing or subscription screen is implied by approval of this sequence.

### Website entry — first screen, details pending

For: begin understanding the user's business from its public website.
Top to bottom: proposed short outcome statement, brief explanation, website address field and one main action. Exact content/layout to agree.
Main action: Understand my business → business-understanding step.
Empty, first visit: words/button pending.
Empty, coming back: behavior and words pending; returning users should not be forced to repeat onboarding.
Loading: begin with “I'm getting to know your brand.” Show discoveries progressively only after their source pages have been read. Conditional messages: “I'm reading about {brand}.”, “I found your {product category} range.”, and “Your site highlights {sourced product benefit}.” Use neutral discoveries rather than invented praise, customer claims or business goals. Do not invent completed steps or progress percentages. Keep provisional discoveries labelled as website-derived and ready for review.
Error: behavior and words pending for invalid/unreachable website.
Done: business facts ready to review; wording pending.
If the AI answer is wrong: the business-understanding step accepts a natural-language message to add, edit or omit facts and replaces the visible summary with the corrected version. No separate change-review screen or extra confirmation step.

### Business understanding — correction interaction approved

For: let the user see and correct the website-derived understanding before it informs recommendations.
Top to bottom: “Here's what I understood”, four-part business summary, message box, and the next-step action. Summary labels: Products, Customers, Positioning, Offers. Keep each part to one short line; avoid a long brand report. Include only supported facts, distinguish an inferred audience, and describe offers as website-advertised rather than verified current promotions. If a part is unknown, say so briefly rather than fill it with generic claims. Main action: “Connect my ad account” → read-only Meta connection. Secondary choice underneath: “Upload CSVs instead” → guided Meta export/upload fallback. Ask additional business-context questions only when missing facts materially affect a decision; no generic pre-connection questionnaire.
Correction behavior: accept a message such as an addition, edit or omission; update the visible summary directly. Keep the message box available for further correction. Do not require review of a change list, old/new comparison or an extra confirmation. Preserve the user's correction as user-provided context, distinct from website evidence.
Loading: while applying a correction, retain the existing summary and indicate work is in progress; exact words pending.
Error: keep the existing summary and the user's message available to retry; exact words pending. Never show a failed correction as applied.
Done: show the corrected summary in place; no extra journey step.
If the AI answer is wrong: user can send another correction. Ask a clarification only when an ambiguous correction could materially alter the business context used for a decision.
Other first-visit/returning empty-state wording remains to agree.

### Account data — connection and fallback direction approved

For: obtain trustworthy advertising data with low repeated user effort.
Main path: visually prioritise “Connect my ad account”. Explain that connection reduces repeated exports and supplies performance plus configuration needed for assessment. State read-only access clearly; connecting and approving recommendations do not change advertising settings.
Connection journey: sign in to Meta, grant the verified required access, select the accessible account, then fetch and validate data. Actual permissions, number of steps, account availability and provider approval are implementation dependencies. Do not claim instant connection, guaranteed completeness or a fixed setup time before testing the actual flow.
Fallback: “Upload CSVs instead”. Show how to obtain the required daily ad-set and ad-level exports plus configuration, where necessary, from Meta Ads Manager. Include required date coverage, columns/definitions, export steps and a reusable preset/mapping route. Verify exact current Meta interface instructions before writing the guide; do not pretend a default export always satisfies the contract. Flag unavailable fields and offer recovery rather than ask users to manufacture a reporting sheet.
Google: required in V1.1. Customers must be able to connect/upload one platform at a time and proceed with just Meta or just Google; neither platform should require the other. Include Google export guidance and platform-appropriate assessment in that milestone. Cross-platform budget allocation remains outside V1.1 unless explicitly approved separately. No Google functionality in V1.
Essential context: infer campaign objective/optimization goal from verified platform data; ask only when missing or ambiguous. Obtain any missing business goal, target or hard constraint before issuing an actionable recommendation for affected objects. Partial results may show safely assessed objects alongside explicit blocks; never expose an unchecked recommendation and depend on a later answer to make it safe.
States to detail next: unavailable or declined access, no accessible accounts, expired connection, fetching/validation, missing fields, stale/provisional data, unsupported budget/objective, failed upload and successful assessment.

Approved structure: Website, Business understanding, Account setup, Today, History. Full state behavior is in SCREEN_FLOW_PROPOSAL.md. Account setup combines sign-in, connection/upload, validation and essential missing questions. Why and Edit remain within Today. Exact unfinished state wording, sign-in presentation and visual direction still need agreement before UI implementation.

### Decision and implementation states — approved 4 October 2026

Keep the five decision fields unchanged. Show a separate status area on the card so the operator can distinguish the saved decision from observed implementation. Status labels are workflow information, not additional recommendation fields. Preserve the decision state when the implementation state appears; one must not replace the other.

Immediately after approval is successfully saved, show **Approved**. If saving fails, retain the prior state and show the save error; never claim approval was saved. Approval does not change the Meta budget.

After the next successful read/import with sufficiently fresh, comparable configuration evidence, show one of:

- **Done as approved** — the observed budget at the approved controlling object matches the final approved amount. Explain in Why that this is inferred from configuration; it does not prove who made the change or its exact time.
- **Done differently** — the observed budget changed from the decision-time baseline but does not match the final approved amount. Show approved versus observed amount and observation time in Why. Say that it changed differently; do not count the approval as fulfilled or attribute the edit to a person without evidence.
- **Not done yet** — a later trustworthy observation still matches the decision-time baseline while an approved change remains outstanding. This means not observed as implemented at that read; it does not prove the budget never changed and changed back.

Use **Unable to verify** when the next read fails, is stale, lacks the controlling object or baseline, or contains conflicting/unsupported budget evidence. Do not turn missing evidence into Not done yet. Before that read, retain Approved with implementation awaiting verification. Observation time belongs in Why so a prior status is not mistaken for live account state.

An edit followed by approval is assessed against the user's final approved amount, not the original recommendation. Preserve the original recommendation and decided amount in history. Subsequent implementation reads add observations rather than overwrite past decisions.

Budget changes may be made by another operator or for unrelated reasons. Matching configuration is an inference, not proof the approval caused it. A changed mismatching value is Done differently, never completion as approved.

Meta moving spend between ad sets inside a shared campaign budget is not evidence of an editable ad-set budget change. V1 shows the unsupported-budget-control limitation; it must not infer implementation from spend movements. V1.1 compares the approved budget at the actual campaign controlling object and distinguishes budget configuration from internal spend allocation.

These are accepted status labels and behavior. The implementation record below completes loading/error behavior and records the tested layout.

## 5. The first screen's words

Headline: Ad budget decisions that understand your business.
Under it: Start with your website. Get recommendations shaped by your business and its goals.
Button: Understand my business.

## 6. Principles

- Website-derived business facts are editable and carry sources; inference is distinguishable from confirmed context.
- Public website facts do not establish private performance targets, budget limits or stock availability.
- Ask only for missing context that can materially change a recommendation.
- Keep five visible decision fields; supporting and contradicting evidence belongs behind Why?.
- Approval saves the operator's decision; it never means Meta has implemented it.
- Keep incomplete, stale, unsupported and uncertain states explicit.
- Returning users should reach daily decisions without repeating first-use setup.
- Choose exact state wording with the builder. After building, provide phone instructions for viewing each state.
- Website-reading messages may be friendly and product-specific, but must describe sourced discoveries rather than endorse products or invent facts.

## Approved visual treatment — 4 October 2026

Website, Business understanding and Account setup may use restrained mathematical marks around the edges, leaving inputs, summary and main actions uncluttered. Any visible equation must be a correct, relevant relationship, not decorative pseudo-science or a claimed predictive model. Do not incorporate real account numbers or confidential business context into decorative assets.

Loading motion shows a general gathering of signals; messages report only actual sourced discoveries or completed stages. Do not label decorative movement as real computation, fabricate progress percentages or promise statistically superior outcomes.

Today and History reduce decoration so actions, magnitudes and workflow states are easy to scan. Real deterministic calculations belong in Why with their definitions, windows and uncertainty. The scientific theme does not change confidence policy, approve an advanced model or imply validated causal findings.

This original direction is now implemented using the tokens and state record above/below. Preview mockups remain distinct from the tested application; all public images use labelled synthetic data.

## Visual concept preview

A preview-only board is saved at design/previews/playful-science-onboarding-and-decisions-v1.png. It uses synthetic content and illustrates the approved playful-science direction and separate decision/implementation statuses. It is not a tested app or approval of exact tokens, unfinished copy, mock account rules or responsive layout. Review limitations are in design/previews/README.md.

## Implementation record — 5 October 2026

This section overrides earlier pending labels and speculative behavior. No billing screen. Email/password account creation precedes confidential import. Returning signed-in users with an import go directly to Today.

Flow: website → correct business summary → private sign-in and account evidence → Today → record decision → manually change Meta → later import and History.

### Website
For: begin with a public business website, or try a clearly synthetic example.
Top to bottom: product identity and sign-in; approved outcome headline; website field; primary button; secondary demo; scope footer.
Main action: Understand my business → Business understanding.
Empty, first visit: approved headline and website field; button Understand my business.
Empty, coming back: signed-out landing stays available; signed-in users resume their saved workspace.
Loading: “I’m reading your website.” Only an actual server read triggers it.
Error: visible safe request error; retry the address or “Enter my brand details instead”. No failed result shown as read.
Done: sourced metadata ready in the four-field summary.
If the answer is wrong: edit it on Business understanding.
Current limitation: bounded public website metadata and declared product names, not full AI browsing. Unknown facts remain unknown; no invented product praise.

### Business understanding
For: correct the context that will shape decisions.
Top to bottom: back/flow cue; short introduction and source label; Products, Customers, Positioning, Offers; correction box; main action.
Main action: Connect my ad account → Account setup. Upload CSVs instead selects the fallback in that same screen.
Empty, first visit: unknown fields say “Not confirmed yet”. Manual entry shows “Your brand”.
Empty, coming back: retain the current context; saved account context returns after sign-in.
Loading: corrections are local and immediate; do not pretend an AI is thinking.
Error: field input remains editable; request errors elsewhere preserve the current summary.
Done: corrected version appears in place; “Your business summary is updated.”
If the answer is wrong: Edit details changes each field. A message prefixed “Products:” (or the other field labels) replaces that field; free text is saved under Your context. Unrestricted semantic interpretation is not yet connected, so the helper tells the truth about this limitation.

### Account setup
For: create a private workspace, acquire consistent account evidence, and confirm essential goals/constraints.
Top to bottom: sign-in when needed; preferred read-only Meta tab or CSV fallback; upload and mapping/field guide; currency/timezone/observation details; distinct minimum and overall target; optimization preference and constraint; policy notice.
Main action: Create private workspace / Sign in, then Continue with CSVs or Validate and review decisions → Today. These are successive steps within one screen, not competing primary actions.
Empty, first visit: email/password form, then data requirements.
Empty, coming back: saved context persists; choose a new evidence package without recreating the account.
Loading: actual sign-in or upload progress text, with submit disabled.
Error: specific structural error without uploaded rows; selected valid files and context remain available to correct/retry. Sign-in failure keeps the email but never displays credentials.
Done: “Import saved. Evidence is ready; unvalidated policy is clearly marked.”
If the answer is wrong: correct source/settings/context and re-import; never silently manufacture missing values.
Connection state: “Live Meta access hasn’t been configured yet.” It is unavailable, not a fake successful connection. No token input. CSV requirements are a field guide, explicitly not a verified click-by-click Meta walkthrough.

### Today
For: review which ad sets need attention and save an inspectable decision.
Top to bottom: title and refresh; source/identity/review progress; policy notice; filters/search; cards; synthetic-only simulation controls.
Main action: review the next card and save its decision. Approve/Edit/Reject are card-local choices. Real unvalidated output has no invented approval amount.
Empty, first visit: “Your first decisions start with evidence.” / Bring my data.
Empty, coming back: “You’ve reviewed every card.” when the To review filter is empty; saved decisions and verification status remain available in All.
Loading: “Loading your workspace…” and actual mutation progress.
Error: visible safe error, preserve the card’s previous decision; do not claim it saved.
Done: Approved, Edited & approved, Rejected or No change recorded only after successful persistence. Implementation appears alongside the decision, never instead of it.
If the answer is wrong: Why exposes supporting/contradicting evidence, missing information and policy; Edit records the operator’s amount and reason while preserving the original; Reject preserves the original. Safety blocks cannot be overridden through the interface or server.
Five recommendation fields only: Action, Magnitude, One-line reason, RCA bucket, Confidence. Ad-set identity and separate workflow state are not analytical dashboard fields.

### History
For: retain recommendation, final decision and later observed configuration separately.
Top to bottom: title, Back to Today, dated decision rows; expand for original vs decided, reason, observations and policy.
Main action: Back to Today → daily review.
Empty, first visit: “No decisions saved yet.” / Review today’s decisions.
Empty, coming back: retain saved history; no fabricated activity.
Loading: authenticated data loads from Convex; do not label an unreturned query as confirmed empty.
Error: keep prior saved data; show request failure and retry by returning/reloading.
Done: saved choice is present after reload; later reads append observations.
If the answer is wrong: original evidence stays inspectable; correct the source/context and create a new assessment. Historical records are not rewritten.

Implementation states remain as specified above. Synthetic simulation allows Matches, Changed differently and Unchanged; it never reads or writes a real ad account. Calculation rules, fatigue claims and confidence calibration are not validated by the visual design.

## Verification and phone walkthrough

See PHONE_CHECK.md for the live flow and state checks. Screenshots in design/screens/ contain invented data only. Physical phone/mobile-data verification remains for the builder tomorrow.
