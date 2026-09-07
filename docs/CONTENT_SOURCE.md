# Website Content Source

> **Status:** Canonical student-facing copy in development. The three assessment rubrics in this version are ready for implementation. Course dates, exact dataset names, reference checkpoints, and numerical compute budgets must be added only after those decisions are final.

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

### How this course is marked

The course contains three individual projects worth 20%, 50%, and 30%. Each project is marked from the engineering report and the submitted model. Model quality matters, but it is not judged through a class leaderboard or one metric alone.

High marks require a defensible plan, a working and reproducible system, controlled evidence, honest failure analysis, and a final checkpoint that demonstrates the stated behaviour. A technically ambitious method receives no automatic credit. A failed intervention can still support a strong report when the hypothesis, comparison, evidence, and conclusion are rigorous.

### Report format

Use the supplied two-column CVPR report template.

| Project | Main-paper limit | References | Appendix |
| --- | ---: | --- | --- |
| Project 1 | 3 pages | Not included in the limit | Allowed after references |
| Project 2 | 6 pages | Not included in the limit | Allowed after references |
| Project 3 | 4 pages | Not included in the limit | Allowed after references |

Important methods, results, and reasoning must appear in the main paper. The appendix may contain additional samples, configurations, logs, or supporting tables, but markers are not required to use appendix material to reconstruct the central argument. Content beyond the main-paper limit may be disregarded and serious attempts to evade the limit may lose communication marks.

Every report must include a short **AI Assistance Statement** naming the tools used, what they assisted with, any material code or text they influenced, and how the output was checked. AI use is permitted when declared; responsibility for the submitted work remains with the student.

### Model evaluation and technical gates

The teaching team evaluates the frozen Hugging Face revision submitted before the deadline. The submitted package must load using the supplied command and must reproduce the declared model configuration, tokenizer, sampler, and parameter count.

- A packaging error may be corrected only when the teaching team can verify that the weights and reported results have not changed.
- A checkpoint that cannot be evaluated after the permitted packaging correction receives zero for the submitted-model component; the report is still marked on the evidence it contains.
- A model above the 32M learned-parameter ceiling is not eligible for submitted-model marks.
- Hidden-test contamination, undeclared external weights, fabricated evidence, or deliberate compute-accounting circumvention is handled under academic-integrity procedures rather than as a normal performance deduction.
- Models are not ranked against classmates. Held-out metrics and blind human judgements are interpreted against the published task criteria.

### Undergraduate and postgraduate expectations

All students use the same task, infrastructure, and marking allocation. Undergraduate work can earn full marks through a valid system, appropriate controlled evidence, and careful analysis at the level taught in the course.

For postgraduate enrolment, the top range of analysis and reflection criteria additionally requires deeper examination of plausible mechanisms, alternative explanations, and links to relevant theory or frontier evidence. Naming more papers or running more experiments is not sufficient by itself.

---

## Assessment page: Project 1 - Build a Narrative Base Model

### Page summary

Train a decoder-only language model from scratch that can continue an incomplete story with recognisably narrative language. The goal is not to reproduce one hidden reference ending. The model should generate a plausible continuation that remains connected to the supplied prefix, is reasonably fluent, avoids obvious degeneration, and can stop at a sensible point.

### Key facts

| Item | Value |
| --- | --- |
| Weight | 20% |
| Marks available | 20 |
| Training stage | Pre-training from scratch |
| Work mode | Individual |
| Model ceiling | 32M learned parameters |
| Main report | 3 CVPR pages, excluding references and appendix |
| Due relationship | End of Week 4 |

### What you must demonstrate

Your submission should show that you can turn permitted story data into a working language-model training system, allocate limited model and compute capacity deliberately, compare at least one meaningful choice, and select a final checkpoint using evidence rather than intuition alone.

Hidden prompts are authentic prefixes truncated from complete held-out stories. They cover different prefix lengths and story styles within the announced narrative domain. Course test material must not influence training, tokenizer construction, model selection, or sampler tuning.

### Marking breakdown

| Component | Marks |
| --- | ---: |
| Engineering report | 14 |
| Submitted model | 6 |
| **Total** | **20** |

### Engineering report - 14 marks

#### 1. Pipeline correctness and reproducibility - 3 marks

High marks require a correct document-level split, a clearly described preprocessing and tokenization pipeline, a sound from-scratch training setup, and commands that reproduce training, evaluation, and sampling. Configuration, seeds, dependencies, special tokens, and checkpoint selection must be traceable.

Marks are reduced when important processing steps are missing, the described setup does not match the repository, leakage is possible, or the system cannot be followed from the evidence provided.

#### 2. Model-data-compute planning - 3 marks

High marks require an explicit pre-training target and a reasoned allocation of the 32M parameter and compute budgets. Discuss the relationship between model depth/width, context, vocabulary, data quantity and quality, training steps, and expected behaviour. Explain what was held constant and why the proposed experiments were affordable.

Marks are reduced for listing hyperparameters without explaining their relationship, relying on unrestricted trial and error, or presenting a plan that could not reasonably be completed within the budget.

#### 3. Experimental rigour - 3 marks

High marks require at least one controlled comparison tied to a stated hypothesis, appropriate baselines, consistent evaluation conditions, and useful training evidence such as learning curves, gradient or stability observations, runtime, and processed-token counts. Relevant unsuccessful trials should be included.

Marks are reduced when several variables change without analysis, comparisons use mismatched conditions, evidence is selectively reported, or conclusions extend beyond the experiment.

#### 4. Evaluation and failure analysis - 3 marks

High marks require held-out BPB or comparable loss, justified use of perplexity where tokenizers match, representative generated samples, decoding settings, and analysis of coherence, repetition, prefix consistency, and stopping failures. Explain why the final checkpoint and sampler were selected.

Marks are reduced when evaluation depends on one metric, uses only favourable examples, treats the hidden reference continuation as the only valid answer, or does not connect observed failures to training decisions.

#### 5. Communication and research practice - 2 marks

High marks require a concise and readable report that distinguishes measurements, interpretations, and hypotheses; cites datasets, code, and technical claims; labels edited or selected samples honestly; and includes the required AI Assistance Statement.

Marks are reduced for unclear structure, missing attribution, unsupported claims, failure to declare material AI assistance, or reliance on appendix material for the main argument.

### Submitted model - 6 marks

#### 6. Submission validity - 1 mark

The frozen package loads successfully, remains within 32M learned parameters, contains the required configuration and tokenizer/sampler assets, and reproduces the submitted generation path.

#### 7. Held-out language modelling and stability - 2 marks

High marks require credible held-out BPB/perplexity relative to the published baseline range, stable generation across the hidden prompt set, and no dominant collapse into empty, repetitive, or malformed output. Metrics are interpreted with the tokenizer and compute budget in view.

#### 8. Story continuation quality - 3 marks

Blind evaluation considers fluency, connection to the given characters/events/tone, local and short-range consistency, avoidance of excessive repetition, and whether the continuation reaches or approaches a reasonable stopping point. Multiple plausible continuations can receive full credit.

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
| Model ceiling | 32M learned parameters |
| Main report | 6 CVPR pages, excluding references and appendix |
| Due relationship | End of Week 8 |

### What you must demonstrate

Define the target style in operational terms, construct or curate suitable permitted data, compare the post-trained model with the unchanged starting checkpoint, and evaluate target adaptation alongside narrative quality and retention. The project rewards the engineering fit between the chosen method, data, budget, and evidence rather than the complexity or novelty of the post-training algorithm.

If you use instruction tuning, document the schema, special tokens, and loss masking. If you use preference optimisation, first establish an SFT or otherwise appropriate baseline and demonstrate why the extra pipeline and compute were justified. Work without genuine human preference labels must not be described as full RLHF.

### Marking breakdown

| Component | Marks |
| --- | ---: |
| Engineering report | 34 |
| Submitted model | 16 |
| **Total** | **50** |

### Engineering report - 34 marks

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

#### 6. Communication, limitations, and engineering reflection - 4 marks

High marks require a coherent report that makes the decision trail visible: initial expectation, evidence, revision, final choice, limitations, and what the project reveals about post-training under constraints. Sources and AI assistance must be declared appropriately.

For postgraduate top-range work, this section and the evaluation analysis should also examine plausible mechanisms and alternative explanations, distinguishing evidence from speculation.

### Submitted model - 16 marks

#### 7. Submission validity - 2 marks

The frozen checkpoint loads, remains within the 32M limit and compute policy, records the permitted starting checkpoint, and includes every tokenizer, architecture, and sampling dependency required for evaluation.

#### 8. Target behaviour attainment - 5 marks

Hidden evaluation measures whether readers can recognise the operationally defined target behaviour across varied human-written openings. Credit depends on consistent behaviour, not isolated showcase examples or direct copying from the source corpus.

#### 9. Narrative quality - 4 marks

Blind evaluation considers fluency, connection to the prompt, character/event consistency, progression, completeness, stopping, and avoidance of degeneration. Style does not compensate for a story that is incoherent or unusable.

#### 10. Retention, robustness, and memorisation control - 5 marks

High marks require acceptable performance on the retained narrative set, reasonable robustness to prompt length and wording, and no strong evidence that apparent style success is mainly memorised passages or source overlap. The best checkpoint balances the objectives rather than maximising one at any cost.

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
| Model ceiling | 32M learned parameters |
| Main report | 4 CVPR pages, excluding references and appendix |
| Due relationship | End of Week 12 |

### What you must demonstrate

Declare one measurable capability, justify the starting checkpoint, establish the unchanged-model baseline, train on a strictly separated dataset, perform at least one controlled comparison or ablation, test held-out generalisation, and measure at least one relevant pre-existing capability for regression.

One carefully investigated function is sufficient. Additional functions, a more complex algorithm, chain-of-thought output, or preference optimisation receive no automatic credit. If constrained decoding or post-processing is used, distinguish model-learned behaviour from externally enforced behaviour.

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

#### 7. Submission validity - 1 mark

The frozen package loads, satisfies the shared limits, uses an allowed starting checkpoint, and includes all files required for the selected track.

#### 8. Primary target capability - 5 marks

Track A is evaluated on the declared narrative function using objective constraint checks plus story-quality review. Track B is evaluated primarily on correct final answers and valid output format for the announced task family. Performance is assessed against the published baseline range, not against students in the other track.

#### 9. Held-out generalisation - 2 marks

The model should retain the target behaviour across unseen stories, vocabulary sets, conditions, numerical values, or question templates within the announced scope. Repeating familiar surface patterns without the required behaviour receives limited credit.

#### 10. Retention and reliability - 2 marks

The final checkpoint should avoid unacceptable regression in the monitored starting capability and should not depend on one fragile prompt wording, seed, or decoding setting. Failure cases are interpreted against the task's difficulty and the submitted engineering evidence.

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
- model-evaluation technical gates;
- undergraduate/postgraduate marking distinction;
- Project 1 student-facing summary and detailed rubric;
- Project 2 student-facing summary and detailed rubric;
- Project 3 student-facing summary and detailed rubric; and
- the six resource-card labels for each Project.

### To be added after decisions are final

- final course home-page copy and course-record facts;
- exact dates and deadlines;
- named datasets, versions, and data-card copy;
- default model configurations and numerical compute budgets;
- final Project 3 Track B task family and reference-model details;
- twelve lecture pages and twelve lab pages;
- People page copy;
- Policies page copy transferred from the approved policy design;
- navigation labels and cross-page calls to action; and
- the first complete lecture slide deck.