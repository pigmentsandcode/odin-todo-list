export class Todo {
  constructor(newTodo) {
    this.title = newTodo.title;
    this.description = newTodo.description;
    this.dueDate = newTodo.dueDate;
    this.priority = newTodo.priority;
    this.id = newTodo.id;
    this.status = newTodo.status;
    this.projectId = newTodo.projectId;
  }

  getId() {
    return this.id;
  }

  getProjectId() {
    return this.projectId;
  }

  setProjectId(newProjectId) {
    this.projectId = newProjectId;
  }

  getTodo() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      dueDate: this.dueDate,
      priority: this.priority,
      status: this.status,
      projectId: this.projectId,
    };
  }

  updateTodo(updatedTodo) {
    this.title = updatedTodo.title;
    this.description = updatedTodo.description;
    this.dueDate = updatedTodo.dueDate;
    this.priority = updatedTodo.priority;
    this.status = updatedTodo.status;
    this.projectId = updatedTodo.projectId;
  }
}
