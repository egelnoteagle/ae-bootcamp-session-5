# Development Memory System

This directory is the project's working memory: a lightweight place to capture discoveries, decisions, and lessons while development is in motion. It helps future work start with the context already learned instead of rediscovering the same behavior.

## Two Types of Memory

### Persistent memory

[`.github/copilot-instructions.md`](../copilot-instructions.md) contains the project's foundational principles, workflows, testing expectations, and collaboration rules. It is persistent guidance that applies across sessions.

### Working memory

This directory contains project-specific discoveries made during implementation:

```text
.github/memory/
├── README.md
├── session-notes.md
├── patterns-discovered.md
└── scratch/
    ├── .gitignore
    └── working-notes.md
```

- `session-notes.md` stores completed session summaries. It is committed as a historical record.
- `patterns-discovered.md` stores reusable code patterns, decisions, and lessons that accumulate over time. It is committed.
- `scratch/working-notes.md` stores notes for the active session. The contents of `scratch/` are ignored and are not committed.

## When to Use Each File

### During TDD

Start with `scratch/working-notes.md`. Record the current behavior, the failing test, the smallest intended change, and the result of each Red-Green-Refactor step. When a useful implementation pattern or decision emerges, add it to `patterns-discovered.md` once it is understood and reusable.

### During linting and code-quality work

Use the scratch notes to record the command, error category, diagnosis, and verification result. If the repository has a recurring lint convention or a surprising tool behavior, preserve that lesson in `patterns-discovered.md` rather than leaving it only in the temporary notes.

### During debugging

Use scratch notes to track the reproduction, hypotheses, checks, fixes, and remaining blockers. This prevents circular investigation and makes handoffs easier. After the issue is resolved, promote durable findings to `patterns-discovered.md` and summarize the completed work in `session-notes.md`.

## How AI Uses the Memory

At the start of relevant work, AI should read the persistent instructions and the applicable memory files for local context. It should use documented patterns and decisions when proposing or implementing changes, and it should add new findings only when they are specific, verified, and likely to help future work.

AI should treat scratch notes as active-session context, not as a permanent source of truth. Before relying on a note, validate it against the current code and tests. Committed session notes and discovered patterns are historical guidance: useful context that still needs to be checked when the code has changed.

## End-of-Session Routine

1. Review `scratch/working-notes.md` for verified findings, decisions, and unresolved questions.
2. Add reusable code patterns to `patterns-discovered.md`.
3. Write a concise completed-session summary in `session-notes.md`.
4. Leave active-only details in scratch; do not commit the ignored scratch contents.
5. Clear or replace the working notes when beginning the next session.

The key distinction is intentional: `session-notes.md` describes work that is finished and is committed, while `scratch/working-notes.md` supports work that is still underway and remains ephemeral.
