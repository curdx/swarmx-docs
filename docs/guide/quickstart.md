# 快速开始

## 环境要求

- Rust 1.83 及以上
- Node.js 22 及以上
- 至少一个已登录的 CLI：claude 为必需；如需 codex 的自动唤醒回合，其版本需 0.132 及以上；opencode、reasonix 为可选。
- 若使用[研究委员会](/guide/research-committee)或[融合竞赛](/guide/fusion)，还需安装 Comate Zulu 并配置 License（可在设置页一键安装）。

## 从源码运行

```bash
git clone https://github.com/curdx/swarmx.git
cd swarmx

# 完整构建（服务端依赖 shim 二进制，需先执行）
cargo build --workspace
cd web && npm install && cd ..

# 终端 1：启动服务端（需在仓库根目录执行）
cargo run -p swarmx-server          # 监听 127.0.0.1:7777

# 终端 2：启动前端
cd web && npm run dev               # http://localhost:5173
```

在浏览器打开 <http://localhost:5173>，将工作空间指向一个真实的项目目录，即可开始与编排器对话。

## 桌面版

打包为 Tauri 应用后，服务端及其配套二进制以 sidecar 形式内嵌。用户下载、安装、打开即可使用，全程无需命令行。

```bash
cd web
npm run sidecar:release   # 构建 release 服务端并复制为 Tauri sidecar
npm run tauri:build       # 生成安装包（.app / .dmg 等）
```

## 后续步骤

- [安装 Zulu 并配置 License](/guide/zulu-setup)，启用多模型的研究委员会与融合竞赛。
- 了解[三种协作模式](/guide/swarm)。
- 需要调整运行参数时，查阅[配置项](/reference/configuration)。
