# 术语表

| 术语 | 含义 |
|---|---|
| **编排器 / 队长** | 每条工作方向常驻的 agent，负责与你对话、扫描项目、维护计划、按需派发 worker。界面里称「队长」。见[编排器与角色](/guide/orchestrator-and-roles)。 |
| **worker** | 编排器按任务派发的临时 agent，从角色目录实例化，完成后退出。 |
| **角色** | worker 的职责模板，声明默认引擎、模型层级与擅长领域（如前端工程师、后端工程师、评审、测试执行等）。 |
| **引擎** | swarmx 运行的真实编码 CLI：claude、codex、opencode、reasonix、zulu。见[引擎参考](/reference/engines)。 |
| **工作空间** | 一个项目 + 一支 AI 团队。见[创建工作空间](/dashboard/create-workspace)。 |
| **工作方向** | 工作空间内的并行工作线。在 git 项目里自动获得独立工作副本与分支。见[工作方向与隔离](/guide/directions-and-isolation)。 |
| **源码上下文** | 挂载进工作空间、供 agent 参考的项目外目录（依赖源码、对等项目、工具项目）。 |
| **黑板** | 支持检索与版本历史的共享键值存储，承载产物与共享上下文。见[黑板与收件箱](/guide/blackboard-and-inbox)。 |
| **收件箱** | agent 之间的点对点消息通道，承载信号（note/ask/reply/wake）。 |
| **交接** | worker 之间以「类型化」方式对接产物：谁产出何种类型、谁消费，由系统解析与校验，不靠手写文件名。 |
| **唤醒** | 让停下的 agent 在需要时重新开工的机制：回合末检查 + 黑板写入即时唤醒。见[唤醒机制](/guide/wake-mechanism)。 |
| **蜂群协作** | 默认模式：一个编排器带领按需派发的 worker 协同完成任务。见[蜂群协作](/guide/swarm)。 |
| **研究委员会** | 多个模型并行会诊同一问题，结构化对比后综合定稿。见[研究委员会](/guide/research-committee)。 |
| **融合竞赛** | 多个模型分别实现同一需求，以客观检查把关，综合最优并合并。见[融合竞赛](/guide/fusion)。 |
| **MCP** | 模型上下文协议。swarmx 的协作能力以原生 MCP 工具的形式暴露给模型（`swarm_send_message`、`swarm_write_blackboard` 等）。 |
| **PTY** | 伪终端。swarmx 在 PTY 中运行真实 CLI，使其行为与你在终端里直接使用一致。 |
