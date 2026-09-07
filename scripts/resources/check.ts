#!/usr/bin/env node
// Non-mutating validation: for every resource the registry could ever mark
// `Available`, confirms the backing file exists, is non-empty, has a valid
// format, and (for archives) carries the required README/manifest members.
// Run via `pnpm resources:check`; wired into `pnpm check`.
import { readFileSync, statSync } from "node:fs";
import { resourceManifest } from "../../src/data/resource-manifest.ts";
import { listZipEntries } from "./zip.ts";

const PUBLIC_DIR = new URL("../../public/", import.meta.url);

let failures = 0;

function fail(id: string, message: string): void {
  failures += 1;
  console.error(`✗ ${id}: ${message}`);
}

function ok(id: string, message: string): void {
  console.log(`✓ ${id}: ${message}`);
}

function checkZip(id: string, path: string): void {
  const buf = readFileSync(path);
  const entries = listZipEntries(buf);
  if (!entries.includes("README.md")) return fail(id, "zip is missing required README.md member");
  if (!entries.includes("RESOURCE_MANIFEST.json")) return fail(id, "zip is missing required RESOURCE_MANIFEST.json member");
  ok(id, `valid zip, ${entries.length} entries including README.md and RESOURCE_MANIFEST.json`);
}

function checkPdf(id: string, path: string): void {
  const buf = readFileSync(path);
  if (buf.subarray(0, 5).toString("latin1") !== "%PDF-") return fail(id, "file does not start with the PDF magic bytes");
  ok(id, "valid PDF signature");
}

function checkNotebook(id: string, path: string): void {
  const text = readFileSync(path, "utf8");
  let json: unknown;
  try {
    json = JSON.parse(text);
  } catch {
    return fail(id, "not valid JSON");
  }
  const nb = json as { nbformat?: number; cells?: unknown[] };
  if (typeof nb.nbformat !== "number") return fail(id, "missing nbformat field");
  if (!Array.isArray(nb.cells) || nb.cells.length === 0) return fail(id, "notebook has no cells");
  ok(id, `valid notebook, nbformat ${nb.nbformat}, ${nb.cells.length} cells`);
}

for (const entry of resourceManifest) {
  if (entry.kind !== "local-download" || !entry.localPath) continue;
  const path = new URL(entry.localPath, PUBLIC_DIR).pathname;

  let stat: ReturnType<typeof statSync>;
  try {
    stat = statSync(path);
  } catch {
    fail(entry.id, `expected file does not exist yet: ${entry.localPath}`);
    continue;
  }
  if (stat.size === 0) {
    fail(entry.id, `file exists but is empty: ${entry.localPath}`);
    continue;
  }

  if (entry.localPath.endsWith(".zip")) checkZip(entry.id, path);
  else if (entry.localPath.endsWith(".pdf")) checkPdf(entry.id, path);
  else if (entry.localPath.endsWith(".ipynb")) checkNotebook(entry.id, path);
  else ok(entry.id, `file exists (${stat.size} bytes), no format check defined for this extension`);
}

if (failures > 0) {
  console.error(`\nresources:check failed: ${failures} problem(s).`);
  process.exit(1);
}
console.log("\nresources:check passed.");
