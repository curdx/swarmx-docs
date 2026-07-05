# What is swarmx

swarmx is a browser dashboard that runs locally. It launches the coding CLIs you have already installed and logged in to inside a pseudo-terminal (PTY) — each agent is the CLI binary itself — and connects them through a collaboration layer: a shared inbox, a shared blackboard, and a single orchestrator that serves as the entry point. You describe your goal to the orchestrator in natural language, and it handles the breakdown, dispatch, and aggregation of results.

![The swarmx dashboard: multiple real CLI agents running in parallel](/assets/hero-terminals.png)

## Runs the CLI directly, not a re-wrapper

Most agent orchestration tools take one of two routes: they rewrite a model client, thereby abandoning the subscription authentication you have already paid for; or they wrap the CLI at the wrong layer and cannot reuse an existing session. swarmx only adds coordination on top and replaces nothing — what runs is always the CLI itself. As a result, authentication, rate limits, and plan quotas behave exactly as they do when you use the tool directly in a terminal, and swarmx neither reads nor stores any credentials.

## Three collaboration modes

- **[Swarm collaboration](/en/guide/swarm)** — an orchestrator leads workers dispatched on demand to complete a task together.
- **[Research committee](/en/guide/research-committee)** — multiple models consult on the same question in parallel, synthesized into a conclusion after a structured comparison.
- **[Fusion](/en/guide/fusion)** — multiple models each implement the same requirement, gated by an objective check, with the best solution synthesized and merged.

The multi-model capability behind the last two modes is provided by [Comate Zulu](/en/guide/zulu-setup) — a single license gives access to more than a dozen models.

## How it's built

swarmx has a three-layer structure:

- **Terminal layer** — unmodified CLI binaries run on top of the PTY; authentication and usage behavior are identical to a terminal environment.
- **Adapter layer** — a very thin wrapper process launches the CLI and reports its ready and exit status to the server.
- **Tool layer** — collaboration capabilities are exposed to the model as native MCP tools, such as sending messages, reading and writing the blackboard, and dispatching workers.

The browser opens a live WebSocket terminal connection for each agent and receives status and message updates through a separate event stream. The server handles process lifecycle, the inbox, the blackboard, session recording, and the scheduling that turns blackboard writes into wakeups. Differences between engines are contained within their respective adapters, and the dashboard presents a unified agent view. For more detail, see [How it works](/en/reference/architecture).

When you are ready, start with the [quick start](/en/guide/quickstart).
