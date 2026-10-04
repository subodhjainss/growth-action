# Growth Action

A Meta-first budget decision workspace for D2C/fashion. This is a working candidate build, with final intelligence validation still pending.

Live: https://rapid-gull-487.convex.site  
Public source: https://github.com/subodhjainss/growth-action

Start with **Explore the demo** to try invented examples without signing in. Website entry, editable business context, private sign-in, CSV ingestion, evidence cards and persistent decision history are implemented. The demo shows approval separately from matching, mismatching and unchanged later budget observations.

Live Meta access and LLM calls are not configured. Website reading extracts public metadata; it is not a trained business model. Real CSV imports get deterministic evidence and honest safety states. They cannot inherit the demo’s example budget rules. Gate 1 must pass before real action/magnitude recommendations are enabled.

## Run and check

```sh
npm install
npm run dev
npm test
npm run test:e2e
npm run deploy
```

Use an authorized Convex project and its public `VITE_CONVEX_URL` in ignored `.env.local`. Configure auth secrets through Convex environment variables, separately in development and production; never paste secrets in chat or source. Deployment builds with the production Convex URL and hosts on Convex static hosting. Git push does not deploy. Deployment can prompt for confirmation in a terminal. For an already deployed backend, `npm run deploy -- --skip-convex` uploads the frontend.

Browser tests currently use installed macOS Google Chrome; adjust the executable path in playwright.config.ts for another machine. `TEST_BASE_URL=https://rapid-gull-487.convex.site npm run test:e2e` tests the published app and creates entirely fictional test workspaces.

Read [DESIGN.md](DESIGN.md), [AGENTS.md](AGENTS.md), [BUILD_REPORT.md](BUILD_REPORT.md) and [PHONE_CHECK.md](PHONE_CHECK.md). The original eight-file build authority and later accepted scope amendments remain authoritative.

## Data and safety

Real data stays outside Git history in ignored Data/ or data/. Original confidential PDF/DOCX files, the private historical CODEX_CONTEXT.md, environment files, logs and browser failure artifacts are ignored. Public fixtures/screenshots contain invented data only. Imported account data is owner-scoped in Convex. No Meta write integration exists.

Do not call this validated, statistically superior, or external-pilot ready. Shared campaign budgets, traffic objectives, Google, controlled improvement and overall Meta planning remain required V1.1 work; other business types and cross-platform allocation remain V2.
