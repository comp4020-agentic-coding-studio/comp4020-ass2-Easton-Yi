# Assessment Brief

> **Planning status:** Consolidated course-assessment plan. The assessment structure and learning intent are settled. Items marked **TBC** still require a final operational decision before publication to students.

## Course premise

Training a language model in practice is a systematic engineering problem under limited compute, data, and time.

Across three projects, students will experience three stages of language-model development:

1. building basic language ability through pre-training from scratch;
2. shaping model behaviour through post-training; and
3. adapting a model to a specific use.

The aim is not to find one universally correct architecture or training recipe. Students must decide what to change, what to hold constant, what they can afford to test, and what evidence would justify the final system.

## Assessment overview

| Project | Stage | Weight |
| --- | --- | ---: |
| Project 1 — Build a Narrative Base Model | Pre-training from scratch | 20% |
| Project 2 — Give the Model a Voice | Post-training for a target storytelling style | 50% |
| Project 3 — Build a Specialist | Task-specific adaptation; two tracks | 30% |
| **Total** |  | **100%** |

The three projects are connected, but they are not a leaderboard. Marks reward deliberate engineering, controlled evidence, reproducibility, and an honest account of what did and did not work. A failed intervention can still support a strong submission when its hypothesis, comparison, evidence, and analysis are sound.

## Shared platform and constraints

The course provides a readable, working training platform inspired by small GPT training repositories. It includes:

- a decoder-only Transformer baseline;
- a default tokenizer and special-token configuration;
- recommended and pre-processed starting data;
- default architecture and training parameters;
- data loading, training, evaluation, checkpointing, and sampling code;
- baseline commands that complete successfully within the supported environment; and
- starter metrics and reporting templates.

The defaults are a starting point, not a prescribed solution. Students may alter the model, tokenizer, data pipeline, training strategy, sampling strategy, or evaluation where the project permits it. Every alteration must be documented and justified.

### Model limit

Every submitted model is limited to **32 million learned parameters**. The count includes token embeddings and output heads and is independent of storage precision. A course-supplied checker will determine compliance.

The limit exists to make the work comparable and to force meaningful choices about model capacity. Students may explore depth, model width, feed-forward width, attention heads, context length, vocabulary, and other architectural components, but must remain within the limit.

### Compute limit

All students receive the same formal compute allowance. The exact allowance and accounting method are **TBC**. It may be expressed as GPU hours, processed tokens, estimated training FLOPs, or baseline-run equivalents.

Students are expected to budget both final training and exploratory runs. Access to additional private hardware must not create an assessment advantage. Final performance is therefore assessed together with efficiency and evidence rather than as a raw score alone.

### Data and test integrity

- Course test material is strictly excluded from training, validation, prompt construction, retrieval, and manual tuning.
- Story data is split at the complete-story or document level, not by randomly separating token windows from the same story.
- Any additional data must be declared with its source, licence, processing, quantity, and intended purpose.
- Target-style literature must use material that the course is permitted to redistribute or use, such as verified public-domain editions.
- Students must discuss filtering, duplication, contamination, and important distribution differences.

### Metrics and tokenizers

Perplexity may be compared when models use the same tokenizer. If students change the tokenizer, the shared language-modelling comparison will use a tokenizer-independent normalisation such as bits per byte (BPB) on the same held-out raw text. No single automatic metric is treated as a complete measure of generated-story quality.

## Common submission package

Each project submission includes:

1. a loadable weights-only checkpoint;
2. model configuration and parameter count;
3. tokenizer files, vocabulary, and special-token definitions where applicable;
4. sampling or generation configuration;
5. reproducible training and evaluation commands;
6. data sources and processing recipe;
7. training logs, evaluation outputs, and selected generated examples; and
8. an engineering report.

The report must explain:

- the original analysis and plan;
- the target behaviour and resource constraints;
- hypotheses and prioritisation of experiments;
- model, data, training, and evaluation decisions;
- controlled comparisons and relevant failed attempts;
- why the final checkpoint was selected;
- quantitative results and qualitative failure cases;
- any student-designed component or extension;
- limitations and threats to the conclusions; and
- how the work supports, complicates, or challenges the course premise.

The required length, format, due dates, and project-specific marking breakdowns are **TBC**.

## Project 1 — Build a Narrative Base Model

**Weight:** 20%

### Task

Train a decoder-only language model from scratch that can continue an incomplete story with recognisably narrative language. Given a story prefix of variable length, the model should produce a continuation that is locally coherent, reasonably fluent, connected to the supplied context, and capable of ending at a sensible point.

This is a narrative-domain base model rather than a claim to broad, general-purpose language ability. It becomes a foundation for later storytelling work.

### Test design

Hidden test prompts are authentic prefixes truncated from complete held-out stories. They are not isolated sentences written only for testing. The set contains multiple prefix lengths and narrative styles, while remaining within the broad story domain.

The unseen original continuation is a reference text, not the only correct answer. Students are not expected to reproduce it. Evaluation considers whether the generated continuation works as a plausible continuation of the prefix.

### Design space

Students may investigate choices including:

- parameter allocation between depth and width;
- feed-forward and attention dimensions;
- vocabulary and tokenization;
- context length;
- data quantity, quality, and narrative mixture;
- optimiser and learning-rate schedule;
- batch size and gradient accumulation;
- warm-up, weight decay, dropout, and gradient clipping;
- training duration and checkpoint selection;
- end-of-sequence training; and
- temperature, top-k, top-p, repetition control, and stopping behaviour.

The course supplies working defaults for these choices. Students should change only what they can evaluate within their time and compute budget.

### Evaluation priorities

Project 1 combines:

- held-out BPB or comparable language-modelling loss;
- fluency and grammatical stability;
- connection to characters, events, tone, and facts in the prefix;
- repetition and degeneration rates;
- evidence of a reasonable stopping point;
- qualitative review of representative and failed samples; and
- training and inference efficiency.

Exact automatic metrics and the human-review protocol are **TBC**. N-gram overlap with the original continuation will not be treated as a sufficient measure of correctness because many different continuations may be valid.

## Project 2 — Give the Model a Voice

**Weight:** 50%

### Task

Starting from the Project 1 narrative checkpoint, post-train the model to produce stories with a recognisable target narrative style, such as a verified public-domain tradition associated with *Grimm's Fairy Tales* or *One Thousand and One Nights*.

The project asks students to determine what kind of post-training evidence and data are needed to move from broad narrative continuation to a more deliberate and recognisable voice. Possible approaches include target-domain continued training, supervised instruction tuning, or a justified combination. The method is open; the target behaviour and evaluation obligation are not.

### Required investigation

Students must:

- define the target style in operational rather than purely impressionistic terms;
- construct or curate suitable post-training data;
- compare the post-trained model with its unchanged starting checkpoint;
- separate held-out target-style texts at story or source level;
- evaluate both target-style adaptation and narrative quality;
- test for regressions in the original narrative capability;
- analyse the effect of important training and sampling choices; and
- explain why the final method was selected over feasible alternatives.

Where instruction tuning is used, training examples may specify properties such as style, characters, tone, objects, length, or ending type. Response-only loss masking and any chat or instruction schema must be documented.

### Evaluation priorities

Project 2 may combine:

- BPB or perplexity on held-out target-style text;
- evidence of stylistic resemblance;
- coherence with a supplied opening;
- narrative completeness and stopping behaviour;
- instruction compliance, where the model is instruction-conditioned;
- repetition, memorisation, and degeneration checks;
- retention of the Project 1 capability; and
- blind qualitative comparison on hidden human-written prompts.

Target-domain perplexity is evidence of distributional adaptation, not by itself proof of coherent storytelling or successful style control.

Project 2 carries the largest weight because it requires the most complete integration of data design, post-training strategy, multi-objective evaluation, regression analysis, and engineering judgement.

## Project 3 — Build a Specialist

**Weight:** 30%

### Task

Choose one of two specialisation tracks. Define a specific target behaviour, fine-tune an appropriate starting checkpoint, and demonstrate through controlled evaluation whether the model acquired that behaviour without unacceptable regressions.

Both tracks use the same common assessment principles, parameter limit, compute policy, submission package, and expectation of held-out evaluation. Scores are not compared directly across tracks because their task metrics have different meanings.

### Track A — Narrative Specialist

Continue from the student's Project 1 narrative base model and add at least one specific, testable capability. A course narrative reference checkpoint may be offered as a fallback; this policy is **TBC**.

Supported examples include:

- integrating specified vocabulary naturally into a continuation;
- completing a short story under one or two explicit conditions;
- producing a specified broad ending type; or
- detecting simple factual contradictions in a short story.

Students may propose an alternative of comparable scope. A self-designed task must be approved before substantial training begins and must have a feasible held-out evaluation.

One well-investigated primary function is sufficient. Adding more functions does not by itself earn more credit.

Pure post-processing or hard-coded decoding is not sufficient as the only specialisation method. If constrained decoding is used, the report must distinguish behaviour learned by the model from behaviour enforced at generation time.

### Track B — Reasoning Specialist

Start from a course-provided checkpoint with broader general-language pre-training and specialise it for one bounded reasoning or structured question-answering task. The supplied model will remain within the shared model limit.

Suitable task families may include:

- one-step arithmetic word problems;
- bounded two-step arithmetic problems;
- numerical comparison;
- simple unit conversion; or
- answering a defined question type in a required output schema.

The course publishes the task family, input/output format, supported operations, evaluation method, and difficulty range. Concrete assessment questions and selected generalisation cases remain hidden.

Supervised instruction fine-tuning is the supported baseline. Students may train the model to produce a short rationale or chain-of-thought-style response, but final-answer accuracy, format validity, and generalisation remain primary evidence. Testing new instances or templates from a trained task family is described as held-out generalisation rather than strict zero-shot task performance.

### Optional preference optimisation

Preference-based methods, including DPO or a genuine RLHF-style pipeline, are optional extensions rather than requirements. Students choosing one must first establish an SFT baseline and make a controlled comparison. Use of a more complex method receives no automatic credit without evidence that its additional data and compute improved the stated target.

Work without actual human preference labels must not be represented as full RLHF.

### Common Project 3 requirements

Regardless of track, students must:

1. define one primary target behaviour and measurable success criteria;
2. identify an appropriate starting checkpoint;
3. declare data, evaluation, and compute plans before the principal run;
4. compare with the unchanged starting model;
5. use a strictly held-out evaluation set;
6. conduct at least one controlled comparison or ablation;
7. measure the target capability;
8. check at least one relevant pre-existing capability for regression;
9. report resource use and meaningful failures; and
10. explain what the result reveals about task-specific language-model engineering.

The two tracks share a common rubric centred on task definition, data and evaluation design, implementation and reproducibility, controlled evidence, final capability, regression analysis, and reflection. Exact category weights are **TBC**.

## Formative labs and support

Labs are ungraded and exist to teach the mechanisms needed for the projects, provide a safe place to experiment, and allow students to ask for help before assessment deadlines.

### Lab sequence 1 — Tokens and prediction

- next-token prediction;
- input-target shifting;
- tokenization choices and their effects;
- vocabulary, sequence length, and compression;
- cross-entropy, perplexity, and BPB; and
- a small manual prediction-and-loss exercise.

### Lab sequence 2 — Build and inspect the training framework

- the model forward pass;
- loss calculation;
- gradient back-propagation;
- optimiser updates and zeroing gradients;
- gradient accumulation and clipping;
- saving, loading, and selecting checkpoints;
- special tokens, including sequence and response boundaries;
- end-of-sequence behaviour; and
- the difference between learned token boundaries and decoding controls such as temperature, top-k, and top-p.

### Lab sequence 3 — Instruction fine-tuning

- instruction-response data structures;
- chat templates and special tokens;
- response-only loss masking;
- initialisation from a base checkpoint;
- fine-tuning learning rates and schedules;
- task-specific metrics;
- baseline comparison and regression testing; and
- building the supported SFT pipeline used in Project 3.

Further clinics may cover model sizing under the parameter cap, dataset splitting and contamination, story evaluation, behavioural evaluation, generalisation, ablation, reproducibility, and final checkpoint audits.

## Assessment philosophy

The assessments do not reward indiscriminate experimentation or the largest number of modifications. Students are expected to work as engineers:

1. define the desired behaviour;
2. identify constraints;
3. form a defensible hypothesis;
4. choose an affordable experiment;
5. compare against a meaningful baseline;
6. inspect quantitative results and failure cases;
7. revise only when the evidence justifies it; and
8. communicate the limits of the conclusion.

Final model quality matters, but it is not separable from the quality of the evidence used to claim success.

## Decisions still to finalise

The following details have deliberately not been invented in this planning brief:

- course title, code level, teaching dates, and final project due dates;
- the exact default architecture and parameter count below the 32M ceiling;
- the supported hardware environment and numerical compute allowance;
- the named Project 1 corpus and its permitted narrative mixture;
- the Project 2 target corpus or list of approved target traditions;
- the Project 3 Track B task family;
- whether a course narrative checkpoint is available for Projects 2 and 3A;
- exact automatic metrics and the human-evaluation protocol;
- report lengths and project-specific internal rubric percentages; and
- the short proposal/approval process for self-designed Project 3 tasks.

These decisions should be made alongside the twelve-week schedule, available infrastructure, dataset licences, and the final evaluation harness.
