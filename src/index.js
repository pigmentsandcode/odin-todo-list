import "./styles.css";
import { TodoList } from "./TodoList";
import { UIController } from "./UIController";

const newTodoList = new TodoList();
const uiController = new UIController();
let currentPageID = "";

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

    const handlers = {
      todoCompleteClick: handleTodoCompleteClick,
      todoEditClick: handleTodoEditClick,
      todoDelClick: handleTodoDelClick,
      viewTodoClick: handleViewTodoClick,
    };

    uiController.addNewTodoToProjectPage(
      newTodoList.getTodoInfo(todoID),
      handlers
    );
  } else {
    const editTodo = {
      id: todoID,
      projectId: project,
      title: title,
      description: description,
      dueDate: dueDate,
      priority: priority,
      status: "incomplete",
    };
    newTodoList.editTodo(editTodo);
    const currentProjectID = e.target.dataset.project;
    //if project is same
    if (project === currentProjectID) {
      uiController.updateTodoItem(editTodo);
    } else {
      //if project is changed
      uiController.removeTodoItem(editTodo.id);
    }
  }

  uiController.closePopup("todo", handleTodoFormSubmit);
}

function handleAddTodoClick(e) {
  console.log("Handle add todo click: " + e.target.dataset.id);
  const projectsList = newTodoList.getProjectTitles();
  uiController.displayAddTodoPopup(handleTodoFormSubmit, {
    currProject: e.target.dataset.project,
    projectTitles: projectsList,
  });
}

function handleTodoCompleteClick(e) {
  console.log("Handle Todo Complete Click for: " + e.target.dataset.id);
  const todoID = e.target.dataset.id;
  const updatedTodo = newTodoList.editTodoStatus(todoID);

  uiController.updateTodoStatus(updatedTodo);
}

function handleTodoEditClick(e) {
  console.log("Handle Todo Edit Click for: " + e.target.dataset.id);
  const todoID = e.target.dataset.id;
  const currTodo = newTodoList.getTodoInfo(todoID);
  const projectsList = newTodoList.getProjectTitles();
  uiController.displayEditTodoPopup(handleTodoFormSubmit, {
    todoID: todoID,
    currTodo: currTodo,
    currProject: e.target.dataset.project,
    projectTitles: projectsList,
  });
}

function handleTodoDelClick(e) {
  console.log("Handle Todo Delete Click for: " + e.target.dataset.id);
  const todoID = e.target.dataset.id;
  uiController.displayDelTodoConfirmPopup(
    {
      handleDelTodoConfirm: handleDelTodoConfirmClick,
    },
    todoID
  );
}

function handleDelTodoConfirmClick(e) {
  const delTodoID = e.target.dataset.id;
  newTodoList.deleteTodo(delTodoID);
  uiController.closeConfirmPopup("confirm", {
    handleDelTodoConfirm: handleDelTodoConfirmClick,
  });
  uiController.removeTodoItem(delTodoID);
}

function handleViewTodoClick(e) {
  console.log("Handle View Todo CLick: " + e.target.dataset.id);
  const todoID = e.target.dataset.id;
  const viewTodo = newTodoList.getTodoInfo(todoID);
  const projectTitle = newTodoList.getProjectTitle(viewTodo.projectId);
  uiController.displayViewTodoPopup(viewTodo, projectTitle, {
    todoCompleteClick: handleTodoCompleteClick,
    todoEditClick: handleTodoEditClick,
  });
}

function handleNavProjectClick(e) {
  const projectID = e.target.dataset.id;
  const projectTitle = newTodoList.getProjectTitle(projectID);
  const todos = newTodoList.getProjectTodos(projectID);
  const completedTodos = todos.filter((todo) => todo.status === "completed");
  console.log("completed todos: " + completedTodos);
  const incompleteTodos = todos.filter((todo) => todo.status === "incomplete");
  const handlers = {
    projectEditClick: handleProjectEditClick,
    projectDelClick: handleProjectDelClick,
    addTodoClick: handleAddTodoClick,
    todoCompleteClick: handleTodoCompleteClick,
    todoEditClick: handleTodoEditClick,
    todoDelClick: handleTodoDelClick,
    viewTodoClick: handleViewTodoClick,
  };
  uiController.displayProjectPage(
    projectID,
    projectTitle,
    handlers,
    incompleteTodos,
    completedTodos
  );
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
    viewTodoClick: handleViewTodoClick,
  };
  uiController.displayProjectPage(projectID, title, handlers, todos, []);
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
    viewTodoClick: handleViewTodoClick,
  };
  const defaultProjectID = newTodoList.getDefaultId();
  const defaultProjectTitle = newTodoList.getProjectTitle(defaultProjectID);
  const defaultTodos = newTodoList.getProjectTodos(defaultProjectID);
  const completedTodos = defaultTodos.filter(
    (todo) => todo.status === "completed"
  );
  console.log("completed todos: " + completedTodos);
  const incompleteTodos = defaultTodos.filter(
    (todo) => todo.status === "incomplete"
  );
  uiController.displayProjectPage(
    defaultProjectID,
    defaultProjectTitle,
    handlers,
    incompleteTodos,
    completedTodos
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
