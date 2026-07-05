# Install and log in to engines

swarmx runs the real coding CLIs on your machine. Before using it, install and log in to at least one engine—**claude is the minimum requirement**, and the rest are optional. For engines you have already used in the terminal, swarmx reuses their login state directly, with no need to re-authenticate.

## One-click install inside the app (recommended)

Open "Settings → Plugins." Each engine is a card that shows whether it is installed. For an engine that is not installed, click **Install with one click**, and the server runs the corresponding install command and streams the logs back in real time; once done, the card updates to "Installed" automatically. The card also provides **verify** and **login** commands, along with links to the official documentation.

After installing, click **Check availability**: this performs a real cold start of each engine to confirm that it is not merely "found on PATH" but **can actually run**. Each engine receives a verdict of "Available / Not verified / Login required / Cannot start."

## Installing, verifying, and logging in to each engine

You can also install them yourself in the terminal. Below are the common methods for each engine:

### claude (required)

```bash
npm install -g @anthropic-ai/claude-code     # or brew install --cask claude-code
claude --version                              # verify
claude                                        # log in on first run
```

### codex

```bash
npm install -g @openai/codex                  # or brew install --cask codex
codex --version                               # verify
codex login                                    # log in
```

::: tip Automatic wake-up requires 0.132+
codex's end-of-turn automatic wake-up depends on a newer capability, requiring **codex 0.132 or later**. Lower versions still run, but automatic wake-up stays dormant. See the [FAQ](/en/reference/faq) for details.
:::

### opencode

```bash
npm install -g opencode-ai                     # or brew install opencode
opencode --version                             # verify
opencode auth login                            # log in per provider
```

### reasonix

```bash
npm install -g reasonix@next
reasonix version                               # verify
reasonix setup                                 # log in / initialize
```

reasonix uses DeepSeek via the `DEEPSEEK_API_KEY` environment variable.

### zulu

```bash
npm install -g @comate/zulu
zulu --version                                 # verify
```

zulu authenticates with a single Comate License (entered under "Settings → Plugins" inside the app), and one License gives you access to more than a dozen models. For the full guide, see [Install Zulu and configure a License](/en/guide/zulu-setup).

## Which ones to install

- Just want to get running: install **claude** and you are set.
- Want cross-engine collaboration (such as a claude orchestrator + codex worker): also install **codex**.
- Want the multi-model [research committee](/en/guide/research-committee) and [fusion](/en/guide/fusion): install **zulu** and configure a License.

For a full comparison of each engine's transport, authentication, and automatic wake-up capabilities, see the [engine reference](/en/reference/engines).
