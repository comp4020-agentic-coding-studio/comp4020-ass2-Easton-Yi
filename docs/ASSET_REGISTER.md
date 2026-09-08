# Weekly banner asset register

Tracks provenance for every lecture banner image, per `docs/CONTENT_SOURCE.md`'s
"Weekly banner briefs" section and the Stage 4 course-build instruction that
required this register. One row per banner.

Sourcing status for all twelve: **no externally sourced image was used.**
A real, verifiable web search for openly licensed technical illustrations or
paper/author figures matching each week's brief was not completed to the
standard this repo's rules require (never invent a source, author, licence,
or URL). Rather than fabricate provenance for an image found by search, every
banner is an original SVG schematic authored for this course. Each is
scientifically directed at the concept named in its `docs/CONTENT_SOURCE.md`
brief (see the `bannerAlt`/`title` columns below) and is not generic
robot/brain/glowing-code decoration.

This is a reported design deviation from the approved sourcing preference
order (1. original paper/author figure, 2. openly licensed technical
illustration, 3. openly licensed photo/abstract image) — all twelve fall
through to none of the three, per the fallback clause: *"If no appropriate
licensed image can be verified, retain a scientifically correct original
illustration temporarily and report the remaining design deviation."* That
is the state recorded here, honestly, rather than claimed as compliant.

| Week | Local filename | Original URL | Title / creator | Licence / reuse basis | Access date | Crop/edit | Alt text | Visible caption/credit |
|---|---|---|---|---|---|---|---|---|
| 1 | `week-01-banner.svg` | none — original artwork | "Next-token probability over a token sequence" / course author | Original work, all rights held by the course | n/a (authored, not sourced) | none (authored at final crop) | Five-token prefix feeding a highlighted next-token slot with a candidate-probability bar chart | Original illustration for SLOP4225. |
| 2 | `week-02-banner.svg` | none — original artwork | "Causal self-attention across a token sequence" / course author | Original work, all rights held by the course | n/a | none | Row of token positions with attention arrows pointing only backward, illustrating the causal mask | Original illustration for SLOP4225. |
| 3 | `week-03-banner.svg` | none — original artwork | "An iso-compute valley: loss against model size at fixed compute" / course author | Original work, all rights held by the course | n/a | Corrected 2026-09-08: curve geometry was inverted (drew a peak, not a valley) relative to its own title/alt text; redrawn so the visible minimum sits at "balanced allocation" | Iso-compute valley chart — loss traces a curve against model size with a minimum at balanced allocation, rising on both sides | Original illustration for SLOP4225. |
| 4 | `week-04-banner.svg` | none — original artwork | "One frozen checkpoint branching into decoded candidates and review" / course author | Original work, all rights held by the course | n/a | none | One frozen checkpoint branching into three decoded candidates, each feeding automatic and human review | Original illustration for SLOP4225. |
| 5 | `week-05-banner.svg` | none — original artwork | "A base model transitioning into a target-behaviour model" / course author | Original work, all rights held by the course | n/a | none | "Base model" box transitioning via instruction tuning and preference learning into a "target-behaviour model" box | Original illustration for SLOP4225. |
| 6 | `week-06-banner.svg` | none — original artwork | "Instruction tokens masked, response tokens carrying the loss" / course author | Original work, all rights held by the course | n/a | none | Token sequence split into a greyed instruction span (no loss) and a highlighted response span (loss applied) | Original illustration for SLOP4225. |
| 7 | `week-07-banner.svg` | none — original artwork | "Pairwise response preference feeding a policy-and-reference relationship" / course author | Original work, all rights held by the course | n/a | none | Two candidate responses with the preferred one marked, feeding an updated policy model and a fixed reference model | Original illustration for SLOP4225. |
| 8 | `week-08-banner.svg` | none — original artwork | "Target-behaviour improvement plotted against retention as a trade-off" / course author | Original work, all rights held by the course | n/a | none | Two-axis plot of target-behaviour improvement against retention, showing an over-tuned checkpoint regressing | Original illustration for SLOP4225. |
| 9 | `week-09-banner.svg` | none — original artwork | "Three reasoning chains converging on a verified answer" / course author | Original work, all rights held by the course | n/a | none | Three generated reasoning chains, two consistent, converging on a majority-vote check feeding a verified final answer | Original illustration for SLOP4225. |
| 10 | `week-10-banner.svg` | none — original artwork | "Training records flowing through a model, parser, and verifier" / course author | Original work, all rights held by the course | n/a | none | Task contract shaping training records that flow through a model, output parser, and verifier | Original illustration for SLOP4225. |
| 11 | `week-11-banner.svg` | none — original artwork | "One aggregate score beside uneven per-slice scores" / course author | Original work, all rights held by the course | n/a | none | One tall aggregate-score bar next to five uneven disaggregated per-slice bars, including a template-shift slice | Original illustration for SLOP4225. |
| 12 | `week-12-banner.svg` | none — original artwork | "A linked chain from data revision to a loadable checkpoint" / course author | Original work, all rights held by the course | n/a | none | Linked chain of four boxes — data revision, code revision, training run, loadable checkpoint — joined by hash-links | Original illustration for SLOP4225. |

## Responsive treatment

All twelve banners share one global rule (`src/pages/lectures/[slug].astro`):

- Desktop (≥481px): `aspect-ratio: 3/1; object-fit: cover` — the approved
  ~3:1 crop.
- Mobile (≤480px): `aspect-ratio: 3/2; object-fit: contain` — a deliberate,
  documented exception to the desktop crop rule. Every banner here is an
  informative diagram (not a decorative photograph), so cropping into it on
  a narrow viewport would cut off labelled content; `contain` shows the full
  diagram instead of cropping it, at the cost of some letterboxing.

Verified at 1920×1080 and 390×844 for Week 3 and spot-checked across the
other eleven; no horizontal overflow, no cropped-off labels.
