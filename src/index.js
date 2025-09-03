import "./styles.css";
import { TodoList } from "./TodoList";
import { UIController } from "./UIController";

const newTodoList = new TodoList();
const uiController = new UIController();
let currentPageID = "";

function handleProjectEditClick(e) {
  const projectID = e.target.dataset.id;
  const currTitle = newTodoList.getProjectTitle(projectID);
  uiController.displayFormPopup(handleProjectFormSubmit, "edit", "project", {
    projectID: projectID,
    currTitle: currTitle,
  });
}

function handleProjectDelClick(e) {
  const projectID = e.target.dataset.id;
  uiController.displayConfirmPopup(
    projectID,
    {
      handleConfirm: handleDelProjConfirmClick,
    },
    "deleteProject"
  );
}

function handleDelProjConfirmClick(e) {
  newTodoList.deleteProject(e.target.dataset.id);
  loadDefaultProjectPage();
  uiController.closeConfirmPopup("confirm", {
    handleConfirm: handleDelProjConfirmClick,
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
  uiController.displayFormPopup(handleTodoFormSubmit, "add", "todo", {
    currProject: e.target.dataset.project,
    projectTitles: projectsList,
  });
}

function handleTodoCompleteClick(e) {
  console.log("Handle Todo Complete Click for: " + e.target.dataset.id);
  const todoID = e.target.dataset.id;
  const updatedTodo = newTodoList.editTodoStatus(todoID);
  const projectID = newTodoList.getTodoInfo(todoID).projectId;
  console.log("Project ID: " + projectID);
  uiController.updateTodoStatus(updatedTodo, projectID, {
    delCompletedClick: handleDelCompletedClick,
  });
}

function handleTodoEditClick(e) {
  console.log("Handle Todo Edit Click for: " + e.target.dataset.id);
  const todoID = e.target.dataset.id;
  const currTodo = newTodoList.getTodoInfo(todoID);
  const projectsList = newTodoList.getProjectTitles();
  uiController.displayFormPopup(handleTodoFormSubmit, "edit", "todo", {
    todoID: todoID,
    currTodo: currTodo,
    currProject: e.target.dataset.project,
    projectTitles: projectsList,
  });
}

function handleTodoDelClick(e) {
  console.log("Handle Todo Delete Click for: " + e.target.dataset.id);
  const todoID = e.target.dataset.id;
  uiController.displayConfirmPopup(
    todoID,
    {
      handleConfirm: handleDelTodoConfirmClick,
    },
    "deleteTodo"
  );
}

function handleDelTodoConfirmClick(e) {
  const delTodoID = e.target.dataset.id;
  newTodoList.deleteTodo(delTodoID);
  uiController.closeConfirmPopup("confirm", {
    handleConfirm: handleDelTodoConfirmClick,
  });
  uiController.removeTodoItem(delTodoID, handleDelCompletedClick);
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
    clearProjTodosClick: handleClearProjTodosClick,
    delCompletedClick: handleDelCompletedClick,
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
    clearProjTodosClick: handleClearProjTodosClick,
    delCompletedClick: handleDelCompletedClick,
  };
  uiController.displayProjectPage(projectID, title, handlers, todos, []);
}

function handleAddProjectClick(e) {
  uiController.displayFormPopup(handleProjectFormSubmit, "add", "project");
}

function handleClearTodosConfirmClick(e) {
  const projectID = e.target.dataset.id;
  console.log("projectID clear: " + projectID);
  newTodoList.clearProjectTodos(projectID);

  uiController.closeConfirmPopup("confirm", {
    handleConfirm: handleClearTodosConfirmClick,
  });
  uiController.clearProjectTodoItems(handleDelCompletedClick);
}

function handleClearProjTodosClick(e) {
  console.log("handle clear project todos click: " + e.target.dataset.project);
  uiController.displayConfirmPopup(
    e.target.dataset.project,
    {
      handleConfirm: handleClearTodosConfirmClick,
    },
    "clearProjectTodos"
  );
}

function handleDelCompleteConfirmClick(e) {
  const projectID = e.target.dataset.id;
  newTodoList.deleteCompleteTodos(projectID);
  uiController.closeConfirmPopup("confirm", {
    handleConfirm: handleDelCompleteConfirmClick,
  });
  uiController.removeCompletedTodos();
}

function handleDelCompletedClick(e) {
  const projectID = e.target.dataset.id;
  uiController.displayConfirmPopup(
    projectID,
    {
      handleConfirm: handleDelCompleteConfirmClick,
    },
    "deleteCompleted"
  );
}

function loadDefaultProjectPage() {
  const handlers = {
    addTodoClick: handleAddTodoClick,
    todoCompleteClick: handleTodoCompleteClick,
    todoEditClick: handleTodoEditClick,
    todoDelClick: handleTodoDelClick,
    viewTodoClick: handleViewTodoClick,
    delCompletedClick: handleDelCompletedClick,
  };
  const defaultProjectID = newTodoList.getDefaultId();
  const defaultProjectTitle = newTodoList.getProjectTitle(defaultProjectID);
  const defaultTodos = newTodoList.getProjectTodos(defaultProjectID);
  const completedTodos = defaultTodos.filter(
    (todo) => todo.status === "completed"
  );
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
