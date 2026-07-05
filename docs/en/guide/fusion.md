# Fusion

Fusion hands the **same requirement** to multiple models to implement separately, each working independently in an isolated git worktree; you can attach an **objective check command** (such as `pytest` or `cargo test`) as a hard gate, after which a reviewer model synthesizes the best of each solution and merges it back into the mainline.

## One-click autopilot

Just enter a one-line requirement, check **Autopilot**, and click **Start** — the rest of the process runs automatically:

1. The server automatically selects available models to form the competing lineup (a cross-engine contest when two or more different CLIs are present, otherwise several models run under a single Zulu license).
2. Each model implements the requirement in its own isolated worktree.
3. Once all competing models have committed, it automatically enters the synthesis review stage.
4. The reviewer model synthesizes the best version and merges it into the mainline.

No manual intervention is needed at any point. The decision is backstopped by a **server-side guardian mechanism**: regardless of whether a model finishes cleanly, the batch never silently stalls — it merges once the conditions are met, otherwise it falls back to a manual decision.

## Manual mode

Turning off **Autopilot** gives a step-by-step flow: specify 2 to 4 competing models yourself, drive them to implement, then click **Review** or **Synthesize best**, and finally choose the winning solution and merge it. Suited to scenarios where you want to control every step.

## Objective check (optional, recommended)

Once you provide a check command (such as `python3 check.py` or `cargo test`), swarmx actually runs it inside each competing model's worktree. Compared with reading a code diff by hand, this is harder evidence: any solution that fails the check will not be selected, no matter how elegant its code looks.

## Prerequisite

The multi-model capability is provided by Comate Zulu (or, in cross-engine mode, the claude, codex, and other CLIs you are already logged in to). For setup, see [Install Zulu and configure a license](/en/guide/zulu-setup).
