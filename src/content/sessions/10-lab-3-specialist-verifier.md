---
title: "Lab 3 — Train and Verify a Specialist"
description:
  Turn a task contract into valid training and evaluation records, build a
  verifier before training, and test one shifted slice and one retained capability
week: 10
date: 2027-05-03
teachers:
  - maya-rao
sessionType: lab
spec:
  - the verifier was working before the model was trained
  - evaluation templates or prompts are absent from training data
  - a formatted but wrong answer fails correctness, and a correct but unparsable answer fails the technical gate
  - the comparison changed one meaningful factor
  - the pilot can reload without notebook state
related:
  - lectures/week-10
  - assessments/project-3
---

**Estimated active time:** 120 minutes · **Notebook:**
`lab-03-specialist-verifier.ipynb` — released Monday 3 May 2027 at 09:00 AET
· **Solution release:** after the final scheduled Lab 3 class.

## Learning goals

- turn a task contract into valid training and evaluation records;
- build a parser and verifier before the main training run;
- compare direct-answer and short-rationale targets on a bounded example;
  and
- test one out-of-template slice and one retained capability.

## Preparation

Choose Project 3 Track A or B and bring the approved/standard task
definition. Track B students run the repository's `test_pilot` format
check; Track A students bring the approved automatic metric and
human-rating anchors. Load the unchanged starting checkpoint in a fresh
process.

## Activity

1. **Read it:** write the input contract, allowed output, validity gate,
   primary metric, out-of-scope conditions, and one regression metric.
2. **Run it:** create a template/source-aware split and run the
   contamination validator. Implement or configure answer extraction and
   format checking before training.
3. **Inspect it:** render two training examples and their target masks.
   For Track B, compare a direct answer with a short-rationale record; for
   Track A, compare a valid and deliberately invalid output under the task
   constraints.
4. **Change one thing:** perform a bounded pilot comparison with one
   controlled difference, such as target format, data mixture, or learning
   rate. Do not combine several changes.
5. **Transfer it:** evaluate unchanged and pilot checkpoints on
   in-template validation, one shifted slice, and one retained-capability
   prompt. Save a loadable pilot package.

## Expected output

- one task-contract table;
- split and contamination-validation records;
- passing extraction/format tests including invalid edge cases;
- a matched pilot comparison with task, shifted-slice, regression, and
  compute results; and
- a loadable checkpoint plus a 200-word decision note.
