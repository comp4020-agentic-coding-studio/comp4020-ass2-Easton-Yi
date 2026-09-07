---
title: Train a Specialist That Can Be Tested
description:
  Task contracts, frozen starting checkpoints, split integrity, and full
  versus parameter-efficient adaptation for Project 3
week: 10
date: 2027-05-03
teachers:
  - yiwei-easton
related:
  - sessions/10-lab-3-specialist-verifier
  - assessments/project-3
---

**Stage:** Build a specialist · Formal Lab 3

## Summary

Specialisation is post-training with a narrower contract. This lecture
turns that contract into data, targets, and a controlled comparison.
Students choose a permitted starting checkpoint, define the task schema,
create source- or template-aware splits, inspect response-only masks, and
decide whether to train direct answers, short rationales, or both.
Curriculum, counterexamples, data balance, full fine-tuning, and
parameter-efficient adaptation are framed as engineering choices whose value
depends on model size and implementation overhead. Project 3A and 3B share
the same experimental logic: one primary capability, one unchanged baseline,
one meaningful comparison, one regression check, and a package that can be
loaded independently.

## Learning outcomes

After this lecture, you should be able to:

1. translate a bounded task definition into a schema, metric, split, and
   validity gate;
2. choose a permitted starting checkpoint and document its frozen identity;
3. design examples, counterexamples, and curriculum without leaking
   evaluation templates;
4. compare direct-answer and rationale-supervised targets for Project 3B;
   and
5. justify full or parameter-efficient adaptation using total trainable
   parameters, memory, runtime, and reproducibility.

## 1. A task contract before a dataset

The primary capability is written as an input, allowed output, success
measure, and out-of-scope boundary. Track A proposals use the approved
metric and human-evaluation plan; Track B follows `test_pilot`, exact answer
extraction, and format validation. Data is selected only after the contract
is explicit.

## 2. Starting checkpoint and split integrity

The frozen revision, parameter count, tensor shapes, and checksum identify
the starting model. Template families, story sources, or generated problem
seeds are separated so validation measures transfer rather than repetition.
Public tutor prompts remain excluded from training even when their wording
is visible.

## 3. Targets, rationales, and curriculum

Direct answers minimise output burden; short rationales expose intermediate
structure and can make word problems easier to learn, but they also
increase sequence length and can introduce plausible wrong steps. A
curriculum may move from single operations to mixed operations and from
direct arithmetic to short word problems. Difficulty and format should be
balanced deliberately, not inferred from file order.

## 4. Adaptation method and regression

Full fine-tuning updates the entire permitted model. Parameter-efficient
methods may reduce trainable-state and memory costs but add adapter
configuration and may not save total runtime on a tiny model. Either method
must be counted correctly and load in the marker's environment. A retained
narrative or general-language check runs alongside the task metric.

## Required reading

- Karl Cobbe et al., [*Training Verifiers to Solve Math Word
  Problems*](https://arxiv.org/abs/2110.14168), abstract and Sections 1–2.
- Eric Zelikman et al., [*STaR: Self-Taught Reasoner Bootstrapping Reasoning
  With Reasoning*](https://arxiv.org/abs/2203.14465), abstract and Section 2.

## Optional reading

- Edward Hu et al., [*LoRA: Low-Rank Adaptation of Large Language
  Models*](https://arxiv.org/abs/2106.09685), abstract and Section 4.

## This week's action

**Practical:** Lab 3 — Train and Verify a Specialist. Before Week 11:
produce one loadable pilot checkpoint, one valid task metric, and one
unchanged-model baseline result.
