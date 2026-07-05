# 快速开始

想不装命令、开箱即用，请看[桌面版](/guide/desktop)。本页介绍从源码运行（适合开发与自定义）。

## 环境要求

- Rust 1.83 及以上
- Node.js 22 及以上
- 至少一个已登录的 CLI：claude 为必需；如需 codex 的自动唤醒回合，其版本需 0.132 及以上；opencode、reasonix 为可选。安装与登录见[安装与登录引擎](/guide/install-engines)。
- 若使用[研究委员会](/guide/research-committee)或[融合竞赛](/guide/fusion)，还需安装 Comate Zulu 并配置 License（可在设置页一键安装，见 [Zulu 配置](/guide/zulu-setup)）。

## 从源码运行

```bash
git clone https://github.com/curdx/swarmx.git
cd swarmx

# 完整构建（服务端依赖配套二进制，需先执行）
cargo build --workspace
cd web && npm install && cd ..

# 终端 1：启动服务端（需在仓库根目录执行）
cargo run -p swarmx-server          # 监听 127.0.0.1:7777

# 终端 2：启动前端
cd web && npm run dev               # http://localhost:5173
```

在浏览器打开 <http://localhost:5173>，[创建工作空间](/dashboard/create-workspace)并指向一个真实的项目目录，即可开始与编排器对话。

::: tip 说明
服务端需从仓库根目录启动。开发构建下不会自动拉起服务端，需自行运行 `cargo run -p swarmx-server`。
:::

## 隔离的测试栈

需要一套与你日常会话互不干扰的全栈来做界面验证时，可用仓库自带脚本在非默认端口（数据落在临时目录）起一套：

```bash
bash scripts/test-stack.sh        # 构建并启动，保持运行
bash scripts/test-stack.sh stop   # 拆除
```

## 后续步骤

- [安装 Zulu 并配置 License](/guide/zulu-setup)，启用多模型的研究委员会与融合竞赛。
- 了解[三种协作模式](/guide/swarm)与[界面总览](/dashboard/overview)。
- 需要调整运行参数时，查阅[配置项](/reference/configuration)。
