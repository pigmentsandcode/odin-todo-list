export class Project {
  constructor(newProject) {
    this.id = newProject.id;
    this.title = newProject.title;

    this.todos = newProject.todos; //ids of todos belonging to project
  }

  getId() {
    return this.id;
  }

  getTitle() {
    return this.title;
  }

  setTitle(newTitle) {
    this.title = newTitle;
  }

  addTodo(todoId) {
    this.todos.push(todoId);
  }

  removeTodo(todoId) {
    const removeIndex = this.todos.findIndex((todo) => {
      todo === todoId;
    });
    this.todos.splice(removeIndex, 1);
  }

  getProjectTodos() {
    return this.todos;
  }

  getProject() {
    return {
      id: this.id,
      title: this.title,
      projectTodos: this.todos,
    };
  }

  clearTodos() {
    this.todos = [];
  }
}
