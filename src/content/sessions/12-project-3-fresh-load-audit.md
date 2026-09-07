---
title: Project 3 Fresh-Load Audit and Submission
description:
  Reproduce the final specialist in a clean environment and submit one
  internally consistent evidence chain
week: 12
date: 2027-05-17
teachers:
  - yiwei-easton
sessionType: guided
spec:
  - the report, code, model card, portal identifiers, and reproduced outputs all refer to the same frozen system
related:
  - lectures/week-12
  - assessments/project-3
---

**Estimated active time:** 60 minutes · **Release:** Monday 17 May 2027 at
09:00 AET · **Solution release:** immediate submission checklist; no model
solution.

## Learning goals

- reproduce the final specialist in a clean environment;
- rerun task, shifted-slice, and regression evaluation from frozen
  revisions; and
- submit one internally consistent evidence chain.

## Preparation

Freeze the candidate checkpoint, parser/verifier, decoding settings, and
evaluation configuration. This session is an audit, not permission for an
unplanned final sweep.

## Activity

1. Create a fresh environment and load the exact HF revision using only
   documented files and commands.
2. Run valid and invalid format edge cases, the primary metric, one
   shifted slice, and one retained-capability check.
3. Reconcile parameter preflight, compute ledger, data/code/model
   revisions, checksums, and report tables.
4. Confirm that the SlopU marking account can read the frozen private
   repository without receiving a token.
5. Complete the `ass3_report.pdf` and authenticated portal checklist; save
   the receipt after submission.

## Expected output and self-check

Retain the clean-environment log, final metric table, regression result,
manifest, and receipt. The package is ready only if the report, code, model
card, portal identifiers, and reproduced outputs all refer to the same
frozen system.
