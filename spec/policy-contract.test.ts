import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const policiesHtml = readFileSync(resolve("dist/policies/index.html"), "utf8");
const assessmentHtml = (slug: string) => readFileSync(resolve("dist/assessments", slug, "index.html"), "utf8");

describe("policy contract", () => {
  it("has exactly eleven numbered policy sections", () => {
    const headings = policiesHtml.match(/<h2[^>]*>\s*\d+\.\s/g) ?? [];
    expect(headings.length).toBe(11);
  });

  it("states the 32M design target and 33.6M absolute maximum", () => {
    expect(policiesHtml).toMatch(/32M/);
    expect(policiesHtml).toMatch(/33\.6M/);
  });

  it("states the per-project compute and FLOP limits", () => {
    expect(policiesHtml).toMatch(/24 T4-equivalent GPU-hours/);
    expect(policiesHtml).toMatch(/4\.0.{0,3}10.{0,12}17/);
    expect(policiesHtml).toMatch(/18 hours and 2\.5.{0,3}10.{0,12}17/);
    expect(policiesHtml).toMatch(/12 hours and 1\.5.{0,3}10.{0,12}17/);
  });

  it("gives each project's main report a page limit of 15/20/20 CVPR pages", () => {
    expect(assessmentHtml("project-1")).toMatch(/15 CVPR pages/);
    expect(assessmentHtml("project-2")).toMatch(/20 CVPR pages/);
    expect(assessmentHtml("project-3")).toMatch(/20 CVPR pages/);
  });

  it("supplies five development examples and ten tutor-evaluation prompts", () => {
    expect(policiesHtml).toMatch(/five public development examples/);
    expect(policiesHtml).toMatch(/ten public tutor-evaluation prompts/);
  });

  it("defines continuation/answer-only PPL with the 25/50 thresholds and the 0.1 decay constant", () => {
    for (const slug of ["project-1", "project-2", "project-3"]) {
      const html = assessmentHtml(slug);
      expect(html, `${slug} missing PPL thresholds`).toMatch(/P ≤ 25/);
      expect(html, `${slug} missing PPL upper threshold`).toMatch(/P ≥ 50/);
      expect(html, `${slug} missing the 0.1 decay constant`).toMatch(/exp\(-0\.1/);
    }
  });

  it("documents Project 3 Track B and the alternative Track A proposal rule", () => {
    const html = assessmentHtml("project-3");
    expect(html).toMatch(/Track B/);
    expect(html).toMatch(/Alternative Track A proposal/);
    expect(html).toMatch(/proposal\.md/);
  });

  it("never asks for an HF access token to be submitted", () => {
    expect(policiesHtml).toMatch(/never submit an HF access token/);
    for (const slug of ["project-1", "project-2", "project-3"]) {
      const html = assessmentHtml(slug);
      expect(html.toLowerCase()).not.toMatch(/enter your (hugging ?face|hf) (access )?token/);
    }
  });
});
