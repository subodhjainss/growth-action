import { test, expect } from "@playwright/test";
import { demoData } from "../../domain/demo";
import { randomBytes } from "node:crypto";
const screenshotDir = "design/screens";
test("operator reviews a synthetic decision and verifies a mismatching implementation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: /Ad budget decisions/ }),
  ).toBeVisible();
  await page.screenshot({
    path: `${screenshotDir}/website-desktop.png`,
    fullPage: true,
  });
  await page.getByRole("button", { name: "Explore the demo" }).click();
  const card = page
    .locator("article.decision-card")
    .filter({ has: page.getByRole("heading", { name: "Everyday tees" }) });
  await expect(card.getByText("SCALE UP", { exact: true })).toBeVisible();
  await card.getByRole("button", { name: "Why?" }).click();
  await expect(
    card.getByRole("heading", { name: "The evidence behind this decision" }),
  ).toBeVisible();
  await card.getByRole("button", { name: "Approve", exact: true }).click();
  await expect(card.getByText("Approved", { exact: true })).toBeVisible();
  await expect(card.getByText("Awaiting next read")).toBeVisible();
  await page.getByText("Test tomorrow’s implementation states").click();
  await page
    .getByRole("button", { name: "Budget changed differently" })
    .click();
  await expect(
    card.getByText("Done differently", { exact: true }),
  ).toBeVisible();
  await page.screenshot({
    path: `${screenshotDir}/decisions-desktop.png`,
    fullPage: true,
  });
  await page.getByRole("button", { name: "History", exact: true }).click();
  await page.getByRole("button", { name: /Everyday tees/ }).click();
  await expect(
    page.getByText("Done differently", { exact: true }),
  ).toBeVisible();
  await page.reload();
  await page.getByRole("button", { name: "Explore the demo" }).click();
  await expect(
    page
      .locator("article.decision-card")
      .first()
      .getByText("Approved", { exact: true }),
  ).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator("h1")).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await expect(page.locator(".toast")).toHaveCount(0, { timeout: 10000 });
  await page.screenshot({
    path: `${screenshotDir}/decisions-phone.png`,
    fullPage: true,
  });
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .getByRole("button", { name: "History", exact: true })
    .last()
    .click();
  await page.screenshot({
    path: `${screenshotDir}/history-phone.png`,
    fullPage: true,
  });
});
test("first-time brand reading and correction stay usable on a phone", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.screenshot({
    path: `${screenshotDir}/website-phone.png`,
    fullPage: true,
  });
  await page.getByLabel("Your business website").fill("https://example.com");
  await page.getByRole("button", { name: "Understand my business" }).click();
  await expect(page.getByRole("heading", { name: /Here’s what/ })).toBeVisible({
    timeout: 20000,
  });
  await page
    .getByLabel("Anything to add or correct?")
    .fill("Products: comfortable cotton tees");
  await page.getByRole("button", { name: "Save correction" }).click();
  await expect(
    page.getByText("comfortable cotton tees", { exact: true }),
  ).toBeVisible();
  await page.screenshot({
    path: `${screenshotDir}/brand-phone.png`,
    fullPage: true,
  });
  await page
    .getByRole("button", { name: "Connect my ad account", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Create your account" }),
  ).toBeVisible();
  await page.screenshot({
    path: `${screenshotDir}/signup-phone.png`,
    fullPage: true,
  });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
});
test("private signup import decision and reload preserve evidence without enabling unvalidated approval", async ({
  page,
  browser,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.getByRole("button", { name: "Sign in", exact: true }).click();
  await page
    .getByRole("button", { name: "New here? Create an account" })
    .click();
  const email = `growth-test-${Date.now()}@example.invalid`;
  await page.getByLabel("Email", { exact: true }).fill(email);
  await page
    .getByLabel("Password", { exact: true })
    .fill(randomBytes(16).toString("hex"));
  await page.getByRole("button", { name: "Create private workspace" }).click();
  await expect(
    page.getByRole("heading", { name: "Let’s look at your ads." }),
  ).toBeVisible({ timeout: 20000 });
  await expect(
    page.getByText("Live Meta access hasn’t been configured yet.", {
      exact: false,
    }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Continue with CSVs" }).click();
  const data = demoData();
  const csv = (headers: string[], values: unknown[][]) =>
    Buffer.from(
      [
        headers.join(","),
        ...values.map((v) => v.map((x) => JSON.stringify(x ?? "")).join(",")),
      ].join("\n"),
    );
  const daily = [
    "date",
    "account_id",
    "campaign_id",
    "campaign_name",
    "adset_id",
    "adset_name",
    "spend",
    "impressions",
    "link_clicks",
    "purchases",
    "purchase_conversion_value",
  ];
  const row = (x: any) => [
    x.date,
    x.accountId,
    x.campaignId,
    x.campaignName,
    x.adsetId,
    x.adsetName,
    x.spend,
    x.impressions,
    x.clicks,
    x.purchases,
    x.value,
  ];
  const csvFiles = [
    {
      name: "synthetic_adsets.csv",
      mimeType: "text/csv",
      buffer: csv(daily, data.adsets.map(row)),
    },
    {
      name: "synthetic_ads.csv",
      mimeType: "text/csv",
      buffer: csv(
        [...daily, "ad_id", "ad_name"],
        data.ads.map((x) => [...row(x), x.adId, x.adName]),
      ),
    },
    {
      name: "synthetic_settings.csv",
      mimeType: "text/csv",
      buffer: csv(
        [
          "adset_id",
          "campaign_id",
          "adset_name",
          "campaign_name",
          "daily_budget",
          "budget_owner",
          "budget_type",
          "effective_status",
          "objective",
          "snapshot_at",
        ],
        data.snapshots.map((x) => [
          x.adsetId,
          x.campaignId,
          x.adsetName,
          x.campaignName,
          x.budget,
          x.budgetOwner,
          x.budgetType,
          x.status,
          x.objective,
          x.observedAt,
        ]),
      ),
    },
  ];
  await page.locator("input[type=file]").setInputFiles(csvFiles);
  await expect(
    page.getByText("synthetic_settings.csv", { exact: false }).first(),
  ).toBeVisible();
  await page
    .getByLabel("Account timezone", { exact: true })
    .selectOption("UTC");
  await page.getByLabel("Minimum acceptable ROAS").fill("2.4");
  await page.getByLabel("Desired overall ROAS").fill("3.2");
  await page.getByLabel("Any known constraint").selectOption("none");
  await page.getByLabel(/I verified that attribution/).check();
  await page
    .getByRole("button", { name: "Validate and review decisions" })
    .click();
  await expect(
    page.getByRole("heading", { name: /Your budget decisions today/ }),
  ).toBeVisible({ timeout: 30000 });
  const card = page
    .locator("article.decision-card")
    .filter({ has: page.getByRole("heading", { name: "Everyday tees" }) });
  await expect(
    card.getByText("INSUFFICIENT EVIDENCE", { exact: true }),
  ).toBeVisible();
  await expect(
    card.getByRole("button", { name: "Approve", exact: true }),
  ).toHaveCount(0);
  await card.getByRole("button", { name: "Record no change" }).click();
  await expect(card.getByText("No change recorded")).toBeVisible();
  await page.reload();
  await expect(
    page.getByRole("heading", { name: /Your budget decisions today/ }),
  ).toBeVisible({ timeout: 15000 });
  await expect(
    page
      .locator("article.decision-card")
      .filter({ has: page.getByRole("heading", { name: "Everyday tees" }) })
      .getByText("No change recorded"),
  ).toBeVisible();
  await page.getByRole("button", { name: "History", exact: true }).click();
  await expect(
    page.getByRole("button", { name: /Everyday tees/ }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Back to Today" }).click();
  await page.getByRole("button", { name: "Refresh with CSV" }).click();
  await page.getByRole("button", { name: "Upload CSVs", exact: true }).click();
  await page
    .locator("input[type=file]")
    .setInputFiles(csvFiles.map((f) => ({ ...f, name: `repeat_${f.name}` })));
  await expect(
    page.locator(".file-list").getByText(/Saved mapping reused/),
  ).toHaveCount(3);
  await page.getByLabel(/I verified that attribution/).check();
  await page
    .getByRole("button", { name: "Validate and review decisions" })
    .click();
  await expect(
    page.getByRole("heading", { name: /Your budget decisions today/ }),
  ).toBeVisible({ timeout: 30000 });
  const nextCard = page
    .locator("article.decision-card")
    .filter({ has: page.getByRole("heading", { name: "Everyday tees" }) });
  await nextCard.getByRole("button", { name: "Why?" }).click();
  await expect(
    nextCard.getByText(/Previous operator decision: NO_ACTION_CONFIRMED/),
  ).toBeVisible();
  const other = await browser.newContext();
  const outsider = await other.newPage();
  await outsider.goto("/");
  await expect(
    outsider.getByRole("heading", { name: /Ad budget decisions/ }),
  ).toBeVisible();
  await expect(outsider.getByText("Everyday tees")).toHaveCount(0);
  await other.close();
});
