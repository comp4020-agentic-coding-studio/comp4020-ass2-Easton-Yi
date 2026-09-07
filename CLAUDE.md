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

## Process-logging harness (Ass1 feedback: process 72/100, D-band)

Marker's comment: "I would've liked to know more about the process that you
used to get the agent to build your website." Confirmed by `spec/improvement.png`
--- a mature agentic workflow existed but wasn't shown in the repo. The gap
is documentation, not engineering: **capture the process as it happens,
don't reconstruct it at the end.**

- **Keep `PROCESS_LOG.md`** (gitignored, append-only, never marked). For
  every non-trivial step, log in the same sitting: the prompt/instruction
  given to the agent, one line on what the agent produced, and if a fix was
  involved, the other way it could have been fixed and why this way won.
  Memory reconstructed after the fact is not evidence.
- **`PROCESS.md` is a curated distillation of the log**, cited to real
  commits. Every entry needs all eight lines below, each answering one
  question --- skip none of them, they were the exact gap Ass1 lost marks on:
  1. Problem: what was broken/needed, one line.
  2. Directed via: the actual instruction given to the agent (quoted/paraphrased).
  3. Agent's result fell short because: what specifically was not ideal in
     what the agent returned --- if nothing was wrong first try, say so and
     skip to Verified by.
  4. Considered and rejected: the other plausible fix, and why it lost.
  5. My decision: which choice was mine, not the agent's, and why this
     solution over the rejected one.
  6. Fix/iterate: what changed, and how many rounds it took.
  7. Verified by: the check/screenshot/viewport that confirmed it *before*
     acceptance --- both 1920x1080 and 390x844 for anything visual.
  8. Evidence: commit hash + link, and a CLAUDE.md diff link if the harness
     itself changed as a result.
  If lines 3--5 can't be filled in honestly, it's attempt-accept-repeat, not
  judgement --- don't count the entry as HD-grade evidence.
- **CLAUDE.md edits are first-class citations.** When a bug gets fixed at
  the rule level (a new "never do X" line here), cite that commit
  *separately* from the code-fix commit and name which failure mode the
  rule now blocks permanently. This is what "systemic fix, not repetition"
  looks like to a marker --- it's invisible unless named.
- **Close `PROCESS.md` with one structural alternative for the whole
  build** --- a different mechanic, data source, or framing you considered
  for the prototype as a whole and didn't take, and why. Per-bug judgement
  isn't enough for HD; the rubric wants judgement visible at project scale
  too.
