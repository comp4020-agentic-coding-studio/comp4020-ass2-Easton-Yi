# Process overview

Written by you, for a reader: how you got from the brief to the harness and
agentic workflow behind this submission. Markers read this file and follow its
citations; they don't trawl the repo for evidence you didn't point at.

This file is the shape; the course site's
[assessment page](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/topics/assessment/#what-you-submit)
is the requirement, and its
[word counts](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/topics/assessment/#word-counts)
cover every deliverable.

## The deployed url:

https://comp4020-agentic-coding-studio.github.io/comp4020-ass2-Easton-Yi/

## What I built

At this stage, I have designed and prepared the implementation-ready content foundation for **Training Language Models: A Budgeted Engineering Task**, a twelve-week, project-led course in which students build, post-train, and specialise a small language model under explicit parameter, data, and compute constraints. The idea is to teach language-model development as evidence-led engineering rather than unconstrained model chasing: three linked projects make students justify what they train, measure behaviour as well as loss, work reproducibly within a budget, and carry lessons from pre-training into post-training and specialist reasoning. The two planning documents now separate the rationale and constraints that guide implementation from the approved student-facing copy that the website can use directly.

> **Current status:** Course design and student-facing content are complete
> ([`521bce9`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Easton-Yi/commit/521bce9)–[`a2e4cfa`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Easton-Yi/commit/a2e4cfa)).
> All six staged implementation phases are complete: harness rule capture
> ([`410bd40`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Easton-Yi/commit/410bd40)),
> configuration/navigation/Home/People/Policies
> ([`8368b0f`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Easton-Yi/commit/8368b0f)),
> assessments/resources/submission panels
> ([`14a03d5`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Easton-Yi/commit/14a03d5)),
> the twelve lectures and twelve sessions
> ([`383702e`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Easton-Yi/commit/383702e)),
> the Week 3 deck, weekly banners, and downloadable resources
> ([`bb030f1`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Easton-Yi/commit/bb030f1)),
> and the responsive/accessibility/consistency refinement pass
> ([`b53e725`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Easton-Yi/commit/b53e725)–[`a894303`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Easton-Yi/commit/a894303)).
> `pnpm check` and the deployed CI `checks` workflow are both green.

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

#### Stage 4 — twelve lectures and twelve sessions

**Problem:** Turn all twelve weeks of `docs/CONTENT_SOURCE.md`'s approved
lecture and practical-session copy into real content-collection entries, so
that `spec/brief.test.ts`'s pre-existing "runs across twelve dated teaching
weeks" assertion (disclosed as a known Stage-3 gap — only 2 of 12 sessions
existed) can pass, and so the assignment brief's required course-contract
test table (`docs/ASSIGNMENT_BRIEF.md` line 874) has a test file backing it.

**Directed via:** "Continue into Stage 4" (direct order; full Stage 4 scope
as listed in `CLAUDE.md`'s staged workflow, no further clarification
requested).

**Agent's result fell short because:** Two content-fidelity errors were
self-caught, not user-reported.

1. `week-05.md` was first drafted from memory — a plausible but wrong
   framing ("behaviour taxonomy and a frozen baseline log") that did not
   match `docs/CONTENT_SOURCE.md`'s actual Week 5 section (the real content:
   capability vs. elicited behaviour, and three post-training routes —
   continued pre-training, SFT, preference learning). Caught before commit by
   re-reading the source against the draft.
2. `week-06.md`'s lecture `teachers:` field was set to `maya-rao` by wrong
   analogy with its accompanying Formal Lab 2 session (which Maya does
   teach). The established pattern from weeks 1–3 is that every LECTURE is
   taught by Yiwei Easton as Course Convenor regardless of that week's
   session type; only the SESSION entries for labs/clinics belong to Maya.

**Considered and rejected:** Leaving both as first-drafted and treating the
mismatch as a formatting variant. Rejected because CLAUDE.md's rule against
inventing a parallel curriculum, and the brief's rule about preserving
approved meaning, both apply to content correctness, not just page
structure — a plausible paraphrase that changes the taught concept is a
worse failure than an obviously wrong page, because it would pass casual
review.

**My decision:** Re-read the exact canonical source for every remaining
lecture and session (weeks 4, 6–12, and all 12 session files) before writing
each one, rather than continuing to draft from memory and fix afterwards.
This is a process change I made mid-stage, not something the agent proposed.

**Fix/iterate:** `week-05.md` rewritten in full via one `Write` to match
`docs/CONTENT_SOURCE.md` lines 1128–1176 exactly. `week-06.md`'s `teachers:`
field corrected via one `Edit` (`maya-rao` → `yiwei-easton`). One round each;
no further content mismatches were found on review of weeks 4, 7–12, or any
of the 12 session files against source.

**Verified by:** `pnpm typecheck` (0 errors), `pnpm build` (39 pages, course
API regenerated at 31 nodes / 53 edges, no broken links, no accessibility
violations), `pnpm test` (7 files, 82 tests passing, including the
previously-failing `spec/brief.test.ts` twelve-week assertion and the new
`spec/course-contract.test.ts`), `pnpm check` (clean), `pnpm resources:check`
(all 12 backing files still valid — unaffected by this stage), and
`pnpm check:evidence` (only the three pre-existing, Stage-5-scoped items
remain flagged: `week-01.deck.mdx`'s STARTER_CONTENT comment,
`index.astro`'s hero-artwork STARTER_CONTENT comment, and the starter
`card.png`/`hero-home.avif` images — none introduced or touched by Stage 4).
Direct Chromium inspection at both 1920×1080 and 390×844 of one lecture page,
one formal-lab session, one guided session, and one drop-in-clinic session
confirmed zero horizontal overflow at either viewport and correct rendering
of the per-page `sessionType` label ("Formal lab" / "Drop-in clinic")
alongside the shared "Labs" nav term.

**Evidence:** [`383702e`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Easton-Yi/commit/383702e)
(twelve lecture files, twelve session files replacing the two starter
sessions, `spec/course-contract.test.ts`, and small session-display component
touch-ups).

**Disclosed process gap:** `PROCESS_LOG.md` (the gitignored, contemporaneous
working log CLAUDE.md's harness calls for) was not kept turn-by-turn during
this stage's content-authoring work — a session interruption ("API Error:
The response stopped arriving") meant the log was not started before the
bulk of Stage 4's lecture/session files were already drafted, and the
account above was reconstructed from the actual file diffs and the two
self-caught errors rather than from a live log. This is named here rather
than backfilled with invented timestamps, per CLAUDE.md's instruction that
"memory reconstructed after the fact is not evidence." `PROCESS_LOG.md` is
kept from this point forward for Stage 5 and Stage 6.

#### Stage 5 — slide deck, weekly banners, downloadable resources

**Problem:** Build the one complete slide deck the spec names explicitly
(`docs/CONTENT_SOURCE.md`'s "First complete slide deck specification," Week
3), give all twelve lectures the weekly banner image the brief's "Weekly
visual system" requires, and confirm downloadable resources — already
verified in Stage 3.

**Directed via:** "start stage 5" (direct order, no further scope given
beyond CLAUDE.md's staged-workflow line item), followed mid-stage by "fan
out subagents" (direct order to parallelise the remaining banner-sourcing
work).

**Agent's result fell short because:**

1. The Week 3 deck's Chinchilla-comparison table shipped with an empty
   leading `<th>`, which `pnpm build`'s axe scan caught as
   `empty-table-header`.
2. I (not a subagent) introduced a YAML bug into `week-03.md`: a `bannerAlt`
   value's first line contained an unquoted `word: word` inside a plain
   multi-line scalar, which YAML parses as an implicit mapping key. This
   broke content sync for the entire site build. Two of the four subagents
   fanned out for the remaining eleven weeks independently hit this same
   build failure, correctly identified it as outside their assigned scope,
   and reported it back rather than editing a file they weren't told to
   touch.
3. The first banner CSS pass (`aspect-ratio: 4/3` + `object-fit: cover` on
   phone widths) cropped the *sides* off every banner at 390×844, since
   each SVG's labelled content spans its full 1200-wide canvas edge to
   edge — invisible to `pnpm build`/axe/tests, only visible on direct
   Chromium inspection at the phone viewport.

**Considered and rejected:**

- For the banner-image sub-task as a whole: sourcing real external
  photographs/figures per the brief's per-week search briefs, with a full
  asset register (original URL, licence basis, access date). Rejected
  because verifying that a subagent's claimed "openly licensed" source URL
  actually resolves and is correctly licensed, at the volume of twelve
  images, is not something I can do reliably without a live fetch-and-check
  per image — and CLAUDE.md's rule against ever inventing an external URL
  or licence is unconditional. Original SVG schematics (the same pattern
  already verified in the Week 3 deck's diagrams) carry the strongest
  possible licence basis — none needed — and the brief itself names
  "openly licensed technical illustrations" as an acceptable category.
- For the mobile-crop defect: redesigning all twelve already-built SVGs to
  keep their content inside a narrower center-safe zone. Rejected because
  it would mean re-touching eleven already-verified files for a
  presentation-layer problem that any future banner would reintroduce
  anyway; the CSS crop behaviour was the actual defect, not the artwork.

**My decision:** Use original SVG illustrations for all twelve banners
(mine to make, not a subagent's) rather than asking multiple parallel
agents to each independently source and license-check real images with no
way for me to verify their claims before they landed in the repo. For the
mobile crop, changed the phone breakpoint to `aspect-ratio: 3/2` with
`object-fit: contain` and a matching dark fill, so the full diagram is
always visible (letterboxed, not cropped) rather than redesigning content.

**Fix/iterate:** Deck table: one `Edit` giving every header cell real text
("Question"/"Earlier view (Kaplan-era)"/"Chinchilla-era view"), one round.
`week-03.md` YAML: one `Edit` rephrasing the colon to an em-dash and
switching to a `>-` block scalar, one round. Banner CSS: one `Edit` to the
phone media query in `src/pages/lectures/[slug].astro`, one round,
confirmed by re-screenshotting after the change.

**Verified by:** `pnpm build` (40 pages; "no accessibility violations";
"all internal links respect base"; "No broken links detected"; both decks —
`week-01` and `week-03-fixed-compute` — pass astromotion's structural
check), `pnpm check` (typecheck 0 errors; `resources:check` 12/12 valid;
`vitest` 83/83 passing across 7 files, including the new
`spec/resource-contract.test.ts` banner-metadata assertion), and direct
Chromium inspection (Playwright) of lecture weeks 1, 3, 8, and 12 at both
1920×1080 and 390×844 confirming zero horizontal overflow at either
viewport and, after the CSS fix, a complete (not cropped) banner at the
phone width.

**Evidence:** [`bb030f1`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Easton-Yi/commit/bb030f1)
(Week 3 deck, banner schema/template change in `src/content.config.ts` and
`src/pages/lectures/[slug].astro`, twelve `src/content/lectures/images/week-*.svg`
files, twelve updated `week-*.md` frontmatter blocks, and
`spec/resource-contract.test.ts`'s new banner test).

**Disclosed, deferred gap:** `pnpm check:evidence` still flags
`src/assets/images/card.png`, `src/assets/images/hero-home.avif` (generic
starter site artwork), and `src/decks/week-01.deck.mdx`'s STARTER_CONTENT
placeholder. None of these are named by CLAUDE.md's Stage 5 line item
("slide deck, weekly images, downloadable resources") or the spec's own
"First complete slide deck specification," which names only Week 3.
Deferred to Stage 6 ("responsive, accessibility, and consistency
refinement"), where generic cross-site branding work belongs thematically,
rather than silently expanding Stage 5's scope or silently dropping it.

#### Stage 6 — responsive, accessibility, and consistency refinement

**Problem:** Finish the deferred Stage-5 branding gap, add the browser-level
download smoke test `ASSIGNMENT_BRIEF.md` line 882 requires, and audit the
whole site for horizontal overflow, keyboard reachability, and heading
order at both marking viewports, per CLAUDE.md's Stage 6 scope.

**Directed via:** "start stage 6" (direct order; full Stage 6 scope as
documented in CLAUDE.md's staged workflow, no further clarification
requested).

**Agent's result fell short because — deferred branding:** nothing was
wrong; the Stage 5 placeholders (`hero-home.avif`, `card.png`,
`week-01.deck.mdx`'s STARTER_CONTENT) were replaced cleanly with original
artwork and a complete first deck on the first pass.

**Considered and rejected — building the download-smoke-test's future-dated
preview inside the test file's own `beforeAll`:** this is how the file was
first written. Spawning `astro build` as a child process from inside a
running Vitest process produced ~400 spurious base-path-link violations on
every run, reproducibly, against zero violations for the identical command
run standalone — true across every worker-pool config, stdio mode, and
Vitest/Tinypool env var tried. Real time was spent trying to actually
diagnose the Vitest/Astro/Vite interaction rather than work around it,
without reaching a real answer.

**My decision:** stop chasing the diagnosis and decouple the preview build
into its own `pnpm resources:preview-build` shell step, run before `vitest
run spec` starts (`package.json`'s `test` script) — a correct fix exists
regardless of the cause, and the test file's own `beforeAll` now just
checks the build already exists, with an actionable error naming the
script if not.

**A second bug found along the way, not part of the original ask:** a
temporary diagnostic added while investigating the above surfaced that
`resource-manifest.ts`'s `PUBLIC_DIR` was resolved via
`fileURLToPath(new URL("../../public/", import.meta.url))`, which Astro's
SSG build resolves against the *bundled* module location, not the
project's real `public/` — every local-download resource would have
rendered "unavailable" the instant its real release date passed, currently
invisible only because every real release date is still in the future.
Fixed by resolving `PUBLIC_DIR` from `process.cwd()` instead (stable for
both `astro build` and `astro dev`).

**A third, unrelated defect found by the Stage 6 audit itself:** the
Playwright heading-tag sweep found `/people/`, `/assessments/`, and
`/lectures/` rendering with **no `<h1>` at all** (headings starting at h2
or h3), while `/schedule/` and `/sessions/` were correctly headed.
**Considered and rejected:** giving each page a `heroImage` so the theme's
`<Hero>` component (which needs both `heroTitle` **and** `heroImage` to
render) would fire — rejected as a bigger, more decision-laden content
change than the defect warranted, and it would leave any future no-image
overview page carrying the same landmine. **My decision:** drop the dead
`heroTitle` frontmatter and add a real Markdown `# heading` in the page
body instead, matching `/policies/`'s already-correct convention; also
bumped two now-orphaned h3 sections on `/people/` to h2 so the new h1
isn't followed by a skipped level.

**Fix/iterate:** preview-build decoupling — one `package.json` edit plus a
rewritten `beforeAll`/`afterAll` in the test file, several rounds fixing
a base-path-stripping 404 in the test's static server and a
`response.text()` hang specific to Chromium's JSON viewer (worked around
with a separate `context.request.get()` call) before all three assertions
passed reliably. `PUBLIC_DIR` fix: one line, one round. Heading fix: one
`Edit` per page, one round each.

**Verified by:** full Playwright audit script across 8 representative
pages (home, people, policies, assessments overview + a project detail
page, schedule, a lecture week, a session) at both 1920×1080 and 390×844 —
zero horizontal overflow on all 16 combinations, and after the heading
fix, every page emits exactly one `<h1>` first with no skipped levels;
direct visual inspection (not just the grep) of the fixed pages'
screenshots at both viewports; `pnpm check` (typecheck 0 errors/0
warnings; `resources:check` 12/12; 86/86 tests across 8 files, including
the new browser smoke test) and `pnpm build` (40 pages, "no accessibility
violations", "all internal links respect base", no broken links) with no
regressions; the real committed `dist/` build re-checked to confirm the
`PUBLIC_DIR` fix does not leak an early "available" state onto the
submitted site (still correctly "scheduled").

**Evidence:** [`b53e725`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Easton-Yi/commit/b53e725)
(deferred branding — hero/card artwork, Week 1 deck),
[`9a6ad7a`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Easton-Yi/commit/9a6ad7a)
(download smoke test, decoupled preview build, `PUBLIC_DIR` fix),
[`8787485`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Easton-Yi/commit/8787485)
(heading-order fix on People/Assessment/Lectures).

**Structural alternative for the whole build:** the site's downloadable
resources (briefs, evaluation packs, notebooks) are all static files
served from a hand-authored typed registry (`resource-manifest.ts`)
checked against the filesystem at render time. A different structure
would have generated that registry from the resource files themselves —
walking `public/resources/` at build time and inferring kind/state from
file extension and a sidecar metadata file, rather than authoring each
entry by hand alongside a separately-tracked release date. That would
remove the possibility of a manifest entry drifting out of sync with what
actually exists on disk (the exact class of bug `PUBLIC_DIR` turned out to
belong to) and would scale better if the number of resources grew well
past the current fixed set of three projects × five-or-so resources each.
It was not taken because the manifest's fixed, small size makes hand
authorship easy to review at a glance, the registry needs fields (audience-
facing `actionLabel`, group ordering, an `unavailableReason` string) that
don't have an obvious filesystem-derived source, and a filesystem-driven
registry would have made the deliberate registry-before-files authoring
sequence (`ASSIGNMENT_BRIEF.md`'s documented 7-step production order) much
harder to express — the registry is supposed to be able to describe a
resource before its file exists yet.

#### Post-Stage-6 — CI fix: missing Playwright browser on the GitHub Actions runner

**Problem:** After pushing Stage 6's commits, the `checks` GitHub Actions
workflow started failing on every push to `main`, despite `pnpm check`
passing locally (86/86) moments before each of those commits.

**Directed via:** user message "pushed. whats next" — not a specific
diagnosis instruction; investigating CI state and fixing what's found is
the direct implication of CLAUDE.md's "never commit a red state."

**Agent's result fell short because:** the newly-added
`spec/resource-download-browser.test.ts` (from Stage 6) launches a real
Chromium via Playwright. My dev machine already had Playwright's browsers
installed from earlier interactive testing, so the test passed locally
without ever exposing that the CI runner image ships only the `playwright`
npm package, not the browser binary — `gh run view --log-failed` showed
`browserType.launch: Executable doesn't exist at
.../chrome-headless-shell-linux64/chrome-headless-shell`.

**Considered and rejected:** reverting or skipping the browser test in CI
(e.g. an `if: false`/environment guard) to make the workflow green again
without touching the runner setup. Rejected outright — CLAUDE.md's rule
against ever skipping or weakening a test applies regardless of which
environment exposed the gap; the runner was missing a dependency, the test
itself was not wrong.

**My decision:** add the missing dependency instead of routing around the
test — `pnpm exec playwright install --with-deps chromium` as a workflow
step, scoped to just Chromium since that is the only browser the suite
launches.

**Fix/iterate:** one edit to `.github/workflows/checks.yml` (one new step
before "Build and run the spec"), one round.

**Verified by:** pushed as `a894303`, then watched the resulting
`checks` run via `gh run list --json ... --jq` until it reported
`status: completed`; confirmed `conclusion: success` for that commit's run
specifically (not just "the workflow ran") before reporting completion.

**Evidence:** [`a894303`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Easton-Yi/commit/a894303).

## Before you ship

`pnpm check:evidence` verifies that this comment is gone, that your citations
resolve to real commits, that a crit week's reflection entry is in
`reflections/`, and that your `CLAUDE.md` is there. It checks that your account
is traceable, not that it is good: that is the marker's call.

Images aren't checked: unlike a citation whose SHA doesn't resolve, a broken
image is visible the moment this file is rendered on GitHub.
