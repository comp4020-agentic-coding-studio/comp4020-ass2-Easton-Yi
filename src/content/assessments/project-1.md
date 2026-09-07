---
title: Project 1 — Build a Narrative Base Model
description:
  Train a decoder-only language model from scratch that can continue an
  incomplete story with recognisably narrative language.
week: 4
project: 1
opens: 2027-03-01T00:00:00+11:00
due: 2027-03-21T23:59:00+11:00
weight: 20
reportFilename: ass1_report.pdf
spec:
  - the checkpoint loads with the supplied command and is at or under 33.6M learned parameters
  - preprocessing, tokenization, training, evaluation, and sampling can be reproduced from the report's commands
  - at least one controlled comparison is tied to a stated hypothesis, with a meaningful baseline
  - tutor-evaluation continuation-only PPL is calculated with the published reference tokenizer and formula
  - representative and failed generated samples are shown with their decoding settings declared
  - the report distinguishes measurements from interpretation and includes the AI Assistance Statement
  - training and evaluation stay within 24 T4-equivalent GPU-hours and 4.0×10^17 training FLOPs
  - the ten tutor-evaluation prompts and their withheld continuations never influenced training or model selection
related:
  - assessments/project-2
  - lectures/week-01
---

## Page summary

Train a decoder-only language model from scratch that can continue an incomplete story with
recognisably narrative language. Given a story prefix of variable length, the model should produce
a continuation that is locally coherent, reasonably fluent, connected to the supplied context, and
capable of ending at a sensible point.

This is a narrative-domain base model rather than a claim to broad, general-purpose language
ability. It becomes the foundation for Project 2's post-training work.

## Key facts

| Item | Value |
| --- | --- |
| Weight | 20% |
| Marks available | 20 |
| Training stage | Pre-training from scratch |
| Work mode | Individual |
| Model size | 32M design target; 33.6M absolute maximum |
| Compute budget | 24 T4-equivalent GPU-hours and 4.0×10<sup>17</sup> training FLOPs |
| Main report | 15 CVPR pages, excluding references and appendix |
| Due | Sunday 21 March 2027, 23:59 AET — end of Week 4 |

## What you must demonstrate

Your submission should show that you can turn permitted story data into a working language-model
training system, allocate limited model and compute capacity deliberately, compare at least one
meaningful choice, and select a final checkpoint using evidence rather than intuition alone.

Tutor-evaluation prompts are authentic prefixes truncated from complete held-out stories. They
cover different prefix lengths and story styles within the announced narrative domain. Their
source stories and withheld continuations must not influence training or model development.

### Design space

Working defaults are supplied for every choice below; change only what you can evaluate within
your time and compute budget.

- parameter allocation between depth and width
- feed-forward and attention dimensions
- vocabulary and tokenization
- context length
- data quantity, quality, and narrative mixture
- optimiser and learning-rate schedule
- batch size and gradient accumulation
- warm-up, weight decay, dropout, and gradient clipping
- training duration and checkpoint selection
- end-of-sequence training
- temperature, top-k, top-p, repetition control, and stopping behaviour

## Marking breakdown

| Component | Marks |
| --- | ---: |
| Engineering report | 10 |
| Submitted model | 10 |
| **Total** | **20** |

### Engineering report — 10 marks

**1. Pipeline correctness and reproducibility — 2 marks.** A correct document-level split, a
clearly described preprocessing and tokenization pipeline, a sound from-scratch training setup,
and commands that reproduce training, evaluation, and sampling. Marks are reduced when steps are
missing, the described setup does not match the repository, leakage is possible, or the system
cannot be followed from the evidence provided.

**2. Model-data-compute planning — 2 marks.** An explicit pre-training target and a reasoned
allocation of the model and compute budgets, discussing the relationship between depth/width,
context, vocabulary, data, training steps, and expected behaviour. Marks are reduced for listing
hyperparameters without explaining their relationship, unrestricted trial and error, or a plan that
could not reasonably fit the budget.

**3. Experimental rigour — 2 marks.** At least one controlled comparison tied to a stated
hypothesis, appropriate baselines, consistent evaluation conditions, and useful training evidence
(learning curves, stability observations, runtime, processed-token counts). Marks are reduced when
several variables change without analysis, comparisons use mismatched conditions, evidence is
selectively reported, or conclusions extend beyond the experiment.

**4. Evaluation and failure analysis — 3 marks.** Correct use of the official reference-token-
normalised PPL, BPB or comparable diagnostic loss where informative, representative generated
samples with declared decoding settings, and analysis of coherence, repetition, prefix consistency,
and stopping failures. Marks are reduced when evaluation depends on one metric, uses only
favourable examples, treats the withheld reference continuation as the only valid answer, or does
not connect failures to training decisions.

**5. Communication and research practice — 1 mark.** A concise, readable report that distinguishes
measurements, interpretations, and hypotheses; cites datasets, code, and technical claims; labels
edited or selected samples honestly; and includes the required AI Assistance Statement.

### Submitted model — 10 marks

Submission validity is a technical gate. A valid model receives up to **6⅔ marks** from the shared
tutor-evaluation PPL rule and up to **3⅓ marks** from blinded story-continuation review.

**6. Tutor-evaluation perplexity — 6⅔ marks.** The shared formula is applied to continuation-only
reference-token-normalised PPL across all ten tutor prompts: P ≤ 25 earns all 6⅔ marks; 25 < P < 50
receives an exponential decay of exp(-0.1 × (P − 25)); P ≥ 50 earns zero for this criterion.

**7. Story continuation quality — 3⅓ marks.** Blinded review considers fluency, connection to the
given characters, events, and tone, local and short-range consistency, avoidance of empty or
repetitive degeneration, and whether the continuation reaches or approaches a reasonable stopping
point. Task-specific dimension weights: connection to the supplied prefix **35%**; narrative
coherence and fluency **30%**; avoidance of repetition or degeneration **20%**; stopping and
completeness **15%**. Multiple plausible continuations can receive full credit; reproducing the
withheld source ending is not required.

## Individual work

This project is submitted individually. AI assistance is permitted when declared in the required
AI Assistance Statement; responsibility for the submitted work remains with you. See
[Policies](/policies/) for the full individual-work, collaboration, and AI-assistance rules.
