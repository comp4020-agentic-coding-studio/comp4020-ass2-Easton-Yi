---
title: Project 1 Launch and Data Validation
description:
  Verify the supported environment and data checksums, and write a bounded
  Project 1 target before selecting an architecture
week: 1
date: 2027-02-22
teachers:
  - yiwei-easton
sessionType: guided
spec:
  - the document-level split is confirmed, not a token-level split
  - all flagged exact or near-duplicate overlap has been resolved or reported
  - the target statement describes observable continuation behaviour, not "get the lowest loss"
related:
  - lectures/week-01
  - assessments/project-1
---

**Estimated active time:** 45 minutes · **Release:** Monday 22 February 2027
at 09:00 AET · **Solution release:** immediate completion checklist; no model
solution.

## Learning goals

- locate the canonical brief, starter repository, data card, and evaluation
  pack;
- verify the supported environment and data checksums;
- distinguish document-level training, validation, development, and
  tutor-evaluation material; and
- state one bounded Project 1 target before selecting an architecture.

## Preparation

Read the Project 1 page and the Week 1 lecture. Accept the assigned GitLab
repository and confirm that no credential, private key, or HF token is
stored in the working directory.

## Activity

1. Run the CPU environment check and record the installed framework/CUDA
   state.
2. Read the dataset card, verify the supplied checksum, and generate
   `data_summary.json`.
3. Inspect the document-level split and run the exact/near-duplicate
   separation validator.
4. Run the untouched tokenizer/data smoke test without beginning a principal
   training run.
5. Write a 120-word target statement naming the intended continuation
   behaviour, one failure to monitor, and the initial compute reservation.

## Expected output and self-check

Retain the environment report, `data_summary.json`, separation-validator
output, and target statement. You are ready for Lab 1 only if the split is
document-level, all flagged overlap has been resolved or reported, and the
target describes observable behaviour rather than "get the lowest loss."
