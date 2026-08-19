---
description: "Validate that all success criteria for the current step are met"
agent: code-reviewer
tools: ['search', 'read', 'execute', 'web', 'todo']
---

Validate the requested exercise step using the `code-reviewer` agent.

Step number (required): ${input:step-number:Enter the step number, for example 5-0 or 5-1}

1. Require a non-empty step number. If it is missing, stop and ask the user for it.
2. Use the GitHub CLI and the Workflow Utilities in `.github/copilot-instructions.md` to find the main open exercise issue whose title contains `Exercise:`.
3. Retrieve the issue with comments using `gh issue view <issue-number> --comments`.
4. Search the issue content for the exact heading `# Step {step-number}:`.
5. Extract that step's `Success Criteria` section without mixing in criteria from another step.
6. Check every criterion against the current workspace state, relevant files, configuration, tests, and command results. Run focused validation commands when needed.
7. Report each criterion as complete, incomplete, or blocked, with concrete evidence and specific next actions for every incomplete item.
8. Summarize the overall status and clearly distinguish application defects, test defects, environment blockers, and missing work.

Do not modify files while validating. Do not declare success based only on file existence when the criterion requires behavior, tests, or command output.
