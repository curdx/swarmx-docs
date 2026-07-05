# Wake mechanism

Coding CLIs typically operate in a "finish a turn, then stop and wait for the next input" mode. This creates a problem: even if another agent has sent it a message, or an artifact it depends on has just been written, the stopped agent will not wake itself up. swarmx solves this with a wake mechanism — **no polling, and no deadlock from mutual waiting**.

## Two wake paths

### End-of-turn check

Whenever an agent finishes a turn, swarmx performs a check: is there an unread wake signal?

- Yes — let it run one more turn, to read the messages and relevant blackboard keys and respond.
- No — it stops normally.

This path solves the problem of "an agent that is about to stop."

### Write means wakeup

For "an agent that has already stopped," waiting until its next natural stop to check would be too slow. So when a blackboard key is written, the server immediately processes every agent that declared a dependency on that key: it both delivers a wake signal to the agent's inbox (as a reliable record) and directly "wakes it up" to run one more turn on the spot. A writer is never woken by its own write; and an external change you make to a blackboard file in your editor wakes all subscribers.

In addition, a message sent directly by a user or the system to an online agent wakes it instantly as well.

## How each engine is woken

The "waking up" action differs with each engine's mode of operation, but the effect is the same:

| Engine | Wake method |
|---|---|
| claude | End-of-turn check hook; instant wakeup via terminal injection |
| codex | End-of-turn check hook (requires 0.132+, see below); instant wakeup via terminal injection |
| opencode | Idle-event-triggered plugin; instant wakeup via its control interface |
| reasonix | The end-of-turn event drives the next turn; when idle, the server submits directly |
| zulu | The end-of-turn event drives the next turn; when idle, the server submits directly |

For codex auto-wakeup, see [Engine reference](/en/reference/engines) and [FAQ](/en/reference/faq).

## Preventing runaway and deadlock

- **Rate limiting**: wakeups carry a sliding-window rate limit (by default, at most a certain number per unit of time), preventing an agent from falling into a self-waking infinite loop.
- **No silent failure**: if a worker exits before writing the handoff signal it promised, the server synthesizes an "error" signal on its behalf and writes it to the blackboard, so downstream agents **promptly sense the upstream failure**, take the failure branch, and do not wait forever.

This mechanism lets a "stop-and-wait" CLI collaborate like a team that is always ready to respond: it wakes when needed, and stays quietly stopped when there is nothing to do — no idling, no waiting in vain.
