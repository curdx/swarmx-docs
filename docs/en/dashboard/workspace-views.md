# Workspace views

Once you enter a workspace, the six tabs are six perspectives on the same team. This page covers the four you'll use most; for [Competition](/en/guide/fusion) and the [Research committee](/en/guide/research-committee), see their own guides.

## Chat

The default view, and your main interface for working with the team.

- **Status bar** — the top shows the workspace/direction name, how many AIs are currently online, the number of source contexts, the current branch, and an honest **engine availability** hint: only engines verified to actually run are marked "available." If no engine is available, an "Install AI engine" entry is shown; if the captain is starting up, "Preparing the captain…" is displayed.
- **Plan checklist** — the plan maintained by the orchestrator is pinned above the conversation: **Plan · maintained by the captain · completed/total**. Each step carries a status icon (done / in progress / blocked / to-do) and an owner (the captain or a worker role). When everything is done, it collapses to "Plan complete."
- **Conversation and input** — a natural-language input box; an "Optimize input" button that lets the AI rewrite your words more clearly (preserving technical details, inventing no requirements); you can send a message to a specific member or to **everyone**; you can **interrupt** a running member; and you can pick a **model** for the current direction (opus/sonnet/haiku tiers + thinking effort low/medium/high/very high/max — switching restarts the captain, with a confirmation prompt).
- **In-stream dispatch and delivery cards** — when the captain dispatches a worker, a "Dispatched to {role}" card appears in the conversation stream (open it to enter that worker's drawer); when a worker finishes, a "{role} delivered" card appears.
- **Members panel** — the right side lists all members. The orchestrator is pinned at the top with a gold ring and a "captain/scheduler" label; workers are temporary. Each row shows a status dot, a one-line "what it's doing right now" (e.g., "Calling Edit · file · 0:42"), an unread count, and a "Wake" button; members in error sort to the top. A "Recent activity" summary at the bottom aggregates each worker's latest progress.

## Collaboration graph

Draws the relationships between members as a real-time dependency graph.

- **Legend**: **Satisfied** (solid green line, the dependency's handoff is ready), **Waiting** (amber dashed line, animated, the dependency is not yet satisfied), **Spawned** (thin gray arrow, a parent-child spawn relationship).
- **Canvas**: one node per agent (including exited workers, grayed out as "done"), showing the role, `engine · id`, a status dot, a pause marker, and handoff signals (`→ key` in green, or `✗ key.error` in red for a failed handoff). Beyond a certain node count, a minimap and zoom controls appear. Nodes are selectable but not draggable.
- **Details panel**: selecting a node shows the role, engine, **status** (ready / terminated / paused / starting), handoff signals, the keys it depends on, and offers "Open agent drawer / Wake / Pause · Resume."
- **Bulk controls**: "Stop all / Resume all" in the top-right applies to every member of the current direction (with a confirmation), and shows the number currently paused.

## Work ledger

A read-only view of the orchestrator's thinking process (the captain is the sole writer; you are the reader).

- **Task ledger** — goal, hypotheses, plan (step dependency graph).
- **Progress state** — current step, dispatched work, blockers.
- **Recent activity** — the latest progress heartbeat from each worker, newest first.
- **Actions** — "Refresh" and "Compact" (use a small model to summarize the ledger in place, reporting the tokens saved). Each card shows "last updated XX ago."

## Recordings

Every agent's terminal session is recorded to a replayable file; this view is the workspace's recording library.

- **Cards** — show the agent's identifier, a **live/done** badge, a first-frame thumbnail (columns×rows + duration), the start time, and "Play / Download." You can search by agent/id and filter by role.
- **Player** — full-screen and distraction-free. Shortcuts: space to play/pause, ←/→ to jump back/forward 5 seconds, single-frame stepping, Esc to go back. An in-progress recording can only be played up to the part already written.

To dig into a single member (terminal, activity, messages, outputs), click it to open the [Agent drawer](/en/dashboard/agent-drawer).
