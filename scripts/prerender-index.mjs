#!/usr/bin/env node
/**
 * Post-build for Vercel.
 *
 * Nitro 3 emits a serverless function whose hashed `_ssr/router-*.mjs` chunks
 * are dropped by Vercel's tracer, so `/` 500s with ERR_MODULE_NOT_FOUND.
 *
 * This invitation is a static page. Snapshot HTML, then DELETE the function so
 * Vercel cannot route traffic to it.
 */
import {
  cpSync,
  mkdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, ".vercel/output");
const FUNC = join(OUT, "functions/__server.func");
const HANDLER = join(FUNC, "index.mjs");
const STATIC_DIR = join(OUT, "static");
const INDEX = join(STATIC_DIR, "index.html");
const CONFIG = join(OUT, "config.json");
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

mkdirSync(dirname(INDEX), { recursive: true });
writeFileSync(INDEX, html);
console.log(`[prerender] wrote index.html (${html.length} bytes)`);

writeFileSync(
  CONFIG,
  JSON.stringify(
    {
      version: 3,
      routes: [
        {
          src: "/assets/(.*)",
          headers: {
            "cache-control": "public, max-age=31536000, immutable",
          },
        },
        { src: "/favicon.ico", dest: "/favicon.svg" },
        { handle: "filesystem" },
        { src: "/(.*)", dest: "/index.html" },
      ],
    },
    null,
    2,
  ),
);

rmSync(join(OUT, "functions"), { recursive: true, force: true });
console.log("[prerender] removed serverless functions");

rmSync(DIST, { recursive: true, force: true });
cpSync(STATIC_DIR, DIST, { recursive: true });
console.log("[prerender] copied static output to dist/");
