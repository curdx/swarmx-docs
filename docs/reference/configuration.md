# 配置项

swarmx 服务端的全部配置均通过 `SWARMX_*` 环境变量读取。**本地正常运行无需设置任何一项**——每一项都有默认值。如需覆盖，请在启动服务端（或 Tauri 应用）之前设置。

## 平台支持

swarmx 面向 macOS 与 Linux。进程回收依赖 Unix 进程组信号，数据路径默认基于 `$HOME`。发布流程同时构建 Windows 产物，但 Windows 目前为实验性、未经完整验证，建议在 macOS 或 Linux 上使用。

## 网络

| 变量 | 默认值 | 说明 |
|---|---|---|
| `SWARMX_PORT` | `7777` | 服务端监听端口（仅回环）。同时决定注入到 agent 配置中的服务地址。 |
| `SWARMX_SERVER_URL` | `http://127.0.0.1:<PORT>` | agent 与 MCP 访问服务端的基础地址，由端口推导；仅特殊场景需显式设置。 |

## 数据位置

| 变量 | 默认值 | 说明 |
|---|---|---|
| `SWARMX_DB_PATH` | `~/.swarmx/swarmx.db` | SQLite 数据库文件。 |
| `SWARMX_WORKSPACES_DIR` | `~/.swarmx/workspaces` | 各 agent 的工作目录。 |
| `SWARMX_BLACKBOARD_DIR` | `~/.swarmx/blackboard` | 黑板存储目录。 |
| `SWARMX_RECORDINGS_DIR` | `~/.swarmx/recordings` | 会话录制文件目录。 |

## 资源与二进制路径

以下变量用于覆盖内置默认值，主要面向开发环境。

| 变量 | 默认值 | 说明 |
|---|---|---|
| `SWARMX_CLI_PLUGINS_DIR` | 内置 | 内置 CLI 插件清单目录。 |
| `SWARMX_USER_CLI_PLUGINS_DIR` | `~/.swarmx/cli-plugins` | 用户自定义 CLI 插件（扩展或覆盖内置）。 |
| `SWARMX_ROLES_DIR` | 内置 | 角色模板目录。 |
| `SWARMX_SPELLS_DIR` | 内置 | 工作流配方目录。 |
| `SWARMX_WEB_DIR` | 二进制同级目录 | 服务端提供的前端构建产物目录。 |
| `SWARMX_SHIM_PATH` | 服务端二进制同级 | shim 二进制路径。 |
| `SWARMX_MCP_PATH` | 服务端二进制同级 | MCP 二进制路径。 |
| `SWARMX_OPENCODE_PLUGIN` | 内置 | opencode 唤醒插件路径。桌面版由 sidecar 注入打包后的绝对路径；未解析到时 opencode 仍可用，但不具备自动唤醒。 |

## 限额与保留

| 变量 | 默认值 | 说明 |
|---|---|---|
| `SWARMX_RETENTION_DAYS` | `30` | 启动时清理早于 N 天的记录。`0` 或负值表示永久保留。 |
| `SWARMX_MAX_LIVE_AGENTS` | 内置上限 | 同时在线 agent 的最大数量（派发时的背压）。 |
| `SWARMX_MAX_SPAWN_DEPTH` | 内置上限 | agent 派发 agent 的最大链深（防止失控派发）。 |
| `SWARMX_MAX_ONESHOT_QUERIES` | `4` | 一次性辅助查询的最大并发数（如提示优化、台账压缩），防止循环导致进程激增。 |
| `SWARMX_FUSION_JUDGE_TIMEOUT_MS` | `900000`（15 分钟） | 融合竞赛守护机制等待自动评审的最长时间，超时后强制走确定性兜底，保证批次不会滞留于评审中。 |
| `SWARMX_FUSION_IMPL_TIMEOUT_MS` | `1200000`（20 分钟） | 仅全自动模式：等待参赛模型落定的最长时间，超时后仍进入评审阶段。 |

## 行为开关

| 变量 | 默认值 | 说明 |
|---|---|---|
| `SWARMX_AUTO_RESPAWN_ORCHESTRATORS` | 未设置（关闭） | 设为 `1` 时，启动会为仍存活的工作空间重新拉起编排器。可能消耗一次模型回合，故默认关闭。 |
| `SWARMX_ALLOW_PAID_TRANSPORT` | 未设置（关闭） | 当某 CLI 声明了付费 SDK/API 通道时，显式允许使用（计费保护）。 |
| `SWARMX_ALLOW_CLAUDE_PRINT` | 未设置（关闭） | 显式允许 claude 的非 PTY 打印/SDK 模式（独立的计费面）。 |

## agent 的 git 身份

| 变量 | 默认值 | 说明 |
|---|---|---|
| `SWARMX_GIT_USER_NAME` | 全局 git 默认 | agent 提交时使用的作者名。 |
| `SWARMX_GIT_USER_EMAIL` | 全局 git 默认 | agent 提交时使用的作者邮箱。 |

## 诊断

| 变量 | 默认值 | 说明 |
|---|---|---|
| `SWARMX_MCP_LOG` | 未设置 | 启用 MCP 的详细日志。 |
