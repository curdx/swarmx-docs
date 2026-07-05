# Glossary

| Term | Meaning |
|---|---|
| **Orchestrator / Captain** | The agent that lives on each direction, responsible for conversing with you, scanning the project, maintaining the plan, and spawning workers as needed. Called "captain" in the interface. See [Orchestrator and Roles](/en/guide/orchestrator-and-roles). |
| **Worker** | A temporary agent the orchestrator spawns per task, instantiated from the role catalog, exiting when done. |
| **Role** | A worker's responsibility template, declaring its default engine, model tier, and area of expertise (e.g., frontend engineer, backend engineer, reviewer, test runner). |
| **Engine** | The real coding CLI that swarmx runs: claude, codex, opencode, reasonix, zulu. See [Engine Reference](/en/reference/engines). |
| **Workspace** | One project plus one AI team. See [Create a Workspace](/en/dashboard/create-workspace). |
| **Direction** | A parallel line of work within a workspace. In a git project it automatically gets its own working copy and branch. See [Directions and Isolation](/en/guide/directions-and-isolation). |
| **Source context** | Directories outside the workspace mounted in for agents to reference (dependency source, peer projects, tooling projects). |
| **Blackboard** | A shared key-value store with search and version history, carrying artifacts and shared context. See [Blackboard and Inbox](/en/guide/blackboard-and-inbox). |
| **Inbox** | The point-to-point message channel between agents, carrying signals (note/ask/reply/wake). |
| **Handoff** | Workers dock artifacts in a "typed" way: who produces which type and who consumes it is parsed and validated by the system, not by hand-written filenames. |
| **Wake** | The mechanism that gets a stopped agent working again when needed: an end-of-turn check plus instant wake on blackboard writes. See [Wake Mechanism](/en/guide/wake-mechanism). |
| **Swarm collaboration** | The default mode: one orchestrator leads workers spawned on demand to complete a task together. See [Swarm Collaboration](/en/guide/swarm). |
| **Research Committee** | Multiple models consult on the same problem in parallel, then synthesize a final version after structured comparison. See [Research Committee](/en/guide/research-committee). |
| **Fusion** | Multiple models each implement the same requirement, gated by objective checks, with the best synthesized and merged. See [Fusion](/en/guide/fusion). |
| **MCP** | Model Context Protocol. swarmx's collaboration capabilities are exposed to models as native MCP tools (`swarm_send_message`, `swarm_write_blackboard`, and so on). |
| **PTY** | Pseudo-terminal. swarmx runs the real CLI inside a PTY so its behavior matches using it directly in a terminal. |
