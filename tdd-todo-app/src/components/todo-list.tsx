"use client";

import { Todo } from "@/types/todo";
import { TodoItem } from "./todo-item";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, newTitle: string) => void;
}

export function TodoList({
  todos,
  onToggle,
  onDelete,
  onUpdate,
}: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-4">
        할 일이 없습니다. 새로운 할 일을 추가해보세요!
      </div>
    );
  }

  return (
    <div className="mt-4">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}
