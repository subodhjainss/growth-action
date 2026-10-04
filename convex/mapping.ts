import { ConvexError } from "convex/values";
const unsafeKeys = new Set(["__proto__", "constructor", "prototype"]);
const plain = (x: object) =>
  Object.getPrototypeOf(x) === Object.prototype ||
  Object.getPrototypeOf(x) === null;
const kinds = new Set([
  "adsets",
  "ads",
  "settings",
  "campaigns",
  "events",
  "adsettings",
]);
export interface MappingProfile {
  kind: string;
  headers: string[];
  columns: Record<string, string>;
}
export interface SavedMapping {
  version: 1;
  profiles: MappingProfile[];
}
export function validateMapping(
  input: unknown,
): SavedMapping | Record<string, string> {
  const fail = (): never => {
    throw new ConvexError(
      "Saved field mapping is invalid. Review the column mapping and try again.",
    );
  };
  if (
    !input ||
    typeof input !== "object" ||
    Array.isArray(input) ||
    !plain(input) ||
    JSON.stringify(input).length > 10000
  )
    return fail();
  const mapping = input as Record<string, unknown>;
  if ("version" in mapping || "profiles" in mapping) {
    if (
      mapping.version !== 1 ||
      !Array.isArray(mapping.profiles) ||
      mapping.profiles.length > 20 ||
      Object.keys(mapping).some((k) => !["version", "profiles"].includes(k))
    )
      return fail();
    const profiles: MappingProfile[] = [];
    for (const item of mapping.profiles) {
      if (
        !item ||
        typeof item !== "object" ||
        Array.isArray(item) ||
        !plain(item)
      )
        return fail();
      if (
        !kinds.has(item.kind) ||
        !Array.isArray(item.headers) ||
        item.headers.length > 200 ||
        !item.headers.every(
          (h: unknown) => typeof h === "string" && h.length <= 100,
        ) ||
        !item.columns ||
        typeof item.columns !== "object" ||
        Array.isArray(item.columns) ||
        !plain(item.columns)
      )
        return fail();
      const entries = Object.entries(item.columns);
      if (
        entries.length > 40 ||
        entries.some(
          ([key, value]) =>
            !key ||
            unsafeKeys.has(key) ||
            key.length > 100 ||
            typeof value !== "string" ||
            value.length > 100,
        ) ||
        Object.keys(item).some(
          (k) => !["kind", "headers", "columns"].includes(k),
        )
      )
        return fail();
      // A selected source column must actually belong to this profile's header set.
      if (
        entries.some(
          ([, value]) => value !== "" && !item.headers.includes(value),
        )
      )
        return fail();
      profiles.push({
        kind: item.kind,
        headers: [...item.headers],
        columns: Object.fromEntries(entries) as Record<string, string>,
      });
    }
    return { version: 1, profiles };
  }
  // Earlier builds stored one flat string-to-string map; preserve those safely.
  const entries = Object.entries(mapping);
  if (
    entries.length > 40 ||
    entries.some(
      ([key, value]) =>
        !key ||
        unsafeKeys.has(key) ||
        key.length > 100 ||
        typeof value !== "string" ||
        value.length > 100,
    )
  )
    return fail();
  return Object.fromEntries(entries) as Record<string, string>;
}
