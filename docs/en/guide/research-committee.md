# Research committee

Important decisions should not rely on a single model. The research committee has multiple models answer the same question in parallel, after which a reviewer model synthesizes each model's answer into **consensus, disagreement, unique perspectives, and blind spots** — a comparison, not a vote — with a synthesis model finally producing a finished answer. For technology selection, solution review, competitive analysis, or seeking a dissenting opinion on a high-stakes decision, this is more reliable than repeatedly pressing a single model.

It is a "Q&A / research" style of multi-model collaboration, distinct from [Fusion](/en/guide/fusion)'s "code contest": what is produced here is a conclusion, not code. The multi-model capability is provided by [Comate Zulu](/en/guide/zulu-setup) — a single license can call more than a dozen models.

![Research committee: multiple models answer in parallel, structured comparison, synthesized final answer](/assets/screenshot-consult.png)

## How to use it

1. Open the workspace's "Research committee" tab.
2. Enter a question worth a multi-model consultation.
3. Select **2 to 8 models** to form the participating lineup (a cross-vendor combination is provided by default, falling back to the first few available models when some are missing).
4. Click "Start consultation" and wait about 1 to 2 minutes.

## What happens behind the scenes

1. **Answering in parallel** — each selected model answers the same question independently, executing in parallel. As long as one model produces an answer, the process continues; it errors only if all fail.
2. **Structured comparison** — a reviewer model synthesizes each model's answer into four dimensions: **consensus** (points the majority agree on), **disagreement** (points that contradict one another), **unique perspectives** (points only one model raised), and **blind spots** (important aspects none considered). It is explicitly required to compare, not to vote, and not to stitch answers together.
3. **Synthesized final answer** — a synthesis model writes a final answer based on the comparison above: consensus as the backbone, the better side of each disagreement with reasons, unique perspectives incorporated, and blind spots filled — a fresh piece of writing, not a simple stitch.

## The result contains

- **Synthesized final answer** — the final answer given by the synthesis model.
- **Structured analysis** — the four columns of consensus / disagreement / unique perspectives / blind spots, each with an item count.
- **Raw answers** — each model's full response and elapsed time, which can be expanded and compared one by one; failed models are also flagged.

## Cost

A single consultation is roughly equivalent to "number of models + 2" single-model calls (N participating models, plus one synthesis-of-comparison and one synthesis). This is a capability aimed at high-value decisions, not a default everyday path — use it when a more reliable conclusion is worth several times the cost.

## Prerequisites

You must first install Zulu and configure a Comate license. If it is not yet configured, the model list is empty and the page prompts you to go to "Settings → Plugins." See [Install Zulu and configure a license](/en/guide/zulu-setup) for details.
