# OPERATOR_TEST.md

## Accepted update — 4 October 2026

- **Objective boundary — accepted 4 October 2026:** V1 budget recommendations cover sales/purchase objectives only. Identify traffic objectives and show an explicit unsupported-objective state; never assess them against sales ROAS targets. Unknown or incompatible objectives block budget recommendations. **Traffic-objective decisioning is required in V1.1, not V2**, before claiming support for pilots that require it. Validate objective-appropriate metrics, targets, magnitude rules, safety checks and implementation inference with the operator; do not assume CTR alone is sufficient.

This update overrides conflicting ingestion and budget-scope statements below.

- **V1 main ingestion path:** read-only Meta Marketing API connection to the DaMENSCH ad account. CSV/export upload remains the fallback only. Both routes must satisfy the same mandatory data contract; do not weaken intelligence to accommodate access delays.
- **Product edge to prove:** read current account data, remember prior decisions, and check observed configuration against the operator’s final decision. Approval is not implementation; observations are descriptive, not causal proof.
- **V1 budget scope:** recommend budget changes only for ad sets with independently controlled budgets. Read and identify shared campaign-budget objects, but show an explicit unsupported-budget-control state rather than treating campaign budget or ad-set spend as an editable ad-set budget.
- **Required V1.1:** shared campaign-budget decisioning, including affected ad sets, the correct editable budget object, supporting campaign/ad-set evidence, and implementation inference at that object. This is required before external pilots whose accounts depend on campaign budgets; do not describe those accounts as supported until verified.
- **Access dependency:** confirm the Meta app/business relationship, authorized account access, read permissions, and applicable API access tier. Own-account Standard permission access and external-client Advanced permission access are different. A successful read is required before claiming access works. No verified current approval turnaround is available from this research; record the app dashboard’s actual requirements/estimate when available.
- Gate 0 now checks the read-only connection and its returned data against the contract, with exports as fallback. Gate 1 still precedes final thresholds, magnitude rules, RCA triggers and confidence cutoffs.


## Growth Action — 3–5 Ad-set Intelligence Gate

**Run before locking V1 rule thresholds and before building the final decision engine.**

Date: ______  
Operator: ______  
Account/data window: ______  
Data package used: ______

---

# 1. Test rules

Preparation: use `CANDIDATE_DECISION_POLICY.md` as the UNVALIDATED reasoning specification. Freeze the candidate version and shared data/context before comparison. Keep completed real-data answer sheets outside the repository. Corrections after the reveal are post-test changes, not improvements to the original blind-test score.

The private optimization draft is directional guidance, not rules the team follows as written. Do not score agreement with that draft as operator validation. Observe the operator's actual judgment and identify which evidence changes the action or magnitude.

1. Pick 3–5 current ad sets where a real decision exists.
2. Do not select only obvious winners/losers.
3. Operator and Growth Action logic answer independently.
4. Do not show either answer to the other until both are recorded.
5. Use the same data/context for both where possible.
6. Record missing data; do not fill gaps from memory after the fact unless marked.

---

# 2. Operator answer template

For each ad set:

- **Ad set:**  
- **Action:** scale / reduce / hold / investigate  
- **Magnitude:**  
- **Why:**  
- **What not to change:**  
- **Confidence:** high / medium / low  
- **Missing context:**  
- **RCA hypothesis:**  
- **What evidence would change your decision:**  

---

# 3. Growth Action answer template

Five-field card:

- **Action:**  
- **Magnitude:**  
- **One-line reason:**  
- **RCA bucket:** spend/scaling / likely creative deterioration / business context required / unclear  
- **Confidence:** high / medium / low  

Why? evidence:

- supporting signals:
- contradicting signals:
- recent intervention:
- business constraint/context:
- missing fields/context:
- policy/threshold used:
- what would change the recommendation:

---

# 4. Comparison

For each ad set:

| Question | Result |
|---|---|
| Same action? | |
| Same magnitude? | |
| Did Growth Action surface something operator missed? | |
| Did operator surface something Growth Action missed? | |
| Did Growth Action correctly recommend restraint? | |
| Did RCA bucket hold up? | |
| Unsupported claim? | |
| Dangerous recommendation? | |
| Did operator change action/magnitude after seeing reasoning? | |
| Missing data needed for better decision? | |

---

# 5. Gap classification

Every meaningful miss must be tagged:

- [ ] missing field
- [ ] missing business context
- [ ] wrong rule
- [ ] wrong threshold
- [ ] wrong magnitude
- [ ] wrong RCA classification
- [ ] missing safety gate
- [ ] user policy not encoded
- [ ] operator heuristic itself should be challenged later
- [ ] data quality problem
- [ ] other: ______

---

# 6. Pass criteria

PASS:
- at least one genuinely useful incremental insight,
- zero dangerous recommendations,
- unsupported claims absent or clearly marked uncertain,
- operator understands the five-field card without founder interpretation.

STRONG PASS:
- operator changes a planned action or magnitude because Growth Action reasoning is better.

FAIL:
- output mostly restates existing report,
- operator has to provide all intelligence,
- dangerous confidence appears,
- action/noise cannot be separated,
- recommendations require substantial founder explanation.

---

# 7. Result

Overall: PASS / STRONG PASS / FAIL

What Growth Action did better:
1.
2.
3.

What the operator did better:
1.
2.
3.

Fields we must add:
1.
2.
3.

Rules/thresholds we can now encode:
1.
2.
3.

Rules we must NOT encode yet:
1.
2.
3.

Next single action:
______
