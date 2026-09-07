---
title: Project 1 Evaluation and Packaging
description:
  Run the released evaluation pipeline, verify a fresh-process load, and
  reconcile the report, ledger, and model package before submission
week: 4
date: 2027-03-15
teachers:
  - yiwei-easton
sessionType: guided
spec:
  - the documented command loads the same weights described in the report
  - the report names the same revision as the submitted package
  - no secret appears anywhere in the package
related:
  - lectures/week-04
  - assessments/project-1
---

**Estimated active time:** 60 minutes · **Release:** Monday 15 March 2027 at
09:00 AET · **Solution release:** immediate submission checklist; no model
solution.

## Learning goals

- run the released evaluation pipeline without tuning against evaluation
  items;
- verify that the candidate checkpoint loads outside notebook state; and
- reconcile the report, compute ledger, code revision, and model package.

## Preparation

Freeze a candidate checkpoint and decoding configuration. Stop principal
training before beginning this audit; the session introduces no new method.

## Activity

1. Run all five development examples and retain unedited outputs with
   decoding settings.
2. Run the public PPL/BPB, repetition, and stopping checks; label
   development evidence correctly.
3. Load the checkpoint in a fresh process and reproduce one output from the
   documented command.
4. Verify parameter count, `compute-ledger.json`, tokenizer, sampler,
   checksums, GitLab commit, and HF revision.
5. Complete the rubric-evidence map and the `ass1_report.pdf`/portal
   checklist.

## Expected output and self-check

Retain one fresh-load log, evaluation summary, final manifest, and completed
checklist. Do not submit if the documented command loads different weights,
the report names a different revision, or any secret appears in the
package.
