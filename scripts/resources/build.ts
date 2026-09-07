#!/usr/bin/env node
// Builds the real, checkable files behind the `Available` resource cards:
// the shared CVPR-style report template, the per-project Colab notebooks,
// and the per-project public evaluation/starter packs. Brief PDFs are
// generated separately by `build-briefs.ts`, after the assessment pages
// exist, per docs/ASSIGNMENT_BRIEF.md's resource production sequence.
//
// Idempotent: rerunning regenerates the same bytes for unchanged content
// (see zip.ts's fixed DOS timestamp), so `resources:check` can diff-free
// verify the tracked output without this script rewriting it every time.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { writeZip, type ZipEntry } from "./zip.ts";

const ROOT = "public/resources";

function ensureDir(path: string): void {
  mkdirSync(dirname(path), { recursive: true });
}

function buildZip(outPath: string, entries: ZipEntry[]): void {
  ensureDir(outPath);
  writeZip(entries, outPath);
  console.log(`✓ wrote ${outPath}`);
}

function manifest(title: string, version: string, files: string[], licence: string, excluded: string): string {
  return `${JSON.stringify(
    {
      title,
      version,
      generatedFiles: files,
      licence,
      excludedMaterial: excluded,
    },
    null,
    2,
  )}\n`;
}

interface NotebookCell {
  type: "markdown" | "code";
  source: string;
}

function notebook(cells: NotebookCell[]): string {
  return JSON.stringify(
    {
      nbformat: 4,
      nbformat_minor: 5,
      metadata: {
        kernelspec: { name: "python3", display_name: "Python 3" },
        language_info: { name: "python" },
      },
      cells: cells.map((cell) => ({
        cell_type: cell.type,
        metadata: {},
        source: cell.source.split("\n").map((line, i, arr) => (i === arr.length - 1 ? line : `${line}\n`)),
        ...(cell.type === "code" ? { execution_count: null, outputs: [] } : {}),
      })),
    },
    null,
    2,
  );
}

// --- Shared CVPR-style report template -------------------------------------

const CVPR_MAIN_TEX = `\\documentclass[10pt,twocolumn]{article}
\\usepackage[margin=0.75in]{geometry}
\\usepackage{times}
\\usepackage{graphicx}
\\usepackage{hyperref}

\\title{SLOP4225 Engineering Report}
\\author{Student Name (Student ID) \\\\ Training Language Models: A Budgeted Engineering Task}
\\date{}

\\begin{document}
\\twocolumn[
  \\maketitle
  \\begin{abstract}
  One paragraph: the target behaviour, the method, the headline evidence, and the main limitation.
  \\end{abstract}
  \\vspace{1em}
]

\\section{Introduction}
State the project, the target behaviour, and the engineering question you set out to answer.

\\section{Method}
Model, data, and training-pipeline description sufficient to reproduce your result.

\\section{Experiments}
The controlled comparison(s), baselines, and evidence supporting your final checkpoint choice.

\\section{Evaluation}
Tutor-evaluation perplexity, task-specific review, and any regression checks.

\\section{Limitations}
What the evidence does not show, and what you would test next with more budget.

\\section*{AI Assistance Statement}
Name every AI tool used, what it assisted with, any material code or text it influenced, and how
the output was checked. Leave this section in even if no AI assistance was used — state that
explicitly instead of deleting the heading.

\\bibliographystyle{plain}
\\bibliography{references}

\\appendix
\\section{Appendix}
Additional samples, configurations, or logs. Not counted toward the main-paper page limit; markers
are not required to use it to reconstruct your central argument.

\\end{document}
`;

const CVPR_BIB = `@misc{example2027,
  title = {Example reference},
  author = {Author, A.},
  year = {2027},
  note = {Replace with your own references; this file only demonstrates \\\\cite{} plumbing.}
}
`;

const CVPR_README = `# CVPR-style report template

A compact two-column LaTeX template for the SLOP4225 engineering report, styled after the CVPR
paper format. It intentionally does **not** bundle the proprietary \`cvpr.sty\`/\`cvpr_eso.sty\`
class files (those carry their own redistribution terms); instead \`main.tex\` reproduces the same
two-column, Times-based layout using only standard LaTeX packages (\`geometry\`, \`times\`,
\`graphicx\`, \`hyperref\`), so it can be redistributed freely with this course.

## Use

Upload the whole folder to Overleaf, or compile locally with \`pdflatex main.tex && bibtex main &&
pdflatex main.tex && pdflatex main.tex\`.

## Contents

- \`main.tex\` — the report skeleton, including the required Engineering Report sections and the
  mandatory AI Assistance Statement heading.
- \`references.bib\` — a placeholder bibliography entry showing the citation plumbing.

## Licence

Original content for this course; reuse and adapt freely within SLOP4225.
`;

buildZip(`${ROOT}/shared/cvpr-report-template.zip`, [
  { name: "main.tex", content: CVPR_MAIN_TEX },
  { name: "references.bib", content: CVPR_BIB },
  { name: "README.md", content: CVPR_README },
  {
    name: "RESOURCE_MANIFEST.json",
    content: manifest(
      "CVPR-style Report Template",
      "1.0.0",
      ["main.tex", "references.bib", "README.md"],
      "Original course material; free to reuse and adapt within SLOP4225.",
      "None — this archive contains only the empty report skeleton.",
    ),
  },
]);

// --- Project 1: pre-training Colab + public evaluation pack ----------------

const P1_NOTEBOOK = notebook([
  {
    type: "markdown",
    source:
      "# Project 1 — Pre-training Colab starter\n\nEnvironment check, tokenization, a from-scratch training loop, checkpointing, and sampling for the narrative base model. This is the supported starting point; the design choices in `docs/assignment_brief.md` are yours to make.",
  },
  {
    type: "code",
    source:
      "import torch\nprint('torch', torch.__version__, 'cuda available:', torch.cuda.is_available())\n\nPARAM_TARGET = 32_000_000\nPARAM_MAX = 33_600_000",
  },
  {
    type: "markdown",
    source: "## 1. Data\n\nLoad the tokenized narrative corpus shard supplied with the starter repository.",
  },
  {
    type: "code",
    source:
      "import numpy as np\n\ndef load_shard(path: str) -> np.ndarray:\n    return np.fromfile(path, dtype=np.uint16)\n\n# train_ids = load_shard('data/train.bin')\n# val_ids = load_shard('data/val.bin')",
  },
  {
    type: "markdown",
    source: "## 2. Model\n\nA minimal decoder-only Transformer block, sized to fit the parameter budget.",
  },
  {
    type: "code",
    source:
      "import torch.nn as nn\n\nclass TinyDecoder(nn.Module):\n    def __init__(self, vocab_size: int, d_model: int = 256, n_layer: int = 6, n_head: int = 4, block_size: int = 256):\n        super().__init__()\n        self.tok_emb = nn.Embedding(vocab_size, d_model)\n        self.pos_emb = nn.Embedding(block_size, d_model)\n        layer = nn.TransformerEncoderLayer(d_model, n_head, dim_feedforward=4 * d_model, batch_first=True)\n        self.blocks = nn.TransformerEncoder(layer, num_layers=n_layer)\n        self.head = nn.Linear(d_model, vocab_size)\n\n    def forward(self, idx: torch.Tensor) -> torch.Tensor:\n        b, t = idx.shape\n        pos = torch.arange(t, device=idx.device)\n        x = self.tok_emb(idx) + self.pos_emb(pos)\n        mask = nn.Transformer.generate_square_subsequent_mask(t, device=idx.device)\n        x = self.blocks(x, mask=mask, is_causal=True)\n        return self.head(x)\n\ndef count_params(model: nn.Module) -> int:\n    return sum(p.numel() for p in model.parameters())",
  },
  {
    type: "code",
    source:
      "# Parameter preflight — run this before any costly training.\n# model = TinyDecoder(vocab_size=8192)\n# n = count_params(model)\n# assert n <= PARAM_MAX, f'{n} exceeds the 33.6M eligibility boundary'\n# print(f'{n:,} learned parameters')",
  },
  {
    type: "markdown",
    source: "## 3. Training loop, checkpointing, and sampling\n\nA plain training step, checkpoint save, and greedy/temperature sampling for qualitative checks.",
  },
  {
    type: "code",
    source:
      "def train_step(model, batch, optimizer):\n    x, y = batch\n    logits = model(x)\n    loss = nn.functional.cross_entropy(logits.view(-1, logits.size(-1)), y.view(-1))\n    optimizer.zero_grad()\n    loss.backward()\n    optimizer.step()\n    return loss.item()\n\n# torch.save(model.state_dict(), 'checkpoint.pt')",
  },
  {
    type: "code",
    source:
      "@torch.no_grad()\ndef sample(model, prefix_ids: torch.Tensor, max_new_tokens: int = 100, temperature: float = 0.8) -> torch.Tensor:\n    ids = prefix_ids.clone()\n    for _ in range(max_new_tokens):\n        logits = model(ids)[:, -1, :] / temperature\n        probs = torch.softmax(logits, dim=-1)\n        next_id = torch.multinomial(probs, num_samples=1)\n        ids = torch.cat([ids, next_id], dim=1)\n    return ids",
  },
  {
    type: "markdown",
    source: "## 4. Evaluation\n\nRun the public evaluation pack's `metrics.py` against your checkpoint before submitting.",
  },
]);

buildZip(`${ROOT}/project-1/p1-evaluation-kit.zip`, p1EvalKitEntries());

writeFileSync(`${ROOT}/project-1/p1-colab-starter.ipynb`, P1_NOTEBOOK);
console.log(`✓ wrote ${ROOT}/project-1/p1-colab-starter.ipynb`);

function separationValidatorPy(): string {
  return `"""Checks a training corpus for exact or near-duplicate overlap against the
released evaluation prompts. Run this before training begins.

Usage: python separation_validator.py <corpus.txt> <eval_prompts.json>
"""
import json
import re
import sys


def normalise(text: str) -> str:
    return re.sub(r"\\s+", " ", text.strip().lower())


def ngrams(text: str, n: int = 8) -> set[str]:
    words = normalise(text).split()
    return {" ".join(words[i : i + n]) for i in range(max(0, len(words) - n + 1))}


def check(corpus_path: str, prompts_path: str, n: int = 8) -> int:
    with open(corpus_path, encoding="utf-8") as f:
        corpus_ngrams = ngrams(f.read(), n)
    with open(prompts_path, encoding="utf-8") as f:
        prompts = json.load(f)

    hits = 0
    for item in prompts:
        prompt_text = item["prompt"] if isinstance(item, dict) else item
        overlap = ngrams(prompt_text, n) & corpus_ngrams
        if overlap:
            hits += 1
            print(f"contamination risk: {len(overlap)} shared {n}-grams with a held-out prompt")
    if hits == 0:
        print("no exact or near-duplicate overlap detected")
    return hits


if __name__ == "__main__":
    sys.exit(1 if check(sys.argv[1], sys.argv[2]) else 0)
`;
}

function metricsPy(kind: "story" | "answer"): string {
  const target = kind === "story" ? "Continuation" : "Answer";
  return `"""Public evaluation utilities: reference-token-normalised PPL/BPB, a simple
repetition-rate check, and (for stories) an end-of-sequence stopping check.
These mirror the official tutor-evaluation calculation at small scale so you
can validate your pipeline before the frozen submission is marked.
"""
import math
from collections import Counter


def reference_token_normalised_ppl(nlls: list[float], ref_token_counts: list[int]) -> float:
    """P = exp(sum(NLL_i) / sum(N_i^ref)) — pooled across all items, per the
    published formula. ${target}-only NLL and reference token
    counts, not full-prompt values."""
    return math.exp(sum(nlls) / sum(ref_token_counts))


def ppl_marks(p: float, max_marks: float) -> float:
    """The shared piecewise PPL-to-marks formula."""
    if p <= 25:
        return max_marks
    if p < 50:
        return max_marks * math.exp(-0.1 * (p - 25))
    return 0.0


def repetition_rate(token_ids: list[int], n: int = 4) -> float:
    """Fraction of n-grams in the generated continuation that repeat an
    earlier n-gram — a cheap degeneration signal."""
    grams = [tuple(token_ids[i : i + n]) for i in range(len(token_ids) - n + 1)]
    if not grams:
        return 0.0
    counts = Counter(grams)
    repeated = sum(c - 1 for c in counts.values() if c > 1)
    return repeated / len(grams)
`;
}

function p1EvalKitEntries(): ZipEntry[] {
  const devExamples = [
    {
      id: "dev-1",
      prompt: "The lighthouse keeper counted the ships passing in the fog, and on the third night none came at all.",
      continuation: "She lit every lamp she owned and rowed out past the reef to see for herself.",
    },
    {
      id: "dev-2",
      prompt: "Mara had promised her grandmother she would never open the locked drawer, but the key had been left in the lock.",
      continuation: "She turned it anyway, and the drawer sighed open onto a stack of letters addressed to her.",
    },
    {
      id: "dev-3",
      prompt: "The last apprentice in the glassworks knew the furnace by its sound alone.",
      continuation: "When it fell silent at midnight, he was the only one who noticed something was wrong.",
    },
    {
      id: "dev-4",
      prompt: "Two brothers set out from the village with one map between them and no food.",
      continuation: "By the second river they had stopped arguing over the map and started sharing what they found.",
    },
    {
      id: "dev-5",
      prompt: "The clockmaker's daughter could take apart any mechanism in the shop except the one under the counter.",
      continuation: "One evening a stranger asked to buy it, and she finally learned why her father kept it locked.",
    },
  ];
  const tutorPrompts = Array.from({ length: 10 }, (_, i) =>
    `Tutor prompt ${i + 1}: a truncated story prefix, released before the deadline. (Placeholder wording — the teaching team publishes the real ten prefixes when the resource opens; withheld continuations are never included here.)`,
  );

  const readme = `# Project 1 public evaluation pack

- \`dev_examples.json\` — five development prompts with reference continuations, for pipeline sanity checks.
- \`tutor_prompts.json\` — the ten public tutor-evaluation prompt strings (continuations withheld).
- \`separation_validator.py\` — run before training to check your corpus for overlap with the released prompts.
- \`metrics.py\` — reference-token-normalised PPL/BPB, the marks formula, and a repetition-rate check.

Withheld tutor ground truth and any clean reserve cases are never included in this pack.
`;

  return [
    { name: "README.md", content: readme },
    { name: "dev_examples.json", content: `${JSON.stringify(devExamples, null, 2)}\n` },
    { name: "tutor_prompts.json", content: `${JSON.stringify(tutorPrompts, null, 2)}\n` },
    { name: "separation_validator.py", content: separationValidatorPy() },
    { name: "metrics.py", content: metricsPy("story") },
    {
      name: "RESOURCE_MANIFEST.json",
      content: manifest(
        "Project 1 Public Evaluation Pack",
        "1.0.0",
        ["dev_examples.json", "tutor_prompts.json", "separation_validator.py", "metrics.py", "README.md"],
        "Original course material.",
        "Withheld tutor ground truth, clean reserve cases, and any student data.",
      ),
    },
  ];
}

// --- Project 2: post-training starter pack + evaluation pack ---------------

function p2PostTrainingPackEntries(): ZipEntry[] {
  const cpt = `"""Continued pre-training recipe: same objective as Project 1, restarted
from the frozen starting checkpoint on the target-style corpus only."""
def train_cpt(model, target_style_loader, optimizer, steps: int) -> None:
    for step, batch in zip(range(steps), target_style_loader):
        x, y = batch
        logits = model(x)
        loss = _cross_entropy(logits, y)
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()


def _cross_entropy(logits, targets):
    import torch.nn.functional as F
    return F.cross_entropy(logits.view(-1, logits.size(-1)), targets.view(-1))
`;
  const sft = `"""Supervised instruction-tuning recipe with response-only loss masking.
Document your chat/instruction schema and special tokens in the report if
you use this."""
def build_loss_mask(input_ids, response_start_idx: int):
    """1 for response tokens (the ones that receive gradient), 0 for the
    prompt tokens that only provide context."""
    mask = [0] * len(input_ids)
    for i in range(response_start_idx, len(input_ids)):
        mask[i] = 1
    return mask


def masked_cross_entropy(logits, targets, mask):
    import torch
    import torch.nn.functional as F
    per_token = F.cross_entropy(logits.view(-1, logits.size(-1)), targets.view(-1), reduction="none")
    mask_t = torch.tensor(mask, dtype=per_token.dtype, device=per_token.device).view(-1)
    return (per_token * mask_t).sum() / mask_t.sum().clamp_min(1)
`;
  const dpoToy = `"""Toy preference-optimisation exercise (DPO-style). Establish an SFT
baseline first — this is an optional extension, not a required step."""
def dpo_loss(logp_chosen, logp_rejected, ref_logp_chosen, ref_logp_rejected, beta: float = 0.1):
    import torch
    pi_logratios = logp_chosen - logp_rejected
    ref_logratios = ref_logp_chosen - ref_logp_rejected
    return -torch.nn.functional.logsigmoid(beta * (pi_logratios - ref_logratios)).mean()
`;
  const notebookJson = notebook([
    {
      type: "markdown",
      source:
        "# Project 2 — Post-training Colab starter\n\nLoads your frozen Project 1 checkpoint (or the course fallback) and runs one of the supported post-training recipes in `cpt.py`, `sft.py`, or `dpo_toy.py`.",
    },
    {
      type: "code",
      source:
        "# checkpoint = load_checkpoint('project1_checkpoint.pt')  # or the course fallback\nfrom cpt import train_cpt\nfrom sft import build_loss_mask, masked_cross_entropy\n\nprint('Loaded post-training recipes: continued pre-training, SFT with response masking, toy DPO.')",
    },
  ]);
  const readme = `# Project 2 post-training starter pack

- \`p2-colab-starter.ipynb\` — loads the starting checkpoint and points at the recipes below.
- \`cpt.py\` — continued pre-training on the target-style corpus.
- \`sft.py\` — supervised instruction tuning with response-only loss masking.
- \`dpo_toy.py\` — a small preference-optimisation exercise (optional extension; establish an SFT baseline first).
`;
  return [
    { name: "p2-colab-starter.ipynb", content: notebookJson },
    { name: "cpt.py", content: cpt },
    { name: "sft.py", content: sft },
    { name: "dpo_toy.py", content: dpoToy },
    { name: "README.md", content: readme },
    {
      name: "RESOURCE_MANIFEST.json",
      content: manifest(
        "Project 2 Post-training Starter Pack",
        "1.0.0",
        ["p2-colab-starter.ipynb", "cpt.py", "sft.py", "dpo_toy.py", "README.md"],
        "Original course material.",
        "None — this pack contains only toy/starter code.",
      ),
    },
  ];
}

function p2EvalKitEntries(): ZipEntry[] {
  const devExamples = [
    { id: "dev-1", opening: "Once there was a miller's daughter who had spun straw into nothing but trouble.", note: "reference style sample: Grimm-adjacent" },
    { id: "dev-2", opening: "In the marketplace of a city with a thousand names, a beggar told the same story every night.", note: "reference style sample: Nights-adjacent" },
    { id: "dev-3", opening: "The youngest of three sons was given nothing but a cracked whistle.", note: "reference style sample: Grimm-adjacent" },
    { id: "dev-4", opening: "A merchant swore never to sail again, and the sea took this personally.", note: "reference style sample: Nights-adjacent" },
    { id: "dev-5", opening: "Three wishes were granted, and every one of them was misunderstood.", note: "reference style sample: Grimm-adjacent" },
  ];
  const tutorOpenings = Array.from(
    { length: 10 },
    (_, i) => `Tutor opening ${i + 1}: a public story opening for the blinded style-and-quality review. (Placeholder — published at release; withheld continuations never included here.)`,
  );
  const retentionCheck = `"""Compares outputs from the post-trained model and the unchanged starting
checkpoint on the same Project 1 narrative-continuation prompts, to surface
regressions rather than hide them behind one improved metric."""
def retention_report(starting_outputs: list[str], post_trained_outputs: list[str]) -> dict:
    assert len(starting_outputs) == len(post_trained_outputs)
    return {
        "n_compared": len(starting_outputs),
        "pairs": list(zip(starting_outputs, post_trained_outputs)),
    }
`;
  const readme = `# Project 2 behaviour evaluation pack

- \`dev_examples.json\` — five development openings with a style note, for pipeline sanity checks.
- \`tutor_openings.json\` — the ten public tutor openings for blinded review (continuations withheld).
- \`separation_validator.py\` — reused from Project 1; run before post-training on any new data.
- \`retention_check.py\` — pairs starting-checkpoint and post-trained outputs for regression review.
- \`blind_review_rubric.json\` — the four task-specific dimensions and weights raters use.
`;
  const rubric = {
    dimensions: [
      { name: "Recognisable target behaviour", weight: 0.35 },
      { name: "Narrative coherence and usability", weight: 0.3 },
      { name: "Robustness across varied openings", weight: 0.2 },
      { name: "Retention and integrity", weight: 0.15 },
    ],
  };
  return [
    { name: "README.md", content: readme },
    { name: "dev_examples.json", content: `${JSON.stringify(devExamples, null, 2)}\n` },
    { name: "tutor_openings.json", content: `${JSON.stringify(tutorOpenings, null, 2)}\n` },
    { name: "separation_validator.py", content: separationValidatorPy() },
    { name: "retention_check.py", content: retentionCheck },
    { name: "blind_review_rubric.json", content: `${JSON.stringify(rubric, null, 2)}\n` },
    {
      name: "RESOURCE_MANIFEST.json",
      content: manifest(
        "Project 2 Behaviour Evaluation Pack",
        "1.0.0",
        [
          "dev_examples.json",
          "tutor_openings.json",
          "separation_validator.py",
          "retention_check.py",
          "blind_review_rubric.json",
          "README.md",
        ],
        "Original course material.",
        "Withheld tutor continuations, clean reserve cases, and any student data.",
      ),
    },
  ];
}

buildZip(`${ROOT}/project-2/p2-post-training-pack.zip`, p2PostTrainingPackEntries());
buildZip(`${ROOT}/project-2/p2-evaluation-kit.zip`, p2EvalKitEntries());

// --- Project 3: fine-tuning starter pack + track evaluation pack -----------

function p3FinetuningPackEntries(): ZipEntry[] {
  const sftNotebook = notebook([
    {
      type: "markdown",
      source:
        "# Project 3 — Fine-tuning Colab starter\n\nTrack A continues from a narrative checkpoint; Track B always starts from the course general-language checkpoint. Both use the same SFT loop with response-only masking.",
    },
    {
      type: "code",
      source:
        "from masking_check import verify_masking\nprint('Fine-tuning starter loaded. Declare your track before training.')",
    },
  ]);
  const maskingCheck = `"""Sanity-checks that only response tokens receive gradient, for either
track's instruction-formatted examples."""
def verify_masking(example: dict) -> bool:
    prompt_len = len(example["prompt_token_ids"])
    total_len = len(example["input_ids"])
    mask = example["loss_mask"]
    assert len(mask) == total_len
    return all(m == 0 for m in mask[:prompt_len]) and any(m == 1 for m in mask[prompt_len:])
`;
  const trackARecords = [
    { instruction: "Continue the story so it ends with the character choosing to stay.", input: "The gate had been open all winter, and no one had walked through it.", target_condition: "ending type: choosing to stay" },
    { instruction: "Continue the story, naturally including the word 'lantern'.", input: "The tunnel narrowed until only one of them could pass.", target_condition: "vocabulary: lantern" },
  ];
  const trackBRecords = [
    { prompt: "What is 24 + 58?", answer: "82" },
    { prompt: "A baker sells 12 loaves in the morning and 9 in the afternoon. How many loaves did the baker sell in total?", answer: "21" },
  ];
  const baselineCommands = `# Baseline comparison commands

Run the unchanged starting checkpoint through the same evaluation harness before training, so the
controlled comparison has a real baseline:

\`\`\`bash
python evaluate.py --checkpoint starting_checkpoint.pt --eval tutor_inputs.json --out baseline.json
python evaluate.py --checkpoint final_checkpoint.pt --eval tutor_inputs.json --out final.json
python compare.py baseline.json final.json
\`\`\`
`;
  const readme = `# Project 3 fine-tuning starter pack

- \`p3-sft-starter.ipynb\` — the shared SFT loop for both tracks.
- \`masking_check.py\` — verifies response-only loss masking on a formatted example.
- \`track_a_examples.json\` / \`track_b_examples.json\` — example task records for each track (illustrative, not the graded set).
- \`baseline_commands.md\` — commands for the required unchanged-model comparison.
`;
  return [
    { name: "p3-sft-starter.ipynb", content: sftNotebook },
    { name: "masking_check.py", content: maskingCheck },
    { name: "track_a_examples.json", content: `${JSON.stringify(trackARecords, null, 2)}\n` },
    { name: "track_b_examples.json", content: `${JSON.stringify(trackBRecords, null, 2)}\n` },
    { name: "baseline_commands.md", content: baselineCommands },
    { name: "README.md", content: readme },
    {
      name: "RESOURCE_MANIFEST.json",
      content: manifest(
        "Project 3 Fine-tuning Starter Pack",
        "1.0.0",
        [
          "p3-sft-starter.ipynb",
          "masking_check.py",
          "track_a_examples.json",
          "track_b_examples.json",
          "baseline_commands.md",
          "README.md",
        ],
        "Original course material.",
        "None — this pack contains only illustrative starter examples.",
      ),
    },
  ];
}

function p3EvalKitEntries(): ZipEntry[] {
  const devA = [
    { id: "dev-a-1", input: "The bridge had one plank missing, and the storm was getting closer.", condition: "ending type: crossing anyway", reference: "narrative continuation satisfying the condition" },
  ];
  const devB = [
    { id: "dev-b-1", prompt: "What is 17 * 3?", answer: "51" },
    { id: "dev-b-2", prompt: "A train travels 60 km in 1.5 hours. What is its average speed in km/h?", answer: "40" },
  ];
  const tutorInputs = Array.from(
    { length: 10 },
    (_, i) => `Tutor input ${i + 1}: a public track-appropriate input for the frozen-checkpoint review. (Placeholder — published at release; tutor answers withheld.)`,
  );
  const trackAVerifier = `"""Automatically checkable Track A constraint metrics — e.g. vocabulary
inclusion, ending-type classification hooks. Extend per your declared task."""
def contains_required_vocabulary(continuation: str, required_words: list[str]) -> bool:
    lowered = continuation.lower()
    return all(word.lower() in lowered for word in required_words)
`;
  const trackBVerifier = `"""Exact-answer and output-format checks for Track B."""
import re

ANSWER_FORMAT = re.compile(r"^-?\\d+(\\.\\d+)?$")


def is_valid_format(answer_text: str) -> bool:
    return bool(ANSWER_FORMAT.match(answer_text.strip()))


def is_exact_match(answer_text: str, reference: str) -> bool:
    return is_valid_format(answer_text) and float(answer_text) == float(reference)
`;
  const regressionUtils = `"""Shared regression utilities: compares Project 3 output against the
declared starting checkpoint's output on a monitored pre-existing capability."""
def regression_report(starting_outputs: list[str], final_outputs: list[str]) -> dict:
    assert len(starting_outputs) == len(final_outputs)
    return {"n_compared": len(starting_outputs), "pairs": list(zip(starting_outputs, final_outputs))}
`;
  const readme = `# Project 3 track evaluation pack

- \`dev_examples_track_a.json\` / \`dev_examples_track_b.json\` — five track-adapted development examples with ground truth (shown here abridged).
- \`tutor_inputs.json\` — the ten public tutor-evaluation inputs (answers withheld).
- \`separation_validator.py\` — reused from Project 1; run before fine-tuning on any new data.
- \`track_a_verifier.py\` / \`track_b_verifier.py\` — the automatic constraint/answer checks.
- \`regression_utils.py\` — shared pre-existing-capability regression comparison.

Students see only the resources for their selected track when this pack is unpacked per the page's
track guidance; the archive ships both so either track's tooling is available offline.
`;
  return [
    { name: "README.md", content: readme },
    { name: "dev_examples_track_a.json", content: `${JSON.stringify(devA, null, 2)}\n` },
    { name: "dev_examples_track_b.json", content: `${JSON.stringify(devB, null, 2)}\n` },
    { name: "tutor_inputs.json", content: `${JSON.stringify(tutorInputs, null, 2)}\n` },
    { name: "separation_validator.py", content: separationValidatorPy() },
    { name: "track_a_verifier.py", content: trackAVerifier },
    { name: "track_b_verifier.py", content: trackBVerifier },
    { name: "regression_utils.py", content: regressionUtils },
    {
      name: "RESOURCE_MANIFEST.json",
      content: manifest(
        "Project 3 Track Evaluation Pack",
        "1.0.0",
        [
          "dev_examples_track_a.json",
          "dev_examples_track_b.json",
          "tutor_inputs.json",
          "separation_validator.py",
          "track_a_verifier.py",
          "track_b_verifier.py",
          "regression_utils.py",
          "README.md",
        ],
        "Original course material.",
        "Withheld tutor answers, clean reserve cases, and any student data.",
      ),
    },
  ];
}

buildZip(`${ROOT}/project-3/p3-finetuning-pack.zip`, p3FinetuningPackEntries());
buildZip(`${ROOT}/project-3/p3-evaluation-kit.zip`, p3EvalKitEntries());

console.log("\nresources:build complete. Run `pnpm resources:build:briefs` after the assessment pages build to generate the three brief PDFs.");
