---
title: Supervised Fine-Tuning and Data That Teaches Behaviour
description:
  Response-only loss masking, instruction schemas, synthetic demonstration
  data, and learning without catastrophic overwriting
week: 6
date: 2027-03-29
teachers:
  - yiwei-easton
banner: ./images/week-06-banner.svg
bannerAlt:
  A token sequence split into a greyed instruction span with no loss applied
  and a highlighted response span where each token carries a loss arrow,
  showing response-only masking.
bannerSource: >-
  Original schematic illustration created for this course; not a reproduction
  of any external figure or dataset.
bannerCredit: Original illustration for SLOP4225.
related:
  - sessions/06-lab-2-post-training-batch
  - assessments/project-2
---

**Stage:** Shape model behaviour · Formal Lab 2

## Summary

Supervised fine-tuning uses the familiar next-token loss on deliberately
formatted demonstrations, but its data meaning is different from
pre-training. This lecture follows an instruction–response example from raw
record to tokens, attention context, response-only target mask, loss, and
updated behaviour. It then examines data diversity, special tokens,
synthetic demonstrations, learning-rate choice, mixing with pre-training
text, and catastrophic overwriting. Students learn why a model can appear
successful on the exact training wording yet fail on a paraphrase, and why
data provenance and a visible loss mask are part of the scientific result
rather than implementation trivia.

## Learning outcomes

After this lecture, you should be able to:

1. design and document a consistent instruction or structured-continuation
   schema;
2. distinguish attention masking from loss masking and verify which tokens
   receive SFT loss;
3. explain how task diversity, example quality, and prompt phrasing affect
   transfer;
4. identify risks introduced by synthetic demonstrations and over-training;
   and
5. design a small SFT pilot with a lower learning rate, retained-capability
   check, and unchanged-checkpoint baseline.

## 1. The SFT objective

The model conditions on the prompt and preceding response tokens, then
predicts the next response token. In response-only SFT, prompt tokens
provide context but do not contribute target loss. We distinguish this loss
mask from the causal attention mask. A rendered token table is used to catch
off-by-one targets, missing separators, and accidental prompt learning.

## 2. Schemas and special tokens

An instruction, optional input, and output must be serialised consistently
at training and inference. Chat-role tokens are one possible schema, not a
universal requirement. At small scale, every extra format consumes examples
and context, so students should choose only the structure their target
behaviour needs and test EOS explicitly.

## 3. What makes useful demonstration data

More examples of one narrow template may yield less transfer than a smaller
set with meaningful task and phrasing diversity. Generated demonstrations
can expand coverage cheaply, but students must disclose the generator,
prompts, filtering, quantity, and validation. Synthetic confidence is not
ground truth, and a teacher model's style can dominate the intended voice.

## 4. Learning without erasing

Post-training usually needs a smaller learning rate than training from
random initialisation. Excessive epochs, homogeneous data, or an aggressive
rate can overwrite narrative ability. Mixing a controlled amount of
original-domain text, selecting an earlier checkpoint, or reducing update
strength can preserve capability, but each choice must be measured rather
than assumed.

## Required reading

- Jason Wei et al., [*Finetuned Language Models Are Zero-Shot
  Learners*](https://arxiv.org/abs/2109.01652), Sections 2–3.
- Long Ouyang et al., [*Training Language Models to Follow Instructions with
  Human Feedback*](https://arxiv.org/abs/2203.02155), Sections 3.1–3.2.

## Optional reading

- Hyung Won Chung et al., [*Scaling Instruction-Finetuned Language
  Models*](https://arxiv.org/abs/2210.11416), Sections 2–3.

## This week's action

**Practical:** Lab 2 — Build and Inspect a Post-Training Batch.
**Mid-semester break:** Monday 5–Sunday 11 April. Preserve logs and
checkpoints outside the active runtime before the break.
