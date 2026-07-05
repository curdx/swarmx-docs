# Interface overview

The swarmx dashboard is organized around **workspaces**: global navigation on the left, and a workspace with its several views in the center. This page gives you a quick tour of each region; later pages cover them one by one.

## Top bar

- **Brand** — the swarmx mark in the top-left corner; click it to return to the conversation home.
- **Command palette** — the search button (shortcut `⌘K` / `Ctrl K`) for quick navigation and actions.
- **Notifications** — the bell in the top-right corner; a red dot appears when there are unread items. Click to preview recent events, or open the full notifications page.

When the local server is unexpectedly interrupted, a **Backend offline** banner appears at the top with retry/restart entry points.

## Left navigation bar

A vertical navigation column that can be expanded (icon + label) or collapsed (icon only, with the name shown on hover); its state is remembered. Each item is its own page:

| Navigation | Purpose |
|---|---|
| **Conversation** | The product's main surface: conversations with the orchestrator and members inside a workspace. |
| **Files** | Browse local files. |
| **Terminal** | Open a shell. |
| **MCP** | Install tools for agents. |
| **Schedule** | Scheduled tasks. |
| **Objectives** | Objective mode. |
| **Tasks** | Task board. |
| **Usage** | Tokens and cost. |

At the bottom is **Settings**. When a new version is available, the settings icon carries a red dot.

**Conversation** is the core; the rest are tool pages built around it (see [Tool pages](/en/dashboard/tool-pages) and [Settings](/en/dashboard/settings)).

## The workspace interface

Once you enter a workspace, the interface has three persistent regions:

- **Workspace sidebar** — lists all workspaces (searchable); each can expand to show its [directions](/en/guide/directions-and-isolation) and source contexts; a "New workspace" button sits at the top (see [Create a workspace](/en/dashboard/create-workspace)).
- **Channel header + tab bar** — shows the current workspace and direction name; an **online/offline** indicator reflects the live connection; a "Merge to mainline" button appears for a non-mainline, isolated direction.
- **View area** — six tabs; switching between them leaves the other regions unchanged.

## The six views

The tab order is fixed; switch with `⌘1`–`⌘6`:

| Shortcut | Tab | Content |
|---|---|---|
| ⌘1 | **Chat** | Chat with the orchestrator, the plan checklist, and the members panel (see [Workspace views](/en/dashboard/workspace-views)). |
| ⌘2 | **Collaboration graph** | A real-time graph of member dependencies and waiting relationships. |
| ⌘3 | **Work ledger** | The orchestrator's ledger of tasks and progress. |
| ⌘4 | **Competition** | [Fusion](/en/guide/fusion). |
| ⌘5 | **Research committee** | [Research committee](/en/guide/research-committee). |
| ⌘6 | **Recordings** | Terminal session replays for each agent. |

Clicking any member opens the [Agent drawer](/en/dashboard/agent-drawer), where you can view its terminal, activity, recordings, messages, and outputs.
