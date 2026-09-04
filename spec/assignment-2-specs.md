# Assignment 2 — Specification (from course website)

Source: https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/ and
its linked page
https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/assessments/assignment-2/

## Overview

Design and build a full course website (~20 pages) for a fictional
"Slop University" (SlopU) course, built as the course's own student-facing
site — not a curriculum document written about the course.

Task, verbatim: "Design the university course you wish existed, and build
the website that runs it."

## Requirements (the brief)

- Choose your own topic and course title. It must be **niche** — "a subject
  narrow enough that no real university would run it."
- Build the site *as a student would see it*. There is no separate
  curriculum doc to write alongside it.
- The course must be **coherent** — one idea sustained across a semester.
- Prose must avoid feeling like "AI slop" — it needs "a unique and
  compelling voice."
- Reference examples cited (not gold standards to copy): *Calling
  Bullshit*, *How to Make (Almost) Anything*, *CS 007: Personal Finance for
  Engineers*.
- Start from the provided "course-site starter" template
  (`astro-theme-slop`). `README.md` and `CLAUDE.md` define what is fixed
  vs. customizable.
  - **Fixed** (do not change): SlopU branding, marks system, palette,
    content collections, generated API.
  - **Customizable**: pages, decks, components, navigation, artwork,
    styling, all content.
- Course code must be `SLOPxxxx` — the last three digits are
  pre-assigned/unique to this repo; the student chooses the leading level
  digit (1–4 = undergraduate, 6 or 8 = postgraduate).
- Placeholder template artwork must be replaced — leaving it in place fails
  `pnpm check:evidence`.

## Fixed contract requirements (spec)

- Deployed live at a public GitHub Pages URL by the deadline, and
  functional at **both marking viewports**.
- One niche course under a `SLOPxxxx` code (three digits preserved from the
  template), spanning **twelve dated teaching weeks**.
- At least **one lecture** must include a real, linked slide deck.
- Assessment components must **total 100%**.
- Custom checks in `spec/` protecting course-specific promises (this file's
  home).
- `pnpm check` and `pnpm check:evidence` must both pass.
- Repo must show evidence of process: `PROCESS.md`, `CLAUDE.md`, and a
  growing commit history.

## What to submit

- **Deployed site** (GitHub Pages URL) — this is what gets graded.
- **Source repository** — for code/checks review.
- **Evidence of process**: `PROCESS.md`, `CLAUDE.md`, commit history.
- `PROCESS.md`:
  - Strict **400–600 words**.
  - First-person narrative account of harness/workflow decisions.
  - Must **cite commits** — "an uncited claim isn't evidence."
  - Must explain which course-design decisions were encoded into
    `CLAUDE.md` rules or `spec/` checks, and which were deliberately
    excluded.
  - No separate reflection document — retro is covered elsewhere (Crit C6).

## Grading rubric

| Criterion | Weight |
|---|---|
| Legibility of process | 45% |
| Working deployed artefact | 20% |
| Response to brief | 35% |

Assignment 2 is worth **20% of the overall course grade**.

Marking approach: reviewers spend "about ten minutes" per site, viewing the
home page, several non-adjacent weeks, an assessment, the deck, and the
policies page, at two viewports. Note: **"Restyling isn't required"** —
visual polish is not the focus; coherence and completeness are.

## HD (High Distinction) marking criteria

Source: https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/topics/assessment/#marking-rubric

All three assignments (A1, A2, Final Project) share one set of band
descriptors across three criteria, each scored /100 then weighted.

**Bands:** HD 80–100, D–Cr 60–79, P 50–59, N below 50.

### Criterion 1: Legibility of Process (45%)

**HD band:**
> "beyond checking out, the evidence shows deliberate direction" — with
> justification of key calls.

Other bands (for contrast): D–Cr requires the account to check out with a
working but routine process; P describes process merely asserted, not
evidenced; N is no real directed process, or history contradicting the
account.

### Criterion 2: Working Deployed Artefact (20%)

**HD band:**
> "holds up under use it wasn't designed for: the keyboard, a resize
> mid-interaction, a slow connection"

Other bands: D–Cr means it's live and meets the brief at both viewports; P
has notable gaps like an unreliable core interaction; N fails to deploy or
doesn't work at all.

### Criterion 3: Response to the Brief (35%)

**HD band:**
> "a pointed, surprising answer to the provocation, scoped with judgement:
> one idea, carried all the way"

Other bands: D–Cr is a well-scoped response with real substance but minor
drift; P meets the brief loosely, mis-scoped or lacking a viewpoint; N is
off-brief entirely.

### General note

There is no single combined "overall HD" descriptor — each criterion is
judged independently against its own band, then the three are weighted and
summed into holistic judgements per task, rather than one unified rubric
line.

## Key dates

- **Due:** noon, Monday 21 September 2026.
- **Marks/feedback returned:** Friday 2 October 2026.
- No late submissions; extensions available only *before* the deadline.
- Individually assessed.

## Related context

- Falls within the "static half" of the semester (before week 7) — the
  deliverable is a client-side site that deploys to GitHub Pages.
- Crit C6 (week 7) is an "Assignment 2 retro": demo the latest prototype,
  receive feedback, and explain the key turning point in the process.
- Related links referenced from the brief page: Final Project (Assignment
  3), the general Assessment page (submission mechanics/deadlines/rubric
  detail), Assignment 2 retro (Week 7), Assignment 1, and the Week 5
  (Verification) and Week 6 (Evidence of practice) lectures.
