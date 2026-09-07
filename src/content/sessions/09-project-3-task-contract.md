---
title: Project 3 Task Contract and Baseline
description:
  Choose a permitted track and bounded target behaviour, write a valid
  task contract, and establish the unchanged starting-model baseline
week: 9
date: 2027-04-26
teachers:
  - yiwei-easton
sessionType: guided
spec:
  - correctness can be distinguished from formatting
  - the generalisation case is not a renamed training template
related:
  - lectures/week-09
  - assessments/project-3
---

**Estimated active time:** 45 minutes · **Release:** Monday 26 April 2027 at
09:00 AET · **Solution release:** immediate completion checklist; no model
solution.

## Learning goals

- choose a permitted track and one bounded target behaviour;
- write valid input, output, metric, and out-of-scope conditions;
- establish the unchanged starting-model baseline; and
- identify whether a Track A proposal is required.

## Preparation

Read the Project 3 page. Track B students inspect `test_pilot`; Track A
students select a supported capability or begin the one-page alternative
proposal.

## Activity

1. State the task contract, parser/validity gate, primary metric,
   generalisation slice, and regression metric.
2. Record the exact permitted starting checkpoint and run its unchanged
   baseline.
3. Inspect the proposed split at source/template level and run the
   separation validator.
4. Allocate the 12-hour/1.5×10^17-FLOP budget across dry run, comparison,
   final run, and recovery.
5. If proposing an alternative Track A task, freeze and submit
   `proposal.md` by Sunday 2 May at 23:59 AET; do not exceed the permitted
   0.5-hour pre-approval dry run.

## Expected output and self-check

Retain one task-contract table, baseline report, split validation, and
compute plan. The task is ready only if correctness can be distinguished
from formatting and the generalisation case is not a renamed training
template.
