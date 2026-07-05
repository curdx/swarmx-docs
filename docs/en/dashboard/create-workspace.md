# Create a workspace

A workspace = one project + one AI team. Click **New workspace** at the top of the workspace sidebar to enter a two-step wizard.

## Step 1: Name and captain engine

- **Name** — give the workspace a clear name.
- **Accent color** — choose one of five colors to tell multiple workspaces apart in the sidebar.
- **Captain engine** — choose which engine acts as the orchestrator (Claude by default, or any installed engine). Engines that aren't installed are marked "Not installed" and can't be selected.

## Step 2: Choose the main project

- **Main project** — enter the absolute path to the project directory. The interface validates in real time whether the path exists and is accessible, giving friendly hints for "directory does not exist / not a directory / no permission." The desktop app can use a native dialog to pick a folder; in browser debug mode you paste the path manually.

### Advanced: source context

Expand "Advanced source context" to mount directories **outside** the project as references, each tagged with a role — **peer project / dependency source / tooling project**; dependencies and tooling can also be attached under a parent project, forming a dependency tree. Once mounted, the orchestrator reads these sources directly instead of guessing. For the concept, see [Directions and isolation](/en/guide/directions-and-isolation).

## Creation and scan

After you click **Start**, swarmx creates the workspace, prepares each root directory, then brings the orchestrator online for a project scan: it enters the directory, identifies the tech stack, writes a project summary, and greets you. This step usually takes 20–40 seconds; the interface shows scan progress, and you can also click "Enter the room now" to go in early and wait in chat for it to come online.

Once in the room, you can hand your goal to the orchestrator in natural language — see [Swarm collaboration](/en/guide/swarm) and [Workspace views](/en/dashboard/workspace-views).
