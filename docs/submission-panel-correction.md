Complete the final SLOP4225 submission-panel correction.

Do not begin by editing. First read:

* `CLAUDE.md`;
* the submission-panel sections for all three projects in `docs/CONTENT_SOURCE.md`;
* the submission rules in `docs/ASSIGNMENT_BRIEF.md`;
* `src/components/SubmissionPanel.astro`;
* `spec/assessment-contract.test.ts`.

Then inspect the working tree and state briefly which files you will change.

## Scope

This is a narrowly scoped implementation correction.

Do not modify:

* `docs/CONTENT_SOURCE.md`;
* `docs/ASSIGNMENT_BRIEF.md`;
* resource cards or `resource-manifest.ts`;
* assessment dates, marks, filenames, or submission policy;
* the existing unavailable-resource behaviour;
* shipped tests except where strengthening `assessment-contract.test.ts` is required.

Preserve unrelated user changes.

## Problem

The required submission instructions currently appear only when:

```text
state === "open"
```

Consequently, the deployed pre-opening Project pages do not show students:

* the required report filename;
* the final GitLab commit SHA requirement;
* the first-page name and student-ID requirement;
* the role of `submission-manifest.json`;
* the prohibition on submitting a Hugging Face token.

These are static assignment requirements, not personal submission status. They must remain visible before and after the panel opens.

The authenticated portal alone may display the personal states `To be submitted` and `Submitted`. The public static site must not guess either state.

## Required implementation

Refactor `SubmissionPanel.astro` into three clearly separated parts.

### 1. Time-dependent availability status

Before `opens`, display:

```text
Will be available at <opening date and time> AET.
```

After `opens`, display a neutral statement such as:

```text
Submission is open. Your current submission status is shown in the authenticated SlopU Submission Portal.
```

Do not display `To be submitted` or `Submitted` as the student’s current status on the static page.

### 2. Always-visible submission checklist

Outside both time-dependent branches, always render the project-specific canonical instructions:

```text
Upload <assN_report.pdf> and enter the final GitLab commit SHA. Your name and student ID must appear on the report’s first page. The frozen commit’s submission-manifest.json identifies the exact private Hugging Face model revision used for marking.
```

Also always render the security instruction:

```text
Never paste a Hugging Face access token into the course site, portal, report, repository, or model package. Marker access is granted through the SlopU Hugging Face organisation.
```

Use the supplied `reportFilename` prop so the pages render:

* Project 1: `ass1_report.pdf`;
* Project 2: `ass2_report.pdf`;
* Project 3: `ass3_report.pdf`.

Do not duplicate three versions of the component.

Give this block an appropriate visible heading such as `Required submission`. Maintain valid heading order beneath the panel’s `Submission` heading.

### 3. Portal action and explanatory note

No real Submission Portal URL currently exists. Therefore:

* keep `Open SlopU Submission Portal` visibly disabled;
* do not render it as an `<a>`;
* do not invent a URL;
* do not use `#`;
* retain the link to the Policies submission checklist;
* explain that the authenticated portal will show `To be submitted` or `Submitted` once provisioned;
* retain the deadline in the panel.

## Test correction

Strengthen `spec/assessment-contract.test.ts`.

Do not treat the presence of text inside `SubmissionPanel.astro` source as proof that students can see it. Remove or replace tests that rely on reading the component source for this content.

For the normal current production build in `dist/`, assert that every rendered Project page visibly contains:

* its correct `assN_report.pdf` filename;
* `final GitLab commit SHA`;
* `submission-manifest.json`;
* the student name and student-ID instruction;
* the Hugging Face token prohibition;
* the correct opening time;
* the correct deadline;
* a disabled/non-link Portal action.

Repeat the essential content assertions against the future-dated preview build so the checklist is proven to remain visible after opening.

Also assert:

* the pre-opening build contains `Will be available at`;
* the post-opening preview contains the neutral open-state message;
* neither build claims that the student is currently `Submitted`;
* neither build contains an input, upload field, token field, or active Portal URL;
* each Project still has exactly six resource cards.

Tests must inspect rendered HTML, not only component source strings or collection metadata.

## Verification order

Run, in this order:

1. the targeted assessment-contract test;
2. the relevant resource-contract tests to prove this change did not regress resource states;
3. `pnpm check`;
4. `pnpm resources:check`;
5. `pnpm check:evidence`;
6. the production build.

Then inspect all three rendered Project pages at:

* 1920×1080;
* 390×844.

Verify:

* the submission checklist is visible before opening;
* the correct filename appears on each page;
* no horizontal overflow;
* logical heading order;
* readable wrapping of filenames and SHA wording;
* visible keyboard focus on the Policies link;
* the Portal action is visibly disabled and cannot receive link navigation;
* no browser console errors.

Do not push or deploy automatically.

At handoff, report:

1. files changed;
2. the old visibility error and the corrected information hierarchy;
3. tests changed;
4. commands and viewport checks completed;
5. any remaining failure or external dependency.

Record the correction and verification contemporaneously in `PROCESS_LOG.md` as required by `CLAUDE.md`, but do not expand `PROCESS.md` during this fix.
