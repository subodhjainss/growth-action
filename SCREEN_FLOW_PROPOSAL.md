# Approved screen flow — 4 October 2026

Screen structure approved by the builder; exact unfinished words and visual direction remain pending. Planning only. Based on PRODUCT.md, DESIGN.md and V1_PRD.md; no UI code. Preserves approved onboarding, typed corrections, read-only connection, five decision fields and distinct approval/implementation status. Exact new state wording and visual direction await the builder; placeholders below are behavior descriptions, not final customer copy.

Flow: website → editable business understanding → sign in and connect/upload → essential missing context and validation → today's decisions → operator decision saved → manual Meta change → next read verifies implementation.

Returning flow: today's decisions → inspect/review → refresh/import → implementation and history. No repeated onboarding.

## 1. Website

For: begin understanding the brand from public evidence.
Top to bottom: approved headline/subline; website field; main button; truthful sourced discoveries while reading.
Main action: Understand my business → Business understanding.
Empty, first visit: website entry; wording pending beyond approved headline/button.
Empty, coming back: resume unfinished setup; established customers go to Today. Wording pending.
Loading: approved brand-reading messages; no invented progress.
Error: invalid address/unreachable site; retain address and offer retry. Wording pending.
Done: supported summary ready; move to Business understanding. Wording pending.
If the AI answer is wrong: correction is on the next screen, not a new error journey.

## 2. Business understanding

For: check and correct the facts that will shape recommendations.
Top to bottom: approved four-line Products/Customers/Positioning/Offers summary; typed correction; main connection action; CSV alternative.
Main action: Connect my ad account → Account setup; Upload CSVs instead selects its fallback route.
Empty, first visit: partial/unknown summary stays visibly incomplete; allow typed facts without pretending research succeeded. Wording pending.
Empty, coming back: restore saved draft; existing customers edit context from Today rather than rerun setup. Wording pending.
Loading: retain summary while reading/applying correction. Wording pending.
Error: keep prior summary and correction message; retry. Wording pending.
Done: corrected summary replaces prior version in place; no extra confirmation page.
If the AI answer is wrong: send another correction; preserve source and user facts separately.

## 3. Account setup

For: authenticate, obtain read-only account data and resolve essential context before affected recommendations.
Top to bottom: brief sign-in step before confidential access/storage; connection or guided export upload; account selection if needed; fetch/validation results; one material context question at a time only if missing.
Main action: one per current step—sign in, connect, select account, upload or answer the context question. Sign-in method and new button wording pending. Successful validation goes directly to Today; avoid a redundant success page.
Empty, first visit: connect path prioritized, guided CSV fallback available. Wording pending.
Empty, coming back: retain saved account/mapping; resume incomplete setup or repair expired access. Wording pending.
Loading: fetch/validate with actual stage feedback. Wording pending.
Error: access declined/expired, no accounts, invalid upload, missing fields or stale data; show the affected issue and a specific recovery route without dumping rows. Wording pending.
Done: account/context saved and usable results ready; proceed to Today.
If the AI answer is wrong: correct context before affected recommendations; column mappings inspectable and editable when ambiguous. Deterministic validation does not rely on AI prose.

## 4. Today

For: identify what needs action, inspect why, decide and later verify implementation.
Top to bottom: business/account identity and data freshness; concise review queue; five-field cards; separate decision and implementation status; Why details and review controls when a card is opened. No analytics dashboard.
Main action: review the next undecided card; within that review, Approve is primary, Edit/Reject are alternatives. No bulk approval or automatic execution. Exact queue button wording pending. Refresh/import is a secondary data action.
Empty, first visit: if data/context not ready, show the exact setup recovery; no fabricated recommendations. Wording pending.
Empty, coming back: distinguish no changes warranted, all decisions reviewed and no eligible objects. Show assessed HOLD where appropriate; missing evidence is not no-action success. Wording pending.
Loading: preserve last results with their observation time while refreshing; do not imply old cards are current. Wording pending.
Error: failed refresh retains dated results; failed save does not display Approved. Wording pending.
Done: saved decision displays Approved; manual implementation still happens in Meta. Next reliable read adds Done as approved / Done differently / Not done yet, or Unable to verify.
If the AI answer is wrong: Edit changes the decided amount/action while preserving original recommendation; Reject saves disagreement; context correction triggers a new assessment version rather than rewriting old history. Approved details are not replaced by revised AI prose.

Why and Edit are expandable details/panels on this screen, not separate destinations. On phone, details may fill the viewport with a clear return to the same card. Final layout pending.

## 5. History

For: inspect previous recommendations, decisions, implementation observations and later performance separately.
Top to bottom: account identity; dated decision list; selected record with original recommendation, final decision, observation times and Why evidence. No causal uplift claim.
Main action: open a decision record; button wording pending. Return to Today is navigation.
Empty, first visit: no saved decisions yet; return to review. Wording pending.
Empty, coming back: preserve records; distinguish no matching records from no history. Wording pending.
Loading: loading saved records; wording pending.
Error: retry loading without inventing or losing history; wording pending.
Done: selected saved record displayed; no extra success page.
If the AI answer is wrong: original evidence remains inspectable; correction belongs to a new assessment or explicit user context update, never retrospective rewriting.

## Flow audit

Every product step has a home, including sign-in, missing context, manual external implementation and next-read verification. Proposed merges: sign-in/connection/upload/validation as stages of Account setup; Why/Edit within Today; context correction in existing setup/review. Website and summary remain separate moments to preserve the approved discovery experience. History remains a separate recurring destination so Today stays focused.

No new billing, alert, planning, Google, creative workflow or automatic-execution screen in V1. Business context and connection repair are reached from existing screens rather than a broad settings dashboard.

All five screens specify empty-first/empty-returning/loading/error/done and correction behavior. Exact unapproved words, sign-in presentation, fonts/colors and visual composition remain unresolved. Do not implement them by guessing. After building, provide phone-accessible instructions for checking every state using synthetic fixtures; no real data in public screenshots or state previews.
