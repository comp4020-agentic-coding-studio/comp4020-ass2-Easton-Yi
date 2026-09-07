# Assessment Brief

> **Planning status:** Consolidated course-assessment plan. The assessment structure and learning intent are settled. Items marked **TBC** still require a final operational decision before publication to students.

## Course premise

Training a language model in practice is a systematic engineering problem under limited compute, data, and time.

The course studies the training of real large language models: contemporary model architectures, data pipelines, pre-training and post-training practice, scaling, efficiency, published successes, and lessons from current research and industry. The 32M-parameter assessment limit does not redefine the subject as small-model training. It creates a miniature experimental setting in which students can operate the pipeline themselves and test large-model engineering ideas within student-scale resources.

Across three projects, students will experience three stages of language-model development:

1. building basic language ability through pre-training from scratch;
2. shaping model behaviour through post-training; and
3. adapting a model to a specific use.

The aim is not to find one universally correct architecture or training recipe. Students must decide what to change, what to hold constant, what they can afford to test, and what evidence would justify the final system.

## Course identity

**Working title:** *Large Language Model Training Under Budget*

**Tagline:** *Frontier practice through 32M-parameter experiments*

**Primary level:** Fourth-year undergraduate (`SLOP4xxx`, retaining the repository's allocated final three digits), with a postgraduate pathway and differentiated analytical expectations.

**Tags:** Large Language Models; Training Systems; Compute-Constrained ML.

**Course description:**

> Study how modern large language models are really trained, then rebuild the pipeline at a controllable scale: pre-train a narrative model, reshape it through post-training, and specialise it for a defined task under a 32M-parameter ceiling and a fixed compute budget.

The title refers to the subject of study, not the parameter count of the submitted checkpoints. The combination of continuously updated frontier material, a fixed 32M experimental ceiling, and three hands-on training stages provides the course's niche scope.

## Audience and prerequisites

The course is designed for senior undergraduate and postgraduate students. Students should:

- understand the foundations of linear algebra and probability;
- have completed an introductory machine-learning course or equivalent;
- be able to read and modify basic Python; and
- be willing to learn enough PyTorch to inspect and validate the supplied training framework.

Prior experience training a language model or using a GPU is not required. Students do not need to memorise library calls or reproduce a framework from memory. More extensive Python, PyTorch, systems, or deep-learning experience is helpful but not assumed.

AI-assisted coding is permitted. Students remain responsible for understanding, testing, explaining, and defending all submitted code and results. Material use must be declared in the report's AI Assistance Statement, as specified in the course policies.

## Learning outcomes

By the end of the course, students should be able to:

1. **Interpret current LLM training practice.** Explain and critically evaluate common model scales, architectures, data practices, training stages, efficiency techniques, published principles, and emerging claims from contemporary research and industry.
2. **Plan training as a constrained engineering system.** Design a defensible combination of model capacity, data, optimisation, compute, time, and evaluation for a specified training goal, rather than tuning each element in isolation.
3. **Use evidence to revise an engineering plan.** Conduct controlled experiments, analyse quantitative results and qualitative failures, determine whether the original plan achieved its target, and revise or reject assumptions where the evidence requires it.
4. **Connect frontier knowledge with hands-on practice.** Map ideas from lectures and current model-training developments onto small-scale experiments, while identifying which conclusions may not transfer cleanly across scale.

### Differentiated expectations

Undergraduate students meet the core standard by producing a technically valid and reproducible system, making reasonable choices, and analysing results and limitations with appropriate care.

Postgraduate students are expected to go further in the depth of analysis. Their reports should examine plausible mechanisms and alternative explanations behind observed results, connect those explanations to relevant theory and frontier evidence, and distinguish a supported conclusion from a hypothesis. For example, when an architectural change fails to improve performance, a postgraduate analysis should investigate where the expected difference may have been neutralised by data, optimisation, scale, or evaluation rather than merely reporting that the score did not increase.

## Assessment overview

| Project | Stage | Weight |
| --- | --- | ---: |
| Project 1 — Build a Narrative Base Model | Pre-training from scratch | 20% |
| Project 2 — Give the Model a Voice | Post-training for a target storytelling style | 50% |
| Project 3 — Build a Specialist | Task-specific adaptation; two tracks | 30% |
| **Total** |  | **100%** |

The three projects are connected, but they are not a leaderboard. Marks reward deliberate engineering, controlled evidence, reproducibility, and an honest account of what did and did not work. A failed intervention can still support a strong submission when its hypothesis, comparison, evidence, and analysis are sound.

## Shared platform and constraints

The course provides a readable, working training platform adapted from and attributed to [Karpathy's nanoGPT](https://github.com/karpathy/nanoGPT). Each project is released through an individual private GitLab repository containing:

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

All students receive the same formal compute allowance. Each project repository contains a locked `budget.json` that states the reference GPU, maximum GPU time, estimated training-FLOP ceiling, and the course baseline-run equivalent. This manifest is published when the project opens and does not change during the submission period except to correct a cohort-wide error.

Students are expected to budget both final training and exploratory runs. Access to additional private hardware must not create an assessment advantage. Final performance is therefore assessed together with efficiency and evidence rather than as a raw score alone.

### Working environment

Google Colab is the recommended student environment, with its free GPU allowance providing a realistic experience of limited and uncertain compute. This scarcity is part of the engineering context: students must prioritise experiments instead of relying on unlimited trial and error.

Because free-tier availability can vary, Colab access alone is not the formal fairness mechanism. SlopU provides every enrolled student with up to **USD 50 of course-managed RunPod credit for each project** as the guaranteed fallback. This is a fictional teaching-credit arrangement for the SlopU course and does not require students to purchase a subscription or enter a personal payment card. The credit provides access, not extra assessment compute: Colab, RunPod, paid Colab, and private hardware all remain subject to the same `budget.json` ceiling.

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

The course uses **post-training** in a deliberately broad sense for this project: training performed after the Project 1 pre-training stage to change the model's domain, style, or conditioned behaviour. Students may choose target-domain continued pre-training, supervised instruction tuning, preference-based optimisation, or a justified combination. The method is open; the target behaviour and evaluation obligation are not.

Lectures explain the purpose, assumptions, costs, and limitations of these approaches. Labs provide affordable toy exercises so that students can operate and inspect each supported technique before deciding whether it belongs in their assessed plan. Exposure to a technique does not make its use compulsory.

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

Continue from either the student's Project 1 narrative base model or the student's Project 2 post-trained model and add at least one specific, testable capability. The starting checkpoint must be declared and justified. A course narrative reference checkpoint may be offered as a fallback; this policy is **TBC**.

Project 3 does not require students to inherit Project 2 because a target fairy-tale style is not the principal objective of task specialisation. A student may nevertheless continue from Project 2 when retaining that style is useful. In that case, the inherited style is treated as a pre-existing characteristic to monitor, not as the new Project 3 capability.

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

## Twelve-week teaching plan

The semester is organised as three four-week blocks. Each block builds the knowledge and tools needed for its project, with the project due at the end of the fourth week. The supplied lecture materials on LLM foundations, scaling, post-training, and reasoning provide the knowledge base, but the teaching sequence below reorganises that material around student decisions and project deadlines.

Each lecture has three layers:

1. **mechanism** — what the model, data pipeline, or training method is doing;
2. **engineering evidence** — what public model reports and research results reveal, omit, or leave uncertain; and
3. **decision transfer** — which part of the idea can reasonably inform a 32M-parameter experiment, and which claim may not transfer across scale.

### Source-deck coverage and selection

| Supplied material | Where it enters the course | Deliberate scope decision |
| --- | --- | --- |
| **LLM basics** | Weeks 1–2 for language modelling, Transformer structure, causal decoding, generation, perplexity, and the historical move from pre-training to instruction use; Weeks 4 and 6 revisit evaluation and instruction tuning. | Students need enough architecture and probability to interpret training behaviour, but are not asked to reproduce every historical model. |
| **LLM scaling** | Week 3 for model/data/compute allocation, scaling-law evidence, data quality, and current multi-stage data practice; Week 12 for transfer limits. | Scaling laws are treated as evidence for planning, not as a formula that guarantees the best 32M configuration. Named frontier models are refreshed before delivery as case studies rather than memorisation items. |
| **LLM post-training** | Weeks 5–8 for continued pre-training, SFT, preference data, reward modelling, RLHF/RLAIF, DPO, and failure modes. | Students operate continued pre-training and SFT directly. Preference optimisation is a small supported experiment; full PPO-scale RLHF remains conceptual or optional because its cost and instability are not appropriate as a compulsory small-model task. |
| **LLM reasoning** | Weeks 9–11 for chain-of-thought, self-consistency, verification, outcome/process supervision, and task-specific reasoning training. | CoT-style SFT and automatic verification fit Project 3B. GRPO, RLVR, process reward models, and inference-time scaling are taught so students can place current systems, but are not compulsory implementations. |

This mapping is sufficient for the planning brief. A separate `content_source.md` is not needed until the actual weekly pages and slide decks are authored; at that stage, a source register can track the papers, figures, licences, and update dates used in published teaching material.

### Block 1 — Build basic language ability: pre-training from scratch

| Week | Lecture focus | Student-facing lab activity | Project connection |
| ---: | --- | --- | --- |
| **1** | **What a language model learns.** Probability over text; next-token prediction; maximum likelihood and cross-entropy; n-gram intuition versus neural language models; train/validation/test roles; perplexity and its limits; the course premise of model–data–compute–time trade-offs. | **Tokens become targets.** Students compare two supplied tokenizers on the same stories, inspect compression and sequence lengths, create shifted input/target batches, calculate one small cross-entropy example, and record one tokenizer trade-off that could affect Project 1. | Establish a valid data split and write the first Project 1 target-and-budget statement. |
| **2** | **Inside a decoder-only Transformer.** Encoder, encoder–decoder, and decoder-only distinctions; causal masking; self-attention and attention heads; feed-forward layers; residual paths and pre-normalisation; depth, model width, FFN width, head count, vocabulary, and context length; autoregressive generation and the purpose of a KV cache. | **Spend a 32M parameter budget.** Students trace one forward pass and causal mask, use the course parameter checker, then produce two legal architectures with different depth/width allocations. They predict the practical effect of each before running a short smoke test. | Freeze a feasible baseline architecture and identify one affordable architecture comparison. |
| **3** | **Scale, data, and optimisation under fixed compute.** Parameters (N), tokens (D), and training compute (C); power-law intuition; Kaplan- and Chinchilla-style findings and their limits; data quality, diversity, filtering, duplication, and noise; batch size and gradient accumulation; Adam-style optimisation, learning-rate schedules, warm-up, weight decay, dropout, clipping, training steps, and stability signals. | **Pilot before committing.** Students estimate tokens and runtime for candidate plans, run short controlled pilots with the supplied framework, plot train/validation loss and gradient norms, diagnose one unstable or under-trained run, and choose which experiment is worth the remaining budget. | Submit an internal run plan: hypothesis, controls, stop rule, compute allocation, and expected evidence. |
| **4** | **Evaluation is part of training.** Document-level hold-out and contamination; checkpoint selection; perplexity versus BPB when tokenizers differ; decoding with temperature, top-k, and top-p; repetition and degeneration; EOS learning and stopping; why a reference continuation is not the only correct story; combining automatic and blind human evaluation. | **Checkpoint and sampler clinic.** Students load multiple checkpoints, apply a shared evaluation script, compare generation settings on fixed prompts, label coherence/repetition/stopping failures, and verify that a fresh process can reload the final package. | **Project 1 due at the end of Week 4.** |

### Block 2 — Shape model behaviour: post-training

| Week | Lecture focus | Student-facing lab activity | Project connection |
| ---: | --- | --- | --- |
| **5** | **Why pre-training is not enough.** Capability versus usable behaviour; base models versus instruction-tuned assistants; target-domain continued pre-training, supervised fine-tuning, and preference-based post-training; what each method supervises; why Project 2 uses a broad definition of post-training. | **Two routes from one checkpoint.** From the same tiny checkpoint, students run a bounded continued-pre-training exercise and a bounded instruction-tuning exercise, then compare data format, loss target, output behaviour, runtime, and likely Project 2 use. | Define the target voice operationally and shortlist a justified post-training route. |
| **6** | **Instruction data and SFT.** Instruction–response formatting; chat and special-token schemas; response-only loss masking; task count and task diversity; synthetic instruction data and its risks; sensitivity to prompt wording; learning-rate reduction, data mixing, and the risk of overwriting pre-trained behaviour. | **Build and inspect an SFT batch.** Students convert raw examples into a declared schema, visualise which tokens receive loss, train a very small SFT run, probe paraphrased instructions, and compare it with an unmodified starting checkpoint. | Produce a data card, masking check, and pilot result for the chosen Project 2 method. |
| **7** | **Learning from preferences.** Pairwise preferences; reward models and Bradley–Terry ranking; the SFT–reward-model–policy stages of RLHF; policy-gradient intuition and KL control; RLAIF; DPO as direct preference optimisation; reward hacking, distribution shift, and the cost of added complexity. | **Preference learning without a cluster.** Students label or inspect a small set of story pairs, compute a toy ranking or DPO loss, and run a supplied miniature preference update where feasible. They must identify what evidence would justify choosing it over SFT or continued pre-training. Full PPO-scale RLHF is demonstrated conceptually, not required. | Decide whether preference optimisation is affordable and evidentially useful; method novelty alone is not a reason to use it. |
| **8** | **Did the behaviour really change?** Operationalising narrative style; held-out target text; blind pairwise judgement; instruction compliance where applicable; memorisation and copying; regression in general narrative ability; multi-objective checkpoint selection; separating target-style perplexity from coherent storytelling. | **Behavioural evaluation clinic.** Students conduct blinded A/B comparisons, run target-style and retention evaluations, audit repeated phrases and source overlap, inspect failures, and rehearse the claim–evidence structure of the report. | **Project 2 due at the end of Week 8.** |

### Block 3 — Adapt for a real problem: task-specific fine-tuning

| Week | Lecture focus | Student-facing lab activity | Project connection |
| ---: | --- | --- | --- |
| **9** | **Reasoning as generated behaviour.** Intermediate reasoning tokens; chain-of-thought prompting; why the most likely decoding path need not be the correct path; self-consistency and inference-time compute; final-answer verification; outcome versus process supervision; small-model and benchmark caveats. | **Prompt, sample, verify.** On the supplied general checkpoint, students compare direct answers, short rationales, and multiple sampled solutions for bounded arithmetic tasks. They implement an exact-answer/format verifier and separate reasoning plausibility from final-answer correctness. | Choose Track A or B, define one primary capability, and establish the unchanged-model baseline. |
| **10** | **Training a specialist.** Task-specific SFT; choosing a starting checkpoint; examples, counterexamples, and curriculum; full fine-tuning versus parameter-efficient adaptation as an engineering choice; structured outputs and special tokens; Track A narrative constraints and Track B bounded reasoning formats. | **Specialist pipeline studio.** Students create a small train/validation split, inspect target masking, perform a dry run, and test one unseen template or condition. Each student leaves with a loadable checkpoint and a working task metric before spending the main budget. | Project 3 proposal checkpoint: target, starting model, data, metric, regression check, comparison, and budget. |
| **11** | **Generalisation, regressions, and explanations.** Paraphrase and template shift; catastrophic forgetting and capability retention; ablations and matched comparisons; error taxonomies; why an architecture or training change can fail at a different scale; correlation versus a supported mechanism; deeper postgraduate expectations for alternative explanations. | **One change, two consequences.** Students run or complete one controlled ablation, test target performance and one retained capability, classify errors, and write both the strongest supported conclusion and at least one plausible alternative explanation. | Freeze the candidate final checkpoint and identify any unsupported claim that must be removed or qualified. |
| **12** | **Audit the whole training system.** Reproducibility; checkpoint, configuration, tokenizer, and sampler compatibility; training and inference cost; honest comparison with a baseline; limits of scaling small experiments to frontier systems; reviewing the course premise through public model case studies and student evidence. | **Fresh-environment model audit.** A peer follows the submitted commands, loads the package, reproduces core metrics, and checks parameter/compute declarations. Students then complete a concise engineering retrospective centred on planning, evidence, revision, and remaining uncertainty. | **Project 3 due at the end of Week 12.** |

## Frontier material as a lightweight teaching mechanism

The course follows current LLM training practice without allowing news to destabilise the planned curriculum.

- When the lecturer identifies a genuinely relevant new paper, model report, dataset practice, or training technique, the next lecture may begin with a single **Frontier Note** slide and a short discussion.
- The slide states the new claim, why it matters to the course, what evidence is currently public, and a link to the original source. It is archived on that week's session page.
- Frontier Notes are explicitly marked **optional and not assessed**. Students may follow the source after class, but keeping up with additional papers is not required.
- A Frontier Note does not replace the scheduled lecture or lab and does not silently become prerequisite knowledge. If an idea later becomes core examinable material, it must be incorporated into the normal teaching materials and announced separately.
- Students may choose to test or deploy a highlighted idea in an assignment, but are never required to do so. They remain responsible for judging its fit, implementation risk, compute cost, and likelihood of completing the experiment before the deadline.
- A recently published or technically complex method receives no automatic credit. It is evaluated by the same standard as any other choice: clear purpose, affordable design, controlled evidence, and honest analysis.

The lecturer owns this small curation task; a separate Frontier Editor role is unnecessary.

## Formative labs and learning support

Labs are ungraded and exist to make the lecture mechanisms operable before students depend on them in an assessment. They do not ask students to train another full model. Each lab uses a bounded supplied notebook, small data, and a short run suitable for the supported Colab environment.

Every lab follows the same student-facing pattern:

1. **Read it:** identify the relevant model, data, training, and evaluation choice.
2. **Run it:** complete a working core exercise with supplied defaults.
3. **Inspect it:** examine a tensor, mask, curve, output sample, or failure rather than trusting a final score.
4. **Change one thing:** make one controlled modification and compare it with the baseline.
5. **Transfer it:** record what the result would and would not justify changing in the current project.

The core path is shared by undergraduate and postgraduate students. Optional investigation prompts ask postgraduate students, and any interested undergraduate students, to test mechanisms or alternative explanations more deeply without withholding essential assignment preparation from the core path.

The twelve labs therefore cover more than pipeline construction: tokenization and target formation; architecture budgeting; optimisation diagnostics; compute planning; clean data splits; checkpoint selection; decoding and stopping; continued pre-training; SFT masking; toy preference learning; behavioural evaluation; reasoning verification; task generalisation; ablation; regression testing; and reproducibility audits. This breadth is intentional: training cannot be analysed independently of the model, data, target behaviour, and evaluation that give a loss curve meaning.

## People and support roles

The following is a complete draft teaching-team structure for the course site. Names and institutional details may be replaced without changing the responsibilities.

### Dr Yiwei Easton — Course Convenor and Lecturer

Yiwei teaches language-model training at the intersection of machine learning, empirical evaluation, and resource-aware systems. Their interests include how architecture, data quality, optimisation, post-training, and evaluation interact when the apparent best method cannot simply be scaled without limit.

- **Teaching role:** lectures, assessment design, Project 3 task approvals, interpretation of course policy, and the weekly Frontier Note where relevant.
- **Contact:** `llm-training@slopu.edu.au` for ordinary course questions; `Easton@gmail.com` for personal or confidential matters; the course forum for questions useful to the cohort.
- **Consultation:** one advertised hour each teaching week, available in person and online; booking details appear on the People page.

### Maya Rao — Teaching Fellow and Technical Tutor

Maya runs the practical labs and model clinics, with a focus on PyTorch, dataset pipelines, training diagnostics, checkpoint loading, and reproducible evaluation.

- **Teaching role:** lab facilitation, technical debugging, starter-platform guidance, and formative feedback on whether an experiment is well controlled.
- **Boundary:** technical support may help students locate and understand a fault, but will not choose an assessed architecture, training recipe, or report conclusion for them.
- **Contact:** the `#technical-help` course forum; `maya.rao@slopu.edu.au` for individual access issues.
- **Consultation:** a weekly technical drop-in and additional advertised model clinics before each project deadline.

### Eli Morgan — Compute Steward

The Compute Steward protects the fairness and operability of the constrained-training environment.

- **Operational role:** maintain the reference Colab notebook and parameter checker; publish baseline runtime estimates; clarify compute accounting; record widespread platform outages; and coordinate the approved fallback environment.
- **Boundary:** the steward verifies resource use and platform behaviour but does not judge the scientific merit of a student's chosen experiment or provide advance grading advice.
- **Contact:** `compute@slopu.edu.au`; urgent cohort-wide incidents are posted on the course status channel.

A separate Frontier Editor is not included because Frontier Notes are deliberately small and remain the lecturer's responsibility. The Compute Steward is retained because equitable access and budget accounting are central to the course rather than incidental infrastructure.

## Student-facing Policies page

This section is written at the level required for `src/pages/policies/index.mdx`. It can later be split into short on-page sections without changing the rules.

### 1. Compute allocation

Google Colab Free is the recommended starting environment. Its interruptions and limited availability are part of the course's budget-engineering setting, but no student is required to rely on an uncertain free service to complete assessed work.

For each project, SlopU provides every enrolled student with up to **USD 50 of course-managed RunPod credit**. This guaranteed fallback is supplied without a personal subscription or payment card. It may be used when Colab is unavailable, when a reproducible final run needs a stable instance, or when the student decides that predictable runtime is worth part of the project budget.

The monetary credit and the assessed compute allowance are different limits:

- the credit determines how much fallback infrastructure SlopU will fund;
- the `budget.json` in the project repository defines the maximum assessed computation using reference-GPU time, estimated training FLOPs, and baseline-run equivalents;
- all pilots, ablations, failed runs that consumed meaningful compute, and final training runs count;
- evaluation-only inference is reported separately and is not silently converted into extra training budget; and
- paid Colab, private GPUs, or unused credit do not increase the formal allowance.

Students submit the automatically generated compute ledger with the report. Deliberately disabling or altering accounting is an academic-integrity breach. A calculation error made in good faith should be reported rather than hidden.

### 2. Starter code, dataset licences, and additional data

Each project is released as an individual private GitLab repository constructed from the course's attributed adaptation of [Karpathy's nanoGPT](https://github.com/karpathy/nanoGPT). The original licence and attribution remain in the repository. Students clone their assigned repository and may change parameters, the tokenizer, data pipeline, sampler, model architecture, or training framework where the project permits it.

Every submitted dataset must be lawful to access and suitable for the intended use. The report must identify:

- dataset or source name and stable URL;
- creator or publisher;
- licence or public-domain basis;
- exact version, revision, download date, and split where available;
- raw and processed size, including token count;
- filtering, normalisation, deduplication, and document-level splitting;
- any excluded material and the reason for exclusion; and
- the role the data was expected to play in the training plan.

Course-provided story and web-text data includes a data card, source record, licence statement, checksum, and reproducible preprocessing script. For the style project, the teaching team also supplies a processed baseline drawn from verified public-domain fairy-tale editions. This is both a usable starting point and an example of how to turn a permitted electronic edition into model-ready text.

Students are encouraged to locate and process additional data when it supports a clear hypothesis:

- **Hugging Face datasets** may be used when the dataset card states a licence compatible with the project. A dataset's presence on the Hub is not by itself evidence of permission.
- **Openly licensed or public-domain books** may be used with the edition, source, and public-domain or licence basis recorded.
- **Existing public web corpora** with documented provenance are preferred to a new crawl because they are easier to licence, reproduce, and audit.
- **Direct web crawling** is allowed only for public pages whose terms and access rules permit it. Students must honour `robots.txt`, use a reasonable request rate, avoid login-gated or paywalled pages, collect no personal or sensitive information, and obtain written course approval before a large crawl. A list of domains, collection dates, and the crawler/preprocessing code must be submitted.
- **Synthetic or AI-filtered data** must name the generator or judge, version where known, prompt or filtering procedure, quantity, and validation method. It cannot be described as human-authored or human-labelled.

The teaching team may reject a source whose licence, privacy risk, or provenance cannot be established. Extra data receives no automatic credit; its value must be demonstrated against its processing and compute cost.

### 3. Hidden-test contamination

Public development prompts are supplied for iteration. Final marking uses hidden stories, prompts, task instances, and selected generalisation cases that are separated at document or story level.

Hidden-test material must not be used for training, validation, retrieval, tokenizer construction, filtering, prompt-template design, sampler tuning, checkpoint selection, or manual editing. Students must not attempt to infer or obtain the hidden set from staff, peers, repository history, network requests, or the marking harness.

If a student accidentally encounters material they believe belongs to the hidden set, they must stop using it and email `llm-training@slopu.edu.au`. Prompt disclosure made promptly and in good faith will be handled as a contamination incident, not concealed misconduct. The teaching team may replace affected items or evaluate the checkpoint on a clean reserve set.

### 4. Individual work, collaboration, and AI assistance

All three projects are **individual assessments**. Students may discuss lecture concepts, public papers, general PyTorch usage, error messages, and debugging strategies. They may not exchange project code, processed datasets created for the assessment, configurations, checkpoints, experiment logs, generated evaluation sets, report text, or conclusions. Showing another student where a framework function is documented is acceptable; copying their implementation or experimental decision is not.

AI assistance is allowed for coding, debugging, explanations, documentation search, language editing, and planning support. The student remains responsible for understanding and validating everything submitted. In particular, AI output cannot substitute for the student's experimental judgement, interpretation of results, or truthful account of failures.

Every CVPR-format report includes a short **AI Assistance Statement** naming the tools used, the tasks they assisted with, any material code or text they influenced, and how the student checked the result. A full prompt transcript is not required unless an academic-integrity review requests it. Using AI is not penalised when it is declared; hiding material assistance is.

### 5. Academic integrity and research reporting

The report uses the supplied CVPR paper template and a consistent scholarly citation style. Papers, datasets, code, pretrained checkpoints, figures, tables, evaluation methods, and copied or adapted text must be cited or attributed at the point of use. Repository licences and model/data cards do not replace an appropriate report citation.

The checkpoint, code, experiment record, and report must be the student's own assessed work. The following are prohibited:

- fabrication or alteration of logs, metrics, human ratings, runtime, or compute use;
- presenting selected samples as random or representative when they were manually chosen;
- removing material failed runs or contrary results in order to support a claim;
- manually editing generated text without labelling it as edited;
- presenting SFT, synthetic preference labels, DPO, or AI feedback as full human-feedback RLHF; and
- using another student's repository, checkpoint, private data, or report language.

Students may be asked to load the submitted model, explain a code path, or discuss an experiment after submission. The purpose is to verify authorship and understanding, not to introduce a new assessed task.

### 6. Code, checkpoint, and report submission

Each assessment page contains its own submission panel showing the opening time, deadline, required files, and submission status. Because the course site is a static GitHub Pages site, the panel links to the authenticated **SlopU Submission Portal**; it does not upload files or collect credentials directly.

Before the deadline, students must:

1. push the final code, configuration, preprocessing scripts, and evaluation commands to the default branch of their assigned private GitLab repository;
2. record the final Git commit SHA;
3. upload the model package to the private Hugging Face model repository provisioned for that student and project inside the SlopU organisation;
4. verify that the course marking service account can read the exact submitted Hugging Face revision; and
5. submit one CVPR-format report PDF, the GitLab commit SHA, the Hugging Face repository URL and revision, and the compute ledger through the project submission panel.

The Hugging Face package must contain:

- `checkpoint.pt` containing the final weights;
- model configuration and the verified learned-parameter count;
- tokenizer vocabulary/model files and special-token mapping when they differ from the course default;
- sampler or generation configuration required to reproduce submitted outputs;
- dependency or environment information;
- a short model card naming the project, allowed starting checkpoint, data sources, and exact evaluation command; and
- checksums for the principal submitted files.

The submitted Git and Hugging Face revisions are frozen for marking. Later pushes are not considered unless an approved extension or a marker-requested packaging correction explicitly permits them. A packaging correction may make an already submitted model loadable; it may not replace weights, retrain the model, or change reported results.

Students must **never submit an HF access token**. They use their own credential locally only to upload to the provisioned private repository, while the marking account receives access through the SlopU Hugging Face organisation. Tokens, API keys, cookies, private data, and `.env` files must not be committed to GitLab, uploaded with the model, pasted into the report, or entered into the public course website.

### 7. Hardware and training failure

Students are expected to design resumable runs, save periodic checkpoints, retain logs outside the active runtime, and test the final loading command before submission. A normal Colab disconnect, exhausted free quota, coding error, or loss of an unsaved run does not automatically create an extension, because these are foreseeable risks addressed by the course workflow and the RunPod fallback.

For a persistent infrastructure failure, students should contact `compute@slopu.edu.au` as soon as possible with the project, time, platform, instance type, last successful checkpoint, relevant error output, and remaining budget. The Compute Steward may provide a fallback instance, correct the ledger, or declare a cohort-wide incident. Students must not compensate by silently exceeding the compute ceiling.

A verified SlopU, GitLab, submission-portal, or course-managed compute outage may result in a published deadline adjustment. An individual hardware failure is considered through the normal extension process when it is reported before the deadline and supported by the available logs.

### 8. Extensions and late submission

No application form is required by the course-site template. Students request an extension by emailing `llm-training@slopu.edu.au` **before the deadline**, naming the project, requested new deadline, brief reason, and supporting evidence where appropriate. Personal or confidential circumstances may instead be sent to `Easton@gmail.com`. Approval must be received in writing; sending a request does not by itself change the deadline.

An approved extension carries no late penalty until its revised deadline. Without an approved extension, the submission loses **5% of the marks available for that project per commenced 24-hour period**. Work more than five days late is not accepted unless a formal accessibility or exceptional-circumstances arrangement applies. The timestamp recorded by the SlopU Submission Portal is authoritative.

### 9. Accessibility, materials, and support

- Lecture slides are available on the course site by the end of the day before the lecture and can be viewed online or downloaded.
- The week's lab notebook is published each Monday. Lab attendance is optional, although strongly recommended before changing the relevant project pipeline.
- Lab solutions are released after the final scheduled lab of that week so that every lab group has the same opportunity to attempt the activity first.
- Each project release produces a site announcement, and the site displays a reminder before its deadline.
- Materials use selectable text, meaningful heading order, alt text for informative images, labelled links, keyboard-accessible controls, and colour choices that do not carry meaning alone. Code and slide downloads provide an alternative to the live presentation view.
- Students with an approved accessibility adjustment receive materials, timing changes, or an alternative participation route according to that plan without needing to disclose personal details to the class.
- General questions go to the course forum or `llm-training@slopu.edu.au`; technical environment problems go to `compute@slopu.edu.au`; personal matters may go to `Easton@gmail.com`.

### 10. Unsafe or inappropriate generated content

Story and web corpora can reproduce violence, prejudice, sexual material, personal information, or other harmful patterns. Students are not expected to make a 32M-parameter model universally safe, but they must not deliberately train or demonstrate it for targeted harassment, hateful or sexual content, instructions for wrongdoing, or disclosure of personal information.

Unexpected harmful output should be recorded as a model limitation and handled proportionately. Include only the minimum excerpt needed for analysis, add a content note where appropriate, and redact personal information. Do not publish an interactive checkpoint or gallery that exposes unrestricted unsafe generation. Students who reasonably prefer not to work with a supplied story or prompt may request an equivalent alternative without academic penalty.

### 11. Human evaluation and privacy

Human evaluation uses de-identified model and sample IDs. Evaluators see only the prompt, candidate outputs, and the stated rubric; they do not see the student's identity, architecture choice, grade, or private report. The evaluation form collects ratings and optional task-relevant comments, not demographic, health, contact, or other sensitive information.

Human ratings are used for marking and formative aggregate analysis. They are not reused as a research dataset or published with identifiable comments without separate informed consent. Raw identifiable records, if any are created by the authenticated portal, are restricted to the teaching team and removed after the grade-review period; reports retain only de-identified or aggregated results.

Prompts and evaluation examples must not contain real personal data. Students must not place HF tokens, API keys, GitLab credentials, private emails, participant names, or other secrets in the cloned repository, model package, generated samples, screenshots, or evaluation form. If a secret is committed or uploaded, revoke it immediately and contact the technical tutor; deleting a later commit is not sufficient protection by itself.

### Policy promises to encode in site checks

The course-specific tests should verify that:

- the Policies page contains all eleven policy headings;
- all three assessment pages link to a submission panel and state that work is individual;
- the three weights remain 20%, 50%, and 30%, totalling 100%;
- the 32M-parameter ceiling and per-project `budget.json` are stated consistently;
- no page asks a student to submit or paste an HF token;
- every assessment lists a Git commit SHA, HF repository revision, report PDF, and compute ledger as submission fields; and
- Week 1–12 lecture/lab release links and the three due-week relationships remain present.

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

The following details have deliberately not been invented or fully settled in this planning brief:

- the final `SLOP4xxx` suffix, teaching period dates, and project due dates;
- the final course-materials licence wording;
- the operational policy for applying differentiated undergraduate and postgraduate expectations;
- the exact default architecture and parameter count below the 32M ceiling;
- the numerical reference-GPU time and training-FLOP values to place in each project's `budget.json`;
- the named Project 1 corpus and its permitted narrative mixture;
- the Project 2 target corpus or list of approved target traditions;
- the Project 3 Track B task family;
- whether a course narrative checkpoint is available for Projects 2 and 3A;
- exact automatic metrics and the human-evaluation protocol;
- report lengths and project-specific internal rubric percentages; and
- the short proposal/approval process for self-designed Project 3 tasks.

These decisions should be resolved against the now-defined twelve-week schedule, available infrastructure, dataset licences, and the final evaluation harness before the student-facing pages are published.
