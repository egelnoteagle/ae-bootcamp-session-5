/**
 * End-to-end tests for TODO application critical user journeys
 * Tests CRUD operations and error handling using Page Object Model
 */
const { test, expect } = require('@playwright/test');
const { TodoPage } = require('./pages/TodoPage');

test.describe('TODO Application - Critical Journeys', () => {
  let todoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.goto();
  });

  test('loads and displays the todo application', async ({ page }) => {
    // Verify the app loads with main heading
    await expect(page.getByRole('heading', { name: /TODO App/i })).toBeVisible();
    
    // Verify the input field is present and functional
    await expect(todoPage.newTodoInput).toBeVisible();
    await expect(todoPage.addButton).toBeVisible();
  });

  test('creates a new todo item', async ({ page }) => {
    const newTodoTitle = 'Test new todo item';

    // Add a new todo
    await todoPage.addTodo(newTodoTitle);

    // Wait for the todo to appear in the list
    await todoPage.waitForTodoToAppear(newTodoTitle);

    // Verify the todo appears in the list
    await expect(todoPage.getTodoByTitle(newTodoTitle)).toBeVisible();

    // Verify input field is cleared after adding
    await expect(todoPage.newTodoInput).toHaveValue('');
  });

  test('toggles todo completion status', async ({ page }) => {
    const todoTitle = 'Todo to toggle';

    // Create a todo first
    await todoPage.addTodo(todoTitle);
    await todoPage.waitForTodoToAppear(todoTitle);

    // Verify todo is initially uncompleted
    expect(await todoPage.isTodoCompleted(todoTitle)).toBe(false);

    // Toggle the todo to completed
    await todoPage.toggleTodo(todoTitle);

    // Wait for state change and verify completion
    await page.waitForTimeout(500); // Brief wait for state update
    expect(await todoPage.isTodoCompleted(todoTitle)).toBe(true);

    // Verify visual styling indicates completion
    const todoText = todoPage.getTodoByTitle(todoTitle);
    await expect(todoText).toHaveCSS('text-decoration', /line-through/);
  });

  test('deletes a todo item', async ({ page }) => {
    const todoTitle = 'Todo to delete';

    // Create a todo first
    await todoPage.addTodo(todoTitle);
    await todoPage.waitForTodoToAppear(todoTitle);

    // Verify todo exists
    await expect(todoPage.getTodoByTitle(todoTitle)).toBeVisible();

    // Delete the todo
    await todoPage.deleteTodo(todoTitle);

    // Wait for the todo to disappear and verify deletion
    await todoPage.waitForTodoToDisappear(todoTitle);
    await expect(todoPage.getTodoByTitle(todoTitle)).not.toBeVisible();
  });

  test('handles API unavailability gracefully', async ({ page, context }) => {
    // Block API requests to simulate backend unavailability
    await context.route('**/api/todos**', (route) => route.abort('failed'));

    // Navigate to the app with API blocked
    await todoPage.goto();

    // The app should still load (not crash)
    await expect(page.getByRole('heading', { name: /TODO App/i })).toBeVisible();

    // Input field should still be functional even if backend is down
    await expect(todoPage.newTodoInput).toBeVisible();
    await expect(todoPage.addButton).toBeVisible();

    // Note: This tests graceful degradation - the app remains usable
    // even when the backend is unavailable
  });
});