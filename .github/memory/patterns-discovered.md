# Patterns Discovered

This file accumulates reusable, verified code patterns and development lessons. Add a new entry when a behavior is likely to recur or a decision is important for future changes. Prefer concrete examples from this repository over general advice.

## Pattern Template

### [Pattern name]

- **Context:** [Where or when this pattern applies]
- **Problem:** [What could go wrong without it]
- **Solution:** [The approach to follow]
- **Example:**

  ```javascript
  // Add a concise repository-specific example here.
  ```

- **Related files:** [Links to implementation, tests, or documentation]

## Example: Service Initialization (Empty Array vs Null)

- **Context:** A service owns an in-memory collection that starts with no records.
- **Problem:** Initializing the collection with `null` forces every consumer to add a null check and makes collection operations inconsistent.
- **Solution:** Initialize a collection as an empty array when the service contract promises a collection. Reserve `null` for an intentionally absent or not-yet-loaded value.
- **Example:**

  ```javascript
  const todos = [];

  function listTodos() {
    return todos;
  }
  ```

- **Related files:** [Backend application](../../packages/backend/src/app.js), [Backend tests](../../packages/backend/__tests__/app.test.js)

Add future patterns below this example, using the template above. Verify each pattern against current tests and implementation before treating it as guidance.
