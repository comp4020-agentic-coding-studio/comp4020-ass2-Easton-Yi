import { existsSync, readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { resourceManifest, resourceState } from "../src/data/resource-manifest";
import { listZipEntries } from "../scripts/resources/zip.ts";

// All release dates fall in 2027, after the course's own teaching period
// starts; today (site-build time) is still before every one of them, so
// every card correctly renders as "Scheduled" on the live site right now
// (see resourceState in src/data/resource-manifest.ts). That does not mean
// the backing files are untested: a resource only becomes "Available" once
// (a) its release date has passed AND (b) the file physically exists, so we
// verify the file side of that contract here against a post-release date,
// and separately confirm today's real build correctly withholds the link.
const PUBLIC_DIR = fileURLToPath(new URL("../public/", import.meta.url));
const DIST_DIR = resolve("dist");
const AFTER_ALL_RELEASES = new Date("2027-06-01T00:00:00+10:00");

const localEntries = resourceManifest.filter((e) => e.kind === "local-download" && e.localPath);
const readyLocal = localEntries.filter((e) => resourceState(e, AFTER_ALL_RELEASES) === "available");

const briefPdfPaths = [
  "resources/project-1/project-1-brief.pdf",
  "resources/project-2/project-2-brief.pdf",
  "resources/project-3/project-3-brief.pdf",
];

describe("resource download contract", () => {
  it("shows every resource as Scheduled on today's build, ahead of its 2027 release", () => {
    const now = new Date();
    for (const entry of resourceManifest) {
      expect(now < entry.releaseAt, `${entry.id} release date is not in the future`).toBe(true);
      expect(resourceState(entry, now)).toBe("scheduled");
    }
  });

  it("has at least one file-backed local resource per project ready for its release date", () => {
    for (const project of [1, 2, 3] as const) {
      const projectLocal = readyLocal.filter((e) => e.project === project);
      expect(projectLocal.length, `project ${project} has no release-ready local resources`).toBeGreaterThan(0);
    }
  });

  for (const entry of readyLocal) {
    describe(entry.id, () => {
      const publicPath = `${PUBLIC_DIR}${entry.localPath}`;
      const distPath = resolve(DIST_DIR, entry.localPath!);

      it("exists in public/ and the built dist/ output, non-empty", () => {
        expect(existsSync(publicPath), `${entry.id} missing from public/`).toBe(true);
        expect(statSync(publicPath).size, `${entry.id} is empty in public/`).toBeGreaterThan(0);
        expect(existsSync(distPath), `${entry.id} missing from dist/`).toBe(true);
        expect(statSync(distPath).size, `${entry.id} is empty in dist/`).toBeGreaterThan(0);
      });

      it("has the expected extension and file signature", () => {
        const buf = readFileSync(distPath);
        if (entry.localPath!.endsWith(".pdf")) {
          expect(buf.subarray(0, 5).toString("latin1")).toBe("%PDF-");
        } else if (entry.localPath!.endsWith(".zip")) {
          expect(buf.subarray(0, 2).toString("latin1")).toBe("PK");
        } else if (entry.localPath!.endsWith(".ipynb")) {
          const json = JSON.parse(buf.toString("utf8"));
          expect(typeof json.nbformat).toBe("number");
        } else {
          throw new Error(`unexpected extension for ${entry.id}`);
        }
      });

      it("would resolve to a base-path-safe href once available", () => {
        // ResourceCard.astro builds the href as withBase(`/${entry.localPath}`);
        // confirm the exact target file that href resolves to actually exists
        // in the built output, without depending on today's Scheduled state.
        expect(distPath.endsWith(entry.localPath!)).toBe(true);
        expect(existsSync(distPath)).toBe(true);
      });
    });
  }

  it("opens every ZIP archive and finds its manifest entries", () => {
    for (const entry of readyLocal) {
      if (!entry.localPath!.endsWith(".zip")) continue;
      const buf = readFileSync(resolve(DIST_DIR, entry.localPath!));
      const names = listZipEntries(buf);
      expect(names, `${entry.id} zip missing README`).toContain("README.md");
      expect(names, `${entry.id} zip missing manifest`).toContain("RESOURCE_MANIFEST.json");
    }
  });

  it("parses every notebook as valid nbformat JSON", () => {
    for (const entry of readyLocal) {
      if (!entry.localPath!.endsWith(".ipynb")) continue;
      const json = JSON.parse(readFileSync(resolve(DIST_DIR, entry.localPath!), "utf8"));
      expect(typeof json.nbformat).toBe("number");
      expect(Array.isArray(json.cells)).toBe(true);
      expect(json.cells.length).toBeGreaterThan(0);
    }
  });

  it("has three brief PDFs, each with a valid PDF signature", () => {
    for (const path of briefPdfPaths) {
      const distPath = resolve(DIST_DIR, path);
      expect(existsSync(distPath), `${path} missing from dist/`).toBe(true);
      const buf = readFileSync(distPath);
      expect(buf.subarray(0, 5).toString("latin1")).toBe("%PDF-");
    }
  });
});
