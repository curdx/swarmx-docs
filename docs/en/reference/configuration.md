# Configuration

All configuration for the swarmx server is read from `SWARMX_*` environment variables. **None of them need to be set for a normal local run** — every one has a default. To override a value, set it before launching the server (or the Tauri application).

## Platform support

swarmx targets macOS and Linux. Process reclamation relies on Unix process-group signals, and data paths default to a base under `$HOME`. The release process also builds Windows artifacts, but Windows is currently experimental and not fully verified; macOS or Linux is recommended.

## Network

| Variable | Default | Description |
|---|---|---|
| `SWARMX_PORT` | `7777` | The server's listening port (loopback only). Also determines the server address injected into agent configuration. |
| `SWARMX_SERVER_URL` | `http://127.0.0.1:<PORT>` | The base address agents and MCP use to reach the server, derived from the port; set explicitly only in special cases. |

## Data locations

| Variable | Default | Description |
|---|---|---|
| `SWARMX_DB_PATH` | `~/.swarmx/swarmx.db` | SQLite database file. |
| `SWARMX_WORKSPACES_DIR` | `~/.swarmx/workspaces` | Working directories for each agent. |
| `SWARMX_BLACKBOARD_DIR` | `~/.swarmx/blackboard` | Blackboard storage directory. |
| `SWARMX_RECORDINGS_DIR` | `~/.swarmx/recordings` | Directory for session recording files. |

## Resource and binary paths

The following variables override built-in defaults and are intended mainly for development environments.

| Variable | Default | Description |
|---|---|---|
| `SWARMX_CLI_PLUGINS_DIR` | Built-in | Directory for built-in CLI plugin manifests. |
| `SWARMX_USER_CLI_PLUGINS_DIR` | `~/.swarmx/cli-plugins` | User-defined CLI plugins (extend or override the built-ins). |
| `SWARMX_ROLES_DIR` | Built-in | Role template directory. |
| `SWARMX_SPELLS_DIR` | Built-in | Workflow recipe directory. |
| `SWARMX_WEB_DIR` | Alongside the binary | Directory of the built frontend the server serves. |
| `SWARMX_SHIM_PATH` | Alongside the server binary | Path to the shim binary. |
| `SWARMX_MCP_PATH` | Alongside the server binary | Path to the MCP binary. |
| `SWARMX_OPENCODE_PLUGIN` | Built-in | Path to the opencode wake plugin. In the desktop version the sidecar injects the packaged absolute path; if it cannot be resolved, opencode still works but without auto-wake. |

## Limits and retention

| Variable | Default | Description |
|---|---|---|
| `SWARMX_RETENTION_DAYS` | `30` | At startup, prune records older than N days. `0` or a negative value means keep everything permanently. |
| `SWARMX_MAX_LIVE_AGENTS` | Built-in cap | Maximum number of simultaneously live agents (back-pressure during dispatch). |
| `SWARMX_MAX_SPAWN_DEPTH` | Built-in cap | Maximum chain depth of agents dispatching agents (prevents runaway dispatch). |
| `SWARMX_MAX_ONESHOT_QUERIES` | `4` | Maximum concurrency of one-shot auxiliary queries (such as prompt optimization and ledger compaction), preventing loops from causing a process explosion. |
| `SWARMX_FUSION_JUDGE_TIMEOUT_MS` | `900000` (15 minutes) | The maximum time the fusion guardian mechanism waits for automatic review before forcing a deterministic fallback, ensuring a batch is never stuck in review. |
| `SWARMX_FUSION_IMPL_TIMEOUT_MS` | `1200000` (20 minutes) | Autopilot mode only: the maximum time to wait for competing models to settle before entering the review stage anyway. |

## Behavior switches

| Variable | Default | Description |
|---|---|---|
| `SWARMX_AUTO_RESPAWN_ORCHESTRATORS` | Unset (off) | When set to `1`, the orchestrator is re-launched at startup for workspaces that are still alive. This can consume a model turn, so it is off by default. |
| `SWARMX_ALLOW_PAID_TRANSPORT` | Unset (off) | Explicitly allow use of a paid SDK/API channel when a CLI declares one (a billing safeguard). |
| `SWARMX_ALLOW_CLAUDE_PRINT` | Unset (off) | Explicitly allow claude's non-PTY print/SDK mode (a separate billing surface). |

## Agent git identity

| Variable | Default | Description |
|---|---|---|
| `SWARMX_GIT_USER_NAME` | Global git default | Author name agents use when committing. |
| `SWARMX_GIT_USER_EMAIL` | Global git default | Author email agents use when committing. |

## Diagnostics

| Variable | Default | Description |
|---|---|---|
| `SWARMX_MCP_LOG` | Unset | Enable verbose MCP logging. |
