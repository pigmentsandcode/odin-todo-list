import { getPopup } from "./html-templates";

export class UIController {
  constructor() {}

  createButtonElement(btnClass, btnId, btnText, btnHandler) {
    const btnEl = document.createElement("button");
    btnEl.classList.add(btnClass);
    btnEl.setAttribute("data-id", btnId);
    btnEl.textContent = btnText;
    btnEl.addEventListener("click", btnHandler);
    return btnEl;
  }

  addSidebarListeners(handlers) {
    document
      .querySelector(`[data-id="new-project"]`)
      .addEventListener("click", handlers.addProjectClick);
  }

  populateSidebar(projects, handleNavProjectClick) {
    const navProjectsListEl = document.querySelector(".projects-list");
    navProjectsListEl.innerHTML = "";
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

      const completeBtnEl = this.createButtonElement(
        "complete-btn",
        todo.id,
        "check",
        handlers.todoCompleteClick
      );

      todoItemTopEl.appendChild(completeBtnEl);

      const todoTitleEl = document.createElement("div");
      todoTitleEl.classList.add("todo-title-div");
      todoTitleEl.textContent = todo.title;
      todoItemTopEl.appendChild(todoTitleEl);

      const todoEditBtnEl = this.createButtonElement(
        "edit-btn",
        todo.id,
        "Edit",
        handlers.todoEditClick
      );
      todoItemTopEl.appendChild(todoEditBtnEl);

      const todoDelBtnEl = this.createButtonElement(
        "delete-btn",
        todo.id,
        "Delete",
        handlers.todoDelClick
      );
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

  displayAddProjectPopup(handleProjectFormSubmit) {
    document.body.insertAdjacentHTML("beforeend", getPopup("project", "add"));
    document
      .querySelector(".popup-form")
      .addEventListener("submit", handleProjectFormSubmit);
    document.querySelector("#project").showModal();
  }

  closePopup(popupId, handleProjectFormSubmit) {
    document
      .querySelector(".popup-form")
      .removeEventListener("submit", handleProjectFormSubmit);
    document.querySelector(`#${popupId}`).close();
  }
}
