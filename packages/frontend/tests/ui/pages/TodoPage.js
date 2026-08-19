/**
 * Page Object Model for the TODO application
 * Encapsulates selectors and reusable interactions
 */
class TodoPage {
  constructor(page) {
    this.page = page;
  }

  // Selectors - using accessibility-first queries where possible
  get newTodoInput() {
    return this.page.getByPlaceholder('What needs to be done?');
  }

  get addButton() {
    return this.page.getByRole('button', { name: /add/i });
  }

  get loadingSpinner() {
    return this.page.getByRole('progressbar');
  }

  // Get todo item by title text
  getTodoByTitle(title) {
    return this.page.getByText(title);
  }

  // Get checkbox for a specific todo by its title
  async getTodoCheckbox(title) {
    const todoItem = this.page.locator('li').filter({ hasText: title });
    return todoItem.getByRole('checkbox');
  }

  // Get delete button for a specific todo by its title
  async getTodoDeleteButton(title) {
    const todoItem = this.page.locator('li').filter({ hasText: title });
    return todoItem.getByRole('button', { name: /delete/i });
  }

  // Actions
  async goto() {
    await this.page.goto('/');
  }

  async addTodo(title) {
    await this.newTodoInput.fill(title);
    await this.addButton.click();
  }

  async toggleTodo(title) {
    const checkbox = await this.getTodoCheckbox(title);
    await checkbox.check();
  }

  async deleteTodo(title) {
    const deleteButton = await this.getTodoDeleteButton(title);
    await deleteButton.click();
  }

  // Assertions/State checks
  async waitForTodoToAppear(title) {
    await this.getTodoByTitle(title).waitFor({ state: 'visible' });
  }

  async waitForTodoToDisappear(title) {
    await this.getTodoByTitle(title).waitFor({ state: 'detached' });
  }

  async isTodoCompleted(title) {
    const checkbox = await this.getTodoCheckbox(title);
    return await checkbox.isChecked();
  }

  async getTodoCount() {
    const todos = await this.page.locator('li').filter({ has: this.page.getByRole('checkbox') }).all();
    return todos.length;
  }
}

module.exports = { TodoPage };
