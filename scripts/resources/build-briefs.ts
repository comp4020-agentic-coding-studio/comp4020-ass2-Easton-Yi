#!/usr/bin/env node
// Generates the three printable brief PDFs from the already-built assessment
// pages, per docs/ASSIGNMENT_BRIEF.md's resource production sequence: PDF
// mirrors are generated last, from the completed pages and print stylesheet
// (see the @media print block in src/pages/assessments/[slug].astro).
//
// Requires `pnpm build` to have already produced `dist/`. Serves that build
// with `astro preview` and drives a headless Chromium against it.
import { spawn, spawnSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import { chromium } from "playwright";
import { gitOrigin, resolveDeployment } from "../pages-base.ts";

const PROJECTS: { slug: string; outPath: string }[] = [
  { slug: "project-1", outPath: "public/resources/project-1/project-1-brief.pdf" },
  { slug: "project-2", outPath: "public/resources/project-2/project-2-brief.pdf" },
  { slug: "project-3", outPath: "public/resources/project-3/project-3-brief.pdf" },
];

const PORT = 4322;
const HOST = "127.0.0.1";

function waitForServer(url: string, timeoutMs: number): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  return new Promise((resolve, reject) => {
    const attempt = () => {
      fetch(url)
        .then(() => resolve())
        .catch(() => {
          if (Date.now() > deadline) reject(new Error(`preview server did not come up at ${url}`));
          else setTimeout(attempt, 300);
        });
    };
    attempt();
  });
}

async function main(): Promise<void> {
  const preview = spawn("pnpm", ["preview", "--port", String(PORT), "--host", HOST], {
    stdio: ["ignore", "pipe", "pipe"],
  });
  preview.stdout?.on("data", (chunk) => process.stdout.write(`[preview] ${chunk}`));
  preview.stderr?.on("data", (chunk) => process.stderr.write(`[preview] ${chunk}`));

  const { base: basePath } = resolveDeployment(process.env, gitOrigin);
  const origin = `http://${HOST}:${PORT}`;

  try {
    await waitForServer(origin, 30_000);

    const browser = await chromium.launch();
    try {
      for (const { slug, outPath } of PROJECTS) {
        const page = await browser.newPage();
        const url = `${origin}${basePath}/assessments/${slug}/`;
        const response = await page.goto(url, { waitUntil: "networkidle" });
        if (!response || !response.ok()) {
          throw new Error(`failed to load ${url}: ${response?.status()}`);
        }
        await page.emulateMedia({ media: "print" });
        mkdirSync(outPath.slice(0, outPath.lastIndexOf("/")), { recursive: true });
        await page.pdf({
          path: outPath,
          format: "A4",
          printBackground: true,
          margin: { top: "18mm", bottom: "18mm", left: "16mm", right: "16mm" },
        });
        console.log(`✓ wrote ${outPath}`);
        await page.close();
      }
    } finally {
      await browser.close();
    }
  } finally {
    // astro preview 7.x always forks to a background daemon regardless of
    // stdio, so the spawned process may have already exited — stop the
    // daemon by pid via the CLI instead of `preview.kill()`.
    spawnSync("pnpm", ["preview", "stop"], { stdio: "ignore" });
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
