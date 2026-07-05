---
layout: home

hero:
  name: swarmx
  text: Turn your local coding CLIs into a collaborating AI team
  tagline: Orchestrate real claude, codex, opencode, and reasonix in a single browser tab, connected to a multi-model research committee and fusion.
  actions:
    - theme: brand
      text: Quick start
      link: /en/guide/quickstart
    - theme: alt
      text: What is swarmx
      link: /en/guide/what-is-swarmx
    - theme: alt
      text: GitHub
      link: https://github.com/curdx/swarmx

features:
  - title: Swarm collaboration
    details: Communicate with a resident orchestrator in natural language; it decomposes the task by scale and dispatches workers automatically. Members collaborate through a shared inbox and blackboard, and the moment the blackboard is written, the relevant agents wake instantly.
    link: /en/guide/swarm
    linkText: Learn more
  - title: Research committee
    details: Multiple models answer the same question in parallel; a reviewer model distills consensus, disagreements, unique perspectives, and blind spots, then synthesizes a single conclusion. Suited to technology selection and design review.
    link: /en/guide/research-committee
    linkText: Learn more
  - title: Fusion
    details: The same requirement is handed to multiple models to implement separately; an objective check acts as the admission gate, and a reviewer model synthesizes the best solution and merges it into the mainline. One requirement, one click, fully automatic.
    link: /en/guide/fusion
    linkText: Learn more
---

<div style="max-width:960px;margin:48px auto 0;padding:0 24px;">

swarmx runs the CLIs you have already installed and logged in to directly, rather than re-wrapping the model API. Authentication, rate limiting, and plan-quota behavior are exactly the same as using these tools directly in a terminal; swarmx neither reads nor stores any credentials.

The server is built on Rust and listens only on the local loopback address; the frontend is built on Vite and React; the desktop version is packaged with Tauri. The multi-model capabilities of the research committee and fusion are provided by [Comate Zulu](/en/guide/zulu-setup) — a single License gives you access to more than a dozen models.

</div>
