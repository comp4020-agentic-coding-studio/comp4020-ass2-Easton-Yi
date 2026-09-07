---
title: Learning from Preferences Without Hiding the Cost
description:
  Bradley–Terry preference data, reward models and RLHF, RLAIF and DPO, and
  proportionate preference learning at 32M parameters
week: 7
date: 2027-04-12
teachers:
  - yiwei-easton
related:
  - sessions/07-project-2-behaviour-clinic
  - assessments/project-2
---

**Stage:** Shape model behaviour · Project 2 drop-in clinic

## Summary

Some qualities — voice, helpfulness, restraint, or overall story
preference — are easier to compare between two outputs than to demonstrate
with one perfect answer. This lecture follows a preference signal through
reward modelling, RLHF, RLAIF, and DPO. The mathematics is kept sufficient to
interpret the objective and failure modes: Bradley–Terry ranking,
sequence-level policy gradients, KL control, implicit rewards, and reference
policies. Full PPO-scale RLHF is not a compulsory course implementation. The
engineering lesson is to distinguish what each label actually supports,
recognise reward hacking and distribution shift, and ask whether a small
preference stage provides evidence worth its data and compute.

## Learning outcomes

After this lecture, you should be able to:

1. construct a pairwise preference record and explain the Bradley–Terry
   ranking assumption;
2. describe the SFT, reward-model, and policy stages of classical RLHF;
3. explain intuitively why sampled sequence rewards require a
   policy-gradient estimator and why KL control is used;
4. compare human feedback, AI feedback, and DPO without mislabelling one as
   another; and
5. identify reward hacking, off-policy distribution shift, label
   inconsistency, and reference-policy drift.

## 1. Preference data

For one prompt, labelers compare candidates under published anchors. The
result says one observed output was preferred under those conditions; it
does not reveal a universal scalar truth. Candidate order, sampler, rater
reliability, ties, and the proximity of candidates to the current policy
affect the dataset.

## 2. Reward models and RLHF

A reward model learns to score preferred outputs above rejected outputs. A
policy then samples sequences and is updated toward higher reward. Because
sampling is discrete, the reward weights gradients of the sampled sequence
log-probability rather than being differentiated through the sampled words.
A KL penalty discourages the policy from moving into regions the SFT
reference assigns negligible probability.

## 3. RLAIF and DPO

RLAIF replaces or supplements human preference labels with an AI judge and
therefore inherits judge capability, prompt, order, and bias risks. DPO
removes the separately trained reward model and directly increases the
relative preference of chosen over rejected responses against a reference
policy. It is simpler operationally, not evidence-free; pair quality and the
reference remain central.

## 4. Proportionate choices at 32M

The supported course exercise uses a tiny fixed preference set and an
inspectable loss. Students may use a preference method in Project 2 only
when the target, labels, baseline, and retained-capability evaluation
justify it. Work using AI labels is described as AI feedback; work without
genuine human preference labels is not called full RLHF.

## Required reading

- Long Ouyang et al., [*Training Language Models to Follow Instructions with
  Human Feedback*](https://arxiv.org/abs/2203.02155), Sections 2 and 3.4.
- Rafael Rafailov et al., [*Direct Preference Optimization: Your Language
  Model Is Secretly a Reward
  Model*](https://arxiv.org/abs/2305.18290), abstract and Sections 3–4.

## Optional reading

- Yuntao Bai et al., [*Constitutional AI: Harmlessness from AI
  Feedback*](https://arxiv.org/abs/2212.08073), Sections 1–2.

## This week's action

**Support:** Project 2 drop-in clinic. Before Week 8: freeze the final
comparison set and decide whether every extra training stage produced
evidence strong enough to retain in the final pipeline.
