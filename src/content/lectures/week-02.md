---
title: Inside a Decoder-Only Transformer
description:
  Encoder, encoder-decoder, and causal decoder-only attention; tracing tensor
  shapes through a decoder block; architecture as a 32M parameter allocation
week: 2
date: 2027-03-01
teachers:
  - yiwei-easton
banner: ./images/week-02-banner.svg
bannerAlt:
  A row of five token positions where each token's attention arrows point
  only backward to itself and earlier positions, illustrating the causal
  mask that blocks any forward-looking attention.
bannerSource: >-
  Original schematic illustration created for this course; not a reproduction
  of any external figure or dataset.
bannerCredit: Original illustration for SLOP4225.
related:
  - sessions/02-lab-1-parameter-budget
  - assessments/project-1
---

**Stage:** Build language ability · Formal Lab 1

## Summary

Project 1 is small enough that every architectural choice is visible in the
budget. This lecture traces one token through a decoder-only Transformer and
connects the computation to learned-parameter count, memory, context length,
and generation cost. Encoder and encoder–decoder systems are introduced to
clarify why the course uses a causal decoder, not because other architectures
are obsolete. Students then examine causal masking, multi-head self-attention,
feed-forward blocks, residual paths, pre-normalisation, embeddings, and the
output head. The aim is to make architecture a testable allocation of
capacity: depth, width, heads, context, and vocabulary must fit together
rather than being selected as independent fashionable settings.

## Learning outcomes

After this lecture, you should be able to:

1. distinguish encoder, encoder–decoder, and causal decoder-only attention
   patterns;
2. trace tensor shapes through embeddings, attention, the MLP, residual
   connections, normalisation, and the output head;
3. explain how a causal mask prevents future-token leakage;
4. identify which configuration choices dominate parameter count and
   activation memory; and
5. propose two legal architectures whose differences support a controlled
   Project 1 comparison.

## 1. Three Transformer families

Bidirectional encoders build representations using both left and right
context. Encoder–decoder models combine source-side representation with
autoregressive target generation. A decoder-only language model uses causal
self-attention and expresses both prompts and outputs as one continuation.
The course uses this form because its training objective matches Project 1
generation and because the starter is intentionally compact.

## 2. One decoder block

Token and position representations enter a repeated block. Normalisation
stabilises the input to attention and the feed-forward network; residual
connections preserve an information and gradient path around each
transformation. Attention mixes information across allowed earlier
positions, while the position-wise MLP performs most of the block's feature
transformation and often contains most of its learned parameters.

## 3. Causal attention and heads

Queries select information from keys and combine values. The triangular
causal mask makes every prediction depend only on tokens already available
at that position. Multiple heads can represent different relations, but
increasing head count does not create capacity for free: head dimension,
model width, and implementation constraints must remain coherent. We
distinguish learned parameters from sequence-dependent activations.

## 4. Architecture as a 32M allocation

Students use the repository preflight rather than estimating compliance by
file size. Vocabulary and embedding choices, model width, layer count, and
FFN width all affect the learned-parameter total; context length mainly
changes activation and attention cost. KV caching is introduced as an
inference optimisation: cached past keys and values avoid recomputing
unchanged states during autoregressive generation, but it does not change how
Project 1 is trained.

## Required reading

- Ashish Vaswani et al., [*Attention Is All You
  Need*](https://arxiv.org/abs/1706.03762), Sections 3.1–3.2.
- Thomas Wang et al., [*What Language Model Architecture and Pretraining
  Objective Work Best for Zero-Shot
  Generalization?*](https://arxiv.org/abs/2204.05832), abstract and Section 2.

## Optional reading

- Andrej Karpathy, [nanoGPT](https://github.com/karpathy/nanoGPT),
  `model.py`; focus on the mapping between configuration fields and modules.

## This week's action

Keep one feasible baseline architecture and one justified alternative from
Lab 1; record the preflight output for both before Week 3's clinic.
