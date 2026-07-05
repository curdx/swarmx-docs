# Install Zulu and configure a license

The multi-model capabilities of the [research committee](/en/guide/research-committee) and [fusion](/en/guide/fusion) are provided by [Comate Zulu](https://www.npmjs.com/package/@comate/zulu): a single Comate license gives access to more than a dozen models, including DeepSeek, GLM, Kimi, and MiniMax.

## One-click install

1. Open **Settings → Plugins**.
2. On the Comate Zulu row, click **One-click install**. The server runs `npm install -g @comate/zulu` and streams the log back in real time; when it finishes, the card updates to **Installed** automatically, with no page refresh.
3. In the license field on the same page, enter your Comate license and save.

The license is stored only locally in `~/.swarmx/comate.json`; it is never uploaded and never enters version control.

## Manual install

You can also install it yourself from a terminal:

```bash
npm install -g @comate/zulu
zulu --version
```

Once installed, enter the license under **Settings → Plugins** as above.

## Verify

- In **Settings → Plugins**, Comate Zulu shows as **Installed / Available** and lists every model the license can reach.
- Open the **Research committee** or **Fusion** tab in any workspace to use the multi-model capabilities.

::: tip
If Zulu is installed but no license is configured, the model list will be empty and the research committee will prompt you to set one up. Once you enter the license, everything works.
:::
