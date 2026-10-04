"use node";
import { action } from "./_generated/server";
import { v, ConvexError } from "convex/values";
import { lookup } from "node:dns/promises";
import { isIP } from "node:net";
import { request } from "node:https";
import { RateLimiter, MINUTE } from "@convex-dev/rate-limiter";
import { components } from "./_generated/api";
const limiter = new RateLimiter(components.rateLimiter, {
  websiteReads: { kind: "fixed window", rate: 30, period: MINUTE },
});
const clean = (s: string) =>
  s
    .replace(/<[^>]*>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 350);
function validateUrl(u: URL) {
  if (
    u.protocol !== "https:" ||
    u.username ||
    u.password ||
    u.port ||
    !/^([a-z0-9-]+\.)+[a-z]{2,}$/i.test(u.hostname) ||
    u.hostname.endsWith(".local") ||
    u.hostname.endsWith(".localhost")
  )
    throw new Error("public HTTPS required");
}
function publicAddress(ip: string) {
  if (isIP(ip) === 6)
    return !/^(::|fc|fd|fe8|fe9|fea|feb)/i.test(ip) && !ip.includes("::ffff:");
  const p = ip.split(".").map(Number);
  return (
    p[0] !== 0 &&
    p[0] !== 10 &&
    p[0] !== 127 &&
    p[0] < 224 &&
    !(p[0] === 169 && p[1] === 254) &&
    !(p[0] === 172 && p[1] >= 16 && p[1] <= 31) &&
    !(p[0] === 192 && p[1] === 168) &&
    !(p[0] === 100 && p[1] >= 64 && p[1] <= 127)
  );
}
async function readPublicPage(
  u: URL,
  address: { address: string; family: number },
  remaining: number,
) {
  return new Promise<{ text: string; redirect?: string }>((resolve, reject) => {
    let timer: ReturnType<typeof setTimeout>;
    const req = request(
      u,
      {
        method: "GET",
        family: address.family,
        lookup: (_host, options, callback) => {
          if ((options as any).all) (callback as any)(null, [address]);
          else callback(null, address.address, address.family);
        },
        headers: { "User-Agent": "GrowthAction/1.0 business website review" },
      },
      (res) => {
        if (
          [301, 302, 303, 307, 308].includes(res.statusCode ?? 0) &&
          res.headers.location
        ) {
          clearTimeout(timer);
          res.resume();
          resolve({ text: "", redirect: res.headers.location });
          return;
        }
        if (
          res.statusCode !== 200 ||
          !res.headers["content-type"]?.includes("text/html")
        ) {
          clearTimeout(timer);
          res.resume();
          reject(new Error("response"));
          return;
        }
        let size = 0,
          text = "";
        res.setEncoding("utf8");
        res.on("data", (chunk: string) => {
          size += Buffer.byteLength(chunk);
          if (size > 300000) {
            clearTimeout(timer);
            resolve({ text });
            req.destroy();
            return;
          }
          text += chunk;
        });
        res.on("end", () => {
          clearTimeout(timer);
          resolve({ text });
        });
        res.on("error", (e) => {
          clearTimeout(timer);
          reject(e);
        });
      },
    );
    timer = setTimeout(
      () => req.destroy(new Error("timeout")),
      Math.max(1, remaining),
    );
    req.on("error", (e) => {
      clearTimeout(timer);
      reject(e);
    });
    req.end();
  });
}
async function inspectPublic(initial: URL) {
  const deadline = Date.now() + 12000;
  let u = initial;
  for (let hop = 0; hop <= 2; hop++) {
    validateUrl(u);
    const remaining = deadline - Date.now();
    if (remaining <= 0) throw new Error("timeout");
    const addresses = await Promise.race([
      lookup(u.hostname, { all: true }),
      new Promise<never>((_, reject) => {
        const t = setTimeout(() => reject(new Error("dns timeout")), remaining);
        t.unref();
      }),
    ]);
    if (!addresses.length || addresses.some((a) => !publicAddress(a.address)))
      throw new Error("private");
    const response = await readPublicPage(
      u,
      addresses.find((a) => a.family === 4) ?? addresses[0],
      deadline - Date.now(),
    );
    if (response.redirect) {
      u = new URL(response.redirect, u);
      continue;
    }
    return { text: response.text, url: u };
  }
  throw new Error("too many redirects");
}
export const inspect = action({
  args: { url: v.string() },
  returns: v.object({
    brandName: v.string(),
    products: v.string(),
    customers: v.string(),
    positioning: v.string(),
    offers: v.string(),
    sourceUrl: v.string(),
    sourceLabel: v.string(),
  }),
  handler: async (ctx, { url }) => {
    const quota = await limiter.limit(ctx, "websiteReads");
    if (!quota.ok)
      throw new ConvexError("Busy right now. Try again in a minute.");
    let initial: URL;
    try {
      initial = new URL(url.startsWith("https://") ? url : `https://${url}`);
      validateUrl(initial);
    } catch {
      throw new ConvexError("Enter a valid public HTTPS website address.");
    }
    try {
      const { text, url: finalUrl } = await inspectPublic(initial);
      const tags = text.match(/<meta\s[^>]*>/gi) ?? [];
      const meta = (name: string) => {
        const tag = tags.find((t) =>
          new RegExp(`(?:name|property)\\s*=\\s*["']${name}["']`, "i").test(t),
        );
        return clean(tag?.match(/content\s*=\s*["']([^"']*)["']/i)?.[1] ?? "");
      };
      const title = clean(
        text.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ??
          finalUrl.hostname,
      );
      const products = new Set<string>();
      let nodes = 0;
      const walk = (item: any, depth = 0) => {
        if (!item || depth > 6 || nodes++ > 200) return;
        if (Array.isArray(item)) {
          item.slice(0, 30).forEach((x) => walk(x, depth + 1));
          return;
        }
        if (typeof item !== "object") return;
        const type = Array.isArray(item["@type"])
          ? item["@type"]
          : [item["@type"]];
        if (type.includes("Product") && typeof item.name === "string")
          products.add(clean(item.name).slice(0, 80));
        if (type.includes("Product") && typeof item.category === "string")
          products.add(clean(item.category).slice(0, 80));
        for (const key of ["@graph", "itemListElement", "item", "mainEntity"])
          if (item[key]) walk(item[key], depth + 1);
      };
      const scripts = [
        ...text.matchAll(
          /<script\b[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
        ),
      ].slice(0, 10);
      for (const script of scripts) {
        try {
          walk(JSON.parse(script[1]));
        } catch {
          /* Invalid website structured data is ignored. */
        }
      }
      return {
        brandName: meta("og:site_name") || meta("og:title") || title,
        products: [...products].slice(0, 4).join(", ").slice(0, 200),
        customers: "",
        positioning: meta("description") || meta("og:description"),
        offers: "",
        sourceUrl: finalUrl.toString(),
        sourceLabel:
          "Website metadata and structured product data; review needed",
      };
    } catch {
      throw new ConvexError(
        "I could not read this website. You can enter your brand details yourself.",
      );
    }
  },
});
