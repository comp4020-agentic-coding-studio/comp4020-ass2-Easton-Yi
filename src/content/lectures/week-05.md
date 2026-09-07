---
title: From a Base Model to a Target Behaviour
description:
  Capability versus elicited behaviour, continued pre-training versus SFT
  versus preference learning, and a measurable narrative-voice target
week: 5
date: 2027-03-22
teachers:
  - yiwei-easton
related:
  - sessions/05-project-2-target-and-baseline
  - assessments/project-2
---

**Stage:** Shape model behaviour · Project 2 begins

## Summary

Pre-training teaches a model to continue text from its data distribution; it
does not guarantee a stable voice, an instruction-following interface, or a
behaviour a user can request reliably. This lecture defines post-training by
its supervision signal rather than by a single algorithm. Continued
pre-training changes the text distribution the model imitates. Supervised
fine-tuning trains desired prompt–response or structured continuations.
Preference learning compares candidate outputs when quality is difficult to
express as one reference. Students map these choices to Project 2 and learn
that the simplest method capable of testing the target is often stronger
engineering than an expensive pipeline whose additional stages cannot be
validated.

## Learning outcomes

After this lecture, you should be able to:

1. distinguish language capability from elicited and user-facing behaviour;
2. compare continued pre-training, SFT, and preference-based post-training by
   data, objective, cost, and evidence;
3. define a narrative voice using observable output criteria rather than an
   impressionistic label;
4. identify a baseline and retained capability needed to measure behavioural
   change; and
5. choose a proportionate post-training route for a 32M checkpoint.

## 1. Why the pre-training objective is not a user specification

A base model was asked to predict internet or story tokens, and it does
exactly that. It may produce fluent text while responding unstably to an
instruction or drifting between styles. Post-training supplies additional
evidence about which continuations are useful in a particular interaction or
domain.

## 2. Three routes through Project 2

Continued pre-training is appropriate when the target is naturally
represented as unlabelled target-domain prose. SFT is appropriate when the
desired behaviour can be demonstrated as examples with a declared
input/output schema. Preference optimisation may help when relative quality
is easier to label than a single ideal output, but it requires trustworthy
pairs, a reference policy, and additional validation.

## 3. Turn "voice" into a measurement plan

Students decompose a target voice into dimensions such as diction, sentence
rhythm, dialogue balance, narrative perspective, thematic motifs, and
coherence. A target-style hold-out measures domain fit; blind human
comparisons assess whether the behaviour is recognisable; a general
narrative set checks retention. No one metric stands in for all three.

## 4. Baselines and method claims

Every intervention is compared with the unchanged starting checkpoint under
the same prompts and sampler. If two post-training routes are compared,
their data and compute must be reported. Students may combine methods, but
each added stage must answer a stated uncertainty rather than merely make
the pipeline look more advanced.

## Required reading

- Jason Wei et al., [*Finetuned Language Models Are Zero-Shot
  Learners*](https://arxiv.org/abs/2109.01652), abstract and Sections 1–2.
- Long Ouyang et al., [*Training Language Models to Follow Instructions with
  Human Feedback*](https://arxiv.org/abs/2203.02155), abstract and Figure 2.

## Optional reading

- Rohan Taori et al., [*Stanford
  Alpaca*](https://github.com/tatsu-lab/stanford_alpaca), project overview
  and data-generation description.

## This week's action

Before Week 6: write an operational target-voice statement, choose the
unchanged checkpoint baseline, and identify the minimum data needed for one
viable route.
