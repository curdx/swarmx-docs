# Orchestrator and roles

At the heart of swarm collaboration is a resident **orchestrator** (called the "captain" in the UI) and a **role catalog** it can dispatch from on demand. Understanding these two is understanding how swarmx turns a single request into a team that divides the work and collaborates.

## Orchestrator (captain)

Each [direction](/en/guide/directions-and-isolation) has exactly one orchestrator, resident from the moment the direction is created until it ends. You always talk only to it, and it decides whether to do the work itself or split it and dispatch others.

It maintains two ledgers written on the blackboard, serving as the team's shared memory:

- **Task ledger** — objective, known facts, assumptions, acceptance criteria, and plan (a dependency graph of steps).
- **Progress ledger** — current state, steps in progress, dispatched work, and blockers.

Work proceeds in two phases:

- **First activation**: scan the project read-only, write both ledgers, greet you, and then stop. This step usually takes 20–40 seconds.
- **Every subsequent wakeup**: sense changes → triage → plan a dispatch or supervise an iteration → update the ledgers → stop.

Because the ledgers are written on the blackboard, even if the orchestrator process is restarted it can read the ledgers back and continue working — **the ledger is the recovery point**. When the progress ledger is marked fully complete, the server judges the direction wrapped up and no longer repeatedly relaunches the orchestrator.

## When to dispatch a worker

The orchestrator follows a clear principle of scale: **if it can do the work itself within half a minute, it dispatches no one**; it splits the work only when more effort is required, and it prefers to **dispatch as few as possible**.

| Task size | Number dispatched |
|---|---|
| A single fact / fixing a typo / hello world | 0 (do it itself) |
| Single file / single interface | 1 |
| Multiple files (frontend only or backend only) | 1–2 |
| Full stack (frontend + backend) | 2–3 |
| Full stack + tests + end-to-end + docs | 3–5 |
| Breadth research / "find all…" / "compare X and Y" | 5–10 in parallel |

Implementation tasks proceed in dependency order; research tasks fan out in parallel. Dispatch is done through `swarm_spawn_worker`: the orchestrator specifies a role and concrete instructions, and the server fills in the default engine and model for the role, generates the handoff contract for that worker, wires up the wakeup, and returns the new agent's id.

## Role catalog

Workers are not conjured out of nothing; they are instantiated from a built-in role catalog. Each role is a responsibility (SOP) template that declares a default engine, a default model tier, its area of expertise, and the type of handoff it produces. Roles are decoupled from engines — the same role can be carried out by different engines.

| Role | Default engine | Positioning |
|---|---|---|
| **Orchestrator** | claude | Resident captain: scans, plans, dispatches, and maintains the ledgers. |
| **Frontend** | claude | UI components, styling, frontend interaction, and visualization. |
| **Backend** | codex | Server-side logic, interfaces, the data layer, and system- and shell-leaning work. |
| **Reviewer** | claude | Independently reviews real diffs, finding correctness defects, edge cases, and places to simplify; best used with an engine different from the implementer's for an independent perspective. |
| **Test Runner** | codex | Actually runs the test suite and reports pass/fail and root cause; does not modify code. |
| **Docs Writer** | claude | Writes docs, README, comments, and explanations based on real code. |
| **Researcher** | claude | Codebase and reference research, comparing options, and drawing sourced conclusions and trade-offs. |
| **Fixer** | codex | Targets a specific failure (a red test / broken build / bug) and locates and fixes it with the minimal change. |

::: tip About topology
The current default topology is deliberately minimal: creating a workspace brings up only a single orchestrator, and everything downstream is dispatched by it ad hoc as the task requires (no team structure is declared in advance). The roles in the table above are the catalog of workers the orchestrator can choose from, not a fixed workflow you have to orchestrate by hand.
:::

## Typed handoffs

Workers do not connect through conventional file names but through **typed handoffs**. Each role declares the "type" it produces (`done` by default). At dispatch time, the server generates a canonical blackboard key for that worker and injects the instruction "when finished, write the summary here, then stop."

When a downstream worker declares a dependency, it only needs to write "depends on a certain type of output from a certain role," with no need to hand-write a specific key name — the server resolves it, verifies that the producer indeed exists and will produce that type (a mistyped key name is rejected with a hint), and wires up the wakeup. This way, who produces, who consumes, and on what signal a wakeup fires are all explicit and verifiable. See [Blackboard and inbox](/en/guide/blackboard-and-inbox) and [Wake mechanism](/en/guide/wake-mechanism) for details.
