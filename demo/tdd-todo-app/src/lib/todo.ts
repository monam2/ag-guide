import { Todo } from "@/types/todo";

// In-memory storage
let todos: Todo[] = [];

export function addTodo(title: string): Todo {
  if (!title || title.trim() === "") {
    throw new Error("할 일 제목은 비어있을 수 없습니다.");
  }

  const newTodo: Todo = {
    id: crypto.randomUUID(),
    title: title.trim(),
    completed: false,
    createdAt: new Date(),
  };

  todos.push(newTodo);
  // Return a copy to prevent mutation of internal state if user mutates return value immediately
  return { ...newTodo };
}

export function getTodos(): Todo[] {
  // Return deep copy to prevent mutation
  return todos.map((todo) => ({ ...todo }));
}

export function toggleTodo(id: string): Todo {
  const todo = todos.find((t) => t.id === id);
  if (!todo) {
    throw new Error("해당 ID의 할 일을 찾을 수 없습니다.");
  }
  todo.completed = !todo.completed;
  return { ...todo };
}

export function deleteTodo(id: string): void {
  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) {
    throw new Error("해당 ID의 할 일을 찾을 수 없습니다.");
  }
  todos.splice(index, 1);
}

export function updateTodo(id: string, title: string): Todo {
  if (!title || title.trim() === "") {
    throw new Error("할 일 제목은 비어있을 수 없습니다.");
  }
  const todo = todos.find((t) => t.id === id);
  if (!todo) {
    throw new Error("해당 ID의 할 일을 찾을 수 없습니다.");
  }
  todo.title = title.trim();
  return { ...todo };
}

// Helper for testing
export function __setTodos(newTodos: Todo[]) {
  todos = newTodos;
}
