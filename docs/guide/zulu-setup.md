# 安装 Zulu 与配置 License

[研究委员会](/guide/research-committee)与[融合竞赛](/guide/fusion)的多模型能力由 [Comate Zulu](https://www.npmjs.com/package/@comate/zulu) 提供：**一份 Comate License 即可调用十余个模型**，涵盖 DeepSeek、GLM、Kimi、MiniMax 等。这是 swarmx 用「一把 License、多个模型」驱动多模型协作的方式。

## 一键安装

1. 打开「设置 → 插件」。
2. 在 Comate Zulu 一栏点击「一键安装」。服务端将执行 `npm install -g @comate/zulu` 并实时回传日志；安装完成后卡片自动更新为「已安装」，无需刷新页面。
3. 在同一页面的 **Comate License** 输入框中填入你的 License 并保存。

## License 存在哪

License 仅保存在本机 `~/.swarmx/comate.json`，不会上传，也不会纳入版本控制。若设置了 `COMATE_LICENSE` 环境变量，则以环境变量为准（适合开发或 CI）。「设置 → 插件」只显示末位若干字符做校对，不回显完整 License。

## 手动安装

也可在终端中自行安装：

```bash
npm install -g @comate/zulu
zulu --version
```

安装完成后，同样在「设置 → 插件」中填入 License。

## 验证与模型列表

- 配置好 License 后，「设置 → 插件」会列出这份 License 可调用的**全部模型**（以芯片形式展示，一份 License、十余个模型）。
- 打开任一工作空间的「研究委员会」或「融合竞赛」标签，即可在其中选择要用的模型。

::: tip 提示
若已安装 Zulu 但尚未配置 License，模型列表将为空，研究委员会会提示前往「设置 → 插件」配置。填入 License 后即可正常使用。
:::

## 为什么单独用一份 License

zulu 的模型是**按请求指定**的：同一个后台服务可以服务任意一个模型，非常适合让一组模型并行对赛或会诊。这正是研究委员会（多模型并行答题）与融合竞赛（多模型并行实现）背后的引擎。运行细节见[引擎参考](/reference/engines)。
