import { readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { gitOrigin, resolveDeployment } from "../scripts/pages-base.ts";

interface ApiNode {
  id: string;
  type: string;
  meta?: Record<string, unknown>;
}

interface CourseApi {
  course: { title: string };
  nodes: ApiNode[];
}

const api = JSON.parse(readFileSync(resolve("dist/api/index.json"), "utf8")) as CourseApi;
const nodesOfType = (type: string) => api.nodes.filter((node) => node.type === type);

// Same derivation astro.config.mjs uses at build time --- never hardcode the
// base, or this test stops meaning anything the moment the repo is renamed.
const { base } = resolveDeployment(process.env, gitOrigin);
const basePrefix = base === "/" ? "" : base;

const distHtml = (path: string) => readFileSync(resolve("dist", path, "index.html"), "utf8");

/** Strip script/style/tags to get only what a reader actually sees --- an
 *  attribute like `placeholder="Search..."` on the theme's search input must
 *  not trip a check meant for student-visible prose. */
function visibleText(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ");
}

function allDistHtmlFiles(): string[] {
  const out: string[] = [];
  const walk = (dir: string) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = resolve(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith(".html")) out.push(full);
    }
  };
  walk(resolve("dist"));
  return out;
}

const sessionTypeLabels: Record<string, string> = {
  guided: "Guided session",
  lab: "Formal lab",
  clinic: "Drop-in clinic",
};

describe("Stage 1 site shell", () => {
  describe("Schedule", () => {
    const html = distHtml("schedule");
    const text = visibleText(html);

    it("shows all twelve teaching weeks", () => {
      for (let week = 1; week <= 12; week += 1) {
        expect(html, `week ${week} row missing`).toMatch(new RegExp(`<td[^>]*>${week}</td>`));
      }
    });

    it("shows the 5-11 April 2027 mid-semester break", () => {
      expect(text).toMatch(/Mid-semester break.*5.*11 April 2027/);
    });

    it("shows all three project deadlines", () => {
      expect(text).toMatch(/Project 1 due 21 March 2027/);
      expect(text).toMatch(/Project 2 due 25 April 2027/);
      expect(text).toMatch(/Project 3 due 23 May 2027/);
    });

    it("links every scheduled lecture and session to its own page", () => {
      for (const lecture of nodesOfType("lectures")) {
        const slug = lecture.id.replace(/^lectures\//, "");
        expect(html, `schedule does not link ${lecture.id}`).toContain(
          `href="${basePrefix}/lectures/${slug}/"`,
        );
      }
      for (const session of nodesOfType("sessions")) {
        const slug = session.id.replace(/^sessions\//, "");
        expect(html, `schedule does not link ${session.id}`).toContain(
          `href="${basePrefix}/sessions/${slug}/"`,
        );
      }
    });

    it("links every project due-week milestone to its assessment page", () => {
      for (const assessment of nodesOfType("assessments")) {
        const slug = assessment.id.replace(/^assessments\//, "");
        expect(html, `schedule does not link ${assessment.id}`).toContain(
          `href="${basePrefix}/assessments/${slug}/"`,
        );
      }
    });
  });

  describe("Home", () => {
    const html = distHtml(".");

    it("shows the full course title as visible page text, not only as metadata/alt/artwork", () => {
      const title = api.course.title;
      expect(title, "course API has no title to check against").toBeTruthy();
      const h1Match = html.match(/<h1[^>]*>([^<]*)<\/h1>/);
      expect(h1Match?.[1], "Home has no <h1> carrying the full course title").toBe(title);
    });
  });

  describe("Forbidden starter/implementation prose", () => {
    const bannedPatterns: Array<[RegExp, string]> = [
      [/STARTER_CONTENT/i, "STARTER_CONTENT"],
      [/\bTODO\b/, "TODO"],
      [/\bTBC\b/, "TBC"],
      [/\bplaceholder\b/i, "placeholder"],
      [/populate later/i, "populate later"],
      [/is populated once/i, "is populated once"],
      [/site-config\.ts/i, "site-config.ts"],
      [/the course claims/i, "the course claims"],
      [/internal collection/i, "internal collection"],
      [/`?related:`?\s+connects/i, "related: frontmatter mechanics"],
      [/how many (lectures|sessions|pages)/i, "how many lectures/sessions the course provides"],
    ];

    it("is absent from every rendered page's visible text", () => {
      for (const file of allDistHtmlFiles()) {
        const text = visibleText(readFileSync(file, "utf8"));
        for (const [pattern, label] of bannedPatterns) {
          expect(pattern.test(text), `${file} contains forbidden "${label}" prose`).toBe(false);
        }
      }
    });
  });

  describe("Session page titles agree with sessionType", () => {
    for (const session of nodesOfType("sessions")) {
      const slug = session.id.replace(/^sessions\//, "");
      const sessionType = String(session.meta?.sessionType);
      const week = session.meta?.week;
      const expectedLabel = sessionTypeLabels[sessionType];

      it(`${session.id} (week ${week}, ${sessionType}) titles itself "${expectedLabel}"`, () => {
        expect(expectedLabel, `unknown sessionType "${sessionType}" on ${session.id}`).toBeTruthy();
        const html = distHtml(`sessions/${slug}`);
        const h1Match = html.match(/<h1[^>]*>([^<]*)<\/h1>/);
        expect(h1Match?.[1], `${session.id} has no <h1>`).toMatch(
          new RegExp(`^Week ${week} ${expectedLabel}:`),
        );
        // Every other sessionType's label must NOT appear in this heading ---
        // guards against a stale hardcoded label surviving a future refactor.
        for (const [otherType, otherLabel] of Object.entries(sessionTypeLabels)) {
          if (otherType === sessionType) continue;
          expect(h1Match?.[1]?.startsWith(`Week ${week} ${otherLabel}:`)).toBe(false);
        }
      });
    }
  });

  describe("Base-path safety of the new/changed pages", () => {
    const pagesToCheck = ["schedule", ".", "lectures", "sessions"];

    it("every internal href on the changed pages carries the resolved base prefix", () => {
      for (const page of pagesToCheck) {
        const html = distHtml(page);
        const hrefs = [...html.matchAll(/href="(\/[^"]*)"/g)].map((m) => m[1]);
        for (const href of hrefs) {
          // External absolute URLs, in-page fragments, and icon-sprite refs
          // are not site-internal links and are exempt from the base check.
          if (href.startsWith("//")) continue;
          if (basePrefix && !href.startsWith(basePrefix)) {
            expect.fail(`${page}: internal href "${href}" is missing base prefix "${basePrefix}"`);
          }
        }
        expect(hrefs.length, `${page} has no internal links to check`).toBeGreaterThan(0);
      }
    });

    it("never doubles the base prefix", () => {
      for (const page of pagesToCheck) {
        const html = distHtml(page);
        if (!basePrefix) continue;
        const doubled = `${basePrefix}${basePrefix}`;
        expect(html, `${page} doubles the base prefix`).not.toContain(doubled);
      }
    });
  });
});
