# Data and Privacy

swarmx runs entirely locally. This page explains where it puts data, how it handles credentials, and what you can control.

## Privacy Principles

- **Loopback only** — the server binds to `127.0.0.1` only and is not exposed externally; middleware rejects all requests from non-local origins.
- **Never touches your credentials** — swarmx never reads or stores any OAuth token or subscription credential. It only passes `HOME` through to child processes, letting the CLI reuse your existing login state.
- **Clean child-process environment** — when launching an engine, variables are built from a blank environment to avoid leaking sensitive variables to the CLI.

The only credential swarmx saves is zulu's Comate License, stored in plaintext locally at `~/.swarmx/comate.json`; it is not uploaded and not put under version control (see [Install Zulu and Configure the License](/en/guide/zulu-setup)).

## Where Data Lands on Disk

All persistent data lives under `~/.swarmx/` in your home directory:

| Location | Contents |
|---|---|
| `swarmx.db` | SQLite database (with full-text index): agents, messages, recordings, blackboard, and more. |
| `workspaces/` | Working directory for each agent. |
| `blackboard/` | Blackboard storage. |
| `recordings/` | Terminal session recordings (asciicast). |
| `comate.json` | zulu's Comate License. |
| Per-agent runtime directory for each engine | Private configuration generated to isolate each agent. |

All of these locations can be overridden via environment variables; see [Configuration](/en/reference/configuration) for details.

## Retention and Cleanup

On startup, the server purges records older than the retention period (30 days by default); set the retention days to 0 to keep records forever. The limits (agents online simultaneously, spawn chain depth, and so on) all have defaults and are adjustable — also on the configuration page.

## What You Can Control

- **Local browser data** — under "Settings → Privacy and Security" you can export or clear the preference data stored in your browser.
- **Tool approval** — by product design, tool calls are always "allowed" with no per-call human confirmation. This is an operating premise of swarmx; if you need human gating, control it at the engine itself or the workflow level.
- **Data deletion** — remove the corresponding data by directly deleting the relevant directory under `~/.swarmx/`.
