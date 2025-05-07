import { Project } from "./Project";
import { Todo } from "./Todo";

export class TodoList {
  constructor() {
    this.projects = [];
    this.todos = [];

    const defaultProject = new Project("Default");
    this.projects.push(defaultProject);
    this.defaultId = defaultProject.getId();
  }

  createTodo(newTodo) {
    newTodo.projectId = this.defaultId;
    const todo = new Todo(newTodo);
    this.todos.push(todo);
  }

  printDefaultProject() {
    console.log("This is default id: " + this.defaultId);
    console.log(
      "This is default project title: " + this.projects[0].getProject().title
    );
  }

  printTodos() {
    this.todos.forEach((todo) => {
      console.log(todo.getTodo());
    });
  }
}
