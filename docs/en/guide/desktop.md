# Desktop build

The desktop build packages swarmx into a native application: **download, install, open, and use—no command line at any point**. It suits users who just want to use it without configuring an environment.

## Ready to use out of the box

The desktop build embeds the server and its companion binaries together, and the required built-in resources (orchestrator, roles, engine list, and so on) are compiled into the application at build time. As a result, even when the application's working directory at runtime is not a project repository and there are no environment variables at all, it still starts normally—the full path for a new user is simply "download → install → open → use right away," with no commands to type along the way.

Once open, you still need at least one logged-in coding CLI (see [Install and log in to engines](/en/guide/install-engines)); engines can be installed with one click and checked for availability under "Settings → Plugins" inside the application.

## Platform support

swarmx targets **macOS and Linux**. Process reaping relies on Unix process-group signals to ensure the launched CLIs and their child processes are terminated cleanly, and the data directory is based on the user's home directory by default. The release pipeline also builds Windows artifacts, but **Windows is currently experimental and not fully validated**—on non-Unix platforms, grandchild processes may not be reliably reaped. We recommend using macOS or Linux.

## Automatic updates

The desktop build has a built-in update check: when a new version is found, "Settings → About" displays a prompt, and you can download and install it within the application.

## Build an installer from source

If you want to produce an installer yourself, in the `web/` directory:

```bash
npm run sidecar:release   # build the release server and copy it as the embedded binary
npm run tauri:build       # generate a real installer (.app / .dmg, etc.)
```

For development and debugging, use `npm run tauri:dev`. Note: under a development build, the application does not launch the server automatically—you need to run `cargo run -p swarmx-server` yourself (see [Quick start](/en/guide/quickstart)).
