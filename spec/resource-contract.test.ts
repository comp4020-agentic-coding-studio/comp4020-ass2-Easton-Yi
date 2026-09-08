import { existsSync, readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  RESOURCE_GROUP_ORDER,
  resourceManifest,
  resourceState,
  resourcesForProject,
  type ResourceEntry,
} from "../src/data/resource-manifest";

const bannedActionPatterns = [/^#$/, /^https?:\/\//i, /^\/[^/]/];

interface ApiNode {
  id: string;
  type: string;
  meta?: Record<string, unknown>;
}

interface CourseApi {
  nodes: ApiNode[];
}

const api = JSON.parse(readFileSync(resolve("dist/api/index.json"), "utf8")) as CourseApi;

describe("resource contract", () => {
  it("has exactly six entries per project, each with a unique ID and an approved group", () => {
    for (const project of [1, 2, 3] as const) {
      const entries = resourcesForProject(project);
      expect(entries.length, `project ${project} should have six resource entries`).toBe(6);
      for (const entry of entries) {
        expect(RESOURCE_GROUP_ORDER, `${entry.id} has an unapproved group`).toContain(entry.group);
      }
    }
    const ids = resourceManifest.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("never uses a placeholder, fabricated, empty, root-absolute, or raw-URL action", () => {
    for (const entry of resourceManifest) {
      expect(entry.actionLabel.trim().length, `${entry.id} has an empty action label`).toBeGreaterThan(0);
      for (const pattern of bannedActionPatterns) {
        expect(entry.actionLabel, `${entry.id} action label looks like a raw URL/placeholder`).not.toMatch(
          pattern,
        );
      }
      if (entry.localPath) {
        expect(entry.localPath.startsWith("/"), `${entry.id} localPath must not start with /`).toBe(false);
      }
      if (entry.externalUrl) {
        expect(entry.externalUrl, `${entry.id} externalUrl must not be a placeholder`).not.toBe("#");
      }
    }
  });

  it("keeps state/href invariants consistent with resourceState", () => {
    const now = new Date();
    for (const entry of resourceManifest) {
      const state = resourceState(entry, now);
      if (state === "available") {
        expect(entry.kind, `${entry.id} is available but not a local download`).toBe("local-download");
        expect(entry.localPath, `${entry.id} is available but has no localPath`).toBeTruthy();
      }
      if (state === "access-controlled") {
        expect(entry.externalUrl, `${entry.id} is access-controlled but has no externalUrl`).toBeTruthy();
      }
      if (state === "unavailable") {
        expect(entry.unavailableReason, `${entry.id} is unavailable but has no reason`).toBeTruthy();
      }
    }
  });

  it("names the same withheld CVPR template on all three projects, with no stored file yet", () => {
    // The official CVPR author-kit class files have no confirmed
    // redistribution licence (see resource-manifest.ts's
    // CVPR_UNAVAILABLE_REASON and build.ts's disabled buildZip call), so all
    // three entries deliberately carry no localPath rather than pointing at
    // an interim substitute — resourceState() must report them unavailable
    // regardless of release date.
    const now = new Date();
    const templateEntries = resourceManifest.filter((e: ResourceEntry) => e.title === "CVPR Report Template");
    expect(templateEntries.length).toBe(3);
    for (const entry of templateEntries) {
      expect(entry.localPath, `${entry.id} should have no stored file while the licence is unconfirmed`).toBeUndefined();
      expect(resourceState(entry, now), `${entry.id} should be unavailable with no real destination`).toBe(
        "unavailable",
      );
    }
  });

  it("a missing destination reports unavailable even with a future release date, overriding the schedule", () => {
    const future = new Date("2099-01-01T00:00:00Z");
    const withoutDestination = resourceManifest.filter(
      (e) => !(e.kind === "local-download" ? e.localPath : e.externalUrl),
    );
    expect(withoutDestination.length, "expected at least one entry with no real destination yet").toBeGreaterThan(0);
    for (const entry of withoutDestination) {
      expect(
        resourceState(entry, future),
        `${entry.id} has no destination, so a far-future release date must not report scheduled/available`,
      ).toBe("unavailable");
    }
  });

  it("every scheduled entry's localPath genuinely exists on disk", () => {
    const now = new Date();
    for (const entry of resourceManifest) {
      if (entry.kind !== "local-download") continue;
      if (resourceState(entry, now) !== "scheduled") continue;
      expect(entry.localPath, `${entry.id} is scheduled but has no localPath`).toBeTruthy();
      expect(existsSync(resolve("public", entry.localPath!)), `${entry.id}'s scheduled file does not exist`).toBe(
        true,
      );
    }
  });

  it("unavailable resources render no active action link on their assessment page", () => {
    const now = new Date();
    for (const slug of ["project-1", "project-2", "project-3"]) {
      const html = readFileSync(resolve("dist/assessments", slug, "index.html"), "utf8");
      const project = Number(slug.split("-")[1]) as 1 | 2 | 3;
      for (const entry of resourcesForProject(project)) {
        if (resourceState(entry, now) !== "unavailable") continue;
        const cardMatch = html.match(new RegExp(`<li class="resource-card" data-resource-id="${entry.id}"[^]*?</li>`));
        expect(cardMatch, `${entry.id} card not found on ${slug}`).toBeTruthy();
        expect(cardMatch![0], `${entry.id} is unavailable but still renders an action link`).not.toMatch(
          /resource-card__action/,
        );
      }
    }
  });

  it("builds every assessment page's resource list from the shared registry, not page-level links", () => {
    for (const slug of ["project-1", "project-2", "project-3"]) {
      const html = readFileSync(resolve("dist/assessments", slug, "index.html"), "utf8");
      const ids = [...html.matchAll(/data-resource-id="([^"]+)"/g)].map((m) => m[1]);
      const project = Number(slug.split("-")[1]) as 1 | 2 | 3;
      const expected = resourcesForProject(project).map((e) => e.id);
      expect(ids.sort()).toEqual([...expected].sort());
    }
  });

  it("gives every lecture banner a local asset, source, and alt-text decision", () => {
    const lectures = api.nodes.filter((node) => node.type === "lectures");
    expect(lectures.length, "expected all twelve weekly lectures").toBe(12);
    const withBanner = lectures.filter(
      (lecture) => typeof lecture.meta?.banner === "string" && lecture.meta.banner.length > 0,
    );
    expect(withBanner.length, "every lecture, not just some, must have a banner image").toBe(lectures.length);

    // meta.banner carries the raw frontmatter path (e.g. "./images/week-01-banner.svg"),
    // not Astro's post-optimisation ImageMetadata object, so the built file has to be
    // located by its hashed filename in dist/_astro rather than read back directly.
    const builtAssets = readdirSync(resolve("dist/_astro"));

    for (const lecture of withBanner) {
      expect(
        typeof lecture.meta?.bannerAlt === "string" && (lecture.meta.bannerAlt as string).trim().length > 0,
        `${lecture.id} banner has no alt-text decision`,
      ).toBe(true);
      expect(
        typeof lecture.meta?.bannerSource === "string" && (lecture.meta.bannerSource as string).trim().length > 0,
        `${lecture.id} banner has no source/licence-reuse basis`,
      ).toBe(true);

      const bannerPath = String(lecture.meta?.banner);
      const filename = bannerPath.split("/").pop() ?? "";
      const extension = filename.split(".").pop();
      const basename = filename.replace(/\.[^.]+$/, "");
      const builtMatch = builtAssets.some(
        (asset) => asset.startsWith(`${basename}.`) && asset.endsWith(`.${extension}`),
      );
      expect(builtMatch, `${lecture.id}'s banner (${bannerPath}) did not produce a built asset in dist/_astro`).toBe(
        true,
      );
    }
  });
});
