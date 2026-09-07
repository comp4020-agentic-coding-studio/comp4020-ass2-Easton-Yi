# Website Content Source

> **Status:** Canonical student-facing copy in development. The assessment tasks, rubrics, starter-model policy, dataset roles, compute budgets, report limits, and checkpoint fallback rules in this version are ready for implementation. Course dates and final repository or dataset URLs must be inserted when available.

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
- Do not copy design commentary, unresolved alternatives, or `TBC` items from `assignment_brief.md` onto student pages.
- Essential task requirements and rubrics must remain readable on the webpage. A PDF brief is a downloadable mirror, not the sole source.
- If an implemented page conflicts with this file, fix the page or explicitly update this file and the associated course test in the same change.
- Facts owned by `course-config.ts`, especially dates and the course code, should be referenced rather than manually duplicated where the template permits.

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

## Content coverage registry

### Ready for implementation

- assessment-wide marking philosophy;
- report format and page limits;
- default-model, 32M target/33.6M boundary, and preflight-check wording;
- Project 1/2 dataset roles and additional-data rules;
- per-project T4-equivalent and training-FLOP budgets;
- Project 3 Track B arithmetic task and `test_pilot` contract;
- starting-checkpoint fallback and verification rules;
- the shared five-example/ten-prompt evaluation protocol, PPL formula, and technical gates;
- undergraduate/postgraduate marking distinction;
- Project 1 student-facing summary and detailed rubric;
- Project 2 student-facing summary and detailed rubric;
- Project 3 student-facing summary and detailed rubric; and
- the six resource-card labels for each Project.

### To be added after decisions are final

- final home-page layout and calls to action using the approved course identity;
- final dataset filenames, edition versions, URLs, and data-card copy;
- exact default model configurations published through the project repositories;
- final Project 3 Track B course-checkpoint identifier;
- twelve lecture pages and twelve lab pages;
- People page copy;
- Policies page copy transferred from the approved policy design;
- navigation labels and cross-page calls to action; and
- the first complete lecture slide deck.