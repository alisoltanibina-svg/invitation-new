#!/usr/bin/env node
/**
 * Post-build for Vercel.
 *
 * Nitro 3's SSR function dynamically `import()`s hashed `_ssr/router-*.mjs`
 * chunks. Vercel's file tracer skips those, so production throws:
 *   Cannot find module '/var/task/_ssr/router-….mjs'
 *
 * This invitation is a static page, so we:
 *   1. Snapshot `/` to `static/index.html`
 *   2. Route all document requests to that file (no serverless function)
 *   3. Force-include `_ssr/**` on the function as a fallback
 */
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, ".vercel/output");
const FUNC = join(OUT, "functions/__server.func");
const SSR_DIR = join(FUNC, "_ssr");
const HANDLER = join(FUNC, "index.mjs");
const INDEX = join(OUT, "static/index.html");
const CONFIG = join(OUT, "config.json");
const VC_CONFIG = join(FUNC, ".vc-config.json");

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
console.log("[prerender] patched config.json → static SPA");

try {
  const vc = JSON.parse(readFileSync(VC_CONFIG, "utf8"));
  vc.includeFiles = "**";
  writeFileSync(VC_CONFIG, JSON.stringify(vc, null, 2));
  console.log("[prerender] patched .vc-config.json includeFiles");
} catch (err) {
  console.warn("[prerender] could not patch .vc-config.json:", err);
}

try {
  const ssrPath = join(SSR_DIR, "ssr.mjs");
  const siblings = readdirSync(SSR_DIR).filter(
    (name) => name.endsWith(".mjs") && name !== "ssr.mjs",
  );
  if (siblings.length > 0) {
    const banner = siblings
      .map((name) => `import ${JSON.stringify(`./${name}`)};\n`)
      .join("");
    writeFileSync(ssrPath, banner + readFileSync(ssrPath, "utf8"));
    console.log(
      `[prerender] pinned ${siblings.length} _ssr chunks for Vercel nft`,
    );
  }
} catch (err) {
  console.warn("[prerender] could not pin _ssr imports:", err);
}
