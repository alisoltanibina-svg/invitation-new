#!/usr/bin/env node
/**
 * Post-build for Vercel.
 *
 * Nitro's vercel preset always emits `.vercel/output` (Build Output API) plus a
 * broken serverless function. Vercel prefers that folder over `outputDirectory`,
 * so we snapshot `/` to `dist/` and then delete `.vercel/output` entirely.
 */
import { cpSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, ".vercel/output");
const FUNC = join(OUT, "functions/__server.func");
const HANDLER = join(FUNC, "index.mjs");
const STATIC_DIR = join(OUT, "static");
const INDEX = join(STATIC_DIR, "index.html");
const DIST = join(ROOT, "dist");

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

mkdirSync(STATIC_DIR, { recursive: true });
writeFileSync(INDEX, html);
console.log(`[prerender] wrote index.html (${html.length} bytes)`);

rmSync(DIST, { recursive: true, force: true });
cpSync(STATIC_DIR, DIST, { recursive: true });
if (!html.includes("<!DOCTYPE html")) {
  console.error("[prerender] dist/index.html missing doctype");
  process.exit(1);
}
console.log("[prerender] copied static output to dist/");

rmSync(OUT, { recursive: true, force: true });
console.log("[prerender] removed .vercel/output so Vercel uses dist/");
