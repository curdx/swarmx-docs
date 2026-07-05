# Configuration (`SWARMX_*` environment variables)

swarmx-server reads all configuration from `SWARMX_*` environment variables.
**None are required for a normal local run** — every one has a default. Set them
before launching the server (or the Tauri app, which spawns the server).

This file is the single reference for every variable the code reads; it is
guarded by `scripts/harness-check.mjs` (rule 6 / 规则7) so it can't silently
drift out of sync with the code.

## Platform support

swarmx targets **macOS and Linux** (Unix). The PTY teardown that reclaims a
spawned CLI and its descendants relies on Unix process-group signals (`killpg`
+ SIGTERM/SIGKILL), and data paths default off `$HOME`. The release pipeline
also builds Windows artifacts, but Windows is **unverified / experimental** — on
non-Unix only the direct shim child is killed (a grandchild CLI can be left
running). Use macOS or Linux for a supported setup.

## Network

| Variable | Default | Purpose |
|---|---|---|
| `SWARMX_PORT` | `7777` | TCP port the server binds (loopback only). Also derives `SWARMX_SERVER_URL` and the URL baked into spawned agents' wake-hook + MCP config. |
| `SWARMX_SERVER_URL` | `http://127.0.0.1:<PORT>` | Base REST URL agents / MCP use to reach the server. Derived from `SWARMX_PORT`; set explicitly only for unusual setups. |

## Data locations

| Variable | Default | Purpose |
|---|---|---|
| `SWARMX_DB_PATH` | `~/.swarmx/swarmx.db` | SQLite database file. |
| `SWARMX_WORKSPACES_DIR` | `~/.swarmx/workspaces` | Per-agent scratch workspaces. |
| `SWARMX_BLACKBOARD_DIR` | `~/.swarmx/blackboard` | Blackboard markdown KV store. |
| `SWARMX_RECORDINGS_DIR` | `~/.swarmx/recordings` | asciicast session recordings. |

## Resource / binary paths (override bundled defaults — mostly for dev)

| Variable | Default | Purpose |
|---|---|---|
| `SWARMX_CLI_PLUGINS_DIR` | bundled `cli-plugins/` | Built-in CLI plugin manifests. |
| `SWARMX_USER_CLI_PLUGINS_DIR` | `~/.swarmx/cli-plugins` | User-added CLI plugins (extend / override built-ins). |
| `SWARMX_ROLES_DIR` | bundled `roles/` | Role SOP templates. |
| `SWARMX_SPELLS_DIR` | bundled `spells/` | Spell definitions. |
| `SWARMX_WEB_DIR` | resolved next to the binary | Built web bundle the server serves. |
| `SWARMX_SHIM_PATH` | sibling of the server binary | Path to the `swarmx-shim` binary. |
| `SWARMX_MCP_PATH` | sibling of the server binary | Path to the `swarmx-mcp` binary. |
| `SWARMX_OPENCODE_PLUGIN` | bundled `cli-plugins/opencode/swarmx-wake.js` | Path to the opencode wake plugin JS merged into each opencode worker's per-agent config (the Tauri sidecar sets this to the packaged resource). If unresolved, opencode workers still get swarm tools but no auto-wake. |

## Limits & retention

| Variable | Default | Purpose |
|---|---|---|
| `SWARMX_RETENTION_DAYS` | `30` | At boot, prune rows older than N days. `0` (or negative) = keep everything, never prune. |
| `SWARMX_MAX_LIVE_AGENTS` | built-in cap | Max concurrently live agents (back-pressure on spawn). |
| `SWARMX_MAX_SPAWN_DEPTH` | built-in cap | Max depth of agent-spawns-agent chains (runaway-spawn guard). |
| `SWARMX_MAX_ONESHOT_QUERIES` | `4` | Max concurrent throwaway one-shot CLI queries (prompt-optimize / ledger-compact). These spawn a real CLI outside the live-agent cap; this bounds them so a loop can't fork-bomb. |
| `SWARMX_FUSION_JUDGE_TIMEOUT_MS` | `900000` (15 min) | How long the fusion judge watchdog waits for the auto-judge agent to decide before forcing a deterministic fallback (synth → merge the judge's captured work; pick+check → the objective-gate winner; otherwise → `needs_decision`). Guarantees a batch never stalls in `judging`. |
| `SWARMX_FUSION_IMPL_TIMEOUT_MS` | `1200000` (20 min) | Autopilot only: how long the autochain waits for the auto-implement contestants to settle before entering the judge stage anyway. |

## Behaviour switches

| Variable | Default | Purpose |
|---|---|---|
| `SWARMX_AUTO_RESPAWN_ORCHESTRATORS` | unset (off) | `1` = on boot, re-spawn orchestrators for alive workspaces the orphan sweep killed. Can burn an LLM turn / revive a provider you're avoiding — opt-in. |
| `SWARMX_ALLOW_PAID_TRANSPORT` | unset (off) | Opt-in to a CLI's paid SDK/API transport when its plugin declares one (billing guard). |
| `SWARMX_ALLOW_CLAUDE_PRINT` | unset (off) | Opt-in to claude non-PTY print/SDK mode (a separate billing surface). |

## Agent git identity

| Variable | Default | Purpose |
|---|---|---|
| `SWARMX_GIT_USER_NAME` | global git default | git author name agents commit under. |
| `SWARMX_GIT_USER_EMAIL` | global git default | git author email agents commit under. |

## Diagnostics

| Variable | Default | Purpose |
|---|---|---|
| `SWARMX_MCP_LOG` | unset | Enable verbose `swarmx-mcp` logging. |

## Internal / not user-settable

- `SWARMX_AGENT_ID` — injected by the server into each spawned worker so its
  MCP subprocess knows its own identity. **Do not set this yourself.**

## Test-only (used by the test suite / CI; ignore in normal operation)

- `SWARMX_LEAK_CANARY` — env-isolation canary asserted by a PTY test.
- `SWARMX_TEST_TRUTHY` — truthy-parsing fixture.
- `SWARMX_GOLDEN_PORT` — port for the golden-CLI smoke scripts.
