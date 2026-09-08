# Assessment Brief

> **Planning status:** Consolidated course-assessment and teaching plan. The course identity, calendar, assessment structure, evaluation and human-review rules, Policies, People, twelve lecture pages, twelve weekly session entries (three formal labs, three drop-in clinics, and six lightweight guided sessions), the weekly visual system, and the first complete slide deck are settled. Exact external resource identifiers and URLs are inserted when those resources are published.

## Course premise

Training a language model in practice is a systematic engineering problem under limited compute, data, and time.

The course studies the training of real large language models: contemporary model architectures, data pipelines, pre-training and post-training practice, scaling, efficiency, published successes, and lessons from current research and industry. The 32M-parameter assessment design target does not redefine the subject as small-model training. It creates a miniature experimental setting in which students can operate the pipeline themselves and test large-model engineering ideas within student-scale resources.

Across three projects, students will experience three stages of language-model development:

1. building basic language ability through pre-training from scratch;
2. shaping model behaviour through post-training; and
3. adapting a model to a specific use.

The aim is not to find one universally correct architecture or training recipe. Students must decide what to change, what to hold constant, what they can afford to test, and what evidence would justify the final system.

## Planning and content-source contract

This file records the course's design intent, rationale, component relationships, constraints, and remaining operational dependencies. Approved wording that should be rendered to students belongs in `CONTENT_SOURCE.md`.

The implementation agent should read both files: use this brief to understand why the course is structured this way, and use `CONTENT_SOURCE.md` for page-ready headings, descriptions, tables, rubrics, resource labels, Policies, and People. It must not turn planning commentary or unpublished operational details in this brief into invented student-facing policy. After implementation begins, `src/course-config.ts` becomes canonical for the course code, title, level, teaching period, and dates; course-specific tests protect duplicated facts and promises.

## Course identity

**Formal title and public course name:** *SLOP4225: Budgeted Language Model Training*

The Home document title, browser-history label, navigation identity, and visible Hero heading use this same concise name. The previous longer working title must not remain as a competing public identity.

**Tagline:** *Frontier practice through budgeted 32M-scale experiments*

**Course code:** `SLOP4225`. The course is fourth-year (`4`) and retains the starter repository's allocated suffix (`225`).

**Primary level:** Fourth-year undergraduate, with a postgraduate pathway and differentiated analytical expectations.

**Tags:** Large Language Models; Training Systems; Compute-Constrained ML.

**Teaching period:** Semester 1, 2027.

| Calendar item | Date |
| --- | --- |
| Teaching period begins / Week 1 | Monday 22 February 2027 |
| Project 1 due / end of Week 4 | Sunday 21 March 2027, 23:59 AET |
| Mid-semester break | Monday 5–Sunday 11 April 2027 |
| Project 2 due / end of Week 8 | Sunday 25 April 2027, 23:59 AET |
| Project 3 due / end of Week 12 | Sunday 23 May 2027, 23:59 AET |
| Teaching period ends | Sunday 23 May 2027 |

**Course description:**

> Study how modern large language models are really trained, then rebuild the pipeline at a controllable scale: pre-train a narrative model, reshape it through post-training, and specialise it for a defined task under a 32M design target and fixed compute budgets.

The title names both the subject and its organising constraint; it does not redefine language-model training as only small-model work. The combination of continuously updated frontier material, a 32M experimental design target with a transparent 5% tolerance, and three hands-on training stages provides the course's niche scope.

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

The detailed student-facing rubrics are defined in `CONTENT_SOURCE.md`. Their high-level allocation is:

| Project | Engineering report | Submitted model | Total |
| --- | ---: | ---: | ---: |
| Project 1 | 10 | 10 | 20 |
| Project 2 | 35 | 15 | 50 |
| Project 3 | 20 | 10 | 30 |
| **Total** | **65** | **35** | **100** |

This balance keeps checkpoint quality consequential while making planning, controlled experimentation, reproducibility, evaluation, and reflection the principal evidence of learning. There is no class-ranking component and no automatic credit for using a newer or more complex method.

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

Every project is designed around **32 million learned parameters**. The count includes token embeddings and output heads and is independent of storage precision. A published 5% implementation tolerance accepts checkpoints up to and including **33.6 million learned parameters** without penalty; 33.6M is the absolute eligibility boundary. The course-supplied preflight checker prints the learned-parameter count before training and is used again during marking.

The limit exists to make the work comparable and to force meaningful choices about model capacity. Students may explore depth, model width, feed-forward width, attention heads, context length, vocabulary, and other architectural components. They should plan to the 32M target rather than discovering an avoidable excess after a long run; models above 33.6M are not eligible for submitted-model marks.

### Default models and starter configurations

The exact default model and starter configuration are published in each project's assigned GitLab repository when that project opens. Each repository contains a working baseline and default training settings, but students may alter parameters, architecture components, tokenizer, data pipeline, sampler, or training configuration where the task permits. The preflight command must display the learned-parameter count and compliance status before any principal training run begins.

### Compute limit

All students receive the same formal compute allowance. Each project repository contains a locked `budget.json` stating the reference GPU, maximum T4-equivalent time, training-FLOP ceiling, hardware conversion factors, and course baseline-run equivalent.

| Project | T4-equivalent GPU-hours | Training-FLOP ceiling | Suggested internal allocation |
| --- | ---: | ---: | --- |
| Project 1 | 24 hours | \(4.0\times10^{17}\) | 4 h setup/debug; 8 h pilots; 10 h principal/final runs; 2 h recovery |
| Project 2 | 18 hours | \(2.5\times10^{17}\) | 3 h transition/debug; 6 h method pilots; 7 h principal/final runs; 2 h recovery |
| Project 3 | 12 hours | \(1.5\times10^{17}\) | 2 h pipeline debug; 4 h comparison/ablation; 5 h principal/final runs; 1 h recovery |

Both ceilings apply to cumulative project-specific training, including pilots, ablations, failed runs that performed meaningful optimisation, and final runs. The suggested allocations are guidance rather than separate sub-limits. Staff demonstrations and untouched lab toy exercises do not count; project-specific modifications do. Evaluation-only inference is logged separately. The manifests do not change during a submission period except to correct a published cohort-wide error.

For scale, the common approximation \(C\approx6ND\) implies that, at exactly 32M parameters, the three FLOP ceilings correspond to roughly 2.08B, 1.30B, and 0.78B cumulative training-token passes. These are totals across experiments rather than recommended single-run dataset sizes. The repository profiler records the implementation-specific estimate used for compliance.

The budgets deliberately include limited setup, adaptation, and recovery time for students new to the pipeline, but not enough for indiscriminate sweeps. Access to additional private hardware must not create an assessment advantage. Final performance is therefore assessed together with efficiency and evidence rather than as a raw score alone.

### Working environment

Google Colab is the recommended student environment, with its free GPU allowance providing a realistic experience of limited and uncertain compute. This scarcity is part of the engineering context: students must prioritise experiments instead of relying on unlimited trial and error.

Because free-tier availability can vary, Colab access alone is not the formal fairness mechanism. SlopU provides every enrolled student with up to **USD 50 of course-managed RunPod credit for each project** as the guaranteed fallback. This is a fictional teaching-credit arrangement for the SlopU course and does not require students to purchase a subscription or enter a personal payment card. The credit provides access, not extra assessment compute: Colab, RunPod, paid Colab, and private hardware all remain subject to the same `budget.json` ceiling.

### Data and evaluation integrity

- Course evaluation material is strictly excluded from training, validation, retrieval, tokenizer construction, synthetic-data seeding, sampler tuning, checkpoint selection, and manual output editing.
- Story data is split at the complete-story or document level, not by randomly separating token windows from the same story.
- Any additional data must be declared with its source, licence, processing, quantity, and intended purpose.
- Target-style literature must use material that the course is permitted to redistribute or use, such as verified public-domain editions.
- Students must discuss filtering, duplication, contamination, and important distribution differences.

The Project 1 repository supplies a cleaned basic story corpus suitable for narrative pre-training. Project 2 supplies processed, verified public-domain editions of *Grimm's Fairy Tales* and *One Thousand and One Nights*. Versioned splits, provenance, licences, checksums, and preprocessing scripts are included. Students may supplement or replace these corpora with permitted data when they can justify the choice and accept its licensing, preprocessing, contamination, compute, and performance consequences. Extra data earns no automatic credit.

### Shared evaluation protocol

Every project releases two clearly separated public resources:

1. **Five development examples with ground truth.** Each includes a prompt and reference continuation or answer. Students use these to run the complete evaluation pipeline, inspect samples, and support clearly labelled qualitative analysis. They do not determine the official model mark.
2. **Ten tutor-evaluation prompts.** The prompts are public, but their ground-truth continuations or answers are withheld. Each entry is one string: a truncated story prefix for Projects 1 and 2, the relevant narrative input for Project 3 Track A, or the task input for Project 3 Track B. Tutors evaluate the frozen submission on all ten.

The repository includes a pre-training validation script that checks proposed training data for exact matches and likely near-duplicate overlap with the released evaluation prompts. Students must run it before training, retain its output, and resolve or report flagged cases. The script supports due diligence; it does not replace provenance analysis or make contaminated data permissible.

Official perplexity is **continuation- or answer-only**: prompt tokens condition the model but do not contribute to scored negative log-likelihood. Losses are pooled over the ten tutor items before exponentiation. To preserve the fixed thresholds when a student changes tokenizer, the official score is reference-token-normalised:

\[
P = \exp\left(\frac{\sum_i \operatorname{NLL}_i}{\sum_i N_i^{\mathrm{ref}}}\right),
\]

where \(N_i^{\mathrm{ref}}\) is the ground-truth target length under the published course reference tokenizer. For the default tokenizer this is ordinary continuation-only perplexity. Students using another tokenizer should additionally report BPB as a diagnostic.

If the submitted-model component is worth \(M\) marks, its PPL portion is:

\[
S_{\mathrm{PPL}} = \frac{2M}{3}
\begin{cases}
1, & P \le 25,\\
\exp[-0.1(P-25)], & 25 < P < 50,\\
0, & P \ge 50.
\end{cases}
\]

Thus PPL contributes 6⅔ of 10 model marks in Projects 1 and 3, and 10 of 15 model marks in Project 2. The remaining one third is task-specific performance: narrative continuation quality in Project 1; target behaviour, story quality, and retention in Project 2; and the chosen specialist capability in Project 3. For orientation, \(P=35\) retains about 36.8% of the available PPL marks and \(P=45\) retains about 13.5%. Calculations retain full precision until the project total is recorded. No single automatic metric is treated as a complete measure of model quality.

Task-specific performance now uses a common published 0–4 anchor scale. Three trained, independent raters review every story-based tutor output without student, method, or mark information. A fourth blind rater adjudicates a dimension when the original ratings span three or more points; the final item value is the median of the valid ratings. Project-specific dimension weights distinguish prompt connection, narrative quality, target behaviour, robustness, constraint satisfaction, generalisation, retention, and integrity as appropriate. Automatically verifiable Project 3 dimensions use the published evaluator rather than subjective preference: an incorrect arithmetic answer or invalid required format cannot be overridden by a human rating. The complete anchors, weights, aggregation rule, and privacy wording are canonical in `CONTENT_SOURCE.md`.

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

The model package, logs, and compute ledger are stored with the frozen GitLab/Hugging Face submission rather than uploaded as additional portal attachments. The portal remains deliberately small: one report upload and one final GitLab commit SHA. The frozen GitLab revision's `submission-manifest.json` identifies the assigned private Hugging Face repository and exact model revision. Students grant repository access through the SlopU Hugging Face organisation; they never paste an access token into the portal or course site.

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

The report format is the supplied two-column CVPR LaTeX template, which can be edited in Overleaf or a local LaTeX environment. Main-paper limits are 15 pages for Project 1 and 20 pages each for Projects 2 and 3. References and appendix are excluded from these limits. Project 1 is due 21 March 2027, Project 2 is due 25 April 2027, and Project 3 is due 23 May 2027; all deadlines are 23:59 AET.

## Assessment-page resource design

The full task, constraints, deliverables, evaluation summary, rubric, and submission instructions are rendered directly on each assessment page. Downloadable files are supporting resources rather than the only place where essential requirements appear.

To keep the pages focused, every Project page presents exactly **six primary resource cards** under four labels: **Start here**, **Data and model**, **Evaluate**, and **Submit**. Small configuration files, schemas, examples, ledger templates, packaging instructions, and the AI Assistance Statement example live inside the assigned GitLab repository or a single bundled pack instead of appearing as separate downloads.

### Project 1 resources

| Resource card | Type | Purpose |
| --- | --- | --- |
| **1. Full Project Brief** — `project-1-brief.pdf` | Download | Printable mirror of the complete Project 1 webpage. |
| **2. Project 1 Starter Repository** | Private GitLab link | nanoGPT-based code, default model/configuration, parameter preflight, `budget.json`, preprocessing scripts, compute ledger, submission manifest, and checkpoint packaging guide. |
| **3. CVPR Report Template** — `cvpr-report-template.zip` | Download | Shared two-column LaTeX template for local use or upload to Overleaf, containing the required engineering-report and AI Assistance Statement sections. |
| **4. Narrative Dataset and Data Card** | Hugging Face link | Course basic story corpus, versioned split, licence/provenance record, checksums, and reproducible preprocessing description. |
| **5. Pre-training Colab** — `p1-colab-starter.ipynb` | Download | Supported environment check and an executable path from tokenized data to training, checkpointing, and sampling. |
| **6. Public Evaluation Pack** — `p1-evaluation-kit.zip` | Download | Five development examples with ground truth, ten tutor prompt strings without ground truth, the separation validator, and PPL/BPB, repetition, EOS/stopping, and qualitative-review utilities. |

### Project 2 resources

| Resource card | Type | Purpose |
| --- | --- | --- |
| **1. Full Project Brief** — `project-2-brief.pdf` | Download | Printable mirror of the complete Project 2 webpage. |
| **2. Project 2 Starter Repository** | Private GitLab link | Default checkpoint/configuration, parameter preflight, checkpoint-loading pipeline, `budget.json`, data schemas, compute ledger, submission manifest, and supported continued-pre-training/SFT/preference examples. |
| **3. CVPR Report Template** — `cvpr-report-template.zip` | Download | The same report template used across the course; students begin a new report for Project 2. |
| **4. Target-Style Corpus and Data Card** | Hugging Face link | Processed, verified public-domain editions of *Grimm's Fairy Tales* and *One Thousand and One Nights*, with versioned splits, checksums, and preprocessing records. |
| **5. Post-training Starter Pack** — `p2-post-training-pack.zip` | Download | One Colab notebook plus compact recipes for continued pre-training, SFT, and a toy preference/DPO exercise. |
| **6. Behaviour Evaluation Pack** — `p2-evaluation-kit.zip` | Download | Five development examples with ground truth, ten tutor openings without ground truth, the separation validator, target-style and retention checks, and the blinded human-review rubric. |

### Project 3 resources

| Resource card | Type | Purpose |
| --- | --- | --- |
| **1. Full Project Brief** — `project-3-brief.pdf` | Download | Printable mirror covering the common requirements and both specialisation tracks. |
| **2. Project 3 Starter Repository** | Private GitLab link | Default configurations, parameter preflight, common fine-tuning pipeline, `budget.json`, proposal template, Track A/Track B schemas, Track B `test_pilot`, compute ledger, submission manifest, and packaging guide. |
| **3. CVPR Report Template** — `cvpr-report-template.zip` | Download | Shared report template containing the common Project 3 rubric structure and AI declaration. |
| **4. Fine-tuning Starter Pack** — `p3-finetuning-pack.zip` | Download | Supported SFT Colab, response-only masking checks, example task formats, and baseline comparison commands. |
| **5. Starting Model and Task Data** | Private Hugging Face link | Course narrative fallback for Track A; general-language checkpoint and arithmetic task data for Track B; model/data cards and checkpoint identifiers. Students see only resources for their selected track. |
| **6. Track Evaluation Pack** — `p3-evaluation-kit.zip` | Download | Five track-adapted development examples with ground truth, ten tutor inputs without ground truth, the separation validator, Track A constraint metrics, Track B exact-answer/format checks, and shared regression utilities. |

The CVPR template is stored once and linked from all three pages. Large datasets and checkpoints remain in the course Hugging Face organisation rather than the public course-site repository. Withheld tutor ground truth, clean reserve sets, marking outputs, student submissions, credentials, and personal data never appear in a downloadable pack.

### Publication workflow and resource states

The rendered assessment page is the canonical task statement. The three printable brief PDFs are generated only after their page content is stable, from the same approved content source, and are stored under `public/resources/project-1/`, `project-2/`, and `project-3/`; they are not maintained as a second independent version of the rules. The shared CVPR template is stored once under `public/resources/shared/`. Small notebooks and evaluation packs also live under the relevant project directory, while large datasets, checkpoints, and student-specific repositories remain access-controlled on Hugging Face or GitLab.

During implementation, a resource card must use one of four explicit states:

- **Available** — show a working `Open` or `Download` action;
- **Scheduled** — show `Will be available at <date and time>` and no dead link;
- **Access controlled** — show the release time and explain that SlopU sign-in is required; or
- **Unavailable** — explain the dependency that is still being provisioned and do not invent a URL.

Placeholder `#` links, invented external destinations, and downloadable files whose contents disagree with the webpage are not acceptable. Base-path-safe internal links and the physical existence of every downloadable file are build-time checks.

This ordering lets the implementation agent build accurate page structure and release states first. The three PDF mirrors can then be exported from the completed assessment pages and committed without asking the student author to hand-maintain six copies of the same policy.

### Resource registry and rendering contract

Create one typed registry at `src/data/resource-manifest.ts` and render all assessment resources through one reusable compact list-card component. Do not copy six hard-coded links independently into each page. Every entry contains:

- a stable ID and Project number;
- one of the four approved groups: `Start here`, `Data and model`, `Evaluate`, or `Submit`;
- the exact title, short description, and action label from `CONTENT_SOURCE.md`;
- resource kind (`local-download`, `gitlab`, or `huggingface`);
- release time and state;
- an optional relative local path or verified external destination; and
- file/source metadata needed by the checks.

Store local paths without a leading slash, for example `resources/project-1/project-1-brief.pdf`, and resolve them through Astro's configured base path. A rendered available/access-controlled entry carries stable `data-resource-id`, `data-resource-state`, and `data-resource-kind` attributes for tests. Scheduled and unavailable entries render status text but no anchor. An actionable entry has one keyboard-focusable link, specific action text, and a visible focus state; do not nest a button inside a link or make a raw URL the label.

### Files the implementation agent creates

| Repository path | Required contents |
| --- | --- |
| `public/resources/shared/cvpr-report-template.zip` | One reusable, redistributable LaTeX report template containing `main.tex`, bibliography example, required style/class assets, `README.md`, report headings, and AI Assistance Statement heading. Record the upstream source and licence. |
| `public/resources/project-1/project-1-brief.pdf` | Print-safe mirror of the complete implemented Project 1 page, excluding site navigation and replacing interactive controls with static submission instructions. |
| `public/resources/project-1/p1-colab-starter.ipynb` | Valid notebook containing the environment, parameter-preflight, data, training, evaluation, checkpoint, and sampling path described on the page. |
| `public/resources/project-1/p1-evaluation-kit.zip` | Public README, five development records with ground truth, ten tutor prompt strings without ground truth, separation validator, schemas, and public metrics. |
| `public/resources/project-2/project-2-brief.pdf` | Print-safe mirror of the complete implemented Project 2 page. |
| `public/resources/project-2/p2-post-training-pack.zip` | Valid Colab notebook and compact CPT/SFT/masking/preference examples described on the page. |
| `public/resources/project-2/p2-evaluation-kit.zip` | Public development/tutor records, separation validator, blind-review anchors, retention checks, schemas, and README. |
| `public/resources/project-3/project-3-brief.pdf` | Print-safe mirror of the complete implemented Project 3 page, including both tracks. |
| `public/resources/project-3/p3-finetuning-pack.zip` | Valid SFT notebook, masking checks, example Track A/B records, verifier examples, and baseline commands. |
| `public/resources/project-3/p3-evaluation-kit.zip` | Public track-adapted records, separation validator, Track A constraint checks, Track B exact-answer/format checks, regression utilities, schemas, and README. |

The brief PDFs are generated last from the implemented canonical pages. The template, notebooks, and packs may be built while the pages are implemented, but they must be real, internally consistent files rather than empty demonstrations. Do not include hidden tutor answers, clean reserve cases, credentials, student data, or an HF token in any archive.

Add reproducible `resources:build` and non-mutating `resources:check` package scripts. `pnpm resources:build` creates or refreshes the local template/notebook/archive files and, after the assessment routes exist, renders the three print PDFs from the built pages. `pnpm resources:check` validates the tracked outputs without rewriting them and is included in the repository's full check path. Every ZIP contains a short `README.md` and `RESOURCE_MANIFEST.json` stating its title, version, generated/source files, licence information, and intentionally excluded private material.

### Resource production sequence

1. Copy the approved title, short description, grouping, and action text from `CONTENT_SOURCE.md` into the typed registry.
2. Render all entries initially as `Scheduled` or `Unavailable`; no placeholder href is permitted.
3. Create and validate the shared template, notebooks, and public packs at the exact paths above.
4. Change a local entry to `Available` only after its file exists and passes format checks.
5. Add a GitLab or Hugging Face destination only when it is real and access-controlled; otherwise retain the release-state copy.
6. Complete the assessment pages and print stylesheet, then generate the three PDF mirrors and enable their entries.
7. Run course, resource, link, accessibility, and browser-download checks before handoff.

## Project 1 — Build a Narrative Base Model

**Weight:** 20%

### Task

Train a decoder-only language model from scratch that can continue an incomplete story with recognisably narrative language. Given a story prefix of variable length, the model should produce a continuation that is locally coherent, reasonably fluent, connected to the supplied context, and capable of ending at a sensible point.

This is a narrative-domain base model rather than a claim to broad, general-purpose language ability. It becomes a foundation for later storytelling work.

### Test design

The five development prompts and ten tutor-evaluation prompts are authentic prefixes truncated from complete held-out stories, not isolated sentences written only for testing. They contain varied prefix lengths and narrative styles while remaining within the announced story domain. Development examples include their original continuations; tutor ground truth is withheld.

The original continuation is a reference text for continuation-only PPL, not the only acceptable story. Students are not expected to reproduce it. The task-specific review asks whether the generated text is a plausible continuation of the prefix.

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

The shared PPL rule determines two thirds of the submitted-model component. The remaining third uses blinded story-quality review. N-gram overlap with the original continuation is not treated as a sufficient measure of correctness because many different continuations may be valid.

## Project 2 — Give the Model a Voice

**Weight:** 50%

### Task

Starting from either the student's frozen Project 1 submission or the course narrative fallback checkpoint, post-train the model to produce stories with a recognisable target narrative style. The supplied target corpora are processed, verified public-domain editions of *Grimm's Fairy Tales* and *One Thousand and One Nights*. Students may use one or both, or justify a permitted supplement or replacement.

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
- blinded qualitative comparison on the ten public tutor openings, using withheld continuations and de-identified outputs.

Target-domain perplexity is evidence of distributional adaptation, not by itself proof of coherent storytelling or successful style control.

Project 2 carries the largest weight because it requires the most complete integration of data design, post-training strategy, multi-objective evaluation, regression analysis, and engineering judgement.

## Project 3 — Build a Specialist

**Weight:** 30%

### Task

Choose one of two specialisation tracks. Define a specific target behaviour, fine-tune an appropriate starting checkpoint, and demonstrate through controlled evaluation whether the model acquired that behaviour without unacceptable regressions.

Both tracks use the same common assessment principles, parameter limit, compute policy, submission package, and expectation of held-out evaluation. Scores are not compared directly across tracks because their task metrics have different meanings.

### Track A — Narrative Specialist

Continue from either the student's frozen Project 1 narrative model, the student's frozen Project 2 post-trained model, or the course narrative fallback checkpoint, and add at least one specific, testable capability. The starting checkpoint must be declared and justified. Using the course fallback carries no mark penalty.

Project 3 does not require students to inherit Project 2 because a target fairy-tale style is not the principal objective of task specialisation. A student may nevertheless continue from Project 2 when retaining that style is useful. In that case, the inherited style is treated as a pre-existing characteristic to monitor, not as the new Project 3 capability.

Supported examples include:

- integrating specified vocabulary naturally into a continuation;
- completing a short story under one or two explicit conditions;
- producing a specified broad ending type; or
- detecting simple factual contradictions in a short story.

Students may propose an alternative of comparable scope. A self-designed task must be approved before substantial training begins and must have a feasible held-out evaluation.

The approval mechanism is now fixed. Supported Track A examples require no extra approval. An alternative uses the one-page `proposal.md` template and is submitted by the end of Week 9. It specifies one target behaviour, starting checkpoint, data and provenance, held-out evaluation, unchanged-model baseline, controlled comparison, regression check, compute plan, and task-specific risks. The convenor responds within two teaching days with approved, revise, or out of scope. Before approval, only preparation and a pipeline dry-run of at most 0.5 T4-equivalent GPU-hours are permitted; this use still counts toward the Project 3 budget. Approval establishes assessability and comparable scope, not method correctness or likely marks. The exact student-facing date and workflow are in `CONTENT_SOURCE.md`.

One well-investigated primary function is sufficient. Adding more functions does not by itself earn more credit.

Pure post-processing or hard-coded decoding is not sufficient as the only specialisation method. If constrained decoding is used, the report must distinguish behaviour learned by the model from behaviour enforced at generation time.

### Track B — Arithmetic Reasoning Specialist

Start from the course-provided checkpoint with broader general-language pre-training and specialise it for arithmetic and arithmetic word-problem answering. The supplied model satisfies the shared model-size rule.

The fixed task family includes:

- ordinary arithmetic operations;
- direct numerical questions; and
- short application problems that require both textual interpretation and arithmetic calculation.

The Project 3 repository's `test_pilot` file publishes the exact prompt/answer schema, supported operations and value ranges, required output format, representative wording, and difficulty range. Formal items use different values and phrasing while remaining within that scope. The course also publishes five worked development examples and ten tutor-evaluation inputs; tutor answers and selected clean reserve cases remain private.

Supervised instruction fine-tuning is the supported baseline. Students may train the model to produce a short rationale or chain-of-thought-style response, but final-answer accuracy, format validity, and generalisation remain primary evidence. Testing new instances or templates from a trained task family is described as held-out generalisation rather than strict zero-shot task performance.

### Optional preference optimisation

Preference-based methods, including DPO or a genuine RLHF-style pipeline, are optional extensions rather than requirements. Students choosing one must first establish an SFT baseline and make a controlled comparison. Use of a more complex method receives no automatic credit without evidence that its additional data and compute improved the stated target.

Work without actual human preference labels must not be represented as full RLHF.

### Starting-checkpoint declaration and verification

Students declare the selected starting checkpoint in the report and submission manifest. When an earlier personal submission is used, the marker checks its frozen Hugging Face revision, learned-parameter count, tensor shapes, and checksum against the checkpoint submitted for the earlier project. A renamed or later-modified checkpoint is not treated as the same starting model merely because its file size matches. Project 3 Track B always begins from the course general-language checkpoint.

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

The two tracks share the 30-mark rubric in `CONTENT_SOURCE.md`, centred on task definition, data and evaluation design, implementation and reproducibility, controlled evidence, final capability, generalisation, regression analysis, and reflection. Scores are not compared across tracks.

## Twelve-week teaching plan

### Home-page information architecture and wayfinding

The Home page uses progressive disclosure. After the Hero, the approved **What you will do** and **Who this is for** sections first establish the activity and expected background. They appear side by side at wide viewports and stack in that order on mobile. The three linked Project cards then explain the four-week engineering stages, weights and deadlines. A twelve-week learning path beneath them answers the more immediate question, “What do I need to do this week?” without duplicating the detailed syllabus.

Each Project card has one assessment destination and may act as one large link. Each Week card has distinct lecture and session destinations, and Weeks 4, 8 and 12 also link their due milestone; therefore Week cards must use separately labelled links rather than a nested or ambiguous whole-card link. Group the cards into Weeks 1–4, 5–8 and 9–12, insert the 5–11 April break as a full-width separator, use two chronological columns at wide viewports, and collapse to one column on mobile.

Every teaching week has a real session entry. Home must preserve the approved mapping: guided sessions in Weeks 1/4/5/8/9/12, formal labs in Weeks 2/6/10, and drop-in clinics in Weeks 3/7/11. Render Home and the Schedule page from the same typed week metadata or content-collection-derived registry, with dates and deadlines sourced from `course-config.ts`. Do not maintain a second hand-written Home schedule array. The Home cards omit full summaries, preparation, readings and activity steps; those remain on the linked pages.

The semester is organised as three four-week blocks. Each block builds the knowledge and tools needed for its project, with the project due at the end of the fourth week. The supplied lecture materials on LLM foundations, scaling, post-training, and reasoning provide the knowledge base, but the teaching sequence below reorganises that material around student decisions and project deadlines.

Each lecture has three layers:

1. **mechanism** — what the model, data pipeline, or training method is doing;
2. **engineering evidence** — what public model reports and research results reveal, omit, or leave uncertain; and
3. **decision transfer** — which part of the idea can reasonably inform a 32M-parameter experiment, and which claim may not transfer across scale.

### Source-deck coverage and selection

| Supplied material | Where it enters the course | Deliberate scope decision |
| --- | --- | --- |
| **LLM basics** | Weeks 1–2 for the sequence-probability objective, n-gram intuition, maximum likelihood, cross-entropy, Transformer families, causal attention, decoder blocks, generation, KV caching, GPT-style pre-training, and PPL; Week 4 revisits generation and metric limits; Weeks 5–6 take its instruction-tuning bridge forward. | Encoder and encoder–decoder material is comparative context. The course operates a decoder-only model. Historical GPT examples establish the pre-train/transfer shift, but model trivia is not assessed. |
| **LLM scaling** | Week 3 receives the complete planning thread: frontier training cost as motivation; \(N,D,C\); power-law regimes; Kaplan and Chinchilla; early stopping; data quality, diversity and filtering; Phi/TinyStories-style small-model evidence; staged data practice. Week 12 returns to emergence claims and cross-scale transfer. | Published ratios and exponents are not copied into a 32M recipe. Qwen/Phi examples are case studies in data and staged training, not architectures students must reproduce. Current-model tables are refreshed before delivery. |
| **LLM post-training** | Week 5 maps base behaviour to continued pre-training, SFT, and preferences; Week 6 covers schemas, response-only SFT, synthetic data, scaling and phrasing sensitivity; Week 7 covers Bradley–Terry reward modelling, RLHF, policy-gradient/KL intuition, RLAIF, DPO, and reward hacking; Week 8 evaluates behaviour and regression. | Students directly operate continued pre-training and SFT. A small DPO-style exercise is supported. Full PPO-scale RLHF remains conceptual because compulsory reproduction would be costly, unstable, and easy to misrepresent without real human labels. |
| **LLM reasoning** | Week 9 covers intermediate tokens, candidate sampling, CoT, self-consistency and final-answer verification; Week 10 covers rationale/task SFT, curriculum, starting checkpoints and verifier-first design; Week 11 covers outcome/process supervision, automated process labels, verifiable rewards, GRPO/RLVR context, generalisation and ablation; Week 12 covers inference cost and open transfer limits. | Direct-answer/rationale SFT, sampling and rule verification fit Project 3B. STaR, reward models, OmegaPRM, GRPO, RLVR and inference-time scaling explain the modern method family, but are optional frontier context rather than required implementations. |

The full student-facing lecture summaries, learning outcomes, section copy, readings, weekly actions, three lab specifications, three clinic specifications, six guided-session specifications, and the first complete deck are canonical in `CONTENT_SOURCE.md`. The implementation agent may adapt that copy into the starter's content collections, but it must not invent a parallel curriculum from the outline alone. Each implemented deck also carries a compact source register for papers, figures, licences, and update dates.

### Weekly visual system

Every lecture page begins with one consistent wide banner below its week/title metadata and above the summary. The reference is the supplied Canvas-style example: a restrained, landscape image creates a recognisable start to the week without competing with the teaching text. Use an approximately 3:1 crop on desktop, a consistent visual height with `object-fit: cover`, and a responsive crop that preserves the subject on narrow screens. The implementation must remain complete if an image fails to load.

The implementation agent searches for an image around the single most representative concept for that week. Preference order is: an original figure from a cited paper or author project page; an openly licensed technical illustration; then an openly licensed photograph or abstract computational image. Do not use an attractive image merely because it contains robots, brains, or glowing code. A concept diagram that communicates content is informative and requires descriptive alt text and a visible caption; a genuinely decorative photograph may use empty alt text but still requires a source credit.

| Week | Search concept and intended visual signal |
| ---: | --- |
| 1 | next-token probability over a token sequence; text becoming a probability distribution |
| 2 | causal self-attention or decoder-only Transformer information flow |
| 3 | scaling curves or an iso-compute model/data allocation landscape |
| 4 | checkpoint evaluation, decoding branches, or automatic-plus-human review |
| 5 | transition from a base model to post-trained target behaviour |
| 6 | instruction/response tokens with response-only loss masking |
| 7 | pairwise preferences, DPO, or the policy–reward–reference relationship |
| 8 | multi-objective evaluation, retention, and target-behaviour trade-offs |
| 9 | chain-of-thought candidates, self-consistency, and answer verification |
| 10 | task-specific fine-tuning data flowing through a verifier |
| 11 | template shift, generalisation slices, ablation, and regression testing |
| 12 | reproducibility chain from data and code revisions to a loadable checkpoint |

For every selected image, record the original URL, title/creator, licence or reuse basis, access date, required attribution, crop or edit, alt text, and caption in a compact asset register committed with the site. Download the selected asset into the repository rather than hotlinking it. Images must be compressed to an appropriate web format and checked at both 1920×1080 and 390×844. The default starter artwork and social preview are replaced with a course-specific asset or a deliberate typography-only alternative; unfinished template artwork must not ship.

### Knowledge allocation check

The sequencing follows prerequisite and application relationships rather than the source-file order:

| Knowledge cluster | Placement | Why it belongs there |
| --- | --- | --- |
| Probability of text, next-token targets, MLE/NLL, cross-entropy, PPL, n-gram limitations | Week 1 | Students must understand the objective and split before interpreting either architecture or a loss curve. |
| Transformer families, causal masking, attention, FFN, residual/pre-norm, embeddings/head, generation and KV cache | Week 2 | These mechanisms determine the legal model configuration used in the first formal lab. KV cache is clearly labelled inference-only. |
| Scaling laws, \(N,D,C\), compute-optimal allocation, data value, optimisation schedules and pilot diagnosis | Week 3 | This is the last point at which scaling evidence can still change the principal Project 1 run plan. |
| Hold-out, contamination, checkpoint selection, decoding, human review and reproducible packaging | Week 4 | Students evaluate and submit; no new training method is introduced in a deadline week. |
| Why post-training; CPT/SFT/preference method selection; operational target behaviour | Week 5 | Project 2 needs a decision framework before students format data or spend compute. |
| Instruction schemas, loss masks, task diversity, synthetic data, prompt sensitivity and overwriting | Week 6 | These are directly inspectable in the second formal lab and form the safest small-model post-training baseline. |
| Pairwise labels, reward models, RLHF, PPO intuition, KL control, RLAIF, DPO and reward hacking | Week 7 | Preference learning builds on SFT and is timed early enough for a justified small experiment, but after students have a working baseline. |
| Behavioural anchors, blind A/B review, paraphrase robustness, copying, retention and multi-objective selection | Week 8 | The deadline lecture consolidates evaluation rather than encouraging a late additional training stage. |
| Reasoning tokens, CoT, candidate generation, self-consistency and verification | Week 9 | Students can use these techniques to define the Track B baseline and proposal before training. |
| Task/rationale SFT, curriculum, split integrity, adaptation method and regression contract | Week 10 | These are the minimum mechanisms required to leave Lab 3 with a working specialist pipeline. |
| Generalisation slices, outcome/process supervision, automated labels, RLVR/GRPO context and ablation | Week 11 | The concepts explain current reasoning methods while the assessed action stays achievable: one controlled comparison plus regression test. |
| Artifact audit, reproducibility, scale-transfer limits, emergence caveats and engineering retrospective | Week 12 | Students close the evidence chain and qualify any analogy from a 32M experiment to frontier systems. |

### Source-slide coverage ledger

This ledger records the disposition of every substantive source-deck segment. Repeated animation slides are treated as one concept; housekeeping, the source course's unrelated diffusion schedule, screenshots without stable evidence, and the old mini-project marking details are not imported.

| Source pages | Knowledge in the supplied slides | Course disposition |
| --- | --- | --- |
| **LLM basics 2–14** | self-attention, causal masking, encoder/encoder–decoder/decoder-only comparison, autoregressive steps, KV cache, attention/FFN/residual/normalisation blocks | Core in Week 2; encoder families are comparison, KV cache is inference context, and the decoder block drives Lab 1. |
| **LLM basics 15–33** | probability of text, conditional factorisation, sampling, grammatical/semantic/style roles, maximum likelihood, Markov and n-gram intuition, neural LM objective | Core in Week 1; n-grams are explanatory rather than implemented. Knowledge-repository claims are qualified rather than presented as guaranteed factual storage. |
| **LLM basics 34–46** | decoder generation, why large LMs, GPT-1/2/3 pre-training and transfer, zero/few-shot use, PPL, decoder-only evidence | Objective/generation and PPL in Weeks 1–4; GPT history supports the transition to general pre-training; architecture evidence is optional context in Week 2. |
| **LLM basics 47–56** | chat post-training, instruction tuning, preference alignment, fluency/style strengths, planning/factuality/source-attribution/bias limitations | Previewed at the Stage 1–2 boundary, taught in Weeks 5–8, and used to motivate behavioural evaluation. News screenshots are not used as readings. |
| **LLM basics 57** | older nanoGPT mini-project description | Replaced by the approved Project 1 brief, rubric, public evaluation protocol, parameter boundary, and security rules. |
| **LLM scaling 2–10** | history, frontier model sizes and training cost, larger-model capabilities, emergence claims and measurement critique | Short motivation in Week 3; emergence versus metric artefact returns in Week 12. Volatile tables are refreshed before delivery and not assessed as facts to memorise. |
| **LLM scaling 11–29** | \(N,D,C\), fixed-compute choice, power laws and regions, Kaplan results, shape, curves, sample efficiency, early stopping, batch size, joint model/data limits | Core Week 3 and the complete Week 3 deck. The very large reported critical batch is evidence from its regime, not a starter default. |
| **LLM scaling 30–35** | Chinchilla compute-optimal revision and iso-compute allocation | Core Week 3, explicitly contrasted with Kaplan and bounded by cross-scale caveats. |
| **LLM scaling 36–38** | Phi/TinyStories-style data-quality argument and synthetic textbook data | Week 3 data-value section and optional reading; synthetic provenance and diversity risks are carried into Policies and Week 6. |
| **LLM scaling 39–47** | Qwen model family, multilingual/synthetic data, staged general/reasoning/long-context pre-training, post-training/distillation, filtering trade-offs | Staged-training case study split across Weeks 3, 5, 9 and 12. Detailed frontier architecture/table values remain optional and must be refreshed; students do not reproduce the pipeline. |
| **LLM post-training 4–9** | capabilities of modern models, why pre-training is insufficient, base versus instruction model, post-training goals | Core Week 5 framing. Promotional screenshots are excluded from evidence. |
| **LLM post-training 10–19** | FLAN instruction tuning, task formatting/diversity, Alpaca synthetic data, limitations, task/model scaling, phrasing sensitivity | Core Weeks 5–6 and Lab 2; synthetic-data and robustness limitations reappear in Week 8. |
| **LLM post-training 20–32** | pairwise preferences, InstructGPT/RLHF stages, SFT loss, reward ranking, PPO/KL, scale and reward hacking | Core conceptual thread in Week 7. SFT is operated directly; reward modelling and PPO are interpreted rather than compulsory. |
| **LLM post-training 33–40** | nondifferentiable sampling, policy-gradient intuition, sequence credit, RLAIF and direct-RLAIF | Week 7 conceptual explanation and optional extension. The course distinguishes human from AI labels in both teaching and policy. |
| **LLM post-training 41–46** | DPO assumptions, implicit reward, objective, pipeline, performance evidence | Core Week 7 method comparison and supported toy exercise; any assessed use still requires a valid SFT/reference baseline and preference data. |
| **LLM reasoning 3–19** | reasoning as intermediate tokens, candidate generation, CoT and zero-shot prompts, marginalisation, self-consistency, verification | Core Week 9, with sampling and exact verification transferred directly to Project 3B. Claims about “reasoning” are kept behavioural. |
| **LLM reasoning 20–26** | reasoning scale, GSM8K, outcome verifiers, generator/verifier scaling | Weeks 9–10; GSM8K informs the bounded arithmetic design, while the course's `test_pilot` remains the actual task contract. |
| **LLM reasoning 27–32** | process supervision, PRM800K cost, OmegaPRM/Monte-Carlo automation and policy drift | Week 11 comparison and optional reading; too costly and uncertain for a compulsory 32M implementation. |
| **LLM reasoning 33–40** | verifiable rewards, RLVR, GRPO, advantage baselines, implicit process signal, KL/reference objective | Week 11 frontier context. Students must understand why objective verification changes the signal path, but are not required to implement RL. |
| **LLM reasoning 41–44** | STaR self-training, inference-time scaling, search/evolution examples, RLVR/RLHF tension and open problems | STaR informs Week 10 rationale-data design; inference cost and open transfer limits close Weeks 11–12. Agent/tool and multimodal examples remain optional horizon-setting. |

### Block 1 — Build basic language ability: pre-training from scratch

| Week | Lecture focus | Scheduled learning support | Project connection |
| ---: | --- | --- | --- |
| **1** | **What a language model learns.** Probability over text; next-token prediction; maximum likelihood and cross-entropy; n-gram intuition versus neural language models; train/validation/test roles; perplexity and its limits; the course premise of model–data–compute–time trade-offs. | **Guided session — Project 1 launch and data validation.** Establish the repository, environment, lawful corpus, document-level split, contamination check, and target statement before Lab 1. | Establish a valid data split and write the first Project 1 target-and-budget statement. |
| **2** | **Inside a decoder-only Transformer.** Encoder, encoder–decoder, and decoder-only distinctions; causal masking; self-attention and attention heads; feed-forward layers; residual paths and pre-normalisation; depth, model width, FFN width, head count, vocabulary, and context length; autoregressive generation and the purpose of a KV cache. | **Spend a 32M parameter budget.** Students trace one forward pass and causal mask, use the course parameter checker, then produce two legal architectures with different depth/width allocations. They predict the practical effect of each before running a short smoke test. | Freeze a feasible baseline architecture and identify one affordable architecture comparison. |
| **3** | **Scale, data, and optimisation under fixed compute.** Parameters (N), tokens (D), and training compute (C); power-law intuition; Kaplan- and Chinchilla-style findings and their limits; data quality, diversity, filtering, duplication, and noise; batch size and gradient accumulation; Adam-style optimisation, learning-rate schedules, warm-up, weight decay, dropout, clipping, training steps, and stability signals. | **Project 1 drop-in clinic.** Students bring a legal configuration, token/runtime estimate, curve, trace, or concrete failure; staff help identify the smallest informative next check. | Freeze an internal run plan: hypothesis, controls, stop rule, compute allocation, and expected evidence. |
| **4** | **Evaluation is part of training.** Document-level hold-out and contamination; checkpoint selection; reference-token-normalised PPL and BPB when tokenizers differ; decoding with temperature, top-k, and top-p; repetition and degeneration; EOS learning and stopping; why a reference continuation is not the only correct story; combining automatic and blind human evaluation. | **Guided session — Project 1 evaluation and packaging.** Validate the five development examples, fresh-process checkpoint loading, report evidence, exact revisions, and portal fields. | **Project 1 due Sunday 21 March 2027, 23:59 AET.** |

### Block 2 — Shape model behaviour: post-training

| Week | Lecture focus | Scheduled learning support | Project connection |
| ---: | --- | --- | --- |
| **5** | **Why pre-training is not enough.** Capability versus usable behaviour; base models versus instruction-tuned assistants; target-domain continued pre-training, supervised fine-tuning, and preference-based post-training; what each method supervises; why Project 2 uses a broad definition of post-training. | **Guided session — Project 2 target and baseline planning.** Operationalise the target voice, verify permitted source editions, freeze the unchanged baseline, and cost one viable post-training route. | Define the target voice operationally and shortlist a justified post-training route. |
| **6** | **Instruction data and SFT.** Instruction–response formatting; chat and special-token schemas; response-only loss masking; task count and task diversity; synthetic instruction data and its risks; sensitivity to prompt wording; learning-rate reduction, data mixing, and the risk of overwriting pre-trained behaviour. | **Build and inspect an SFT batch.** Students convert raw examples into a declared schema, visualise which tokens receive loss, train a very small SFT run, probe paraphrased instructions, and compare it with an unmodified starting checkpoint. | Produce a data card, masking check, and pilot result for the chosen Project 2 method. |
| **7** | **Learning from preferences.** Pairwise preferences; reward models and Bradley–Terry ranking; the SFT–reward-model–policy stages of RLHF; policy-gradient intuition and KL control; RLAIF; DPO as direct preference optimisation; reward hacking, distribution shift, and the cost of added complexity. | **Project 2 drop-in clinic.** Students bring an operational target, rendered mask, unchanged/tuned pair, target-versus-retention table, or difficult preference label for evidence-led diagnosis. | Decide whether another post-training stage is affordable and evidentially useful; novelty alone is not a reason to use it. |
| **8** | **Did the behaviour really change?** Operationalising narrative style; held-out target text; blind pairwise judgement; instruction compliance where applicable; memorisation and copying; regression in general narrative ability; multi-objective checkpoint selection; separating target-style perplexity from coherent storytelling. | **Guided session — Project 2 blind evaluation and packaging.** Run the frozen comparison, retention check, source-overlap check, fresh-load audit, and final evidence checklist. | **Project 2 due Sunday 25 April 2027, 23:59 AET.** |

### Block 3 — Adapt for a real problem: task-specific fine-tuning

| Week | Lecture focus | Scheduled learning support | Project connection |
| ---: | --- | --- | --- |
| **9** | **Reasoning as generated behaviour.** Intermediate reasoning tokens; chain-of-thought prompting; why the most likely decoding path need not be the correct path; self-consistency and inference-time compute; final-answer verification; outcome versus process supervision; small-model and benchmark caveats. | **Guided session — Project 3 task contract and baseline.** Choose a track, state the valid input/output contract, configure the verifier, establish the unchanged baseline, and submit an alternative Track A proposal when required. | Choose Track A or B, define one primary capability, and establish the unchanged-model baseline. |
| **10** | **Training a specialist.** Task-specific SFT; choosing a starting checkpoint; examples, counterexamples, and curriculum; full fine-tuning versus parameter-efficient adaptation as an engineering choice; structured outputs and special tokens; Track A narrative constraints and Track B bounded reasoning formats. | **Specialist pipeline studio.** Students create a small train/validation split, inspect target masking, perform a dry run, and test one unseen template or condition. Each student leaves with a loadable checkpoint and a working task metric before spending the main budget. | Project 3 proposal checkpoint: target, starting model, data, metric, regression check, comparison, and budget. |
| **11** | **Generalisation, regressions, and explanations.** Paraphrase and template shift; catastrophic forgetting and capability retention; ablations and matched comparisons; error taxonomies; outcome/process supervision and verifiable-reward context; why a change can fail at another scale; deeper postgraduate expectations for alternative explanations. | **Project 3 drop-in clinic.** Students bring verifier output, a shifted-slice result, controlled ablation, error taxonomy, regression result, or fresh-load failure. | Freeze the candidate final checkpoint and identify any unsupported claim that must be removed or qualified. |
| **12** | **Audit the whole training system.** Reproducibility; checkpoint, configuration, tokenizer, and sampler compatibility; training and inference cost; honest comparison with a baseline; limits of scaling small experiments to frontier systems; reviewing the course premise through public model case studies and student evidence. | **Guided session — Project 3 fresh-load audit and submission.** Reproduce the checkpoint in a clean process, rerun the verifier and regression slice, reconcile revisions and checksums, and complete the portal checklist. | **Project 3 due Sunday 23 May 2027, 23:59 AET.** |

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

The starter requires one session entry for every teaching week. The course therefore uses **twelve session entries** without pretending that all twelve should be full practical classes: **three formal labs** in Weeks 2, 6 and 10; **three evidence-led drop-in clinics** in Weeks 3, 7 and 11; and **six lightweight guided sessions** in Weeks 1, 4, 5, 8, 9 and 12. Each guided session is a 35–60 minute self-directed launch, validation, evaluation, or packaging activity tied directly to the current project.

This cadence preserves the intended three project cycles. Students launch and scope the project, operate its central pipeline in a deep lab, bring project evidence to a clinic, and then complete a bounded evaluation/submission audit. The six lightweight sessions satisfy the site's week-by-week structure while smoothing transitions; they do not create six extra graded exercises or introduce new techniques during deadline weeks.

Labs are ungraded and exist to make the lecture mechanisms operable before students depend on them in an assessment. They do not ask students to train another full model. Each lab uses a bounded supplied notebook, small data, and a short run suitable for the supported Colab environment.

Every lab follows the same student-facing pattern:

1. **Read it:** identify the relevant model, data, training, and evaluation choice.
2. **Run it:** complete a working core exercise with supplied defaults.
3. **Inspect it:** examine a tensor, mask, curve, output sample, or failure rather than trusting a final score.
4. **Change one thing:** make one controlled modification and compare it with the baseline.
5. **Transfer it:** record what the result would and would not justify changing in the current project.

The core path is shared by undergraduate and postgraduate students. Optional investigation prompts ask postgraduate students, and any interested undergraduate students, to test mechanisms or alternative explanations more deeply without withholding essential assignment preparation from the core path.

The three labs are **Spend a 32M Parameter Budget**, **Build and Inspect a Post-Training Batch**, and **Train and Verify a Specialist**. Together they cover causal targets, architecture budgeting, parameter preflight, SFT schemas and masking, verifier-first task design, controlled comparison, regression checks, and reproducible loading. The clinics do not introduce another notebook: students bring a configuration, curve, output pair, comparison, verifier result, or concrete failure from their project and leave with the smallest defensible next action. De-identified common-issue notes replace a fictional “solution” to student-specific project choices.

## People and support roles

The following teaching-team structure, contact routing, and consultation schedule are approved for the course site. The complete student-facing wording is canonical in `CONTENT_SOURCE.md`.

### Dr Yiwei Easton — Course Convenor and Lecturer

Yiwei teaches language-model training at the intersection of machine learning, empirical evaluation, and resource-aware systems. Their interests include how architecture, data quality, optimisation, post-training, and evaluation interact when the apparent best method cannot simply be scaled without limit.

- **Teaching role:** lectures, assessment design, Project 3 alternative-task approvals, interpretation of course policy, and the weekly Frontier Note where relevant.
- **Contact:** `llm-training@slopu.edu.au` for ordinary course questions; `yiwei.easton@slopu.edu.au` for personal or confidential matters; the course forum for questions useful to the cohort.
- **Consultation:** Tuesdays, 14:00–15:00 AET, Room 4.21, Model Systems Building, with simultaneous Zoom access. No booking is required.

### Maya Rao — Teaching Fellow and Technical Tutor

Maya runs the practical labs and model clinics, with a focus on PyTorch, dataset pipelines, training diagnostics, checkpoint loading, and reproducible evaluation.

- **Teaching role:** lab facilitation, technical debugging, starter-platform guidance, and formative feedback on whether an experiment is well controlled.
- **Boundary:** technical support may help students locate and understand a fault, but will not choose an assessed architecture, training recipe, or report conclusion for them.
- **Contact:** the `Technical help` area of the course forum; `maya.rao@slopu.edu.au` for individual access issues.
- **Consultation:** Thursdays, 16:00–17:00 AET, Compute Commons 2.14, plus the scheduled online project clinics on Monday, 15:00–16:00 AET, during Weeks 3, 7, and 11.

### Eli Morgan — Compute Steward

The Compute Steward protects the fairness and operability of the constrained-training environment.

- **Operational role:** maintain the reference Colab notebook and parameter checker; publish baseline runtime estimates; clarify compute accounting; record widespread platform outages; and coordinate the approved fallback environment.
- **Boundary:** the steward verifies resource use and platform behaviour but does not judge the scientific merit of a student's chosen experiment or provide advance grading advice.
- **Contact:** `compute@slopu.edu.au`; urgent cohort-wide incidents are posted on the course status channel.
- **Consultation:** Fridays, 11:00–12:00 AET, online through the course site.

A separate Frontier Editor is not included because Frontier Notes are deliberately small and remain the lecturer's responsibility. The Compute Steward is retained because equitable access and budget accounting are central to the course rather than incidental infrastructure.

## Student-facing Policies page

The final student-facing wording is now held in `CONTENT_SOURCE.md` at the level required for `src/pages/policies/index.mdx`. It may be split into short on-page sections without changing the rules. Course-authored site and teaching material uses the **Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International** licence unless a resource states otherwise; third-party material retains its own licence and attribution requirements.

### 1. Compute allocation

Google Colab Free is the recommended starting environment. Its interruptions and limited availability are part of the course's budget-engineering setting, but no student is required to rely on an uncertain free service to complete assessed work.

For each project, SlopU provides every enrolled student with up to **USD 50 of course-managed RunPod credit**. This guaranteed fallback is supplied without a personal subscription or payment card. It may be used when Colab is unavailable, when a reproducible final run needs a stable instance, or when the student decides that predictable runtime is worth part of the project budget.

The monetary credit and the assessed compute allowance are different limits:

- the credit determines how much fallback infrastructure SlopU will fund;
- the `budget.json` defines the maximum assessed computation: Project 1 permits 24 T4-equivalent GPU-hours and \(4.0\times10^{17}\) training FLOPs; Project 2 permits 18 hours and \(2.5\times10^{17}\) FLOPs; Project 3 permits 12 hours and \(1.5\times10^{17}\) FLOPs;
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

Students are encouraged to locate and process additional data when it supports a clear hypothesis:

- **Hugging Face datasets** may be used when the dataset card states a licence compatible with the project. A dataset's presence on the Hub is not by itself evidence of permission.
- **Openly licensed or public-domain books** may be used with the edition, source, and public-domain or licence basis recorded.
- **Existing public web corpora** with documented provenance are preferred to a new crawl because they are easier to licence, reproduce, and audit.
- **Direct web crawling** is allowed only for public pages whose terms and access rules permit it. Students must honour `robots.txt`, use a reasonable request rate, avoid login-gated or paywalled pages, collect no personal or sensitive information, and obtain written course approval before a large crawl. A list of domains, collection dates, and the crawler/preprocessing code must be submitted.
- **Synthetic or AI-filtered data** must name the generator or judge, version where known, prompt or filtering procedure, quantity, and validation method. It cannot be described as human-authored or human-labelled.

The teaching team may reject a source whose licence, privacy risk, or provenance cannot be established. Extra data receives no automatic credit; its value must be demonstrated against its processing and compute cost.

### 3. Evaluation-set contamination

Each project supplies five public development examples with ground truth and ten public tutor-evaluation prompts whose ground truth is withheld. All fifteen items are assessment material, separated from permitted corpora at document, story, or task-template level as appropriate. The five development examples support pipeline testing and report analysis; they are not permission to tune against the formal evaluation distribution.

Released prompts, development ground truth, withheld tutor ground truth, and clean reserve cases must not be used for training, validation, retrieval, tokenizer construction, filtering, prompt-template design, synthetic-data seeding, sampler tuning, checkpoint selection, or manual editing. Students must not reconstruct source continuations, search for the withheld answers, or attempt to obtain private material from staff, peers, repository history, network requests, or the marking harness.

Before training, students must run the supplied exact- and near-duplicate separation validator on their proposed data and retain its report. If a student discovers likely overlap or encounters material they believe belongs to the withheld or reserve set, they must stop using it and email `llm-training@slopu.edu.au`. Prompt disclosure made promptly and in good faith will be handled as a contamination incident, not concealed misconduct. The teaching team may remove affected items or evaluate the checkpoint on a clean reserve set.

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

| Project | Panel opens | Due | Required report filename |
| --- | --- | --- | --- |
| Project 1 | Monday 1 March 2027, 00:00 AET — start of Week 2 | Sunday 21 March 2027, 23:59 AET | `ass1_report.pdf` |
| Project 2 | Monday 22 March 2027, 00:00 AET — start of Week 5 | Sunday 25 April 2027, 23:59 AET | `ass2_report.pdf` |
| Project 3 | Monday 26 April 2027, 00:00 AET — start of Week 9 | Sunday 23 May 2027, 23:59 AET | `ass3_report.pdf` |

Before its opening time, a panel displays **Will be available at `<opening time>`** and no active submission control. Once open, an authenticated portal with no recorded attempt displays **To be submitted**. After a successful submission it displays **Submitted**, the receipt timestamp, and the frozen identifiers recorded for marking. The static course site can display schedule-driven availability and the portal link, but only the authenticated portal can display a student's personal `To be submitted` or `Submitted` state.

The portal collects only:

1. the named PDF report upload, whose first page includes the student's name and student ID; and
2. the final GitLab commit SHA.

The GitLab revision is the canonical submission pointer. Its `submission-manifest.json` records the assigned private Hugging Face repository ID, exact frozen model revision, checkpoint checksum, and `compute-ledger.json` path. The ledger must be present in the frozen GitLab revision and final Hugging Face model package, and its summary must appear in the report.

Before the deadline, students must:

1. push the final code, configuration, preprocessing scripts, and evaluation commands to the default branch of their assigned private GitLab repository;
2. record the final Git commit SHA;
3. upload the model package to the private Hugging Face model repository provisioned for that student and project inside the SlopU organisation;
4. verify that the course marking service account can read the exact submitted Hugging Face revision; and
5. submit the correctly named CVPR-format report PDF and final GitLab commit SHA through the project submission panel.

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
- Formal lab notebooks are published on Monday of Weeks 2, 6, and 10. Lab attendance is optional, although strongly recommended before changing the relevant project pipeline.
- Formal lab solutions are released after the final scheduled class for that lab. Drop-in clinics in Weeks 3, 7, and 11 have no model solution; de-identified common-issue notes are posted after the session.
- Lightweight guided sessions in Weeks 1, 4, 5, 8, 9, and 12 release with the corresponding weekly page. They use immediate self-checks or packaging checklists rather than delayed model solutions.
- Each project release produces a site announcement, and the site displays a reminder before its deadline.
- Materials use selectable text, meaningful heading order, alt text for informative images, labelled links, keyboard-accessible controls, and colour choices that do not carry meaning alone. Code and slide downloads provide an alternative to the live presentation view.
- Students with an approved accessibility adjustment receive materials, timing changes, or an alternative participation route according to that plan without needing to disclose personal details to the class.
- General questions go to the course forum or `llm-training@slopu.edu.au`; technical environment problems go to `compute@slopu.edu.au`; personal matters may go to `yiwei.easton@slopu.edu.au`.

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
- each assessment page exposes exactly six primary resource cards, including its full brief, assigned GitLab repository, and CVPR report template;
- the three weights remain 20%, 50%, and 30%, totalling 100%;
- the report/model allocations remain 10/10, 35/15, and 20/10;
- the 32M design target, 33.6M hard boundary, and preflight check are stated consistently;
- the compute limits remain 24/18/12 T4-equivalent GPU-hours with training-FLOP ceilings of \(4.0\times10^{17}\), \(2.5\times10^{17}\), and \(1.5\times10^{17}\);
- the report limits remain 15/20/20 pages, excluding references and appendix, and the CVPR template is identified as Overleaf-compatible LaTeX;
- Project 3 Track B remains arithmetic and arithmetic word-problem answering with its scope defined by `test_pilot`;
- Project 2 and Project 3A expose the course narrative fallback, and use of a student's earlier checkpoint requires frozen-revision and checksum verification;
- every evaluation page states five development examples, ten tutor prompts, continuation- or answer-only scoring, \(\lambda=0.1\), and the 25/50 PPL thresholds;
- task-specific model review retains the published 0–4 anchors, project/track dimension weights, three independent raters for story-based outputs, and adjudication rule;
- the Project 3 page states that supported Track A tasks need no separate approval and that alternative proposals are due at the end of Week 9 before substantial training;
- no page asks a student to submit or paste an HF token;
- each assessment panel uses the correct opening time, deadline, and `ass1_report.pdf`/`ass2_report.pdf`/`ass3_report.pdf` filename;
- every assessment lists only a report upload and GitLab commit SHA as portal fields, while `submission-manifest.json` carries the assigned HF repository ID, frozen model revision, checksum, and compute-ledger path;
- personal submission status is never faked on the static site: the authenticated portal owns `To be submitted` and `Submitted`;
- Week 1–12 lecture links, all twelve week-numbered session entries, and the three due-week relationships remain present; and
- the session collection contains exactly three formal labs, three drop-in clinics, and six lightweight guided sessions;
- the Home document title, navigation identity, and visible Hero heading are exactly `SLOP4225: Budgeted Language Model Training`;
- `What you will do` and `Who this is for` appear after the Hero and before the three linked Project cards; and
- the Home learning path contains exactly twelve chronological Week cards, the break separator, correct lecture/session/assessment links, and values shared with Schedule rather than duplicated literals.

## Implementation and verification contract

This section turns the design into a checkable implementation contract. It supplements the starter repository's `README.md`, assignment specification, shipped tests, and `CLAUDE.md`; it does not authorise an implementation agent to weaken any of them.

### Source precedence and implementation sequence

When two sources address the same point, use this order:

1. the assignment specification and immutable starter tests for deliverable shape;
2. this brief for course-design intent, constraints, relationships, and validation rules;
3. `CONTENT_SOURCE.md` for exact student-facing copy and page content; and
4. the starter's component examples for rendering technique only.

If a genuine contradiction remains, stop and record it rather than silently changing the course design. The agent should implement one coherent slice at a time—configuration and navigation, Home/People/Policies, assessments, lectures/sessions, deck/resources—then run the relevant checks before proceeding. It may adjust prose only for grammar, component fit, or accessibility without changing meaning, numbers, dates, names, or obligations.

### Executable test suite to add

The implementation agent must add real course-specific tests under `spec/` in addition to retaining all shipped tests. Tests should inspect the canonical data/API or rendered semantic HTML and stable attributes. They should not rely on entire-paragraph string snapshots, CSS pixel positions, or component internals that make harmless copy and styling changes fail.

| Test file | Required assertions |
| --- | --- |
| `spec/course-contract.test.ts` | `SLOP4225`; Semester 1, 2027 dates; weights 20/50/30; exactly 12 lectures; exactly 12 session entries covering Weeks 1–12; session-type counts 3/3/6; Project due weeks 4/8/12; at least one linked and compiled `.deck.mdx`. |
| `spec/home-contract.test.ts` | Exact course/document title; Hero–What–Who–Projects section order; three linked Project cards with week ranges, weights and deadlines; exactly twelve chronological Week cards grouped by Project stage; the 5–11 April break; all lecture and session mappings; due-week assessment links; shared schedule data and base-path-safe hrefs. |
| `spec/assessment-contract.test.ts` | Three assessment pages; brief, rubric, constraints, submission panel, individual-work statement, and exactly six primary resource entries on each; report/model allocations 10/10, 35/15, 20/10; correct open/due dates and report filenames; only report upload and GitLab SHA portal fields; no token or secret input. |
| `spec/policy-contract.test.ts` | Eleven numbered policy sections; 32M design target and 33.6M boundary; compute and FLOP limits; 15/20/20 report limits; five development examples and ten tutor prompts; continuation/answer-only PPL, 25/50 thresholds and `0.1`; Project 3B and proposal rules; no HF-token submission. |
| `spec/resource-contract.test.ts` | Exactly six registry entries per Project with unique IDs and approved groups; no `#`, fabricated, empty, root-absolute, or raw-URL-labelled actions; state/href invariants; shared CVPR template referenced by all three Projects but stored once; weekly banner metadata contains local asset, source, licence/reuse basis, and alt-text decision. |
| `spec/resource-download.test.ts` | Every `Available` local path exists in both `public/` and the built `dist/` output, is non-empty, has the expected extension/signature, and is reachable through the rendered base-path-safe href; ZIP archives open and contain their required manifest entries; notebooks parse as valid `nbformat` JSON; all three brief PDFs begin with a valid PDF signature. |

The implementation must continue to satisfy the starter's existing checks, including its allocated code suffix, twelve week-numbered session nodes, date-range integrity, assessment weights, deck compilation, internal-link/base-path validation, accessibility scan, and dangling-reference checks. A failing shipped test is evidence of a design-to-schema mapping problem, not permission to delete, skip, or relax the test.

For download behaviour, add one browser-level smoke test or equivalent local-server check that opens an assessment page, activates one PDF, one ZIP, and one notebook action, and confirms a successful response with the expected file rather than an HTML 404 page. Check one action at each marking viewport and exercise it by keyboard. A PDF may open in the browser instead of forcing a save; the requirement is a correct accessible file response, not a particular browser download preference.

### Validation layers and evidence

Use four complementary layers:

- **Schema/content tests:** validate structured facts, required sections, collection counts, and cross-page consistency.
- **Build checks:** compile all pages and decks; validate internal links, asset paths, base paths, generated API data, and referenced downloads.
- **Accessibility checks:** retain automated axe checks and verify heading order, labelled controls, meaningful link text, image alternatives, colour independence, keyboard access, focus visibility, and reduced motion.
- **Browser verification:** inspect Home, one assessment, Policies, People, one lecture, one formal lab, one guided session, and the deck at 1920×1080 and 390×844. Confirm banner crops, tables, equations, submission states, navigation, and deck fit without horizontal overflow.

The agent records the commands run and material design-to-code decisions in `PROCESS.md`. Before handoff it must run the repository's canonical full check command and build, then report any remaining placeholder caused by a genuinely unpublished external resource. A placeholder release state is allowed; a broken action or invented destination is not.

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

## Remaining content and operational publication details

No assessment-policy decision remains open in this version. The course-materials licence, task-specific review anchors and rater process, and alternative Track A proposal process are settled and written as student-facing copy in `CONTENT_SOURCE.md`.

The following items are completed when the corresponding teaching resource is authored or provisioned:

- the exact default architecture and parameter count published in each starter repository;
- the final filenames, versions, URLs, and data-card details for the Project 1 story corpus and the two Project 2 public-domain editions;
- the final Project 3 Track B course-checkpoint identifier and `test_pilot` numeric ranges;
- the final GitLab, Hugging Face, brief PDF, template, notebook, evaluation-pack, and submission-portal destinations;
- selection, licensing, local storage, and attribution of the twelve approved weekly banner concepts;
- generation of the three printable assessment PDFs from the implemented canonical pages;
- implementation of the twelve approved lecture pages and twelve session pages (three formal labs, three drop-in clinics, and six lightweight guided sessions); and
- implementation of the approved Week 3 deck as a working `.deck.mdx` file.

These are operational dependencies or teaching-content deliverables, not invitations for the implementation agent to invent missing policy. Until a resource destination exists, the site should state when it will be released or render it as unavailable without a broken placeholder link.
