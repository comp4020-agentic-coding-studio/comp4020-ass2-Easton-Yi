---
title: Generalisation, Supervision, and One Honest Ablation
description:
  Template and paraphrase shift, outcome versus process supervision,
  verifiable rewards as frontier context, and a matched ablation design
week: 11
date: 2027-05-10
teachers:
  - yiwei-easton
related:
  - sessions/11-project-3-generalisation-clinic
  - assessments/project-3
---

**Stage:** Build a specialist · Project 3 drop-in clinic

## Summary

A specialist model is useful only if its capability survives beyond
examples that look like its training set. This lecture begins with template
and paraphrase shift, then develops outcome versus process supervision and
the role of verifiable rewards. Outcome supervision is cheap and objective
when a final answer can be checked; process supervision can diagnose steps
but is expensive and may inherit errors from automated annotation. GRPO and
RL from verifiable rewards are presented as frontier extensions that explain
current reasoning systems, not required Project 3 methods. The practical
centre is a matched ablation: change one factor, measure task performance
and one retained capability, classify errors, and avoid claiming a
mechanism the experiment cannot identify.

## Learning outcomes

After this lecture, you should be able to:

1. design tests for paraphrase, template, operand-range, and composition
   shift;
2. compare outcome and process supervision by signal quality, annotation
   cost, and diagnostic value;
3. explain how verifiable rewards differ from a learned reward model and
   how group-relative baselines work conceptually;
4. run or specify a matched ablation with controlled data, compute, and
   evaluation; and
5. state a supported conclusion alongside a plausible alternative
   explanation.

## 1. Generalisation is a family of shifts

Held-out examples from the same template test interpolation, not broad
reasoning. Students vary surface wording, operation combinations, story
structures, and allowed numeric range while keeping the published task
scope. Track A uses analogous constraint or prompt changes. Performance is
reported by slice so one easy subset cannot hide a failure.

## 2. Outcome and process supervision

An outcome reward checks the final answer; a process reward scores
intermediate steps. Process labels can support search and error
localisation, but human step annotation is expensive and automated rollouts
can drift from the policy being evaluated. A correct outcome does not
certify every stated step, while a flawed rationale can occasionally reach a
correct answer.

## 3. Verifiable rewards and GRPO as frontier context

When a task has an objective checker, RL can use rule-based rewards without
a learned reward model. GRPO compares a group of responses to the same
prompt and uses the group mean as a prompt-specific baseline instead of a
separate value model. Students should understand the signal path and
limitations, but Project 3 does not require implementing RLVR, PPO, GRPO, or
a process reward model.

## 4. The ablation and the claim

A useful ablation changes one factor — rationale targets, data mix,
learning rate, starting checkpoint, or decoding rule — while holding
evaluation constant. Results include cost and regressions. If several
factors changed, the comparison can show a system difference but cannot
isolate which change caused it. Postgraduate analysis is expected to
examine mechanism and alternative explanations more deeply.

## Required reading

- Hunter Lightman et al., [*Let's Verify Step by
  Step*](https://arxiv.org/abs/2305.20050), abstract and Sections 1–2.
- Jeffrey Zhou et al., [*Instruction-Following Evaluation for Large Language
  Models*](https://arxiv.org/abs/2311.07911), Section 2, as an example of
  rule-verifiable behaviour.

## Optional reading

- Zhihong Shao et al., [*DeepSeekMath: Pushing the Limits of Mathematical
  Reasoning in Open Language
  Models*](https://arxiv.org/abs/2402.03300), Sections 1 and 4.
- Liangchen Luo et al., [*Improve Mathematical Reasoning in Language Models
  by Automated Process
  Supervision*](https://arxiv.org/abs/2406.06592), abstract and Section 3.

## This week's action

**Support:** Project 3 drop-in clinic. Before Week 12: freeze the candidate
checkpoint and write the strongest conclusion your comparison supports plus
one conclusion it does not support.
