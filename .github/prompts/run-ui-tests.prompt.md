---
description: "Run UI tests and summarize failures"
agent: test-engineer
tools: ['read', 'execute', 'todo']
---

Run the project's Playwright UI tests and summarize outcomes using the `test-engineer` agent.

1. Before running `/run-ui-tests`, the required first step is:

   ```bash
   npm run test:ui:install --workspace=frontend
   ```

   Repeat this installation after a container rebuild. In Ubuntu/Linux environments this command is mandatory and must perform `playwright install --with-deps chromium` before tests run.
2. The `test:ui:install` workflow includes bounded Ubuntu repository remediation for the common Yarn key issue and one retry. Do not perform ad-hoc package hunting or broad OS troubleshooting beyond that automated remediation.
3. If installation still fails, stop immediately. Report an environment blocker with the failing command and the key error lines. Do not run Playwright tests after a failed dependency install.
4. Ensure both backend and frontend are running before executing UI tests. Start them from the repository root with `npm start` if needed, and confirm the services are ready.
5. Run the UI suite using the project command:

   ```bash
   npm run test:ui
   ```
6. Summarize the total tests, passed tests, failed tests, skipped tests, and duration when available.
7. For every failure, include the test and assertion, relevant output, and likely root-cause category: application code, test code, or environment. State the evidence and the next focused check.
8. Do not weaken assertions, add arbitrary waits, or modify tests while running and diagnosing them. Report test changes as a separate follow-up.

Finish with a clear pass/fail status, environment notes, and concrete next actions. Do not claim UI confidence if the required install or services were not ready.
