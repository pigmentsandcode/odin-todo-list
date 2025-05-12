import { Project } from "./Project";
import { Todo } from "./Todo";

export class TodoList {
  constructor() {
    this.projects = new Map();
    this.todos = new Map();

    const defaultProject = new Project("Default");
    this.projects.set(defaultProject.getId(), defaultProject);
    this.defaultId = defaultProject.getId();
  }

  createTodo(newTodo) {
    newTodo.projectId = this.defaultId;
    const todo = new Todo(newTodo);
    this.todos.set(todo.getId(), todo);

    //adds new todo's id to default project's todos arr
    this.projects.get(this.defaultId).addTodo(todo.getId());
  }

  createProject(projectTitle) {
    const newProject = new Project(projectTitle);
    this.projects.set(newProject.getId(), newProject);
  }

  editTodo(update) {
    const updatedTodo = this.todos.get(update.id);
    if (updatedTodo.getProjectId() !== update.projectId) {
      this.projects.get(update.projectId).addTodo(update.id);
      this.projects.get(updatedTodo.getProjectId()).removeTodo(update.id);
    }
    updatedTodo.updateTodo(update);
  }

  editProjectTitle(projectId, newTitle) {
    this.projects.get(projectId).setTitle(newTitle);
  }

  deleteTodo(removeId) {
    const projectId = this.todos.get(removeId).getProjectId();
    this.projects.get(projectId).removeTodo(removeId);
    this.todos.delete(removeId);
  }

  deleteProject(delProjectId) {
    if (delProjectId === this.defaultId) {
      return;
    }

    const moveTodoIds = this.projects.get(delProjectId).getProjectTodos();
    moveTodoIds.forEach((todoId) => {
      this.projects.get(this.defaultId).addTodo(todoId);
      this.todos.get(todoId).setProjectId(this.defaultId);
      this.projects.get(delProjectId).removeTodo(todoId);
    });
    this.projects.delete(delProjectId);
  }

  getProjects() {
    return this.projects;
  }

  getTodos() {
    return this.todos;
  }

  printDefaultProject() {
    const defaultProject = this.projects.get(this.defaultId);
    console.log("This is default id: " + this.defaultId);
    console.log("This is default project title: " + defaultProject.getTitle());
    console.log(
      "This is default todos ids: " + defaultProject.getProjectTodos()
    );
  }

  printTodos() {
    this.todos.forEach((todo) => {
      console.log(todo.getTodo());
    });
  }
}
