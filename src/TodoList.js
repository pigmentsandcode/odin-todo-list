import { Project } from "./Project";
import { Todo } from "./Todo";

import { Storage } from "./storage";

export class TodoList {
  constructor() {
    this.projects = new Map();
    this.todos = new Map();

    Storage.fetchProjects(this.projects);
    if (this.projects.size === 0) {
      const defProject = {
        title: "Default",
        id: crypto.randomUUID(),
        todos: [],
      };
      const defaultProject = new Project(defProject);
      this.projects.set(defaultProject.getId(), defaultProject);
      this.defaultId = defaultProject.getId();
      Storage.saveProjects(this.projects);
      Storage.saveDefaultId(this.defaultId);
    } else {
      this.defaultId = Storage.fetchDefaultId();
    }
    Storage.fetchTodos(this.todos);
    if (this.todos.size === 0) {
      Storage.saveTodos(this.todos);
    }
  }

  createTodo(newTodo) {
    newTodo.projectId = this.defaultId;
    newTodo.id = crypto.randomUUID();
    newTodo.status = "incomplete";
    const todo = new Todo(newTodo);
    this.todos.set(todo.getId(), todo);
    Storage.saveTodos(this.todos);

    //adds new todo's id to default project's todos arr
    this.projects.get(this.defaultId).addTodo(todo.getId());
    Storage.saveProjects(this.projects);
  }

  createProject(newProject) {
    newProject.id = crypto.randomUUID();
    newProject.todos = [];
    const project = new Project(newProject);
    this.projects.set(newProject.id, project);
    Storage.saveProjects(this.projects);
  }

  editTodo(update) {
    const updatedTodo = this.todos.get(update.id);
    if (updatedTodo.getProjectId() !== update.projectId) {
      this.projects.get(update.projectId).addTodo(update.id);
      this.projects.get(updatedTodo.getProjectId()).removeTodo(update.id);
      Storage.saveProjects(this.projects);
    }
    updatedTodo.updateTodo(update);
    Storage.saveTodos(this.todos);
  }

  editProjectTitle(projectId, newTitle) {
    this.projects.get(projectId).setTitle(newTitle);
    Storage.saveProjects(this.projects);
  }

  deleteTodo(removeId) {
    const projectId = this.todos.get(removeId).getProjectId();
    this.projects.get(projectId).removeTodo(removeId);
    this.todos.delete(removeId);
    Storage.saveProjects(this.projects);
    Storage.saveTodos(this.todos);
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
    Storage.saveTodos(this.todos);
    Storage.saveProjects(this.projects);
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
