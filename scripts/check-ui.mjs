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

// Node-side WCAG helpers for checks that read colors out of the page.
const parseRgb = (c) => {
  const m = c.match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const p = m[1].split(/[\s,/]+/).filter(Boolean).map(Number);
  return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
};
const relLum = ({ r, g, b }) => {
  const f = (v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};
const contrastOf = (a, b) => {
  const [x, y] = [relLum(a), relLum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

// A rail line must be fully drawn when motion is off or JS is absent.
const railStaticFails = async (page) => {
  const got = await page.evaluate(() =>
    [...document.querySelectorAll(".signal-rail-line")].map((el) => getComputedStyle(el).transform),
  );
  const fails = got.length ? [] : ["no .signal-rail-line found"];
  for (const t of got) {
    if (t !== "none" && t !== "matrix(1, 0, 0, 1, 0, 0)") fails.push(`line transform ${t}`);
  }
  return fails;
};

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
  {
    name: "index-row-focus",
    mode: "js",
    widths: [1440],
    routes: ["/", "/product"],
    async run(page) {
      // Rows arrive with the pages that use IndexList; no rows means nothing to check.
      if ((await page.locator(".index-row").count()) === 0) return [];
      let focused = false;
      for (let i = 0; i < 60 && !focused; i++) {
        await page.keyboard.press("Tab");
        focused = await page.evaluate(() => document.activeElement?.classList.contains("index-row") ?? false);
      }
      if (!focused) return ["could not reach an .index-row with Tab in 60 presses"];
      await page.waitForTimeout(300);
      const got = await page.evaluate(() => {
        const cs = getComputedStyle(document.activeElement);
        return {
          style: cs.outlineStyle,
          width: cs.outlineWidth,
          color: cs.outlineColor,
          bg: cs.backgroundColor,
          matchesFocusVisible: document.activeElement.matches(":focus-visible"),
        };
      });
      const fails = [];
      if (!got.matchesFocusVisible) fails.push("row is not :focus-visible after Tab");
      if (got.style === "none" || parseFloat(got.width) === 0) fails.push(`no outline (style ${got.style}, width ${got.width})`);
      const fg = parseRgb(got.color);
      const bg = parseRgb(got.bg);
      if (!fg || !bg || bg.a < 1) {
        fails.push(`cannot resolve opaque colors (outline ${got.color}, bg ${got.bg})`);
      } else {
        const r = contrastOf(fg, bg);
        if (r < 3) fails.push(`outline ${got.color} on ${got.bg} ratio=${r.toFixed(2)} < 3`);
      }
      return fails;
    },
  },
  {
    name: "btn-hover-contrast",
    mode: "js",
    widths: [1440],
    routes: ["/", "/product"],
    async run(page) {
      const fails = [];
      const buttons = page.locator(".btn-primary:visible");
      const n = Math.min(await buttons.count(), 6);
      for (let i = 0; i < n; i++) {
        const btn = buttons.nth(i);
        const label = (await btn.innerText()).replace(/\s+/g, " ").trim().slice(0, 24);
        await btn.scrollIntoViewIfNeeded();
        try {
          await btn.hover({ timeout: 3000 });
        } catch (err) {
          fails.push(`'${label}' could not be hovered: ${err.message.split("\n")[0]}`);
          continue;
        }
        await page.waitForTimeout(300);
        // The fill is a gradient sweep, so read the hover color token through a probe element.
        const got = await btn.evaluate((el) => {
          const probe = document.createElement("span");
          probe.style.backgroundColor = "var(--accent-hover)";
          el.appendChild(probe);
          const bg = getComputedStyle(probe).backgroundColor;
          probe.remove();
          return { text: getComputedStyle(el).color, bg };
        });
        const fg = parseRgb(got.text);
        const bg = parseRgb(got.bg);
        if (!fg || !bg) {
          fails.push(`'${label}' unreadable colors (text ${got.text}, hover ${got.bg})`);
          continue;
        }
        const r = contrastOf(fg, bg);
        if (r < 4.5) fails.push(`'${label}' text ${got.text} on hover ${got.bg} ratio=${r.toFixed(2)} < 4.5`);
      }
      return fails;
    },
  },
  {
    name: "tokens",
    mode: "js",
    widths: [1440],
    routes: ["/"],
    async run(page) {
      const got = await page.evaluate(() => {
        const probe = (parent) => {
          const s = document.createElement("span");
          s.style.color = "var(--accent)";
          parent.appendChild(s);
          const c = getComputedStyle(s).color;
          s.remove();
          return c;
        };
        const dark = document.querySelector(".surface-dark");
        return {
          body: getComputedStyle(document.body).backgroundColor,
          accentLight: probe(document.body),
          accentDark: dark ? probe(dark) : "no .surface-dark",
          h1Font: getComputedStyle(document.querySelector("h1")).fontFamily,
        };
      });
      const fails = [];
      if (got.body !== "rgb(255, 255, 255)") fails.push(`body bg ${got.body}`);
      if (got.accentLight !== "rgb(47, 91, 255)") fails.push(`accent on light ${got.accentLight}`);
      if (got.accentDark !== "rgb(110, 140, 255)") fails.push(`accent on dark ${got.accentDark}`);
      if (!/bricolage/i.test(got.h1Font)) fails.push(`h1 font ${got.h1Font}`);
      return fails;
    },
  },
  {
    name: "rail",
    mode: "js",
    widths: [1440],
    routes: ["/", "/services", "/about"],
    async run(page) {
      const rails = await page.evaluate(() =>
        [...document.querySelectorAll("[data-rail]")]
          .filter((el) => getComputedStyle(el).display !== "none")
          .map((el) => {
            const line = el.querySelector(".signal-rail-line");
            return {
              left: el.getBoundingClientRect().left,
              lineWidth: line ? getComputedStyle(line).width : "no line",
            };
          }),
      );
      const fails = [];
      if (rails.length < 3) fails.push(`${rails.length} rails, expected >= 3`);
      rails.forEach((r, i) => {
        if (r.lineWidth !== "1px") fails.push(`rail ${i} line width ${r.lineWidth}`);
      });
      if (rails.length) {
        const lefts = rails.map((r) => r.left);
        const spread = Math.max(...lefts) - Math.min(...lefts);
        if (spread > 0.5) fails.push(`rails not aligned, left spread ${spread.toFixed(2)}px`);
      }
      return fails;
    },
  },
  {
    name: "rail-mobile",
    mode: "js",
    widths: [390],
    routes: ["/", "/services", "/about"],
    async run(page) {
      const got = await page.evaluate(() => ({
        shown: [...document.querySelectorAll("[data-rail]")]
          .filter((el) => getComputedStyle(el).display !== "none")
          .length,
        strokes: [...document.querySelectorAll("[data-rail-stroke]")]
          .filter((el) => getComputedStyle(el).display !== "none")
          .map((el) => getComputedStyle(el).width),
      }));
      const fails = [];
      if (got.shown) fails.push(`${got.shown} rails visible below 1024px`);
      if (!got.strokes.length) fails.push("no visible [data-rail-stroke]");
      else if (!got.strokes.every((w) => w === "40px")) fails.push(`stroke widths ${got.strokes.join(",")}`);
      return fails;
    },
  },
  {
    name: "rail-static",
    mode: "reduced",
    widths: [1440],
    routes: ["/"],
    async run(page) {
      return railStaticFails(page);
    },
  },
  {
    name: "rail-static-nojs",
    mode: "nojs",
    widths: [1440],
    routes: ["/"],
    async run(page) {
      return railStaticFails(page);
    },
  },
  {
    // The header is dark only where the page opens on a black hero, including after client navigation.
    name: "header-tone",
    mode: "js",
    widths: [1440],
    routes: ["/"],
    async run(page) {
      const fails = [];
      const dark = () =>
        page.evaluate(() => getComputedStyle(document.querySelector(".site-header")).backgroundColor === "rgb(10, 10, 11)");
      const settle = () => page.waitForTimeout(400);
      await page.evaluate(() => window.scrollTo(0, 0));
      await settle();
      if (!(await dark())) fails.push("/ at scrollY 0: header is not dark");
      await page.goto(BASE_URL + "/about", { waitUntil: "networkidle" });
      await settle();
      if (await dark()) fails.push("/about: header is dark");
      await page.locator('.site-header a[href="/"]').first().click();
      await page.waitForURL(BASE_URL + "/");
      await settle();
      if (!(await dark())) fails.push("/about then client nav to /: header is not dark");
      await page.locator('nav[aria-label="Primary"] a', { hasText: /^About$/ }).click();
      await page.waitForURL("**/about");
      await settle();
      if (await dark()) fails.push("/ then client nav to /about: header still dark");
      return fails;
    },
  },
  {
    // The dark state comes from the server-rendered DOM, so it holds before (or without) JavaScript.
    name: "header-tone-ssr",
    mode: "nojs",
    widths: [1440],
    routes: ["/", "/product", "/about"],
    async run(page, { route }) {
      const bg = await page.evaluate(() => getComputedStyle(document.querySelector(".site-header")).backgroundColor);
      const wantDark = route === "/" || route === "/product";
      const isDark = bg === "rgb(10, 10, 11)";
      return isDark === wantDark ? [] : [`header background ${bg}, expected ${wantDark ? "dark" : "not dark"}`];
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
if (!selected.length) {
  console.log(`No checks match --only=${only}`);
  process.exit(1);
}
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
