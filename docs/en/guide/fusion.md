# Fusion

Fusion hands the **same need** to a few models; each implements it independently in
an isolated git worktree. Attach an **objective check** (e.g. `pytest`, `cargo
test`) as a hard gate, and a judge synthesizes the best of them back into the main
line.

## One-click autopilot

Type one need, tick "autopilot", click once — the rest runs on its own:

1. The server picks a panel of available models (races distinct CLIs if you have
   two or more, otherwise several models under one zulu license).
2. Each model implements the need in its own isolated worktree.
3. Once the contestants have committed, it enters the synthesize judge stage.
4. The judge synthesizes the best version and merges it into the main line.

No manual steps. A **server-side watchdog** backstops the verdict: whether or not a
model finishes cleanly, the batch never silently stalls — it either merges or
falls back to a manual pick.

## Manual mode

Turn autopilot off for the classic flow: name 2–4 contestants yourself, drive them
to implement, then hit "judge / auto-judge / synthesize" and pick a winner to
merge. Use it when you want to control every step.

## Objective check (optional but recommended)

Give a check command (like `python3 check.py`, `cargo test`) and swarmx runs it for
real inside each contestant's worktree. That's harder evidence than reading a diff:
any contestant that fails the check is out, no matter how clean its code looks.

## Prerequisite

The models are powered by Comate Zulu (or your logged-in claude / codex etc. in
cross-engine mode). See [Install Zulu and set your license](/en/guide/zulu-setup).
