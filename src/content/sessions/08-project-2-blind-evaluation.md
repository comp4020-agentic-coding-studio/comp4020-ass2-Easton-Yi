---
title: Project 2 Blind Evaluation and Packaging
description:
  Compare the unchanged and tuned checkpoints under blinded, matched
  conditions and package a reproducible Project 2 submission
week: 8
date: 2027-04-19
teachers:
  - yiwei-easton
sessionType: guided
spec:
  - a style improvement alone does not justify selection if the output is unusable
  - a style improvement alone does not justify selection if the output is copied
  - a style improvement alone does not justify selection if it is supported only by favourable prompts
related:
  - lectures/week-08
  - assessments/project-2
---

**Estimated active time:** 60 minutes · **Release:** Monday 19 April 2027 at
09:00 AET · **Solution release:** immediate submission checklist; no model
solution.

## Learning goals

- compare the unchanged and tuned checkpoints under blinded, matched
  conditions;
- interpret target gain together with retention, copying, and degeneration;
  and
- package a reproducible Project 2 submission.

## Preparation

Freeze the candidate checkpoint, unchanged baseline, generation settings,
and evaluation prompts before viewing the comparison.

## Activity

1. Generate matched, de-identified output pairs and run the published
   rating/metric procedure.
2. Complete the target-versus-retention table and record uncertainty or
   rater disagreement.
3. Run source-overlap, repetition, malformed-stopping, and
   prompt-paraphrase checks.
4. Reload the final checkpoint in a clean process and verify the documented
   generation command.
5. Reconcile the evidence map, `compute-ledger.json`, model card,
   checksums, `ass2_report.pdf`, and portal fields.

## Expected output and self-check

Retain the blind comparison, retention table, integrity checks, fresh-load
log, and final manifest. A style improvement does not justify selection if
the output is unusable, copied, or supported only by favourable prompts.
