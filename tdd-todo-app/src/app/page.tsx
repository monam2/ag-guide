"use client";

import { useState, useEffect } from "react";
import {
  addTodo,
  getTodos,
  toggleTodo,
  deleteTodo,
  updateTodo,
} from "@/lib/todo";
import { Todo } from "@/types/todo";
import { TodoInput } from "@/components/todo-input";
import { TodoList } from "@/components/todo-list";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    setTodos(getTodos());
  }, []);

  const handleAdd = (title: string) => {
    try {
      addTodo(title);
      setTodos(getTodos());
    } catch (error) {
      alert(error instanceof Error ? error.message : "An error occurred");
    }
  };

  const handleToggle = (id: string) => {
    try {
      toggleTodo(id);
      setTodos(getTodos());
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (id: string) => {
    try {
      deleteTodo(id);
      setTodos(getTodos());
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = (id: string, newTitle: string) => {
    try {
      updateTodo(id, newTitle);
      setTodos(getTodos());
    } catch (error) {
      alert(error instanceof Error ? error.message : "An error occurred");
    }
  };

  if (!mounted) {
    return null; // Prevent hydration mismatch if initial render differs
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-8 bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 mt-10">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
          TDD 할 일 목록
        </h1>
        <div className="mb-6">
          <TodoInput onAdd={handleAdd} />
        </div>
        <TodoList
          todos={todos}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      </div>
    </main>
  );
}
