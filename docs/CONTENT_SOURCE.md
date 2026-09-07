# Website Content Source

> **Status:** Canonical student-facing copy in development. Course identity and dates, Home, assessment tasks and rubrics, evaluation rules, Policies, People, all twelve lecture pages, twelve weekly session entries (three formal labs, three drop-in clinics, and six lightweight guided sessions), weekly banner briefs, submission panels, and the first complete slide deck are approved and ready for implementation. Final repository, dataset, checkpoint, image, and submission URLs are inserted when the corresponding course resources are published.

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
- Read and implement the verification contract in `assignment_brief.md`; do not delete, skip, or weaken a shipped test to make the content fit.

## Home page

### Hero

**Course label:** `SLOP4225 · Semester 1, 2027`

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
- **Labs** run in Weeks 2, 6, and 10. Each turns a central mechanism into a bounded, carefully supported exercise: read it, run it, inspect it, change one thing, and transfer the result into the current project.
- **Drop-in clinics** run in Weeks 3, 7, and 11. Bring evidence from your own project: a configuration, curve, comparison, output pair, failed command, or proposed claim. Clinics help you diagnose and decide; they do not choose an assessed method for you.
- **Guided sessions** run in the remaining six teaching weeks. These short launch, validation, evaluation, and packaging activities connect the lecture, lab, and project without creating extra graded work.
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
| Schedule | Twelve-week schedule | One chronological view of lectures, twelve weekly sessions, project milestones, and the break |
| Lectures | Lecture index | Weekly teaching pages, readings, slides, and Frontier Notes |
| Labs | Practical-sessions index | Three formal labs, three drop-in clinics, and six lightweight guided sessions, with preparation, activities, expected outputs, and release information |
| Assessments | Assessment index | Project briefs, rubrics, resources, due dates, and submission panels |
| Policies | Policies page | Rules covering compute, data, evaluation, submission, support, and privacy |
| People | People page | Teaching roles, contact routing, and consultation times |

Use the same labels in desktop and mobile navigation. The current section may be indicated visually, but colour must not be the only cue.

## Assessment-wide student-facing copy

### Course identity and calendar

| Field | Approved value |
| --- | --- |
| Title | **Training Language Models: A Budgeted Engineering Task** |
| Code | `SLOP4225` |
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

### Submission panels

The course website shows when each submission opens and links to the authenticated **SlopU Submission Portal**. The website does not upload work or collect credentials. Only the portal can display a personal submission state.

| Project | Opens | Due | Report filename |
| --- | --- | --- | --- |
| Project 1 | Monday 1 March 2027, 00:00 AET | Sunday 21 March 2027, 23:59 AET | `ass1_report.pdf` |
| Project 2 | Monday 22 March 2027, 00:00 AET | Sunday 25 April 2027, 23:59 AET | `ass2_report.pdf` |
| Project 3 | Monday 26 April 2027, 00:00 AET | Sunday 23 May 2027, 23:59 AET | `ass3_report.pdf` |

Each panel uses the following states:

- **Before opening:** `Will be available at <opening date and time>.`
- **Open with no recorded attempt:** `To be submitted`
- **Successful submission:** `Submitted` together with the portal receipt time and frozen repository identifiers.

The static website renders the first state and the portal link according to the calendar. The authenticated portal renders `To be submitted` and `Submitted`; the public site must not guess or simulate a student's submission status.

#### Required portal fields

1. Upload the correctly named report PDF. The first page must include your full name and student ID.
2. Enter the final GitLab commit SHA.

The frozen GitLab revision is the submission pointer. Its `submission-manifest.json` records the assigned private Hugging Face repository ID, exact frozen model revision, checkpoint checksum, and `compute-ledger.json` path. The model package contains the checkpoint and every component required to load it. You do not re-enter the Hugging Face repository or upload model files through the portal.

> **Never paste an HF access token into the course site, portal, report, repository, or model package.** Use your own credential locally to upload. Marker access is granted through the SlopU Hugging Face organisation.

**Primary action after opening:** Open SlopU Submission Portal  
**Supporting action:** Review the submission checklist

### Resource-card release states

Every assessment displays exactly six primary resource entries as compact list-style cards: two columns on wide screens and one column on narrow screens. Group them as **Start here**, **Data and model**, **Evaluate**, and **Submit**. Each entry contains one title, one short description, a type/state label, and one clearly named action; do not display a raw URL.

A resource entry has one clear state:

- **Available:** show `Open resource` or `Download`.
- **Scheduled:** show `Will be available at <date and time>` without a dead link.
- **Access controlled:** show `Sign in to open` and identify GitLab or Hugging Face.
- **Unavailable:** state which course resource is still being provisioned; do not show an invented or `#` URL.

The webpage contains the full task and rubric. A downloadable brief is a printable mirror generated from the same approved content after implementation, not a separate authority. Large datasets and checkpoints stay in private GitLab or Hugging Face repositories.

| Project resource release | Scheduled time |
| --- | --- |
| Project 1 six-card resource set | Monday 22 February 2027, 09:00 AET |
| Project 2 six-card resource set | Monday 22 March 2027, 09:00 AET |
| Project 3 six-card resource set | Monday 26 April 2027, 09:00 AET |

Before the scheduled time, each card uses its `Scheduled` message. After release, local files use `Download`, private GitLab/Hugging Face resources use `Sign in to open`, and any genuinely unprovisioned item remains `Unavailable` with an explanation. Submission-panel opening times are separate and appear in the table above.

Use the resource title as the accessible link name and keep the action text specific: `Download brief`, `Open GitLab repository`, `Open dataset`, `Download notebook`, `Download starter pack`, `Download evaluation pack`, or `Download template`. The entire visual card may be clickable only when it produces one keyboard-focusable link with a visible focus state; do not nest a second link or button inside it.

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

| Group | Resource | Short description | Action after release |
| --- | --- | --- | --- |
| Start here | **Full Project Brief** | Printable copy of the complete task, constraints, evaluation rules, and rubric. | Download brief |
| Start here | **Project 1 Starter Repository** | Assigned code, default configuration, parameter preflight, budget ledger, and submission manifest. | Open GitLab repository |
| Data and model | **Narrative Dataset and Data Card** | Versioned story corpus with provenance, licence, document-level splits, checksums, and preprocessing notes. | Open dataset |
| Data and model | **Pre-training Colab** | Supported route from environment validation to tokenisation, training, checkpointing, evaluation, and sampling. | Download notebook |
| Evaluate | **Public Evaluation Pack** | Five development examples, ten tutor prompts, separation validator, and public evaluation utilities. | Download evaluation pack |
| Submit | **CVPR Report Template** | Shared two-column LaTeX template with the required engineering-report and AI Assistance Statement sections. | Download template |

### Project 1 submission panel

**Status before opening:** Will be available at Monday 1 March 2027, 00:00 AET.  
**Status after opening, before submission:** To be submitted  
**Status after receipt:** Submitted  
**Due:** Sunday 21 March 2027, 23:59 AET

Upload `ass1_report.pdf` and enter the final GitLab commit SHA. Your name and student ID must appear on the report's first page. The frozen commit's `submission-manifest.json` identifies the exact private Hugging Face model revision used for marking. Do not paste an HF token.

**Action:** Open SlopU Submission Portal

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

| Group | Resource | Short description | Action after release |
| --- | --- | --- | --- |
| Start here | **Full Project Brief** | Printable copy of the complete task, constraints, evaluation rules, and rubric. | Download brief |
| Start here | **Project 2 Starter Repository** | Assigned post-training code, starting-checkpoint loader, budget ledger, schemas, and submission manifest. | Open GitLab repository |
| Data and model | **Target-Style Corpus and Data Card** | Versioned public-domain Grimm and *One Thousand and One Nights* data with provenance, splits, and checksums. | Open dataset |
| Data and model | **Post-training Starter Pack** | Supported Colab and compact recipes for continued pre-training, SFT, masking inspection, and a toy preference exercise. | Download starter pack |
| Evaluate | **Behaviour Evaluation Pack** | Five development examples, ten tutor prompts, separation validator, blind-review anchors, and retention checks. | Download evaluation pack |
| Submit | **CVPR Report Template** | Shared two-column LaTeX template with the required engineering-report and AI Assistance Statement sections. | Download template |

### Project 2 submission panel

**Status before opening:** Will be available at Monday 22 March 2027, 00:00 AET.  
**Status after opening, before submission:** To be submitted  
**Status after receipt:** Submitted  
**Due:** Sunday 25 April 2027, 23:59 AET

Upload `ass2_report.pdf` and enter the final GitLab commit SHA. Your name and student ID must appear on the report's first page. The frozen commit's `submission-manifest.json` identifies the exact private Hugging Face model revision used for marking. Do not paste an HF token.

**Action:** Open SlopU Submission Portal

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

| Group | Resource | Short description | Action after release |
| --- | --- | --- | --- |
| Start here | **Full Project Brief** | Printable copy of the common task, both tracks, constraints, evaluation rules, and rubric. | Download brief |
| Start here | **Project 3 Starter Repository** | Assigned fine-tuning code, proposal template, task schemas, `test_pilot`, budget ledger, and submission manifest. | Open GitLab repository |
| Data and model | **Starting Model and Task Data** | Track-specific fallback checkpoint and data cards; Track B includes the general-language checkpoint and arithmetic data. | Open assigned resources |
| Data and model | **Fine-tuning Starter Pack** | Supported SFT Colab, response-only masking checks, example task records, and baseline commands. | Download starter pack |
| Evaluate | **Track Evaluation Pack** | Five development examples, ten tutor inputs, separation validator, task verifier, and regression utilities. | Download evaluation pack |
| Submit | **CVPR Report Template** | Shared two-column LaTeX template with the required engineering-report and AI Assistance Statement sections. | Download template |

### Project 3 submission panel

**Status before opening:** Will be available at Monday 26 April 2027, 00:00 AET.  
**Status after opening, before submission:** To be submitted  
**Status after receipt:** Submitted  
**Due:** Sunday 23 May 2027, 23:59 AET

Upload `ass3_report.pdf` and enter the final GitLab commit SHA. Your name and student ID must appear on the report's first page. The frozen commit's `submission-manifest.json` identifies the exact private Hugging Face model revision used for marking. Do not paste an HF token.

**Action:** Open SlopU Submission Portal

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
- **Consultation:** Thursdays, 16:00–17:00 AET, Compute Commons 2.14. Maya also leads the scheduled online project clinics on Monday, 15:00–16:00 AET, during Weeks 3, 7, and 11.

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

Students include the automatically generated `compute-ledger.json` in the frozen GitLab and Hugging Face packages and summarise it in the report. Deliberately disabling or altering accounting is an academic-integrity breach. A calculation error made in good faith should be reported rather than hidden.

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

Project 1 opens Monday 1 March 2027 at 00:00 AET; Project 2 opens Monday 22 March 2027 at 00:00 AET; and Project 3 opens Monday 26 April 2027 at 00:00 AET. Before opening, the page states when the panel will become available. Once open, the authenticated portal displays **To be submitted** until a successful receipt exists, then **Submitted** with the receipt time and frozen identifiers.

Before the deadline, students must:

1. push the final code, configuration, preprocessing scripts, and evaluation commands to the default branch of their assigned private GitLab repository;
2. record the final Git commit SHA;
3. upload the model package to the private Hugging Face model repository provisioned for that student and project inside the SlopU organisation;
4. verify that the course marking service account can read the exact submitted Hugging Face revision; and
5. upload `ass1_report.pdf`, `ass2_report.pdf`, or `ass3_report.pdf` as appropriate and enter the final GitLab commit SHA through the project submission panel.

The report's first page must include the student's full name and student ID. The frozen GitLab revision's `submission-manifest.json` records the assigned Hugging Face repository ID, exact model revision, checkpoint checksum, and compute-ledger path. `compute-ledger.json` remains inside the frozen GitLab revision and Hugging Face package rather than being uploaded as a second portal attachment.

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
- Formal lab notebooks are published on Monday in Weeks 2, 6, and 10. Lab attendance is optional, although strongly recommended before changing the relevant project pipeline.
- Formal lab solutions are released after the final scheduled lab of that week so that every lab group has the same opportunity to attempt the activity first.
- Drop-in clinics run in Weeks 3, 7, and 11. They use students' own de-identified evidence and therefore have no model solution; a short clinic-notes page summarising common issues is released after the final clinic without identifying students or publishing assessed work.
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

## Teaching schedule and weekly lecture pages

The course is taught as three four-week engineering cycles. Every teaching week has one session entry, but the format follows the work students need at that point: six lightweight guided sessions, three deep practical labs, and three evidence-led drop-in clinics. Each cycle begins with a launch or scoping session, gives students one deep lab in its second week, provides a project clinic in its third week, and ends with a short evaluation and submission audit.

| Stage | Weeks | Central question | Formal support | Assessment milestone |
| --- | --- | --- | --- | --- |
| Build language ability | 1–4 | How should a small decoder-only model divide capacity, data, and compute to learn narrative continuation? | Guided launch/audit in Weeks 1 and 4; Lab 1 in Week 2; clinic in Week 3 | Project 1 due end of Week 4 |
| Shape model behaviour | 5–8 | Which post-training signal changes the target behaviour, and what existing ability does it risk damaging? | Guided launch/audit in Weeks 5 and 8; Lab 2 in Week 6; clinic in Week 7 | Project 2 due end of Week 8 |
| Build a specialist | 9–12 | How can a permitted checkpoint acquire one verifiable capability and generalise beyond its training templates? | Guided launch/audit in Weeks 9 and 12; Lab 3 in Week 10; clinic in Week 11 | Project 3 due end of Week 12 |

There is no formal lab in submission weeks. Their guided sessions are short checklists for evaluation, packaging, and fresh-load verification rather than new disconnected exercises.

### Schedule-page table

| Week | Week beginning | Lecture | Practical/support session | Milestone |
| ---: | --- | --- | --- | --- |
| 1 | 22 February | What a Language Model Learns | **Guided:** Project 1 Launch and Data Validation | Project 1 released; validate data and define the target |
| 2 | 1 March | Inside a Decoder-Only Transformer | **Lab 1:** Spend a 32M Parameter Budget | Freeze a feasible baseline architecture |
| 3 | 8 March | Scale, Data, and Optimisation Under Fixed Compute | **Drop-in:** Project 1 Pilot Clinic | Freeze the principal run plan |
| 4 | 15 March | Evaluate, Decode, and Package a Base Model | **Guided:** Project 1 Evaluation and Packaging | **Project 1 due 21 March, 23:59 AET** |
| 5 | 22 March | From a Base Model to a Target Behaviour | **Guided:** Project 2 Target and Baseline Planning | Project 2 opens; define the target voice and baseline |
| 6 | 29 March | Supervised Fine-Tuning and Data That Teaches Behaviour | **Lab 2:** Build and Inspect a Post-Training Batch | Produce a masking check and viable pilot |
| — | 5 April | **Mid-semester break, 5–11 April** | No teaching | Preserve logs and checkpoints outside the runtime |
| 7 | 12 April | Learning from Preferences Without Hiding the Cost | **Drop-in:** Project 2 Behaviour Clinic | Freeze the evaluation comparison |
| 8 | 19 April | Did the Behaviour Change, and What Regressed? | **Guided:** Project 2 Blind Evaluation and Packaging | **Project 2 due 25 April, 23:59 AET** |
| 9 | 26 April | Reasoning as Generated and Verifiable Behaviour | **Guided:** Project 3 Task Contract and Baseline | Project 3 opens; proposal due 2 May for alternative Track A tasks |
| 10 | 3 May | Train a Specialist That Can Be Tested | **Lab 3:** Train and Verify a Specialist | Produce one loadable pilot and valid metric |
| 11 | 10 May | Generalisation, Supervision, and One Honest Ablation | **Drop-in:** Project 3 Generalisation Clinic | Freeze the candidate checkpoint and bounded claim |
| 12 | 17 May | Audit the Training System | **Guided:** Project 3 Fresh-Load Audit and Submission | **Project 3 due 23 May, 23:59 AET** |

### Weekly banner briefs

Place one wide landscape banner below the week/title metadata and above the lecture summary. Keep a consistent approximately 3:1 desktop crop and a responsive crop that preserves the main subject on mobile. The image is a visual entry point to the week's most important idea, not generic “AI” decoration.

| Week | Banner search brief | Alt/caption intent |
| ---: | --- | --- |
| 1 | next-token probability over a token sequence | Show that a prefix conditions a distribution over possible next tokens. |
| 2 | causal self-attention or decoder-only Transformer flow | Identify the causal direction and the part of the model students inspect in Lab 1. |
| 3 | scaling curves or iso-compute model/data allocation | Emphasise allocation under fixed compute rather than “bigger is always better.” |
| 4 | decoding branches, checkpoint evaluation, or automatic-plus-human review | Connect a frozen model to multiple forms of evidence. |
| 5 | base model becoming a target-behaviour model | Make the pre-training/post-training transition visible. |
| 6 | instruction/response tokens with response-only loss masking | Distinguish context tokens from supervised response targets. |
| 7 | pairwise preferences, DPO, or policy/reward/reference relationships | Show the comparison signal without implying that all preference learning is RLHF. |
| 8 | target behaviour and retention as a multi-objective trade-off | Visualise improvement and regression being assessed together. |
| 9 | chain-of-thought candidates, self-consistency, and final-answer verification | Show several generated paths feeding a verifiable answer. |
| 10 | task-specific fine-tuning examples flowing through a verifier | Connect task contract, training records, output parser, and metric. |
| 11 | template shift, generalisation slices, ablation, or regression testing | Show that one aggregate score can hide different failure regions. |
| 12 | reproducibility chain from data/code revisions to a loadable checkpoint | Present the submission as an auditable system of linked artefacts. |

For each chosen asset, store a local optimised copy and record original URL, title/creator, licence or reuse basis, access date, crop/edit, alt text, and visible credit. Prefer original paper/author figures or openly licensed technical illustrations. Use meaningful alt text and a visible caption when the image conveys knowledge; only a genuinely decorative photograph receives empty alt text. Do not hotlink or ship the starter's default artwork.

### Week 1 — What a Language Model Learns

**Week beginning:** Monday 22 February 2027  
**Stage:** Build language ability · Project 1 begins

#### Summary

A language model assigns probabilities to possible continuations. Training turns a text corpus into many next-token prediction problems and adjusts the model to increase the probability of the observed next token. This lecture connects the probability view to the exact tensors students will use in Project 1: token sequences, shifted targets, cross-entropy loss, train/validation/test separation, and perplexity. Historical n-gram models provide useful intuition about context and sparsity, but the practical focus is the neural autoregressive objective. The final question is engineering rather than definitional: what evidence would show that a training run learned a reusable narrative distribution instead of memorising its data or merely reducing one number?

#### Learning outcomes

After this lecture, you should be able to:

1. express the probability of a token sequence as a product of conditional next-token probabilities;
2. construct input and shifted-target sequences for causal language-model training;
3. explain maximum likelihood, cross-entropy, negative log-likelihood, and perplexity as connected views of one objective;
4. distinguish the roles of training, validation, development, and tutor-evaluation data; and
5. state at least two reasons why lower validation loss is insufficient evidence of better story generation.

#### 1. From plausible text to conditional probability

We begin by ranking grammatical, semantically plausible, and stylistically consistent sentences. The exercise reveals that a language model is not a database of complete sentences: it estimates a distribution over the next token given the preceding context. The chain rule converts those local predictions into a probability for a complete sequence. Sampling repeatedly from the changing next-token distribution produces text.

#### 2. What n-grams teach us—and where they fail

Unigram, bigram, and trigram examples make the context trade-off visible. A short context is easy to count but cannot preserve much structure; a long context is informative but most combinations are unseen. Neural language models replace explicit count tables with a differentiable function that shares statistical strength across contexts. N-grams are used here as conceptual scaffolding, not as an assessed implementation.

#### 3. Turning a corpus into a training objective

For a token sequence \(x_1,\ldots,x_T\), the model observes a prefix and predicts the next token. Teacher forcing creates many supervised targets from one document. We derive mean negative log-likelihood and show how the same calculation becomes token-level cross-entropy in code. The loss is differentiable with respect to model parameters, so an optimiser can update those parameters by gradient descent.

#### 4. Splits, perplexity, and evidence

Perplexity is the exponential of average negative log-likelihood. It is useful for comparing checkpoints evaluated with a common token accounting method, but it does not directly measure coherence, originality, reasoning, or instruction following. Story- or source-level splits must be created before token windows so that near-identical windows from one story cannot appear on both sides of evaluation. Project 1 therefore combines continuation-only reference-token-normalised PPL with blind human review and qualitative failure analysis.

#### Required reading

- Ronen Eldan and Yuanzhi Li, [*TinyStories: How Small Can Language Models Be and Still Speak Coherent English?*](https://arxiv.org/abs/2305.07759), Sections 1–2.
- Course note, **Project 1 Evaluation Protocol**, on the assessment page.

#### Optional reading

- Alec Radford et al., [*Improving Language Understanding by Generative Pre-Training*](https://cdn.openai.com/research-covers/language-unsupervised/language_understanding_paper.pdf), introduction and Figure 1.

#### Slides and this week's action

**Slides:** `week-01-language-model-objective.deck.mdx` — to be implemented from this page.  
**Before Week 2:** run the repository data summary, confirm the document-level split, and write a two-sentence Project 1 target: what the model should continue well and which evidence will test that claim.

### Week 2 — Inside a Decoder-Only Transformer

**Week beginning:** Monday 1 March 2027  
**Stage:** Build language ability · Formal Lab 1

#### Summary

Project 1 is small enough that every architectural choice is visible in the budget. This lecture traces one token through a decoder-only Transformer and connects the computation to learned-parameter count, memory, context length, and generation cost. Encoder and encoder–decoder systems are introduced to clarify why the course uses a causal decoder, not because other architectures are obsolete. Students then examine causal masking, multi-head self-attention, feed-forward blocks, residual paths, pre-normalisation, embeddings, and the output head. The aim is to make architecture a testable allocation of capacity: depth, width, heads, context, and vocabulary must fit together rather than being selected as independent fashionable settings.

#### Learning outcomes

After this lecture, you should be able to:

1. distinguish encoder, encoder–decoder, and causal decoder-only attention patterns;
2. trace tensor shapes through embeddings, attention, the MLP, residual connections, normalisation, and the output head;
3. explain how a causal mask prevents future-token leakage;
4. identify which configuration choices dominate parameter count and activation memory; and
5. propose two legal architectures whose differences support a controlled Project 1 comparison.

#### 1. Three Transformer families

Bidirectional encoders build representations using both left and right context. Encoder–decoder models combine source-side representation with autoregressive target generation. A decoder-only language model uses causal self-attention and expresses both prompts and outputs as one continuation. The course uses this form because its training objective matches Project 1 generation and because the starter is intentionally compact.

#### 2. One decoder block

Token and position representations enter a repeated block. Normalisation stabilises the input to attention and the feed-forward network; residual connections preserve an information and gradient path around each transformation. Attention mixes information across allowed earlier positions, while the position-wise MLP performs most of the block's feature transformation and often contains most of its learned parameters.

#### 3. Causal attention and heads

Queries select information from keys and combine values. The triangular causal mask makes every prediction depend only on tokens already available at that position. Multiple heads can represent different relations, but increasing head count does not create capacity for free: head dimension, model width, and implementation constraints must remain coherent. We distinguish learned parameters from sequence-dependent activations.

#### 4. Architecture as a 32M allocation

Students use the repository preflight rather than estimating compliance by file size. Vocabulary and embedding choices, model width, layer count, and FFN width all affect the learned-parameter total; context length mainly changes activation and attention cost. KV caching is introduced as an inference optimisation: cached past keys and values avoid recomputing unchanged states during autoregressive generation, but it does not change how Project 1 is trained.

#### Required reading

- Ashish Vaswani et al., [*Attention Is All You Need*](https://arxiv.org/abs/1706.03762), Sections 3.1–3.2.
- Thomas Wang et al., [*What Language Model Architecture and Pretraining Objective Work Best for Zero-Shot Generalization?*](https://arxiv.org/abs/2204.05832), abstract and Section 2.

#### Optional reading

- Andrej Karpathy, [nanoGPT](https://github.com/karpathy/nanoGPT), `model.py`; focus on the mapping between configuration fields and modules.

#### Slides and this week's action

**Slides:** `week-02-decoder-transformer.deck.mdx` — to be implemented from this page.  
**Practical:** Lab 1 — Spend a 32M Parameter Budget.  
**Before Week 3:** keep one feasible baseline architecture and one justified alternative; record the preflight output for both.

### Week 3 — Scale, Data, and Optimisation Under Fixed Compute

**Week beginning:** Monday 8 March 2027  
**Stage:** Build language ability · Project 1 drop-in clinic

#### Summary

Scaling research asks how loss changes with model parameters \(N\), training tokens \(D\), and compute \(C\). Project 1 asks a smaller but structurally similar question: with a fixed parameter boundary and compute allowance, which model, data mixture, and training schedule deserve the budget? This lecture develops power-law intuition, contrasts the conclusions of Kaplan-style and Chinchilla-style studies, and treats both as empirical evidence rather than universal recipes. It then moves from papers to controllable decisions: data quality and duplication, token budget, batch and gradient accumulation, learning rate, warm-up, decay, clipping, regularisation, checkpoint intervals, and stop rules. Short pilots are framed as measurements used to select a plan, not miniature leaderboard searches.

#### Learning outcomes

After this lecture, you should be able to:

1. distinguish model scale, data scale, and training compute and explain why improving only one produces diminishing returns;
2. interpret a power-law relationship and identify the small-data, useful-scaling, and irreducible-error regions;
3. compare Kaplan- and Chinchilla-style compute allocation without treating either fitted law as a guaranteed 32M recipe;
4. translate a T4-equivalent/FLOP budget into a token, step, and pilot plan; and
5. use loss curves, gradient signals, runtime, and sample evidence to decide whether to continue, revise, or stop a run.

#### 1. The three quantities: \(N\), \(D\), and \(C\)

Model parameters bound representational capacity, data tokens provide learning opportunities, and compute measures the work used to connect them. Increasing a model without enough data undertrains capacity; repeatedly cycling a small or duplicated corpus may spend compute without adding information. A one-GPU thought experiment makes the allocation problem concrete before any equations are introduced.

#### 2. What scaling laws do and do not say

In a power-law region, test loss often decreases predictably but with diminishing returns as scale increases. Kaplan et al. reported smooth relationships across model size, data, and compute and argued that large models can be sample efficient and need not train to convergence. Hoffmann et al. revisited compute-optimal allocation and found that model size and tokens should grow more evenly. These results were fitted at much larger scales than this course; students use their logic to form hypotheses, then validate locally.

#### 3. Data quantity is not data value

Source diversity, document quality, formatting noise, duplication, and domain match change what one token contributes. TinyStories and the Phi work illustrate that carefully structured data can make small models surprisingly capable, but synthetic or aggressively filtered text also imports generator bias, narrower diversity, and provenance obligations. Project 1 decisions must report both token counts and source-level evidence.

#### 4. From compute ceiling to training schedule

We connect tokens per step, effective batch size, gradient accumulation, sequence length, steps, and approximate FLOPs. Warm-up protects early optimisation; learning-rate decay changes how aggressively later updates move the model; clipping helps contain unstable gradients; weight decay and dropout trade fit for regularisation. The correct values are not memorised constants. A pilot should isolate one uncertainty, run long enough to expose a trend, and stop according to a rule chosen before the result is known.

#### 5. Reading a pilot honestly

Training loss alone cannot select a plan. Students compare training and validation curves, gradient norms, throughput, memory, sample quality, and run-to-run comparability. An unstable run, a widening validation gap, or a runtime estimate that exceeds the budget is useful evidence if it changes the plan and is recorded. Failed optimisation is not transformed into success by hiding it.

#### Required reading

- Jared Kaplan et al., [*Scaling Laws for Neural Language Models*](https://arxiv.org/abs/2001.08361), abstract and Sections 1–2.
- Jordan Hoffmann et al., [*Training Compute-Optimal Large Language Models*](https://arxiv.org/abs/2203.15556), abstract and Sections 1–3.

#### Optional reading

- Suriya Gunasekar et al., [*Textbooks Are All You Need*](https://arxiv.org/abs/2306.11644), Sections 1–2.
- Ronen Eldan and Yuanzhi Li, [*TinyStories*](https://arxiv.org/abs/2305.07759), Sections 3–4.

#### Slides and this week's action

**Slides:** `week-03-fixed-compute.deck.mdx` — complete deck specification appears below.  
**Support:** Project 1 drop-in clinic.  
**Before Week 4:** freeze the principal run plan with a hypothesis, control, maximum spend, stop rule, and intended checkpoint-selection evidence.

### Week 4 — Evaluate, Decode, and Package a Base Model

**Week beginning:** Monday 15 March 2027  
**Stage:** Build language ability · Project 1 due

#### Summary

The final checkpoint is not automatically the best checkpoint, and the lowest loss does not automatically produce the best stories. This lecture treats evaluation, decoding, and packaging as parts of the training system. Students learn how document-level hold-out and contamination checks protect inference, how continuation-only PPL is calculated under the course protocol, and why tokenizer-normalised comparison is required. Temperature, top-k, top-p, repetition, EOS behaviour, and context length are examined as controlled inference choices rather than post-hoc ways to cherry-pick an attractive sample. The lecture ends with a fresh-environment loading test and a claim–evidence checklist for the report.

#### Learning outcomes

After this lecture, you should be able to:

1. select a checkpoint using pre-declared quantitative and qualitative evidence;
2. compute and interpret continuation-only PPL without leaking prompt or evaluation data into training;
3. explain how temperature, top-k, and top-p reshape a next-token distribution;
4. diagnose repetition, incoherence, premature stopping, and failure to emit EOS; and
5. package a checkpoint, tokenizer, configuration, and loading command so another person can reproduce the result.

#### 1. Evaluation separation and contamination

We revisit source-level splits and distinguish the five diagnostic examples from the ten official tutor prompts. Public prompts are not permission to train on them. Exact and near-duplicate checks must run before training, and any discovered overlap is removed or reported according to policy.

#### 2. Checkpoints and comparable metrics

Students compare validation evidence across checkpoints generated by the same declared pipeline. Continuation-only reference-token-normalised PPL supports the course threshold even when a student changes tokenizer; bits per byte is introduced as a useful additional diagnostic. Neither metric resolves open-ended narrative quality, so output review remains necessary.

#### 3. Decoding is an experimental variable

Greedy decoding, temperature, top-k, and nucleus sampling make different probability/variety trade-offs. A fair comparison holds prompts, seeds or seed policy, maximum length, and sampler settings constant. Students inspect how low diversity produces repetition and how excessive randomness breaks local coherence. EOS training and stopping rules are treated separately from arbitrary truncation.

#### 4. Reproducible submission

A valid model package includes the frozen weights, architecture/configuration, tokenizer assets, sampler assumptions, revision, checksum, and exact load/evaluate commands. The fresh-process test is compulsory engineering hygiene: success in an in-memory notebook is not evidence that the submitted artifact can be marked.

#### Required reading

- Course page, **Evaluation protocol and formula**.
- Holtzman et al., [*The Curious Case of Neural Text Degeneration*](https://arxiv.org/abs/1904.09751), abstract and Sections 1–3.

#### Optional reading

- Hugging Face, [*Generation strategies*](https://huggingface.co/docs/transformers/generation_strategies), for terminology and reproducible generation configuration.

#### Slides and this week's action

**Slides:** `week-04-evaluate-decode-package.deck.mdx` — to be implemented from this page.  
**Deadline:** Project 1, Sunday 21 March 2027 at 23:59 AET. Run the final loading command in a fresh process before submission.

### Week 5 — From a Base Model to a Target Behaviour

**Week beginning:** Monday 22 March 2027  
**Stage:** Shape model behaviour · Project 2 begins

#### Summary

Pre-training teaches a model to continue text from its data distribution; it does not guarantee a stable voice, an instruction-following interface, or a behaviour a user can request reliably. This lecture defines post-training by its supervision signal rather than by a single algorithm. Continued pre-training changes the text distribution the model imitates. Supervised fine-tuning trains desired prompt–response or structured continuations. Preference learning compares candidate outputs when quality is difficult to express as one reference. Students map these choices to Project 2 and learn that the simplest method capable of testing the target is often stronger engineering than an expensive pipeline whose additional stages cannot be validated.

#### Learning outcomes

After this lecture, you should be able to:

1. distinguish language capability from elicited and user-facing behaviour;
2. compare continued pre-training, SFT, and preference-based post-training by data, objective, cost, and evidence;
3. define a narrative voice using observable output criteria rather than an impressionistic label;
4. identify a baseline and retained capability needed to measure behavioural change; and
5. choose a proportionate post-training route for a 32M checkpoint.

#### 1. Why the pre-training objective is not a user specification

A base model was asked to predict internet or story tokens, and it does exactly that. It may produce fluent text while responding unstably to an instruction or drifting between styles. Post-training supplies additional evidence about which continuations are useful in a particular interaction or domain.

#### 2. Three routes through Project 2

Continued pre-training is appropriate when the target is naturally represented as unlabelled target-domain prose. SFT is appropriate when the desired behaviour can be demonstrated as examples with a declared input/output schema. Preference optimisation may help when relative quality is easier to label than a single ideal output, but it requires trustworthy pairs, a reference policy, and additional validation.

#### 3. Turn “voice” into a measurement plan

Students decompose a target voice into dimensions such as diction, sentence rhythm, dialogue balance, narrative perspective, thematic motifs, and coherence. A target-style hold-out measures domain fit; blind human comparisons assess whether the behaviour is recognisable; a general narrative set checks retention. No one metric stands in for all three.

#### 4. Baselines and method claims

Every intervention is compared with the unchanged starting checkpoint under the same prompts and sampler. If two post-training routes are compared, their data and compute must be reported. Students may combine methods, but each added stage must answer a stated uncertainty rather than merely make the pipeline look more advanced.

#### Required reading

- Jason Wei et al., [*Finetuned Language Models Are Zero-Shot Learners*](https://arxiv.org/abs/2109.01652), abstract and Sections 1–2.
- Long Ouyang et al., [*Training Language Models to Follow Instructions with Human Feedback*](https://arxiv.org/abs/2203.02155), abstract and Figure 2.

#### Optional reading

- Rohan Taori et al., [*Stanford Alpaca*](https://github.com/tatsu-lab/stanford_alpaca), project overview and data-generation description.

#### Slides and this week's action

**Slides:** `week-05-post-training-map.deck.mdx` — to be implemented from this page.  
**Before Week 6:** write an operational target-voice statement, choose the unchanged checkpoint baseline, and identify the minimum data needed for one viable route.

### Week 6 — Supervised Fine-Tuning and Data That Teaches Behaviour

**Week beginning:** Monday 29 March 2027  
**Stage:** Shape model behaviour · Formal Lab 2

#### Summary

Supervised fine-tuning uses the familiar next-token loss on deliberately formatted demonstrations, but its data meaning is different from pre-training. This lecture follows an instruction–response example from raw record to tokens, attention context, response-only target mask, loss, and updated behaviour. It then examines data diversity, special tokens, synthetic demonstrations, learning-rate choice, mixing with pre-training text, and catastrophic overwriting. Students learn why a model can appear successful on the exact training wording yet fail on a paraphrase, and why data provenance and a visible loss mask are part of the scientific result rather than implementation trivia.

#### Learning outcomes

After this lecture, you should be able to:

1. design and document a consistent instruction or structured-continuation schema;
2. distinguish attention masking from loss masking and verify which tokens receive SFT loss;
3. explain how task diversity, example quality, and prompt phrasing affect transfer;
4. identify risks introduced by synthetic demonstrations and over-training; and
5. design a small SFT pilot with a lower learning rate, retained-capability check, and unchanged-checkpoint baseline.

#### 1. The SFT objective

The model conditions on the prompt and preceding response tokens, then predicts the next response token. In response-only SFT, prompt tokens provide context but do not contribute target loss. We distinguish this loss mask from the causal attention mask. A rendered token table is used to catch off-by-one targets, missing separators, and accidental prompt learning.

#### 2. Schemas and special tokens

An instruction, optional input, and output must be serialised consistently at training and inference. Chat-role tokens are one possible schema, not a universal requirement. At small scale, every extra format consumes examples and context, so students should choose only the structure their target behaviour needs and test EOS explicitly.

#### 3. What makes useful demonstration data

More examples of one narrow template may yield less transfer than a smaller set with meaningful task and phrasing diversity. Generated demonstrations can expand coverage cheaply, but students must disclose the generator, prompts, filtering, quantity, and validation. Synthetic confidence is not ground truth, and a teacher model's style can dominate the intended voice.

#### 4. Learning without erasing

Post-training usually needs a smaller learning rate than training from random initialisation. Excessive epochs, homogeneous data, or an aggressive rate can overwrite narrative ability. Mixing a controlled amount of original-domain text, selecting an earlier checkpoint, or reducing update strength can preserve capability, but each choice must be measured rather than assumed.

#### Required reading

- Jason Wei et al., [*Finetuned Language Models Are Zero-Shot Learners*](https://arxiv.org/abs/2109.01652), Sections 2–3.
- Long Ouyang et al., [*Training Language Models to Follow Instructions with Human Feedback*](https://arxiv.org/abs/2203.02155), Sections 3.1–3.2.

#### Optional reading

- Hyung Won Chung et al., [*Scaling Instruction-Finetuned Language Models*](https://arxiv.org/abs/2210.11416), Sections 2–3.

#### Slides and this week's action

**Slides:** `week-06-sft-data-and-masking.deck.mdx` — to be implemented from this page.  
**Practical:** Lab 2 — Build and Inspect a Post-Training Batch.  
**Mid-semester break:** Monday 5–Sunday 11 April. Preserve logs and checkpoints outside the active runtime before the break.

### Week 7 — Learning from Preferences Without Hiding the Cost

**Week beginning:** Monday 12 April 2027  
**Stage:** Shape model behaviour · Project 2 drop-in clinic

#### Summary

Some qualities—voice, helpfulness, restraint, or overall story preference—are easier to compare between two outputs than to demonstrate with one perfect answer. This lecture follows a preference signal through reward modelling, RLHF, RLAIF, and DPO. The mathematics is kept sufficient to interpret the objective and failure modes: Bradley–Terry ranking, sequence-level policy gradients, KL control, implicit rewards, and reference policies. Full PPO-scale RLHF is not a compulsory course implementation. The engineering lesson is to distinguish what each label actually supports, recognise reward hacking and distribution shift, and ask whether a small preference stage provides evidence worth its data and compute.

#### Learning outcomes

After this lecture, you should be able to:

1. construct a pairwise preference record and explain the Bradley–Terry ranking assumption;
2. describe the SFT, reward-model, and policy stages of classical RLHF;
3. explain intuitively why sampled sequence rewards require a policy-gradient estimator and why KL control is used;
4. compare human feedback, AI feedback, and DPO without mislabelling one as another; and
5. identify reward hacking, off-policy distribution shift, label inconsistency, and reference-policy drift.

#### 1. Preference data

For one prompt, labelers compare candidates under published anchors. The result says one observed output was preferred under those conditions; it does not reveal a universal scalar truth. Candidate order, sampler, rater reliability, ties, and the proximity of candidates to the current policy affect the dataset.

#### 2. Reward models and RLHF

A reward model learns to score preferred outputs above rejected outputs. A policy then samples sequences and is updated toward higher reward. Because sampling is discrete, the reward weights gradients of the sampled sequence log-probability rather than being differentiated through the sampled words. A KL penalty discourages the policy from moving into regions the SFT reference assigns negligible probability.

#### 3. RLAIF and DPO

RLAIF replaces or supplements human preference labels with an AI judge and therefore inherits judge capability, prompt, order, and bias risks. DPO removes the separately trained reward model and directly increases the relative preference of chosen over rejected responses against a reference policy. It is simpler operationally, not evidence-free; pair quality and the reference remain central.

#### 4. Proportionate choices at 32M

The supported course exercise uses a tiny fixed preference set and an inspectable loss. Students may use a preference method in Project 2 only when the target, labels, baseline, and retained-capability evaluation justify it. Work using AI labels is described as AI feedback; work without genuine human preference labels is not called full RLHF.

#### Required reading

- Long Ouyang et al., [*Training Language Models to Follow Instructions with Human Feedback*](https://arxiv.org/abs/2203.02155), Sections 2 and 3.4.
- Rafael Rafailov et al., [*Direct Preference Optimization: Your Language Model Is Secretly a Reward Model*](https://arxiv.org/abs/2305.18290), abstract and Sections 3–4.

#### Optional reading

- Yuntao Bai et al., [*Constitutional AI: Harmlessness from AI Feedback*](https://arxiv.org/abs/2212.08073), Sections 1–2.

#### Slides and this week's action

**Slides:** `week-07-preference-learning.deck.mdx` — to be implemented from this page.  
**Support:** Project 2 drop-in clinic.  
**Before Week 8:** freeze the final comparison set and decide whether every extra training stage produced evidence strong enough to retain in the final pipeline.

### Week 8 — Did the Behaviour Change, and What Regressed?

**Week beginning:** Monday 19 April 2027  
**Stage:** Shape model behaviour · Project 2 due

#### Summary

Post-training creates a multi-objective evaluation problem. A checkpoint may match target vocabulary while becoming repetitive, follow an exact instruction while failing a paraphrase, or improve style ratings while losing general narrative coherence. This lecture shows how to define target-style, instruction-compliance, narrative-quality, memorisation, and retention measures without collapsing them into one opaque score. Students practise blind paired comparisons, recognise evaluator and prompt-order effects, inspect source overlap, and select checkpoints against a declared priority rather than whichever metric looks best. The resulting report should say what changed, what did not, and which evidence cannot distinguish competing explanations.

#### Learning outcomes

After this lecture, you should be able to:

1. operationalise a behavioural target using observable anchors and held-out evidence;
2. design a blind A/B review that separates model identity from candidate quality;
3. evaluate paraphrase robustness, copying, and retained narrative ability;
4. select a checkpoint across competing objectives using a pre-declared rule; and
5. write a calibrated claim that distinguishes measurement, interpretation, and uncertainty.

#### 1. Separate target behaviour from surface mimicry

Target-word frequency can rise without a convincing voice. Human anchors therefore cover coherence, target behaviour, and major defects, while target-domain PPL provides a complementary distributional measure. Selected examples must include failures and cannot be silently edited.

#### 2. Blind comparison and rater variability

Candidate order is randomised and model identities are hidden. Three raters score official story outputs independently under the published anchors; medians reduce sensitivity to one extreme score, and adjudication addresses large disagreement. Student-run formative reviews should record prompt, sampler, rater count, and order policy.

#### 3. Robustness, retention, and copying

The same intent is tested through paraphrased prompts or changed story openings. General narrative prompts reveal catastrophic forgetting. Exact and near-duplicate checks plus phrase-level inspection distinguish plausible genre convention from suspicious reproduction of source text.

#### 4. Multi-objective checkpoint selection

Students identify one primary target and minimum acceptable floors for retained behaviour and technical validity. A checkpoint that wins one metric but violates a floor is not selected. The report presents the trade-off openly instead of manufacturing a single composite score after seeing results.

#### Required reading

- Jeffrey Zhou et al., [*Instruction-Following Evaluation for Large Language Models*](https://arxiv.org/abs/2311.07911), abstract and Sections 1–2.
- Course page, **Human review protocol and rating anchors**.

#### Optional reading

- Percy Liang et al., [*Holistic Evaluation of Language Models*](https://arxiv.org/abs/2211.09110), Sections 1–2.

#### Slides and this week's action

**Slides:** `week-08-behavioural-evaluation.deck.mdx` — to be implemented from this page.  
**Deadline:** Project 2, Sunday 25 April 2027 at 23:59 AET. Preserve the unchanged-checkpoint baseline outputs alongside the final outputs.

### Week 9 — Reasoning as Generated and Verifiable Behaviour

**Week beginning:** Monday 26 April 2027  
**Stage:** Build a specialist · Project 3 begins

#### Summary

Reasoning is introduced as generated intermediate tokens and decisions, not a hidden faculty that switches on when a model crosses a size threshold. A model may assign some probability to a correct path while greedy decoding selects a wrong one. Chain-of-thought demonstrations can reshape the output distribution; self-consistency spends additional inference compute to sample multiple paths and aggregate final answers; a verifier separates generating a candidate from checking it. These tools connect directly to Project 3B, while the same generate–compare–verify pattern helps Project 3A define and test a narrative capability. Students also confront a central limitation: a correct final answer does not prove that the written rationale is faithful or correct.

#### Learning outcomes

After this lecture, you should be able to:

1. represent a rationale as intermediate generated tokens preceding a final answer;
2. compare direct, zero-shot CoT, few-shot CoT, and self-consistency inference;
3. explain why sampling more paths can improve final-answer accuracy and increase cost;
4. implement an exact final-answer and format verifier for bounded arithmetic; and
5. distinguish answer correctness, reasoning validity, and rationale faithfulness.

#### 1. The correct path may not rank first

Greedy decoding returns a locally high-probability continuation, not a proof that no better reasoning path exists. Inspecting several candidates shows that both correct and incorrect answers can arise from fluent text. Longer is not automatically more correct.

#### 2. Chain-of-thought as an interface

Few-shot CoT supplies examples of intermediate steps; zero-shot prompts provide a weaker generic cue. The original gains were demonstrated primarily on much larger models, so Project 3 treats CoT as a hypothesis to test at 32M rather than an assumed benefit. Short, task-aligned rationales may be more learnable than verbose traces.

#### 3. Self-consistency and inference-time compute

Self-consistency samples diverse reasoning paths and selects the most frequent final answer. The aggregation is over final answers, not identical wording. Accuracy may improve, but sample count and rationale length consume inference budget and must be reported. Correlated errors limit the value of additional samples.

#### 4. Verification

For Project 3B, the parser extracts the final answer and checks it against ground truth; formatting validation prevents an unparsable output from being treated as correct. For open-ended narrative tasks, verification becomes a mixture of explicit constraints and human judgement. In both tracks, generation and evaluation remain separate pipeline components.

#### Required reading

- Jason Wei et al., [*Chain-of-Thought Prompting Elicits Reasoning in Large Language Models*](https://arxiv.org/abs/2201.11903), abstract and Sections 1–2.
- Xuezhi Wang et al., [*Self-Consistency Improves Chain of Thought Reasoning in Language Models*](https://arxiv.org/abs/2203.11171), abstract and Section 2.

#### Optional reading

- Takeshi Kojima et al., [*Large Language Models Are Zero-Shot Reasoners*](https://arxiv.org/abs/2205.11916), Sections 1–2.

#### Slides and this week's action

**Slides:** `week-09-reasoning-and-verification.deck.mdx` — to be implemented from this page.  
**Milestone:** Project 3 alternative-task proposals are due Sunday 2 May 2027 at 23:59 AET. All students should establish the unchanged-model baseline before training.

### Week 10 — Train a Specialist That Can Be Tested

**Week beginning:** Monday 3 May 2027  
**Stage:** Build a specialist · Formal Lab 3

#### Summary

Specialisation is post-training with a narrower contract. This lecture turns that contract into data, targets, and a controlled comparison. Students choose a permitted starting checkpoint, define the task schema, create source- or template-aware splits, inspect response-only masks, and decide whether to train direct answers, short rationales, or both. Curriculum, counterexamples, data balance, full fine-tuning, and parameter-efficient adaptation are framed as engineering choices whose value depends on model size and implementation overhead. Project 3A and 3B share the same experimental logic: one primary capability, one unchanged baseline, one meaningful comparison, one regression check, and a package that can be loaded independently.

#### Learning outcomes

After this lecture, you should be able to:

1. translate a bounded task definition into a schema, metric, split, and validity gate;
2. choose a permitted starting checkpoint and document its frozen identity;
3. design examples, counterexamples, and curriculum without leaking evaluation templates;
4. compare direct-answer and rationale-supervised targets for Project 3B; and
5. justify full or parameter-efficient adaptation using total trainable parameters, memory, runtime, and reproducibility.

#### 1. A task contract before a dataset

The primary capability is written as an input, allowed output, success measure, and out-of-scope boundary. Track A proposals use the approved metric and human-evaluation plan; Track B follows `test_pilot`, exact answer extraction, and format validation. Data is selected only after the contract is explicit.

#### 2. Starting checkpoint and split integrity

The frozen revision, parameter count, tensor shapes, and checksum identify the starting model. Template families, story sources, or generated problem seeds are separated so validation measures transfer rather than repetition. Public tutor prompts remain excluded from training even when their wording is visible.

#### 3. Targets, rationales, and curriculum

Direct answers minimise output burden; short rationales expose intermediate structure and can make word problems easier to learn, but they also increase sequence length and can introduce plausible wrong steps. A curriculum may move from single operations to mixed operations and from direct arithmetic to short word problems. Difficulty and format should be balanced deliberately, not inferred from file order.

#### 4. Adaptation method and regression

Full fine-tuning updates the entire permitted model. Parameter-efficient methods may reduce trainable-state and memory costs but add adapter configuration and may not save total runtime on a tiny model. Either method must be counted correctly and load in the marker's environment. A retained narrative or general-language check runs alongside the task metric.

#### Required reading

- Karl Cobbe et al., [*Training Verifiers to Solve Math Word Problems*](https://arxiv.org/abs/2110.14168), abstract and Sections 1–2.
- Eric Zelikman et al., [*STaR: Self-Taught Reasoner Bootstrapping Reasoning With Reasoning*](https://arxiv.org/abs/2203.14465), abstract and Section 2.

#### Optional reading

- Edward Hu et al., [*LoRA: Low-Rank Adaptation of Large Language Models*](https://arxiv.org/abs/2106.09685), abstract and Section 4.

#### Slides and this week's action

**Slides:** `week-10-specialist-training.deck.mdx` — to be implemented from this page.  
**Practical:** Lab 3 — Train and Verify a Specialist.  
**Before Week 11:** produce one loadable pilot checkpoint, one valid task metric, and one unchanged-model baseline result.

### Week 11 — Generalisation, Supervision, and One Honest Ablation

**Week beginning:** Monday 10 May 2027  
**Stage:** Build a specialist · Project 3 drop-in clinic

#### Summary

A specialist model is useful only if its capability survives beyond examples that look like its training set. This lecture begins with template and paraphrase shift, then develops outcome versus process supervision and the role of verifiable rewards. Outcome supervision is cheap and objective when a final answer can be checked; process supervision can diagnose steps but is expensive and may inherit errors from automated annotation. GRPO and RL from verifiable rewards are presented as frontier extensions that explain current reasoning systems, not required Project 3 methods. The practical centre is a matched ablation: change one factor, measure task performance and one retained capability, classify errors, and avoid claiming a mechanism the experiment cannot identify.

#### Learning outcomes

After this lecture, you should be able to:

1. design tests for paraphrase, template, operand-range, and composition shift;
2. compare outcome and process supervision by signal quality, annotation cost, and diagnostic value;
3. explain how verifiable rewards differ from a learned reward model and how group-relative baselines work conceptually;
4. run or specify a matched ablation with controlled data, compute, and evaluation; and
5. state a supported conclusion alongside a plausible alternative explanation.

#### 1. Generalisation is a family of shifts

Held-out examples from the same template test interpolation, not broad reasoning. Students vary surface wording, operation combinations, story structures, and allowed numeric range while keeping the published task scope. Track A uses analogous constraint or prompt changes. Performance is reported by slice so one easy subset cannot hide a failure.

#### 2. Outcome and process supervision

An outcome reward checks the final answer; a process reward scores intermediate steps. Process labels can support search and error localisation, but human step annotation is expensive and automated rollouts can drift from the policy being evaluated. A correct outcome does not certify every stated step, while a flawed rationale can occasionally reach a correct answer.

#### 3. Verifiable rewards and GRPO as frontier context

When a task has an objective checker, RL can use rule-based rewards without a learned reward model. GRPO compares a group of responses to the same prompt and uses the group mean as a prompt-specific baseline instead of a separate value model. Students should understand the signal path and limitations, but Project 3 does not require implementing RLVR, PPO, GRPO, or a process reward model.

#### 4. The ablation and the claim

A useful ablation changes one factor—rationale targets, data mix, learning rate, starting checkpoint, or decoding rule—while holding evaluation constant. Results include cost and regressions. If several factors changed, the comparison can show a system difference but cannot isolate which change caused it. Postgraduate analysis is expected to examine mechanism and alternative explanations more deeply.

#### Required reading

- Hunter Lightman et al., [*Let's Verify Step by Step*](https://arxiv.org/abs/2305.20050), abstract and Sections 1–2.
- Jeffrey Zhou et al., [*Instruction-Following Evaluation for Large Language Models*](https://arxiv.org/abs/2311.07911), Section 2, as an example of rule-verifiable behaviour.

#### Optional reading

- Zhihong Shao et al., [*DeepSeekMath: Pushing the Limits of Mathematical Reasoning in Open Language Models*](https://arxiv.org/abs/2402.03300), Sections 1 and 4.
- Liangchen Luo et al., [*Improve Mathematical Reasoning in Language Models by Automated Process Supervision*](https://arxiv.org/abs/2406.06592), abstract and Section 3.

#### Slides and this week's action

**Slides:** `week-11-generalisation-and-supervision.deck.mdx` — to be implemented from this page.  
**Support:** Project 3 drop-in clinic.  
**Before Week 12:** freeze the candidate checkpoint and write the strongest conclusion your comparison supports plus one conclusion it does not support.

### Week 12 — Audit the Training System

**Week beginning:** Monday 17 May 2027  
**Stage:** Build a specialist · Project 3 due

#### Summary

The course ends by treating the model as one component of an auditable training system. Students reconstruct the path from task definition through data, configuration, compute ledger, checkpoints, evaluation, and final claim. A peer or fresh process must be able to load the exact artifact and reproduce the core metric. The lecture then revisits scale transfer: large-model scaling laws, emergent-behaviour claims, long reasoning traces, RLVR, and inference-time compute can inspire a small experiment, but evidence at one scale does not automatically establish a mechanism at another. The final retrospective asks where the original plan changed, which evidence caused the change, and what uncertainty remains.

#### Learning outcomes

After this lecture, you should be able to:

1. audit the consistency of a checkpoint, tokenizer, configuration, data revision, sampler, and evaluation command;
2. reconcile the compute ledger with the final report and model card;
3. distinguish reproducibility of an artifact from replicability of a scientific claim;
4. evaluate whether a frontier result plausibly transfers to a 32M experiment; and
5. write a concise engineering retrospective grounded in decisions and evidence.

#### 1. The artifact chain

Every reported result points to a frozen GitLab commit, data version, starting and final checkpoint revision, configuration, seed policy, sampler, and evaluation command. Checksums and tensor shapes catch mismatched weights; a fresh load catches hidden notebook state and missing files.

#### 2. Reproduce the number and the behaviour

The core metric is rerun from the packaged model. Fixed prompts and generation settings reproduce comparable outputs, while a small additional sample shows the model is not only replaying a cached artifact. Technical validity, task performance, and human judgement are recorded separately.

#### 3. What transfers across scale

Scaling laws describe fitted empirical regimes, not promises for every architecture and dataset. Claims of emergence depend on metrics and sampling; data quality can dominate quantity in small settings; longer reasoning and more samples trade compute for probability of success. Students identify which course results are direct evidence and which are analogies to frontier systems.

#### 4. The final retrospective

A strong retrospective names the original plan, the observation that challenged it, the revision made, the cost of that revision, and the remaining uncertainty. It does not need a perfect final model. It needs a traceable explanation of why the final system is the most defensible use of the available budget.

#### Required reading

- Jared Kaplan et al., [*Scaling Laws for Neural Language Models*](https://arxiv.org/abs/2001.08361), limitations relevant to extrapolation.
- Rylan Schaeffer, Brando Miranda, and Sanmi Koyejo, [*Are Emergent Abilities of Large Language Models a Mirage?*](https://arxiv.org/abs/2304.15004), abstract and Sections 1–2.

#### Optional reading

- Xuezhi Wang et al., [*Self-Consistency Improves Chain of Thought Reasoning in Language Models*](https://arxiv.org/abs/2203.11171), discussion of inference cost and limitations.

#### Slides and this week's action

**Slides:** `week-12-training-system-audit.deck.mdx` — to be implemented from this page.  
**Deadline:** Project 3, Sunday 23 May 2027 at 23:59 AET. Complete the fresh-environment audit before submission.

---

## Lightweight guided-session pages

These six self-directed sessions make the practical collection cover Weeks 1–12 without turning every week into a second lecture. They are ungraded, take 35–60 minutes, and produce a small project artefact or completed audit. Launch sessions use an immediate self-check; deadline sessions use a submission checklist. There is no delayed model solution.

### Week 1 — Project 1 Launch and Data Validation

**Week:** 1  
**Estimated active time:** 45 minutes  
**Release:** Monday 22 February 2027 at 09:00 AET  
**Solution release:** immediate completion checklist; no model solution

#### Learning goals

- locate the canonical brief, starter repository, data card, and evaluation pack;
- verify the supported environment and data checksums;
- distinguish document-level training, validation, development, and tutor-evaluation material; and
- state one bounded Project 1 target before selecting an architecture.

#### Preparation

Read the Project 1 page and the Week 1 lecture. Accept the assigned GitLab repository and confirm that no credential, private key, or HF token is stored in the working directory.

#### Activity

1. Run the CPU environment check and record the installed framework/CUDA state.
2. Read the dataset card, verify the supplied checksum, and generate `data_summary.json`.
3. Inspect the document-level split and run the exact/near-duplicate separation validator.
4. Run the untouched tokenizer/data smoke test without beginning a principal training run.
5. Write a 120-word target statement naming the intended continuation behaviour, one failure to monitor, and the initial compute reservation.

#### Expected output and self-check

Retain the environment report, `data_summary.json`, separation-validator output, and target statement. You are ready for Lab 1 only if the split is document-level, all flagged overlap has been resolved or reported, and the target describes observable behaviour rather than “get the lowest loss.”

---

### Week 4 — Project 1 Evaluation and Packaging

**Week:** 4  
**Estimated active time:** 60 minutes  
**Release:** Monday 15 March 2027 at 09:00 AET  
**Solution release:** immediate submission checklist; no model solution

#### Learning goals

- run the released evaluation pipeline without tuning against evaluation items;
- verify that the candidate checkpoint loads outside notebook state; and
- reconcile the report, compute ledger, code revision, and model package.

#### Preparation

Freeze a candidate checkpoint and decoding configuration. Stop principal training before beginning this audit; the session introduces no new method.

#### Activity

1. Run all five development examples and retain unedited outputs with decoding settings.
2. Run the public PPL/BPB, repetition, and stopping checks; label development evidence correctly.
3. Load the checkpoint in a fresh process and reproduce one output from the documented command.
4. Verify parameter count, `compute-ledger.json`, tokenizer, sampler, checksums, GitLab commit, and HF revision.
5. Complete the rubric-evidence map and the `ass1_report.pdf`/portal checklist.

#### Expected output and self-check

Retain one fresh-load log, evaluation summary, final manifest, and completed checklist. Do not submit if the documented command loads different weights, the report names a different revision, or any secret appears in the package.

---

### Week 5 — Project 2 Target and Baseline Planning

**Week:** 5  
**Estimated active time:** 45 minutes  
**Release:** Monday 22 March 2027 at 09:00 AET  
**Solution release:** immediate completion checklist; no model solution

#### Learning goals

- define a target voice in observable dimensions;
- verify the provenance and role of target-style data;
- freeze the unchanged starting-checkpoint baseline; and
- cost one viable post-training route before training.

#### Preparation

Read the Project 2 brief and Week 5 lecture. Choose a permitted personal Project 1 checkpoint or the course narrative fallback and record its frozen revision.

#### Activity

1. Translate the target voice into three to five behavioural indicators and one unacceptable failure.
2. Inspect the supplied public-domain editions, licences, story boundaries, and source-level split.
3. Generate unchanged-checkpoint outputs on the allowed baseline prompts and record decoding settings.
4. Compare continued pre-training, SFT, and preference-based routes against available data and compute.
5. Write a one-page plan containing the selected route, minimum baseline, retention measure, pilot, and stop rule.

#### Expected output and self-check

Retain the target contract, source record, unchanged baseline, and costed plan. The plan is ready only if another reader could decide whether the claimed style changed and whether narrative ability regressed.

---

### Week 8 — Project 2 Blind Evaluation and Packaging

**Week:** 8  
**Estimated active time:** 60 minutes  
**Release:** Monday 19 April 2027 at 09:00 AET  
**Solution release:** immediate submission checklist; no model solution

#### Learning goals

- compare the unchanged and tuned checkpoints under blinded, matched conditions;
- interpret target gain together with retention, copying, and degeneration; and
- package a reproducible Project 2 submission.

#### Preparation

Freeze the candidate checkpoint, unchanged baseline, generation settings, and evaluation prompts before viewing the comparison.

#### Activity

1. Generate matched, de-identified output pairs and run the published rating/metric procedure.
2. Complete the target-versus-retention table and record uncertainty or rater disagreement.
3. Run source-overlap, repetition, malformed-stopping, and prompt-paraphrase checks.
4. Reload the final checkpoint in a clean process and verify the documented generation command.
5. Reconcile the evidence map, `compute-ledger.json`, model card, checksums, `ass2_report.pdf`, and portal fields.

#### Expected output and self-check

Retain the blind comparison, retention table, integrity checks, fresh-load log, and final manifest. A style improvement does not justify selection if the output is unusable, copied, or supported only by favourable prompts.

---

### Week 9 — Project 3 Task Contract and Baseline

**Week:** 9  
**Estimated active time:** 45 minutes  
**Release:** Monday 26 April 2027 at 09:00 AET  
**Solution release:** immediate completion checklist; no model solution

#### Learning goals

- choose a permitted track and one bounded target behaviour;
- write valid input, output, metric, and out-of-scope conditions;
- establish the unchanged starting-model baseline; and
- identify whether a Track A proposal is required.

#### Preparation

Read the Project 3 page. Track B students inspect `test_pilot`; Track A students select a supported capability or begin the one-page alternative proposal.

#### Activity

1. State the task contract, parser/validity gate, primary metric, generalisation slice, and regression metric.
2. Record the exact permitted starting checkpoint and run its unchanged baseline.
3. Inspect the proposed split at source/template level and run the separation validator.
4. Allocate the 12-hour/\(1.5\times10^{17}\)-FLOP budget across dry run, comparison, final run, and recovery.
5. If proposing an alternative Track A task, freeze and submit `proposal.md` by Sunday 2 May at 23:59 AET; do not exceed the permitted 0.5-hour pre-approval dry run.

#### Expected output and self-check

Retain one task-contract table, baseline report, split validation, and compute plan. The task is ready only if correctness can be distinguished from formatting and the generalisation case is not a renamed training template.

---

### Week 12 — Project 3 Fresh-Load Audit and Submission

**Week:** 12  
**Estimated active time:** 60 minutes  
**Release:** Monday 17 May 2027 at 09:00 AET  
**Solution release:** immediate submission checklist; no model solution

#### Learning goals

- reproduce the final specialist in a clean environment;
- rerun task, shifted-slice, and regression evaluation from frozen revisions; and
- submit one internally consistent evidence chain.

#### Preparation

Freeze the candidate checkpoint, parser/verifier, decoding settings, and evaluation configuration. This session is an audit, not permission for an unplanned final sweep.

#### Activity

1. Create a fresh environment and load the exact HF revision using only documented files and commands.
2. Run valid and invalid format edge cases, the primary metric, one shifted slice, and one retained-capability check.
3. Reconcile parameter preflight, compute ledger, data/code/model revisions, checksums, and report tables.
4. Confirm that the SlopU marking account can read the frozen private repository without receiving a token.
5. Complete the `ass3_report.pdf` and authenticated portal checklist; save the receipt after submission.

#### Expected output and self-check

Retain the clean-environment log, final metric table, regression result, manifest, and receipt. The package is ready only if the report, code, model card, portal identifiers, and reproduced outputs all refer to the same frozen system.

---

## Formal lab pages

Formal labs occur once per project cycle, in the second week. They are intentionally deeper than a weekly sequence of small exercises. Each uses supplied toy data and a bounded run; unchanged staff demonstrations do not consume the student's assessed compute allowance.

### Lab 1 — Spend a 32M Parameter Budget

**Week:** 2  
**Estimated active time:** 110 minutes  
**Notebook:** `lab-01-parameter-budget.ipynb` — released Monday 1 March 2027 at 09:00 AET  
**Solution release:** after the final scheduled Lab 1 class

#### Learning goals

- trace shapes and information flow through one causal decoder block;
- verify a causal attention mask and shifted targets;
- use the official preflight to calculate learned parameters; and
- compare depth/width allocations without changing several variables accidentally.

#### Preparation

Complete the Week 1 lecture and the Week 2 sections on the decoder block. Clone the Project 1 repository, run the CPU environment check, and bring the generated `data_summary.json`. No GPU is required for Parts A–C; the final smoke test uses a supplied tiny batch.

#### Activity

1. **Read it:** annotate the starter configuration with vocabulary size, context length, layers, heads, model width, and FFN width. Predict which fields change learned parameters and which mainly change activation cost.
2. **Run it:** execute the shape trace. Confirm input IDs, embeddings, attention scores, mask, logits, and shifted labels. Intentionally remove the causal mask on the toy example and explain why the resulting lower loss is invalid.
3. **Inspect it:** use the parameter report to locate embeddings/output head, attention projections, FFN, and normalisation parameters. Reconcile the component counts with the reported total.
4. **Change one thing:** construct Architecture A and Architecture B below 33.6M while keeping tokenizer, context, batch, data, and smoke-test steps fixed. Change one primary allocation—preferably depth versus width—and predict effects on memory, speed, and learning before running.
5. **Transfer it:** select a Project 1 baseline or state what additional pilot evidence is needed. Save both legal configs and the preflight reports.

#### Expected output

- one annotated tensor-shape table;
- one causal-mask screenshot or exported matrix with a two-sentence explanation;
- two legal configuration files and parameter reports;
- one controlled smoke-test comparison table; and
- a 150-word architecture decision note.

#### Self-check

- Does every target token depend only on its prefix?
- Are both models at or below 33.6M learned parameters, with 32M still treated as the design target?
- Did only one primary architecture allocation change?
- Are data, steps, seed policy, and evaluation identical?
- Does the conclusion distinguish prediction from observed evidence?

### Lab 2 — Build and Inspect a Post-Training Batch

**Week:** 6  
**Estimated active time:** 120 minutes  
**Notebook:** `lab-02-post-training-batch.ipynb` — released Monday 29 March 2027 at 09:00 AET  
**Solution release:** after the final scheduled Lab 2 class

#### Learning goals

- distinguish continued-pre-training and SFT records at data and target level;
- render and verify a response-only loss mask;
- run a bounded SFT update and compare it with the unchanged checkpoint; and
- test whether an apparent behaviour survives prompt paraphrase.

#### Preparation

Complete Weeks 5–6 readings. Load the supplied Project 1 fallback checkpoint or a compatible personal Project 1 checkpoint. Bring three short examples of the target voice; do not use tutor-evaluation prompts or answers.

#### Activity

1. **Read it:** inspect one raw target-style paragraph, one instruction record, and their serialised token sequences. State what behaviour each training format can supervise.
2. **Run it:** use the supplied formatter to create prompt, response, EOS, attention mask, and labels. Render every token with a `loss/no-loss` flag.
3. **Inspect it:** catch three planted errors: an off-by-one target, prompt tokens receiving loss, and a missing EOS target. Explain how each could change behaviour or evaluation.
4. **Change one thing:** run the same tiny SFT batch with response-only loss and with the supplied alternative masking choice. Hold checkpoint, examples, learning rate, steps, and seed fixed.
5. **Transfer it:** evaluate the unchanged and tuned checkpoints on the original prompt, a paraphrase, and a retained narrative prompt. Decide whether the schema teaches the intended behaviour or mainly memorises the surface format.

#### Expected output

- a declared data schema and one fully rendered token/mask example;
- corrected unit-test results for the three planted failures;
- a compact loss/runtime table for the two masking runs;
- unchanged-versus-tuned outputs on three prompt types; and
- a 200-word Project 2 method note covering target, gain, regression, and next decision.

#### Self-check

- Can another person reconstruct the exact training string from the schema?
- Are prompt and padding labels masked as declared?
- Is EOS present and trained intentionally?
- Does the comparison use the same starting checkpoint and data?
- Is synthetic or edited material labelled honestly?

### Lab 3 — Train and Verify a Specialist

**Week:** 10  
**Estimated active time:** 120 minutes  
**Notebook:** `lab-03-specialist-verifier.ipynb` — released Monday 3 May 2027 at 09:00 AET  
**Solution release:** after the final scheduled Lab 3 class

#### Learning goals

- turn a task contract into valid training and evaluation records;
- build a parser and verifier before the main training run;
- compare direct-answer and short-rationale targets on a bounded example; and
- test one out-of-template slice and one retained capability.

#### Preparation

Choose Project 3 Track A or B and bring the approved/standard task definition. Track B students run the repository's `test_pilot` format check; Track A students bring the approved automatic metric and human-rating anchors. Load the unchanged starting checkpoint in a fresh process.

#### Activity

1. **Read it:** write the input contract, allowed output, validity gate, primary metric, out-of-scope conditions, and one regression metric.
2. **Run it:** create a template/source-aware split and run the contamination validator. Implement or configure answer extraction and format checking before training.
3. **Inspect it:** render two training examples and their target masks. For Track B, compare a direct answer with a short-rationale record; for Track A, compare a valid and deliberately invalid output under the task constraints.
4. **Change one thing:** perform a bounded pilot comparison with one controlled difference, such as target format, data mixture, or learning rate. Do not combine several changes.
5. **Transfer it:** evaluate unchanged and pilot checkpoints on in-template validation, one shifted slice, and one retained-capability prompt. Save a loadable pilot package.

#### Expected output

- one task-contract table;
- split and contamination-validation records;
- passing extraction/format tests including invalid edge cases;
- a matched pilot comparison with task, shifted-slice, regression, and compute results; and
- a loadable checkpoint plus a 200-word decision note.

#### Self-check

- Was the verifier working before the model was trained?
- Are evaluation templates or prompts absent from training data?
- Does a formatted but wrong answer fail correctness, and does a correct but unparsable answer fail the technical gate?
- Did the comparison change one meaningful factor?
- Can the pilot reload without notebook state?

---

## Drop-in clinic pages

Drop-in clinics are not additional lectures or graded checkpoints. They are evidence-led troubleshooting sessions held in the third week of each project cycle. Students may attend for any portion of the hour. Staff can help interpret a failure or assess whether a comparison is controlled, but they do not select an assessed method or write a report conclusion for a student.

### Week 3 — Project 1 Pilot Clinic

**Time:** Monday 8 March 2027, 15:00–16:00 AET · online  
**Bring one item:** both parameter preflight reports; a token/runtime estimate; a train/validation curve; a gradient or memory trace; or a concrete failed run.  
**Clinic sequence:** two-minute problem statement; evidence screen-share; identify whether the fault is data, target, architecture, optimisation, runtime, or evaluation; agree on the smallest next check.  
**Expected outcome:** a written decision to continue, revise one factor, or stop, with a reason and maximum additional spend.  
**After the session:** de-identified common-issue notes are posted; there is no model solution.

### Week 7 — Project 2 Behaviour Clinic

**Time:** Monday 12 April 2027, 15:00–16:00 AET · online  
**Bring one item:** an operational target-voice definition; a rendered SFT mask; an unchanged/tuned output pair; a target-versus-retention metric table; or a preference pair whose label is genuinely difficult.  
**Clinic sequence:** state the target; inspect the evidence; separate format failure, weak supervision, over-training, decoding, and evaluation ambiguity; choose one diagnostic that can change the plan.  
**Expected outcome:** a frozen evaluation comparison and a justified decision about the next or final post-training stage.  
**After the session:** de-identified common-issue notes are posted; there is no model solution.

### Week 11 — Project 3 Generalisation Clinic

**Time:** Monday 10 May 2027, 15:00–16:00 AET · online  
**Bring one item:** task-contract and verifier output; in-template versus shifted-slice results; one controlled ablation; an error taxonomy; a regression result; or a fresh-load failure.  
**Clinic sequence:** verify technical validity; locate the generalisation boundary; test whether the comparison isolates one factor; separate supported conclusions from alternative explanations; identify the minimum remaining audit.  
**Expected outcome:** a candidate final checkpoint, a bounded claim, and a short list of unresolved limitations that belong in the report.  
**After the session:** de-identified common-issue notes are posted; there is no model solution.

---

## First complete slide deck specification

### Week 3 deck — Scale, Data, and Optimisation Under Fixed Compute

**Implementation filename:** `week-03-fixed-compute.deck.mdx`  
**Target duration:** 75 minutes including two short student decisions  
**Accessibility:** every chart must include alt text and a prose takeaway; colour cannot be the only distinction; equations require spoken/plain-language interpretations; cited figures must carry source and licence information in speaker notes.

| Slide | Title | Page-ready content and teaching purpose |
| ---: | --- | --- |
| 1 | Scale is an allocation problem | Title, course/stage label, and opening question: “With one GPU-day, would you spend it on a larger model, more distinct tokens, or more updates over the same data?” Collect a silent initial choice. |
| 2 | Project 1 has three coupled quantities | Define \(N\) as learned parameters, \(D\) as training tokens processed, and \(C\) as training compute. Show the 32M design target, 33.6M absolute boundary, 24 T4-equivalent hours, and \(4.0\times10^{17}\) FLOP ceiling. Takeaway: every proposed run must fit all applicable constraints. |
| 3 | Bigger is not automatically better | Three failure sketches: too many parameters for the data; many repeated passes over a narrow corpus; a tiny model trained long after useful validation improvement. Ask which resource is the bottleneck in each case. |
| 4 | Power-law intuition | Present \(L(x)=a x^{-\alpha}+L_\infty\). Explain diminishing returns and the approximately straight middle region on log–log axes. Label small-data, useful-scaling, and irreducible-error regions. Do not ask students to fit exponents for the assignment. |
| 5 | Kaplan et al.: smooth scale relationships | Summarise the reported relationships between loss and \(N,D,C\), sample efficiency of larger models, weak sensitivity to shape within the studied range, and early stopping under compute-optimal allocation. Add a callout: studied regimes are far above 32M. |
| 6 | Chinchilla changed the allocation | Contrast the earlier parameter-heavy recommendation with approximately proportional growth of parameters and training tokens under fixed compute. Show an iso-compute valley conceptually. Takeaway: an undertrained large model can lose to a smaller model trained on more tokens. |
| 7 | What transfers to 32M? | Two columns. Transferable: identify bottlenecks, compare within a fixed budget, allocate data with model size, stop by evidence. Not guaranteed: published exponents, optimal token/parameter ratio, batch size, or exact loss at this scale and corpus. |
| 8 | Decision 1: choose a plan | Present three legal fictional plans with the same maximum compute: 18M/more tokens, 31.8M/balanced tokens, 33.5M/fewer tokens. Students choose which uncertainty must be measured before selecting, rather than voting for a winner from insufficient information. |
| 9 | A token is not a unit of value | Compare clean diverse stories, duplicated stories, OCR noise, and synthetic textbook-like stories. Explain quality, diversity, duplication, provenance, and domain fit. Link TinyStories/Phi as evidence that data design can change small-model outcomes, not proof that synthetic data is always superior. |
| 10 | Count data twice | Show two ledgers: unique source/token inventory and tokens processed during optimisation. Multiple epochs increase the second without increasing the first. Explain why both are required in a report. |
| 11 | From batch to compute | Define sequence length, sequences per micro-batch, gradient accumulation, effective tokens per update, updates, and total tokens processed. Present the course ledger relationship and note that the repository is canonical for hardware conversion and FLOP estimation. |
| 12 | Learning rate is a schedule, not one number | Plot a simple warm-up, peak, and decay curve. Explain early instability, later refinement, and why an aggressive rate can destroy a useful checkpoint during post-training. Connect this pre-training lesson forward to Projects 2 and 3. |
| 13 | Stability signals | Four panels: train/validation loss, gradient norm, throughput/memory, fixed-prompt samples. For each, state one warning pattern and one ambiguous pattern. A single spike or attractive sample is not a conclusion. |
| 14 | A pilot answers one uncertainty | Use a template: hypothesis; one changed factor; controlled variables; maximum spend; measurement window; stop rule; decision the result can change. Contrast with an undirected hyperparameter sweep. |
| 15 | Decision 2: continue, revise, or stop? | Give a fictional pilot: training loss falls, validation loss flattens, gradient norm is stable, runtime projects 30 hours, samples repeat source phrases. Students choose an action and name the evidence, then reveal that several defensible actions exist if the next check is explicit. |
| 16 | Your Project 1 run plan | Final checklist: legal preflight; clean split; unique and processed token counts; baseline plus one comparison; compute reservation; checkpoint interval; fixed evaluation; stop rule; recovery margin. Link to the Week 3 clinic. |
| 17 | Claims you may and may not make | Supported: “Under our fixed data and steps, A achieved lower validation loss than B.” Unsupported: “Width is generally better than depth,” “Chinchilla proves our exact configuration is optimal,” or “lower PPL guarantees better stories.” |
| 18 | Exit ticket | Students submit: chosen baseline; largest unresolved uncertainty; pilot that can resolve it; maximum hours/FLOPs reserved; evidence that will trigger a change. End with required-reading links and Project 1 due date. |

#### Deck figure/source register

- Power-law and scaling claims: Kaplan et al., [*Scaling Laws for Neural Language Models*](https://arxiv.org/abs/2001.08361).
- Compute-optimal allocation and iso-compute concept: Hoffmann et al., [*Training Compute-Optimal Large Language Models*](https://arxiv.org/abs/2203.15556).
- Small-model/data-quality case studies: Eldan and Li, [*TinyStories*](https://arxiv.org/abs/2305.07759); Gunasekar et al., [*Textbooks Are All You Need*](https://arxiv.org/abs/2306.11644).
- Course budget values, ledger definitions, and screenshots: generated from the Project 1 starter repository at implementation time; do not substitute invented outputs.

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
- the grouping, title, concise description, state behaviour, and action label for all six Project resources;
- the three page-level submission panels, opening/due dates, report filenames, safe repository fields, and release/status copy;
- the four resource-card release states and canonical webpage-to-PDF publication workflow;
- all eleven Policies sections and the course-materials licence statement;
- People page biographies, responsibility boundaries, contact routing, and consultation times;
- the navigation labels and cross-page call-to-action wording;
- twelve page-ready lecture entries with summaries, outcomes, section content, readings, slide labels, and weekly actions;
- twelve page-ready session entries: three formal labs, three evidence-led drop-in clinics, and six lightweight guided sessions;
- twelve weekly banner search briefs, accessibility intent, and attribution requirements; and
- the complete eighteen-slide Week 3 deck specification and source register.

### Remaining content and publication details

- final dataset filenames, edition versions, URLs, and data-card copy;
- exact default model configurations published through the project repositories;
- final Project 3 Track B course-checkpoint identifier and `test_pilot` numeric ranges;
- final GitLab, Hugging Face, brief PDF, template, notebook, evaluation-pack, and submission-portal destinations;
- selection, licensing, local storage, and attribution of the twelve approved banner images;
- generation of three printable assessment PDFs from the implemented canonical pages;
- implementation of the twelve approved lecture pages and twelve session pages; and
- implementation of the approved Week 3 slide deck as a working `.deck.mdx` file.

The repository, dataset, checkpoint, and submission destinations are operational publication details rather than open course-design decisions. Until a destination exists, the implemented site should display its release timing or unavailable state without inventing a URL or shipping a broken placeholder link.