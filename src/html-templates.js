export function getPopup(popupType, popupAction = "", data = {}) {
  const generalType =
    popupType === "project" || popupType === "todo" ? popupType : "confirm";
  const popupHTMLFunc = popupTypes[popupType];
  let popupHTML = "";
  if (popupType === "project" || popupType === "todo") {
    popupHTML = popupHTMLFunc(popupAction, data);
  } else {
    popupHTML = popupHTMLFunc;
  }
  return `
    <dialog class="popup ${generalType}-popup" id="${generalType}">
    <div class="popup-header">
    <h3 class="popup-title">Popup</h3>
    <div class="popup-exit">X</div>
    </div>
    ${popupHTML}
    </dialog>
  `;
}

function getTodoForm(action, data) {
  return `
        <form action="#" class="popup-form" autocomplete="off">
          <div class="popup-input-title popup-input-area">
            <input
              class="popup-input"
              type="text"
              id="mainTitle"
              name="mainTitle"
              placeholder=""
              required
            />
            <label for="mainTitle"><span>Title</span></label>
          </div>
          <div class="popup-input-description popup-input-area">
            <textarea
              name="description"
              id="description"
              class="popup-input"
              placeholder=""
            ></textarea>
            <label for="description"><span>Description</span></label>
          </div>
          <div class="popup-input-area popup-input-project">
            <select name="project" id="project">
              <option value="default">Default</option>
            </select>
            <label for="project"><span>Project</span></label>
          </div>
          <div class="popup-input-area popup-input-date">
            <input type="date" class="popup-input" id="dueDate" name="dueDate" />
            <label for="dueDate"><span>Due Date</span></label>
          </div>
          <div class="popup-input-area popup-input-priority">
            <select name="priority" id="priority">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <button class="popup-btn btn" type="submit">Save Todo</button>
        </form>
    `;
}

function getProjectForm(action, data) {
  console.log("popup action: " + action);
  console.log("popup data: " + data);
  return `
    <form action="#" class="popup-form" autocomplete="off" data-id="${
      action === "edit" ? data.projectID : ""
    }">
    <div class="popup-input-title popup-input-area">
        <input type="text" class="popup-input" id="mainTitle" name="mainTitle" value="${
          data.currTitle ? data.currTitle : ""
        }" />
        <label for="mainTitle"><span>Title</span></label>
    </div>
    <button class="popup-btn btn" type="submit">${
      action === "add" ? "Add" : "Edit"
    } Project</button>
    </form>
    `;
}

function getConfirmPopup(popupType) {
  `<div class="popup-body">
    <p class="popup-text">${confirmTexts[popupType].confirmText}</p>
    <div class="popup-buttons">
      <button class="popup-btn btn" type="button">Cancel</button>
      <button class="popup-btn btn" type="button">${confirmTexts[popupType].buttonText}</button>
    </div>
  </div>`;
}

const confirmTexts = {
  deleteTodo: {
    confirmText: "Are you sure you want to permanently delete this todo?",
    buttonText: "Delete",
  },
  deleteProject: {
    confirmText:
      "If you delete this project, all todos will be moved to the default project. Are you sure you want to permanently delete this project?",
    buttonText: "Delete",
  },
  clearProjectTodos: {
    confirmText:
      "This will clear all todos from this project and send them to the default project. Are you sure you want to do this?",
    buttonText: "Clear Todos",
  },
  deleteCompleted: {
    confirmText:
      "This will permanently delete all completed todos in this project. Are you sure you want to do this?",
    buttonText: "Delete completed",
  },
};

const popupTypes = {
  project: getProjectForm,
  todo: getTodoForm,
  delTodo: getConfirmPopup("deleteTodo"),
  delProject: getConfirmPopup("deleteProject"),
  clearProTodos: getConfirmPopup("clearProjectTodos"),
  delCompleted: getConfirmPopup("deleteCompleted"),
};
