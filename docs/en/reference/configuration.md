# Configuration

All swarmx server configuration is read from `SWARMX_*` environment variables. **No setting is required for normal local operation** — every option has a default. To override one, set it before starting the server (or the Tauri app).

## Platform Support

swarmx targets macOS and Linux. Process reaping relies on Unix process-group signals, and data paths default to `$HOME`. The release pipeline also builds Windows artifacts, but Windows is currently experimental and not fully validated; we recommend using macOS or Linux.

## Network

| Variable | Default | Description |
|---|---|---|
| `SWARMX_PORT` | `7777` | Server listening port (loopback only). Also determines the server address injected into agent configuration. |
| `SWARMX_SERVER_URL` | `http://127.0.0.1:<PORT>` | Base address that agents and MCP use to reach the server, derived from the port; only needs to be set explicitly in special cases. |

## Data Locations

| Variable | Default | Description |
|---|---|---|
| `SWARMX_DB_PATH` | `~/.swarmx/swarmx.db` | SQLite database file. |
| `SWARMX_WORKSPACES_DIR` | `~/.swarmx/workspaces` | Working directory for each agent. |
| `SWARMX_BLACKBOARD_DIR` | `~/.swarmx/blackboard` | Blackboard storage directory. |
| `SWARMX_RECORDINGS_DIR` | `~/.swarmx/recordings` | Session recording file directory. |

## Resource and Binary Paths

The following variables override built-in defaults and are aimed mainly at development environments.

| Variable | Default | Description |
|---|---|---|
| `SWARMX_CLI_PLUGINS_DIR` | Built-in | Directory of built-in CLI plugin manifests. |
| `SWARMX_USER_CLI_PLUGINS_DIR` | `~/.swarmx/cli-plugins` | User-defined CLI plugins (extend or override the built-ins). |
| `SWARMX_ROLES_DIR` | Built-in | Role template directory. |
| `SWARMX_SPELLS_DIR` | Built-in | Workflow recipe directory. |
| `SWARMX_WEB_DIR` | Alongside the binary | Directory of the frontend build artifacts served by the server. |
| `SWARMX_SHIM_PATH` | Alongside the server binary | Path to the shim binary. |
| `SWARMX_MCP_PATH` | Alongside the server binary | Path to the MCP binary. |
| `SWARMX_OPENCODE_PLUGIN` | Built-in | Path to the opencode wake plugin. On desktop, the sidecar injects the packaged absolute path; if it cannot be resolved, opencode still works but has no auto-wake. |

## Limits and Retention

| Variable | Default | Description |
|---|---|---|
| `SWARMX_RETENTION_DAYS` | `30` | On startup, purge records older than N days. `0` or a negative value means keep forever. |
| `SWARMX_MAX_LIVE_AGENTS` | `256` | Maximum number of agents online simultaneously (backpressure at spawn time). |
| `SWARMX_MAX_SPAWN_DEPTH` | `6` | Maximum chain depth of agents spawning agents (prevents runaway spawning). |
| `SWARMX_MAX_ONESHOT_QUERIES` | `4` | Maximum concurrency of one-shot helper queries (e.g., prompt optimization, ledger compaction), preventing loops from causing a process explosion. |
| `SWARMX_FUSION_JUDGE_TIMEOUT_MS` | `900000` (15 minutes) | Longest time the Fusion guard waits for the auto-judge; on timeout it forces a deterministic fallback so a batch never gets stuck in judging. |
| `SWARMX_FUSION_IMPL_TIMEOUT_MS` | `1200000` (20 minutes) | Fully automatic mode only: the longest time to wait for competing models to settle; on timeout it proceeds to the judging stage anyway. |

## Behavior Toggles

| Variable | Default | Description |
|---|---|---|
| `SWARMX_AUTO_RESPAWN_ORCHESTRATORS` | Unset (off) | When set to `1`, startup re-launches the orchestrator for any still-alive workspace. This may consume one model turn, so it is off by default. |
| `SWARMX_ALLOW_PAID_TRANSPORT` | Unset (off) | Explicitly allow a CLI to use a paid SDK/API channel when it declares one (billing protection). |
| `SWARMX_ALLOW_CLAUDE_PRINT` | Unset (off) | Explicitly allow claude's non-PTY print/SDK mode (a separate billing surface). |

## Agent Git Identity

| Variable | Default | Description |
|---|---|---|
| `SWARMX_GIT_USER_NAME` | Global git default | Author name used when an agent commits. |
| `SWARMX_GIT_USER_EMAIL` | Global git default | Author email used when an agent commits. |

## Diagnostics

| Variable | Default | Description |
|---|---|---|
| `SWARMX_MCP_LOG` | Unset | Enable verbose MCP logging. |
