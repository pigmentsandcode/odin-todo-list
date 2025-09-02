import { Project } from "./Project";
import { Todo } from "./Todo";

import { Storage } from "./storage";

export class TodoList {
  constructor() {
    this.projects = new Map();
    this.todos = new Map();
    this.defaultId = "";

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
    if (!newTodo.projectId) {
      newTodo.projectId = this.defaultId;
    }
    newTodo.id = crypto.randomUUID();
    newTodo.status = "incomplete";
    const todo = new Todo(newTodo);
    this.todos.set(todo.getId(), todo);
    Storage.saveTodos(this.todos);

    //adds new todo's id to project's todos arr
    this.projects.get(newTodo.projectId).addTodo(todo.getId());
    Storage.saveProjects(this.projects);

    return todo.getId();
  }

  createProject(newProjectTitle) {
    const newProject = {
      title: newProjectTitle,
    };
    newProject.id = crypto.randomUUID();
    newProject.todos = [];
    const project = new Project(newProject);
    this.projects.set(newProject.id, project);
    Storage.saveProjects(this.projects);
    return newProject.id;
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

  editTodoStatus(todoId) {
    const updatedTodo = this.todos.get(todoId);
    updatedTodo.setStatus();
    Storage.saveTodos(this.todos);
    return updatedTodo.getTodo();
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
    this.moveTodos(moveTodoIds, this.defaultId, delProjectId);
    this.projects.delete(delProjectId);
    Storage.saveTodos(this.todos);
    Storage.saveProjects(this.projects);
  }

  deleteCompleteTodos(projectId) {
    const projectTodosIds = this.projects.get(projectId).getProjectTodos();
    console.log("todo ids list: " + projectTodosIds.length);
    projectTodosIds.forEach((todoId) => {
      console.log("this is todoid: " + todoId);
      const todoStatus = this.todos.get(todoId).getTodo().status;
      console.log("Todo status: " + todoStatus);
      if (todoStatus === "completed") {
        this.projects.get(projectId).removeTodo(todoId);
        this.todos.delete(todoId);
      }
    });
    Storage.saveProjects(this.projects);
    Storage.saveTodos(this.todos);
  }

  getProjectTitles() {
    let projectTitles = [];
    this.projects.forEach((project) => {
      projectTitles.push({
        id: project.getId(),
        title: project.getTitle(),
      });
    });
    return projectTitles;
  }

  getProjects() {
    return this.projects;
  }

  getTodos() {
    return this.todos;
  }

  getDefaultId() {
    return this.defaultId;
  }

  getTodoInfo(todoId) {
    return this.todos.get(todoId).getTodo();
  }

  getProjectTitle(projectID) {
    return this.projects.get(projectID).getTitle();
  }

  getProjectTodos(projectId) {
    const projectTodoIds = this.projects.get(projectId).getProjectTodos();
    const projectTodosInfo = [];
    projectTodoIds.forEach((id) => {
      projectTodosInfo.push(this.todos.get(id).getTodo());
    });
    return projectTodosInfo;
  }

  clearProjectTodos(projectId) {
    const moveTodosIds = this.projects.get(projectId).getProjectTodos();
    this.moveTodos(moveTodosIds, this.defaultId, projectId);
    this.projects.get(projectId).clearTodos();
    Storage.saveTodos(this.todos);
    Storage.saveProjects(this.projects);
  }

  moveTodos(moveTodosIds, newProjectId, oldProjectId) {
    moveTodosIds.forEach((todoId) => {
      this.projects.get(newProjectId).addTodo(todoId);
      this.todos.get(todoId).setProjectId(newProjectId);
      this.projects.get(oldProjectId).removeTodo(todoId);
    });
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
