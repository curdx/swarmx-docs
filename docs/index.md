---
layout: home

hero:
  name: swarmx
  text: 让本机的编码 CLI 组成一支协作的 AI 团队
  tagline: 在一个浏览器标签页里编排真实的 claude、codex、opencode、reasonix，并接入多模型研究委员会与融合竞赛。
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/quickstart
    - theme: alt
      text: swarmx 是什么
      link: /guide/what-is-swarmx
    - theme: alt
      text: GitHub
      link: https://github.com/curdx/swarmx

features:
  - title: 蜂群协作
    details: 与一个常驻编排器用自然语言沟通，由它按任务规模自动拆解、派发 worker。成员通过共享收件箱与黑板协作，黑板一经写入即时唤醒相关 agent。
    link: /guide/swarm
    linkText: 了解
  - title: 研究委员会
    details: 多个模型并行回答同一问题，由评审模型归纳共识、分歧、独特观点与盲区，再综合为一份结论。适用于技术选型与方案评审。
    link: /guide/research-committee
    linkText: 了解
  - title: 融合竞赛
    details: 同一需求交由多个模型分别实现，以客观检查作为准入门禁，由评审模型综合最优方案并合并至主线。一句需求、一次点击，全程自动。
    link: /guide/fusion
    linkText: 了解
---

<div style="max-width:960px;margin:48px auto 0;padding:0 24px;">

swarmx 直接运行你已安装并登录的 CLI，而非重新封装模型接口。鉴权、限流与套餐额度的行为，与在终端中直接使用这些工具完全一致；swarmx 不读取、也不存储任何凭证。

服务端基于 Rust 构建，仅监听本地回环地址；前端基于 Vite 与 React；桌面版通过 Tauri 打包。研究委员会与融合竞赛的多模型能力由 [Comate Zulu](/guide/zulu-setup) 提供，一份 License 即可调用十余个模型。

</div>
