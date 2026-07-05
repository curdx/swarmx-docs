# Blackboard and inbox

Multiple agents do not share the same conversation context. Their collaboration is built on two explicit vehicles: the **blackboard** carries artifacts, and the **inbox** carries signals. The two have distinct duties and are used together.

## Blackboard

The blackboard is a shared key-value store that any agent can read and write by path. It carries the things that need to be persisted for others to draw on: task ledgers, progress records, interface contracts, review conclusions, and artifacts of all kinds.

Characteristics:

- **Many-to-many, persistent** — anyone can read and write any key, and the content is saved to disk.
- **Version history** — every write appends a record, so you can look back at "who wrote what and when" for a given key, and mid-course revisions are traceable.
- **Full-text search** — keys and content enter the full-text index and are searchable.
- **Write means wakeup** — when a key is written, agents that declared a dependency on it are woken up immediately (see [Wake mechanism](/en/guide/wake-mechanism)).
- **External edits are detected** — if you edit a blackboard file directly in your editor, that too is detected and recorded in the history.

**Scope**: keys are usually prefixed with the workspace and direction, so different directions and different workspaces do not overwrite each other. Members sharing the same direction can see each other's keys; whereas [Fusion](/en/guide/fusion) competitors are confined to their own prefixes, cannot see each other, and are thus guaranteed independent implementations.

## Inbox

The inbox is a point-to-point message channel. Compared with the blackboard, which carries "artifacts," messages carry the signal that "something happened": requesting help, reporting results, asking questions, giving answers.

- **Message types**: `note` (general communication), `ask` (a request), `reply` (an answer), `wake` (a system wake signal, not human mail).
- **Threading**: a reply can hang below a given message, forming a conversation chain.
- **Read tracking**: messages record their sent, delivered, and read times; an agent reading its own messages marks them read automatically — but **wake signals are the exception**, to ensure the end-of-turn check can still see them.

## How the two work together

The typical pattern is: **first write the artifact to the blackboard, then send a notification message**. An agent subscribed to that blackboard key is woken by the write; a recipient that is not subscribed is woken by the message. Separating artifact from signal makes collaboration both documented and promptly driven.

## The swarm tools an agent uses

The capabilities above are exposed to the model as native MCP tools. An agent calls them just like any other tool:

| Tool | Purpose |
|---|---|
| `swarm_send_message` | Send a message to another agent (or the user), optionally specifying a type and reply target. |
| `swarm_list_messages` | List recent messages sent to itself (marks non-wake messages read). |
| `swarm_search_messages` | Full-text search across all messages. |
| `swarm_list_agents` | List all agents (online and historical). |
| `swarm_list_blackboard` | List all blackboard keys and their latest version info. |
| `swarm_read_blackboard` | Read the current content of a key. |
| `swarm_write_blackboard` | Write to / overwrite a key, signed as itself. |
| `swarm_spawn_worker` | Dispatch a worker, specifying a role and instructions (see [Orchestrator and roles](/en/guide/orchestrator-and-roles)). |
| `swarm_list_roles` | View the catalog of roles available for dispatch. |
| `swarm_name_thread` | Name the current direction once (triggers isolation on a git project). |
| `swarm_fusion_consult` | Start a multi-model [research committee](/en/guide/research-committee) consultation. |

In the dashboard, blackboard content appears in the [work ledger](/en/dashboard/workspace-views) and the "Context" tab of the agent drawer; messages appear in the chat stream and the "Messages" tab of the drawer.
