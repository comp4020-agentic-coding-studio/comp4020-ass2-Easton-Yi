import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

interface ApiNode {
  id: string;
  type: string;
  meta?: Record<string, unknown>;
}

interface CourseApi {
  nodes: ApiNode[];
}

const api = JSON.parse(readFileSync(resolve("dist/api/index.json"), "utf8")) as CourseApi;
const assessments = api.nodes.filter((n) => n.type === "assessments");

const PROJECTS = [
  {
    slug: "project-1",
    reportFilename: "ass1_report.pdf",
    opens: "2027-03-01",
    due: "2027-03-21",
    reportMarks: 10,
    modelMarks: 10,
  },
  {
    slug: "project-2",
    reportFilename: "ass2_report.pdf",
    opens: "2027-03-22",
    due: "2027-04-25",
    reportMarks: 35,
    modelMarks: 15,
  },
  {
    slug: "project-3",
    reportFilename: "ass3_report.pdf",
    opens: "2027-04-26",
    due: "2027-05-23",
    reportMarks: 20,
    modelMarks: 10,
  },
];

const pageHtml = (slug: string) => readFileSync(resolve("dist/assessments", slug, "index.html"), "utf8");

// All three projects open in 2027, after today's build date, so every
// submission panel currently and correctly renders its "before-opening"
// copy (see SubmissionPanel.astro's `state` branch) rather than the upload
// instructions. Those instructions are still real, static template content,
// so this checks them directly in the component source rather than in a
// build snapshot that can only show one project state at a time.
const submissionPanelSource = readFileSync(resolve("src/components/SubmissionPanel.astro"), "utf8");

describe("assessment contract", () => {
  it("publishes exactly three assessment pages", () => {
    expect(assessments.map((a) => a.id).sort()).toEqual(
      PROJECTS.map((p) => `assessments/${p.slug}`).sort(),
    );
  });

  for (const project of PROJECTS) {
    describe(project.slug, () => {
      const html = pageHtml(project.slug);
      const node = assessments.find((a) => a.id === `assessments/${project.slug}`)!;

      it("has a brief, rubric, constraints, submission panel, and individual-work statement", () => {
        expect(node).toBeDefined();
        expect(html).toContain("Marking breakdown");
        expect(html).toContain("Individual work");
        expect(html).toContain("submission-panel");
        expect(html).toMatch(/AI Assistance Statement/);
      });

      it("renders exactly six primary resource entries", () => {
        const cards = html.match(/class="resource-card"/g) ?? [];
        expect(cards.length, `${project.slug} should have six resource cards`).toBe(6);
      });

      it("reports the correct report/model mark allocations", () => {
        expect(node.meta?.reportFilename).toBe(project.reportFilename);
        expect(html).toMatch(new RegExp(`Engineering report[\\s\\S]{0,40}${project.reportMarks}`));
        expect(html).toMatch(new RegExp(`Submitted model[\\s\\S]{0,40}${project.modelMarks}`));
      });

      it("has the correct open/due dates and report filename", () => {
        expect(String(node.meta?.opens)).toContain(project.opens);
        expect(String(node.meta?.due)).toContain(project.due);
        // The opening date is in 2027, after today's build, so the panel is
        // in its "before-opening" state and doesn't print the filename
        // literal yet (see SubmissionPanel.astro) — check the source data
        // and the page's frontmatter-derived meta instead.
        expect(node.meta?.reportFilename).toBe(project.reportFilename);
      });

      it("collects only the report upload and GitLab SHA in the submission panel, with no token field", () => {
        expect(html).toContain("submission-panel");
        expect(html).not.toMatch(/type="password"/);
        expect(html).not.toMatch(/name="[^"]*token[^"]*"/i);
        expect(html.toLowerCase()).not.toMatch(/paste.{0,20}(access )?token.{0,20}(here|below)/);
        expect(submissionPanelSource).toMatch(/final GitLab commit SHA/);
        expect(submissionPanelSource).toMatch(/Never paste a Hugging Face access token/);
        expect(submissionPanelSource).toMatch(/\{reportFilename\}/);
      });
    });
  }
});
