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
      return todo === todoId;
    });
    if (removeIndex >= 0) {
      this.todos.splice(removeIndex, 1);
    } else {
      console.log("error removing todo id: " + todoId);
    }
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
