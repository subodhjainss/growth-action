# DATA_SECURITY.md

## Accepted update — 4 October 2026

- **Objective boundary — accepted 4 October 2026:** V1 budget recommendations cover sales/purchase objectives only. Identify traffic objectives and show an explicit unsupported-objective state; never assess them against sales ROAS targets. Unknown or incompatible objectives block budget recommendations. **Traffic-objective decisioning is required in V1.1, not V2**, before claiming support for pilots that require it. Validate objective-appropriate metrics, targets, magnitude rules, safety checks and implementation inference with the operator; do not assume CTR alone is sufficient.

This update overrides conflicting ingestion and budget-scope statements below.

- **V1 main ingestion path:** read-only Meta Marketing API connection to the DaMENSCH ad account. CSV/export upload remains the fallback only. Both routes must satisfy the same mandatory data contract; do not weaken intelligence to accommodate access delays.
- **Product edge to prove:** read current account data, remember prior decisions, and check observed configuration against the operator’s final decision. Approval is not implementation; observations are descriptive, not causal proof.
- **V1 budget scope:** recommend budget changes only for ad sets with independently controlled budgets. Read and identify shared campaign-budget objects, but show an explicit unsupported-budget-control state rather than treating campaign budget or ad-set spend as an editable ad-set budget.
- **Required V1.1:** shared campaign-budget decisioning, including affected ad sets, the correct editable budget object, supporting campaign/ad-set evidence, and implementation inference at that object. This is required before external pilots whose accounts depend on campaign budgets; do not describe those accounts as supported until verified.
- **Access dependency:** confirm the Meta app/business relationship, authorized account access, read permissions, and applicable API access tier. Own-account Standard permission access and external-client Advanced permission access are different. A successful read is required before claiming access works. No verified current approval turnaround is available from this research; record the app dashboard’s actual requirements/estimate when available.
- Gate 0 now checks the read-only connection and its returned data against the contract, with exports as fallback. Gate 1 still precedes final thresholds, magnitude rules, RCA triggers and confidence cutoffs.


## Growth Action V1 — Public Repo / Private Data Rules

The Build Sprint submission requires a public GitHub repository. DaMENSCH advertising data is confidential.

These rules are mandatory.

---

# 1. Never commit

Never put in the repository, even temporarily:

- raw DaMENSCH CSV exports,
- actual ad account IDs if sensitive,
- actual spend/ROAS/business metrics,
- business context containing confidential values,
- Meta access tokens,
- API secrets,
- cookies/session data,
- uploaded raw files,
- screenshots containing confidential account data,
- copied production database rows,
- debug logs containing upload contents.

Deleting a file later is not sufficient because Git history may retain it.

---

# 2. Allowed in repo

- source code,
- schemas,
- field-mapping definitions,
- empty CSV templates,
- synthetic/demo datasets with invented names/values,
- tests using synthetic fixtures,
- documentation.

Synthetic data must not be lightly anonymized real data. Invent it.

---

# 3. Runtime data requirements

- real uploads must be associated with the authenticated account/user,
- raw file contents must not be written to public logs,
- validation errors should mention field names/row numbers without printing full sensitive rows,
- normalized records must remain scoped to the owning account,
- secrets must use environment/secret management, never source files.

---

# 4. Local developer handling

If Codex/local development needs a real export:
- keep it outside the repository directory where possible,
- otherwise ensure the exact data path/pattern is ignored before the file is copied in,
- never use real data as a test fixture,
- never include it in generated screenshots for public submission.

---

# 5. Before public push

Run a manual repository check for:
- `.csv`, `.xlsx`, `.json` data files,
- tokens/secrets,
- actual account identifiers,
- actual brand metrics,
- screenshots,
- logs.

If any real data was accidentally committed, do not rely on a normal delete; clean repository history or start a clean public repository.

---

# 6. Demo/submission

Public demo screenshots should use:
- synthetic data, or
- carefully reviewed outputs that reveal no confidential company/ad data.

The product can be validated privately on DaMENSCH data while the public repo/demo fixtures remain synthetic.
