# Quick start

## Prerequisites

- Rust 1.83+
- Node 22+
- At least one logged-in CLI: `claude`; `codex` must be 0.132+ for the auto-wake
  loop. `opencode` / `reasonix` are optional.
- For the [research committee](/en/guide/research-committee) or
  [fusion](/en/guide/fusion), you also need
  [Comate Zulu and a license](/en/guide/zulu-setup) (one-click install from Settings).

## From source

```bash
git clone https://github.com/curdx/swarmx.git
cd swarmx

# build everything (the server needs the shim binary present)
cargo build --workspace
cd web && npm install && cd ..

# terminal 1: backend (run from repo root)
cargo run -p swarmx-server          # → 127.0.0.1:7777

# terminal 2: frontend
cd web && npm run dev               # → http://localhost:5173
```

Open <http://localhost:5173>, point a workspace at a real project directory, and
start talking to its orchestrator.

## Desktop app

Packaged as a Tauri app, the server / shim / mcp binaries ride along as sidecars:
download, install, open, use — no terminal.

```bash
cd web
npm run sidecar:release   # compile release backend + copy as Tauri sidecar
npm run tauri:build       # produce the real installer (.app / .dmg / …)
```

## Next

- [Install Zulu and set your license](/en/guide/zulu-setup) to unlock the
  multi-model committee and fusion.
- Explore the [three modes](/en/guide/swarm).
- When you need to tune configuration, see the
  [configuration reference](/en/reference/configuration).
