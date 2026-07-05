# Research committee

Don't rest an important decision on one model. The research committee has several
models answer the same question in parallel; a judge breaks their answers into
**consensus, contradictions, unique points, and blind spots** — a comparison, not
a vote — and an outer model then synthesizes a final answer. Tech selection,
design review, red-teaming a risky call — all better than re-prompting one model.

![Research committee: parallel answers, structured comparison, synthesized verdict](/assets/screenshot-consult.png)

## How to use it

1. Open the "Research Committee" tab in a workspace.
2. Type a question worth a multi-model consult.
3. Pick 2–8 models (a cross-vendor default is provided).
4. Click "Start consult" and wait 1–2 minutes.

The result has three parts:

- **Synthesized verdict** — the final answer the outer model writes from the comparison.
- **Structured analysis** — the consensus / contradictions / unique insights / blind spots panels.
- **Raw answers** — each model's own reply, expandable to compare directly.

## Cost

Roughly `(models + 2)` single-model calls (N panel + one judge + one synthesis).
This is a high-value button, not the default path — reach for it when a more
reliable conclusion is worth a few times the cost.

## Prerequisite

The committee's models are powered by Comate Zulu. Set it up first via
[Install Zulu and set your license](/en/guide/zulu-setup) — one license reaches a
dozen-plus models.
