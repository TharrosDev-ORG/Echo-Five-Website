// Browser checks for the built site. Run against `next start -p 3100`:
//   npm run check:ui [-- --only=name,name] [-- --shots]
// Uses the Playwright install on NODE_PATH (not a project dependency).
import { createRequire } from "node:module";
import { mkdirSync } from "node:fs";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3100";
const ROUTES = ["/", "/services", "/approach", "/product", "/about", "/contact", "/missing-page"];
const WIDTHS = [360, 390, 768, 1024, 1440];
const HEIGHT = 900;

const args = process.argv.slice(2);
const only = args.find((a) => a.startsWith("--only="))?.slice(7).split(",");
const shots = args.includes("--shots");

/**
 * Each check returns a list of failure messages (empty = pass).
 * mode: "js" (default browser), "nojs" (JavaScript disabled), "reduced" (prefers-reduced-motion).
 */
const checks = [
  {
    name: "no-overflow",
    mode: "js",
    widths: WIDTHS,
    routes: ROUTES,
    async run(page) {
      const { sw, cw } = await page.evaluate(() => ({
        sw: document.documentElement.scrollWidth,
        cw: document.documentElement.clientWidth,
      }));
      return sw > cw ? [`scrollWidth ${sw} > clientWidth ${cw}`] : [];
    },
  },
  {
    name: "one-h1",
    mode: "js",
    widths: [1440],
    routes: ROUTES,
    async run(page) {
      const n = await page.locator("h1").count();
      return n === 1 ? [] : [`${n} h1 elements`];
    },
  },
  {
    name: "nojs-visible",
    mode: "nojs",
    widths: [390, 1440],
    routes: ROUTES,
    async run(page) {
      const hidden = await page.evaluate(() =>
        [...document.querySelectorAll("[data-reveal]")]
          .filter((el) => getComputedStyle(el).opacity !== "1")
          .map((el) => el.textContent.trim().slice(0, 30)),
      );
      return hidden.map((t) => `[data-reveal] not visible: '${t}'`);
    },
  },
  {
    name: "contrast",
    mode: "reduced",
    widths: [390, 1440],
    routes: ROUTES,
    async run(page) {
      return page.evaluate(() => {
        const parse = (c) => {
          const m = c.match(/rgba?\(([^)]+)\)/);
          if (!m) return null;
          const p = m[1].split(/[\s,/]+/).filter(Boolean).map(Number);
          return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
        };
        const over = (top, bottom) => ({
          r: top.r * top.a + bottom.r * (1 - top.a),
          g: top.g * top.a + bottom.g * (1 - top.a),
          b: top.b * top.a + bottom.b * (1 - top.a),
          a: 1,
        });
        const lum = ({ r, g, b }) => {
          const f = (v) => {
            v /= 255;
            return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
          };
          return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
        };
        const ratio = (a, b) => {
          const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
          return (x + 0.05) / (y + 0.05);
        };
        // Background behind an element: composite translucent layers up to the first opaque one.
        const background = (el) => {
          const layers = [];
          for (let n = el; n; n = n.parentElement) {
            const cs = getComputedStyle(n);
            if (cs.backgroundImage !== "none") return null;
            const bg = parse(cs.backgroundColor);
            if (bg && bg.a > 0) {
              layers.push(bg);
              if (bg.a >= 1) break;
            }
          }
          let result = { r: 255, g: 255, b: 255, a: 1 };
          for (const layer of layers.reverse()) result = over(layer, result);
          return result;
        };
        const fails = [];
        for (const el of document.body.querySelectorAll("*")) {
          if (fails.length >= 10) break;
          if (el.closest("[aria-hidden='true'], svg, .sr-only, noscript, script, style")) continue;
          const ownText = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
          if (!ownText) continue;
          const rect = el.getBoundingClientRect();
          const cs = getComputedStyle(el);
          if (rect.width === 0 || rect.height === 0 || cs.visibility === "hidden" || Number(cs.opacity) === 0) continue;
          const bg = background(el);
          if (!bg) continue;
          const fg = parse(cs.color);
          if (!fg) continue;
          const size = parseFloat(cs.fontSize);
          const large = size >= 24 || (size >= 18.66 && Number(cs.fontWeight) >= 700);
          const r = ratio(over(fg, bg), bg);
          if (r < (large ? 3 : 4.5)) {
            const cls = typeof el.className === "string" ? el.className.split(" ").slice(0, 3).join(".") : "";
            fails.push(`${el.tagName.toLowerCase()}.${cls} '${el.textContent.trim().slice(0, 30)}' ratio=${r.toFixed(2)}`);
          }
        }
        return fails;
      });
    },
  },
];

// Waits run on the Node side: page timers never fire when JavaScript is disabled.
async function scrollThrough(page) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < height; y += 400) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await page.waitForTimeout(30);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(100);
}

const browser = await chromium.launch();
const contexts = {};
const contextFor = async (mode, width) => {
  const key = `${mode}-${width}`;
  if (!contexts[key]) {
    contexts[key] = await browser.newContext({
      viewport: { width, height: HEIGHT },
      javaScriptEnabled: mode !== "nojs",
      reducedMotion: mode === "reduced" ? "reduce" : "no-preference",
    });
  }
  return contexts[key];
};

const failures = [];
let ran = 0;
const selected = checks.filter((c) => !only || only.includes(c.name));
if (shots) mkdirSync(".screenshots", { recursive: true });

for (const check of selected) {
  for (const width of check.widths) {
    for (const route of check.routes) {
      const page = await (await contextFor(check.mode, width)).newPage();
      try {
        await page.goto(BASE_URL + route, { waitUntil: "networkidle" });
        await page.evaluate(() => document.fonts.ready);
        await scrollThrough(page);
        const msgs = await check.run(page, { route, width });
        ran++;
        for (const m of msgs) failures.push(`[${check.name}] ${route}@${width} ${m}`);
        if (shots && check.name === selected[0].name) {
          const name = route === "/" ? "home" : route.slice(1);
          await page.screenshot({ path: `.screenshots/${name}-${width}.png`, fullPage: true });
        }
      } catch (err) {
        failures.push(`[${check.name}] ${route}@${width} error: ${err.message.split("\n")[0]}`);
      } finally {
        await page.close();
      }
    }
  }
}
await browser.close();

for (const f of failures) console.log("FAIL " + f);
console.log(`${selected.length} checks, ${ran} page runs, ${failures.length} failures`);
process.exit(failures.length ? 1 : 0);
