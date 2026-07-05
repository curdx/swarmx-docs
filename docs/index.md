---
layout: home

hero:
  name: swarmx
  text: 把你本机真实的 CLI 组成一支会协作的 AI 团队
  tagline: 在一个浏览器标签页里，驱动真实的 claude / codex / opencode / reasonix / zulu —— 外加多模型研究委员会与融合竞赛。
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
    details: 跟一个常驻队长用自然语言说需求，它自己判断该做还是派 worker。成员靠共享收件箱与黑板协作，黑板一写，等它的 agent 当场被唤醒。
    link: /guide/swarm
    linkText: 了解
  - title: 研究委员会
    details: 让多个模型并行回答同一个问题，judge 把答案拆成共识 / 分歧 / 独特点 / 盲区做对比，再综合成一份定稿。适合技术选型、方案评审。
    link: /guide/research-committee
    linkText: 了解
  - title: 融合竞赛
    details: 同一个需求丢给几个模型各写一版，客观检查当门禁，judge 综合最优合并进主线。填一句需求点一下，全程零手动。
    link: /guide/fusion
    linkText: 了解
---

<div style="max-width:960px;margin:48px auto 0;padding:0 24px;">

跑的是 CLI 本身，不是套壳。OAuth、限流、套餐额度这些，都跟你在终端里敲 `claude`
一模一样。swarmx 不读、也不存你的任何 token。

后端 Rust（axum，只绑 loopback），前端 Vite + React，桌面端用 Tauri 打包。多模型的研究委员会与
融合竞赛由 [Comate Zulu](/guide/zulu-setup) 驱动——一把 license 十几个模型。

</div>
