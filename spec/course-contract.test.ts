import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

interface ApiNode {
  id: string;
  type: string;
  meta?: Record<string, unknown>;
}

interface CourseApi {
  course: { code: string; session: string; year: number; startDate: string; endDate: string };
  nodes: ApiNode[];
}

const api = JSON.parse(readFileSync(resolve("dist/api/index.json"), "utf8")) as CourseApi;
const nodesOfType = (type: string) => api.nodes.filter((node) => node.type === type);

describe("course contract", () => {
  it("is SLOP4225, Semester 1 2027", () => {
    expect(api.course.code).toBe("SLOP4225");
    expect(api.course.session).toBe("Semester 1");
    expect(api.course.year).toBe(2027);
    expect(api.course.startDate).toContain("2027-02-22");
    expect(api.course.endDate).toContain("2027-05-23");
  });

  it("weights the three projects 20/50/30", () => {
    const assessments = nodesOfType("assessments");
    const weightOf = (slug: string) =>
      Number(assessments.find((a) => a.id === `assessments/${slug}`)?.meta?.weight ?? 0);
    expect(weightOf("project-1")).toBe(20);
    expect(weightOf("project-2")).toBe(50);
    expect(weightOf("project-3")).toBe(30);
  });

  it("publishes exactly twelve lectures", () => {
    expect(nodesOfType("lectures").length).toBe(12);
  });

  it("publishes exactly twelve sessions covering weeks 1-12", () => {
    const sessions = nodesOfType("sessions");
    const weeks = sessions.map((s) => Number(s.meta?.week)).sort((a, b) => a - b);
    expect(sessions.length).toBe(12);
    expect(weeks).toEqual(Array.from({ length: 12 }, (_, i) => i + 1));
  });

  it("splits sessions 3 formal labs / 3 drop-in clinics / 6 guided sessions", () => {
    const sessions = nodesOfType("sessions");
    const countOf = (sessionType: string) =>
      sessions.filter((s) => s.meta?.sessionType === sessionType).length;
    expect(countOf("lab")).toBe(3);
    expect(countOf("clinic")).toBe(3);
    expect(countOf("guided")).toBe(6);
  });

  it("has each project due at the end of its four-week block (weeks 4, 8, 12)", () => {
    const assessments = nodesOfType("assessments");
    const dueOf = (slug: string) => String(assessments.find((a) => a.id === `assessments/${slug}`)?.meta?.due);
    expect(dueOf("project-1")).toContain("2027-03-21");
    expect(dueOf("project-2")).toContain("2027-04-25");
    expect(dueOf("project-3")).toContain("2027-05-23");
  });

  it("links at least one lecture to a deck that actually built", () => {
    const lectures = nodesOfType("lectures");
    const withDeck = lectures.filter((l) => typeof l.meta?.slides === "string");
    expect(withDeck.length, "no lecture's meta.slides points at a deck").toBeGreaterThan(0);
    for (const lecture of withDeck) {
      const slidesPath = String(lecture.meta?.slides).replace(/^\/|\/$/g, "");
      expect(
        () => readFileSync(resolve("dist", slidesPath, "index.html")),
        `${lecture.id}'s deck did not build`,
      ).not.toThrow();
    }
  });
});
