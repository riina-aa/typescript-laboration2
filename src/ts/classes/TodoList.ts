import type { Todo } from "../interfaces/Todo";

export class TodoList {
    todos: Todo[];

    constructor() {
        this.todos = [];
        this.loadFromLocalStorage();
    }

    addTodo(task: string, priority: number, dueDate: string): boolean {

        const date = new Date(dueDate);
        const timestamp = date.getTime();

        if (task.trim() === "" || !Number.isInteger(priority) || priority < 1 || priority > 3 || dueDate.trim() === "" || Number.isNaN(timestamp)) {
            return false;
        }

        const todo: Todo = {
            task: task,
            priority: priority,
            dueDate: dueDate,
            completed: false,
            createdAt: new Date().toISOString()
        }

        this.todos.push(todo);
        this.saveToLocalStorage();
        return true;
    };

    markTodoCompleted(): void {

    };

    saveToLocalStorage(): void {
        localStorage.setItem("todos", JSON.stringify(this.todos));
    };

    loadFromLocalStorage(): void {

        const storedTodos: string | null = localStorage.getItem("todos");

        if (storedTodos !== null) {
            this.todos = JSON.parse(storedTodos) as Todo[];
        }
    };
}