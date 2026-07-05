# What is swarmx

swarmx is a local browser dashboard. It spawns the coding CLIs you already have
installed and logged in — each agent *is* that binary — and gives them a
coordination layer: a shared inbox, a shared blackboard, and one orchestrator you
talk to. You describe what you want in plain language; it breaks the work down,
delegates, and reports back.

![swarmx dashboard: multiple real CLI agents running side by side](/assets/hero-terminals.png)

## Not a wrapper

Most "agent orchestration" tools either reimplement the LLM client (losing the
subscription auth you paid for) or wrap the CLI at the wrong layer (ACP, HTTP
shims) that can't reuse your session. swarmx is the thinnest layer that adds
coordination without replacing anything: it runs the CLIs themselves. So OAuth,
rate limits, and plan quotas all behave exactly like typing `claude` in your own
terminal. swarmx never reads or stores your tokens.

## Three things it does

- **[Swarm collaboration](/en/guide/swarm)** — one orchestrator plus workers spawned on demand, dividing up a task.
- **[Research committee](/en/guide/research-committee)** — several models consult on a question in parallel, compared and synthesized.
- **[Fusion](/en/guide/fusion)** — several models each write a version of the same need, gated by an objective check, best synthesized and merged.

The multi-model source for the last two is [Comate Zulu](/en/guide/zulu-setup) —
one license reaches a dozen-plus models.

## How it's built

Three layers, nothing else:

```
  MCP   ─►  swarm_send_message / swarm_write_blackboard / swarm_spawn_worker …
            (native tools the LLM calls; swarmx-mcp speaks stdio JSON-RPC)
  shim  ─►  swarmx-shim execvp's the real CLI, emits OSC ready/exit (~70 lines)
  PTY   ─►  the unmodified claude / codex / opencode / reasonix / zulu binary
```

The browser opens a WebSocket per agent for the live terminal, plus one
`/ws/swarm` event stream. The Rust server (axum, loopback-only) owns process
spawning, the inbox, the blackboard, recordings, and the scheduler that turns
blackboard writes into wakeups. Each engine's quirks — opencode's TUI, reasonix /
zulu's HTTP/SSE — are absorbed in per-CLI adapters. See
[Architecture](/en/reference/architecture) for the full picture.

Ready? Head to the [quick start](/en/guide/quickstart).
