/**
 * Full-page screenshots for design review.
 *
 *   node scripts/shoot.mjs [--base=http://localhost:3010] [--widths=1440,390] [/ /services ...]
 *
 * Writes .screenshots/<route>-<width>.png. Pages render with reduced motion so
 * every scroll-in element is visible in the capture.
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { launchChromium, requireServer, secondsFromEnv } from "./lib/server.mjs";

const args = process.argv.slice(2);
const opt = (name, fallback) => {
  const hit = args.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.split("=")[1] : fallback;
};
const base = opt("base", "http://localhost:3010");
const widths = opt("widths", "1440,390").split(",").map(Number);
const routes = args.filter((a) => !a.startsWith("--"));
if (routes.length === 0) routes.push("/");

await requireServer(base, { waitSeconds: secondsFromEnv("WAIT_FOR_SERVER"), script: "shoot" });
mkdirSync(".screenshots", { recursive: true });
const browser = await launchChromium(chromium, "shoot");
for (const width of widths) {
  const context = await browser.newContext({
    viewport: { width, height: width < 700 ? 844 : 900 },
    deviceScaleFactor: width < 700 ? 2 : 1,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  for (const route of routes) {
    await page.goto(base + route, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    const name = route === "/" ? "home" : route.replace(/^\//, "").replace(/\//g, "_");
    const file = `.screenshots/${name}-${width}.png`;
    await page.screenshot({ path: file, fullPage: true });
    // --seg: also save the page in viewport-height slices, easier to review.
    if (args.includes("--seg")) {
      const height = await page.evaluate(() => document.documentElement.scrollHeight);
      const step = width < 700 ? 1400 : 1600;
      for (let y = 0, i = 0; y < height; y += step, i++) {
        await page.screenshot({
          path: `.screenshots/${name}-${width}-${i}.png`,
          fullPage: true,
          clip: { x: 0, y, width, height: Math.min(step, height - y) },
        });
      }
    }
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    console.log(`${file}${overflow > 0 ? `  OVERFLOW ${overflow}px` : ""}`);
  }
  await context.close();
}
await browser.close();
