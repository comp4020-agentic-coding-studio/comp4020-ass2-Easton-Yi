// The single typed registry for every assessment-page resource card. Render
// through `ResourceList`/`ResourceCard` rather than hard-coding links per
// page — see docs/ASSIGNMENT_BRIEF.md "Resource registry and rendering
// contract" for the field contract this module implements.
import { existsSync } from "node:fs";
import { join } from "node:path";

// Resolved from the working directory, not `import.meta.url`: Astro's SSG
// build bundles this module into the build output before rendering pages, so
// a `new URL("../../public/", import.meta.url)`-style path resolves against
// the *bundled* location (e.g. `<outDir>/public/`) rather than the project's
// real `public/` — silently returning "unavailable" for every local resource
// once its release date has passed. `astro build`/`astro dev` always run
// with the project root as cwd, so that is the stable anchor.
const PUBLIC_DIR = join(process.cwd(), "public") + "/";

export type ResourceGroup = "Start here" | "Data and model" | "Evaluate" | "Submit";
export type ResourceKind = "local-download" | "gitlab" | "huggingface";
export type ResourceState = "available" | "scheduled" | "access-controlled" | "unavailable";

export interface ResourceEntry {
  /** Stable identifier, unique across the whole registry. */
  id: string;
  project: 1 | 2 | 3;
  group: ResourceGroup;
  title: string;
  description: string;
  actionLabel: string;
  kind: ResourceKind;
  /** The card is `Scheduled` before this instant. */
  releaseAt: Date;
  /** Path under `public/`, no leading slash. Set once the file is real. */
  localPath?: string;
  /** A real, access-controlled GitLab/Hugging Face destination. Never a
   *  placeholder — omit the field instead of inventing a URL. */
  externalUrl?: string;
  /** Shown for `unavailable`: which dependency is still being provisioned. */
  unavailableReason: string;
}

// A build-time-only override for the download smoke test: it needs a build
// where release dates have already passed, so it can exercise a real action
// link and a real file response, without ever making the submitted site
// itself claim an early release. Unset in every normal build, dev server, and
// deploy — only the smoke test's own throwaway build sets it.
function previewNow(): Date | undefined {
  const raw = process.env.RESOURCE_PREVIEW_NOW;
  return raw ? new Date(raw) : undefined;
}

/** Computes the four-state rendering contract from release time and whether
 *  a real destination exists yet — never a value stored directly on the
 *  entry, so a card can't drift out of sync with its own release date. */
export function resourceState(entry: ResourceEntry, now: Date = previewNow() ?? new Date()): ResourceState {
  if (now < entry.releaseAt) return "scheduled";
  if (entry.kind === "local-download") {
    return entry.localPath && existsSync(`${PUBLIC_DIR}${entry.localPath}`) ? "available" : "unavailable";
  }
  return entry.externalUrl ? "access-controlled" : "unavailable";
}

const RELEASE = {
  1: new Date("2027-02-22T09:00:00+11:00"),
  2: new Date("2027-03-22T09:00:00+11:00"),
  3: new Date("2027-04-26T09:00:00+10:00"),
} as const;

const CVPR_TEMPLATE = "resources/shared/cvpr-report-template.zip";

export const resourceManifest: ResourceEntry[] = [
  // --- Project 1 ---------------------------------------------------------
  {
    id: "p1-brief",
    project: 1,
    group: "Start here",
    title: "Full Project Brief",
    description:
      "Printable copy of the complete task, constraints, evaluation rules, and rubric.",
    actionLabel: "Download brief",
    kind: "local-download",
    releaseAt: RELEASE[1],
    localPath: "resources/project-1/project-1-brief.pdf",
    unavailableReason: "the printable brief is generated once the Project 1 page is final",
  },
  {
    id: "p1-repo",
    project: 1,
    group: "Start here",
    title: "Project 1 Starter Repository",
    description:
      "Assigned code, default configuration, parameter preflight, budget ledger, and submission manifest.",
    actionLabel: "Open GitLab repository",
    kind: "gitlab",
    releaseAt: RELEASE[1],
    unavailableReason: "the Project 1 GitLab repository is provisioned by the teaching team",
  },
  {
    id: "p1-dataset",
    project: 1,
    group: "Data and model",
    title: "Narrative Dataset and Data Card",
    description:
      "Versioned story corpus with provenance, licence, document-level splits, checksums, and preprocessing notes.",
    actionLabel: "Open dataset",
    kind: "huggingface",
    releaseAt: RELEASE[1],
    unavailableReason: "the dataset is published to the SlopU Hugging Face organisation",
  },
  {
    id: "p1-colab",
    project: 1,
    group: "Data and model",
    title: "Pre-training Colab",
    description:
      "Supported route from environment validation to tokenisation, training, checkpointing, evaluation, and sampling.",
    actionLabel: "Download notebook",
    kind: "local-download",
    releaseAt: RELEASE[1],
    localPath: "resources/project-1/p1-colab-starter.ipynb",
    unavailableReason: "the pre-training notebook is built alongside the starter repository",
  },
  {
    id: "p1-eval",
    project: 1,
    group: "Evaluate",
    title: "Public Evaluation Pack",
    description:
      "Five development examples, ten tutor prompts, separation validator, and public evaluation utilities.",
    actionLabel: "Download evaluation pack",
    kind: "local-download",
    releaseAt: RELEASE[1],
    localPath: "resources/project-1/p1-evaluation-kit.zip",
    unavailableReason: "the evaluation pack is built alongside the starter repository",
  },
  {
    id: "p1-template",
    project: 1,
    group: "Submit",
    title: "CVPR Report Template",
    description:
      "Shared two-column LaTeX template with the required engineering-report and AI Assistance Statement sections.",
    actionLabel: "Download template",
    kind: "local-download",
    releaseAt: RELEASE[1],
    localPath: CVPR_TEMPLATE,
    unavailableReason: "the shared report template is published with the first project brief",
  },

  // --- Project 2 ---------------------------------------------------------
  {
    id: "p2-brief",
    project: 2,
    group: "Start here",
    title: "Full Project Brief",
    description:
      "Printable copy of the complete task, constraints, evaluation rules, and rubric.",
    actionLabel: "Download brief",
    kind: "local-download",
    releaseAt: RELEASE[2],
    localPath: "resources/project-2/project-2-brief.pdf",
    unavailableReason: "the printable brief is generated once the Project 2 page is final",
  },
  {
    id: "p2-repo",
    project: 2,
    group: "Start here",
    title: "Project 2 Starter Repository",
    description:
      "Assigned post-training code, starting-checkpoint loader, budget ledger, schemas, and submission manifest.",
    actionLabel: "Open GitLab repository",
    kind: "gitlab",
    releaseAt: RELEASE[2],
    unavailableReason: "the Project 2 GitLab repository is provisioned by the teaching team",
  },
  {
    id: "p2-dataset",
    project: 2,
    group: "Data and model",
    title: "Target-Style Corpus and Data Card",
    description:
      "Versioned public-domain Grimm and One Thousand and One Nights data with provenance, splits, and checksums.",
    actionLabel: "Open dataset",
    kind: "huggingface",
    releaseAt: RELEASE[2],
    unavailableReason: "the corpus is published to the SlopU Hugging Face organisation",
  },
  {
    id: "p2-pack",
    project: 2,
    group: "Data and model",
    title: "Post-training Starter Pack",
    description:
      "Supported Colab and compact recipes for continued pre-training, SFT, masking inspection, and a toy preference exercise.",
    actionLabel: "Download starter pack",
    kind: "local-download",
    releaseAt: RELEASE[2],
    localPath: "resources/project-2/p2-post-training-pack.zip",
    unavailableReason: "the post-training pack is built alongside the starter repository",
  },
  {
    id: "p2-eval",
    project: 2,
    group: "Evaluate",
    title: "Behaviour Evaluation Pack",
    description:
      "Five development examples, ten tutor prompts, separation validator, blind-review anchors, and retention checks.",
    actionLabel: "Download evaluation pack",
    kind: "local-download",
    releaseAt: RELEASE[2],
    localPath: "resources/project-2/p2-evaluation-kit.zip",
    unavailableReason: "the evaluation pack is built alongside the starter repository",
  },
  {
    id: "p2-template",
    project: 2,
    group: "Submit",
    title: "CVPR Report Template",
    description:
      "Shared two-column LaTeX template with the required engineering-report and AI Assistance Statement sections.",
    actionLabel: "Download template",
    kind: "local-download",
    releaseAt: RELEASE[2],
    localPath: CVPR_TEMPLATE,
    unavailableReason: "the shared report template is published with the first project brief",
  },

  // --- Project 3 ---------------------------------------------------------
  {
    id: "p3-brief",
    project: 3,
    group: "Start here",
    title: "Full Project Brief",
    description:
      "Printable copy of the common task, both tracks, constraints, evaluation rules, and rubric.",
    actionLabel: "Download brief",
    kind: "local-download",
    releaseAt: RELEASE[3],
    localPath: "resources/project-3/project-3-brief.pdf",
    unavailableReason: "the printable brief is generated once the Project 3 page is final",
  },
  {
    id: "p3-repo",
    project: 3,
    group: "Start here",
    title: "Project 3 Starter Repository",
    description:
      "Assigned fine-tuning code, proposal template, task schemas, test_pilot, budget ledger, and submission manifest.",
    actionLabel: "Open GitLab repository",
    kind: "gitlab",
    releaseAt: RELEASE[3],
    unavailableReason: "the Project 3 GitLab repository is provisioned by the teaching team",
  },
  {
    id: "p3-checkpoint",
    project: 3,
    group: "Data and model",
    title: "Starting Model and Task Data",
    description:
      "Track-specific fallback checkpoint and data cards; Track B includes the general-language checkpoint and arithmetic data.",
    actionLabel: "Open assigned resources",
    kind: "huggingface",
    releaseAt: RELEASE[3],
    unavailableReason: "track resources are published to the SlopU Hugging Face organisation",
  },
  {
    id: "p3-pack",
    project: 3,
    group: "Data and model",
    title: "Fine-tuning Starter Pack",
    description:
      "Supported SFT Colab, response-only masking checks, example task records, and baseline commands.",
    actionLabel: "Download starter pack",
    kind: "local-download",
    releaseAt: RELEASE[3],
    localPath: "resources/project-3/p3-finetuning-pack.zip",
    unavailableReason: "the fine-tuning pack is built alongside the starter repository",
  },
  {
    id: "p3-eval",
    project: 3,
    group: "Evaluate",
    title: "Track Evaluation Pack",
    description:
      "Five development examples, ten tutor inputs, separation validator, task verifier, and regression utilities.",
    actionLabel: "Download evaluation pack",
    kind: "local-download",
    releaseAt: RELEASE[3],
    localPath: "resources/project-3/p3-evaluation-kit.zip",
    unavailableReason: "the evaluation pack is built alongside the starter repository",
  },
  {
    id: "p3-template",
    project: 3,
    group: "Submit",
    title: "CVPR Report Template",
    description:
      "Shared two-column LaTeX template with the required engineering-report and AI Assistance Statement sections.",
    actionLabel: "Download template",
    kind: "local-download",
    releaseAt: RELEASE[3],
    localPath: CVPR_TEMPLATE,
    unavailableReason: "the shared report template is published with the first project brief",
  },
];

export const RESOURCE_GROUP_ORDER: ResourceGroup[] = [
  "Start here",
  "Data and model",
  "Evaluate",
  "Submit",
];

export function resourcesForProject(project: 1 | 2 | 3): ResourceEntry[] {
  return resourceManifest.filter((entry) => entry.project === project);
}
