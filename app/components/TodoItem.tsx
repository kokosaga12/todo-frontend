'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/app/components/ui/button';
import { Todo } from '@/types/todo';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete?: (id: number) => void;
};

export default function TodoItem({
  todo,
  onToggle,
  onDelete,
}: TodoItemProps) {
  return (
    <div
      className={`p-4 rounded-xl border flex items-center justify-between gap-3 ${
        todo.completed
          ? 'bg-success-10/20 border-success-20'
          : 'bg-white border-gray-100'
      }`}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <input
          id={`todo-${todo.id}`}
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="w-5 h-5 cursor-pointer"
        />

        <label
          htmlFor={`todo-${todo.id}`}
          className={`text-base font-medium truncate cursor-pointer ${
            todo.completed
              ? 'line-through text-gray-80'
              : 'text-dark-70'
          }`}
        >
          {todo.title}
        </label>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <Link
          href={`/task/${todo.id}`}
          className="text-xs font-semibold px-2.5 py-1.5 rounded-md bg-primary-10 text-primary-90"
        >
          Detail →
        </Link>

        {onDelete && (
          <Button
            type="button"
            onClick={() => onDelete(todo.id)}
            variant="destructive"
            size="xs"
          >
            Hapus
          </Button>
        )}
      </div>
    </div>
  );
}