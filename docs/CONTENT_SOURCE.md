# Website Content Source

> **Status:** Canonical student-facing copy in development. Course identity and dates, Home, assessment tasks and rubrics, evaluation rules, Policies, People, starter-model policy, dataset roles, compute budgets, report limits, and checkpoint fallback rules are approved and ready for implementation. Weekly lecture, lab, and slide-deck copy remains to be authored. Final repository, dataset, checkpoint, and submission URLs are inserted when the corresponding course resources are published.

## Purpose and source-of-truth rules

This file contains text intended to appear on the course website. It exists so the implementation agent can transfer approved copy into Astro pages without rewriting the course or guessing what the teaching team meant.

Use the project documents as follows:

| File | Responsibility |
| --- | --- |
| `assignment_brief.md` | Course rationale, design intent, relationships between components, constraints, and unresolved decisions. |
| `CONTENT_SOURCE.md` | Approved student-facing wording, page sections, labels, tables, rubrics, and resource-card copy. |
| `src/course-config.ts` | Final canonical course code, title, description, level, teaching period, and dates after implementation begins. |
| `spec/` | Automated checks for facts and promises that must remain consistent across pages. |

Implementation rules:

- Preserve the meaning and marking allocations of approved content.
- Adapt Markdown into components where useful, but do not silently shorten requirements or invent new rules.
- Do not copy design commentary, rejected alternatives, or unpublished operational details from `assignment_brief.md` onto student pages.
- Essential task requirements and rubrics must remain readable on the webpage. A PDF brief is a downloadable mirror, not the sole source.
- If an implemented page conflicts with this file, fix the page or explicitly update this file and the associated course test in the same change.
- Facts owned by `course-config.ts`, especially dates and the course code, should be referenced rather than manually duplicated where the template permits.

## Home page

### Hero

**Course label:** `SLOP4xxx · Semester 1, 2027`

**Hero heading:** Training Language Models: A Budgeted Engineering Task

**Frontier practice through budgeted 32M-scale experiments.**

Most language-model courses begin after the expensive decisions have already been made. This course begins before the first training token. You will choose how to spend a limited model and compute budget, build a narrative language model from scratch, reshape its behaviour through post-training, and adapt it for one bounded specialist task.

The objective is not to imitate a frontier model at miniature scale. It is to learn which claims survive contact with limited parameters, limited data, limited compute, and evidence you must be able to defend.

**Primary call to action:** Start with Week 1  
**Destination:** Week 1 lecture page

**Secondary call to action:** View the three projects  
**Destination:** Assessments index

### The course in three stages

#### 1. Build language ability

Pre-train a decoder-only Transformer on a supplied narrative corpus. Decide how model capacity, tokenization, data, optimisation, and runtime fit together under a 32M-parameter design target.

**Project 1:** Build a Narrative Base Model · 20% · due end of Week 4

#### 2. Shape model behaviour

Start from a narrative checkpoint and give the model a recognisable voice. Compare continued pre-training, supervised instruction tuning, preference-based methods, or a justified combination without hiding regressions behind one improved metric.

**Project 2:** Give the Model a Voice · 50% · due end of Week 8

#### 3. Build a specialist

Adapt a permitted checkpoint for one measurable function. Choose a bounded narrative capability or arithmetic reasoning, test generalisation, and determine what the intervention changed as well as what it damaged.

**Project 3:** Build a Specialist · 30% · due end of Week 12

### What you will learn to do

By the end of the course, you should be able to:

1. explain and critically evaluate current language-model architectures, data practices, training stages, efficiency techniques, and emerging claims;
2. plan model capacity, data, optimisation, compute, time, and evaluation as one constrained engineering system;
3. run controlled experiments, inspect quantitative results and qualitative failures, and revise a plan when the evidence requires it; and
4. transfer ideas from frontier systems into small-scale experiments while identifying what may not transfer across scale.

### One budget, not unlimited search

Every project has a learned-parameter boundary and two cumulative compute ceilings. Pilots, ablations, failed training runs, and final runs all count. The constraint is part of the subject: strong work chooses informative experiments, preserves evidence, and stops when another run would not answer a useful question.

The course provides working starter repositories, versioned data, Colab notebooks, evaluation packs, and course-managed fallback compute. Prior experience training an LLM or using a GPU is not required; introductory machine learning, basic Python, and willingness to inspect PyTorch code are expected.

### Assessment timeline

| Teaching block | Project | Weight | Deadline |
| --- | --- | ---: | --- |
| Weeks 1–4 · Pre-training | Project 1 — Build a Narrative Base Model | 20% | Sunday 21 March 2027, 23:59 AET |
| Weeks 5–8 · Post-training | Project 2 — Give the Model a Voice | 50% | Sunday 25 April 2027, 23:59 AET |
| Weeks 9–12 · Specialisation | Project 3 — Build a Specialist | 30% | Sunday 23 May 2027, 23:59 AET |
|  | **Total** | **100%** |  |

### How the course works

- **Lectures** connect mechanisms, public evidence, and the decisions students must make at 32M scale.
- **Labs** turn one mechanism into a bounded exercise: read it, run it, inspect it, change one thing, and transfer the result into the current project.
- **Projects** assess the resulting engineering judgement through a reproducible report and a frozen submitted checkpoint.
- **Frontier Notes** occasionally introduce a relevant new paper or model report. They are optional and are never silently added to assessed prerequisite knowledge.

### Home-page closing call to action

Training begins with the target, not the training loop. In Week 1, you will turn story text into token targets and make the first decision that affects every later result.

**Call to action:** Open Week 1 — What a Language Model Learns  
**Supporting links:** View the schedule · Read the assessment overview · Check course policies

### Primary navigation

| Label | Destination | Purpose |
| --- | --- | --- |
| Home | Course home | Course identity, value, pathway, and current starting point |
| Schedule | Twelve-week schedule | One chronological view of lectures, labs, project milestones, and the break |
| Lectures | Lecture index | Weekly teaching pages, readings, slides, and Frontier Notes |
| Labs | Lab index | Preparation, notebooks/activities, expected outputs, and solution releases |
| Assessments | Assessment index | Project briefs, rubrics, resources, due dates, and submission panels |
| Policies | Policies page | Rules covering compute, data, evaluation, submission, support, and privacy |
| People | People page | Teaching roles, contact routing, and consultation times |

Use the same labels in desktop and mobile navigation. The current section may be indicated visually, but colour must not be the only cue.

## Assessment-wide student-facing copy

### Course identity and calendar

| Field | Approved value |
| --- | --- |
| Title | **Training Language Models: A Budgeted Engineering Task** |
| Code | `SLOP4xxx`: retain the starter repository's allocated final three digits and keep the leading digit as 4 |
| Description | Study how modern language models are trained, then rebuild the pipeline at a controllable scale: pre-train a narrative model, reshape it through post-training, and specialise it for a defined task under a 32M design target and fixed compute budgets. |
| Tags | Large Language Models; Training Systems; Compute-Constrained ML |
| Level | Fourth-year undergraduate with a postgraduate pathway |
| Teaching period | Semester 1, 2027 |
| Teaching dates | Monday 22 February–Sunday 23 May 2027 |
| Mid-semester break | Monday 5–Sunday 11 April 2027 |

The implementation must read the final three course-code digits from the starter repository rather than asking the course designer to invent a replacement.

| Assessment deadline | Date and time |
| --- | --- |
| Project 1 — Build a Narrative Base Model | Sunday 21 March 2027, 23:59 AET |
| Project 2 — Give the Model a Voice | Sunday 25 April 2027, 23:59 AET |
| Project 3 — Build a Specialist | Sunday 23 May 2027, 23:59 AET |

### How this course is marked

The course contains three individual projects worth 20%, 50%, and 30%. Each project is marked from the engineering report and the submitted model. Model quality matters, but it is not judged through a class leaderboard or one metric alone.

High marks require a defensible plan, a working and reproducible system, controlled evidence, honest failure analysis, and a final checkpoint that demonstrates the stated behaviour. A technically ambitious method receives no automatic credit. A failed intervention can still support a strong report when the hypothesis, comparison, evidence, and conclusion are rigorous.

### Report format

Use the supplied two-column CVPR LaTeX report template. It can be uploaded to and edited in Overleaf; local LaTeX editing is also permitted.

| Project | Main-paper limit | References | Appendix |
| --- | ---: | --- | --- |
| Project 1 | 15 pages | Not included in the limit | Allowed after references; not included in the limit |
| Project 2 | 20 pages | Not included in the limit | Allowed after references; not included in the limit |
| Project 3 | 20 pages | Not included in the limit | Allowed after references; not included in the limit |

Important methods, results, and reasoning must appear in the main paper. The appendix may contain additional samples, configurations, logs, or supporting tables, but markers are not required to use appendix material to reconstruct the central argument. Content beyond the main-paper limit may be disregarded and serious attempts to evade the limit may lose communication marks.

Every report must include a short **AI Assistance Statement** naming the tools used, what they assisted with, any material code or text they influenced, and how the output was checked. AI use is permitted when declared; responsibility for the submitted work remains with the student.

### Default models and starter configurations

The default model and starter configuration for each project are published in that project's assigned GitLab repository when it opens. The repository provides a working baseline, default training configuration, and a parameter-count check that runs before training begins. Students may change model parameters, architecture components, tokenization, data, and training configuration where the project permits; the defaults are a reliable starting point, not a required solution.

The design target is **32,000,000 learned parameters**. A published 5% implementation tolerance means checkpoints up to and including **33,600,000 learned parameters** are accepted without penalty. This is the absolute eligibility boundary, not an additional hidden allowance. The preflight output must be checked before a costly run. A checkpoint above 33.6M is not eligible for submitted-model marks.

### Course datasets and additional data

- **Project 1** provides a cleaned basic story corpus for narrative pre-training, with a versioned split, licence and provenance record, checksums, and a reproducible preprocessing script.
- **Project 2** provides processed, verified public-domain editions of *Grimm's Fairy Tales* and *One Thousand and One Nights* as the target-style starting corpora.
- **Project 3** provides track-specific data and a `test_pilot` file that demonstrates the supported input/output format and difficulty.

Students may supplement or replace a supplied corpus with a permitted dataset when that choice supports their training plan. They are responsible for its licence, provenance, preprocessing, contamination risk, storage and training cost, and any resulting performance or failure. Additional data earns no automatic credit; its contribution must be evaluated and reported.

### Compute budgets

Compute is measured cumulatively across project-specific pilots, ablations, failed runs that performed meaningful training, and final runs. The repository ledger converts supported hardware to T4-equivalent time and estimates training FLOPs. Both published ceilings apply; reaching either ceiling ends the assessed training allowance. Staff-run demonstrations and untouched lab toy exercises do not count, while a student's project-specific modifications do.

| Project | T4-equivalent GPU-hours | Training-FLOP ceiling | Suggested planning allowance |
| --- | ---: | ---: | --- |
| Project 1 | 24 hours | \(4.0\times10^{17}\) | 4 h setup/debug; 8 h pilots; 10 h principal/final runs; 2 h recovery reserve |
| Project 2 | 18 hours | \(2.5\times10^{17}\) | 3 h transition/debug; 6 h method pilots; 7 h principal/final runs; 2 h recovery reserve |
| Project 3 | 12 hours | \(1.5\times10^{17}\) | 2 h task-pipeline debug; 4 h comparison/ablation; 5 h principal/final runs; 1 h recovery reserve |

Only the total ceilings are enforced; the suggested internal allocations are planning guidance. Evaluation-only inference is logged separately. Colab Free is the recommended starting environment, and the course-managed RunPod credit remains a fallback access mechanism rather than extra assessed compute.

### Starting checkpoints and fallbacks

- **Project 2:** use the student's frozen Project 1 submission or the course narrative fallback checkpoint.
- **Project 3 Track A:** use the student's frozen Project 1 or Project 2 submission, or the course narrative fallback checkpoint.
- **Project 3 Track B:** use the course-provided general-language checkpoint.

The chosen starting checkpoint must be declared in the report and submission manifest. When a student chooses their own earlier checkpoint, tutors verify its recorded revision, parameter count, tensor shapes, and checksum against the checkpoint frozen for that earlier submission. Matching only the filename is insufficient, and training may not begin from an undeclared later replacement. The fallback exists so that a weak or unusable earlier result does not prevent participation in the next project; using it carries no mark penalty.

### Evaluation protocol

Each project supplies two public evaluation layers. They serve different purposes and must remain separate from training data.

1. **Five development examples with ground truth.** Each example contains a prompt and its reference continuation or answer. Use these examples to verify that the evaluation pipeline, masking, tokenizer, and sampler work end to end. They may also appear as clearly labelled qualitative cases in the report. They are diagnostic examples, not the source of the official submitted-model mark.
2. **Ten tutor-evaluation prompts.** The ten prompts are public before the deadline, but their reference continuations or answers are withheld. Each item is stored as one string: a truncated source-story prefix for Projects 1 and 2, the relevant narrative input for Project 3 Track A, or the task input for Project 3 Track B. The teaching team runs the frozen submission against all ten items.

Neither set may be used for training, validation, retrieval, tokenizer construction, synthetic-data seeding, sampler tuning, checkpoint selection, or manual output editing. Before training, students run the repository's supplied separation validator over their proposed corpus. It checks exact matches and likely near-duplicate overlap against the released evaluation prompts and produces a report suitable for the experiment record. Passing the script is evidence of due diligence, not permission to ignore provenance or a guarantee that no contamination exists.

Official perplexity is calculated on the withheld continuation or answer only: prompt tokens provide context but do not contribute to scored negative log-likelihood. Losses are pooled across all ten items before exponentiation. To keep the fixed thresholds meaningful when a student changes tokenizer, the course reports **reference-token-normalised perplexity**:

\[
P = \exp\left(\frac{\sum_i \operatorname{NLL}_i}{\sum_i N_i^{\mathrm{ref}}}\right),
\]

where \(\operatorname{NLL}_i\) is the submitted model's total negative log-likelihood for the ground-truth continuation or answer and \(N_i^{\mathrm{ref}}\) is that same raw target's token count under the published course reference tokenizer. With the default tokenizer, this is ordinary continuation-only perplexity. Students who change tokenizer should also report BPB as a diagnostic, but the official thresholds below still use \(P\).

For a project whose submitted-model component is worth \(M\) marks, two thirds of that component is the perplexity score:

\[
S_{\mathrm{PPL}} = \frac{2M}{3}
\begin{cases}
1, & P \le 25,\\
\exp[-0.1(P-25)], & 25 < P < 50,\\
0, & P \ge 50.
\end{cases}
\]

The remaining one third measures task-specific output quality under the published rubric. Model marks are calculated at full precision and rounded only when the project total is recorded. A PPL at or below 25 earns all available PPL marks, not all submitted-model marks; low perplexity cannot substitute for the required behaviour. For orientation, \(P=35\) retains about 36.8% of the available PPL marks and \(P=45\) retains about 13.5%.

### Task-specific model review

The remaining one third of each submitted-model component is calculated from a pre-declared task-specific review. The teaching team generates one output for every tutor-evaluation prompt using the frozen checkpoint, submitted sampler configuration, and published seed schedule. Students do not select, regenerate, or edit these outputs.

Story-based outputs are de-identified and independently reviewed by **three trained raters**. Raters see the prompt, output, task definition, and rating anchors, but not the student's identity, report, architecture, method, or existing marks. Output order is randomised when a comparison model is shown. If the highest and lowest ratings for an item differ by three or more points on a dimension, a fourth blind rater adjudicates that dimension; the final item score is the median of all valid ratings.

Human-scored dimensions use the same five anchors on a **0–4 scale**:

| Rating | Anchor |
| ---: | --- |
| **4 — Strong** | The behaviour is clear and sustained; the output remains usable, coherent, and free from a material failure on this dimension. |
| **3 — Effective** | The behaviour is present and generally reliable, with a minor lapse that does not undermine the output as a whole. |
| **2 — Mixed** | Some relevant behaviour is present, but it is inconsistent, weak, or offset by a noticeable failure. |
| **1 — Weak** | Only limited evidence of the behaviour is visible, or a major failure makes most of the output unusable. |
| **0 — Absent/invalid** | The behaviour is absent, the output is empty or malformed, or failure on this dimension prevents meaningful assessment. |

For a submitted-model component worth \(M\) marks, the task-specific score is

\[
S_{\mathrm{task}}=\frac{M}{3}\sum_d w_d\frac{\bar r_d}{4},
\qquad \sum_d w_d=1,
\]

where \(w_d\) is the published dimension weight and \(\bar r_d\) is its mean 0–4 score across the ten tutor prompts. A dimension measured by an exact verifier or success rate \(q_d\) is converted as \(\bar r_d=4q_d\). Human preference cannot override an incorrect arithmetic answer or invalid required format. Aggregated dimension results and the number of adjudicated items are returned with feedback.

| Project/track | Task-specific dimensions and weights |
| --- | --- |
| **Project 1** | Connection to the supplied prefix **35%**; narrative coherence and fluency **30%**; avoidance of repetition or degeneration **20%**; stopping and completeness **15%**. |
| **Project 2** | Recognisable target behaviour **35%**; narrative coherence and usability **30%**; robustness across varied openings **20%**; retention and integrity, including unacceptable regression or copying **15%**. Raters compare de-identified outputs from the submitted and unchanged starting checkpoints where retention is relevant. |
| **Project 3 Track A** | Objective satisfaction of the declared condition **40%**; narrative quality **25%**; held-out generalisation and prompt robustness **20%**; retention of the monitored starting capability **15%**. Automatically checkable conditions are scored by the published verifier. |
| **Project 3 Track B** | Exact final-answer accuracy **55%**; required output-format validity **15%**; accuracy on unseen values and templates within the published scope **20%**; retained language and instruction reliability **10%**. The first three dimensions are computed by the evaluation harness; three blind raters assess only the final qualitative dimension. |

The review is criterion-referenced rather than comparative across students. Project 3 tracks are not placed on one leaderboard, and raters do not reward stylistic preference, method complexity, or resemblance to one withheld reference answer.

### Technical gates

The teaching team evaluates the frozen Hugging Face revision submitted before the deadline. The submitted package must load using the supplied command and must reproduce the declared model configuration, tokenizer, sampler, and parameter count.

- A packaging error may be corrected only when the teaching team can verify that the weights and reported results have not changed.
- A checkpoint that cannot be evaluated after the permitted packaging correction receives zero for the submitted-model component; the report is still marked on the evidence it contains.
- A model above the 33.6M hard boundary, including the published 5% tolerance over the 32M design target, is not eligible for submitted-model marks.
- Evaluation contamination, undeclared external weights, fabricated evidence, or deliberate compute-accounting circumvention is handled under academic-integrity procedures rather than as a normal performance deduction.
- Models are not ranked against classmates. Tutor-evaluation metrics and blinded human judgements are interpreted against the published task criteria.

### Undergraduate and postgraduate expectations

All students use the same task, infrastructure, and marking allocation. Undergraduate work can earn full marks through a valid system, appropriate controlled evidence, and careful analysis at the level taught in the course.

For postgraduate enrolment, the top range of analysis and reflection criteria additionally requires deeper examination of plausible mechanisms, alternative explanations, and links to relevant theory or frontier evidence. Naming more papers or running more experiments is not sufficient by itself.

---

## Assessment page: Project 1 - Build a Narrative Base Model

### Page summary

Train a decoder-only language model from scratch that can continue an incomplete story with recognisably narrative language. The goal is not to reproduce one withheld reference ending. The model should generate a plausible continuation that remains connected to the supplied prefix, is reasonably fluent, avoids obvious degeneration, and can stop at a sensible point.

### Key facts

| Item | Value |
| --- | --- |
| Weight | 20% |
| Marks available | 20 |
| Training stage | Pre-training from scratch |
| Work mode | Individual |
| Model size | 32M design target; 33.6M absolute maximum |
| Compute budget | 24 T4-equivalent GPU-hours and \(4.0\times10^{17}\) training FLOPs |
| Main report | 15 CVPR pages, excluding references and appendix |
| Due | Sunday 21 March 2027, 23:59 AET — end of Week 4 |

### What you must demonstrate

Your submission should show that you can turn permitted story data into a working language-model training system, allocate limited model and compute capacity deliberately, compare at least one meaningful choice, and select a final checkpoint using evidence rather than intuition alone.

Tutor-evaluation prompts are authentic prefixes truncated from complete held-out stories. They cover different prefix lengths and story styles within the announced narrative domain. Their source stories and withheld continuations must not influence training or model development.

### Marking breakdown

| Component | Marks |
| --- | ---: |
| Engineering report | 10 |
| Submitted model | 10 |
| **Total** | **20** |

### Engineering report - 10 marks

#### 1. Pipeline correctness and reproducibility - 2 marks

High marks require a correct document-level split, a clearly described preprocessing and tokenization pipeline, a sound from-scratch training setup, and commands that reproduce training, evaluation, and sampling. Configuration, seeds, dependencies, special tokens, and checkpoint selection must be traceable.

Marks are reduced when important processing steps are missing, the described setup does not match the repository, leakage is possible, or the system cannot be followed from the evidence provided.

#### 2. Model-data-compute planning - 2 marks

High marks require an explicit pre-training target and a reasoned allocation of the model and compute budgets. Discuss the relationship between model depth/width, context, vocabulary, data quantity and quality, training steps, and expected behaviour. Explain what was held constant and why the proposed experiments were affordable.

Marks are reduced for listing hyperparameters without explaining their relationship, relying on unrestricted trial and error, or presenting a plan that could not reasonably be completed within the budget.

#### 3. Experimental rigour - 2 marks

High marks require at least one controlled comparison tied to a stated hypothesis, appropriate baselines, consistent evaluation conditions, and useful training evidence such as learning curves, gradient or stability observations, runtime, and processed-token counts. Relevant unsuccessful trials should be included.

Marks are reduced when several variables change without analysis, comparisons use mismatched conditions, evidence is selectively reported, or conclusions extend beyond the experiment.

#### 4. Evaluation and failure analysis - 3 marks

High marks require correct use of the official reference-token-normalised PPL, BPB or comparable diagnostic loss where informative, representative generated samples, declared decoding settings, and analysis of coherence, repetition, prefix consistency, and stopping failures. Explain why the final checkpoint and sampler were selected without tuning on the released assessment items.

Marks are reduced when evaluation depends on one metric, uses only favourable examples, treats the withheld reference continuation as the only valid answer, or does not connect observed failures to training decisions.

#### 5. Communication and research practice - 1 mark

High marks require a concise and readable report that distinguishes measurements, interpretations, and hypotheses; cites datasets, code, and technical claims; labels edited or selected samples honestly; and includes the required AI Assistance Statement.

Marks are reduced for unclear structure, missing attribution, unsupported claims, failure to declare material AI assistance, or reliance on appendix material for the main argument.

### Submitted model - 10 marks

Submission validity is a technical gate. A valid model receives up to **6⅔ marks** from the shared tutor-evaluation PPL rule and up to **3⅓ marks** from blinded story-continuation review.

#### 6. Tutor-evaluation perplexity - 6⅔ marks

The shared formula is applied to continuation-only reference-token-normalised PPL across all ten tutor prompts. A score of \(P \le 25\) earns all 6⅔ marks available here; \(25 < P < 50\) receives the published exponential decay; and \(P \ge 50\) receives zero for this criterion.

#### 7. Story continuation quality - 3⅓ marks

Blinded review considers fluency, connection to the given characters, events, and tone, local and short-range consistency, avoidance of empty or repetitive degeneration, and whether the continuation reaches or approaches a reasonable stopping point. Multiple plausible continuations can receive full credit; reproducing the withheld source ending is not required.

### Six resource cards

1. Full Project Brief PDF
2. Project 1 Starter Repository
3. CVPR Report Template
4. Narrative Dataset and Data Card
5. Pre-training Colab
6. Public Evaluation Pack

---

## Assessment page: Project 2 - Give the Model a Voice

### Page summary

Starting from the Project 1 narrative checkpoint, post-train the model to produce stories with a recognisable target narrative style. You may use target-domain continued pre-training, supervised instruction tuning, preference-based optimisation, or a justified combination. The choice of method is open; the obligation to define, test, and defend the target behaviour is not.

### Key facts

| Item | Value |
| --- | --- |
| Weight | 50% |
| Marks available | 50 |
| Training stage | Post-training |
| Work mode | Individual |
| Model size | 32M design target; 33.6M absolute maximum |
| Compute budget | 18 T4-equivalent GPU-hours and \(2.5\times10^{17}\) training FLOPs |
| Main report | 20 CVPR pages, excluding references and appendix |
| Due | Sunday 25 April 2027, 23:59 AET — end of Week 8 |

### What you must demonstrate

Define the target style in operational terms, use the supplied public-domain *Grimm's Fairy Tales* and *One Thousand and One Nights* corpora or justify a permitted replacement, compare the post-trained model with the unchanged starting checkpoint, and evaluate target adaptation alongside narrative quality and retention. The project rewards the engineering fit between the chosen method, data, budget, and evidence rather than the complexity or novelty of the post-training algorithm.

If you use instruction tuning, document the schema, special tokens, and loss masking. If you use preference optimisation, first establish an SFT or otherwise appropriate baseline and demonstrate why the extra pipeline and compute were justified. Work without genuine human preference labels must not be described as full RLHF.

### Marking breakdown

| Component | Marks |
| --- | ---: |
| Engineering report | 35 |
| Submitted model | 15 |
| **Total** | **50** |

### Engineering report - 35 marks

#### 1. Target behaviour and method rationale - 5 marks

High marks require a testable definition of the intended voice or style, success criteria that go beyond a vague resemblance claim, and a reasoned choice among continued pre-training, SFT, preference optimisation, or a combination. Explain what behaviour the method can supervise and what it cannot guarantee.

Marks are reduced when the target remains impressionistic, a method is chosen because it is fashionable, or the report does not connect the method to the available data and budget.

#### 2. Data design and provenance - 5 marks

High marks require permitted and well-documented source editions, story/source-level splits, appropriate cleaning and formatting, token and source statistics, deduplication or overlap checks, and a defensible balance between target-style data and retained narrative ability. Synthetic or AI-labelled data must be identified and validated.

Marks are reduced for unclear licensing, possible train/test overlap, unexamined copying or memorisation risk, weak preprocessing documentation, or treating more data as automatically better.

#### 3. Implementation and reproducibility - 5 marks

High marks require a correct transition from the starting checkpoint, a reproducible post-training pipeline, traceable tokenizer/chat-template/loss-mask behaviour, declared hyperparameters and seeds, and a final package that matches the reported method. Architecture changes must be loadable and justified.

Marks are reduced when the implementation cannot be reconstructed, the starting model is ambiguous, loss is applied to unintended tokens, or reported and submitted configurations disagree.

#### 4. Experimental design and budget judgement - 7 marks

High marks require meaningful baseline comparisons, controlled ablations or pilots, justified training duration and checkpoint selection, and evidence that the student prioritised experiments under the compute deadline. Compare the chosen route with at least one feasible alternative through a run, pilot, or evidence-based rejection.

Marks are reduced for indiscriminate sweeps, unmatched baselines, omitted failed attempts, use of extra complexity without a diagnostic purpose, or claims that cannot be separated from decoding changes.

#### 5. Multi-objective evaluation and regression analysis - 8 marks

High marks require held-out target-style language modelling, blind or clearly structured behavioural comparison, narrative coherence/completeness assessment, repetition and source-overlap checks, and evaluation of the original Project 1 capability. Analyse trade-offs rather than hiding a regression behind one improved metric.

Marks are reduced when target-style perplexity is treated as proof of storytelling quality, only favourable prompts are shown, retention is not measured, human judgement lacks a rubric, or conclusions ignore uncertainty and failure cases.

#### 6. Communication, limitations, and engineering reflection - 5 marks

High marks require a coherent report that makes the decision trail visible: initial expectation, evidence, revision, final choice, limitations, and what the project reveals about post-training under constraints. Sources and AI assistance must be declared appropriately.

For postgraduate top-range work, this section and the evaluation analysis should also examine plausible mechanisms and alternative explanations, distinguishing evidence from speculation.

### Submitted model - 15 marks

Submission validity is a technical gate. A valid model receives up to **10 marks** from the shared tutor-evaluation PPL rule and up to **5 marks** from blinded task-specific review.

#### 7. Tutor-evaluation perplexity - 10 marks

The shared formula is applied to continuation-only reference-token-normalised PPL across all ten tutor prompts. A score of \(P \le 25\) earns all 10 marks available here; \(25 < P < 50\) receives the published exponential decay; and \(P \ge 50\) receives zero for this criterion.

#### 8. Target behaviour, narrative quality, and retention - 5 marks

Blinded review asks whether readers can consistently recognise the operationally defined target behaviour across varied openings while the output remains fluent, connected, narratively usable, and free from dominant repetition or malformed stopping. The review also considers retention of the original narrative capability, robustness to prompt variation, and evidence of copying or source overlap. A single showcase, memorised passage, or strong style signal attached to an incoherent story cannot earn high marks.

### Six resource cards

1. Full Project Brief PDF
2. Project 2 Starter Repository
3. CVPR Report Template
4. Target-Style Corpus and Data Card
5. Post-training Starter Pack
6. Behaviour Evaluation Pack

---

## Assessment page: Project 3 - Build a Specialist

### Page summary

Choose one specialisation track, define one primary target behaviour, and fine-tune an appropriate starting checkpoint. Track A adds a bounded narrative function; Track B specialises a course-provided general-language checkpoint for a bounded reasoning or structured question-answering task. Both tracks use the same marking allocation and engineering standard.

### Key facts

| Item | Value |
| --- | --- |
| Weight | 30% |
| Marks available | 30 |
| Training stage | Task-specific adaptation |
| Work mode | Individual; choose Track A or Track B |
| Model size | 32M design target; 33.6M absolute maximum |
| Compute budget | 12 T4-equivalent GPU-hours and \(1.5\times10^{17}\) training FLOPs |
| Main report | 20 CVPR pages, excluding references and appendix |
| Due | Sunday 23 May 2027, 23:59 AET — end of Week 12 |

### What you must demonstrate

Declare one measurable capability, justify the starting checkpoint, establish the unchanged-model baseline, train on a strictly separated dataset, perform at least one controlled comparison or ablation, test held-out generalisation, and measure at least one relevant pre-existing capability for regression.

One carefully investigated function is sufficient. Additional functions, a more complex algorithm, chain-of-thought output, or preference optimisation receive no automatic credit. If constrained decoding or post-processing is used, distinguish model-learned behaviour from externally enforced behaviour.

For **Track B**, the fixed task family is arithmetic and arithmetic word-problem answering. It covers ordinary arithmetic operations and short application questions that require both language understanding and calculation. The starter repository's `test_pilot` file defines the supported prompt/answer schema, operation and value ranges, formatting rules, and representative difficulty. Formal items use different values and wording while remaining within that published scope.

### Alternative Track A proposal and approval

The listed Track A capabilities may be used without separate approval. A student who wants to investigate a different narrative specialisation of comparable scope must obtain approval before substantial training.

Use the `proposal.md` template in the Project 3 starter repository and submit its frozen GitLab link through the Project 3 proposal panel by **Sunday 2 May 2027, 23:59 AET**, the end of Week 9. The proposal is limited to one page and must state:

1. one primary target behaviour and why it fits a bounded narrative specialisation;
2. the permitted starting checkpoint;
3. proposed training data and its licence or provenance;
4. a strictly held-out evaluation design and success measures;
5. the unchanged-model baseline and at least one controlled comparison;
6. one pre-existing capability that will be checked for regression;
7. the proposed compute allocation; and
8. any safety, privacy, or feasibility risk specific to the task.

The convenor responds within two teaching days with **approved**, **revise**, or **out of scope**. Approval confirms only that the task is assessable, feasible, and comparable in scope; it is not advance approval of the method and does not imply a mark. A revise decision identifies the minimum clarification required. An out-of-scope proposal must be replaced by a supported Track A capability or Track B.

Before approval, students may prepare data, implement checks, and run a pipeline dry-run using no more than **0.5 T4-equivalent GPU-hours**. This compute still counts toward the Project 3 budget. Training beyond that point before approval is undertaken at the student's risk and cannot be used to make an unapproved task assessable retrospectively. Approved changes to the task must be recorded as a new `proposal.md` revision before further substantial training.

### Marking breakdown

| Component | Marks |
| --- | ---: |
| Engineering report | 20 |
| Submitted model | 10 |
| **Total** | **30** |

### Engineering report - 20 marks

#### 1. Task definition and success criteria - 3 marks

High marks require one clearly bounded target behaviour, a justified scope, valid success measures, and a test plan that includes unseen cases. Track A conditions must be objectively checkable where possible; Track B must specify supported operations and output format.

Marks are reduced for an unbounded assistant goal, several weakly connected functions, measures that reward superficial formatting alone, or a task whose claimed success cannot be tested.

#### 2. Starting checkpoint and data design - 3 marks

High marks require a justified permitted checkpoint, clear training/development/test separation, appropriate examples and counterexamples, documented provenance and formatting, and a reasoned relationship between the data and expected generalisation.

Marks are reduced when the checkpoint choice is unexplained, templates leak into the held-out set, data merely repeats the evaluation cases, or the model/data pairing is unsuitable for the task.

#### 3. Implementation and reproducibility - 3 marks

High marks require a correct fine-tuning pipeline, verified target masking, declared hyperparameters and seeds, reproducible commands, and a submitted package consistent with the report. Track-specific parsers, special tokens, or architecture changes must be included and tested.

#### 4. Controlled comparison and ablation - 4 marks

High marks require comparison with the unchanged starting model and at least one controlled intervention that addresses a meaningful uncertainty, such as data balance, rationale format, loss masking, curriculum, or regularisation. Resource use and failed attempts must be reported.

Marks are reduced when the final model is shown without a baseline, several variables change together, or the ablation does not inform the final engineering decision.

#### 5. Evaluation, generalisation, and regression analysis - 5 marks

High marks require task-appropriate held-out metrics, tests beyond memorised templates, representative qualitative cases, an error taxonomy, and measurement of at least one retained capability. Track A should separate constraint satisfaction from story quality; Track B should separate final-answer accuracy, format validity, and rationale quality where rationales are used.

Marks are reduced for evaluating only training-like examples, treating plausible reasoning text as correctness, omitting regressions, or drawing broad conclusions from a small or biased test set.

#### 6. Communication and course-level reflection - 2 marks

High marks require concise, properly attributed reporting and a specific reflection on what the result demonstrates about task adaptation under limited model, data, compute, and time. Postgraduate top-range work should also evaluate mechanisms and alternative explanations.

### Submitted model - 10 marks

Submission validity is a technical gate. A valid model receives up to **6⅔ marks** from the shared tutor-evaluation PPL rule and up to **3⅓ marks** from track-specific performance review.

#### 7. Tutor-evaluation perplexity - 6⅔ marks

The shared formula is applied to answer- or continuation-only reference-token-normalised PPL across all ten tutor prompts. A score of \(P \le 25\) earns all 6⅔ marks available here; \(25 < P < 50\) receives the published exponential decay; and \(P \ge 50\) receives zero for this criterion.

#### 8. Track-specific capability, generalisation, and reliability - 3⅓ marks

For Track A, review combines objective constraint satisfaction with story quality on unseen stories, vocabulary sets, or conditions. For Track B, it combines correct final answers, valid output format, and performance on unseen values or question templates within the announced task family; plausible rationale text does not substitute for a correct answer. In both tracks, the model should avoid unacceptable regression in the monitored starting capability and dependence on one fragile prompt wording, seed, or decoding setting.

### Six resource cards

1. Full Project Brief PDF
2. Project 3 Starter Repository
3. CVPR Report Template
4. Fine-tuning Starter Pack
5. Starting Model and Task Data
6. Track Evaluation Pack

---

## People page

### Teaching team

This course is supported by three roles with deliberately different responsibilities. Use the course forum for questions whose answers would help the cohort; use individual email only for access problems, submission-specific details, or personal circumstances.

| Question | Best contact |
| --- | --- |
| Course concepts, assessment interpretation, or an alternative Project 3 proposal | Dr Yiwei Easton |
| PyTorch, data pipelines, training faults, checkpoint loading, or evaluation code | Maya Rao |
| Compute accounting, Colab/RunPod access, parameter preflight, or platform incidents | Eli Morgan |
| A question useful to other students | Course forum |
| A personal or confidential matter | `yiwei.easton@slopu.edu.au` |

### Dr Yiwei Easton

#### Course Convenor and Lecturer

Yiwei teaches language-model training at the intersection of machine learning, empirical evaluation, and resource-aware systems. Their interests include how architecture, data quality, optimisation, post-training, and evaluation interact when the apparent best method cannot simply be scaled without limit.

- **Responsibilities:** lectures, assessment design, Project 3 alternative-task approvals, policy interpretation, and the weekly Frontier Note where relevant.
- **General contact:** `llm-training@slopu.edu.au` or the course forum.
- **Personal/confidential contact:** `yiwei.easton@slopu.edu.au`.
- **Consultation:** Tuesdays, 14:00–15:00 AET, Room 4.21, Model Systems Building, with simultaneous Zoom access from the course site. No booking is required. Email for a private appointment outside this hour.

### Maya Rao

#### Teaching Fellow and Technical Tutor

Maya runs the practical labs and model clinics, with a focus on PyTorch, dataset pipelines, training diagnostics, checkpoint loading, and reproducible evaluation.

- **Responsibilities:** lab facilitation, technical debugging, starter-platform guidance, and formative feedback on whether an experiment is well controlled.
- **Support boundary:** technical support can help locate and understand a fault, but it will not choose an assessed architecture, training recipe, or report conclusion for a student.
- **Contact:** the `Technical help` area of the course forum or `maya.rao@slopu.edu.au` for an individual access problem.
- **Consultation:** Thursdays, 16:00–17:00 AET, Compute Commons 2.14. An additional model clinic runs online on Monday, 15:00–16:00 AET, during Weeks 4, 8, and 12.

### Eli Morgan

#### Compute Steward

Eli protects the fairness and operability of the constrained-training environment. The role exists because equitable access, reproducible runtime estimates, and consistent budget accounting are part of the course rather than incidental administration.

- **Responsibilities:** maintain the reference Colab notebook and parameter checker; publish baseline runtime estimates; clarify compute accounting; record widespread outages; and coordinate the approved fallback environment.
- **Support boundary:** the Compute Steward verifies resource use and platform behaviour but does not judge the scientific merit of an experiment or provide advance grading advice.
- **Contact:** `compute@slopu.edu.au`. Cohort-wide incidents and resolutions are posted in the course status area.
- **Consultation:** Fridays, 11:00–12:00 AET, online through the course site. Urgent access failures should be emailed when they occur rather than held for the drop-in.

### Availability and respectful contact

Teaching staff normally reply within two teaching days. Messages sent late on a deadline day may not receive a response before submission. Do not include API keys, access tokens, private repository credentials, complete checkpoints, or personal information in forum posts or email attachments.

---

## Policies page

### Before you begin

These policies apply to all three projects. Each assessment page may restate the rule most relevant to that task, but the meaning must remain consistent with this page. Course teaching materials authored for this site are released under the **Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International** licence unless a resource states otherwise. Third-party code, datasets, model weights, papers, figures, and templates retain their own licences and attribution requirements.

### 1. Compute allocation

Google Colab Free is the recommended starting environment. Its interruptions and limited availability are part of the course's budget-engineering setting, but no student is required to rely on an uncertain free service to complete assessed work.

For each project, SlopU provides every enrolled student with up to **USD 50 of course-managed RunPod credit**. This guaranteed fallback is supplied without a personal subscription or payment card. It may be used when Colab is unavailable, when a reproducible final run needs a stable instance, or when the student decides that predictable runtime is worth part of the project budget.

The monetary credit and assessed compute allowance are different limits:

- the credit determines how much fallback infrastructure SlopU will fund;
- `budget.json` defines the maximum assessed training computation: Project 1 permits 24 T4-equivalent GPU-hours and \(4.0\times10^{17}\) training FLOPs; Project 2 permits 18 hours and \(2.5\times10^{17}\) FLOPs; Project 3 permits 12 hours and \(1.5\times10^{17}\) FLOPs;
- both the time and FLOP ceilings apply, using the published hardware conversion factors;
- all pilots, ablations, failed runs that consumed meaningful compute, and final training runs count;
- staff demonstrations and unmodified lab toy exercises do not count, but project-specific modified runs do;
- evaluation-only inference is reported separately and is not silently converted into extra training budget; and
- paid Colab, private GPUs, or unused credit do not increase the formal allowance.

Students submit the automatically generated compute ledger with the report. Deliberately disabling or altering accounting is an academic-integrity breach. A calculation error made in good faith should be reported rather than hidden.

### 2. Starter code, dataset licences, and additional data

Each project is released as an individual private GitLab repository constructed from the course's attributed adaptation of [Karpathy's nanoGPT](https://github.com/karpathy/nanoGPT). The original licence and attribution remain in the repository. The repository is the canonical location for the default model and starter configuration. Students clone their assigned repository and may change parameters, the tokenizer, data pipeline, sampler, model architecture, or training framework where the project permits it.

Before training, the supplied preflight command prints the learned-parameter count. The design target is 32M parameters, with a published 5% tolerance and an absolute maximum of 33.6M. Students must check this output before committing compute; a submitted checkpoint above 33.6M is not eligible for model marks.

Every submitted dataset must be lawful to access and suitable for the intended use. The report must identify:

- dataset or source name and stable URL;
- creator or publisher;
- licence or public-domain basis;
- exact version, revision, download date, and split where available;
- raw and processed size, including token count;
- filtering, normalisation, deduplication, and document-level splitting;
- any excluded material and the reason for exclusion; and
- the role the data was expected to play in the training plan.

Course-provided story and web-text data includes a data card, source record, licence statement, checksum, and reproducible preprocessing script. Project 1 includes a basic story corpus. Project 2 includes processed, verified public-domain editions of *Grimm's Fairy Tales* and *One Thousand and One Nights*. These are both usable starting points and examples of how to turn permitted electronic editions into model-ready text.

Students may locate and process additional data when it supports a clear hypothesis:

- **Hugging Face datasets** may be used when the dataset card states a licence compatible with the project. Presence on the Hub is not by itself evidence of permission.
- **Openly licensed or public-domain books** may be used with the edition, source, and public-domain or licence basis recorded.
- **Existing public web corpora** with documented provenance are preferred to a new crawl because they are easier to licence, reproduce, and audit.
- **Direct web crawling** is allowed only for public pages whose terms and access rules permit it. Students must honour `robots.txt`, use a reasonable request rate, avoid login-gated or paywalled pages, collect no personal or sensitive information, and obtain written course approval before a large crawl. A list of domains, collection dates, and crawler/preprocessing code must be submitted.
- **Synthetic or AI-filtered data** must name the generator or judge, version where known, prompt or filtering procedure, quantity, and validation method. It cannot be described as human-authored or human-labelled.

The teaching team may reject a source whose licence, privacy risk, or provenance cannot be established. Extra data receives no automatic credit; its value must be demonstrated against its processing and compute cost.

### 3. Evaluation-set contamination

Each project supplies five public development examples with ground truth and ten public tutor-evaluation prompts whose ground truth is withheld. All fifteen items are assessment material, separated from permitted corpora at document, story, or task-template level as appropriate. The five development examples support pipeline testing and report analysis; they are not permission to tune against the formal evaluation distribution.

Released prompts, development ground truth, withheld tutor ground truth, and clean reserve cases must not be used for training, validation, retrieval, tokenizer construction, filtering, prompt-template design, synthetic-data seeding, sampler tuning, checkpoint selection, or manual editing. Students must not reconstruct source continuations, search for withheld answers, or attempt to obtain private material from staff, peers, repository history, network requests, or the marking harness.

Before training, students must run the supplied exact- and near-duplicate separation validator on their proposed data and retain its report. If a student discovers likely overlap or encounters material they believe belongs to the withheld or reserve set, they must stop using it and email `llm-training@slopu.edu.au`. Prompt disclosure made promptly and in good faith will be handled as a contamination incident, not concealed misconduct. The teaching team may remove affected items or evaluate the checkpoint on a clean reserve set.

### 4. Individual work, collaboration, and AI assistance

All three projects are **individual assessments**. Students may discuss lecture concepts, public papers, general PyTorch usage, error messages, and debugging strategies. They may not exchange project code, processed datasets created for the assessment, configurations, checkpoints, experiment logs, generated evaluation sets, report text, or conclusions. Showing another student where a framework function is documented is acceptable; copying their implementation or experimental decision is not.

AI assistance is allowed for coding, debugging, explanations, documentation search, language editing, and planning support. The student remains responsible for understanding and validating everything submitted. AI output cannot substitute for the student's experimental judgement, interpretation of results, or truthful account of failures.

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

No application form is required by the course-site template. Students request an extension by emailing `llm-training@slopu.edu.au` **before the deadline**, naming the project, requested new deadline, brief reason, and supporting evidence where appropriate. Personal or confidential circumstances may instead be sent to `yiwei.easton@slopu.edu.au`. Approval must be received in writing; sending a request does not by itself change the deadline.

An approved extension carries no late penalty until its revised deadline. Without an approved extension, the submission loses **5% of the marks available for that project per commenced 24-hour period**. Work more than five days late is not accepted unless a formal accessibility or exceptional-circumstances arrangement applies. The timestamp recorded by the SlopU Submission Portal is authoritative.

### 9. Accessibility, materials, and support

- Lecture slides are available on the course site by the end of the day before the lecture and can be viewed online or downloaded.
- The week's lab notebook is published each Monday. Lab attendance is optional, although strongly recommended before changing the relevant project pipeline.
- Lab solutions are released after the final scheduled lab of that week so that every lab group has the same opportunity to attempt the activity first.
- Each project release produces a site announcement, and the site displays a reminder before its deadline.
- Materials use selectable text, meaningful heading order, alt text for informative images, labelled links, keyboard-accessible controls, and colour choices that do not carry meaning alone. Code and slide downloads provide an alternative to the live presentation view.
- Students with an approved accessibility adjustment receive materials, timing changes, or an alternative participation route according to that plan without needing to disclose personal details to the class.
- General questions go to the course forum or `llm-training@slopu.edu.au`; technical environment problems go to `compute@slopu.edu.au`; personal matters may go to `yiwei.easton@slopu.edu.au`.

### 10. Unsafe or inappropriate generated content

Story and web corpora can reproduce violence, prejudice, sexual material, personal information, or other harmful patterns. Students are not expected to make a 32M-parameter model universally safe, but they must not deliberately train or demonstrate it for targeted harassment, hateful or sexual content, instructions for wrongdoing, or disclosure of personal information.

Unexpected harmful output should be recorded as a model limitation and handled proportionately. Include only the minimum excerpt needed for analysis, add a content note where appropriate, and redact personal information. Do not publish an interactive checkpoint or gallery that exposes unrestricted unsafe generation. Students who reasonably prefer not to work with a supplied story or prompt may request an equivalent alternative without academic penalty.

### 11. Human evaluation and privacy

Human evaluation uses de-identified model and sample IDs. Evaluators see only the prompt, candidate outputs, task definition, and published anchors; they do not see the student's identity, architecture choice, grade, or private report. Three trained raters independently review each story-based tutor-evaluation output. Rating disagreements are handled by the adjudication rule in the Evaluation protocol rather than by revealing the student's identity.

Human ratings are used for marking and formative aggregate analysis. They are not reused as a research dataset or published with identifiable comments without separate informed consent. Raw identifiable records, if any are created by the authenticated portal, are restricted to the teaching team and removed after the grade-review period; reports retain only de-identified or aggregated results.

Prompts and evaluation examples must not contain real personal data. Students must not place HF tokens, API keys, GitLab credentials, private emails, participant names, or other secrets in the cloned repository, model package, generated samples, screenshots, or evaluation form. If a secret is committed or uploaded, revoke it immediately and contact the technical tutor; deleting a later commit is not sufficient protection by itself.

---

## Content coverage registry

### Ready for implementation

- Home-page hero, course journey, learning outcomes, assessment timeline, course operation summary, and calls to action;
- assessment-wide marking philosophy;
- report format and page limits;
- default-model, 32M target/33.6M boundary, and preflight-check wording;
- Project 1/2 dataset roles and additional-data rules;
- per-project T4-equivalent and training-FLOP budgets;
- Project 3 Track B arithmetic task and `test_pilot` contract;
- the alternative Track A proposal and approval process;
- starting-checkpoint fallback and verification rules;
- the shared five-example/ten-prompt evaluation protocol, PPL formula, three-rater human-review anchors, task-specific dimension weights, and technical gates;
- undergraduate/postgraduate marking distinction;
- Project 1 student-facing summary and detailed rubric;
- Project 2 student-facing summary and detailed rubric;
- Project 3 student-facing summary and detailed rubric;
- the six resource-card labels for each Project;
- all eleven Policies sections and the course-materials licence statement;
- People page biographies, responsibility boundaries, contact routing, and consultation times; and
- the navigation labels and cross-page call-to-action wording.

### Remaining content and publication details

- final dataset filenames, edition versions, URLs, and data-card copy;
- exact default model configurations published through the project repositories;
- final Project 3 Track B course-checkpoint identifier and `test_pilot` numeric ranges;
- final GitLab, Hugging Face, brief PDF, template, notebook, evaluation-pack, and submission-portal destinations;
- twelve lecture pages and twelve lab pages;
- the first complete lecture slide deck.

The repository, dataset, checkpoint, and submission destinations are operational publication details rather than open course-design decisions. Until a destination exists, the implemented site should display its release timing or unavailable state without inventing a URL or shipping a broken placeholder link.