import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

interface ApiNode {
  id: string;
  type: string;
}

interface CourseApi {
  nodes: ApiNode[];
}

const api = JSON.parse(readFileSync(resolve("dist/api/index.json"), "utf8")) as CourseApi;
const assessments = api.nodes.filter((n) => n.type === "assessments");

/** Strip tags so a bolded mid-sentence word doesn't split a text match. */
function visibleText(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
}

const evalProtocolHtml = readFileSync(
  resolve("dist/assessments/evaluation-protocol/index.html"),
  "utf8",
);
const evalProtocolText = visibleText(evalProtocolHtml);
const assessmentIndexHtml = readFileSync(resolve("dist/assessments/index.html"), "utf8");
const policiesHtml = readFileSync(resolve("dist/policies/index.html"), "utf8");
const projectHtml = (slug: string) =>
  readFileSync(resolve("dist/assessments", slug, "index.html"), "utf8");

describe("evaluation protocol contract", () => {
  it("builds the canonical page", () => {
    expect(existsSync(resolve("dist/assessments/evaluation-protocol/index.html"))).toBe(true);
    expect(evalProtocolHtml).toMatch(/<h1[^>]*>\s*Evaluation Protocol/);
  });

  it("is not published as a fourth assessment collection entry", () => {
    expect(assessments.map((a) => a.id).sort()).toEqual(
      ["assessments/project-1", "assessments/project-2", "assessments/project-3"].sort(),
    );
    expect(assessments.some((a) => a.id.includes("evaluation-protocol"))).toBe(false);
  });

  it("is linked from the Assessment index, all three Projects, and Policies", () => {
    const evalHref = /href="[^"]*\/assessments\/evaluation-protocol\/"/;
    expect(assessmentIndexHtml, "Assessment index does not link the protocol").toMatch(evalHref);
    for (const slug of ["project-1", "project-2", "project-3"]) {
      expect(projectHtml(slug), `${slug} does not link the protocol`).toMatch(evalHref);
    }
    expect(policiesHtml, "Policies does not link the protocol").toMatch(evalHref);
  });

  it("states the 5 development-example / 10 tutor-prompt counts", () => {
    expect(evalProtocolText).toMatch(/[Ff]ive development examples/);
    expect(evalProtocolText).toMatch(/[Tt]en tutor-evaluation prompts/);
  });

  it("renders the complete reference-token-normalised perplexity equation", () => {
    expect(evalProtocolText).toMatch(/P\s*=\s*exp\(\s*\(\s*Σ.{0,10}NLL.{0,10}\)\s*\/\s*\(\s*Σ.{0,20}N.{0,20}ref.{0,10}\)\s*\)/);
  });

  it("renders all three PPL marking branches with the 25/50 thresholds and 0.1 decay constant", () => {
    expect(evalProtocolText).toMatch(/1,\s*if P ≤ 25/);
    expect(evalProtocolText).toMatch(/exp\[−0\.1\s*×\s*\(P\s*−\s*25\)\],\s*if 25 &lt; P &lt; 50/);
    expect(evalProtocolText).toMatch(/0,\s*if P ≥ 50/);
  });

  it("distinguishes PPL as two thirds and task-specific review as the remaining third", () => {
    expect(evalProtocolText).toMatch(/PPL contributes.{0,20}two thirds/);
    expect(evalProtocolText).toMatch(/task-specific performance contributes the remaining third/);
  });

  it("lists all five shared rating anchors", () => {
    expect(evalProtocolText).toMatch(/4\s*—\s*Strong/);
    expect(evalProtocolText).toMatch(/3\s*—\s*Effective/);
    expect(evalProtocolText).toMatch(/2\s*—\s*Mixed/);
    expect(evalProtocolText).toMatch(/1\s*—\s*Weak/);
    expect(evalProtocolText).toMatch(/0\s*—\s*Absent\/invalid/);
  });

  it("states three blind raters, fourth-rater adjudication, and median aggregation", () => {
    expect(evalProtocolText).toMatch(/three trained.{0,20}blind raters/);
    expect(evalProtocolText).toMatch(/three or more.{0,10}points/);
    expect(evalProtocolText).toMatch(/fourth blind rater.{0,10}adjudicates/);
    expect(evalProtocolText).toMatch(/median of all valid ratings/);
  });

  it("gives all four Project/Track dimension sets with their published weights", () => {
    expect(evalProtocolText).toMatch(/Connection to the supplied prefix.{0,10}35%/);
    expect(evalProtocolText).toMatch(/Recognisable target behaviour.{0,10}35%/);
    expect(evalProtocolText).toMatch(/Objective satisfaction of the declared condition.{0,10}40%/);
    expect(evalProtocolText).toMatch(/Exact final-answer accuracy.{0,10}55%/);
  });

  it("states the review is criterion-referenced rather than class-ranked", () => {
    expect(evalProtocolText).toMatch(/criterion-referenced rather than comparative/);
    expect(evalProtocolText).toMatch(/students are not\s*ranked against one another/);
  });
});
