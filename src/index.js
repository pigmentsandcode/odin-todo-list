import "./styles.css";
import { TodoList } from "./TodoList";
import { UIController } from "./UIController";

const newTodoList = new TodoList();
const uiController = new UIController();

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
  console.log("target: " + e.target);
  const projectTitle = newTodoList.getProjectTitle(projectID);
  const todos = newTodoList.getProjectTodos(projectID);
  const handlers = {
    todoCompleteClick: handleTodoCompleteClick,
    todoEditClick: handleTodoEditClick,
    todoDelClick: handleTodoDelClick,
  };
  uiController.displayProjectPage(projectID, projectTitle, handlers, todos);
}

function handleProjectFormSubmit(e) {
  e.preventDefault();
  const data = new FormData(e.target);
  newTodoList.createProject(data.get("mainTitle"));
  uiController.closePopup("project", handleProjectFormSubmit);
  uiController.populateSidebar(
    newTodoList.getProjects(),
    handleNavProjectClick
  );
}

function handleAddProjectClick(e) {
  uiController.displayAddProjectPopup(handleProjectFormSubmit);
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
  const handlers = {
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

onLoad();
