# Quick start

## Prerequisites

- Rust 1.83 or later
- Node.js 22 or later
- At least one logged-in CLI: claude is required; codex must be version 0.132 or later for its automatic wake-up turns; opencode and reasonix are optional.
- If you use the [research committee](/en/guide/research-committee) or [fusion](/en/guide/fusion), you also need to install Comate Zulu and configure a license (one-click install from the Settings page).

## Run from source

```bash
git clone https://github.com/curdx/swarmx.git
cd swarmx

# full build (the server depends on the shim binary, so run this first)
cargo build --workspace
cd web && npm install && cd ..

# terminal 1: start the server (run from the repository root)
cargo run -p swarmx-server          # listens on 127.0.0.1:7777

# terminal 2: start the frontend
cd web && npm run dev               # http://localhost:5173
```

Open <http://localhost:5173> in your browser, point the workspace at a real project directory, and you can start talking to the orchestrator.

## Desktop version

Once packaged as a Tauri application, the server and its accompanying binaries are embedded as sidecars. Users download, install, and open it — ready to use, with no command line at any point.

```bash
cd web
npm run sidecar:release   # build the release server and copy it as a Tauri sidecar
npm run tauri:build       # produce the installer (.app / .dmg, etc.)
```

## Next steps

- [Install Zulu and configure a license](/en/guide/zulu-setup) to enable the multi-model research committee and fusion.
- Learn about the [three collaboration modes](/en/guide/swarm).
- When you need to adjust runtime parameters, see the [configuration reference](/en/reference/configuration).
