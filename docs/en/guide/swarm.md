# Swarm collaboration

Swarm collaboration is the default mode of swarmx. You interact with only a single resident **orchestrator**, which scales the team to the size of the task.

After you describe your goal to the orchestrator, it decides on its own whether to complete the task directly or split it into several workers running in parallel — no workflow needs to be designed in advance; agents are dispatched at runtime as the task requires.

![Talking to the orchestrator in natural language](/assets/screenshot-orchestrator-chat.png)

## How members collaborate

- **Shared inbox** — agents address each other by id, and messages are delivered at the recipient's next turn boundary, with no polling.
- **Shared blackboard** — a key-value store with full-text search and version history; any write is pushed to subscribers immediately.
- **Instant wakeup** — when a blackboard key is written, every agent waiting on that key wakes up at the same moment, including agents that had previously stopped — no polling, and no deadlock.

## A visible collaboration process

The collaboration view draws the dependencies and waiting relationships between members as a real-time graph; the ledger view shows task progress and the state of the shared area.

![Real-time dependency graph of the swarm](/assets/screenshot-dag.png)

Take a simple task as an example: ask the orchestrator to "create two files, each handled by one worker." You will see the orchestrator come online, dispatch two workers (which can be different engines, for example a claude orchestrator paired with codex workers), and report back to you once each is done.
