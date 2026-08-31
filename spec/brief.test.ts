import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

interface ApiNode {
  id: string;
  type: string;
  meta?: Record<string, unknown>;
  related?: string[];
}

interface CourseApi {
  course: { code: string };
  nodes: ApiNode[];
}

// The last three digits were assigned when this repo was provisioned and are
// not ours to change; only the level digit (the first) is.
const ORIGINAL_CODE_DIGITS = "225";

const api = JSON.parse(readFileSync(resolve("dist/api/index.json"), "utf8")) as CourseApi;
const nodesOfType = (type: string) => api.nodes.filter((node) => node.type === type);

describe("A2 brief", () => {
  it("keeps the SLOPxxxx code's original three digits", () => {
    expect(api.course.code).toMatch(/^SLOP[123468]\d{3}$/);
    expect(api.course.code.endsWith(ORIGINAL_CODE_DIGITS)).toBe(true);
  });

  it("runs across twelve dated teaching weeks", () => {
    const sessions = nodesOfType("sessions");
    const weeks = sessions.map((s) => s.meta?.week).sort((a, b) => Number(a) - Number(b));
    expect(sessions.length, "expected 12 sessions, one per teaching week").toBe(12);
    expect(weeks).toEqual(Array.from({ length: 12 }, (_, i) => i + 1));
  });

  it("links at least one lecture to a deck that actually built", () => {
    const lectures = nodesOfType("lectures");
    const withDeck = lectures.filter((l) => typeof l.meta?.slides === "string");
    expect(withDeck.length, "no lecture's meta.slides points at a deck").toBeGreaterThan(0);
    for (const lecture of withDeck) {
      const slidesPath = String(lecture.meta?.slides).replace(/^\/|\/$/g, "");
      expect(() => readFileSync(resolve("dist", slidesPath, "index.html")), `${lecture.id}'s deck did not build`).not.toThrow();
    }
  });

  it("adds assessment weights up to 100%", () => {
    const totalWeight = nodesOfType("assessments").reduce(
      (sum, a) => sum + Number(a.meta?.weight ?? 0),
      0,
    );
    expect(totalWeight).toBe(100);
  });
});
