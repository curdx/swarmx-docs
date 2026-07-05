# Directions and isolation

One workspace corresponds to one project. Within that project, you can open multiple **directions** that advance in parallel without interfering with one another; each direction can bind **source context** from outside the project, letting agents read dependency code directly instead of guessing.

## Directions

A direction is a parallel line of work inside a workspace. Every workspace is born with a **mainline** that corresponds to the project itself. You can open additional directions so that different tasks advance at the same time without stepping on each other.

Each direction is led by its own [orchestrator](/en/guide/orchestrator-and-roles) and has its own ledgers and members.

### Automatic isolation

In a git project, a named direction **automatically gets an independent working copy and branch** (a git worktree): its file changes and commits are isolated from the mainline and from other directions, and none overwrites another. This step is transparent to you — what you see is a "direction," without having to touch branches and worktrees directly.

- The mainline always shares the same directory as the project and is not isolated.
- A new direction enters "isolating" after it is named, and becomes an independent copy once ready.
- A non-git project cannot be isolated, so multiple directions will share the same directory (in which case the interface warns you that they may overwrite each other).

A direction card shows its git status in real time: whether there are uncommitted changes, the current branch, and how many commits it is **ahead of / behind** the mainline (a purely local comparison, with no network fetch).

### Merging back to the mainline

Once an independent direction is complete, it can be **merged back to the mainline**. The merge first preserves its uncommitted changes; if a conflict arises, swarmx dispatches an AI mediator to resolve it rather than dumping the conflict on you. After merging, the direction can be cleaned up.

You can also **open an existing branch as a direction**, working directly on that branch instead of creating a new one.

## Source context

Many tasks need to reference code **outside** the project — the source of a depended-upon library, a peer sibling project, or a tooling project. When creating a workspace (or later), you can mount these directories as **source context roots** and label their role:

- **Main project** — the agents' terminals work here.
- **Dependency source** — the source of a library/service the main project depends on.
- **Tooling project** — a companion tool or script project.

Dependencies and tools can be attached beneath a parent project, forming a logical dependency tree.

Once mounted, swarmx writes a managed context note into the workspace's `CLAUDE.md` / `AGENTS.md`, telling the orchestrator the location and role of these roots — so it reads the mounted source directly instead of guessing at interfaces. This note is idempotent: re-mounting only updates it in place, and content you write yourself outside the markers is untouched; when the last root is removed, the note is cleared. An isolated direction's independent copy also carries the same context note.

In the interface, both directions and source context are managed in the workspace sidebar; see [Create a workspace](/en/dashboard/create-workspace) and [Interface overview](/en/dashboard/overview) for details.
