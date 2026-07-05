# Quick start

If you want to install nothing and use it out of the box, see the [desktop build](/en/guide/desktop). This page covers running from source (suited to development and customization).

## Requirements

- Rust 1.83 or later
- Node.js 22 or later
- At least one logged-in CLI: claude is required; if you want codex's automatic wake-up turns, its version must be 0.132 or later; opencode and reasonix are optional. For installation and login, see [Install and log in to engines](/en/guide/install-engines).
- To use the [research committee](/en/guide/research-committee) or [fusion](/en/guide/fusion), you also need to install Comate Zulu and configure a License (available as a one-click install on the Settings page; see [Zulu setup](/en/guide/zulu-setup)).

## Run from source

```bash
git clone https://github.com/curdx/swarmx.git
cd swarmx

# Full build (the server depends on companion binaries, so run this first)
cargo build --workspace
cd web && npm install && cd ..

# Terminal 1: start the server (must be run from the repository root)
cargo run -p swarmx-server          # listens on 127.0.0.1:7777

# Terminal 2: start the frontend
cd web && npm run dev               # http://localhost:5173
```

Open <http://localhost:5173> in your browser, [create a workspace](/en/dashboard/create-workspace) pointing to a real project directory, and you can start talking to the orchestrator.

::: tip Note
The server must be started from the repository root. Under a development build, the server is not launched automatically — you need to run `cargo run -p swarmx-server` yourself.
:::

## Isolated test stack

When you need a full stack that does not interfere with your day-to-day sessions for UI verification, use the script bundled with the repository to bring one up on non-default ports (data lands in a temporary directory):

```bash
bash scripts/test-stack.sh        # build and start, keep running
bash scripts/test-stack.sh stop   # tear down
```

## Next steps

- [Install Zulu and configure a License](/en/guide/zulu-setup) to enable the multi-model research committee and fusion.
- Learn about the [three collaboration modes](/en/guide/swarm) and the [interface overview](/en/dashboard/overview).
- When you need to adjust runtime parameters, see the [configuration options](/en/reference/configuration).
