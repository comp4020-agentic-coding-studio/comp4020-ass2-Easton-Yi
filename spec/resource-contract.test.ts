import { readdirSync, readFileSync } from "node:fs";
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

  it("references the shared CVPR template from all three projects but stores it once", () => {
    const templateEntries = resourceManifest.filter((e: ResourceEntry) => e.title === "CVPR Report Template");
    expect(templateEntries.length).toBe(3);
    const paths = new Set(templateEntries.map((e) => e.localPath));
    expect(paths.size, "the CVPR template should resolve to a single stored path").toBe(1);
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
    const withBanner = lectures.filter(
      (lecture) => typeof lecture.meta?.banner === "string" && lecture.meta.banner.length > 0,
    );
    expect(withBanner.length, "no lecture's meta.banner points at an image").toBeGreaterThan(0);

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
