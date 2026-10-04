# IDEA_LOCK.md

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


## GrowthX Build Sprint — Friday 2 October 2026

This is the concise idea lock to send to **Shaktimaan**. User-authored lines preserve the builder's wording with only obvious dictation cleanup. Where the user explicitly delegated research/drafting, that is labeled.

# IDEA LOCK · Build Sprint

**The idea, in one line:**  
“Growth Action is an AI-native performance marketing manager.”

**Why me (at least 1 of 3: an audience that trusts me, years inside the workflow, data nobody else has):**  
“None, but I’m willing to risk it.”

> **Rule check:** This does not pass the Why Me test. I am proceeding knowingly rather than inventing an advantage.

## GOAL

**The one goal they hire it for (money, time, status or life):**  
**Money.** “I hire Growth Action because I want to get better ROI on my ad spend.”

**Delta 4 (the steps today → the steps with my product):**

**Today:**
1. They analyse creative-wise spend in a Google spreadsheet.
2. They look at how much is being spent and how performance and spend are trending over time.
3. Based on that, they decide whether they need to change budgets, come up with a new creative, or change something else.
4. They also keep track of what competitors are doing and take ideas from that.
5. A lot of the analysis and decision-making is manual, so reaction time is slower and decisions are often based on trendlines rather than deeper statistical analysis.

**With Growth Action:**
1. Open Growth Action.
2. See the recommendations and why those recommendations are being made.
3. Approve the recommendations — yes or no.
4. Eventually, execution becomes automatic.

**Why ChatGPT alone is not enough:**  
“Growth Action has to be a tool and an agent. ChatGPT alone cannot do it because the system needs historical context — what decisions were made yesterday, what impact those decisions had, and what the system learned from them. That learning should improve decision-making and improve the next recommendation. It needs an ongoing learning process so it becomes smarter over time.”

> **Kill-rule condition:** If persistent decision memory + outcome feedback does not materially improve the next recommendation, this collapses into a thin ChatGPT workflow and should be killed.

**The sin it rides (optional):**  
“Greed — getting more return from the same ad spend.”

## USER

**The trigger (when the pain hits):**  
“A Head of Performance Marketing opens Growth Action every day to get a quick understanding of what’s going on and whether everything is on track.”

**Today's path, step by step (including not solving it at all):**  
Creative-wise spend and performance are analysed in Google spreadsheets; spend/performance trends are reviewed; the team decides whether budgets, creatives, or something else should change; competitor activity is also watched for ideas; analysis and decisions are substantially manual.

**Who they trust on this decision:**  
“Other experts, agencies, Google/Meta account teams, and performance-marketing communities.”

**Would they pay? (what exists today that people pay for):**  
“Yes, they will pay. We are also looking for a paid tool, but we are not getting something which really does what we need. If the tool is good enough, there is definitely a real willingness to pay.”

**Checked evidence:** Triple Whale Moby and Madgicx AI Marketer are paid products in adjacent/current workflows. That proves companies pay for this class of outcome, not that they will pay for Growth Action.

## PRODUCT

**Onboarding (how a first-time user feels the value fastest):**  
“Start with some sort of plug-in that connects to their current social-media/performance layer. It should immediately show the drawbacks in the current way of working — how late they are reacting, how much they are losing, etc. That becomes the proof that the product is useful.”

> Any claim about “how much they are losing” must be calculated defensibly. Do not fake precision.

**The core loop (user stories):**
1. As a Head of Performance Marketing, I want to open Growth Action every day and quickly understand what is going on and whether everything is on track, so I know where I need to intervene.
2. As a Head of Performance Marketing, I want Growth Action to tell me when a budget needs to shift and why, so I can make the decision faster without manually analysing spreadsheets and trendlines.
3. As a Head of Performance Marketing, I want early warning when a creative is starting to weaken, so I can prepare or change the creative before performance drops significantly.
4. As a Head of Performance Marketing, I want to understand what direction of creative is working better across many creatives, so I know what kind of creative to make next.
5. As a Head of Performance Marketing, I want the system to remember what decisions were made earlier and what happened after those decisions, so the next recommendation becomes smarter rather than starting from scratch every day.

> These five stories were drafted by the assistant from my prior statements after I explicitly asked it to do so.

**Coming back (optional):**  
“They come back every day because paid-media performance keeps changing, and Growth Action becomes more useful as it remembers previous decisions and their impact.”

**The AI-first part (onboarding, engagement or the core loop):**  
“The AI uses current performance data together with historical context — what decisions were made before, what impact those decisions had, and what was learned from them — to improve the next recommendation over time.”

## MARKET

**Tailwinds (where funding is going, what Google Trends shows, timing):**
- Concord raised **$3M seed on 23 Jun 2026** for agentic media buying that executes and optimizes across platforms.
- Runable raised **$21M on 26 Aug 2026** around an agent that helps businesses run/grow, including advertising and closing the loop on underperformance.
- Triple Whale made **Moby Actions for Media Buying generally available in July 2026**.
- **Timing:** AI media-buying products are moving from reporting/recommendation toward action/execution. This validates the timing but raises the differentiation bar.
- **Google Trends:** **NOT VERIFIED. No Trends claim is being made.**

Sources:
- https://www.prnewswire.com/news-releases/concord-raises-3m-to-build-agentic-execution-for-media-buying-302805900.html
- https://runable.com/blogs/runable-grow
- https://www.triplewhale.com/product-updates

**Competitors (and the flows I liked, with screenshots and why):**

**Assistant-researched because I delegated this section:**
- **Triple Whale / Moby Actions:** closest direct competitor. Learn from its action card (recommendation + reasoning + approve/reject/discuss), approval-vs-automation controls, and action history.
- **Madgicx / AI Marketer:** learn from its daily recommendation queue and “what should I do next?” orientation.
- **Manual workflow:** Google/Meta + spreadsheets + operator judgement + agencies/account teams/communities remains the incumbent behavior to beat.

> Screenshot teardown is **not yet personally done**. If useful before UI implementation, capture component-level screenshots; do not ask Codex to “make it like” an entire competitor.

**Competitive hypothesis:** “AI recommendations for media buying” is already commoditizing. Growth Action has to prove that persistent decision memory + learning from the outcomes of prior interventions makes the next recommendation materially better and more account-specific.

**Size and fit (how many people in my extended network fit):**  
“Close circle: 4–5 people at different companies who should be willing to hear me out and evaluate it seriously. Extended network: realistically 100–200 such people, depending on how good the product is.”

> **Rule check:** this is below the kickoff comfort zone of 10 close-circle and 200–300 extended-network people. Distribution is a weakness, not a kill rule.

---

## Kill rules — final status

1. **ChatGPT can do it?** Conditional pass only if the memory/outcome-learning loop changes future recommendations. Otherwise: **kill it**.
2. **AI at the core?** Pass. Remove AI reasoning and the locked decision job no longer works as intended.
3. **Licence/regulation outside my control?** Pass for v1. No regulated licence is intrinsic. Live ad-platform integrations are not allowed to become a blocker.
4. **Whole game is data I cannot collect in two weeks?** Provisional pass. I have real performance data and operators; tomorrow's operator test must confirm the available data is sufficient.

---

**Shaktimaan, this is what I have thought about user, product and market. Lock it in.**
