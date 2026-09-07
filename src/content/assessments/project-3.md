---
title: Project 3 — Build a Specialist
description:
  Choose Track A (narrative specialisation) or Track B (arithmetic reasoning),
  fine-tune an appropriate starting checkpoint, and demonstrate the acquired
  behaviour through controlled evaluation.
week: 12
project: 3
opens: 2027-04-26T00:00:00+10:00
due: 2027-05-23T23:59:00+10:00
weight: 30
reportFilename: ass3_report.pdf
spec:
  - one specialisation track is chosen and one primary target behaviour is declared with measurable success criteria
  - the starting checkpoint is declared, justified, and (when a personal earlier submission) verified against it
  - the unchanged starting model is used as a baseline and at least one controlled comparison or ablation is run
  - training and evaluation data are strictly held out from each other
  - at least one relevant pre-existing capability is checked for regression
  - an alternative Track A proposal, if used, was approved via proposal.md before substantial training
  - training and evaluation stay within 12 T4-equivalent GPU-hours and 1.5×10^17 training FLOPs
  - Track B always starts from the course general-language checkpoint
related:
  - assessments/project-2
---

## Page summary

Choose one of two specialisation tracks. Define a specific target behaviour, fine-tune an
appropriate starting checkpoint, and demonstrate through controlled evaluation whether the model
acquired that behaviour without unacceptable regressions.

Both tracks use the same common assessment principles, parameter limit, compute policy, submission
package, and expectation of held-out evaluation. Scores are not compared directly across tracks
because their task metrics have different meanings.

## Key facts

| Item | Value |
| --- | --- |
| Weight | 30% |
| Marks available | 30 |
| Training stage | Task-specific adaptation |
| Work mode | Individual; choose Track A or Track B |
| Model size | 32M design target; 33.6M absolute maximum |
| Compute budget | 12 T4-equivalent GPU-hours and 1.5×10<sup>17</sup> training FLOPs |
| Main report | 20 CVPR pages, excluding references and appendix |
| Due | Sunday 23 May 2027, 23:59 AET — end of Week 12 |

## What you must demonstrate

Declare one measurable capability, justify the starting checkpoint, establish the unchanged-model
baseline, train on a strictly separated dataset, perform at least one controlled comparison or
ablation, test held-out generalisation, and measure at least one relevant pre-existing capability
for regression.

One carefully investigated function is sufficient. Additional functions, a more complex algorithm,
chain-of-thought output, or preference optimisation receive no automatic credit. If constrained
decoding or post-processing is used, distinguish model-learned behaviour from externally enforced
behaviour.

### Track A — Narrative Specialist

Continue from your frozen Project 1 model, your frozen Project 2 model, or the course narrative
fallback checkpoint, and add at least one specific, testable capability. Using the course fallback
carries no mark penalty. Supported examples include integrating specified vocabulary naturally
into a continuation, completing a short story under one or two explicit conditions, producing a
specified broad ending type, or detecting simple factual contradictions in a short story. A
self-designed task of comparable scope may be proposed — see below.

### Track B — Arithmetic Reasoning Specialist

Start from the course-provided general-language checkpoint and specialise it for arithmetic and
arithmetic word-problem answering. The fixed task family covers ordinary arithmetic operations,
direct numerical questions, and short application problems requiring both textual interpretation
and calculation. The Project 3 repository's `test_pilot` file publishes the exact prompt/answer
schema, supported operations and value ranges, required output format, representative wording, and
difficulty range. Supervised instruction fine-tuning is the supported baseline; a short rationale
or chain-of-thought-style response may be trained, but final-answer accuracy, format validity, and
generalisation remain primary evidence.

### Alternative Track A proposal and approval

The listed Track A capabilities may be used without separate approval. A different narrative
specialisation of comparable scope needs approval before substantial training: submit the
`proposal.md` template's frozen GitLab link through the Project 3 proposal panel by **Sunday 2 May
2027, 23:59 AET** (end of Week 9). It states the target behaviour, starting checkpoint, data and
provenance, held-out evaluation, unchanged-model baseline and controlled comparison, one regression
check, compute plan, and task-specific risks. The convenor responds within two teaching days with
**approved**, **revise**, or **out of scope**. Before approval, only preparation and a pipeline
dry-run of at most 0.5 T4-equivalent GPU-hours are permitted, and this still counts toward the
Project 3 budget.

## Marking breakdown

| Component | Marks |
| --- | ---: |
| Engineering report | 20 |
| Submitted model | 10 |
| **Total** | **30** |

### Engineering report — 20 marks

**1. Task definition and success criteria — 3 marks.** One clearly bounded target behaviour, a
justified scope, valid success measures, and a test plan including unseen cases.

**2. Starting checkpoint and data design — 3 marks.** A justified permitted checkpoint, clear
training/development/test separation, appropriate examples and counterexamples, and documented
provenance and formatting.

**3. Implementation and reproducibility — 3 marks.** A correct fine-tuning pipeline, verified
target masking, declared hyperparameters and seeds, reproducible commands, and a submitted package
consistent with the report.

**4. Controlled comparison and ablation — 4 marks.** Comparison with the unchanged starting model
and at least one controlled intervention addressing a meaningful uncertainty (data balance,
rationale format, loss masking, curriculum, or regularisation).

**5. Evaluation, generalisation, and regression analysis — 5 marks.** Task-appropriate held-out
metrics, tests beyond memorised templates, representative qualitative cases, an error taxonomy, and
measurement of at least one retained capability.

**6. Communication and course-level reflection — 2 marks.** Concise, properly attributed reporting
and a specific reflection on what the result demonstrates about task adaptation under limited
model, data, compute, and time.

### Submitted model — 10 marks

Submission validity is a technical gate. A valid model receives up to **6⅔ marks** from the shared
tutor-evaluation PPL rule and up to **3⅓ marks** from track-specific performance review.

**7. Tutor-evaluation perplexity — 6⅔ marks.** The shared formula applied to answer- or
continuation-only reference-token-normalised PPL across all ten tutor prompts: P ≤ 25 earns all
6⅔ marks; 25 < P < 50 receives an exponential decay of exp(-0.1 × (P − 25)); P ≥ 50 earns zero for
this criterion.

**8. Track-specific capability, generalisation, and reliability — 3⅓ marks.** Track A weights:
objective satisfaction of the declared condition **40%**; narrative quality **25%**; held-out
generalisation and prompt robustness **20%**; retention of the monitored starting capability
**15%**. Track B weights: exact final-answer accuracy **55%**; required output-format validity
**15%**; accuracy on unseen values and templates within the published scope **20%**; retained
language and instruction reliability **10%**. Track B's first three dimensions are computed by the
evaluation harness; blind raters assess only the qualitative dimension.

## Individual work

This project is submitted individually. AI assistance is permitted when declared in the required
AI Assistance Statement; responsibility for the submitted work remains with you. See
[Policies](/policies/) for the full individual-work, collaboration, and AI-assistance rules.
