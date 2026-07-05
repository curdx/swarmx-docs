# 安装 Zulu 与配置 License

[研究委员会](/guide/research-committee)与[融合竞赛](/guide/fusion)的多模型能力由 [Comate Zulu](https://www.npmjs.com/package/@comate/zulu) 提供：一份 Comate License 即可调用十余个模型，涵盖 DeepSeek、GLM、Kimi、MiniMax 等。

## 一键安装

1. 打开「设置 → 插件」。
2. 在 Comate Zulu 一栏点击「一键安装」。服务端将执行 `npm install -g @comate/zulu` 并实时回传日志；安装完成后卡片自动更新为「已安装」，无需刷新页面。
3. 在同一页面的 License 输入框中填入你的 Comate License 并保存。

License 仅保存在本机 `~/.swarmx/comate.json`，不会上传，也不会纳入版本控制。

## 手动安装

也可在终端中自行安装：

```bash
npm install -g @comate/zulu
zulu --version
```

安装完成后，同样在「设置 → 插件」中填入 License。

## 验证

- 「设置 → 插件」中 Comate Zulu 显示为「已安装 / 可用」，并列出该 License 可调用的全部模型。
- 打开任一工作空间的「研究委员会」或「融合竞赛」标签，即可使用多模型能力。

::: tip 提示
若已安装 Zulu 但尚未配置 License，模型列表将为空，研究委员会会提示前往配置。填入 License 后即可正常使用。
:::
