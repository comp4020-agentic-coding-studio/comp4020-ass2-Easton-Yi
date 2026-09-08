---
title: What a Language Model Learns
description:
  Probability over text, next-token prediction, maximum likelihood and
  cross-entropy, n-gram intuition, and perplexity as a first, limited piece of
  evidence
week: 1
date: 2027-02-22
teachers:
  - yiwei-easton
slides: /decks/week-01/
banner: ./images/week-01-banner.svg
bannerAlt:
  A five-token prefix, "The cat sat on the", feeding a highlighted next-token
  slot with a bar chart of candidate probabilities such as "mat" and "floor."
bannerSource: >-
  Original schematic illustration created for this course; not a reproduction
  of any external figure or dataset.
bannerCredit: Original illustration for SLOP4225.
related:
  - sessions/01-project-1-launch
  - assessments/project-1
---

**Stage:** Build language ability · Project 1 begins

## Summary

A language model assigns probabilities to possible continuations. Training
turns a text corpus into many next-token prediction problems and adjusts the
model to increase the probability of the observed next token. This lecture
connects the probability view to the exact tensors students will use in
Project 1: token sequences, shifted targets, cross-entropy loss,
train/validation/test separation, and perplexity. Historical n-gram models
provide useful intuition about context and sparsity, but the practical focus
is the neural autoregressive objective. The final question is engineering
rather than definitional: what evidence would show that a training run
learned a reusable narrative distribution instead of memorising its data or
merely reducing one number?

## Learning outcomes

After this lecture, you should be able to:

1. express the probability of a token sequence as a product of conditional
   next-token probabilities;
2. construct input and shifted-target sequences for causal language-model
   training;
3. explain maximum likelihood, cross-entropy, negative log-likelihood, and
   perplexity as connected views of one objective;
4. distinguish the roles of training, validation, development, and
   tutor-evaluation data; and
5. state at least two reasons why lower validation loss is insufficient
   evidence of better story generation.

## 1. From plausible text to conditional probability

We begin by ranking grammatical, semantically plausible, and stylistically
consistent sentences. The exercise reveals that a language model is not a
database of complete sentences: it estimates a distribution over the next
token given the preceding context. The chain rule converts those local
predictions into a probability for a complete sequence. Sampling repeatedly
from the changing next-token distribution produces text.

## 2. What n-grams teach us—and where they fail

Unigram, bigram, and trigram examples make the context trade-off visible. A
short context is easy to count but cannot preserve much structure; a long
context is informative but most combinations are unseen. Neural language
models replace explicit count tables with a differentiable function that
shares statistical strength across contexts. N-grams are used here as
conceptual scaffolding, not as an assessed implementation.

## 3. Turning a corpus into a training objective

For a token sequence \(x_1,\ldots,x_T\), the model observes a prefix and
predicts the next token. Teacher forcing creates many supervised targets from
one document. We derive mean negative log-likelihood and show how the same
calculation becomes token-level cross-entropy in code. The loss is
differentiable with respect to model parameters, so an optimiser can update
those parameters by gradient descent.

## 4. Splits, perplexity, and evidence

Perplexity is the exponential of average negative log-likelihood. It is
useful for comparing checkpoints evaluated with a common token accounting
method, but it does not directly measure coherence, originality, reasoning,
or instruction following. Story- or source-level splits must be created
before token windows so that near-identical windows from one story cannot
appear on both sides of evaluation. Project 1 therefore combines
continuation-only reference-token-normalised PPL with blind human review and
qualitative failure analysis.

## Required reading

- Ronen Eldan and Yuanzhi Li, [*TinyStories: How Small Can Language Models Be
  and Still Speak Coherent English?*](https://arxiv.org/abs/2305.07759),
  Sections 1–2.
- Course page, **[Evaluation Protocol](/assessments/evaluation-protocol/)**.

## Optional reading

- Alec Radford et al., [*Improving Language Understanding by Generative
  Pre-Training*](https://cdn.openai.com/research-covers/language-unsupervised/language_understanding_paper.pdf),
  introduction and Figure 1.

## This week's action

Run the repository data summary, confirm the document-level split, and write
a two-sentence Project 1 target: what the model should continue well and
which evidence will test that claim.
