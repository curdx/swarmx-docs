# Agent drawer

Clicking any member (in the chat members panel, the collaboration graph, or a dispatch card) slides out a drawer from the right, letting you dig into that one agent. The drawer's URL is shareable and remembers the tab you were on.

## Header and actions

The header shows the avatar, role, engine, and id, along with the status: **ready / starting / finished / error · can't work**, plus how long it has been running.

Action buttons:

- **Wake** — have a stopped agent run one more turn.
- **Pause / Resume** — pausing interrupts the current action and suspends auto-wake; resuming reconnects it (with a confirmation).

## The five tabs

| Tab | Content |
|---|---|
| **Terminal** | The agent's live terminal view. For an exited agent, it notes that the terminal is unavailable; engines without a terminal interface (such as opencode running via a control interface, or the headless reasonix) direct you to "Activity." |
| **Activity** | A step-by-step live action stream (the tool/system steps of each turn); finished turns collapse to a one-line summary; history is backfilled from the buffer and never lost. |
| **Recording** | This agent's session recording; jump to the full-screen player or download it. |
| **Messages** | A list of sent and received messages, filtered to exchanges involving this agent. |
| **Context** | The blackboard keys this agent has written; click one to jump to the corresponding direction's ledger and locate that key. |

The default tab varies by engine: a finished agent opens on "Recording" (best for review), a headless engine opens on "Activity," and an online one opens on "Terminal."

## Status bar

The bottom of the drawer has three live indicators:

- **SPAWN** — time since spawn.
- **PTY** — whether the terminal is online.
- **HOOK** — whether the auto-wake hook is active.
