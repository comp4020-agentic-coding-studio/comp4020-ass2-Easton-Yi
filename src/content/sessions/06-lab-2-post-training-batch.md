---
title: "Lab 2 — Build and Inspect a Post-Training Batch"
description:
  Render a response-only loss mask, run a bounded SFT update, and test
  whether an apparent behaviour survives prompt paraphrase
week: 6
date: 2027-03-29
teachers:
  - maya-rao
sessionType: lab
spec:
  - another person could reconstruct the exact training string from the schema
  - prompt and padding labels are masked as declared
  - EOS is present and trained intentionally
  - the comparison uses the same starting checkpoint and data
  - synthetic or edited material is labelled honestly
related:
  - lectures/week-06
  - assessments/project-2
---

**Estimated active time:** 120 minutes · **Notebook:**
`lab-02-post-training-batch.ipynb` — released Monday 29 March 2027 at 09:00
AET · **Solution release:** after the final scheduled Lab 2 class.

## Learning goals

- distinguish continued-pre-training and SFT records at data and target
  level;
- render and verify a response-only loss mask;
- run a bounded SFT update and compare it with the unchanged checkpoint; and
- test whether an apparent behaviour survives prompt paraphrase.

## Preparation

Complete Weeks 5–6 readings. Load the supplied Project 1 fallback checkpoint
or a compatible personal Project 1 checkpoint. Bring three short examples of
the target voice; do not use tutor-evaluation prompts or answers.

## Activity

1. **Read it:** inspect one raw target-style paragraph, one instruction
   record, and their serialised token sequences. State what behaviour each
   training format can supervise.
2. **Run it:** use the supplied formatter to create prompt, response, EOS,
   attention mask, and labels. Render every token with a `loss/no-loss`
   flag.
3. **Inspect it:** catch three planted errors: an off-by-one target, prompt
   tokens receiving loss, and a missing EOS target. Explain how each could
   change behaviour or evaluation.
4. **Change one thing:** run the same tiny SFT batch with response-only loss
   and with the supplied alternative masking choice. Hold checkpoint,
   examples, learning rate, steps, and seed fixed.
5. **Transfer it:** evaluate the unchanged and tuned checkpoints on the
   original prompt, a paraphrase, and a retained narrative prompt. Decide
   whether the schema teaches the intended behaviour or mainly memorises
   the surface format.

## Expected output

- a declared data schema and one fully rendered token/mask example;
- corrected unit-test results for the three planted failures;
- a compact loss/runtime table for the two masking runs;
- unchanged-versus-tuned outputs on three prompt types; and
- a 200-word Project 2 method note covering target, gain, regression, and
  next decision.
