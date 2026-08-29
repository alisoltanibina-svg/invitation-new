#!/usr/bin/env node
/**
 * Snapshot `/` into `.vercel/output/static/index.html` so Vercel can serve the
 * invitation from the CDN instead of the Nitro function. The function returning
 * `{"status":500,"unhandled":true,"message":"HTTPError"}` is a known Nitro 3 +
 * Vercel SSR path; a static index bypasses it.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const HANDLER = join(ROOT, ".vercel/output/functions/__server.func/index.mjs");
const OUT = join(ROOT, ".vercel/output/static/index.html");

const mod = await import(pathToFileURL(HANDLER).href);
const fetchFn = mod.default?.fetch ?? mod.default;
if (typeof fetchFn !== "function") {
  console.error("[prerender] Nitro handler has no fetch()");
  process.exit(1);
}

const res = await fetchFn(
  new Request("http://127.0.0.1/", { headers: { accept: "text/html" } }),
);
const html = await res.text();
if (!res.ok || html.length < 400 || html.includes('"unhandled":true')) {
  console.error("[prerender] SSR failed", res.status, html.slice(0, 400));
  process.exit(1);
}

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, html);
console.log(`[prerender] wrote ${OUT} (${html.length} bytes)`);
