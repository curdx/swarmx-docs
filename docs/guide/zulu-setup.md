# 安装 Zulu 与配置 license

[研究委员会](/guide/research-committee)和[融合竞赛](/guide/fusion)的多模型能力，由
[Comate Zulu](https://www.npmjs.com/package/@comate/zulu) 提供——**一把 Comate license
就能调十几个模型**（DeepSeek / GLM / Kimi / MiniMax 等）。

## 一键安装

1. 打开「设置 → 插件」。
2. 找到 **Comate Zulu** 那一栏，点「一键安装」。后端会跑 `npm install -g @comate/zulu`
   并把日志实时回传给你；装完卡片自动翻成「已安装」，无需刷新。
3. 在同一页的 **Comate License** 输入框里粘贴你的 license，保存。

license 只存本机 `~/.swarmx/comate.json`，不会上传，也不会进 git。

## 手动安装

也可以自己在终端里装：

```bash
npm install -g @comate/zulu
zulu --version        # 验证
```

装好后同样回「设置 → 插件」填 license。

## 装好之后

- 「设置 → 插件」里 Comate Zulu 会显示「已安装 / 可用」，并列出这把 license 能用的所有模型。
- 打开任一工作空间的「研究委员会」或「竞赛」标签就能用上多模型了。

::: tip
只装了 zulu、没填 license，模型列表会是空的，研究委员会会提示你去配置。填上就好。
:::
