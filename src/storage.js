import { Project } from "./Project";
import { Todo } from "./Todo";

export class Storage {
  static saveTodos(todos) {
    const todosMapObj = Object.fromEntries(todos);
    localStorage.setItem("todos", JSON.stringify(todosMapObj));
  }

  static saveProjects(projects) {
    const projectsMapObj = Object.fromEntries(projects);
    localStorage.setItem("projects", JSON.stringify(projectsMapObj));
  }

  static saveDefaultId(defaultId) {
    localStorage.setItem("defaultProjectId", defaultId);
  }

  static fetchTodos(todosMap) {
    const todosData = localStorage.getItem("todos");
    if (!todosData) {
      return;
    }
    for (const [key, value] of Object.entries(JSON.parse(todosData))) {
      todosMap.set(key, new Todo(value));
    }
  }

  static fetchProjects(projectsMap) {
    const projectData = localStorage.getItem("projects");
    if (!projectData) {
      return;
    }
    for (const [key, value] of Object.entries(JSON.parse(projectData))) {
      projectsMap.set(key, new Project(value));
    }
  }

  static fetchDefaultId() {
    const defId = localStorage.getItem("defaultProjectId");
    if (!defId) {
      return;
    }
    return defId;
  }
}
