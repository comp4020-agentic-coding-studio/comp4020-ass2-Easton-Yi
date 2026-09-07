---
title: Reasoning as Generated and Verifiable Behaviour
description:
  Chain-of-thought as generated intermediate tokens, self-consistency,
  exact-answer verification, and rationale faithfulness
week: 9
date: 2027-04-26
teachers:
  - yiwei-easton
related:
  - sessions/09-project-3-task-contract
  - assessments/project-3
---

**Stage:** Build a specialist · Project 3 begins

## Summary

Reasoning is introduced as generated intermediate tokens and decisions, not
a hidden faculty that switches on when a model crosses a size threshold. A
model may assign some probability to a correct path while greedy decoding
selects a wrong one. Chain-of-thought demonstrations can reshape the output
distribution; self-consistency spends additional inference compute to
sample multiple paths and aggregate final answers; a verifier separates
generating a candidate from checking it. These tools connect directly to
Project 3B, while the same generate–compare–verify pattern helps Project 3A
define and test a narrative capability. Students also confront a central
limitation: a correct final answer does not prove that the written
rationale is faithful or correct.

## Learning outcomes

After this lecture, you should be able to:

1. represent a rationale as intermediate generated tokens preceding a final
   answer;
2. compare direct, zero-shot CoT, few-shot CoT, and self-consistency
   inference;
3. explain why sampling more paths can improve final-answer accuracy and
   increase cost;
4. implement an exact final-answer and format verifier for bounded
   arithmetic; and
5. distinguish answer correctness, reasoning validity, and rationale
   faithfulness.

## 1. The correct path may not rank first

Greedy decoding returns a locally high-probability continuation, not a proof
that no better reasoning path exists. Inspecting several candidates shows
that both correct and incorrect answers can arise from fluent text. Longer
is not automatically more correct.

## 2. Chain-of-thought as an interface

Few-shot CoT supplies examples of intermediate steps; zero-shot prompts
provide a weaker generic cue. The original gains were demonstrated primarily
on much larger models, so Project 3 treats CoT as a hypothesis to test at
32M rather than an assumed benefit. Short, task-aligned rationales may be
more learnable than verbose traces.

## 3. Self-consistency and inference-time compute

Self-consistency samples diverse reasoning paths and selects the most
frequent final answer. The aggregation is over final answers, not identical
wording. Accuracy may improve, but sample count and rationale length consume
inference budget and must be reported. Correlated errors limit the value of
additional samples.

## 4. Verification

For Project 3B, the parser extracts the final answer and checks it against
ground truth; formatting validation prevents an unparsable output from
being treated as correct. For open-ended narrative tasks, verification
becomes a mixture of explicit constraints and human judgement. In both
tracks, generation and evaluation remain separate pipeline components.

## Required reading

- Jason Wei et al., [*Chain-of-Thought Prompting Elicits Reasoning in Large
  Language Models*](https://arxiv.org/abs/2201.11903), abstract and
  Sections 1–2.
- Xuezhi Wang et al., [*Self-Consistency Improves Chain of Thought Reasoning
  in Language Models*](https://arxiv.org/abs/2203.11171), abstract and
  Section 2.

## Optional reading

- Takeshi Kojima et al., [*Large Language Models Are Zero-Shot
  Reasoners*](https://arxiv.org/abs/2205.11916), Sections 1–2.

## This week's action

**Milestone:** Project 3 alternative-task proposals are due Sunday 2 May
2027 at 23:59 AET. All students should establish the unchanged-model
baseline before training.
