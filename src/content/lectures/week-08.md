---
title: Did the Behaviour Change, and What Regressed?
description:
  Multi-objective post-training evaluation, blind A/B review, paraphrase
  robustness, and checkpoint selection against a pre-declared priority
week: 8
date: 2027-04-19
teachers:
  - yiwei-easton
banner: ./images/week-08-banner.svg
bannerAlt:
  A two-axis plot of target-behaviour improvement against retention, with a
  base model, an over-tuned checkpoint that regresses, and a candidate
  checkpoint plotted to show the trade-off assessed jointly rather than as
  one score.
bannerSource: >-
  Original schematic illustration created for this course; not a reproduction
  of any external figure or dataset.
bannerCredit: Original illustration for SLOP4225.
related:
  - sessions/08-project-2-blind-evaluation
  - assessments/project-2
---

**Stage:** Shape model behaviour · Project 2 due

## Summary

Post-training creates a multi-objective evaluation problem. A checkpoint may
match target vocabulary while becoming repetitive, follow an exact
instruction while failing a paraphrase, or improve style ratings while
losing general narrative coherence. This lecture shows how to define
target-style, instruction-compliance, narrative-quality, memorisation, and
retention measures without collapsing them into one opaque score. Students
practise blind paired comparisons, recognise evaluator and prompt-order
effects, inspect source overlap, and select checkpoints against a declared
priority rather than whichever metric looks best. The resulting report
should say what changed, what did not, and which evidence cannot distinguish
competing explanations.

## Learning outcomes

After this lecture, you should be able to:

1. operationalise a behavioural target using observable anchors and
   held-out evidence;
2. design a blind A/B review that separates model identity from candidate
   quality;
3. evaluate paraphrase robustness, copying, and retained narrative ability;
4. select a checkpoint across competing objectives using a pre-declared
   rule; and
5. write a calibrated claim that distinguishes measurement, interpretation,
   and uncertainty.

## 1. Separate target behaviour from surface mimicry

Target-word frequency can rise without a convincing voice. Human anchors
therefore cover coherence, target behaviour, and major defects, while
target-domain PPL provides a complementary distributional measure. Selected
examples must include failures and cannot be silently edited.

## 2. Blind comparison and rater variability

Candidate order is randomised and model identities are hidden. Three raters
score official story outputs independently under the published anchors;
medians reduce sensitivity to one extreme score, and adjudication addresses
large disagreement. Student-run formative reviews should record prompt,
sampler, rater count, and order policy.

## 3. Robustness, retention, and copying

The same intent is tested through paraphrased prompts or changed story
openings. General narrative prompts reveal catastrophic forgetting. Exact
and near-duplicate checks plus phrase-level inspection distinguish plausible
genre convention from suspicious reproduction of source text.

## 4. Multi-objective checkpoint selection

Students identify one primary target and minimum acceptable floors for
retained behaviour and technical validity. A checkpoint that wins one metric
but violates a floor is not selected. The report presents the trade-off
openly instead of manufacturing a single composite score after seeing
results.

## Required reading

- Jeffrey Zhou et al., [*Instruction-Following Evaluation for Large Language
  Models*](https://arxiv.org/abs/2311.07911), abstract and Sections 1–2.
- Course page, **Human review protocol and rating anchors**.

## Optional reading

- Percy Liang et al., [*Holistic Evaluation of Language
  Models*](https://arxiv.org/abs/2211.09110), Sections 1–2.

## This week's action

**Deadline:** Project 2, Sunday 25 April 2027 at 23:59 AET. Preserve the
unchanged-checkpoint baseline outputs alongside the final outputs.
