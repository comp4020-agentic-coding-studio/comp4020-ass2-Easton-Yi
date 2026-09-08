// Semantic checks on what the resource archives actually contain, not just
// that a file with the right extension exists — see docs/ASSIGNMENT_BRIEF.md
// and CLAUDE.md's "Content-completeness harness": a valid extension or file
// signature is not evidence a teaching resource is complete. These
// complement (never replace) the existing structural checks in
// resource-contract.test.ts and resource-download.test.ts, and the browser
// smoke test in resource-download-browser.test.ts.
import { readFileSync } from "node:fs";
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

// Banned filler content is checked against the actual student-facing data
// records (dev/track example field values) — not README/manifest prose,
// which legitimately and honestly uses words like "pending"/"placeholder"
// to *disclose* what is withheld, per the Stage 3 instruction to state that
// dependency rather than hide it.
const FAKE_CONTENT_PATTERN = /\bplaceholder\b|\bTODO\b|\bTBC\b|\bTBD\b|\bTBA\b|lorem ipsum/i;

function assertNoFakeContent(label: string, record: Record<string, unknown>): void {
  for (const [key, value] of Object.entries(record)) {
    if (typeof value !== "string") continue;
    expect(value, `${label}.${key} looks like fake filler content: "${value}"`).not.toMatch(FAKE_CONTENT_PATTERN);
  }
}

// Fields that would indicate a withheld tutor-evaluation ground truth has
// leaked into a public pack. Tutor-evaluation items must ship as a single
// input string only (see evaluation-protocol.mdx's "Public evaluation
// layers"): the reference continuation/answer stays withheld until the
// teaching team scores the frozen submission.
const TUTOR_GROUND_TRUTH_KEYS = ["continuation", "answer", "reference", "target", "completion"];

const ARCHIVES = {
  cvpr: "shared/cvpr-report-template.zip",
  p1Eval: "project-1/p1-evaluation-kit.zip",
  p2Pack: "project-2/p2-post-training-pack.zip",
  p2Eval: "project-2/p2-evaluation-kit.zip",
  p3Pack: "project-3/p3-finetuning-pack.zip",
  p3Eval: "project-3/p3-evaluation-kit.zip",
} as const;

describe("resource archive semantic content", () => {
  describe("development-record counts and required fields", () => {
    it("Project 1 pack has exactly five development records, each with prompt and continuation", () => {
      const buf = zipBuf(ARCHIVES.p1Eval);
      const devExamples = readJson<Array<Record<string, unknown>>>(buf, "dev_examples.json");
      expect(devExamples.length, "Project 1 dev_examples.json should have exactly five records").toBe(5);
      for (const record of devExamples) {
        expect(typeof record.prompt === "string" && record.prompt.trim().length > 0, "missing/empty prompt").toBe(
          true,
        );
        expect(
          typeof record.continuation === "string" && record.continuation.trim().length > 0,
          "missing/empty reference continuation",
        ).toBe(true);
        assertNoFakeContent(`p1 dev ${record.id}`, record);
      }
    });

    it("Project 2 pack has exactly five development records, each with opening and a genuine reference continuation", () => {
      const buf = zipBuf(ARCHIVES.p2Eval);
      const devExamples = readJson<Array<Record<string, unknown>>>(buf, "dev_examples.json");
      expect(devExamples.length, "Project 2 dev_examples.json should have exactly five records").toBe(5);
      for (const record of devExamples) {
        expect(typeof record.opening === "string" && record.opening.trim().length > 0, "missing/empty opening").toBe(
          true,
        );
        expect(
          typeof record.continuation === "string" && record.continuation.trim().length > 0,
          "missing/empty reference continuation (a style label alone is not ground truth)",
        ).toBe(true);
        assertNoFakeContent(`p2 dev ${record.id}`, record);
      }
    });

    it("Project 3 provides five development examples total, split across both tracks", () => {
      // Per docs/ASSIGNMENT_BRIEF.md ("five worked development examples and
      // ten tutor-evaluation inputs") and docs/CONTENT_SOURCE.md's Project 3
      // resource table ("Five development examples, ten tutor inputs"):
      // both canonical sources use a singular count with no per-track
      // qualifier, so this is five total, not five per track.
      const buf = zipBuf(ARCHIVES.p3Eval);
      const devA = readJson<Array<Record<string, unknown>>>(buf, "dev_examples_track_a.json");
      const devB = readJson<Array<Record<string, unknown>>>(buf, "dev_examples_track_b.json");
      expect(devA.length + devB.length, "Project 3 total development examples should be five").toBe(5);
      expect(devA.length, "Track A development example count").toBe(3);
      expect(devB.length, "Track B development example count").toBe(2);

      for (const record of devA) {
        expect(typeof record.input === "string" && record.input.trim().length > 0, "Track A missing input").toBe(
          true,
        );
        expect(
          typeof record.condition === "string" && record.condition.trim().length > 0,
          "Track A missing declared condition",
        ).toBe(true);
        expect(
          typeof record.reference === "string" && record.reference.trim().length > 0,
          "Track A missing reference continuation",
        ).toBe(true);
        assertNoFakeContent(`p3 devA ${record.id}`, record);
      }
      for (const record of devB) {
        expect(typeof record.prompt === "string" && record.prompt.trim().length > 0, "Track B missing prompt").toBe(
          true,
        );
        expect(typeof record.answer === "string" && record.answer.trim().length > 0, "Track B missing answer").toBe(
          true,
        );
        assertNoFakeContent(`p3 devB ${record.id}`, record);
      }
    });
  });

  describe("tutor-evaluation inputs: exactly ten where present, honestly pending otherwise", () => {
    const cases = [
      { label: "Project 1", archive: ARCHIVES.p1Eval, filenames: ["tutor_prompts.json"] },
      { label: "Project 2", archive: ARCHIVES.p2Eval, filenames: ["tutor_openings.json"] },
      { label: "Project 3", archive: ARCHIVES.p3Eval, filenames: ["tutor_inputs.json"] },
    ];

    for (const { label, archive, filenames } of cases) {
      it(`${label}: a shipped tutor-input file has exactly ten entries and no withheld ground truth`, () => {
        const buf = zipBuf(archive);
        const names = listZipEntries(buf);
        const tutorFile = filenames.find((name) => names.includes(name));

        if (!tutorFile) {
          // No real teaching-team corpus is available yet (see
          // docs/ASSIGNMENT_BRIEF.md's "Unresolved decisions"): the pack must
          // say so honestly rather than shipping fabricated prompts or
          // silently pretending the pack is complete.
          const readme = readText(buf, "README.md");
          const manifest = readJson<ResourceManifestJson>(buf, "RESOURCE_MANIFEST.json");
          expect(readme, `${label} README should disclose the pending tutor-input dependency`).toMatch(
            /pending|not yet available/i,
          );
          expect(
            manifest.excludedMaterial,
            `${label} manifest should name the tutor-input dependency in excludedMaterial`,
          ).toMatch(/tutor/i);
          return;
        }

        const entries = readJson<Array<string | Record<string, unknown>>>(buf, tutorFile);
        expect(entries.length, `${label} tutor-input file should have exactly ten entries`).toBe(10);
        for (const entry of entries) {
          if (typeof entry === "string") {
            expect(entry.trim().length, `${label} tutor input string is empty`).toBeGreaterThan(0);
            continue;
          }
          for (const bannedKey of TUTOR_GROUND_TRUTH_KEYS) {
            expect(
              Object.prototype.hasOwnProperty.call(entry, bannedKey),
              `${label} tutor-input record must not carry a "${bannedKey}" ground-truth field`,
            ).toBe(false);
          }
        }
      });
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
      expect(unavailableIds, "expected the three eval-kit entries to still be unavailable").toEqual(
        expect.arrayContaining(["p1-eval", "p2-eval", "p3-eval"]),
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
