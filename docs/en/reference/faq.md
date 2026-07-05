# FAQ

## Which engine do I need at minimum?

**claude is the minimum requirement** — install it, log in, and you can start. Add codex for cross-engine collaboration; to use the multiple models in the Research Committee and Fusion, install zulu and configure a License. See [Install and Log In to Engines](/en/guide/install-engines).

## An engine shows "installed" but doesn't work?

"Installed" only means the command can be found, not that it can run. Go to "Settings → Plugins" and click **Check Availability** — it actually cold-starts each engine and returns a verdict of "available / unverified / login required / cannot start." Most "doesn't work" cases are **not logged in** — just log in with the login command on the card (e.g., run `claude` once in a terminal to log in, or `codex login`).

## codex auto-wake isn't working?

codex's end-of-turn auto-wake requires **0.132 or later**. On lower versions the engine runs normally, but auto-wake stays dormant. Upgrade codex to fix it. See [Engine Reference](/en/reference/engines).

## No models to choose from in the Research Committee / Fusion?

The multiple models for both come from zulu, which requires a Comate License. Go to "Settings → Plugins," enter the License, and the model list will appear. See [Install Zulu and Configure the License](/en/guide/zulu-setup).

## Can't select a folder when creating a workspace in the browser?

The desktop app can select folders with a native dialog; **in browser debug mode you must paste the absolute path of the project directory manually**. The path field validates in real time whether it exists and is accessible.

## A new direction isn't isolated?

Automatic isolation depends on git. **Non-git projects cannot be isolated**, so multiple directions share the same directory and may overwrite each other (the interface warns you). Turn the project into a git repository to get an independent working copy per direction. See [Directions and Isolation](/en/guide/directions-and-isolation).

## Are the costs on the usage page accurate?

They are **estimates**. Because claude and codex go through the terminal rather than an API, the server scrapes token counts from the session records and prices them against a built-in rate table; for unknown models it only counts tokens. Treat it as an order-of-magnitude reference, not a bill.

## Is Windows supported?

swarmx targets **macOS and Linux**. The release pipeline also builds Windows artifacts, but **Windows is experimental and not fully validated** — process reaping is incomplete on non-Unix systems. We recommend using macOS or Linux.

## A "backend offline" banner appears at the top?

This means the local server was interrupted. On the desktop app, use the retry/restart on the banner to recover; if running from source, confirm that `swarmx-server` is still running (see [Quickstart](/en/guide/quickstart)).

## Does swarmx upload my code or credentials?

No. The server listens only on the local loopback address and never reads or stores any login credentials — it only reuses your CLI's existing login. See [Data and Privacy](/en/reference/data-and-privacy) for details.
