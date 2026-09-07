---
title: "Lab 1 — Spend a 32M Parameter Budget"
description:
  Trace shapes through a causal decoder block and compare two legal
  architectures under the 32M/33.6M parameter boundary
week: 2
date: 2027-03-01
teachers:
  - maya-rao
sessionType: lab
spec:
  - every target token depends only on its prefix
  - both models are at or below 33.6M learned parameters, with 32M still the design target
  - only one primary architecture allocation changed between Architecture A and B
  - data, steps, seed policy, and evaluation are identical across both runs
  - the conclusion distinguishes prediction from observed evidence
related:
  - lectures/week-02
  - assessments/project-1
---

**Estimated active time:** 110 minutes · **Notebook:**
`lab-01-parameter-budget.ipynb` — released Monday 1 March 2027 at 09:00 AET ·
**Solution release:** after the final scheduled Lab 1 class.

## Learning goals

- trace shapes and information flow through one causal decoder block;
- verify a causal attention mask and shifted targets;
- use the official preflight to calculate learned parameters; and
- compare depth/width allocations without changing several variables
  accidentally.

## Preparation

Complete the Week 1 lecture and the Week 2 sections on the decoder block.
Clone the Project 1 repository, run the CPU environment check, and bring the
generated `data_summary.json`. No GPU is required for Parts A–C; the final
smoke test uses a supplied tiny batch.

## Activity

1. **Read it:** annotate the starter configuration with vocabulary size,
   context length, layers, heads, model width, and FFN width. Predict which
   fields change learned parameters and which mainly change activation
   cost.
2. **Run it:** execute the shape trace. Confirm input IDs, embeddings,
   attention scores, mask, logits, and shifted labels. Intentionally remove
   the causal mask on the toy example and explain why the resulting lower
   loss is invalid.
3. **Inspect it:** use the parameter report to locate embeddings/output
   head, attention projections, FFN, and normalisation parameters. Reconcile
   the component counts with the reported total.
4. **Change one thing:** construct Architecture A and Architecture B below
   33.6M while keeping tokenizer, context, batch, data, and smoke-test steps
   fixed. Change one primary allocation — preferably depth versus width —
   and predict effects on memory, speed, and learning before running.
5. **Transfer it:** select a Project 1 baseline or state what additional
   pilot evidence is needed. Save both legal configs and the preflight
   reports.

## Expected output

- one annotated tensor-shape table;
- one causal-mask screenshot or exported matrix with a two-sentence
  explanation;
- two legal configuration files and parameter reports;
- one controlled smoke-test comparison table; and
- a 150-word architecture decision note.
