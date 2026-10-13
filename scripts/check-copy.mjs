// Static copy and code checks: npm run check:copy
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const rules = [
  { name: "em-dash", dirs: ["app", "components", "lib"], pattern: /—|\\u2014/ },
  {
    name: "legacy-tokens",
    dirs: ["app", "components", "lib"],
    pattern: /spruce|citron|moss|paper-2|instrument|\btexture\b|card-shadow/i,
  },
  { name: "old-years", dirs: ["lib"], pattern: /20\+|\btwenty\b/i },
  { name: "advanta-claims", dirs: ["lib"], pattern: /analytics|guardrail|week to week/i },
];

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return walk(path);
    return /\.(tsx?|css|mjs)$/.test(name) ? [path] : [];
  });

let hits = 0;
for (const rule of rules) {
  for (const file of rule.dirs.flatMap(walk)) {
    readFileSync(file, "utf8")
      .split("\n")
      .forEach((line, i) => {
        if (rule.pattern.test(line)) {
          hits++;
          console.log(`[${rule.name}] ${file}:${i + 1}: ${line.trim().slice(0, 100)}`);
        }
      });
  }
}
console.log(`${rules.length} rules, ${hits} hits`);
process.exit(hits ? 1 : 0);
