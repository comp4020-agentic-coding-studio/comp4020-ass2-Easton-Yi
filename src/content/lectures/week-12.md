---
title: Audit the Training System
description:
  Reconstructing the artifact chain, reproducing the core metric, what
  transfers across scale, and the final engineering retrospective
week: 12
date: 2027-05-17
teachers:
  - yiwei-easton
banner: ./images/week-12-banner.svg
bannerAlt:
  A linked chain of four boxes running left to right—data revision, code
  revision, training run, and loadable checkpoint—each joined by a hash-link
  icon, presenting the submission as an auditable system of artefacts.
bannerSource: >-
  Original schematic illustration created for this course; not a reproduction
  of any external figure or dataset.
bannerCredit: Original illustration for SLOP4225.
related:
  - sessions/12-project-3-fresh-load-audit
  - assessments/project-3
---

**Stage:** Build a specialist · Project 3 due

## Summary

The course ends by treating the model as one component of an auditable
training system. Students reconstruct the path from task definition through
data, configuration, compute ledger, checkpoints, evaluation, and final
claim. A peer or fresh process must be able to load the exact artifact and
reproduce the core metric. The lecture then revisits scale transfer:
large-model scaling laws, emergent-behaviour claims, long reasoning traces,
RLVR, and inference-time compute can inspire a small experiment, but
evidence at one scale does not automatically establish a mechanism at
another. The final retrospective asks where the original plan changed,
which evidence caused the change, and what uncertainty remains.

## Learning outcomes

After this lecture, you should be able to:

1. audit the consistency of a checkpoint, tokenizer, configuration, data
   revision, sampler, and evaluation command;
2. reconcile the compute ledger with the final report and model card;
3. distinguish reproducibility of an artifact from replicability of a
   scientific claim;
4. evaluate whether a frontier result plausibly transfers to a 32M
   experiment; and
5. write a concise engineering retrospective grounded in decisions and
   evidence.

## 1. The artifact chain

Every reported result points to a frozen GitLab commit, data version,
starting and final checkpoint revision, configuration, seed policy,
sampler, and evaluation command. Checksums and tensor shapes catch
mismatched weights; a fresh load catches hidden notebook state and missing
files.

## 2. Reproduce the number and the behaviour

The core metric is rerun from the packaged model. Fixed prompts and
generation settings reproduce comparable outputs, while a small additional
sample shows the model is not only replaying a cached artifact. Technical
validity, task performance, and human judgement are recorded separately.

## 3. What transfers across scale

Scaling laws describe fitted empirical regimes, not promises for every
architecture and dataset. Claims of emergence depend on metrics and
sampling; data quality can dominate quantity in small settings; longer
reasoning and more samples trade compute for probability of success.
Students identify which course results are direct evidence and which are
analogies to frontier systems.

## 4. The final retrospective

A strong retrospective names the original plan, the observation that
challenged it, the revision made, the cost of that revision, and the
remaining uncertainty. It does not need a perfect final model. It needs a
traceable explanation of why the final system is the most defensible use of
the available budget.

## Required reading

- Jared Kaplan et al., [*Scaling Laws for Neural Language
  Models*](https://arxiv.org/abs/2001.08361), limitations relevant to
  extrapolation.
- Rylan Schaeffer, Brando Miranda, and Sanmi Koyejo, [*Are Emergent
  Abilities of Large Language Models a
  Mirage?*](https://arxiv.org/abs/2304.15004), abstract and Sections 1–2.

## Optional reading

- Xuezhi Wang et al., [*Self-Consistency Improves Chain of Thought Reasoning
  in Language Models*](https://arxiv.org/abs/2203.11171), discussion of
  inference cost and limitations.

## This week's action

**Deadline:** Project 3, Sunday 23 May 2027 at 23:59 AET. Complete the
fresh-environment audit before submission.
