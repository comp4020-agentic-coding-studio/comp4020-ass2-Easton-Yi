---
title: Scale, Data, and Optimisation Under Fixed Compute
description:
  Power-law intuition, Kaplan- and Chinchilla-style compute allocation, data
  quality versus data quantity, and reading a training pilot honestly
week: 3
date: 2027-03-08
teachers:
  - yiwei-easton
slides: /decks/week-03-fixed-compute/
banner: ./images/week-03-banner.svg
bannerAlt: >-
  An iso-compute valley chart — for a fixed compute budget, loss traces a
  curve against model size with a minimum at a balanced parameter/token
  allocation, rising sharply on both sides toward "too small, too many
  tokens" and "too large, too few tokens."
bannerSource: >-
  Original schematic illustration created for this course; not a reproduction
  of any external figure or dataset.
bannerCredit: Original illustration for SLOP4225.
related:
  - sessions/03-project-1-pilot-clinic
  - assessments/project-1
---

**Stage:** Build language ability · Project 1 drop-in clinic

## Summary

Scaling research asks how loss changes with model parameters \(N\), training
tokens \(D\), and compute \(C\). Project 1 asks a smaller but structurally
similar question: with a fixed parameter boundary and compute allowance,
which model, data mixture, and training schedule deserve the budget? This
lecture develops power-law intuition, contrasts the conclusions of
Kaplan-style and Chinchilla-style studies, and treats both as empirical
evidence rather than universal recipes. It then moves from papers to
controllable decisions: data quality and duplication, token budget, batch and
gradient accumulation, learning rate, warm-up, decay, clipping,
regularisation, checkpoint intervals, and stop rules. Short pilots are
framed as measurements used to select a plan, not miniature leaderboard
searches.

## Learning outcomes

After this lecture, you should be able to:

1. distinguish model scale, data scale, and training compute and explain why
   improving only one produces diminishing returns;
2. interpret a power-law relationship and identify the small-data,
   useful-scaling, and irreducible-error regions;
3. compare Kaplan- and Chinchilla-style compute allocation without treating
   either fitted law as a guaranteed 32M recipe;
4. translate a T4-equivalent/FLOP budget into a token, step, and pilot plan;
   and
5. use loss curves, gradient signals, runtime, and sample evidence to decide
   whether to continue, revise, or stop a run.

## 1. The three quantities: N, D, and C

Model parameters bound representational capacity, data tokens provide
learning opportunities, and compute measures the work used to connect them.
Increasing a model without enough data undertrains capacity; repeatedly
cycling a small or duplicated corpus may spend compute without adding
information. A one-GPU thought experiment makes the allocation problem
concrete before any equations are introduced.

## 2. What scaling laws do and do not say

In a power-law region, test loss often decreases predictably but with
diminishing returns as scale increases. Kaplan et al. reported smooth
relationships across model size, data, and compute and argued that large
models can be sample efficient and need not train to convergence. Hoffmann
et al. revisited compute-optimal allocation and found that model size and
tokens should grow more evenly. These results were fitted at much larger
scales than this course; students use their logic to form hypotheses, then
validate locally.

## 3. Data quantity is not data value

Source diversity, document quality, formatting noise, duplication, and
domain match change what one token contributes. TinyStories and the Phi work
illustrate that carefully structured data can make small models surprisingly
capable, but synthetic or aggressively filtered text also imports generator
bias, narrower diversity, and provenance obligations. Project 1 decisions
must report both token counts and source-level evidence.

## 4. From compute ceiling to training schedule

We connect tokens per step, effective batch size, gradient accumulation,
sequence length, steps, and approximate FLOPs. Warm-up protects early
optimisation; learning-rate decay changes how aggressively later updates
move the model; clipping helps contain unstable gradients; weight decay and
dropout trade fit for regularisation. The correct values are not memorised
constants. A pilot should isolate one uncertainty, run long enough to expose
a trend, and stop according to a rule chosen before the result is known.

## 5. Reading a pilot honestly

Training loss alone cannot select a plan. Students compare training and
validation curves, gradient norms, throughput, memory, sample quality, and
run-to-run comparability. An unstable run, a widening validation gap, or a
runtime estimate that exceeds the budget is useful evidence if it changes the
plan and is recorded. Failed optimisation is not transformed into success by
hiding it.

## Required reading

- Jared Kaplan et al., [*Scaling Laws for Neural Language
  Models*](https://arxiv.org/abs/2001.08361), abstract and Sections 1–2.
- Jordan Hoffmann et al., [*Training Compute-Optimal Large Language
  Models*](https://arxiv.org/abs/2203.15556), abstract and Sections 1–3.

## Optional reading

- Suriya Gunasekar et al., [*Textbooks Are All You
  Need*](https://arxiv.org/abs/2306.11644), Sections 1–2.
- Ronen Eldan and Yuanzhi Li, [*TinyStories*](https://arxiv.org/abs/2305.07759),
  Sections 3–4.

## This week's action

Bring a legal configuration, a token/runtime estimate, a curve, a trace, or a
concrete failure to the drop-in clinic, and freeze the principal run plan
before Week 4: hypothesis, control, maximum spend, stop rule, and intended
checkpoint-selection evidence.
