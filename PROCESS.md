# Process overview

## The deployed url:

https://comp4020-agentic-coding-studio.github.io/comp4020-ass2-Easton-Yi/

## What I built

I built **Training Language Models: A Budgeted Engineering Task**, a twelve-week, project-led course site in which students pre-train, post-train, and specialise a small language model under parameter, data, and compute constraints. The design treats language-model development as evidence-led engineering: students must justify model and data choices, evaluate behaviour as well as loss, preserve reproducibility, and carry lessons between three linked projects. The site provides twelve lectures and sessions, three assessments, policies and support, two slide decks, an evaluation protocol, resource states, and an accessible GitHub Pages implementation.

## How I got here

Assignment 1 showed that a strong agentic workflow can remain invisible to a marker. I therefore preserved prompts, decisions, corrections, and verification as evidence.

![Assignment 1 feedback on the missing process account](spec/improvement.png)

### Turning a whole-picture gap map into controlled source documents

I first asked the agent to inspect the assignment and identify the whole implementation picture before writing pages. I then expanded one decision family at a time: project progression, rubrics, evaluation, compute, datasets, checkpoints, teaching cadence, and resources. A pivotal instruction was:

> “Consider whether all website display content should first go in a new `CONTENT_SOURCE.md`, so the implementation agent can read the design intent from the brief and use the corresponding text directly.”

I chose to separate `assignment_brief.md`, which records rationale and constraints, from `CONTENT_SOURCE.md`, which contains approved student-facing copy. This prevented unresolved design discussion from leaking into the site. I retained decisions affecting learning, workload, fairness, and marking; I delegated only low-impact Australian-university details such as plausible dates and consultation times. The documentation evolved through review and correction rather than one-shot generation ([`521bce9...a2e4cfa`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Easton-Yi/compare/521bce9...a2e4cfa)).

### Implementing in reviewable stages

I directed the agent to read both canonical documents before each stage and implement configuration, core pages, assessments, weekly teaching, decks/resources, and accessibility separately. This made failures attributable and allowed tests to protect cross-page promises without replacing content review. The implementation progressed from the site shell to twelve lectures and sessions and then the visual/resource layer ([`8368b0f...b53e725`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Easton-Yi/compare/8368b0f...b53e725)). When a root-absolute link failed only under the GitHub Pages base path, I encoded the `withBase()` rule in `CLAUDE.md` instead of fixing each link ad hoc ([`410bd40`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Easton-Yi/commit/410bd40)).

### Auditing visible meaning, not just routes

After deployment, I instructed:

> “Do not begin by editing files. First read all five sources completely, inspect the current working tree, and produce a short stage-by-stage repair plan.”

The audit found that passing structural tests had concealed visible defects: an empty Schedule, implementation-facing index prose, no canonical Evaluation Protocol, semantically incomplete resource packs, and an inverted Week 3 loss curve. I rejected a page-by-page cosmetic patch because the same failure could recur. Instead, the repair added a content-completeness harness, canonical shared evaluation page, semantic archive tests, corrected visual, and cross-page contracts ([`373a6cc`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Easton-Yi/commit/373a6cc)).

### Correcting the correction

My follow-up review found two subtler errors: resources without real destinations were labelled scheduled, and required submission instructions were hidden until the portal opened. I rejected both because a date cannot make a missing resource real, and required files are static rules rather than personal submission status. The agent first corrected destination-first resource states and removed incomplete public archives ([`c1bacc9`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Easton-Yi/commit/c1bacc9)); a second iteration moved report filenames, GitLab SHA, manifest, identity, and token-safety instructions outside the time-dependent branch ([`3cc11df`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Easton-Yi/commit/3cc11df)). I accepted the result only after rendered-page inspection and green CI.

At project scale, I considered generating every page directly from the planning Markdown. I retained explicit content collections and typed registries because they preserve the starter platform, keep presentation reviewable, and let tests verify stable relationships without coupling the website renderer to planning-document structure.
