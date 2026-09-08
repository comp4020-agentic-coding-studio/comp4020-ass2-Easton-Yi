# Assignment 2 harness

Assignment 2: a complete course website for an invented course (Slop
University), built on the fixed `astro-theme-slop` template. The platform is
documented in `README.md` --- content model, base path, checks, generated API.
The [course website](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/)
publishes the brief and spec; this repo's name tells you which deliverable
applies. Read both before you plan or build.

## How to work in here

- Keep the dev server running (`pnpm dev`) so you see changes as you make them.
- Run `pnpm check` before you push.
- Open the page in a browser and look at it. The rendered page is the truth;
  your mental model of it isn't.
- When a check fails, read its output before you change anything.
- Never commit a red state.

## This file is yours

A starting point, not a rulebook. As you learn what this build needs --- a
convention the work has to hold to, a sensor that keeps catching you out (a
linter, say), a fact about the stack that is easy to get wrong --- write it
down here and wire it into `check`. Growing this file is the work.

## Carried forward from prior prototypes

These are general working conventions that held up across earlier weeks
(carried forward from `comp4020-crit5-Easton-Yi`, which itself carried them
from `comp4020-crit4-Easton-Yi`), not specific to any one prototype's content:

- **Direct orders.** A prompt phrased as a direct, short imperative
  ("change X to Y") should be executed exactly as stated, without further
  unrequested changes or redesign.
- **A claim of success needs more than a green check.** `pnpm check` passing
  is necessary but not sufficient --- for anything the visitor experiences
  (visual, audio, interaction), back the claim with direct inspection: open
  it in a browser (or Playwright's Chromium, `npx playwright install
  chromium`, when a live browser tool isn't reachable) and actually look at
  or listen to it before saying it works. A value that looks plausible on
  paper (a stroke-width in the wrong units, a gain node at the wrong scale)
  can silently produce nothing while every automated check still passes.
- **Both marking viewports, every time.** Any visual/behavioural check is
  done at both **1920×1080** (desktop) and **390×844** (phone) --- a broken
  phone layout is not a partial pass. Watch for horizontal overflow at
  either (`document.documentElement.scrollWidth <= clientWidth`).
- **Keyboard reachability.** Every interactive state should be reachable
  without a mouse (tab order, keyboard equivalents for pointer gestures),
  and `prefers-reduced-motion: reduce` should drop non-essential motion
  without removing any discrete state or content.
- **Base path.** The production build must work from this repo's GitHub
  Pages base path, not an absolute `/`-rooted asset or link path --- Astro
  handles this in `.md`/`.astro` links, but a hand-written root-absolute
  `href` in an `.astro` file skips it silently (see `README.md`). Concretely:
  a bare `href="/foo/"` on a hand-written `<a>` in an `.astro` file builds
  clean locally and only fails `pnpm build`'s link-base-path check (not
  `pnpm dev`) --- wrap it in `withBase()` from `astro-theme-university/url`
  (no `.js` suffix on the import specifier --- that's the package's
  exports-map key), the same helper `Card`/`Nav`/`Sidebar` already use
  internally. `Card`/`CardGrid` hrefs need no such wrapping; only a raw
  hand-written `<a href="/...">` does.

## Course-site implementation rules

This repository implements the approved course described in:

- `docs/assignment_brief.md` — design intent, constraints, relationships,
  resource workflow, and verification contract;
- `docs/CONTENT_SOURCE.md` — canonical student-facing copy.

The assignment specification and shipped tests define the fixed platform.
Preserve the SlopU theme, four existing content collections, generated API,
GitHub Pages base-path behaviour, and all shipped checks.

### Source priority

When sources overlap, use this order:

1. assignment specification and immutable starter tests;
2. `docs/assignment_brief.md` for design and implementation constraints;
3. `docs/CONTENT_SOURCE.md` for page wording;
4. starter content only as an implementation example.

Do not invent policy or resolve a real contradiction silently. Report the
conflict before continuing.

### Staged workflow

Implement in reviewable stages:

1. course configuration and navigation;
2. Home, People, and Policies;
3. assessments, rubrics, resources, and submission panels;
4. twelve lectures and twelve weekly sessions;
5. slide deck, weekly images, and downloadable resources;
6. responsive, accessibility, and consistency refinement.

Before each stage, read the complete corresponding sections in both design
documents. After implementation, compare every affected page with the source,
run targeted tests and the production build, and fix failures before moving on.

Preserve approved meaning, numbers, dates, names, qualifications, and marking
allocations. Formatting changes are allowed; silent shortening of rubrics,
policies, constraints, or submission instructions is not.

### Resources and submission

Render resources from one typed registry, not duplicated page-level links.
Never invent a URL or use `#`. Scheduled and unavailable resources have no
active link. Mark a local file `Available` only after it exists and passes
format and download checks.

Generate assessment PDFs only after their canonical pages are complete.
Submission panels collect only the named report PDF and final GitLab commit
SHA. HF repository and revision information comes from the frozen GitLab
`submission-manifest.json`. Never request or expose an HF token.

### Verification

Add tests for stable course promises and cross-page relationships, not complete
prose snapshots, component internals, or pixel-perfect layouts. Never delete,
skip, or weaken a shipped test.

After each stage, run the relevant targeted tests. Before handoff, run:

- `pnpm check`;
- `pnpm resources:check`;
- `pnpm check:evidence`;
- the production build;
- keyboard and responsive checks at 1920×1080 and 390×844.

Record only material workflow decisions and verification evidence in
`PROCESS.md`; do not turn it into a command transcript.

## Content-completeness harness

A stage is complete only when the implemented pages contain the approved
student-facing meaning from `docs/CONTENT_SOURCE.md`, not merely when the
expected routes and collection entries exist.

Before accepting a stage:

- remove all starter, implementation-facing, TODO, TBC, placeholder, and
  “populate later” prose from student-facing pages;
- verify that page titles and labels reflect the underlying content type;
- check that shared rules deliberately written once, such as the Evaluation
  Protocol, are rendered on a canonical page and linked wherever students
  need them;
- inspect diagrams for conceptual correctness as well as valid files, alt
  text, captions, and responsive rendering;
- verify generated teaching resources semantically: expected record counts,
  required fields, non-placeholder content, and withheld/private-material
  boundaries;
- leave an unavailable resource genuinely unavailable rather than fabricating
  its contents, destination, or release readiness;
- treat every file committed under `public/` as immediately public:
  `Scheduled` is a presentation state, not access control, and must never be
  used to protect embargoed, hidden, or private material.

Fix an implementation that contradicts the approved design documents. Do not
edit the canonical design or content sources merely to make an existing
implementation appear compliant unless the course designer explicitly
approves that design change.

Tests protect stable promises, but passing tests does not override a visible
contradiction with the design documents. Review each rendered student-facing
page against its corresponding source section before declaring a stage
complete.

## Process-logging harness (Ass1 feedback: process 72/100, D-band)

The Assignment 1 marker wrote: “I would've liked to know more about the process that you used to get the agent to build your website.” This is preserved in `spec/improvement.png`. The artefact showed that a mature agentic workflow existed, but the repository did not make that workflow sufficiently visible or verifiable. The lesson is therefore: **capture the process while it happens, then curate the strongest evidence rather than reconstructing it at the end.**

### Working process log

Keep `PROCESS_LOG.md` as a gitignored, append-only working record. It is not submitted or marked. For every material workflow decision, implementation problem, agent correction, or verification finding, record the following in the same sitting:

1. **Problem:** what needed to be designed, implemented, or corrected.
2. **Directed via:** the actual instruction given to the agent, quoted or closely paraphrased.
3. **First result:** what the agent produced.
4. **Shortfall:** what was inaccurate, incomplete, weak, or inconsistent, if anything.
5. **Alternative considered:** another plausible response and why it was rejected.
6. **My decision:** which choice belonged to the course designer and why it was preferred.
7. **Fix and verification:** what changed, how many iterations were required, and which test, rendered page, screenshot, or viewport confirmed the result before acceptance.
8. **Evidence to preserve:** the resulting commit or range, relevant `CLAUDE.md` change, curated prompt excerpt, and any useful screenshot path.

Do not invent a failure or rejected alternative when the first result was acceptable. Record that it was accepted and why. A straightforward first-pass success may remain in the working log, but it is normally weaker evidence for the final account unless it demonstrates a deliberate workflow-level decision.

Memory reconstructed later is not contemporaneous evidence. If a past event must be described from commits or diffs, label it honestly as reconstruction rather than presenting it as a live log entry.

### Curated `PROCESS.md`

`PROCESS.md` is a **400–600-word curated distillation**, not a copy of `PROCESS_LOG.md` and not a command transcript. Preserve `## What I built` and `## How I got here`, then select only three or four pivotal episodes that best demonstrate the designer’s direction, evaluation, correction, and systemic improvement.

The selected episodes should collectively include:

* at least one **workflow-design episode** showing how the agent was prepared before implementation—for example, auditing the whole assignment, separating `assignment_brief.md` from `CONTENT_SOURCE.md`, defining source priority, or dividing implementation into reviewable stages;
* at least one **correction episode** showing where an agent result fell short, how it was evaluated, what alternative was considered, and how the final implementation changed;
* at least one **systemic improvement** encoded in `CLAUDE.md` or `spec/` so that the same failure is less likely to recur; and
* one closing **project-level structural alternative**—a different mechanic, data source, workflow, or framing considered for the build as a whole and why it was not chosen.

Compress the relevant parts of the eight-field log into readable first-person prose. Do not create eight separately labelled paragraphs for every episode. If there is no honest evidence of judgement, correction, or deliberate workflow design, do not present an ordinary attempt–accept sequence as an HD-level process episode.

### Evidence

Every material claim in `PROCESS.md` must be tied to repository evidence. An uncited claim is not evidence.

Use the shortest combination that proves the point:

* quote a **curated prompt excerpt** showing the instruction given to the agent;
* link a **commit** showing one resulting change;
* use a **compare range** when the important point is the evolution from an initial implementation to a corrected one;
* include a **relative-path screenshot** when a visual comparison communicates the issue better than prose; and
* cite a `CLAUDE.md` rule change separately from the immediate code fix when the harness itself changed.

When a bug leads to a new permanent rule, identify the failure mode that the rule now prevents. This makes the systemic improvement visible rather than allowing it to disappear inside the implementation commit.

Before handoff, verify mechanically that `PROCESS.md` is between 400 and 600 words, contains real commit or compare links, retains the required two main sections, and ends with the project-level structural alternative.
