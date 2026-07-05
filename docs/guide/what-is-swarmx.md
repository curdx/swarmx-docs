# swarmx 是什么

swarmx 是一个运行在本地的浏览器仪表盘。它在伪终端（PTY）中启动你已经安装并登录好的编码 CLI——每个 agent 就是该 CLI 二进制本身——并为它们接入一套协作层：共享收件箱、共享黑板，以及一个统一入口的[编排器](/guide/orchestrator-and-roles)。你用自然语言向编排器描述目标，由它完成拆解、派发与结果汇总。

![swarmx 仪表盘：多个真实 CLI agent 并行运行](/assets/hero-terminals.png)

## 直接运行 CLI，而非重新封装

多数 agent 编排工具走两条路线之一：重写一个模型客户端，从而放弃你已付费的订阅鉴权；或在不合适的层级封装 CLI，无法复用既有会话。swarmx 只在其上增加协调能力，不替换任何一环——运行的始终是 CLI 本身。因此鉴权、限流与套餐额度的行为，与你在终端中直接使用完全一致，swarmx 不读取、也不存储任何凭证。

## 三种协作模式

- **[蜂群协作](/guide/swarm)**——一个编排器带领按需派发的 worker，协同完成一项任务。
- **[研究委员会](/guide/research-committee)**——多个模型并行会诊同一问题，经结构化对比后综合为结论。
- **[融合竞赛](/guide/fusion)**——多个模型分别实现同一需求，以客观检查把关，综合最优方案并合并。

后两种模式的多模型能力由 [Comate Zulu](/guide/zulu-setup) 提供，一份 License 即可调用十余个模型。

## 值得先了解的概念

- [工作原理](/guide/how-it-works)——三层结构、数据流与隐私边界。
- [黑板与收件箱](/guide/blackboard-and-inbox)——多个 agent 靠什么协作。
- [唤醒机制](/guide/wake-mechanism)——停下的 agent 如何在需要时重新开工。
- [工作方向与隔离](/guide/directions-and-isolation)——如何并行推进多条互不干扰的工作线。

## 上手

- 想立刻跑起来：[快速开始](/guide/quickstart)（源码运行）或[桌面版](/guide/desktop)（下载即用）。
- 先备好引擎：[安装与登录引擎](/guide/install-engines)。
- 要用多模型的研究委员会与融合竞赛：[安装 Zulu 与配置 License](/guide/zulu-setup)。
