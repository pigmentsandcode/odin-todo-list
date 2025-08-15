import "./styles.css";
import { TodoList } from "./TodoList";
import { UIController } from "./UIController";

const newTodoList = new TodoList();
const uiController = new UIController();

function handleProjectEditClick(e) {
  const projectID = e.target.dataset.id;
  const currTitle = newTodoList.getProjectTitle(projectID);
  uiController.displayEditProjectPopup(handleProjectFormSubmit, {
    projectID: projectID,
    currTitle: currTitle,
  });
}

function handleProjectDelClick(e) {
  const projectID = e.target.dataset.id;
  uiController.displayDelProjConfirmPopup(
    {
      handleDelProjConfirm: handleDelProjConfirmClick,
    },
    projectID
  );
}

function handleDelProjConfirmClick(e) {
  newTodoList.deleteProject(e.target.dataset.id);
  loadDefaultProjectPage();
  uiController.closeConfirmPopup("confirm", {
    handleDelProjConfirm: handleDelProjConfirmClick,
  });
  uiController.populateSidebar(
    newTodoList.getProjects(),
    handleNavProjectClick
  );
}

function handleTodoFormSubmit(e) {
  e.preventDefault();
  const data = new FormData(e.target);
  const title = data.get("mainTitle");
  const description = data.get("description");
  const project = data.get("project");
  const dueDate = data.get("dueDate");
  const priority = data.get("priority");
  let todoID = e.target.dataset.id;
  if (todoID === "") {
    todoID = newTodoList.createTodo({
      title: title,
      description: description,
      dueDate: dueDate,
      priority: priority,
      projectId: project,
    });
  } else {
    newTodoList.editTodo(todoID, title);
  }

  uiController.closePopup("todo", handleTodoFormSubmit);
  console.log("completed handle todo form submit");

  const handlers = {
    todoCompleteClick: handleTodoCompleteClick,
    todoEditClick: handleTodoEditClick,
    todoDelClick: handleTodoDelClick,
  };
  //uiController.displayProjectPage(projectID, title, handlers, todos);
  uiController.addNewTodoToProjectPage(
    newTodoList.getTodoInfo(todoID),
    handlers
  );
}

function handleAddTodoClick(e) {
  console.log("Handle add todo click: " + e.target.dataset.id);
  uiController.displayAddTodoPopup(handleTodoFormSubmit);
}

function handleTodoCompleteClick(e) {
  console.log("Handle Todo Complete Click for: " + e.target.dataset.id);
}

function handleTodoEditClick(e) {
  console.log("Handle Todo Edit Click for: " + e.target.dataset.id);
}

function handleTodoDelClick(e) {
  console.log("Handle Todo Delete Click for: " + e.target.dataset.id);
}

function handleNavProjectClick(e) {
  const projectID = e.target.dataset.id;
  const projectTitle = newTodoList.getProjectTitle(projectID);
  const todos = newTodoList.getProjectTodos(projectID);
  const handlers = {
    projectEditClick: handleProjectEditClick,
    projectDelClick: handleProjectDelClick,
    addTodoClick: handleAddTodoClick,
    todoCompleteClick: handleTodoCompleteClick,
    todoEditClick: handleTodoEditClick,
    todoDelClick: handleTodoDelClick,
  };
  uiController.displayProjectPage(projectID, projectTitle, handlers, todos);
}

function handleProjectFormSubmit(e) {
  e.preventDefault();
  const data = new FormData(e.target);
  const title = data.get("mainTitle");
  let projectID = e.target.dataset.id;
  if (projectID === "") {
    projectID = newTodoList.createProject(title);
  } else {
    newTodoList.editProjectTitle(projectID, title);
  }

  uiController.closePopup("project", handleProjectFormSubmit);
  uiController.populateSidebar(
    newTodoList.getProjects(),
    handleNavProjectClick
  );

  const todos = newTodoList.getProjectTodos(projectID);
  const handlers = {
    projectEditClick: handleProjectEditClick,
    projectDelClick: handleProjectDelClick,
    addTodoClick: handleAddTodoClick,
    todoCompleteClick: handleTodoCompleteClick,
    todoEditClick: handleTodoEditClick,
    todoDelClick: handleTodoDelClick,
  };
  uiController.displayProjectPage(projectID, title, handlers, todos);
}

function handleAddProjectClick(e) {
  uiController.displayAddProjectPopup(handleProjectFormSubmit);
}

function loadDefaultProjectPage() {
  const handlers = {
    addTodoClick: handleAddTodoClick,
    todoCompleteClick: handleTodoCompleteClick,
    todoEditClick: handleTodoEditClick,
    todoDelClick: handleTodoDelClick,
  };
  const defaultProjectID = newTodoList.getDefaultId();
  const defaultProjectTitle = newTodoList.getProjectTitle(defaultProjectID);
  const defaultTodos = newTodoList.getProjectTodos(defaultProjectID);
  uiController.displayProjectPage(
    defaultProjectID,
    defaultProjectTitle,
    handlers,
    defaultTodos
  );
}

function onLoad() {
  uiController.addSidebarListeners({
    addProjectClick: handleAddProjectClick,
  });

  uiController.populateSidebar(
    newTodoList.getProjects(),
    handleNavProjectClick
  );

  /*    Load Default project page */
  loadDefaultProjectPage();
}

onLoad();
