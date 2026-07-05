# How it works

This page explains, at a conceptual level, how swarmx runs your CLIs, how it lets multiple agents collaborate, and how it handles privacy and security.

## What it is

swarmx runs the claude, codex, opencode, and reasonix binaries you have installed as-is inside a pseudo-terminal, letting them collaborate on the same task through a shared inbox and blackboard. It is not yet another model client — authentication, rate limits, and plan quotas behave exactly as they do when you use them directly in a terminal.

## Three-layer structure

From the bottom up, swarmx is divided into three layers, each with a single responsibility:

| Layer | Responsibility |
|---|---|
| Terminal layer | Unmodified CLI binaries run on top of the PTY. Authentication, rate limits, and usage behavior match a terminal environment, and credentials are always managed by the CLI itself. |
| Adapter layer | A very thin wrapper process launches the CLI and reports two lifecycle signals to the server: "ready" and "exited." |
| Tool layer | Collaboration capabilities are exposed to the model as native MCP tools: sending messages, reading and writing the blackboard, dispatching workers, and so on. The model calls them just as it would any other tool. |

Above these, a Rust-based server (listening only on the local loopback address) coordinates process lifecycle, the inbox, the blackboard, session recording, and wake scheduling.

## Data flow

Take creating an agent as an example:

1. The browser asks the server to create an agent, specifying the CLI to use and the working directory.
2. The server writes the MCP and hook configuration for the agent, then launches the CLI inside a PTY.
3. Once the CLI is ready, the server broadcasts the status to all frontends and begins recording the terminal byte stream into a replayable session file.
4. The browser opens a live WebSocket terminal connection for the agent; a separate event stream continuously receives status and message updates.
5. The running model sends messages and reads and writes the blackboard through MCP tools, and these calls are ultimately handled and persisted by the server.

## Wake mechanism

Coding CLIs typically follow a "process one turn, then stop and wait" pattern. This means that even if another agent sends it a message, it will not wake up on its own. swarmx addresses this through two paths:

- **Check at the end of a turn** — each time the CLI finishes a turn, a check is triggered. If there are unread messages, the agent is asked to run one more turn to read and respond to them; otherwise it stops normally.
- **Wake on write** — when a blackboard key is written, the server immediately wakes every agent that has declared a dependency on that key, including ones that had already stopped. The entire process requires no polling and cannot deadlock through mutual waiting.

## Blackboard and inbox

The two collaboration channels each serve a distinct purpose:

| Channel | Carries | Characteristics |
|---|---|---|
| Blackboard | Structured artifacts and shared context | Many-to-many, key-value, persistent, with full-text search and version history; a write automatically wakes subscribers. |
| Inbox | Point-to-point "something happened" signals | One-to-one, ordered, with read-status tracking; a message triggers the recipient's turn check. |

The typical pattern is: write the artifact to the blackboard, then send a notification message. Subscribers are woken by the blackboard write, while recipients who are not subscribed are woken by the message.

## Per-engine differences

Different CLIs are driven in different ways, but the dashboard presents a unified agent view:

| Engine | How it runs | Auto-wake |
|---|---|---|
| claude | PTY terminal | Yes |
| codex | PTY terminal | Yes (requires 0.132 or later) |
| opencode | Full-screen TUI, driven through its official control interface | Yes |
| reasonix | HTTP / SSE service | Yes |

## Privacy and security boundaries

- The server binds only to `127.0.0.1` and is never exposed externally; middleware rejects all requests from non-local origins.
- swarmx neither reads nor stores any login credentials — it only passes `HOME` through to child processes, reusing the CLI's existing login state.
- When launching a child process, it builds the environment variables from a clean slate, avoiding leaking sensitive variables to the CLI.

## Packaging and runtime resources

The desktop version is packaged with Tauri: the server and its accompanying binaries are embedded as sidecars, and the required built-in resources are compiled in at build time. Users can therefore download, install, and open it ready to use, without relying on any repository directory or manual configuration. Runtime parameters can be adjusted through environment variables; see [Configuration](/en/reference/configuration) for details.
