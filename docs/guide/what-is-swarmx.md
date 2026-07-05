# swarmx 是什么

swarmx 是一个跑在本地的浏览器仪表盘。它在 PTY 下拉起你已经装好、登录好的编码
CLI——每个 agent 就是那个二进制本身——再给它们接上一套协作层：共享收件箱、共享黑板、
一个统一入口的队长。你用自然语言跟队长说要做什么，它自己拆解、派人、把结果汇总回来。

![swarmx 仪表盘：多个真实 CLI agent 并排运行](/assets/hero-terminals.png)

## 不是套壳

大多数「agent 编排」工具，要么重写一个 LLM 客户端（丢掉你付费买到的订阅鉴权），要么在
错误的层去包 CLI（ACP、HTTP shim，没法复用你的会话）。swarmx 是能加协调、但什么都不
替换的最薄一层：跑的是 CLI 本身。所以 OAuth、限流、套餐额度这些，都跟你在终端里敲
`claude` 时一模一样。swarmx 不读、也不存你的任何 token。

## 能做的三件事

- **[蜂群协作](/guide/swarm)**：一个队长带着按需派生的 worker，把一件事拆着干完。
- **[研究委员会](/guide/research-committee)**：多个模型并行会诊一个问题，结构化对比后综合定稿。
- **[融合竞赛](/guide/fusion)**：多个模型各写一版同一需求，客观检查把关，综合最优合并。

后两个的多模型来自 [Comate Zulu](/guide/zulu-setup)——一把 license 就能调十几个模型。

## 底层怎么搭的

三层，没别的：

```
  MCP   ─►  swarm_send_message / swarm_write_blackboard / swarm_spawn_worker …
            （LLM 直接调用的原生工具；swarmx-mcp 讲 stdio JSON-RPC）
  shim  ─►  swarmx-shim execvp 真 CLI，发 OSC ready/exit（约 70 行）
  PTY   ─►  未经修改的 claude / codex / opencode / reasonix / zulu 二进制
```

浏览器给每个 agent 开一条 WebSocket 跑实时终端，另有一条 `/ws/swarm` 事件流。Rust
服务端（axum，只绑 loopback）管进程、收件箱、黑板、录像，以及把黑板写入变成唤醒的
调度器。各引擎的差异——opencode 的 TUI、reasonix / zulu 的 HTTP/SSE——都收在各自的
适配器里，仪表盘看到的是统一的 agent。更细的展开见[架构](/reference/architecture)。

准备好了就去[快速开始](/guide/quickstart)。
