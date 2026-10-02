import "./scss/main.scss";
import type { Todo } from "./ts/interfaces/Todo";
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

  todoList.addTodo(task.value, priority, dueDate.value);

};

function renderTodoList() {

  const list = document.querySelector<HTMLElement>("#task-list");

  if (list !== null) {

    list.innerHTML = "";

    const todos = todoList.getTodos();

    todos.forEach(task => {

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

      list.innerHTML += `
        <div class="task ${priorityClass}">
          <div class="priority">
            <p>${priorityText}</p>
          </div>
          <div class="task-actions">
            <div class="title">
              <input type="checkbox" name="completed" class="checkbox">
              <h2>${task.task}</h2>
            </div>
            <span class="material-symbols-outlined">delete</span>
          </div>
          <div class="dueDate">
            <p>Duedate: ${task.dueDate}</p>
          </div>
        </div>
      `




    })
  }
}

