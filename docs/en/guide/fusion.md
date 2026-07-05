# Fusion

Fusion hands the **same requirement** to multiple models to implement separately, each completing it independently in an isolated working copy; you can attach an **objective check command** as a hard gate, after which a reviewer model synthesizes the best of each solution and merges it back to the mainline. It is a "code contest," distinct from [Research committee](/en/guide/research-committee)'s "Q&A consultation": what is produced here is mergeable code.

Competitors number **2 to 4** (each runs a real CLI, hence the upper bound). Each competitor implements in its own isolated working copy, unable to see or overwrite the others. Available competing engines include claude, codex, opencode, reasonix, and zulu (`zulu:model-name` lets multiple zulu models compete under a single license).

## One-click autopilot

This is the zero-click path for newcomers: enter a one-line requirement, check "Autopilot," click Start once, and the rest completes automatically.

1. **Automatic lineup selection** — if the machine has two or more available real CLIs, up to three of them form a cross-engine contest; otherwise a single Zulu license runs three models in competition. If no engine is available, it errors clearly.
2. **Parallel implementation** — each competitor implements the requirement in its own isolated working copy and commits.
3. **Automatic entry into review** — once all competitors have settled, it automatically enters the "synthesize best" review stage.
4. **Synthesize and merge** — the review synthesizes the best version and merges it back to the mainline.

The "settled" determination is based on **whether a commit was produced** (an engine-agnostic completion signal), or whether the competitor has terminated — rather than guessing "done or not" from idle time. There is an upper bound on the time to wait for implementation (20 minutes by default); on timeout it enters review as usual, letting weak or empty competitors naturally lose in the review.

## Manual mode

Turning off "Autopilot" gives a step-by-step flow: specify 2 to 4 competitors yourself, drive them to implement, then choose the arbitration method on the batch card:

- **Enter judging** — generate each competitor's change list (diff) relative to the mainline; you then arbitrate and merge by clicking "Select as winner" on a competitor.
- **Auto-judge** — dispatch a reviewer agent to read every competitor's changes, write a structured analysis (consensus / disagreement / unique perspectives / blind spots), pick a winner, and settle it.
- **Synthesize best** — dispatch a synthesis agent to blend the best of each into a single implementation by hand, commit, and merge that version (the winner is the synthesized result, not any original competitor).

## Objective check

Optionally provide a check command (such as `python3 check.py` or `cargo test`). In autopilot mode, swarmx **actually runs** this command **inside each competitor's own working copy**: exit code 0 means pass, non-zero means fail.

The check result is handed to the review as the **highest-priority hard rule**: any competitor that fails the objective check is never selected, no matter how elegant its code looks. Compared with reading a diff by hand, this catches the class of problems that "look right but run wrong." A competitor that failed to obtain an independent working copy (marked "degraded") is treated as failing the gate, avoiding treating unverifiable output as a pass.

## No deadlock: watchdog and deterministic fallback

The auto-review's arbitration is initiated by the reviewer agent itself; should it fail midway, the batch could get stuck at "judging." For this there is a **server-side watchdog** as a backstop, guaranteeing a batch never silently stalls:

- **Synthesis mode** — take the synthesis artifact the review already wrote, and merge it only if it truly has non-empty changes; otherwise switch to "awaiting decision" for a human.
- **Selection mode with objective check** — re-run the objective check in each competitor's copy, and the **first competitor to pass** wins.
- **No deterministic signal** — switch to "awaiting decision," with the interface prompting you to pick manually.

Settling the arbitration is an atomic **compare-and-set** operation, so the review's own arbitration and the watchdog's backstop never merge twice.

## States and results

A batch passes through these states:

| State | Meaning |
|---|---|
| **In progress** | Competitors are implementing in their own working copies. |
| **Judging** | The review direction and each competitor's diff have been generated; the review and watchdog are running. |
| **Awaiting decision** | Auto-review could not arbitrate deterministically; the interface prompts a manual pick. |
| **Completed** | The winner is set and the branch is merged (or there were no changes to merge). |
| **Failed** | The batch terminated in a failed state. |

The merge result is reported faithfully: **merged**, **conflict (AI is mediating)**, or **no changes to merge**. Conflicts are not dumped on you — swarmx dispatches an AI mediator to resolve them.

## Prerequisites

The multi-model capability is provided by [Comate Zulu](/en/guide/zulu-setup); in cross-engine mode it uses the claude, codex, and other CLIs you are already logged in to (see [Engine reference](/en/reference/engines)).
