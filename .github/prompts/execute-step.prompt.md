---
description: "Execute instructions from the current GitHub Issue step"
agent: tdd-developer
tools: ['search', 'read', 'edit', 'execute', 'web', 'todo']
---

Execute the current step from the main GitHub exercise issue using the `tdd-developer` agent.

Issue number (optional): ${input:issue-number:Optional issue number}

1. If an issue number was provided, use it. Otherwise, use the GitHub CLI and the Workflow Utilities in `.github/copilot-instructions.md` to find the open exercise issue whose title contains `Exercise:`.
2. Retrieve the issue with all comments using `gh issue view <issue-number> --comments`.
3. Parse the latest applicable step instructions from the issue, including its step number and every `:keyboard: Activity:` section.
4. Summarize the step and list the activities before making changes.
5. Execute each activity systematically, following the project instructions and the active `tdd-developer` workflow. Respect the required testing scope and validate each incremental change.
6. Do not create or run Playwright UI tests in this prompt. This is a hard scope boundary. For Playwright work, stop and hand off using `/create-ui-tests`, then `/run-ui-tests`; those prompts automatically switch to `test-engineer`.
7. Do not commit or push changes. That is the responsibility of `/commit-and-push`.

When all applicable activities are complete, stop and provide a concise summary of files changed, tests run, results, blockers, and the next commands in exactly this order:

- If the current step requires UI workflow: `/create-ui-tests` -> `/run-ui-tests` -> `/validate-step {step-number}`
- If UI workflow is not required: `/validate-step {step-number}`

Never recommend `/validate-step` before the required UI prompts. Do not execute the next prompts automatically. Follow all testing scope constraints from `.github/copilot-instructions.md`.
