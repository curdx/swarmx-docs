# Install Zulu and set your license

The multi-model features — [research committee](/en/guide/research-committee) and
[fusion](/en/guide/fusion) — are powered by
[Comate Zulu](https://www.npmjs.com/package/@comate/zulu): **one Comate license
reaches a dozen-plus models** (DeepSeek / GLM / Kimi / MiniMax, and more).

## One-click install

1. Open **Settings → Plugins**.
2. On the **Comate Zulu** row, click **One-click install**. The backend runs
   `npm install -g @comate/zulu` and streams the log to you; when it finishes the
   card flips to "Installed" with no reload.
3. Paste your **Comate license** into the input on the same page and save.

The license lives only in `~/.swarmx/comate.json` — it isn't uploaded and never
enters git.

## Manual install

You can also install it yourself:

```bash
npm install -g @comate/zulu
zulu --version        # verify
```

Then set the license from Settings → Plugins as above.

## After setup

- Comate Zulu shows "Installed / Usable" in Settings → Plugins, listing every
  model the license can reach.
- Open the "Research Committee" or "Fusion" tab in any workspace to use them.

::: tip
If zulu is installed but no license is set, the model list will be empty and the
research committee will prompt you to configure it. Paste the license and you're
set.
:::
