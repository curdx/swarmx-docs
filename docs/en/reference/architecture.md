# swarmx 架构文档

> 面向新贡献者。目标：读完这篇文档后，你能找到任何一个功能点在代码里的位置，并理解为什么这样设计。

---

## 目录

1. [一句话定位](#一句话定位)
2. [顶层数据流](#顶层数据流)
3. [三层心智模型](#三层心智模型)
4. [Workspace Crate 布局](#workspace-crate-布局)
5. [唤醒机制](#唤醒机制)
6. [各引擎差异](#各引擎差异)
7. [Blackboard vs Mailbox](#blackboard-vs-mailbox)
8. [Spell vs Role](#spell-vs-role)
9. [运行时资源与打包模型](#运行时资源与打包模型)
10. [完整链路走一遍：从 POST /api/agent 到浏览器看到终端](#完整链路走一遍)
11. [关键 REST / WebSocket API 速查](#关键-rest--websocket-api-速查)
12. [环境变量速查](#环境变量速查)
13. [待确认 / TODO](#待确认--todo)

---

## 一句话定位

swarmx 是一个浏览器仪表盘：它把你已有的 `claude` / `codex` / `opencode` / `reasonix` CLI 二进制**原封不动**地跑在 PTY 里，通过共享收件箱（mailbox）和黑板（blackboard）让它们互相协作，完成同一个任务。它不是又一个 LLM wrapper，你的 OAuth、限流、套餐限制行为与在终端里直接敲 `claude` 完全一致。

---

## 顶层数据流

```
浏览器 / Tauri webview
  │
  │  REST   POST /api/agent  (创建 agent)
  │  WS     /ws/pty/:id      (双向 PTY 流)
  │  WS     /ws/swarm        (swarm 事件: agent_state / message / blackboard)
  ▼
axum HTTP/WS 服务 (127.0.0.1:7777)
  │                          swarmx-server
  │
  ├─► spawn::spawn_agent()
  │     │  ① 调 CliAdapter.pre_spawn() 写入 MCP/hook/trust 配置
  │     │  ② PtyBridge::spawn() → openpty → 启动 swarmx-shim
  │     │  ③ shim execvp 真实 CLI 二进制
  │     │  ④ 读者线程扫 OSC_READY / OSC_EXIT → 广播 SwarmEvent
  │     │  ⑤ RecorderHandle 并行落 .cast 文件 (asciicast v2)
  │     ▼
  │   PTY (portable-pty, OS 内核 pseudoterminal)
  │     │
  │     └─► swarmx-shim  (仅约 70 行)
  │               └─► 真实 CLI (claude / codex / opencode / reasonix)
  │                         │
  │                         └─► swarmx-mcp (stdio JSON-RPC, 另一进程)
  │                                   │  工具调用: swarm_send_message
  │                                   │            swarm_write_blackboard
  │                                   │            swarm_spawn_worker …
  │                                   └─► HTTP → axum /api/message /api/blackboard …
  │
  ├─► Swarm (swarmx-swarm crate)
  │     ├─ SQLite + FTS5 (swarmx-storage)  — agents / messages / blackboard_ops …
  │     └─ fs blackboard (~/.swarmx/blackboard/)
  │
  └─► WakeCoordinator (后台 tokio task)
        └─ 监听 SwarmEvent::BlackboardChanged
              → mailbox "wake" 消息 + PTY 注入 Ctrl-U+Enter
```

---

## 三层心智模型

swarmx 只有三层，没有更多：

```
┌─────────────────────────────────────────────────────────┐
│  MCP 层 (最上层)                                         │
│  swarmx-mcp: stdio JSON-RPC server                       │
│  向 LLM 暴露 10 个 swarm 工具:                           │
│    swarm_send_message  swarm_list_messages               │
│    swarm_search_messages  swarm_list_agents              │
│    swarm_list_blackboard  swarm_read_blackboard          │
│    swarm_write_blackboard  swarm_spawn_worker            │
│    swarm_list_roles  swarm_name_thread                   │
├─────────────────────────────────────────────────────────┤
│  shim 层 (中间)                                          │
│  swarmx-shim: ~70 行，execvp 真实 CLI                    │
│  发 OSC 序列:                                            │
│    \x1b]633;A\x07          → ShimReady (子进程已启动)   │
│    \x1b]633;D;<code>\x07   → ShimExit (退出码)          │
├─────────────────────────────────────────────────────────┤
│  PTY 层 (最底层)                                         │
│  未经修改的真实 CLI 二进制:                               │
│    claude / codex / opencode / reasonix                  │
│  OAuth、限流、套餐与你在终端里直接使用完全一致           │
└─────────────────────────────────────────────────────────┘
```

**为什么用 shim 而不是直接 spawn CLI？**

- 跨平台 `wait()` 语义不一致；shim 提供唯一可靠的退出码通道。
- OSC 序列会被录进 asciicast，replay 时能看到同样的生命周期标记。
- shim 的 stdout/stderr 继承 PTY，所以 CLI 的 `isatty() == true`，OAuth 交互流得以正常工作。

---

## Workspace Crate 布局

Workspace root: `Cargo.toml` 的 `members` 声明了 9 个 crate（按依赖由低到高排列）：

```
swarmx-protocol   ← 最底层，无 swarmx 内部依赖
swarmx-storage
swarmx-recorder
swarmx-pty
swarmx-shim
swarmx-swarm      ← 依赖 protocol + storage
swarmx-mcp        ← 依赖 protocol
swarmx-server     ← 依赖上面全部
swarmx-cli        ← 仅依赖 server (极薄入口)
```

### swarmx-protocol
`crates/swarmx-protocol/src/lib.rs`

WebSocket 帧 schema + REST DTO，供 server 与各 client 共享。三个模块：
- `ws_pty`：`/ws/pty/:agent_id` — binary `[seq][bytes]` + JSON 控制帧
- `ws_swarm`：`/ws/swarm` — `SwarmEvent` 枚举（`AgentState`、`Message`、`BlackboardChanged` …）
- `rest`：REST 请求/响应 DTO（`AgentRecord`、`WorkspaceRecord`、`ThreadRecord` …）

### swarmx-storage
`crates/swarmx-storage/`

SQLite + FTS5 持久层。特点：
- 连接池（r2d2）+ WAL 模式 + busy_timeout；所有 API 均为 `async`（通过 `spawn_blocking`）。
- 25 个渐进迁移（`migrations/0001_init.sql` … `0025_message_perf_indexes.sql`），每次迁移在 `BEGIN IMMEDIATE` 事务中运行。
- **版本守卫**：数据库版本 > 二进制最高版本时拒绝启动，防止旧二进制写坏新 schema。
- 主要表：`agents`、`messages`（FTS5 全文搜索）、`blackboard_ops`、`pty_recordings`、`workspaces`、`threads`、`workers`、`cron_jobs`、`goals`、`thought_traces`、`agent_usage`、`agent_activities`。

### swarmx-pty
`crates/swarmx-pty/src/lib.rs`

`portable-pty` 的 async 封装。核心类型 `PtyBridge`：
- **读者线程**：`portable-pty` 的 blocking `Read` → `tokio mpsc` 通道（背压：满了就阻塞读者线程，最终阻塞内核 PTY 环形缓冲）。
- **写者线程**：另一个 mpsc 通道 → blocking `Write`（键入注入）。
- `kill()`：SIGTERM → ~1s grace → SIGKILL，杀整个进程组。
- 环境变量从空白开始构建（不继承 server 全部 env），防止泄漏 `ANTHROPIC_API_KEY` 等敏感变量给子进程。

### swarmx-shim
`crates/swarmx-shim/src/main.rs`

约 70 行。执行流程：
1. 向 stdout flush `\x1b]633;A\x07`（OSC_READY）。
2. `Command::new(target).spawn()`，继承 PTY 的 stdio。
3. `child.wait()`，退出时 flush `\x1b]633;D;<code>\x07`（OSC_EXIT）。

### swarmx-recorder
`crates/swarmx-recorder/`

asciicast v2 写入器。每个 PTY 对应一个 `Recorder`，拥有 `.cast` 文件和后台写入任务。PTY pump 持有 `RecorderHandle`（cheap clone），写每一块字节。所有 handle drop 时自动 flush + 关闭文件，触发 finalize oneshot。

### swarmx-swarm
`crates/swarmx-swarm/`

进程内消息分发 + 黑板同步。核心类型 `Swarm`：
- **消息**：`send_message()` → 持久化到 SQLite（权威存储）→ `broadcast::Sender<SwarmEvent>` → 收件箱 `mpsc::Sender<Envelope>`（低延迟提示，不是契约）。
- **黑板**：`write_blackboard()` → 写磁盘文件 → 记录 op 到 SQLite → 广播 `SwarmEvent::BlackboardChanged`。
- **外部编辑检测**：`WatcherHandle`（notify-debouncer）监听 `~/.swarmx/blackboard/`，将非 swarmx 的写入也记入 op-log（`reconcile_external()`），`seen_sha` 缓存避免回显自身写入。
- **思维轨迹**（thought traces）：每个 agent 的工具调用序列，供 UI Activity 标签展示。

### swarmx-mcp
`crates/swarmx-mcp/`

两种运行模式（同一二进制）：

**默认模式（stdio JSON-RPC MCP server）**  
每个 agent spawn 时，server 在其 MCP 配置里注入 `swarmx-mcp --agent-id <id>` 的入口。CLI 通过 stdio 与之通信，发 `tools/list` 和 `tools/call`。10 个工具（`tools.rs`）通过 HTTP 调用 `swarmx-server` REST API，并把结果格式化为对 LLM 友好的文本。

**`wake-check` 子命令（Stop hook）**  
由 CLI 的 Stop hook 在每次回合结束时调用。流程：
1. 从 stdin 读 CLI 提供的 JSON（含 `stop_hook_active` 标志）。
2. `POST /api/message/consume_wakes` 原子性地领取所有待处理的 wake 消息。
3. 有未读 → stdout 输出 `{"decision":"block","reason":"你有 N 条未读消息…"}` → CLI 续跑一个回合。
4. 无未读 → stdout 输出 `{}` → CLI 正常停止。
5. **永远 exit 0**，任何错误都降级到 `{}`（hook 不能阻止 agent 停止）。
6. 滑动窗口限流（默认 30s 内最多 3 次 wake）防止循环。

### swarmx-server
`crates/swarmx-server/`

axum HTTP/WS 网关，是整个系统的大脑。主要模块：

| 模块 | 职责 |
|---|---|
| `routes/api.rs` | 中央路由注册（所有 `/api/*` 和 `/ws/*`） |
| `routes/rest.rs` | agent spawn/kill/wake、spell 执行、worker spawn |
| `routes/swarm.rs` | message CRUD、blackboard CRUD |
| `routes/workspaces.rs` | workspace + thread CRUD |
| `routes/pty_ws.rs` / `terminal_ws.rs` | PTY WebSocket 桥（双向字节流） |
| `routes/ws_swarm.rs` | `/ws/swarm` 事件 SSE/WS 流 |
| `spawn.rs` | `spawn_agent()` 核心流程 |
| `cli/` | per-CLI 适配器（`claude.rs`、`codex.rs`、`opencode.rs`、`reasonix.rs`） |
| `wake.rs` | `WakeCoordinator` 后台任务 |
| `spells.rs` | spell 注册表（builtin + overlay） |
| `roles.rs` | role 注册表（builtin + overlay） |
| `plugins.rs` | CLI plugin 注册表（`cli-plugins/*.toml`） |
| `reaper.rs` | 后台存活检测，防止 UI 永远显示绿点 |
| `registry.rs` | 内存中的 `AgentSlot` 映射（live agents） |
| `opencode_tui.rs` | opencode TUI HTTP 控制接口驱动 |
| `reasonix_serve.rs` | reasonix HTTP+SSE 驱动 |
| `billing.rs` | 计费/用量追踪 |
| `cron.rs` | 定时任务调度 |
| `worktree.rs` | git worktree 隔离助手 |
| `transcript.rs` | Claude transcript JSONL 追踪器（Activity view） |

**AppState**（全局共享，`Arc<>` 包裹）包含：`plugins`、`spells`、`roles`、`models`（热更新 RwLock）、`registry`、`store`、`swarm`、`wake_subs`、`exit_keys` 等。

**单例锁**：`~/.swarmx/server.lock` flock，防止两个实例并发写坏 SQLite 和黑板。

**安全边界**：`require_local_origin` 中间件（最外层）拒绝所有非本地 Origin；DNS rebind 防护通过检查无 Origin 请求的 Host header 实现。服务只绑 `127.0.0.1:7777`。

### swarmx-cli
`crates/swarmx-cli/src/main.rs`

极薄入口。`swarmx up` 命令：启动 server + 打开浏览器（或 Tauri webview）指向仪表盘。

---

## 唤醒机制

理解唤醒机制是理解 swarmx 协作模型的关键。

### 问题背景

claude/codex CLI 是"停-等"模式：它处理完一个回合就停下来，等下一条用户消息。这意味着即使另一个 agent 给它发了消息，它也不会自己醒来。

### Stop Hook 路径（claude / codex）

```
agent 一个回合结束
  └─► CLI 触发 Stop hook: swarmx-mcp wake-check
        └─► POST /api/message/consume_wakes
              ├─ 有未读 wake 消息?
              │     YES → stdout: {"decision":"block","reason":"…"}
              │             → CLI 续跑一个回合
              │             → agent 调用 swarm_list_messages 读消息
              │             → 正常处理、回复
              └─── NO → stdout: {}  → CLI 停止
```

### M6b Push-style Wakeup（WakeCoordinator）

Stop hook 解决"正在停的 agent"的问题，但解决不了"已经停下来的 agent"。

`WakeCoordinator`（`wake.rs`，`main.rs` 启动时生成一个 tokio task）订阅 `Swarm` 的 `broadcast::Receiver<SwarmEvent>`。当收到 `SwarmEvent::BlackboardChanged` 时：

1. **查订阅表**（`wake_subs: HashMap<agent_id, Vec<blackboard_key>>`）：哪些 agent 声明了对这个 key 的依赖？
2. **写 mailbox**（持久化）：向订阅该 key 的每个 agent 发送 `kind="wake"` 消息（源头 `"system"`）。即使后续 PTY kick 失败，下次 Stop hook 仍能看到这条 wake。
3. **PTY kick**（尽力而为）：向 agent 的 PTY 注入 `\x15<短文本>\r`（Ctrl-U 清空输入框 + 提交新回合），当场唤醒已停下的 agent，无需等待下一次用户互动。

**M6c 扩展**：`exit_keys`（`HashMap<agent_id, ExitKey>`）追踪每个 agent 应该写的 handoff key。若 agent 死亡时未写该 key，`WakeCoordinator` 自动合成 `<key>.error` 写入黑板，让下游 agent 能及时感知上游失败，而不是永远等待。

### wake 消息的特殊处理

`swarm_list_messages`（MCP 工具）在 `kind="wake"` 的消息上**不**自动标记已读。原因：LLM 在回合中途可能调用 `list_messages` 查看上下文，若此时 wake 被标读，Stop hook 在回合结束时就看不到它，导致 agent 假死（M6f bug，2026-05-23 实测）。只有 `wake-check` 自己消费 wake 时才标读。

---

## 各引擎差异

| 特性 | claude | codex | opencode | reasonix |
|---|---|---|---|---|
| 启动方式 | PTY (shim → claude) | PTY (shim → codex) | PTY (shim → opencode TUI) | HTTP/SSE (`reasonix serve`) |
| 提示注入 | 键击注入 (Ctrl-U+回车) | 键击注入 | `/tui/submit-prompt` HTTP | `POST /submit` HTTP |
| Stop hook | `swarmx-mcp wake-check` | `swarmx-mcp wake-check` | opencode wake plugin (JS) | 无（SSE turn_done 驱动） |
| MCP 注入格式 | `~/.claude.json` local scope | `~/.codex/config.toml` global | `~/.config/opencode/` JSON | reasonix 自己的 MCP JSON |
| Trust 格式 | `claude-json` (hasTrustDialogAccepted) | `codex-toml` | N/A | N/A |
| bootstrap 特殊处理 | 无 | 无 | 重试直到 TUI 实际提交（冷启动慢） | 等 serve 绑端口后提交 |
| asciicast 录制 | ✓ PTY 字节流 | ✓ PTY 字节流 | ✓ PTY 字节流 | 无（Activity 通过 REST 镜像） |

### opencode 的特殊路径

opencode 跑全屏 TUI（ncurses-like），无法可靠地通过键击注入大 prompt（>24k 字符的 bracketed paste 会卡住不提交）。解决方案：spawn 时指定 `--port <p>`，通过 `opencode_tui.rs` 驱动内置的 `/tui/*` HTTP API：

- `POST /tui/clear-input` → 清空输入框
- `POST /tui/append-input {text}` → 填入 prompt
- `POST /tui/submit-prompt` → 提交（重试直到 TUI 真正开始新回合）

wake kick 也走同一路径（已有热 TUI，单次 submit 即可）。

### reasonix 的特殊路径

reasonix 无 TUI，改为 HTTP+SSE：`reasonix_serve.rs` 里一个长生命周期的 `run_driver` tokio task 负责：
1. 等 `reasonix serve` 绑端口（`/status`）。
2. `POST /tool-approval-mode {mode: "yolo"}` 关闭工具审批。
3. 提交 bootstrap prompt（`POST /submit`）。
4. 跟随 `GET /events` SSE 流：`turn_done` 触发 `consume_and_submit()`（原子消费 wake + 重提交）。
5. 镜像 `tool_dispatch` / `tool_result` 事件到 `POST /api/agent/:id/activity`（UI Activity 标签）。

已停止的 reasonix agent 的 wake 由 `WakeCoordinator` 通过 `wake_if_idle()` 直接 submit，两路都走 `consume_and_submit()` 保证原子性。

---

## Blackboard vs Mailbox

```
┌─────────────────────────────────────────────────────────────────────┐
│  Blackboard（黑板）                                                  │
│  位置: ~/.swarmx/blackboard/<workspace_id>/<thread_id>/<key>        │
│  特点:                                                               │
│    • KV 文件存储，UTF-8 内容                                         │
│    • 任何 agent 都能读写任意 key（类比共享文件系统）                  │
│    • 每次写入记录到 blackboard_ops 表（含 sha256 + agent_id）        │
│    • 写入触发 WakeCoordinator 检查订阅者                             │
│    • 全文搜索通过 SQLite FTS5（blackboard_search）                   │
│  使用场景:                                                           │
│    • 发布工作结果：frontend.done、backend.done                       │
│    • 共享上下文：task.ledger.md、progress.ledger.md                  │
│    • 产出物：spec.md、代码评审结论 …                                 │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│  Mailbox（收件箱）                                                   │
│  位置: SQLite messages 表                                            │
│  特点:                                                               │
│    • 点对点消息（from_agent → to_agent）                             │
│    • 支持 kind 标签（note / ask / reply / wake）                     │
│    • 支持 in_reply_to 线程化                                         │
│    • FTS5 全文搜索（swarm_search_messages）                          │
│    • 已读状态追踪（read_at）                                         │
│  使用场景:                                                           │
│    • agent 间直接交流：请求帮助、汇报结果、提问                       │
│    • WakeCoordinator 注入 wake 触发器                                │
│    • orchestrator 与 worker 间的任务分配通知                         │
└─────────────────────────────────────────────────────────────────────┘
```

**核心区别**：blackboard 是"公告板"（多对多、键值、持久），mailbox 是"信件"（一对一、有序、可追踪）。blackboard 写入会自动触发订阅者唤醒，mailbox 消息需要 Stop hook 或 WakeCoordinator 推送。

---

## Spell vs Role

### Role（角色）

`roles/*.md`（或 builtin embed）定义一类 agent 的**能力和行为规范**：

- `id`（slug）：如 `orchestrator`、`frontend`、`backend`、`reviewer`、`test-runner`、`docs-writer`、`researcher`、`fixer`
- `default_cli`：这个角色优先用哪个 CLI
- `default_model_tier`：用哪个模型层级（opus / sonnet / haiku）
- `produces`：这个角色产出哪些 kind（如 `["done"]`，`["spec", "done"]`）
- `when_to_use`：给 orchestrator 看的简短说明
- 主体内容：该角色的 SOP（标准作业程序），被注入为 agent 的系统 prompt

### Spell（咒语）

`spells/*.md`（或 builtin embed）定义一个**工作流的启动配方**：

- 当前只 ship 一个：`init`
- `init` spell 的作用：在 workspace 创建时拉一个 orchestrator agent
- 声明 `[[agents]]` 数组，每项指 `role_ref` 引用某个 role

**核心区别**：role 是"类型/能力描述"，spell 是"实例化脚本"。用 OOP 类比：role 是 class，spell 是 main() 函数。`swarm_spawn_worker` 工具让 orchestrator 在运行时按需实例化 role，不需要在 spell 里预声明——这是 Magentic-One 模型（运行时决定规模，而非静态拓扑）的核心。

---

## 运行时资源与打包模型

这一节极其重要。swarmx 最容易犯、也最致命的错误是"在仓库根目录跑得好好的，打成安装包就坏了"。

### 问题根源

Tauri 打包后：
- CWD = `/`（不是仓库根目录）
- 无任何 `SWARMX_*` 环境变量
- `CARGO_MANIFEST_DIR` 指向**构建机器**上的路径，在用户电脑上不存在

### 解决方案：两类资源，两种处理

**A 类：`include_str!` 编译进二进制（推荐，能用就用）**

| 资源 | 代码位置 |
|---|---|
| `spells/init.md` | `server/src/spells.rs` 的 `SpellRegistry::builtin()` |
| `roles/*.md`（8 个） | `server/src/roles.rs` 的 `RoleRegistry::builtin()` |
| `cli-plugins/*.toml`（4 个） | `server/src/plugins.rs` 的 `PluginRegistry::builtin()` |

这些文件也存在于磁盘，但只作为**开发期 overlay**（通过 `SWARMX_*_DIR` 或 `CARGO_MANIFEST_DIR` 相对路径）。打包后 overlay 找不到也没关系，builtin 就是生效内容。

**B 类：必须随包发的文件（不能 embed，必须落盘）**

| 资源 | 原因 | 打包方式 |
|---|---|---|
| `swarmx-server` | 主服务二进制（sidecar） | `externalBin` |
| `swarmx-shim` | shim 二进制（sidecar） | `externalBin` |
| `swarmx-mcp` | MCP 二进制（sidecar） | `externalBin` |
| `cli-plugins/opencode/swarmx-wake.js` | opencode 的 wake hook（JS，必须落盘执行） | `bundle.resources` |

`swarmx-wake.js` 运行时路径通过 `SWARMX_OPENCODE_PLUGIN` 环境变量（Tauri sidecar 注入打包后的绝对路径）传给 server；dev 模式下走 `CARGO_MANIFEST_DIR` 相对路径。找不到则 opencode 降级为无 auto-wake（不崩溃）。

**判定规则**：新增运行时资源时——能 `include_str!` 就 embed（走 A）；若必须落盘执行（脚本、需要 mmap 的大文件等），加进 `bundle.resources` 并用环境变量传绝对路径（走 B）。

---

## 完整链路走一遍

从浏览器点击"新建 agent"到看到终端输出，完整路径：

### 1. 浏览器发起请求

```
POST /api/agent
{
  "cli": "claude",
  "workspace_dir": "/path/to/project",
  "workspace_id": "ws-xxx"
}
```

### 2. REST handler（`routes/rest.rs::spawn`）

1. 查 `PluginRegistry`，找到 `claude` 的 `CliPlugin` manifest（含 `default_args`、`blocked_env_prefixes` 等）。
2. 生成 `agent_id`（UUID）。
3. 查 `RoleRegistry`，拼接系统 prompt（role 内容 + 任务说明 + handoff key 指令）。
4. 调 `spawn::spawn_agent()`。

### 3. `spawn_agent()`（`spawn.rs`）

1. **`CliAdapter::pre_spawn()`**（`cli/claude.rs`）：
   - 写 `~/.claude.json` 的 MCP 条目（`swarmx-mcp --agent-id <id> --server-url <url>`）
   - 写 `<workspace>/.claude/settings.local.json` 的 Stop hook 条目（`swarmx-mcp wake-check`）
   - 写 `hasTrustDialogAccepted = true`（跳过信任对话框）
2. **构建 argv**：`[shim_path, "claude", "--dangerously-skip-permissions", "--model", "sonnet"]`
3. **构建 env**：从空白开始 + `HOME`、`PATH`（从白名单过滤）；屏蔽 `ANTHROPIC_` 前缀。
4. **`PtyBridge::spawn()`**（`swarmx-pty`）：`openpty` → 启动 argv[0]（shim）→ 开读者/写者线程。
5. **`Recorder::new()`**（`swarmx-recorder`）：打开 `.cast` 文件，后台写入任务开始。
6. **注册到 `registry`**（内存 `AgentSlot`）和 `store`（SQLite `agents` 表）。

### 4. shim 执行

1. 向 PTY stdout flush `\x1b]633;A\x07`。
2. `execvp("claude", ["claude", "--dangerously-skip-permissions", ...])`，shim 进程被真实 CLI 替换。

### 5. PTY pump 扫 OSC_READY

server 的读者线程读到 `\x1b]633;A\x07`：
- 更新 `AgentSlot.shim_ready_at`。
- 广播 `SwarmEvent::AgentState { status: ShimReady }` → 所有 `/ws/swarm` 连接。

### 6. 浏览器打开 PTY WebSocket

```
WS /ws/pty/<agent_id>
```

`pty_ws.rs` handler：从 `registry` 找到 `PtyBridge`，把 `output_rx` 的字节帧发给 WS；把 WS 收到的字节推进 `input_tx`（键入注入）。

### 7. 终端内容呈现

浏览器里的 xterm.js（或 Tauri webview 里的同款）接收 `output_rx` 字节流，渲染 ANSI 转义序列，用户看到 claude 的欢迎界面。

### 8. claude 的 MCP 初始化

claude 在启动时读取 `~/.claude.json` 的 MCP 条目，启动 `swarmx-mcp --agent-id <id>` 子进程（stdio JSON-RPC）。现在 claude 拥有了 10 个 swarm 工具。

### 9. 回合结束触发 wake-check

claude 完成一个回合，触发 Stop hook：
```bash
swarmx-mcp wake-check
```
`wake_check.rs` 读 stdin（CLI 提供的 JSON）→ `POST /api/message/consume_wakes` → 返回 `{}` 或 block → CLI 停止或续跑。

---

## 关键 REST / WebSocket API 速查

| 方法 | 路径 | 说明 |
|---|---|---|
| `GET` | `/api/plugins` | 列出已安装的 CLI plugins |
| `POST` | `/api/agent` | 创建（spawn）一个 agent |
| `GET` | `/api/agent` | 列出所有 agents（含历史） |
| `DELETE` | `/api/agent/:id` | 杀死 agent |
| `POST` | `/api/agent/:id/wake` | 手动唤醒已停的 agent |
| `POST` | `/api/agent/:id/interrupt` | 向 PTY 注入 Ctrl-C |
| `POST` | `/api/worker` | orchestrator 派 worker（`swarm_spawn_worker` 背后） |
| `GET` | `/api/roles` | 列出 role 注册表 |
| `GET` | `/api/message` | 列出/搜索消息 |
| `POST` | `/api/message` | 发送消息 |
| `POST` | `/api/message/read` | 标记消息已读 |
| `POST` | `/api/message/consume_wakes` | 原子领取 wake 消息（wake-check 用） |
| `GET` | `/api/blackboard` | 列出所有黑板路径 |
| `GET` | `/api/blackboard/*path` | 读黑板内容 |
| `PUT` | `/api/blackboard/*path` | 写黑板内容 |
| `GET` | `/api/workspaces` | 列出 workspace |
| `POST` | `/api/spell/run` | 执行一个 spell（如 init） |
| `WS` | `/ws/pty/:id` | PTY 双向字节流 |
| `WS` | `/ws/swarm` | swarm 事件流 |
| `WS` | `/ws/terminal` | 独立终端 WebSocket |

---

## 环境变量速查

| 变量 | 默认值 | 说明 |
|---|---|---|
| `SWARMX_PORT` | `7777` | server 监听端口 |
| `SWARMX_SERVER_URL` | `http://127.0.0.1:<port>` | server REST base URL（影响 MCP/hook 配置中的地址） |
| `SWARMX_DB_PATH` | `~/.swarmx/swarmx.db` | SQLite 文件路径 |
| `SWARMX_BLACKBOARD_DIR` | `~/.swarmx/blackboard` | 黑板根目录 |
| `SWARMX_RECORDINGS_DIR` | `~/.swarmx/recordings` | asciicast 文件目录 |
| `SWARMX_WORKSPACES_DIR` | `~/.swarmx/workspaces` | workspace 共享目录根 |
| `SWARMX_WEB_DIR` | （auto-detect） | 前端 dist/ 目录（Tauri 资源注入） |
| `SWARMX_OPENCODE_PLUGIN` | （auto-detect） | opencode wake JS 插件绝对路径（Tauri 注入） |
| `SWARMX_RETENTION_DAYS` | `30` | 数据保留天数（0 = 不清理） |
| `SWARMX_AUTO_RESPAWN_ORCHESTRATORS` | （未设置） | 设为 `1` 则 server 重启时自动重拉 orchestrator |
| `SWARMX_SPELLS_DIR` | （auto-detect） | spell overlay 目录（开发期覆盖 builtin） |
| `SWARMX_ROLES_DIR` | （auto-detect） | role overlay 目录 |
| `SWARMX_PLUGINS_DIR` | （auto-detect） | CLI plugin overlay 目录 |

---

## 待确认 / TODO

以下几点在撰写时无法从代码中 100% 确认，需要人工核对：

1. **`swarmx-cli` 的 `swarmx up` 具体行为**：是否真的会打开浏览器？还是只启动 server？`crates/swarmx-cli/src/main.rs` 未完整阅读，内容需对照代码验证。

2. **blackboard 路径格式**：文档里写的是 `<workspace_id>/<thread_id>/<key>`，但实际代码中 key 格式的精确规范（是否 thread_id 一定存在？main thread 的前缀是什么？）建议对照 `routes/swarm.rs` 和 `path_safe.rs` 核实。

3. **`swarm_name_thread` 的 git worktree 隔离流程**：文档说"在 git 项目上自动启动文件隔离（私有 git worktree）"，具体是何时触发、通过 `worktree.rs` 的哪个函数、是同步还是后台任务，建议核实 `routes/workspaces.rs` 中的 PATCH handler。

4. **codex 的 Stop hook 格式**：`claude.toml` 里有详细说明，`codex.toml` 的 stop hook 配置格式（`hooks.json`）可能有差异，建议读 `cli/codex.rs` 的 `pre_spawn` 确认。

5. **`swarmx-server doctor` 子命令**：文档未展开，但实际已实现（`main.rs` 的 `run_doctor()`），可以作为一个独立小节补充。

6. **数据保留（Retention）的精确策略**：哪些行"已消费"可以删，哪些"load-bearing"不能删，可从 `store.rs` 的 `prune_expired()` 函数精确补充。

7. **`SWARMX_AUTO_RESPAWN_ORCHESTRATORS` 的详细逻辑**：`progress.ledger.md` 含 `all_done` 时跳过，否则重拉。但 thread_id 解析（主 direction 还是全部 thread？）建议从 `auto_respawn_orchestrators()` 核实。

8. **用量计费（`billing.rs`）**：其具体追踪什么（token 数？费率来源？）和 `agent_usage` 表的字段含义，本文档未覆盖，可单独写一节。
