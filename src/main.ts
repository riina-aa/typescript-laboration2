import "./scss/main.scss";
import type { Todo } from "./ts/interfaces/Todo";
import { TodoList } from "./ts/classes/TodoList";

document.addEventListener("DOMContentLoaded", () => {
  init(); 
}); 

function init() {

  const form = document.querySelector<HTMLFormElement>("#form"); 

  if ( form !== null ) {
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

  const todoList = new TodoList(); 
  const priority = Number(priorityNumber.value); 

  todoList.addTodo(task.value, priority, dueDate.value); 

}

