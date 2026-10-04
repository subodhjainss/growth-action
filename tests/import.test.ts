import { test } from "node:test";
import assert from "node:assert/strict";
import {
  parseFile,
  assemble,
  saveMapping,
  applySavedMapping,
} from "../src/importCsv";
const file = (name: string, body: string) =>
  ({ name, size: body.length, text: async () => body }) as File;
test("custom columns persist and are reused by schema, not filename; blank chosen metrics stay absent", async () => {
  const csv =
    "date,account_id,campaign_id,campaign_name,adset_id,adset_name,my_spend,impressions,link_clicks,purchases,purchase_conversion_value\n2026-10-04,fake-account,c1,Everyday,s1,Tees,20,1000,,2,80\n";
  const first = await parseFile(file("first.csv", csv));
  first.kind = "adsets";
  first.columns!.spend = "my_spend";
  const saved = saveMapping([first], null);
  const next = applySavedMapping(
    await parseFile(file("new-name.csv", csv)),
    saved,
  );
  assert.equal(next.mappingSource, "saved");
  assert.equal(next.columns!.spend, "my_spend");
  const imported = assemble([next], {
    currency: "INR",
    timezone: "UTC",
    fetchedAt: "2026-10-05T08:00:00Z",
    measurementVerified: true,
  });
  assert.equal(imported.adsets[0].spend, 20);
  assert.equal(imported.adsets[0].clicks, null);
  const changed = applySavedMapping(
    await parseFile(
      file("changed.csv", csv.replaceAll("my_spend", "new_spend")),
    ),
    saved,
  );
  assert.notEqual(changed.mappingSource, "saved");
});
test("outbound clicks are not silently mapped to link clicks", async () => {
  const f = await parseFile(
    file(
      "daily.csv",
      "date,spend,impressions,outbound_clicks\n2026-10-04,20,1000,10\n",
    ),
  );
  assert.equal(f.columns!.clicks, "");
});
