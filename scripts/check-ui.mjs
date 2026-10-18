/**
 * Browser checks against a running build:
 *
 *   npm run build && npx next start -p 3100 &
 *   npm run check:ui                       # all routes, all widths
 *   BASE_URL=http://localhost:3010 npm run check:ui
 *   ROUTES=/,/about npm run check:ui       # selected routes
 *   WAIT_FOR_SERVER=60 npm run check:ui    # wait up to 60s for the server (CI)
 *
 * For each route: axe-core (WCAG 2.1 A and AA rules), exactly one h1, no
 * horizontal overflow from 360 to 1440px, images with alt, internal links
 * that resolve, and content that stays visible without JavaScript.
 *
 * Exit codes: 0 passed, 1 problems found, 2 could not run (no server or browser).
 */
import { chromium } from "playwright";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { EXIT_PROBLEMS, launchChromium, requireServer, secondsFromEnv } from "./lib/server.mjs";

const require = createRequire(import.meta.url);
const axeSource = readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");

const BASE_URL = (process.env.BASE_URL ?? "http://localhost:3100").replace(/\/+$/, "");
const ROUTES = process.env.ROUTES
  ? process.env.ROUTES.split(",")
      .map((r) => r.trim())
      .filter(Boolean)
      .map((r) => (r.startsWith("/") ? r : `/${r}`))
  : ["/", "/services", "/approach", "/advanta365", "/about", "/contact", "/privacy", "/accessibility"];
const WIDTHS = [360, 390, 768, 1024, 1440];

const failures = [];
const fail = (route, msg) => failures.push(`${route}: ${msg}`);
const firstLine = (error) => String(error?.message ?? error).split("\n")[0];

await requireServer(BASE_URL, { waitSeconds: secondsFromEnv("WAIT_FOR_SERVER"), script: "check:ui" });
const browser = await launchChromium(chromium, "check:ui");

try {
  // Layout and accessibility, with motion reduced so everything is on screen.
  for (const width of WIDTHS) {
    const context = await browser.newContext({
      viewport: { width, height: 900 },
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    for (const route of ROUTES) {
      let res;
      try {
        res = await page.goto(BASE_URL + route, { waitUntil: "networkidle" });
      } catch (error) {
        fail(route, `failed to load at ${width}px: ${firstLine(error)}`);
        continue;
      }
      if (!res || res.status() !== 200) {
        fail(route, `status ${res?.status()}`);
        continue;
      }
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      if (overflow > 0) fail(route, `${overflow}px horizontal overflow at ${width}px`);

      if (width === 1440 || width === 390) {
        await page.addScriptTag({ content: axeSource });
        const result = await page.evaluate(async () =>
          axe.run(document, {
            runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22a", "wcag22aa"] },
          }),
        );
        for (const v of result.violations) {
          const targets = v.nodes
            .slice(0, 3)
            .map((n) => n.target.join(" "))
            .join(" | ");
          fail(route, `axe ${v.id} (${v.impact}) at ${width}px: ${targets}`);
        }
      }

      if (width === 1440) {
        const h1 = await page.locator("h1").count();
        if (h1 !== 1) fail(route, `${h1} h1 elements`);
        const noAlt = await page.locator("img:not([alt])").count();
        if (noAlt) fail(route, `${noAlt} images without alt`);
      }
    }
    await context.close();
  }

  // Internal links resolve.
  {
    const context = await browser.newContext();
    const page = await context.newPage();
    const seen = new Set();
    for (const route of ROUTES) {
      try {
        await page.goto(BASE_URL + route, { waitUntil: "domcontentloaded" });
      } catch (error) {
        fail(route, `failed to load for link check: ${firstLine(error)}`);
        continue;
      }
      const hrefs = await page.$$eval("a[href^='/']", (as) => as.map((a) => a.getAttribute("href")));
      for (const href of hrefs) {
        const path = href.split("#")[0] || "/";
        if (seen.has(path)) continue;
        seen.add(path);
        try {
          const r = await page.request.get(BASE_URL + path, { maxRedirects: 5 });
          if (r.status() >= 400) fail(route, `broken link ${href} (${r.status()})`);
        } catch (error) {
          fail(route, `broken link ${href} (${firstLine(error)})`);
        }
      }
    }
    await context.close();
  }

  // Without JavaScript, nothing is left hidden by the reveal styles.
  {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    for (const route of ROUTES) {
      try {
        await page.goto(BASE_URL + route, { waitUntil: "domcontentloaded" });
      } catch (error) {
        fail(route, `failed to load without JavaScript: ${firstLine(error)}`);
        continue;
      }
      const hidden = await page.$$eval("[data-reveal], [data-lines] .line > span", (els) =>
        els.filter((el) => {
          const s = getComputedStyle(el);
          return (
            s.opacity === "0" ||
            (s.transform.includes("matrix(1, 0, 0, 1, 0, ") && !s.transform.endsWith(", 0)"))
          );
        }).length,
      );
      if (hidden) fail(route, `${hidden} elements hidden without JavaScript`);
    }
    await context.close();
  }
} finally {
  await browser.close();
}

if (failures.length) {
  console.log(failures.join("\n"));
  console.log(`\n${failures.length} problems`);
  process.exit(EXIT_PROBLEMS);
}
console.log(`check:ui passed: ${ROUTES.length} routes x ${WIDTHS.length} widths`);
