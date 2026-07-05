# 快速开始

## 前置

- Rust 1.83+
- Node 22+
- 至少一个已登录的 CLI：`claude`；想要自动唤醒回合的话 `codex` 需 0.132+。`opencode` /
  `reasonix` 可选。
- 想用[研究委员会](/guide/research-committee)或[融合竞赛](/guide/fusion)，还需要
  [Comate Zulu 与一个 license](/guide/zulu-setup)（设置页里一键装）。

## 从源码起

```bash
git clone https://github.com/curdx/swarmx.git
cd swarmx

# 全量构建（server 需要 shim 二进制在场，先跑这个）
cargo build --workspace
cd web && npm install && cd ..

# 终端 1：后端（从仓库根目录起）
cargo run -p swarmx-server          # → 127.0.0.1:7777

# 终端 2：前端
cd web && npm run dev               # → http://localhost:5173
```

打开 <http://localhost:5173>，把工作空间指向一个真实项目目录，直接跟它的队长说话就行。

## 桌面端

swarmx 打成 Tauri 包后，server / shim / mcp 三个二进制作为 sidecar 内嵌，下载装好打开
就能用，全程不碰命令行。

```bash
cd web
npm run sidecar:release   # 编译 release 后端 + 拷成 Tauri sidecar
npm run tauri:build       # 出真实安装包（.app / .dmg / …）
```

## 下一步

- [装 Zulu、配 license](/guide/zulu-setup)，解锁多模型的研究委员会与融合竞赛。
- 看看[三种玩法](/guide/swarm)。
- 需要调配置时，翻[配置参考](/reference/configuration)。
