---
description: "Create UI tests for required critical user journeys"
agent: test-engineer
tools: ['search', 'read', 'edit', 'execute', 'todo']
---

Create or update Playwright tests for the requested critical user journeys using the `test-engineer` agent.

Journeys (optional): ${input:journeys:Optional comma-separated journeys}

1. If journeys are not provided, use this default set: create, edit, toggle, delete, and core error-state handling.
2. Inspect existing Playwright configuration, specs, fixtures, page objects, application behavior, and test scripts before editing.
3. Select the highest-risk scenarios and target 3-5 total Playwright test cases for this run.
4. Create a maximum of 5 Playwright tests. Include at least 1 error-path test within the 3-5 total. If more than 5 candidate scenarios exist, select the highest-risk 5 and list deferred scenarios instead of creating more tests.
5. Generate or update UI tests using the project's Playwright framework. Keep tests deterministic, isolated, readable, and easy to debug.
6. Prefer stable accessibility-first selectors and state-based waits. Avoid brittle CSS selectors, implementation-detail selectors, and arbitrary timeouts.
7. Apply Page Object Model best practices: put reusable interactions and selectors in page object classes or focused helpers; keep test files focused on scenario intent and assertions; avoid duplicating selectors and interaction flows.
8. Run or otherwise validate the affected tests when feasible. Before finishing, inspect the authored Playwright files and verify the count of created or updated `test(...)` / `it(...)` cases is no greater than 5 and includes an error-path case.
9. Do not claim a small scope if the final authored count is greater than 5. Reduce the test set before finishing if necessary.

Report the files changed, final test-case count, scenarios covered, error path covered, deferred scenarios, and validation commands/results. Do not modify unrelated application code.
