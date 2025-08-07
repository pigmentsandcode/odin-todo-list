export class UIController {
  constructor() {}

  populateSidebar(projects, handleNavProjectClick) {
    const navProjectsListEl = document.querySelector(".projects-list");
    projects.forEach((project) => {
      if (project.title !== "Default") {
        this.addProjectSidebar(
          project,
          handleNavProjectClick,
          navProjectsListEl
        );
      } else {
        const defaultEl = document.querySelector("#default-li .nav-title");
        defaultEl.setAttribute("data-id", project.id);
        defaultEl.addEventListener("click", handleNavProjectClick);
      }
    });
  }

  addProjectSidebar(project, handleNavProjectClick, navProjectsListEl) {
    const projectItem = document.createElement("li");
    projectItem.classList.add("nav-project-item");
    projectItem.setAttribute("data-id", project.id);
    projectItem.textContent = project.title;
    projectItem.addEventListener("click", handleNavProjectClick);
    navProjectsListEl.appendChild(projectItem);
  }

  displayProjectPage(projectID, projectTitleText, handlers, todos) {
    const mainContentEl = document.querySelector("#main-content");
    mainContentEl.innerHTML = "";

    const projectTitleDiv = document.createElement("div");
    projectTitleDiv.classList.add("project-title-div");

    const projectTitleEl = document.createElement("h2");
    projectTitleEl.classList.add("project-title");
    projectTitleEl.textContent = projectTitleText;
    projectTitleDiv.appendChild(projectTitleEl);

    const projectEditBtnEl = document.createElement("button");
    projectEditBtnEl.classList.add("edit-btn");
    projectEditBtnEl.setAttribute("data-id", projectID);
    projectEditBtnEl.textContent = "Edit";
    projectTitleDiv.appendChild(projectEditBtnEl);

    const projectDelBtnEl = document.createElement("button");
    projectDelBtnEl.classList.add("delete-btn");
    projectDelBtnEl.setAttribute("data-id", projectID);
    projectDelBtnEl.textContent = "Delete";
    projectTitleDiv.appendChild(projectDelBtnEl);

    mainContentEl.appendChild(projectTitleDiv);

    /*  Project Todos List */
    const todoListULEl = document.createElement("ul");
    todoListULEl.classList.add("todo-list", "flex-col");

    todos.forEach((todo) => {
      const todoListItemEl = document.createElement("li");
      todoListItemEl.classList.add("todo-list-item");
      todoListItemEl.setAttribute("data-id", todo.id);

      const todoItemULEl = document.createElement("ul");
      /*  Todo Item Top */
      const todoItemTopEl = document.createElement("li");
      todoItemTopEl.classList.add("todo-top");

      const completeBtnEl = document.createElement("button");
      completeBtnEl.classList.add("complete-btn");
      completeBtnEl.setAttribute("data-id", todo.id);
      completeBtnEl.textContent = "check";
      completeBtnEl.addEventListener("click", handlers.todoCompleteClick);
      todoItemTopEl.appendChild(completeBtnEl);

      const todoTitleEl = document.createElement("div");
      todoTitleEl.classList.add("todo-title-div");
      todoTitleEl.textContent = todo.title;
      todoItemTopEl.appendChild(todoTitleEl);

      const todoEditBtnEl = document.createElement("button");
      todoEditBtnEl.classList.add("edit-btn");
      todoEditBtnEl.setAttribute("data-id", todo.id);
      todoEditBtnEl.textContent = "Edit";
      todoEditBtnEl.addEventListener("click", handlers.todoEditClick);
      todoItemTopEl.appendChild(todoEditBtnEl);

      const todoDelBtnEl = document.createElement("button");
      todoDelBtnEl.classList.add("delete-btn");
      todoDelBtnEl.setAttribute("data-id", todo.id);
      todoDelBtnEl.textContent = "Delete";
      todoDelBtnEl.addEventListener("click", handlers.todoDelClick);
      todoItemTopEl.appendChild(todoDelBtnEl);

      todoItemULEl.appendChild(todoItemTopEl);
      /* Todo Item Bottom */
      const todoItemBottomEl = document.createElement("li");
      todoItemBottomEl.classList.add("todo-bottom");

      const todoDueDateEl = document.createElement("div");
      todoDueDateEl.classList.add("todo-due-date");
      // TODO: formate date
      todoDueDateEl.textContent = todo.dueDate;
      todoItemBottomEl.appendChild(todoDueDateEl);

      const todoPriorityEl = document.createElement("div");
      todoPriorityEl.classList.add(
        "todo-priority",
        "priority",
        `${todo.priority}-priority`
      );
      todoPriorityEl.textContent = todo.priority;
      todoItemBottomEl.appendChild(todoPriorityEl);

      todoItemULEl.appendChild(todoItemBottomEl);
      todoListItemEl.appendChild(todoItemULEl);
      todoListULEl.appendChild(todoListItemEl);
    });

    mainContentEl.appendChild(todoListULEl);
  }
}
