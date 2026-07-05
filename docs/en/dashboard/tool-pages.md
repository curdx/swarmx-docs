# Tool pages

In the left navigation bar, the items other than "Conversation" are tool pages built around the workspace. Each defaults to your most recently used workspace.

## Objectives

A persistent layer above tasks: record **objectives** for a workspace, each with **acceptance criteria**, a **status** (active/paused/blocked/done/archived), an optional **token budget**, and the **direction** it applies to (all or the main direction). Each objective can accumulate **evidence** entries in three categories: note, proof, and blocker. Suited to long tasks, keeping agents from drifting off course.

## Tasks

A board where **each member is a task**. The columns are: To triage, To-do, Ready, In progress, Blocked, Done, Archived. Status is usually derived automatically from an agent's lifecycle, but you can manually override a card (block/done/archive/reset). The page stays fresh by polling.

## Schedule

Deliver a prompt to a workspace's captain on a **5-field cron** schedule. Common presets are provided (hourly/daily/weekdays/weekly/monthly), with a real-time human-readable description and the server-computed **next run** time; you can **run now**, enable/disable, edit in place, and delete. Times are shown in the browser's local time zone. You need at least one workspace as a delivery target before using it.

## Usage

Token usage and **estimated** cost. Because claude and codex run through a terminal rather than an API, the server scrapes the per-turn token counts from each worker's session records and prices them against a built-in rate table (unknown models are counted for tokens only). The page has overview cards (total cost / total tokens / input-output / cache / peak context), a daily trend, and breakdowns **by model** and **by agent**, plus a view of the rate table. Costs are estimates.

## Files

A **read-only** local file browser over the workspace's root directories; a toggle lifts the restriction to browse the entire file system (with a warning). It supports syntax-highlighted preview of Markdown and code; binary or oversized files are labeled but not expanded.

## Terminal

Open an interactive shell in the browser (per workspace; the session persists across pages). First use requires clicking "Connect terminal" to confirm; on disconnect, you're prompted to reconnect.
