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

    if (projectTitleText !== "Default") {
      const projectEditBtnEl = this.createButtonElement(
        "edit-btn",
        projectID,
        "Edit",
        handlers.projectEditClick
      );
      projectTitleDiv.appendChild(projectEditBtnEl);

      const projectDelBtnEl = this.createButtonElement(
        "delete-btn",
        projectID,
        "Delete",
        handlers.projectDelClick
      );
      projectTitleDiv.appendChild(projectDelBtnEl);
    }

    mainContentEl.appendChild(projectTitleDiv);

    /*  Add Todo Button */
    const addTodoDivEl = document.createElement("div");
    addTodoDivEl.classList = "add-todo-div";
    const addTodoBtnEl = this.createButtonElement(
      "add-todo-btn",
      "addTodoBtn",
      "Add Todo",
      handlers.addTodoClick
    );
    addTodoBtnEl.setAttribute("data-project", projectID);

    addTodoDivEl.appendChild(addTodoBtnEl);
    mainContentEl.appendChild(addTodoDivEl);

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
      todoEditBtnEl.setAttribute("data-project", projectID);
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

  addNewTodoToProjectPage(todo, handlers) {
    const todoListULEl = document.querySelector(".todo-list");
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
    todoEditBtnEl.setAttribute("data-project", todo.projectId);
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
  }

  updateTodoItem(todo) {
    const todoListItemEl = document.querySelector(`li[data-id="${todo.id}"]`);
    todoListItemEl.querySelector(".todo-title-div").textContent = todo.title;
    todoListItemEl.querySelector(".todo-due-date").textContent = todo.dueDate;
    const priorityEl = todoListItemEl.querySelector(".todo-priority");
    if (todo.priority !== priorityEl.textContent) {
      priorityEl.classList.remove(`${priorityEl.textContent}-priority`);
      priorityEl.classList.add(`${todo.priority}-priority`);
      priorityEl.textContent = todo.priority;
    }
  }

  removeTodoItem(todoID) {
    const todoListItemEl = document.querySelector(`li[data-id="${todoID}"]`);
    todoListItemEl.remove();
  }

  displayAddProjectPopup(handleProjectFormSubmit) {
    document.body.insertAdjacentHTML(
      "beforeend",
      getPopup("project", {}, "add")
    );
    document
      .querySelector(".popup-form")
      .addEventListener("submit", handleProjectFormSubmit);
    document.querySelector("#project").showModal();
  }

  displayAddTodoPopup(handleTodoFormSubmit, data) {
    document.body.insertAdjacentHTML(
      "beforeend",
      getPopup("todo", data, "add")
    );
    document
      .querySelector(".popup-form")
      .addEventListener("submit", handleTodoFormSubmit);
    document.querySelector("#todo").showModal();
  }

  displayEditProjectPopup(handleProjectFormSubmit, data) {
    document.body.insertAdjacentHTML(
      "beforeend",
      getPopup("project", data, "edit")
    );
    document
      .querySelector(".popup-form")
      .addEventListener("submit", handleProjectFormSubmit);
    document.querySelector("#project").showModal();
  }

  displayEditTodoPopup(handleTodoFormSubmit, data) {
    document.body.insertAdjacentHTML(
      "beforeend",
      getPopup("todo", data, "edit")
    );
    document
      .querySelector(".popup-form")
      .addEventListener("submit", handleTodoFormSubmit);
    document.querySelector("#todo").showModal();
  }

  displayDelProjConfirmPopup(handlers, projectID) {
    console.log("inside display popup " + projectID);
    document.body.insertAdjacentHTML(
      "beforeend",
      getPopup("deleteProject", { id: projectID })
    );
    document
      .querySelector("#confirm-btn")
      .addEventListener("click", handlers.handleDelProjConfirm);
    document.querySelector("#confirm").showModal();
  }

  closePopup(popupId, handleProjectFormSubmit) {
    document
      .querySelector(".popup-form")
      .removeEventListener("submit", handleProjectFormSubmit);
    document.querySelector(`#${popupId}`).close();
    document.querySelector(`#${popupId}`).remove();
  }

  closeConfirmPopup(popupID, handlers) {
    document
      .querySelector("#confirm-btn")
      .removeEventListener("click", handlers.handleDelProjConfirm);
    document.querySelector(`#${popupID}`).close();
    document.querySelector(`#${popupID}`).remove();
  }
}
