# How it works

This page explains, at a conceptual level, how swarmx runs your CLIs, how multiple agents collaborate, and how it handles privacy and security. To dig deeper into any part, continue with [Orchestrator and roles](/en/guide/orchestrator-and-roles), [Blackboard and inbox](/en/guide/blackboard-and-inbox), [Wake mechanism](/en/guide/wake-mechanism), and [Directions and isolation](/en/guide/directions-and-isolation).

## Positioning

swarmx runs your already-installed claude, codex, opencode, and reasonix binaries **as-is** inside a pseudo-terminal (PTY), and lets them collaborate through a shared inbox and blackboard to complete the same task. It is not yet another model client — authentication, rate limiting, and plan-quota behavior are exactly the same as when you use these tools directly in a terminal.

## Three-layer structure

swarmx is divided into three layers from the bottom up, each with a single responsibility:

| Layer | Responsibility |
|---|---|
| **Terminal layer** | Unmodified CLI binaries run on top of the PTY. Authentication, rate limiting, and usage behavior match a terminal environment; credentials are always managed by the CLI itself. |
| **Adapter layer** | A very thin wrapper process launches the CLI and reports two lifecycle signals to the server: "ready" and "exited." |
| **Tool layer** | Collaboration capabilities are exposed to the model as native MCP tools: send a message, read and write the blackboard, dispatch a worker, and so on. The model calls them just like any other tool. |

On top of this, a Rust-based server (listening only on the local loopback address) coordinates process lifecycle, the inbox, the blackboard, session recording, and wake scheduling. The frontend is a browser dashboard that establishes a live terminal connection for each agent and receives state and message updates through a single event stream.

## Data flow

Take creating an agent as an example:

1. The browser asks the server to create an agent, specifying which CLI to use and the working directory.
2. The server writes the MCP and hook configuration for the agent, then launches the CLI inside a PTY.
3. Once the CLI is ready, the server broadcasts the state to all frontends and begins recording the terminal byte stream into a replayable session file.
4. The browser opens a live WebSocket terminal connection for the agent; a separate event stream continuously receives state and message updates.
5. The running model sends messages and reads and writes the blackboard through MCP tools, and these calls are ultimately handled and persisted by the server.

## Two vehicles for collaboration

Multiple agents do not share a context window; they collaborate through two explicit vehicles:

- **Blackboard** — a shared key-value store with full-text search and version history, carrying structured artifacts and shared context; a write instantly wakes subscribers.
- **Inbox** — point-to-point messages that carry the signal "something happened," triggering the recipient to read and respond on its next turn.

See [Blackboard and inbox](/en/guide/blackboard-and-inbox) for details.

## Wakeup

Coding CLIs typically "finish a turn and then stop and wait." swarmx uses two paths to bring a stopped agent back to work when needed: a check at the end of a turn, and an instant wakeup when a blackboard key is written. There is no polling, and no deadlock from mutual waiting. See [Wake mechanism](/en/guide/wake-mechanism) for details.

## Orchestrator and roles

Each line of work is led by a resident **orchestrator** (the captain): it scans the project, maintains a plan, and dispatches workers according to the size of the task. Workers are instantiated from a built-in role catalog, each with its own area of responsibility and default engine. See [Orchestrator and roles](/en/guide/orchestrator-and-roles) for details.

## Differences between engines

Different CLIs are driven differently, but the dashboard presents a unified agent view: claude and codex run as PTY terminals; opencode is a full-screen terminal interface driven through its official control interface; reasonix and zulu are headless HTTP/SSE services. For each engine's transport, authentication, and auto-wakeup capability, see [Engine reference](/en/reference/engines).

## Privacy and security boundary

- The server binds only to `127.0.0.1` and is not exposed externally; middleware rejects all requests from non-local origins.
- swarmx neither reads nor stores any login credentials — it only passes `HOME` through to the child process, reusing the CLI's existing login state.
- When launching a child process, variables are built from a blank environment, avoiding leaking sensitive variables to the CLI.

For a more complete account of where data is written to disk and how privacy is handled, see [Data and privacy](/en/reference/data-and-privacy).

## Packaging and runtime resources

The desktop version is packaged with Tauri; the server and its companion binaries are distributed embedded in the package, and the required built-in resources are compiled in at build time. As a result, users can download, install, and open it and use it right away, with no dependency on any repository directory or manual configuration. Runtime parameters can be adjusted through environment variables; see [Configuration](/en/reference/configuration) for details.
