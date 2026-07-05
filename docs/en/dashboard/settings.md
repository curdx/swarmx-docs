# Settings

Settings is divided into several sections (jump with `⌘1`–`⌘7`). Preference settings are stored in the local browser; provisioning such as models and plugins is stored on the server.

## General

Interface language; startup behavior (open the main panel on startup); desktop notifications for new messages; and "Close other agents on failure" — whether, when one member fails, to stop the rest of the same batch along with it.

## Appearance

Theme: light / dark / follow system.

## Keyboard shortcuts

A keyboard shortcut reference (currently a read-only list).

## Models

Provision models per engine: specify which model and thinking effort each CLI uses. The opus/sonnet/haiku tiers are Claude's native terminology; other engines use their own default model ids. It warns you of unsaved changes.

## Plugins

Engines and multi-model are both managed here.

- **Comate License** card — enter and save the License that zulu uses (stored locally only). Once configured, it lists all models available under this License. See [Install Zulu and configure a license](/en/guide/zulu-setup).
- **Check availability** — genuinely cold-starts each engine to confirm it doesn't just "resolve as a command" but actually runs; each engine gets a verdict of "available / unverified / login required / can't start."
- **Engine list** — one card per engine, showing install status, binary, and version. Engines that aren't installed can be **installed in one click** (with a live log), with verification, login commands, and links to official documentation. For the full explanation, see [Install and log in to engines](/en/guide/install-engines).

## Privacy and security

Tool-call approval is by design always "allow" (no per-call human confirmation). You can **export** or **clear** the local data stored in your browser. For a fuller privacy explanation, see [Data and privacy](/en/reference/data-and-privacy).

## About

Version, repository, backend address, and dependency information; the desktop app also offers **software updates** (manual check, download and install).
