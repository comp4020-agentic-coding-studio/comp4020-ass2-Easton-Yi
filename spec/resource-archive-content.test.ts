// Semantic checks on what the resource archives actually contain, not just
// that a file with the right extension exists — see docs/ASSIGNMENT_BRIEF.md
// and CLAUDE.md's "Content-completeness harness": a valid extension or file
// signature is not evidence a teaching resource is complete. These
// complement (never replace) the existing structural checks in
// resource-contract.test.ts and resource-download.test.ts, and the browser
// smoke test in resource-download-browser.test.ts.
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { readZipEntry, listZipEntries } from "../scripts/resources/zip.ts";
import { resourceManifest, resourceState } from "../src/data/resource-manifest";

const PUBLIC_DIR = resolve("public/resources");
const PREVIEW_DIST = resolve("dist-preview-resources");
const BASE = "/comp4020-ass2-Easton-Yi";
const AFTER_ALL_RELEASES = new Date("2027-06-01T00:00:00+10:00");

function zipBuf(relPath: string): Buffer {
  return readFileSync(resolve(PUBLIC_DIR, relPath));
}

function readJson<T>(buf: Buffer, name: string): T {
  return JSON.parse(readZipEntry(buf, name).toString("utf8")) as T;
}

function readText(buf: Buffer, name: string): string {
  return readZipEntry(buf, name).toString("utf8");
}

interface ResourceManifestJson {
  title: string;
  version: string;
  generatedFiles: string[];
  licence: string;
  excludedMaterial: string;
}

const ARCHIVES = {
  p2Pack: "project-2/p2-post-training-pack.zip",
  p3Pack: "project-3/p3-finetuning-pack.zip",
} as const;

// The CVPR-style report template and all three per-project evaluation-kit
// archives are withheld: no confirmed CVPR class-file redistribution licence,
// and no real source-separated tutor-evaluation prompt sets yet (see
// src/data/resource-manifest.ts's unavailableReason text and
// scripts/resources/build.ts's disabled buildZip calls). Their generator
// functions still exist in build.ts (disabled, not deleted) so they can be
// re-enabled once the real dependency lands, but no file may exist under
// public/ in the meantime — CLAUDE.md's content-completeness harness
// requires leaving a genuinely unavailable resource unavailable rather than
// shipping a partial/incomplete archive.
const WITHHELD_ARCHIVE_PATHS = [
  "shared/cvpr-report-template.zip",
  "project-1/p1-evaluation-kit.zip",
  "project-2/p2-evaluation-kit.zip",
  "project-3/p3-evaluation-kit.zip",
];

describe("resource archive semantic content", () => {
  it("the withheld CVPR template and all three evaluation-kit archives are absent from public/", () => {
    for (const relPath of WITHHELD_ARCHIVE_PATHS) {
      expect(existsSync(resolve(PUBLIC_DIR, relPath)), `${relPath} should not exist — it is withheld`).toBe(false);
    }
  });

  describe("archive README and manifest agreement with actual contents", () => {
    for (const [key, path] of Object.entries(ARCHIVES)) {
      it(`${key}: RESOURCE_MANIFEST.json's generatedFiles matches the zip's real entries`, () => {
        const buf = zipBuf(path);
        const names = new Set(listZipEntries(buf));
        const manifest = readJson<ResourceManifestJson>(buf, "RESOURCE_MANIFEST.json");
        const expected = new Set([...manifest.generatedFiles, "RESOURCE_MANIFEST.json"]);
        expect([...names].sort(), `${key} zip entries vs its own manifest`).toEqual([...expected].sort());
      });

      it(`${key}: README documents every generated file the archive actually ships`, () => {
        const buf = zipBuf(path);
        const manifest = readJson<ResourceManifestJson>(buf, "RESOURCE_MANIFEST.json");
        const readme = readText(buf, "README.md");
        for (const file of manifest.generatedFiles) {
          if (file === "README.md") continue;
          expect(readme, `${key} README does not mention ${file}`).toContain(file);
        }
      });
    }
  });

  describe("notebook structure: real, connected workflow sections", () => {
    interface NotebookCell {
      cell_type: "markdown" | "code";
      source: string[];
    }
    interface NotebookJson {
      nbformat: number;
      cells: NotebookCell[];
    }

    function cellText(cell: NotebookCell): string {
      return cell.source.join("");
    }

    function assertWorkflowSections(label: string, nb: NotebookJson, requiredHeadings: RegExp[]): void {
      expect(Array.isArray(nb.cells) && nb.cells.length > 0, `${label} notebook has no cells`).toBe(true);
      // Some section markers live in a markdown heading, others in the first
      // code cell's own leading comment (e.g. "# 1. Environment check") — so
      // match against every cell's text, not markdown cells alone.
      const allText = nb.cells.map(cellText).join("\n");
      for (const heading of requiredHeadings) {
        expect(allText, `${label} notebook is missing a section matching ${heading}`).toMatch(heading);
      }
      const codeCells = nb.cells.filter((c) => c.cell_type === "code");
      expect(codeCells.length, `${label} notebook should have several connected code cells`).toBeGreaterThanOrEqual(
        6,
      );
      for (const cell of codeCells) {
        expect(cellText(cell).trim().length, `${label} notebook has an empty code cell`).toBeGreaterThan(0);
      }
    }

    it("Project 1 pre-training notebook covers env check through evaluation", () => {
      const nb = JSON.parse(
        readFileSync(resolve(PUBLIC_DIR, "project-1/p1-colab-starter.ipynb"), "utf8"),
      ) as NotebookJson;
      assertWorkflowSections("Project 1", nb, [
        /## 1\. Data/,
        /## 2\. Model/,
        /Parameter preflight/,
        /## 3\. Training loop, checkpointing, and sampling/,
        /## 4\. Evaluation/,
      ]);
    });

    it("Project 2 post-training notebook covers env check through evaluation, naming its GitLab-owned boundary", () => {
      const buf = zipBuf(ARCHIVES.p2Pack);
      const nb = readJson<NotebookJson>(buf, "p2-colab-starter.ipynb");
      assertWorkflowSections("Project 2", nb, [
        /1\. Environment check/,
        /2\. Starting checkpoint and parameter preflight/,
        /3\. Data loading and validation/,
        /4\. Training: choose one supported recipe/,
        /5\. Checkpoint save and fresh-process reload/,
        /6\. Evaluation and sampling/,
        /Limitations and external dependencies/,
      ]);
    });

    it("Project 3 fine-tuning notebook covers env check through task inference, naming its GitLab-owned boundary", () => {
      const buf = zipBuf(ARCHIVES.p3Pack);
      const nb = readJson<NotebookJson>(buf, "p3-sft-starter.ipynb");
      assertWorkflowSections("Project 3", nb, [
        /1\. Environment check/,
        /2\. Starting checkpoint and parameter preflight/,
        /3\. Data loading, validation, and masking/,
        /4\. Training/,
        /5\. Checkpoint save, fresh-process reload, and baseline comparison/,
        /6\. Evaluation and task inference/,
        /Limitations and external dependencies/,
      ]);
    });
  });

  describe("downloadable files and unavailable-state action links (post-release preview build)", () => {
    const projectHtml = (slug: string) => readFileSync(resolve(PREVIEW_DIST, "assessments", slug, "index.html"), "utf8");

    it("every available local-download action resolves to a base-path-safe href that exists in the build", () => {
      for (const slug of ["project-1", "project-2", "project-3"]) {
        const html = projectHtml(slug);
        const actionHrefs = [...html.matchAll(/data-resource-id="([^"]+)"[^]*?<a class="resource-card__action" href="([^"]+)"/g)];
        for (const [, id, href] of actionHrefs) {
          const entry = resourceManifest.find((e) => e.id === id)!;
          if (entry.kind !== "local-download") continue;
          expect(href.startsWith(BASE), `${id}'s action href is not base-path-safe: ${href}`).toBe(true);
          const filePath = resolve(PREVIEW_DIST, href.slice(BASE.length + 1));
          expect(readFileSync(filePath).length, `${id}'s href does not resolve to a real built file`).toBeGreaterThan(
            0,
          );
        }
      }
    });

    it("resources with no real backing file render as unavailable with no active action link", () => {
      const unavailableIds = resourceManifest
        .filter((e) => resourceState(e, AFTER_ALL_RELEASES) === "unavailable")
        .map((e) => e.id);
      expect(
        unavailableIds,
        "expected the three eval-kit entries and the three withheld CVPR template entries to still be unavailable",
      ).toEqual(
        expect.arrayContaining([
          "p1-eval",
          "p2-eval",
          "p3-eval",
          "p1-template",
          "p2-template",
          "p3-template",
        ]),
      );

      for (const slug of ["project-1", "project-2", "project-3"]) {
        const html = projectHtml(slug);
        for (const id of unavailableIds.filter((i) => i.startsWith(`p${slug.slice(-1)}-`))) {
          const cardMatch = html.match(new RegExp(`<li class="resource-card" data-resource-id="${id}"[^]*?</li>`));
          expect(cardMatch, `${id} card not found on ${slug}`).toBeTruthy();
          expect(cardMatch![0], `${id} is unavailable but still renders an action link`).not.toMatch(
            /resource-card__action/,
          );
          expect(cardMatch![0], `${id} card should state why it is unavailable`).toMatch(/Not yet available/);
        }
      }
    });
  });
});
