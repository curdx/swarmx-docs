# Handoff Protocol

How multi-agent fullstack spells (M6a) coordinate via the blackboard
and swarm messages. **This is a convention, not a runtime contract** —
agents that don't follow it deadlock or produce inconsistent artifacts,
but swarmx-core does not enforce it.

## Standard blackboard keys

| Key              | Writer    | Reader(s)        | Schema                                                                                                            |
| ---------------- | --------- | ---------------- | ----------------------------------------------------------------------------------------------------------------- |
| `api.spec`       | backend   | frontend, test   | Markdown OR OpenAPI 3 snippet. Required fields per endpoint: method, path, request body schema, response schema, error responses. |
| `frontend.done`  | frontend  | test             | `{ commit, components: [], entry, dev_server, built_at }`                                                          |
| `frontend.error` | frontend  | test             | `{ reason, details }`                                                                                              |
| `backend.done`   | backend   | frontend, test   | `{ commit, endpoints: [], entry, run_cmd, port, built_at }`                                                        |
| `backend.error`  | backend   | frontend, test   | `{ reason, details }`                                                                                              |
| `test.passed`    | test      | system (user)    | `{ framework, passed, failed: 0, report, ran_at }`                                                                 |
| `test.failed`    | test      | system (user)    | `{ framework, passed, failed, failures: [{ name, reason }], ran_at }`                                              |
| `test.skipped`   | test      | system (user)    | `{ reason, upstream_error }` — emitted when FE or BE failed                                                        |
| `frontend.review`| critic    | test, system     | `{ role: "frontend", commit, verdict: "pass"\|"warn"\|"block", issues: [{ severity, where, summary }], reviewed_at }` (M6c step 6) |
| `backend.review` | critic    | test, system     | Same shape as `frontend.review` with `role: "backend"` (M6c step 6) |
| `review.completed`| critic   | test, fixer      | `{ round, frontend: { verdict, commit, issues }, backend: { verdict, commit, issues }, reviewed_at }`. Test waits on this in `fullstack-feature-reviewed` and `fullstack-feature-strict` (spell-level `depends_on` override) so test never starts until critic has weighed in. (M6c step 6, `round` added M6d-3.) |
| `fixer.done`     | fixer    | critic           | `{ round, fixed_roles, commits: [{ role, commit, issues_addressed }], completed_at }`. Critic subscribes via `depends_on=["fixer.done"]`; each fixer.done wakes critic to re-review. The strict loop terminates when critic writes review.completed with all-pass/warn verdicts. (M6d-3) |
| `fixer.skipped`  | fixer    | (observability)  | `{ reason, round }`. Written when critic verdict is already all pass/warn — fixer has nothing to do but wants to leave a trail. No subscribers wake on this. (M6d-3) |
| `fixer.escalated`| fixer    | test             | `{ reason: "max rounds exceeded", round: 3, remaining_issues: [...] }`. Written when round 3 still has blockers fixer couldn't address. Test sees this in its M6d-3 verdict check, runs e2e anyway, and notes the escalation in the final test report. (M6d-3) |
| `design.md`      | architect | human operator   | Short markdown: what we're building, tech stack, data model, API surface, UX sketch, open questions. Written ONCE at start of `fullstack-feature-gated`, or REWRITTEN on each rejection round (M6d-2). The operator reads this and decides whether to approve or reject. |
| `design.approved`| human operator | frontend, backend | Any non-empty value (operator writes via the blackboard panel). Its presence is what unblocks FE+BE in `fullstack-feature-gated` — they `depends_on = ["design.approved"]` and the M6b WakeCoordinator wakes them in the same tick. (M6c step 7) |
| `design.rejected`| human operator | architect        | `{ "reason": "<short feedback>" }`. Architect subscribes via `depends_on = ["design.rejected"]`; on each write, it re-reads the reason, rewrites `design.md`, asks for re-review. Loop until `design.approved`. (M6d-2) |

All `*_at` timestamps are ISO 8601 UTC.

The blackboard keeps **version history** on every write (see
`swarmx-storage`), so amendments to e.g. `api.spec` mid-build are
recoverable — read the latest version via `swarm_read_blackboard`.

**Listing vs reading (M6d-1).** `swarm_list_blackboard` returns the
SQLite write history, which persists across server restarts and
across `rm` of the FS files under `~/.swarmx/blackboard/`. A row
in the listing is therefore NOT proof that the key's value is
currently available — the file may have been deleted between runs.
Agents that branch on the presence of `.error` (or any other
"signal" key) should follow up with `swarm_read_blackboard`:
`NOT_FOUND` / empty body = stale listing row, ignore; non-empty
body = real signal, act on it. Test and critic roles already do
this in their upstream-failed branches.

## Standard swarm messages

| From     | To              | kind    | When                                | Body                                                            |
| -------- | --------------- | ------- | ----------------------------------- | --------------------------------------------------------------- |
| backend  | frontend        | reply   | After `api.spec` is written         | `"api.spec written. <N> endpoints. FE can start."`              |
| frontend | backend         | note    | When api.spec needs amendment       | `"need X endpoint for Y. please amend api.spec."`               |
| frontend | test            | reply   | After `frontend.done` written       | `"Frontend ready at commit <SHA>. Entry: ..."`                  |
| backend  | test            | reply   | After `backend.done` written        | `"Backend ready at commit <SHA>. Run with: ..."`                |
| test     | system          | reply   | After test run                      | `"✅ test passed: N tests."` or `"❌ test failed: M/N tests."`   |
| test     | system          | reply   | If upstream failed                  | `"⏭️ test skipped — <which> failed."`                            |

Messages drive **wake-check**: receiving an unread message turns the
recipient's next Stop hook into a `block` decision, giving them a
fresh turn.

**M6b update — blackboard writes also wake subscribers.** A role that
declares `depends_on = ["X"]` in its TOML front-matter is subscribed
to key `X` automatically at spell-launch. When anyone writes that key,
the server (a) drops a system note `kind="wake"` into the role's
mailbox AND (b) injects `\x15…\r` directly into its PTY input, so the
agent does NOT have to be currently mid-Stop to get reactivated. Roles
that don't declare `depends_on` still work the M6a way (other agents
explicitly notify them via swarm messages).

## Why both blackboard AND messages?

| Mechanism   | What it carries          | Wake semantics                          |
| ----------- | ------------------------ | --------------------------------------- |
| blackboard  | Structured artifacts    | Wakes any subscriber declared via `depends_on` (M6b) |
| messages    | "Something happened" signals | Triggers wake-check → fresh turn       |

The pattern is: **write the artifact to the blackboard, then send a
notification message**. Subscribers wake on the blackboard event;
unsubscribed recipients wake on the message.

This is the same pattern git+CI uses: the artifact (commit) goes to a
repo, the notification (webhook) wakes the consumer.

## Failure model

- An agent fails → writes `<role>.error` to blackboard + notifies
  downstream agents.
- **M6c step 5 auto-fallback**: an agent that dies before writing its
  `handoff_signal` triggers the server to write `<role>.error`
  automatically AND directly wake the subscribers of the missed
  signal. So downstream agents see `*.error` whether the producer
  self-reported failure OR crashed silently.
- Downstream agents do a generic check on every wake: any `*.error`
  on the blackboard means upstream is dead — route to the
  upstream-failed branch (`test.skipped` for test; for critic, write a
  `review.completed` with `skipped:true` so test still gets the
  expected signal).
- Downstream agents do NOT attempt repair (M6c-6). A future critic /
  fixer loop (M6d) could close that gap.
- The user observes the final state via the swarm panel, the
  blackboard inspector, and the `graph` tab in the swarm drawer
  (edges turn red when an `*.error` is the latest write for a key).

## Why this layout

Modeled on MetaGPT's "Code = SOP(Team)" finding (ICLR 2024): pinning
the inter-agent protocol to a small set of named slots (PRD, design,
code, tests in MetaGPT; `api.spec`, `*.done`, test.passed here)
prevents the cascade-hallucination failure mode where FE and BE drift
on their assumed API shape. The shared key namespace forces the
contract to be explicit and inspectable.
