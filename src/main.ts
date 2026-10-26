import "./scss/main.scss";
import { TodoList } from "./ts/classes/TodoList";

document.addEventListener("DOMContentLoaded", () => {
  init();
});

const todoList = new TodoList();

function init() {

  renderTodoList();

  const form = document.querySelector<HTMLFormElement>("#form");

  if (form !== null) {
    form.addEventListener("submit", (event: SubmitEvent) => {
      getFormData(event);
      form.reset();
    })
  }

};

function getFormData(event: SubmitEvent) {

  event.preventDefault();

  const task = document.querySelector<HTMLInputElement>("#task");
  const priorityNumber = document.querySelector<HTMLInputElement>('input[name="priority"]:checked');
  const dueDate = document.querySelector<HTMLInputElement>("#duedate");

  if (!task || !priorityNumber || !dueDate) {
    return;
  }

  const priority = Number(priorityNumber.value);

  const addedTodo = todoList.addTodo(task.value, priority, dueDate.value);

  if (addedTodo === true) {
    renderTodoList();
    clearErrorMessages();

    const form = document.querySelector<HTMLFormElement>("#form");
    if (form) {
      form.reset(); 
    }

  } else {
    renderErrorMessages();
  }

};

function renderTodoList() {

  const list = document.querySelector<HTMLElement>("#task-list");

  if (list !== null) {

    list.innerHTML = "";

    const todos = todoList.getTodos();

    todos.forEach((task, index) => {

      let priorityText = "";
      let priorityClass = "";

      switch (task.priority) {

        case 1: {
          priorityText = "High Priority";
          priorityClass = "high";
          break;
        }

        case 2: {
          priorityText = "Medium Priority";
          priorityClass = "medium";
          break;
        }

        case 3: {
          priorityText = "Low Priority";
          priorityClass = "low";
          break;
        }

        default: {
          priorityText = "High Priority";
          priorityClass = "high";
          break;
        }
      }

      let completedDate = "";

      if (task.completedAt) {
        completedDate = task.completedAt.slice(0, 10);
      }

      list.innerHTML += `
        <div class="task ${priorityClass} ${task.completed ? "completed" : ""}">
          <div class="priority">
            <p>${priorityText}</p>
          </div>
          <div class="task-actions">
            <div class="title">
              <input type="checkbox" name="completed" class="checkbox" data-index="${index}" ${task.completed ? "checked" : ""}>
              <h2>${task.task}</h2>
            </div>
            <button class="delete-btn" data-index="${index}"><span class="material-symbols-outlined">delete</span></button>
          </div>
          <div class="dueDate">
            <p>Duedate: ${task.dueDate}</p>
            <p>${task.completed ? `Completed: ${completedDate}` : ""}</p>
          </div>
        </div>
      `

    })

    addCheckboxListeners();
    addDeleteListeners();

  }
};

function renderErrorMessages() {

  const errorContainer = document.querySelector<HTMLElement>(".error");

  if (errorContainer !== null) {
    errorContainer.textContent = "Något gick fel. Försök igen.";
  }

};

function clearErrorMessages() {

  const errorContainer = document.querySelector<HTMLElement>(".error");

  if (errorContainer !== null) {
    errorContainer.textContent = "";
  }
}

function addCheckboxListeners() {

  const checkboxes = document.querySelectorAll<HTMLInputElement>(".checkbox");

  if (checkboxes !== null) {
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener("change", () => {
        const index = Number(checkbox.dataset.index);
        todoList.markTodoCompleted(index);
        renderTodoList();
      })
    })
  }
}

function addDeleteListeners() {

  const deleteBtns = document.querySelectorAll<HTMLButtonElement>(".delete-btn");

  if (deleteBtns !== null) {
    deleteBtns.forEach(deleteBtn => {
      deleteBtn.addEventListener("click", () => {
        const index = Number(deleteBtn.dataset.index);
        todoList.deleteTodo(index);
        renderTodoList();
      })
    })
  }
}


