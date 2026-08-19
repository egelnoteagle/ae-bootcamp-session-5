---
description: "Analyze changes, generate commit message, and push to feature branch"
tools: ['read', 'execute', 'todo']
---

Analyze the current workspace changes, create or switch to the user-provided feature branch, commit all changes with a conventional commit message, and push that branch.

Branch name (required): ${input:branch-name:Enter the feature branch name}

1. If no branch name is provided, stop and ask the user for one. Never infer a branch name and never use `main`.
2. Determine whether the current step requires the UI workflow by checking the current chat context and relevant exercise issue instructions. If it does, require a successful `/run-ui-tests` result in the current chat or run `npm run test:ui` before committing. Do not commit while required UI validation is failing or has not been performed.
3. Analyze the workspace with `git status`, `git diff`, and `git diff --cached` as needed. Review the complete change set, including untracked files, before generating the message.
4. Generate a concise, descriptive conventional commit message using `feat:`, `fix:`, `chore:`, or `docs:` as appropriate. Explain the chosen message briefly.
5. If the specified branch does not exist, create it with `git checkout -b <branch-name>`. If it exists, switch to it with `git checkout <branch-name>`.
6. Confirm the checked-out branch is exactly the user-provided branch name. Do not commit to `main` or any other branch.
7. Stage all changes with `git add .`.
8. Commit using the generated conventional commit message.
9. Push only the specified branch with `git push origin <branch-name>`.
10. Report the branch, commit hash/message, push result, and validation commands/results.

Do not amend, reset, force-push, or discard changes. Stop and report the blocker if the working tree, branch state, tests, authentication, or remote prevents a safe push.
