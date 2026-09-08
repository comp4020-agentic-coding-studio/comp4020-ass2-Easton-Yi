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
\\author{Student Name (Student ID) \\\\ SLOP4225: Budgeted Language Model Training}
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
paper format. \`main.tex\` reproduces the same two-column, Times-based layout using only standard,
freely-redistributable LaTeX packages (\`geometry\`, \`times\`, \`graphicx\`, \`hyperref\`).

## Upstream source and licence status

This is **not** the official CVPR author kit. The official kit (\`cvpr.sty\`, \`cvpr_eso.sty\`) is
maintained at [github.com/cvpr-org/author-kit](https://github.com/cvpr-org/author-kit), but that
repository does not publish an explicit redistribution licence for those class files, so this
course cannot verify it is safe to bundle them here. Until that licence is confirmed, this template
intentionally avoids the real class files and reproduces the same visual layout with standard
packages instead. If the teaching team later confirms a redistribution basis, this archive should
be replaced with the genuine \`cvpr.sty\`/\`cvpr_eso.sty\` and this note updated to record the
confirmed source and licence.

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

// Disabled: no confirmed redistribution licence for the official CVPR
// author-kit class files (cvpr.sty/cvpr_eso.sty) — see CVPR_README above and
// src/data/resource-manifest.ts's CVPR_UNAVAILABLE_REASON. The template
// entries render `unavailable` (no localPath is set) rather than shipping
// this interim substitute. Re-enable only once a real licence basis is
// confirmed and CVPR_README/the manifest are updated to record it.
// buildZip(`${ROOT}/shared/cvpr-report-template.zip`, [
//   { name: "main.tex", content: CVPR_MAIN_TEX },
//   { name: "references.bib", content: CVPR_BIB },
//   { name: "README.md", content: CVPR_README },
//   {
//     name: "RESOURCE_MANIFEST.json",
//     content: manifest(
//       "CVPR-style Report Template",
//       "1.0.0",
//       ["main.tex", "references.bib", "README.md"],
//       "Original course material; free to reuse and adapt within SLOP4225.",
//       "None — this archive contains only the empty report skeleton.",
//     ),
//   },
// ]);

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

// Disabled: the ten real tutor-evaluation prompts are drawn from the
// properly source-separated narrative corpus, which the teaching team has
// not yet provisioned — see p1EvalKitEntries()'s own README pending-note and
// src/data/resource-manifest.ts's p1-eval unavailableReason. No localPath is
// set on that manifest entry, so the card renders `unavailable` without this
// partial archive existing in public/.
// buildZip(`${ROOT}/project-1/p1-evaluation-kit.zip`, p1EvalKitEntries());

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
  const readme = `# Project 1 public evaluation pack

- \`dev_examples.json\` — five development prompts with reference continuations, for pipeline sanity checks.
- \`separation_validator.py\` — run before training to check your corpus for overlap with the released prompts.
- \`metrics.py\` — reference-token-normalised PPL/BPB, the marks formula, and a repetition-rate check.

## Pending: tutor-evaluation prompts

The ten public tutor-evaluation prompt strings are not included in this pack. They are drawn from
the properly source-separated narrative corpus, which is a teaching-team deliverable that does not
yet exist in this repository (see \`docs/ASSIGNMENT_BRIEF.md\`'s "Unresolved decisions"). This pack
therefore cannot yet be marked \`Available\` on the Project 1 page; the resource card states this
dependency and links no fabricated file. No placeholder prompt strings are shipped in their place.

Withheld tutor ground truth and any clean reserve cases are never included in this pack.
`;

  return [
    { name: "README.md", content: readme },
    { name: "dev_examples.json", content: `${JSON.stringify(devExamples, null, 2)}\n` },
    { name: "separation_validator.py", content: separationValidatorPy() },
    { name: "metrics.py", content: metricsPy("story") },
    {
      name: "RESOURCE_MANIFEST.json",
      content: manifest(
        "Project 1 Public Evaluation Pack (partial — tutor prompts pending)",
        "0.9.0",
        ["dev_examples.json", "separation_validator.py", "metrics.py", "README.md"],
        "Original course material.",
        "Ten tutor-evaluation prompts (teaching-team corpus dependency, not yet available), withheld tutor ground truth, clean reserve cases, and any student data.",
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
        "# Project 2 — Post-training Colab starter\n\nLoads your frozen Project 1 checkpoint (or the course fallback) and runs one of the supported post-training recipes in `cpt.py`, `sft.py`, or `dpo_toy.py`, through checkpoint reload and sampling. The assigned Project 2 GitLab repository owns the starting-checkpoint file and the target-style dataset shards; this notebook does not duplicate them.",
    },
    {
      type: "code",
      source:
        "# 1. Environment check\nimport torch\nprint('torch', torch.__version__, 'cuda available:', torch.cuda.is_available())\n\nPARAM_TARGET = 32_000_000\nPARAM_MAX = 33_600_000\nGPU_HOUR_BUDGET = 12\nFLOP_BUDGET = 1.5e17",
    },
    {
      type: "markdown",
      source: "## 2. Starting checkpoint and parameter preflight\n\nLoad your frozen Project 1 checkpoint, or the course narrative fallback, and confirm it is still within the eligibility boundary before spending compute on it.",
    },
    {
      type: "code",
      source:
        "import torch.nn as nn\n\ndef load_checkpoint(path: str) -> nn.Module:\n    \"\"\"Loads a frozen Project 1 (or fallback) checkpoint. The checkpoint file\n    itself is provided by the assigned GitLab repository, not this notebook.\"\"\"\n    state = torch.load(path, map_location='cpu')\n    model = build_model_from_config(state['config'])\n    model.load_state_dict(state['model'])\n    return model\n\ndef build_model_from_config(config: dict) -> nn.Module:\n    raise NotImplementedError('supplied by the Project 2 GitLab repository')\n\n# model = load_checkpoint('project1_checkpoint.pt')\n# n = sum(p.numel() for p in model.parameters())\n# assert n <= PARAM_MAX, f'{n} exceeds the 33.6M eligibility boundary'",
    },
    {
      type: "markdown",
      source: "## 3. Data loading and validation\n\nLoad the assigned target-style corpus shard and run the reused separation validator before any post-training step.",
    },
    {
      type: "code",
      source:
        "import numpy as np\n\ndef load_shard(path: str) -> np.ndarray:\n    return np.fromfile(path, dtype=np.uint16)\n\n# target_ids = load_shard('data/target_style_train.bin')\n# Run: python separation_validator.py data/target_style_train.txt dev_examples.json\n# before training on any new or expanded corpus.",
    },
    {
      type: "markdown",
      source: "## 4. Training: choose one supported recipe\n\n`cpt.py` continues pre-training on the target-style corpus; `sft.py` performs response-only-masked instruction tuning; `dpo_toy.py` is an optional preference-optimisation extension that assumes an SFT baseline already exists.",
    },
    {
      type: "code",
      source:
        "from cpt import train_cpt\nfrom sft import build_loss_mask, masked_cross_entropy\n\ndef train_step_sft(model, batch, optimizer):\n    input_ids, target_ids, response_start_idx = batch\n    logits = model(input_ids)\n    mask = build_loss_mask(input_ids, response_start_idx)\n    loss = masked_cross_entropy(logits, target_ids, mask)\n    optimizer.zero_grad()\n    loss.backward()\n    optimizer.step()\n    return loss.item()\n\n# optimizer = torch.optim.AdamW(model.parameters(), lr=2e-5)\n# for step, batch in enumerate(target_style_loader):\n#     loss = train_step_sft(model, batch, optimizer)",
    },
    {
      type: "markdown",
      source: "## 5. Checkpoint save and fresh-process reload\n\nSave the post-trained checkpoint, then reload it in a clean process before evaluating — the same fresh-environment loading test required at submission.",
    },
    {
      type: "code",
      source:
        "# torch.save({'config': config, 'model': model.state_dict()}, 'post_trained_checkpoint.pt')\n# reloaded = load_checkpoint('post_trained_checkpoint.pt')  # run in a fresh process/session",
    },
    {
      type: "markdown",
      source: "## 6. Evaluation and sampling\n\nCompute reference-token-normalised perplexity on the withheld continuations once released, and sample de-identified outputs for the blinded task-specific review.",
    },
    {
      type: "code",
      source:
        "import math\n\ndef reference_token_normalised_ppl(nlls: list[float], ref_token_counts: list[int]) -> float:\n    return math.exp(sum(nlls) / sum(ref_token_counts))\n\n@torch.no_grad()\ndef sample(model, prefix_ids: torch.Tensor, max_new_tokens: int = 100, temperature: float = 0.8) -> torch.Tensor:\n    ids = prefix_ids.clone()\n    for _ in range(max_new_tokens):\n        logits = model(ids)[:, -1, :] / temperature\n        probs = torch.softmax(logits, dim=-1)\n        next_id = torch.multinomial(probs, num_samples=1)\n        ids = torch.cat([ids, next_id], dim=1)\n    return ids",
    },
    {
      type: "markdown",
      source: "## Limitations and external dependencies\n\nThis notebook covers the post-training pipeline shape only. The starting checkpoint weights, the target-style dataset shards, and the tutor-evaluation prompts are owned by the assigned GitLab repository and the Hugging Face dataset release respectively, and are never duplicated here. `retention_check.py` in the evaluation pack must be run against the *unchanged* starting checkpoint, not a value hard-coded in this notebook.",
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
    {
      id: "dev-1",
      opening: "Once there was a miller's daughter who had spun straw into nothing but trouble.",
      continuation:
        "By the third night she had run out of straw and out of lies, so she told the king plainly that no gold would come from wishing, only from what she chose to do next.",
      note: "reference style sample: Grimm-adjacent",
    },
    {
      id: "dev-2",
      opening: "In the marketplace of a city with a thousand names, a beggar told the same story every night.",
      continuation:
        "On the night a stranger finally asked why, the beggar admitted the story was the only thing he owned outright, and he had been saving it to trade for a single true listener.",
      note: "reference style sample: Nights-adjacent",
    },
    {
      id: "dev-3",
      opening: "The youngest of three sons was given nothing but a cracked whistle.",
      continuation:
        "He blew it anyway, expecting silence, and instead the whistle summoned every bird in the kingdom to carry him wherever the roads would not.",
      note: "reference style sample: Grimm-adjacent",
    },
    {
      id: "dev-4",
      opening: "A merchant swore never to sail again, and the sea took this personally.",
      continuation:
        "It sent storms to his docked ship every night until he finally admitted, to no one but the water, that he missed it more than he feared it.",
      note: "reference style sample: Nights-adjacent",
    },
    {
      id: "dev-5",
      opening: "Three wishes were granted, and every one of them was misunderstood.",
      continuation:
        "By the time the third wish undid the damage of the first two, the wisher had learned to want less and to say exactly what he meant.",
      note: "reference style sample: Grimm-adjacent",
    },
  ];
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

- \`dev_examples.json\` — five development openings, each with a genuine reference continuation and style note, for pipeline sanity checks.
- \`separation_validator.py\` — reused from Project 1; run before post-training on any new data.
- \`retention_check.py\` — pairs starting-checkpoint and post-trained outputs for regression review.
- \`blind_review_rubric.json\` — the four task-specific dimensions and weights raters use.

## Pending: tutor-evaluation openings

The ten public tutor-evaluation openings are not included in this pack. They are drawn from the
properly source-separated corpus, which is a teaching-team deliverable that does not yet exist in
this repository. This pack therefore cannot yet be marked \`Available\` on the Project 2 page; no
placeholder opening strings are shipped in their place.
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
    { name: "separation_validator.py", content: separationValidatorPy() },
    { name: "retention_check.py", content: retentionCheck },
    { name: "blind_review_rubric.json", content: `${JSON.stringify(rubric, null, 2)}\n` },
    {
      name: "RESOURCE_MANIFEST.json",
      content: manifest(
        "Project 2 Behaviour Evaluation Pack (partial — tutor openings pending)",
        "0.9.0",
        ["dev_examples.json", "separation_validator.py", "retention_check.py", "blind_review_rubric.json", "README.md"],
        "Original course material.",
        "Ten tutor-evaluation openings (teaching-team corpus dependency, not yet available), withheld tutor continuations, clean reserve cases, and any student data.",
      ),
    },
  ];
}

buildZip(`${ROOT}/project-2/p2-post-training-pack.zip`, p2PostTrainingPackEntries());
// Disabled: same tutor-prompt provisioning gap as Project 1's evaluation
// pack — see p2EvalKitEntries()'s README pending-note and the p2-eval
// manifest entry's unavailableReason.
// buildZip(`${ROOT}/project-2/p2-evaluation-kit.zip`, p2EvalKitEntries());

// --- Project 3: fine-tuning starter pack + track evaluation pack -----------

function p3FinetuningPackEntries(): ZipEntry[] {
  const sftNotebook = notebook([
    {
      type: "markdown",
      source:
        "# Project 3 — Fine-tuning Colab starter\n\nTrack A continues from a narrative checkpoint (Project 1, Project 2, or the course fallback); Track B always starts from the course general-language checkpoint. Both use the same SFT loop with response-only masking. Declare your track before running any training cell. The assigned Project 3 GitLab repository owns the starting checkpoints and, for Track B, the `test_pilot` schema (operations, ranges, output format) — none of that is duplicated here.",
    },
    {
      type: "code",
      source:
        "# 1. Environment check\nimport torch\nprint('torch', torch.__version__, 'cuda available:', torch.cuda.is_available())\n\nPARAM_MAX = 33_600_000\nGPU_HOUR_BUDGET = 12\nFLOP_BUDGET = 1.5e17\nTRACK = 'A'  # or 'B' — set before running any cell below",
    },
    {
      type: "markdown",
      source: "## 2. Starting checkpoint and parameter preflight\n\nLoad the declared starting checkpoint for your track and confirm it is within the eligibility boundary.",
    },
    {
      type: "code",
      source:
        "import torch.nn as nn\n\ndef load_checkpoint(path: str) -> nn.Module:\n    \"\"\"Track A: a frozen Project 1/2 checkpoint or the narrative fallback.\n    Track B: the course general-language checkpoint. Both files are provided\n    by the assigned GitLab repository / Hugging Face release, not here.\"\"\"\n    state = torch.load(path, map_location='cpu')\n    model = build_model_from_config(state['config'])\n    model.load_state_dict(state['model'])\n    return model\n\ndef build_model_from_config(config: dict) -> nn.Module:\n    raise NotImplementedError('supplied by the Project 3 GitLab repository')\n\n# model = load_checkpoint('starting_checkpoint.pt')\n# n = sum(p.numel() for p in model.parameters())\n# assert n <= PARAM_MAX, f'{n} exceeds the 33.6M eligibility boundary'",
    },
    {
      type: "markdown",
      source: "## 3. Data loading, validation, and masking\n\nLoad your track's formatted training examples, run the reused separation validator, then verify response-only masking with `masking_check.py` before training.",
    },
    {
      type: "code",
      source:
        "from masking_check import verify_masking\n\n# Track A: instruction/target-condition records shaped like track_a_examples.json.\n# Track B: prompt/answer records shaped like track_b_examples.json, following the\n# GitLab repository's test_pilot schema once it is provisioned.\n# examples = load_track_examples('data/track_examples.json')\n# assert all(verify_masking(ex) for ex in examples), 'response-only masking check failed'\n# Run: python separation_validator.py data/track_examples.txt dev_examples_track_a.json",
    },
    {
      type: "markdown",
      source: "## 4. Training\n\nSupervised fine-tuning with response-only loss masking, shared across both tracks.",
    },
    {
      type: "code",
      source:
        "def train_step(model, batch, optimizer):\n    input_ids, target_ids, loss_mask = batch\n    logits = model(input_ids)\n    per_token = nn.functional.cross_entropy(\n        logits.view(-1, logits.size(-1)), target_ids.view(-1), reduction='none',\n    )\n    mask_t = torch.tensor(loss_mask, dtype=per_token.dtype).view(-1)\n    loss = (per_token * mask_t).sum() / mask_t.sum().clamp_min(1)\n    optimizer.zero_grad()\n    loss.backward()\n    optimizer.step()\n    return loss.item()\n\n# optimizer = torch.optim.AdamW(model.parameters(), lr=2e-5)\n# for step, batch in enumerate(track_loader):\n#     loss = train_step(model, batch, optimizer)",
    },
    {
      type: "markdown",
      source: "## 5. Checkpoint save, fresh-process reload, and baseline comparison\n\nSave the fine-tuned checkpoint, reload it in a clean process, and run both the starting and fine-tuned checkpoints through the same evaluation harness — see `baseline_commands.md`.",
    },
    {
      type: "code",
      source:
        "# torch.save({'config': config, 'model': model.state_dict()}, 'final_checkpoint.pt')\n# reloaded = load_checkpoint('final_checkpoint.pt')  # run in a fresh process/session\n# then follow baseline_commands.md to compare against the unchanged starting checkpoint",
    },
    {
      type: "markdown",
      source: "## 6. Evaluation and task inference\n\nTrack A: check declared-condition satisfaction with `track_a_verifier.py`. Track B: check exact-answer and output-format validity with `track_b_verifier.py`. Both compare against the unchanged starting checkpoint with `regression_utils.py` for the required regression check.",
    },
    {
      type: "code",
      source:
        "from track_a_verifier import contains_required_vocabulary\nfrom track_b_verifier import is_exact_match, is_valid_format\nfrom regression_utils import regression_report\n\n@torch.no_grad()\ndef sample(model, prefix_ids: torch.Tensor, max_new_tokens: int = 100, temperature: float = 0.8) -> torch.Tensor:\n    ids = prefix_ids.clone()\n    for _ in range(max_new_tokens):\n        logits = model(ids)[:, -1, :] / temperature\n        probs = torch.softmax(logits, dim=-1)\n        next_id = torch.multinomial(probs, num_samples=1)\n        ids = torch.cat([ids, next_id], dim=1)\n    return ids",
    },
    {
      type: "markdown",
      source: "## Limitations and external dependencies\n\nThis notebook covers the fine-tuning pipeline shape only. Starting checkpoints, Track B's `test_pilot` schema (supported operations, value ranges, output format, difficulty range), and the tutor-evaluation inputs are owned by the assigned GitLab repository and are never duplicated here. `track_a_examples.json`/`track_b_examples.json` in the starter pack are illustrative, not the graded task distribution.",
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
  // Five development examples total for Project 3 (not five per track): both
  // docs/ASSIGNMENT_BRIEF.md ("The course also publishes five worked
  // development examples and ten tutor-evaluation inputs") and
  // docs/CONTENT_SOURCE.md's Project 3 resource table ("Five development
  // examples, ten tutor inputs") use singular counts with no per-track
  // qualifier, so the split below (3 Track A + 2 Track B) sums to five.
  const devA = [
    {
      id: "dev-a-1",
      input: "The gate had been open all winter, and no one had walked through it.",
      condition: "ending type: choosing to stay",
      reference:
        "She stood at the threshold until the frost stung her hands, then turned back toward the fire she had almost left behind, deciding that whatever waited beyond the gate could wait another year.",
    },
    {
      id: "dev-a-2",
      input: "The tunnel narrowed until only one of them could pass.",
      condition: "vocabulary: lantern",
      reference:
        "He handed her the lantern and told her to go first, watching its light shrink into the dark until only the sound of her footsteps remained.",
    },
    {
      id: "dev-a-3",
      input: "The old woman said the well had never run dry, not even in the driest summer.",
      condition: "contradiction: the well is later described as recently emptied",
      reference:
        "By autumn the well had gone dry for the first time anyone could remember, and no one dared ask the old woman why she had lied.",
    },
  ];
  const devB = [
    { id: "dev-b-1", prompt: "What is 17 * 3?", answer: "51" },
    { id: "dev-b-2", prompt: "A train travels 60 km in 1.5 hours. What is its average speed in km/h?", answer: "40" },
  ];
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

- \`dev_examples_track_a.json\` (3 examples) / \`dev_examples_track_b.json\` (2 examples) — five
  development examples total across both tracks, each with genuine reference/ground truth.
- \`separation_validator.py\` — reused from Project 1; run before fine-tuning on any new data.
- \`track_a_verifier.py\` / \`track_b_verifier.py\` — the automatic constraint/answer checks.
- \`regression_utils.py\` — shared pre-existing-capability regression comparison.

Students see only the resources for their selected track when this pack is unpacked per the page's
track guidance; the archive ships both so either track's tooling is available offline.

## Pending: tutor-evaluation inputs

The ten public tutor-evaluation inputs are not included in this pack. They are drawn from the
properly source-separated corpus (and, for Track B, the private GitLab repository's \`test_pilot\`
schema), which is a teaching-team deliverable that does not yet exist in this repository. This pack
therefore cannot yet be marked \`Available\` on the Project 3 page; no placeholder input strings are
shipped in their place.
`;
  return [
    { name: "README.md", content: readme },
    { name: "dev_examples_track_a.json", content: `${JSON.stringify(devA, null, 2)}\n` },
    { name: "dev_examples_track_b.json", content: `${JSON.stringify(devB, null, 2)}\n` },
    { name: "separation_validator.py", content: separationValidatorPy() },
    { name: "track_a_verifier.py", content: trackAVerifier },
    { name: "track_b_verifier.py", content: trackBVerifier },
    { name: "regression_utils.py", content: regressionUtils },
    {
      name: "RESOURCE_MANIFEST.json",
      content: manifest(
        "Project 3 Track Evaluation Pack (partial — tutor inputs pending)",
        "0.9.0",
        [
          "dev_examples_track_a.json",
          "dev_examples_track_b.json",
          "separation_validator.py",
          "track_a_verifier.py",
          "track_b_verifier.py",
          "regression_utils.py",
          "README.md",
        ],
        "Original course material.",
        "Ten tutor-evaluation inputs (teaching-team corpus/test_pilot dependency, not yet available), withheld tutor answers, clean reserve cases, and any student data.",
      ),
    },
  ];
}

buildZip(`${ROOT}/project-3/p3-finetuning-pack.zip`, p3FinetuningPackEntries());
// Disabled: same tutor-input provisioning gap (plus Track B's unprovisioned
// test_pilot schema) as the other two evaluation packs — see
// p3EvalKitEntries()'s README pending-note and the p3-eval manifest entry's
// unavailableReason.
// buildZip(`${ROOT}/project-3/p3-evaluation-kit.zip`, p3EvalKitEntries());

console.log("\nresources:build complete. Run `pnpm resources:build:briefs` after the assessment pages build to generate the three brief PDFs.");
