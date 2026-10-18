/**
 * Shared helpers for the browser scripts (check-ui, shoot).
 */

/** Exit codes: 1 = checks found problems, 2 = could not run (no server, no browser). */
export const EXIT_PROBLEMS = 1;
export const EXIT_SETUP = 2;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Wait until `base` answers an HTTP request. Polls for up to `waitSeconds`
 * (0 means a single attempt). On failure, prints how to start a server and
 * exits with EXIT_SETUP instead of letting Playwright throw a stack trace.
 */
export async function requireServer(base, { waitSeconds = 0, script = "this script" } = {}) {
  let url;
  try {
    url = new URL(base);
  } catch {
    console.error(`${script}: invalid base URL "${base}".`);
    process.exit(EXIT_SETUP);
  }

  const deadline = Date.now() + Math.max(0, waitSeconds) * 1000;
  let lastError;
  do {
    try {
      const res = await fetch(url, { redirect: "manual", signal: AbortSignal.timeout(5000) });
      // Any HTTP answer means a server is listening; route status is checked later.
      await res.body?.cancel();
      return;
    } catch (error) {
      lastError = error;
      if (Date.now() < deadline) await sleep(1000);
    }
  } while (Date.now() < deadline);

  const reason = lastError?.cause?.code ?? lastError?.name ?? String(lastError);
  console.error(
    [
      `${script}: no server answering at ${url.origin} (${reason}).`,
      "Start a production build first, for example:",
      `  npm run build && npx next start -p ${url.port || 80} &`,
      "or point the script at a running server with BASE_URL / --base.",
      waitSeconds ? "" : "Set WAIT_FOR_SERVER=<seconds> to wait for a server that is still starting.",
    ]
      .filter(Boolean)
      .join("\n"),
  );
  process.exit(EXIT_SETUP);
}

/** Launch Chromium, or explain how to install it instead of throwing. */
export async function launchChromium(chromium, script = "this script") {
  try {
    return await chromium.launch();
  } catch (error) {
    console.error(
      [
        `${script}: could not launch Chromium.`,
        String(error?.message ?? error).split("\n")[0],
        "Install the browser with: npx playwright install chromium",
        "(on CI or a fresh Linux box: npx playwright install --with-deps chromium)",
      ].join("\n"),
    );
    process.exit(EXIT_SETUP);
  }
}

/** Parse a non-negative number of seconds from an env var. */
export function secondsFromEnv(name, fallback = 0) {
  const raw = process.env[name];
  if (raw === undefined || raw === "") return fallback;
  const value = Number(raw);
  if (!Number.isFinite(value) || value < 0) {
    console.error(`${name} must be a number of seconds, got "${raw}".`);
    process.exit(EXIT_SETUP);
  }
  return value;
}
