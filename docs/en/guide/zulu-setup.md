# Install Zulu and configure a License

The multi-model capabilities of the [research committee](/en/guide/research-committee) and [fusion](/en/guide/fusion) are provided by [Comate Zulu](https://www.npmjs.com/package/@comate/zulu): **a single Comate License gives you access to more than a dozen models**, covering DeepSeek, GLM, Kimi, MiniMax, and more. This is how swarmx drives multi-model collaboration with "one License, many models."

## One-click install

1. Open "Settings → Plugins."
2. In the Comate Zulu row, click "Install with one click." The server runs `npm install -g @comate/zulu` and streams the log back in real time; when the install finishes, the card updates to "Installed" automatically, with no page refresh needed.
3. In the **Comate License** field on the same page, enter your License and save.

## Where the License is stored

The License is stored only locally in `~/.swarmx/comate.json`; it is never uploaded and never enters version control. If the `COMATE_LICENSE` environment variable is set, it takes precedence (suited to development or CI). "Settings → Plugins" shows only the last few characters for verification and never displays the full License.

## Manual install

You can also install it yourself from a terminal:

```bash
npm install -g @comate/zulu
zulu --version
```

Once installed, enter the License under "Settings → Plugins" as well.

## Verification and the model list

- Once the License is configured, "Settings → Plugins" lists **every model** this License can reach (shown as chips — one License, more than a dozen models).
- Open the "Research committee" or "Fusion" tab of any workspace to select the models you want to use.

::: tip Note
If Zulu is installed but no License has been configured yet, the model list will be empty, and the research committee will prompt you to go to "Settings → Plugins" to configure one. Once you enter the License, it works normally.
:::

## Why use a dedicated License

zulu's models are **specified per request**: the same backend service can serve any single model, which is ideal for having a group of models compete or consult in parallel. This is exactly the engine behind the research committee (multiple models answering in parallel) and fusion (multiple models implementing in parallel). For runtime details, see the [engine reference](/en/reference/engines).
