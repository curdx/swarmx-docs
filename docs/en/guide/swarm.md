# Swarm collaboration

Swarm collaboration is swarmx's default mode: you deal with a single persistent
**orchestrator**, and it scales the team to the task.

<div class="tip custom-block" style="padding:8px 16px;">

Tell the orchestrator what you need; it decides whether to do it itself or split
it across a few workers — no pre-declared topology, spawned per task (the
Magentic-One approach).

</div>

![Talking to the orchestrator in plain language](/assets/screenshot-orchestrator-chat.png)

## How members coordinate

- **Shared inbox** — agents address each other by id (`swarm_send_message`);
  messages land at the recipient's next turn boundary, no polling.
- **Shared blackboard** — a markdown KV store with full-text search, versioned
  history, and live push on every write. Conventions in the
  [handoff protocol](/en/reference/handoff-protocol).
- **Push-style wakeup** — write a blackboard key and every agent waiting on it
  wakes up in the same tick, including ones that had gone idle. No polling, no
  deadlock.

## Collaboration you can see

The Flow view draws the dependencies and waits between members in real time; the
Ledger shows task progress and blackboard state.

![Live dependency DAG of the swarm](/assets/screenshot-dag.png)

A concrete example: ask the orchestrator to "create two files, one worker each,"
and you'll watch it come online, spawn two workers (they can be different
engines — a claude orchestrator with codex workers), have each finish, and report
back.
