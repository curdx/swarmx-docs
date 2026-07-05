# 安装与登录引擎

swarmx 运行的是你本机真实的编码 CLI。使用前，至少要装好并登录一个引擎——**claude 是最低要求**，其余可选。你已经在终端里用过的引擎，swarmx 直接复用其登录状态，无需重复认证。

## 在应用内一键安装（推荐）

打开「设置 → 插件」。每个引擎是一张卡片，显示是否已安装。未安装的引擎可点**一键安装**，服务端会执行对应安装命令并把日志实时回传；装完卡片自动更新为「已安装」。卡片上还提供**验证**与**登录**命令，以及官方文档链接。

装好后点**检测可用性**：这会真实冷启动每个引擎，确认它不只是「命令能找到」，而是**确实能跑**。每个引擎会得到「可用 / 未验证 / 需登录 / 无法启动」的判定。

## 各引擎的安装、验证与登录

也可以在终端里自行安装。以下为各引擎的常用方式：

### claude（必需）

```bash
npm install -g @anthropic-ai/claude-code     # 或 brew install --cask claude-code
claude --version                              # 验证
claude                                        # 首次运行内登录
```

### codex

```bash
npm install -g @openai/codex                  # 或 brew install --cask codex
codex --version                               # 验证
codex login                                    # 登录
```

::: tip 自动唤醒需要 0.132+
codex 的回合末自动唤醒依赖一项较新的能力，需 **codex 0.132 及以上**。更低版本仍可运行，但自动唤醒会处于休眠状态。详见[常见问题](/reference/faq)。
:::

### opencode

```bash
npm install -g opencode-ai                     # 或 brew install opencode
opencode --version                             # 验证
opencode auth login                            # 按供应商登录
```

### reasonix

```bash
npm install -g reasonix@next
reasonix version                               # 验证
reasonix setup                                 # 登录/初始化
```

reasonix 通过 `DEEPSEEK_API_KEY` 环境变量使用 DeepSeek。

### zulu

```bash
npm install -g @comate/zulu
zulu --version                                 # 验证
```

zulu 用一份 Comate License 认证（在应用内「设置 → 插件」填入），一份 License 即可调用十余个模型。完整说明见[安装 Zulu 与配置 License](/guide/zulu-setup)。

## 该装哪些

- 只想先跑起来：装好 **claude** 即可。
- 想要跨引擎协作（如 claude 编排器 + codex worker）：再装 **codex**。
- 想用[研究委员会](/guide/research-committee)与[融合竞赛](/guide/fusion)的多模型：装 **zulu** 并配置 License。

各引擎的传输方式、鉴权与自动唤醒能力的完整对照，见[引擎参考](/reference/engines)。
