# Engine Reference

swarmx supports five engines. They run in different ways, but all follow the same credential principle: swarmx launches the real binary, passes `HOME` through to it, and **never reads or stores any token**, reusing your existing login state directly. For installation and login, see [Install and Log In to Engines](/en/guide/install-engines).

## Auto-Wake at a Glance

| Engine | How it runs | Authentication | Auto-wake |
|---|---|---|---|
| **claude** | Terminal interface, keystroke-driven | Reuses `~/.claude` subscription login | Supported (end-of-turn hook) |
| **codex** | Terminal interface, keystroke-driven | Reuses `~/.codex` login | Supported, requires **0.132+**; dormant on lower versions |
| **opencode** | Full-screen terminal interface, driven via the official control interface | Per-provider login | Supported (idle-event plugin), requires the bundled plugin to be locatable |
| **reasonix** | Headless HTTP/SSE service | `DEEPSEEK_API_KEY` | Supported (end-of-turn events, no hook needed) |
| **zulu** | Headless HTTP/SSE service | Comate License | Supported (end-of-turn events, no hook needed) |

## claude

Runs as a full-screen terminal interface, driven by keystrokes. After passing `HOME` through, it reuses the subscription login in `~/.claude` and deliberately stays on the **interactive subscription** billing surface (it masks environment variables prefixed with `ANTHROPIC_` to avoid being switched to API billing). Auto-wake is implemented via an end-of-turn check hook. Its model tiers use Claude's own opus/sonnet/haiku and support thinking effort.

**Best used as** an orchestrator (captain) or a general-purpose worker; it is the minimum required engine.

## codex

Also runs as a terminal interface, driven by keystrokes. After passing `HOME` through, it reuses `~/.codex` (after `codex login`).

Auto-wake requires **codex 0.132 or later** — only newer codex versions can exempt an external end-of-turn hook from being trusted each time; swarmx probes for this automatically and enables it. On lower versions the engine runs normally, but auto-wake stays dormant until you trust it manually. Models do not use the opus/sonnet/haiku tiers (codex is on the gpt-5.x line).

**Best used as** an orchestrator or a worker.

## opencode

Runs as a full-screen terminal interface, but prompts are delivered through its **official control interface** rather than simulated keystrokes (pasting a large prompt via keystrokes can stall without submitting, so it goes through the interface). Login is per-provider (`opencode auth login`), and the login state is shared.

Auto-wake is implemented via a plugin that triggers on **idle events** — this requires the plugin file bundled with swarmx to be locatable (on desktop, the app injects its packaged path). If it cannot be located, the worker can still use the collaboration tools but **has no auto-wake**: functionality degrades rather than crashing.

**Best used as** an orchestrator or a worker.

## reasonix

Not a terminal interface. Instead, `reasonix serve` starts a headless HTTP/SSE service; swarmx submits each turn over HTTP and receives end-of-turn and tool actions over the event stream. It uses DeepSeek via `DEEPSEEK_API_KEY`, with built-in flash / pro tiers. Because there is no terminal screen, the interface shows a structured "activity" view by default. Auto-wake is driven by end-of-turn events, with no hook needed.

**Best used as** a worker.

## zulu

Also a headless HTTP/SSE service (`zulu serve`), authenticated with a single **Comate License**. Its key characteristic is that **the model is specified per request**: the same service process can serve any single model, so one License can run more than a dozen models in parallel — which makes it precisely the engine behind the [Research Committee](/en/guide/research-committee) and [Fusion](/en/guide/fusion).

To support concurrent zulu agents, swarmx assigns each agent an isolated runtime environment so their background services do not compete for ports. License authentication is independent of this, so the isolated environment does not affect login. Auto-wake is driven by end-of-turn events.

**Best used as** the engine for multi-model collaboration, and also as a general-purpose worker.

::: tip Engines and Roles
Which engine suits captain and which suits worker stems from how they run (those with a terminal screen are better suited to being a captain with a "cockpit," while headless ones are better suited to being a worker or committee member), not from a hard limit. Roles are decoupled from engines; see [Orchestrator and Roles](/en/guide/orchestrator-and-roles).
:::
