# Process overview

Written by you, for a reader: how you got from the brief to the harness and
agentic workflow behind this submission. Markers read this file and follow its
citations; they don't trawl the repo for evidence you didn't point at.

This file is the shape; the course site's
[assessment page](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/topics/assessment/#what-you-submit)
is the requirement, and its
[word counts](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/topics/assessment/#word-counts)
cover every deliverable.

## What I built

At this stage, I have designed and prepared the implementation-ready content foundation for **Training Language Models: A Budgeted Engineering Task**, a twelve-week, project-led course in which students build, post-train, and specialise a small language model under explicit parameter, data, and compute constraints. The idea is to teach language-model development as evidence-led engineering rather than unconstrained model chasing: three linked projects make students justify what they train, measure behaviour as well as loss, work reproducibly within a budget, and carry lessons from pre-training into post-training and specialist reasoning. The two planning documents now separate the rationale and constraints that guide implementation from the approved student-facing copy that the website can use directly.

> **Current status:** Course design and student-facing content are complete
> ([`521bce9`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Easton-Yi/commit/521bce9)–[`a2e4cfa`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Easton-Yi/commit/a2e4cfa)).
> Implementation is underway in staged commits: harness rule capture
> ([`410bd40`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Easton-Yi/commit/410bd40)),
> configuration/navigation/Home/People/Policies
> ([`8368b0f`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Easton-Yi/commit/8368b0f)),
> and assessments/resources/submission panels
> ([`14a03d5`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Easton-Yi/commit/14a03d5)).
> Twelve lectures and sessions, the deck and weekly imagery, and the final
> responsive/accessibility pass have not yet been carried out and must be
> appended when they occur.

## How I got here

The account below records the initial course-design and content-authoring phase. It will remain the opening part of the final implementation narrative. Commit hashes or compare ranges, curated prompt excerpts, and relative-path screenshots will be added beside the relevant claims once that evidence exists in the repository; the current draft does not invent them in advance.

### Course Design and Content Authoring

#### 1. Purpose of this record

This document records how the design for **Training Language Models: A Budgeted Engineering Task** was developed and archived with GPT assistance before website implementation began. It is not a transcript of every conversation. It identifies the main design batches, the evidence or constraints entering each batch, decisions directed and approved by the course designer, work delegated to GPT, revisions made after review, and the documents that became the source of truth.

The process was deliberately staged. Attempting to write all pages in one prompt would have mixed course rationale, unresolved choices, student-facing policy, and implementation detail. Instead, the designer used structured prompts with clear instructions to settle one connected group of details at a time. GPT then converted that direction into consistent written form and updated the planning documents before the next group began.

#### 2. Working documents and their responsibilities

Two planning documents were maintained because they serve different audiences.

| Document | Responsibility | What it must not become |
| --- | --- | --- |
| `docs/assignment_brief.md` | Records the course premise, design rationale, constraints, relationships between components, source-material allocation, and implementation promises. It explains why the course has its current form. | A page of mixed public copy, abandoned alternatives, and unresolved notes that an implementation agent must interpret. |
| `docs/CONTENT_SOURCE.md` | Holds approved student-facing wording that can be transferred into the website: Home copy, assessment briefs and rubrics, Policies, People, weekly teaching pages, labs, clinics, resource labels, and deck content. | A second planning discussion or a place for the implementation agent to invent policy. |
| `src/course-config.ts` | Will become canonical for course identity and dates after implementation. | A source for assessment policy or long-form content. |
| `spec/` and project tests | Will protect facts that appear in several pages, such as weights, deadlines, project weeks, policy sections, model boundaries, and submission safety. | A replacement for content review or a claim that generic tests prove the teaching design is good. |

When a rule necessarily appeared in both planning documents, it was checked for numerical and semantic consistency. Once implementation begins, repeated configuration facts should be read from `course-config.ts` wherever the starter permits.

#### 3. Authorship and human–GPT division of responsibility

The course design decisions remained under the direction of the course designer. GPT did not determine the educational position of the course, its assessment strategy, or its final rules. The designer supplied the intended structure, constraints, priorities, examples, corrections, and approval through prompts; GPT helped turn those instructions into formal, coherent documentation and a usable archive. Where GPT surfaced an ambiguity or suggested a formulation, it became part of the documents only after it was consistent with the designer's direction or explicitly accepted in the next instruction.

##### Course designer

The course designer supplied and retained authority over all decisions that materially affect learning, workload, fairness, or marking. These included:

- the central topic of training small language models under real resource constraints;
- the three-project progression from pre-training to post-training and specialisation;
- assessment weights and the final report/model allocations;
- the public evaluation-prompt arrangement and PPL marking rule;
- permitted datasets, model-size tolerance, report limits, and checkpoint choices;
- the role of post-training and chain-of-thought methods in the later projects;
- the relationship between the supplied LLM slide decks and the three teaching stages; and
- replacing shallow weekly labs with one substantial lab and one drop-in clinic per project cycle.

##### GPT

GPT was used as a writing, structuring, and documentation assistant. Its work included:

- turning structured requirements, rough notes, and corrections into formal written language;
- identifying ambiguities and showing their consequences for the designer to resolve;
- proposing internally consistent values for low-impact operational details;
- checking consequences of a decision across assessments, policies, teaching, and tests;
- drafting page-ready English in a consistent student-facing voice;
- converting assessment intent into explicit rubric criteria and anchors;
- reading, indexing, and reorganising the supplied teaching sources according to the designer's three-stage plan;
- checking totals, dates, duplicated rules, page coverage, and obsolete wording; and
- maintaining the two-document source-of-truth boundary.

GPT did not independently determine the course topic or silently publish unresolved policy. Suggestions that affected fairness, workload, or learning remained subordinate to the designer's instructions and were revised when they did not match the intended design. To improve efficiency, the designer explicitly delegated some low-impact details—such as plausible Australian semester dates, consultation times, button labels, and the wording of unavailable-resource states—to GPT. These were drafted using ordinary Australian university conventions because the designer's own wording would not materially alter the course. This delegation reduced administrative back-and-forth without transferring control of substantive decisions.

#### 4. From a whole-picture map to detailed planning documents

The documentation process had two deliberately different authoring modes. First, the designer and GPT converted an incomplete course idea into an approved design specification. Only after that design was sufficiently stable did they convert it into page-ready teaching content.

##### 4.1 Start with the whole picture, not isolated pages

The designer's first instruction was to avoid coding and establish what the assignment required, what already existed, and what decisions still had to be made. GPT responded with a whole-project execution map and gap map. It separated:

- requirements already fixed by the assignment and starter;
- substantive course-design decisions that required the designer's judgement;
- student-facing content that would eventually need to be written;
- implementation work that should wait until the content was settled; and
- verification and process evidence required at the end.

This initial map acted as a contents framework rather than a generated solution. It allowed the designer to see the entire problem before committing to individual details and made it possible to choose a sensible order for filling the gaps.

##### 4.2 Expand the design one decision family at a time

The designer then worked through the map in batches. Each prompt focused on one connected aspect—such as the project progression, resources, rubrics, evaluation protocol, model and compute constraints, datasets, checkpoint flow, or delivery dates—and supplied detailed intent and concrete instructions. GPT did not replace this input with a generic course design. It performed a controlled documentation loop:

1. **Receive the designer's detailed direction.** A prompt supplied the intended rule, its motivation, examples, and any constraints inherited from earlier batches.
2. **Recover existing commitments.** GPT compared the new direction with the assignment specification and previously approved facts.
3. **Make consequences visible.** Before editing, GPT explained how the new rule affected related rubrics, policies, resources, teaching, or future tests. Only consequential ambiguities were returned to the designer; delegated trivial details were completed using consistent Australian university conventions.
4. **Formalise the design in the brief.** GPT converted the designer's notes into clear written English and placed rationale, constraints, dependencies, and implementation intent in `docs/assignment_brief.md`.
5. **Run local consistency checks.** Numerical totals, thresholds, dates, terminology, duplicated rules, and superseded wording were checked.
6. **Return the result for review.** The designer inspected the interpretation, corrected anything that did not express the intended design, and supplied the next refinement.
7. **Revise the same source of truth.** GPT updated the existing file instead of creating another competing version.

This receive–formalise–review–correct loop was repeated until the whole-picture gaps were filled. The apparent efficiency therefore came from using GPT as a disciplined formatter and archivist around detailed human direction, not from accepting a one-shot generated curriculum.

##### 4.3 Convert approved design into content through a controlled source-mapping protocol

Student-facing content used a more constrained workflow. The designer did not simply ask GPT to “write twelve lectures.” The prompts first defined what knowledge belonged in each project stage, how the supplied references could be used, what each page had to contain, and the order in which GPT should perform the work.

For the lecture sequence, the designer specified the conceptual mapping:

- LLM foundations and scaling should support Weeks 1–4 because students need them to choose model size, training data, data volume, and training schedule for pre-training;
- post-training should support the later projects because continued pre-training and fine-tuning belong to that stage of model development; and
- reasoning and chain-of-thought techniques should support specialist adaptation, especially mathematical reasoning, while also connecting back to the two post-training projects.

The designer also prescribed a staged research-and-writing procedure:

1. **Inventory the supplied sources.** Inspect all slide PDFs inherited from machine-learning and LLM-related courses previously taken by the website author.
2. **Map every useful knowledge group to a project stage.** Decide whether each topic is timely and useful in Weeks 1–4, 5–8, or 9–12 rather than following the source decks' original order.
3. **Check pedagogical timing.** Exclude, defer, or mark as optional any topic that is too advanced, computationally disproportionate, or not yet usable by students at that point.
4. **Construct the stage narrative.** Arrange the accepted topics within each four-week stage so that concepts progress from understanding to engineering decisions, experimentation, evaluation, and submission.
5. **Divide the narrative into individual weeks.** Establish exactly which concepts, project decisions, and student actions belong to each week.
6. **Write page-level fields in small steps.** For each lecture, draft the summary, measurable learning outcomes, teaching sections, required and optional readings, slide reference, and project action using the approved outline.
7. **Design practical activity at the correct granularity.** Reconsider whether a weekly lab could support a meaningful activity; after designer review, replace twelve shallow labs with three substantial labs and three evidence-led drop-in clinics.
8. **Specify the first deck after the weekly structure was stable.** Build the Week 3 slide-by-slide narrative from the mapped sources rather than treating an old PDF as the new lecture deck.

At each step, the designer controlled the mapping rule and desired learning function; GPT performed the exhaustive source search, organisation, formal writing, and coverage checks. The output was written to `docs/CONTENT_SOURCE.md`, where the implementation agent can use it directly without reverse-engineering the reasoning in the brief.

##### 4.4 Common control loop

Both authoring modes used the same quality-control pattern:

| Stage | Designer's role | GPT's role | Persistent result |
| --- | --- | --- | --- |
| Frame | State the desired outcome and constraints | Recover the whole-picture position | Scoped batch |
| Direct | Provide detailed design or mapping instructions | Formalise the instructed interpretation | Draft update |
| Check | Judge whether it expresses the intended course | Check cross-file consequences and mechanical consistency | Review notes |
| Correct | Supply revisions or change priorities | Revise the same canonical files | Approved source text |
| Archive | Approve a commit-sized boundary | Summarise the actual interval and preserve status | Reviewable history |

This pattern made the GPT output inspectable and kept authorship clear. It also prevented a later implementation agent from having to infer which conversational version was current.

#### 5. Design batches

##### Batch 1 — Establish the course premise and assessment progression

The starting point was the assignment specification and starter-repository requirements: build a complete student-facing course site of roughly twenty pages, with meaningful course content rather than a curriculum proposal about a hypothetical site.

The course was organised around a practical premise: language-model training is a coupled engineering problem involving model capacity, data, compute, time, evaluation, and reproducibility. The resulting course title was **Training Language Models: A Budgeted Engineering Task**.

The twelve weeks were divided into three four-week stages:

1. **Build language ability:** pre-train a small narrative base model from scratch.
2. **Shape model behaviour:** apply post-training to create a recognisable narrative voice.
3. **Build a specialist:** adapt a permitted checkpoint to a bounded narrative or arithmetic task.

This progression was selected because each project reuses the previous stage's engineering skills while adding a new type of supervision. Projects were placed at the end of Weeks 4, 8, and 12 with weights of 20%, 50%, and 30%.

##### Batch 2 — Define the common platform, constraints, and resources

The next batch established the shared technical environment before detailed rubrics were written. A nanoGPT-derived private GitLab starter repository would provide a working baseline, default configuration, preflight checker, data scripts, compute ledger, and packaging guidance.

The model policy was refined from an informal “32M limit with 5% allowed” into two unambiguous values:

- **32M learned parameters** as the design target; and
- **33.6M learned parameters** as the absolute eligibility boundary after the published 5% tolerance.

This distinction avoids disagreement between students and markers about whether 32M or 33.6M is the enforceable boundary. The parameter count includes embeddings and output heads and is checked before training.

Compute limits were then proposed and checked against the different training stages:

- Project 1: 24 T4-equivalent hours and \(4.0\times10^{17}\) training FLOPs;
- Project 2: 18 T4-equivalent hours and \(2.5\times10^{17}\) training FLOPs; and
- Project 3: 12 T4-equivalent hours and \(1.5\times10^{17}\) training FLOPs.

The decreasing hours reflect the transition from pre-training from random initialisation to narrower checkpoint adaptation. Each budget still reserves room for environment learning, a smoke test, a controlled comparison, the main run, and limited recovery. Course-managed RunPod credit provides access but does not increase the assessed compute ceiling.

Assessment pages were limited to six primary resource cards so that important actions remained visible. Small schemas, manifests, examples, and configuration files were bundled into the starter repository or one evaluation/starter pack rather than becoming a long download list.

##### Batch 3 — Write rubrics and separate report from model evidence

A supplied nanoGPT assignment rubric was used as a style reference. Its useful features—explicit marks, descriptions of high-quality work, and separate report/model criteria—were retained. Features inconsistent with the course were rejected, including rank-based grading, automatic credit for novelty, and unsafe submission of Hugging Face tokens.

The first draft allocated 68 report marks and 32 model marks across the course. After review, the designer changed the final allocation to:

| Project | Report | Submitted model | Total |
| --- | ---: | ---: | ---: |
| Project 1 | 10 | 10 | 20 |
| Project 2 | 35 | 15 | 50 |
| Project 3 | 20 | 10 | 30 |
| **Course total** | **65** | **35** | **100** |

The rubrics were then rewritten to reflect this decision. High marks require controlled evidence, clear data and compute accounting, valid evaluation, failure analysis, reproducibility, and proportionate conclusions. Method complexity and novelty do not receive marks by themselves.

Report limits also changed during review. An initial compact 3/6/4-page proposal was replaced by final maximums of 15 pages for Project 1 and 20 pages for Projects 2 and 3, using the supplied CVPR LaTeX template. References and appendices do not count, but essential evidence cannot be hidden only in an appendix.

##### Batch 4 — Design the shared evaluation protocol

The evaluation batch began with the designer's requirement that every project provide two public support sets:

- five development prompts with ground truth, used to test the pipeline and support qualitative analysis; and
- ten public tutor-evaluation prompts whose ground-truth continuations or answers remain unavailable to students.

The public tutor prompts cannot be included in training. The starter repository includes exact and near-duplicate checks so that students can validate their data before training.

During formalisation, the tokenizer-comparability problem was made explicit and the evaluation rule was documented as **continuation-only reference-token-normalised PPL**. With the default tokenizer this behaves like ordinary token-level PPL; with a changed tokenizer the same published thresholds remain meaningful. The designer's approved PPL score is:

\[
s(P)=
\begin{cases}
1, & P\le 25,\\
\exp[-0.1(P-25)], & 25<P<50,\\
0, & P\ge 50.
\end{cases}
\]

PPL contributes two thirds of each submitted-model component. The remaining third measures the actual task behaviour: narrative continuation, target voice and retention, or specialist capability. This prevents a low PPL from replacing task success.

The protocol was completed with blind task-specific human review, explicit 0–4 anchors, three independent raters for story outputs, an adjudication rule for large disagreements, verifier precedence for exact-answer tasks, and technical gates for loading, format, model size, and contamination.

##### Batch 5 — Finalise datasets, checkpoint flow, and Project 3

Project 1 uses a supplied base story corpus. Project 2 uses public-domain editions of *Grimm's Fairy Tales* and *One Thousand and One Nights* as the default target sources. Students may add or replace data, but they assume responsibility for licensing, provenance, cleaning, compute, contamination, and performance consequences.

Project 3 was divided into two routes:

- Track A: an approved bounded narrative capability; and
- Track B: basic arithmetic and simple arithmetic word problems requiring both calculation and text understanding.

Track B's exact operations, ranges, and formats are published in the repository's `test_pilot`. Alternative Track A tasks use a one-page proposal and approval workflow so that custom tasks remain feasible, measurable, safe, and comparable under the common rubric.

Checkpoint fallback rules were made explicit. Students may use designated earlier personal checkpoints where permitted or select the course fallback. A personal checkpoint is verified using its frozen revision, parameter count, tensor shapes, and checksum rather than only its file size.

##### Batch 6 — Convert planning decisions into website copy

Once the course and assessment rules were stable, `CONTENT_SOURCE.md` became the canonical source for page-ready wording. This avoided asking the later implementation agent to copy prose from a long planning document containing rationale and operational notes.

This batch produced:

- the Home hero, value proposition, three-stage journey, outcomes, timeline, and calls to action;
- the complete assessment pages, submission panels, resource labels, and rubrics;
- all eleven Policies sections;
- the People page, role boundaries, contact routing, and plausible consultation details;
- the Project 3 alternative-task proposal process and remaining human-evaluation details; and
- the agreed navigation labels.

For low-impact details that did not alter the learning design, GPT generated reasonable Australian university conventions and kept them consistent. This included Semester 1 2027 dates, AET deadlines, consultation times, fictional locations, and contact labels. The designer did not need to approve every button label or administrative placeholder separately.

##### Batch 7 — Build the teaching-content architecture from source slides

Four supplied slide decks were stored as reference material. They came from machine-learning and LLM-related university courses previously taken by the website author and were used as knowledge references rather than copied as new course materials:

- `LLM basics.pdf`;
- `LLM scaling.pdf`;
- `LLM post-training.pdf`; and
- `LLM reasoning.pdf`.

GPT inspected 197 pages using both visual page renders and extracted text, then organised the material according to the designer's requested relationship between the three projects and the three teaching stages. The decks were not assigned wholesale to four consecutive topics because their content overlaps: the basics deck introduces instruction tuning, the scaling deck includes staged pre/post-training examples, and the reasoning deck progresses from prompting into reward-based training.

The material was instead reorganised by what students must decide in each project stage:

- Weeks 1–4 combine language-modelling foundations, the decoder-only Transformer, scaling/data/optimisation choices, and evaluation for Project 1.
- Weeks 5–8 develop continued pre-training, SFT, preference learning, and behavioural/regression evaluation for Project 2.
- Weeks 9–12 connect CoT, sampling, verification, specialist SFT, generalisation, outcome/process supervision, and system audit to Project 3.

A source-slide coverage ledger records the destination of every substantive page group. Advanced topics such as full PPO-scale RLHF, process reward models, GRPO, and RLVR remain conceptual or optional frontier material because compulsory reproduction would not be proportionate to a 32M model and the available compute.

##### Batch 8 — Author weekly pages, practicals, and the first deck

All twelve lecture pages were written in `CONTENT_SOURCE.md`. Each contains:

- a summary;
- four or five measurable learning outcomes;
- detailed teaching sections;
- required and optional primary readings;
- a slide-deck filename; and
- a concrete action connecting the week to the current project.

The original plan for twelve weekly labs was reconsidered. The designer judged that good model-training activities were too substantial to divide into twelve equally useful small exercises. The final cadence therefore uses:

- formal labs in Weeks 2, 6, and 10;
- evidence-led project drop-in clinics in Weeks 3, 7, and 11; and
- protected evaluation and submission time in Weeks 4, 8, and 12.

Each formal lab includes preparation, step-by-step activity, expected output, self-checks, and a solution-release rule. Clinics use students' own evidence and therefore publish de-identified common-issue notes rather than a model solution.

The first complete deck was specified for Week 3, **Scale, Data, and Optimisation Under Fixed Compute**. Its eighteen slides move from \(N,D,C\) and power-law intuition through Kaplan/Chinchilla evidence, data quality, compute accounting, training schedules, pilot diagnosis, stop rules, and Project 1 claims. The specification includes accessibility and figure/source requirements so that it can later be implemented as `.deck.mdx` without redesigning the teaching narrative.

#### 6. Review and consistency checks

The documents were checked after each decision family rather than only at the end. Checks included:

- Project weights sum to 100 and report/model allocations sum correctly within each project;
- the 32M design target and 33.6M absolute boundary use the same meaning everywhere;
- the PPL thresholds, \(\lambda=0.1\), prompt counts, and two-thirds/one-third split remain consistent;
- Project 1, 2, and 3 deadlines align with Weeks 4, 8, and 12 around the mid-semester break;
- every assessment page exposes exactly six main resource cards;
- all eleven Policies sections exist;
- no workflow asks students to submit an HF token;
- all twelve lectures contain summary, outcomes, sections, readings, slides, and a weekly action;
- the final practical cadence is three labs plus three clinics, with no old “twelve labs” promise remaining; and
- the first deck contains eighteen specified slides and a source register.

Checks were also used to catch editorial problems introduced during revision, including outdated mark splits, old page limits, hidden-test terminology, old clinic weeks, and contradictory status statements.

#### 7. Commit-sized documentation intervals

The documentation work was divided into reviewable commits rather than one opaque final change.

##### Interval 1

```text
docs: define assessment policies, resources, and marking rubrics
```

This interval established common policy, six resource entries per project, the split between design rationale and student-facing copy, initial detailed rubrics, report format, and checkpoint eligibility.

##### Interval 2

```text
docs(course): finalise assessment rules and course delivery details
```

This interval finalised evaluation prompts and PPL scoring, mark allocation, model tolerance, compute budgets, datasets, checkpoint fallbacks, Project 3B, report limits, course identity, semester, and deadlines.

##### Interval 3

```text
docs(course): complete weekly teaching content and practical plan
```

This interval added final Home/Policies/People support copy, mapped the four slide sources into the three stages, authored twelve lecture pages, replaced weekly labs with three labs and three clinics, and specified the eighteen-slide Week 3 deck.

#### 8. What this process demonstrates

The value of GPT in this work was not independent course design, but faster formalisation and more reliable record keeping. The designer could provide structured prompts containing intended decisions and concrete editing instructions; GPT converted them into consistent written language, filed them in the correct source document, and tracked their consequences across a large design. For example, a new scoring rule affected three rubrics, evaluation copy, policy, tests, and teaching, while a change in practical cadence affected the Schedule, Home, People, accessibility releases, and implementation checklist. Keeping those relationships visible reduced the chance that individually plausible pages would contradict each other.

Human direction and review remained decisive. Several intermediate formulations were replaced after the designer supplied further instructions, including the report/model split, report page limits, practical frequency, and handling of trivial administrative details. The final documents are therefore the result of designer-led staged specification, GPT-assisted formalisation, critique, and revision rather than acceptance of one generated draft.

#### 9. Implementation-phase record to append later

The following sections must be completed from evidence after implementation begins. They are placeholders for process capture, not claims that the work has happened.

##### Starter inspection and implementation plan

- Record the actual starter interfaces, content schema, reusable components, build commands, and constraints discovered in the public template/repository.
- Map `CONTENT_SOURCE.md` sections to concrete routes and content files.
- Record any content change required by a real interface constraint rather than rewriting silently.

##### Website implementation

- Record the order in which configuration, navigation, Home, assessments, lectures, practicals, Policies, People, and the deck were implemented.
- Include selected screenshots or small diffs that show meaningful design evolution.
- Record the visual-system decision and accessibility choices.

##### Tests and verification

- Record the tests written for course-specific facts and why each protects a real promise.
- Record build, lint, link, responsive, keyboard, contrast, and content checks with their actual results.
- Record failures and the changes made to resolve them.

##### Final retrospective

- Identify where the implemented site differs from the planning documents and why.
- Explain which agent suggestions were rejected or revised.
- State remaining limitations rather than describing the artifact as complete by default.

#### 10. Evidence to preserve during implementation

To make the final process account concrete, preserve:

- commit SHAs and messages for each meaningful interval;
- brief excerpts of prompts that caused a design change, not entire chat transcripts;
- before/after screenshots for navigation, one assessment page, one lecture, one lab, and the deck;
- failed build, test, link, or accessibility output that changed the implementation;
- the reason for any divergence from `CONTENT_SOURCE.md`;
- the final test/build commands and results; and
- a concise record of which work was drafted by GPT, modified by the designer, or written directly during implementation.

This evidence will allow the final `PROCESS.md` to describe actual reasoning and iteration rather than reconstructing a smooth but inaccurate story after submission.

### Agent Implementation/Randering and Refinement Loop

#### Stage 3 — assessments, rubrics, resources, submission panels

**Problem:** Turn the approved Project 1–3 assessment content, the shared
resource registry, and the submission panel into working pages, real backing
files, and executable tests, per `docs/ASSIGNMENT_BRIEF.md`'s resource
production sequence and test-suite table.

**Directed via:** "Continue into Stage 3" (direct order; full Stage 3 scope
as documented in `ASSIGNMENT_BRIEF.md`, no further clarification requested).

**Considered and rejected — resource availability gating:** Two ways to
compute a resource card's rendered state were considered: (a) trust the
manifest's `localPath` field alone once set, or (b) also check the file
physically exists via `existsSync` at render time. (a) would let a card
claim `available` the moment a path string was typed, before the real file
was built — exactly the failure mode the brief calls out ("Mark a local file
Available only after it exists and passes format and download checks").
**My decision:** (b), because the manifest is authored before the backing
files exist (registry-first, per the documented 7-step sequence), so
correctness has to be enforced by the code, not by author discipline.

**Considered and rejected — how to generate the three brief PDFs:** A
templated PDF builder (e.g. hand-assembled PDF content streams, or a
markdown→PDF library) vs. rendering the live assessment page through a
headless browser with a print stylesheet. The templated route would
duplicate the brief content in a second format that could drift from the
page. **My decision:** print-media Playwright capture of the real rendered
page, so the PDF can never disagree with the page it mirrors — the cost was
finding Astro 7's actual base path and its always-background `preview`
daemon (see below).

**Fix/iterate:** Two rounds on the print stylesheet: the first draft hid
`a.at-button` sitewide (which would have hidden legitimate resource-download
links) and guessed the skip-link class as `.skip-link`. After reading
`BaseLayout.astro`/`ResourceCard.astro`/`SubmissionPanel.astro` source
directly, corrected to the real classes (`.visually-hidden`,
`.submission-panel__actions`, `.submission-panel__note`) and dropped the
button-hiding rule. Also hit and fixed a wrong relative import path and a
missing `/` in the constructed preview URL (`scripts/resources/build-briefs.ts`),
discovered because Astro's resolved base path here is
`/comp4020-ass2-Easton-Yi`, not `/`.

**Verified by:** `pnpm resources:check` (all 12 built files: valid PDF
signature / valid zip with README+manifest / valid nbformat notebook);
direct Chromium screenshot of `/assessments/project-1/` at 1920×1080 and
390×844 confirming zero horizontal overflow; a separate print-media
screenshot confirming the PDF mirror shows only brief content, spec,
marking, resources, and submission summary, with nav/hero/footer/skip-link
and the submission action row stripped.

**A second, smaller decision — the literal PPL decay constant:**
`policy-contract.test.ts`'s required assertions include the literal `0.1`
decay constant, which existed in `docs/CONTENT_SOURCE.md`'s formula but had
been paraphrased as "the published exponential decay" on all three
assessment pages. Considered adding a twelfth numbered Policies section to
hold it; rejected because the Policies page's numbered-section count is
fixed at exactly eleven and a new section would break that structural
invariant for no content reason. Fixed by writing the literal value into the
existing PPL criterion prose on `project-1.md`/`project-2.md`/`project-3.md`
instead — one line each, no new page or section.

**Known, disclosed gap — not something this stage can fix:** `pnpm test`
currently fails on `spec/brief.test.ts`'s "runs across twelve dated teaching
weeks" (only 2 of 12 sessions exist). This is a genuine, pre-existing shipped
test that structurally requires Stage 4's twelve lectures/sessions to exist;
it is not touched, weakened, or skipped here, per the assignment brief's
explicit rule against relaxing shipped tests. All four new Stage-3 test
files (`assessment-contract`, `policy-contract`, `resource-contract`,
`resource-download`) pass in isolation and alongside every other existing
test — 74/75 total, with the one known failure isolated to Stage-4-scoped
content. `pnpm typecheck` and `pnpm resources:check` are both clean.

A further wrinkle the new tests had to account for: every resource
`releaseAt` and every assessment `opens` date falls in 2027, after today's
build date, so the live site currently and correctly renders every resource
card as `Scheduled` and every submission panel as `before-opening` — not a
bug, but the intended pre-release behaviour. `resource-download.test.ts`
verifies the backing files against a simulated post-release date rather than
asserting today's (`Scheduled`) HTML contains download links it should not
yet show; `assessment-contract.test.ts` checks the submission panel's
upload/GitLab-SHA copy directly in `SubmissionPanel.astro`'s source for the
same reason.

**Evidence:** [`14a03d5`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Easton-Yi/commit/14a03d5)
(pages, components, resource manifest, generated backing files, four new
spec files); the `.gitignore`/harness-rule groundwork for this stage is
[`410bd40`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Easton-Yi/commit/410bd40).

<!-- Stage 4 (twelve lectures and sessions), Stage 5 (deck, weekly imagery,
downloadable resources), and Stage 6 (responsive/accessibility/consistency
refinement) are not yet implemented; entries for those stages, screenshots,
and the closing structural-alternative reflection remain to be appended. -->

## Before you ship

`pnpm check:evidence` verifies that this comment is gone, that your citations
resolve to real commits, that a crit week's reflection entry is in
`reflections/`, and that your `CLAUDE.md` is there. It checks that your account
is traceable, not that it is good: that is the marker's call.

Images aren't checked: unlike a citation whose SHA doesn't resolve, a broken
image is visible the moment this file is rendered on GitHub.
