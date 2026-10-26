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
        this.sortTodos(); 
        this.saveToLocalStorage();
        return true;
    };

    markTodoCompleted(todoIndex: number): void {

        let task = this.todos[todoIndex];

        if (!task) return;

        task.completed = !task.completed;

        if (task.completed === true) {
            task.completedAt = new Date().toISOString();
        } else {
            delete task.completedAt;
        }

        this.sortTodos(); 
        this.saveToLocalStorage();

    };

    getTodos(): Todo[] {
        return this.todos;
    }

    sortTodos(): void {
        this.todos.sort((a, b) => {

            const completedComparison = Number(a.completed) - Number(b.completed);

            if (completedComparison !== 0) {
                return completedComparison;
            }

            return a.priority - b.priority;
        })
    }

    deleteTodo(todoIndex: number): void {

        this.todos.splice(todoIndex, 1);
        this.saveToLocalStorage();
    }

    saveToLocalStorage(): void {
        localStorage.setItem("todos", JSON.stringify(this.todos));
    };

    loadFromLocalStorage(): void {

        const storedTodos: string | null = localStorage.getItem("todos");

        if (storedTodos !== null) {
            this.todos = JSON.parse(storedTodos) as Todo[];
            this.sortTodos();
        }
    };
}