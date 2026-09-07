---
title: Project 2 — Give the Model a Voice
description:
  Post-train the frozen Project 1 checkpoint to produce stories with a
  recognisable target narrative style, and prove the change without hiding
  a regression.
week: 8
project: 2
opens: 2027-03-22T00:00:00+11:00
due: 2027-04-25T23:59:00+10:00
weight: 50
reportFilename: ass2_report.pdf
spec:
  - the starting checkpoint (own Project 1 submission or the course fallback) is declared and verified
  - the target style is defined in operational rather than purely impressionistic terms
  - the post-trained model is compared with its unchanged starting checkpoint on the same held-out cases
  - held-out target-style texts are separated from training data at story or source level
  - the report tests for regressions in the original Project 1 narrative capability
  - any instruction schema, special tokens, and response-only loss masking are documented
  - work without genuine human preference labels is not described as full RLHF
  - training and evaluation stay within 18 T4-equivalent GPU-hours and 2.5×10^17 training FLOPs
related:
  - assessments/project-1
  - assessments/project-3
---

## Page summary

Starting from either your frozen Project 1 submission or the course narrative fallback checkpoint,
post-train the model to produce stories with a recognisable target narrative style. The supplied
target corpora are processed, verified public-domain editions of *Grimm's Fairy Tales* and *One
Thousand and One Nights*. You may use one or both, or justify a permitted supplement or
replacement.

"Post-training" is used broadly here: any training performed after Project 1 to change the model's
domain, style, or conditioned behaviour. You may choose target-domain continued pre-training,
supervised instruction tuning, preference-based optimisation, or a justified combination. The
method is open; the target behaviour and evaluation obligation are not.

## Key facts

| Item | Value |
| --- | --- |
| Weight | 50% |
| Marks available | 50 |
| Training stage | Post-training |
| Work mode | Individual |
| Model size | 32M design target; 33.6M absolute maximum |
| Compute budget | 18 T4-equivalent GPU-hours and 2.5×10<sup>17</sup> training FLOPs |
| Main report | 20 CVPR pages, excluding references and appendix |
| Due | Sunday 25 April 2027, 23:59 AET — end of Week 8 |

## What you must demonstrate

Define the target style in operational terms, use the supplied corpora or justify a permitted
replacement, compare the post-trained model with the unchanged starting checkpoint, and evaluate
target adaptation alongside narrative quality and retention. The project rewards the engineering
fit between method, data, budget, and evidence — not the complexity or novelty of the post-training
algorithm.

If you use instruction tuning, document the schema, special tokens, and loss masking. If you use
preference optimisation, first establish an SFT or otherwise appropriate baseline and demonstrate
why the extra pipeline and compute were justified. Work without genuine human preference labels
must not be described as full RLHF.

### Required investigation

- define the target style in operational rather than purely impressionistic terms
- construct or curate suitable post-training data
- compare the post-trained model with its unchanged starting checkpoint
- separate held-out target-style texts at story or source level
- evaluate both target-style adaptation and narrative quality
- test for regressions in the original narrative capability
- analyse the effect of important training and sampling choices
- explain why the final method was selected over feasible alternatives

## Marking breakdown

| Component | Marks |
| --- | ---: |
| Engineering report | 35 |
| Submitted model | 15 |
| **Total** | **50** |

### Engineering report — 35 marks

**1. Target behaviour and method rationale — 5 marks.** A testable definition of the intended
voice or style, success criteria beyond a vague resemblance claim, and a reasoned choice among
continued pre-training, SFT, preference optimisation, or a combination.

**2. Data design and provenance — 5 marks.** Permitted and well-documented source editions,
story/source-level splits, appropriate cleaning and formatting, token and source statistics,
deduplication or overlap checks, and a defensible balance between target-style data and retained
narrative ability.

**3. Implementation and reproducibility — 5 marks.** A correct transition from the starting
checkpoint, a reproducible post-training pipeline, traceable tokenizer/chat-template/loss-mask
behaviour, declared hyperparameters and seeds, and a final package matching the reported method.

**4. Experimental design and budget judgement — 7 marks.** Meaningful baseline comparisons,
controlled ablations or pilots, justified training duration and checkpoint selection, and evidence
of prioritising experiments under the compute deadline.

**5. Multi-objective evaluation and regression analysis — 8 marks.** Held-out target-style
language modelling, blind or clearly structured behavioural comparison, narrative
coherence/completeness assessment, repetition and source-overlap checks, and evaluation of the
original Project 1 capability.

**6. Communication, limitations, and engineering reflection — 5 marks.** A coherent report making
the decision trail visible: initial expectation, evidence, revision, final choice, limitations,
and what the project reveals about post-training under constraints.

### Submitted model — 15 marks

Submission validity is a technical gate. A valid model receives up to **10 marks** from the shared
tutor-evaluation PPL rule and up to **5 marks** from blinded task-specific review.

**7. Tutor-evaluation perplexity — 10 marks.** The shared formula applied to continuation-only
reference-token-normalised PPL across all ten tutor prompts: P ≤ 25 earns all 10 marks; 25 < P < 50
receives an exponential decay of exp(-0.1 × (P − 25)); P ≥ 50 earns zero for this criterion.

**8. Target behaviour, narrative quality, and retention — 5 marks.** Whether readers can
consistently recognise the operationally defined target behaviour across varied openings while the
output remains fluent, connected, and narratively usable. Task-specific dimension weights:
recognisable target behaviour **35%**; narrative coherence and usability **30%**; robustness across
varied openings **20%**; retention and integrity, including unacceptable regression or copying
**15%**. A single showcase, memorised passage, or strong style signal attached to an incoherent
story cannot earn high marks.

## Individual work

This project is submitted individually. AI assistance is permitted when declared in the required
AI Assistance Statement; responsibility for the submitted work remains with you. See
[Policies](/policies/) for the full individual-work, collaboration, and AI-assistance rules.
