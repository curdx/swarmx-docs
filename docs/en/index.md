---
layout: home

hero:
  name: swarmx
  text: Turn the real CLIs on your machine into a collaborating AI team
  tagline: Drive real claude / codex / opencode / reasonix / zulu in one browser tab — plus a multi-model research committee and code fusion.
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
    details: Tell one persistent orchestrator what you need; it decides whether to do it or spawn workers. Members coordinate over a shared inbox and blackboard; write a key and every agent waiting on it wakes up.
    link: /en/guide/swarm
    linkText: Learn more
  - title: Research committee
    details: Several models answer the same question in parallel; a judge breaks the answers into consensus / contradictions / unique points / blind spots, then synthesizes a verdict. For tech selection and design review.
    link: /en/guide/research-committee
    linkText: Learn more
  - title: Fusion
    details: Hand the same need to a few models; each writes its own version, an objective check gates them, and a judge synthesizes the best into the main line. Type one need, click once — no manual steps.
    link: /en/guide/fusion
    linkText: Learn more
---

<div style="max-width:960px;margin:48px auto 0;padding:0 24px;">

It runs the CLIs themselves, not a wrapper. OAuth, rate limits, plan quotas — all
of it behaves exactly like typing `claude` in your own terminal. swarmx never
reads or stores your tokens.

Rust backend (axum, loopback-only), Vite + React frontend, packaged with Tauri.
The multi-model committee and fusion are powered by
[Comate Zulu](/en/guide/zulu-setup) — one license, a dozen-plus models.

</div>
