import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { gitOrigin, resolveDeployment } from "../scripts/pages-base.ts";

interface ApiNode {
  id: string;
  type: string;
  title: string;
  meta?: Record<string, unknown>;
}

interface CourseApi {
  course: { title: string };
  nodes: ApiNode[];
}

const api = JSON.parse(readFileSync(resolve("dist/api/index.json"), "utf8")) as CourseApi;
const nodesOfType = (type: string) => api.nodes.filter((node) => node.type === type);
const slugOf = (id: string) => id.replace(/^[a-z]+\//, "");

const { base } = resolveDeployment(process.env, gitOrigin);
const basePrefix = base === "/" ? "" : base;

const home = readFileSync(resolve("dist/index.html"), "utf8");
const schedule = readFileSync(resolve("dist/schedule/index.html"), "utf8");

const OLD_TITLE = "Training Language Models: A Budgeted Engineering Task";

function visibleText(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ");
}

describe("Home contract", () => {
  it("uses the exact approved course name as the document title and Hero heading", () => {
    expect(api.course.title).toBe("SLOP4225: Budgeted Language Model Training");
    const titleMatch = home.match(/<title>([^<]*)<\/title>/);
    expect(titleMatch?.[1]).toBe(api.course.title);
    const h1Match = home.match(/<h1[^>]*>([^<]*)<\/h1>/);
    expect(h1Match?.[1]).toBe(api.course.title);
  });

  it("uses the same course name for the navigation identity", () => {
    // The nav wordmark renders the site name on every page; check it agrees
    // with the course record rather than a disconnected literal.
    expect(visibleText(home)).toContain(api.course.title);
  });

  it("never renders the retired working title anywhere in the built site", () => {
    expect(home).not.toContain(OLD_TITLE);
    expect(schedule).not.toContain(OLD_TITLE);
  });

  it("orders Hero, then What you will do, then Who this is for, then the three-stage pathway", () => {
    const heroIndex = home.indexOf(api.course.title);
    const whatIndex = home.indexOf("What you will do");
    const whoIndex = home.indexOf("Who this is for");
    const stagesIndex = home.indexOf("The course in three stages");
    expect(heroIndex).toBeGreaterThanOrEqual(0);
    expect(whatIndex).toBeGreaterThan(heroIndex);
    expect(whoIndex).toBeGreaterThan(whatIndex);
    expect(stagesIndex).toBeGreaterThan(whoIndex);
  });

  it("renders exactly three Project cards linking to the three assessment pages with week ranges and weights", () => {
    const assessments = nodesOfType("assessments");
    expect(assessments.length).toBe(3);

    const expected = [
      { slug: "project-1", weeks: "Weeks 1–4", weight: 20 },
      { slug: "project-2", weeks: "Weeks 5–8", weight: 50 },
      { slug: "project-3", weeks: "Weeks 9–12", weight: 30 },
    ];

    for (const { slug, weeks, weight } of expected) {
      const href = `href="${basePrefix}/assessments/${slug}/"`;
      expect(home, `Home does not link ${slug}`).toContain(href);
      expect(home, `Home card for ${slug} is missing its week range`).toContain(weeks);
      expect(home, `Home card for ${slug} is missing its weight`).toContain(`${weight}%`);
    }
  });

  it("shows each project's approved deadline on its card", () => {
    expect(home).toContain("Sunday 21 March 2027, 23:59 AET");
    expect(home).toContain("Sunday 25 April 2027, 23:59 AET");
    expect(home).toContain("Sunday 23 May 2027, 23:59 AET");
  });

  it("renders exactly twelve Week cards", () => {
    const count = (home.match(/class="week-card"/g) ?? []).length;
    expect(count).toBe(12);
  });

  it("groups the Week cards into Weeks 1-4, 5-8, and 9-12", () => {
    for (const label of ["Weeks 1–4", "Weeks 5–8", "Weeks 9–12"]) {
      expect(home).toContain(label);
    }
  });

  it("shows the 5-11 April mid-semester break between Weeks 6 and 7", () => {
    const week6 = home.indexOf("Week 6");
    const breakIndex = home.indexOf("Mid-semester break, Monday 5");
    const week7 = home.indexOf("Week 7");
    expect(week6).toBeGreaterThan(-1);
    expect(breakIndex).toBeGreaterThan(week6);
    expect(week7).toBeGreaterThan(breakIndex);
    expect(home).toMatch(/Mid-semester break.*5.*11 April 2027/);
  });

  it("links every lecture and session from the Week cards, split 6 guided / 3 lab / 3 clinic", () => {
    const lectures = nodesOfType("lectures");
    const sessions = nodesOfType("sessions");
    expect(lectures.length).toBe(12);
    expect(sessions.length).toBe(12);

    for (const lecture of lectures) {
      expect(home, `Home does not link ${lecture.id}`).toContain(
        `href="${basePrefix}/lectures/${slugOf(lecture.id)}/"`,
      );
    }
    for (const session of sessions) {
      expect(home, `Home does not link ${session.id}`).toContain(
        `href="${basePrefix}/sessions/${slugOf(session.id)}/"`,
      );
    }

    const byType = (type: string) => sessions.filter((s) => s.meta?.sessionType === type).length;
    expect(byType("guided")).toBe(6);
    expect(byType("lab")).toBe(3);
    expect(byType("clinic")).toBe(3);
  });

  it("links Week 4, 8 and 12 milestones to their own assessment page", () => {
    const weekToAssessment: Array<[number, string]> = [
      [4, "project-1"],
      [8, "project-2"],
      [12, "project-3"],
    ];
    for (const [week, slug] of weekToAssessment) {
      const weekIndex = home.indexOf(`Week ${week} ·`);
      expect(weekIndex, `Home has no Week ${week} card`).toBeGreaterThan(-1);
      const nextWeekMarker = home.indexOf('class="week-card"', weekIndex + 1);
      const cardSlice = home.slice(weekIndex, nextWeekMarker === -1 ? undefined : nextWeekMarker);
      expect(cardSlice, `Week ${week} card does not link ${slug}`).toContain(
        `href="${basePrefix}/assessments/${slug}/"`,
      );
    }
  });

  it("shares its lecture and session links with the Schedule page (same underlying registry)", () => {
    const homeLectureLinks = [...home.matchAll(/href="([^"]*\/lectures\/week-\d+\/)"/g)]
      .map((m) => m[1])
      .sort();
    const scheduleLectureLinks = [...schedule.matchAll(/href="([^"]*\/lectures\/week-\d+\/)"/g)]
      .map((m) => m[1])
      .sort();
    expect(new Set(homeLectureLinks)).toEqual(new Set(scheduleLectureLinks));

    const homeSessionLinks = [...home.matchAll(/href="([^"]*\/sessions\/[^"]*\/)"/g)]
      .map((m) => m[1])
      .sort();
    const scheduleSessionLinks = [...schedule.matchAll(/href="([^"]*\/sessions\/[^"]*\/)"/g)]
      .map((m) => m[1])
      .sort();
    expect(new Set(homeSessionLinks)).toEqual(new Set(scheduleSessionLinks));
  });

  it("ends the twelve-week path with a link to the full schedule", () => {
    expect(home).toContain("Open the full schedule");
    expect(home).toContain(`href="${basePrefix}/schedule/"`);
  });

  it("keeps every internal Home href base-path safe", () => {
    const hrefs = [...home.matchAll(/href="(\/[^"]*)"/g)].map((m) => m[1]);
    expect(hrefs.length).toBeGreaterThan(0);
    for (const href of hrefs) {
      if (href.startsWith("//")) continue;
      if (basePrefix) {
        expect(href.startsWith(basePrefix), `href "${href}" missing base prefix`).toBe(true);
      }
    }
  });
});
