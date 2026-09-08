// The one browser-level smoke test ASSIGNMENT_BRIEF.md's "Validation layers
// and evidence" section requires: open an assessment page, activate a real
// PDF, ZIP, and notebook action, and confirm each returns the expected file
// rather than an HTML 404 page — at both marking viewports, with at least one
// action exercised by keyboard.
//
// On the site as actually submitted, every resource release date is still in
// the future, so no action link is rendered yet (see resource-manifest.ts and
// resource-download.test.ts) — that withheld link is itself correct, honest
// behaviour, not a gap to work around. Exercising the *download mechanism*
// therefore needs a build where the release clock has already passed.
//
// That preview build is produced by a separate `pnpm resources:preview-build`
// step (see package.json's "test" script), run as its own process *before*
// vitest starts — not nested inside this file's beforeAll. Astro's post-build
// base-path checker resolves `import.meta.env.BASE_URL` incorrectly when the
// `astro build` child process is spawned from inside a running Vitest
// process (reproduced with the build issuing zero violations run standalone,
// but ~400 spurious ones when the identical command runs as a Vitest child —
// true for the main process and every worker pool, independent of stdio
// mode, NODE_ENV, or any single known Vitest/Tinypool env var). Building as a
// separate shell step sidesteps that rather than depending on it being
// diagnosed. It uses the RESOURCE_PREVIEW_NOW override that
// resource-manifest.ts documents as build-time-only and unset in every real
// build — it never touches the committed dist/ or claims an early release on
// the real site.
import { createServer } from "node:http";
import type { Server } from "node:http";
import { access, readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { chromium } from "playwright";
import type { Browser, BrowserContext } from "playwright";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

const BASE = "/comp4020-ass2-Easton-Yi";
const PREVIEW_OUT_DIR = "dist-preview-resources";

const MIME: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".pdf": "application/pdf",
  ".zip": "application/zip",
  ".ipynb": "application/json",
  ".svg": "image/svg+xml",
  ".avif": "image/avif",
  ".jpeg": "image/jpeg",
  ".css": "text/css",
  ".js": "text/javascript",
};

let server: Server;
let port: number;
let browser: Browser;
let context: BrowserContext;

function serveStatic(root: string): Promise<{ server: Server; port: number }> {
  return new Promise((resolvePromise) => {
    const s = createServer(async (req, res) => {
      const url = new URL(req.url ?? "/", "http://localhost");
      let pathname = decodeURIComponent(url.pathname);
      // Built hrefs carry the GitHub Pages base prefix (e.g.
      // `/comp4020-ass2-Easton-Yi/...`), but `root` is the dist directory
      // itself, not a folder nested under that base — the same relationship
      // GitHub Pages hosting has to the built output. Strip it before
      // mapping to a filesystem path.
      if (pathname.startsWith(BASE)) pathname = pathname.slice(BASE.length) || "/";
      if (pathname.endsWith("/")) pathname += "index.html";
      const filePath = normalize(join(root, pathname));
      if (!filePath.startsWith(normalize(root))) {
        res.writeHead(403);
        res.end();
        return;
      }
      try {
        const data = await readFile(filePath);
        res.writeHead(200, { "content-type": MIME[extname(filePath)] ?? "application/octet-stream" });
        res.end(data);
      } catch {
        res.writeHead(404, { "content-type": "text/html" });
        res.end("<h1>404</h1>");
      }
    });
    s.listen(0, () => {
      const address = s.address();
      const resolvedPort = typeof address === "object" && address ? address.port : 0;
      resolvePromise({ server: s, port: resolvedPort });
    });
  });
}

beforeAll(async () => {
  await access(join(PREVIEW_OUT_DIR, "index.html")).catch(() => {
    throw new Error(
      `${PREVIEW_OUT_DIR}/ has no build — run "pnpm resources:preview-build" first ` +
        '(the "test" script does this automatically; this file no longer builds it itself).',
    );
  });
  const started = await serveStatic(PREVIEW_OUT_DIR);
  server = started.server;
  port = started.port;
  browser = await chromium.launch();
}, 30_000);

afterAll(async () => {
  await context?.close();
  await browser?.close();
  if (server) await new Promise<void>((r) => server.close(() => r()));
});

describe("resource download browser smoke test (against a future-dated preview build)", () => {
  it("activates the Project 1 PDF brief by keyboard at desktop and gets a real PDF, not a 404", async () => {
    context = await browser.newContext({ viewport: { width: 1920, height: 1080 }, acceptDownloads: true });
    const page = await context.newPage();
    await page.goto(`http://localhost:${port}${BASE}/assessments/project-1/`);

    const link = page.locator('a.resource-card__action:has-text("Download brief")').first();
    await link.waitFor({ state: "visible" });
    await link.focus();
    expect(await link.evaluate((el) => el === document.activeElement), "link did not receive keyboard focus").toBe(
      true,
    );

    const [response] = await Promise.all([page.waitForResponse(/project-1-brief\.pdf$/), page.keyboard.press("Enter")]);

    expect(response.status(), "PDF action returned an error status").toBe(200);
    expect(response.headers()["content-type"]).toContain("pdf");
    const body = await response.body();
    expect(body.subarray(0, 5).toString("latin1")).toBe("%PDF-");

    await context.close();
  }, 30_000);

  // Targets Project 2's post-training starter pack rather than Project 1's
  // evaluation pack or either project's CVPR report template: per
  // docs/ASSIGNMENT_BRIEF.md's "Unresolved decisions", the evaluation packs'
  // tutor-evaluation prompts are a teaching-team corpus dependency that does
  // not exist in this repository, and the CVPR template is withheld pending a
  // confirmed redistribution licence for the official class files (see
  // resource-manifest.ts's p1-eval/p1-template entries and
  // CVPR_UNAVAILABLE_REASON) — both correctly render `unavailable` with no
  // action link. The post-training starter pack is a real, non-placeholder
  // ZIP this smoke test can exercise instead, proving the same ZIP-download
  // mechanism without depending on unshipped or withheld content.
  it("activates the Project 2 post-training starter pack ZIP at desktop and gets a real ZIP, not a 404", async () => {
    context = await browser.newContext({ viewport: { width: 1920, height: 1080 }, acceptDownloads: true });
    const page = await context.newPage();
    await page.goto(`http://localhost:${port}${BASE}/assessments/project-2/`);

    const link = page.locator('a.resource-card__action:has-text("Download starter pack")').first();
    await link.waitFor({ state: "visible" });

    const [download] = await Promise.all([context.waitForEvent("download"), link.click()]);
    expect(download.suggestedFilename()).toMatch(/\.zip$/);
    const downloadPath = await download.path();
    expect(downloadPath, "browser did not save the downloaded ZIP").toBeTruthy();
    const bytes = await readFile(downloadPath!);
    expect(bytes.subarray(0, 2).toString("latin1"), "not a ZIP signature").toBe("PK");

    await context.close();
  }, 30_000);

  it("activates the Project 1 Colab notebook at the phone marking viewport and gets real notebook JSON, not a 404", async () => {
    context = await browser.newContext({ viewport: { width: 390, height: 844 }, acceptDownloads: true });
    const page = await context.newPage();
    await page.goto(`http://localhost:${port}${BASE}/assessments/project-1/`);

    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth),
      "assessment page overflows horizontally at the phone viewport",
    ).toBe(true);

    const link = page.locator('a.resource-card__action:has-text("Download notebook")').first();
    await link.waitFor({ state: "visible" });
    const href = await link.getAttribute("href");

    const [response] = await Promise.all([page.waitForResponse(/p1-colab-starter\.ipynb$/), link.click()]);
    expect(response.status(), "notebook action returned an error status").toBe(200);

    // The click navigates the page itself to the notebook URL (a plain <a
    // href>, no `download` attribute), and Chromium's JSON viewer holds that
    // navigation response open rather than ever fully buffering its body —
    // `response.text()` on it hangs forever. A plain API request for the
    // same URL, made after the click has already proven the link activates
    // and returns 200, reads the body without that hang.
    const apiResponse = await context.request.get(`http://localhost:${port}${href}`);
    const notebook = JSON.parse(await apiResponse.text());
    expect(typeof notebook.nbformat).toBe("number");
    expect(Array.isArray(notebook.cells)).toBe(true);

    await context.close();
  }, 30_000);
});
