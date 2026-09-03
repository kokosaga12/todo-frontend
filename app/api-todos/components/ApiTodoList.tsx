'use client';

import React, { useState } from 'react';

import { TaskItem } from '@/types/api-todo';
import { todoService } from '@/services/todoService';

interface ApiTodoListProps {
  initialTasks: TaskItem[];
}

export default function ApiTodoList({
  initialTasks,
}: ApiTodoListProps) {
  const [tasks, setTasks] =
    useState<TaskItem[]>(initialTasks);

  const handleToggleTask = async (
    id: number,
    currentCompleted: boolean
  ) => {
    const targetStatus = !currentCompleted;

    // Optimistic Update
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: targetStatus,
            }
          : task
      )
    );

    try {
      // Simulasi update ke DummyJSON API
      await todoService.updateTodo(
        id,
        targetStatus
      );
    } catch (error) {
      console.warn(
        'Simulasi update ke API gagal.',
        error
      );
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-10">
      <div className="mx-auto max-w-3xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            API Todo List
          </h1>

          <p className="mt-2 text-slate-600">
            Data tugas dari DummyJSON API
          </p>
        </header>

        {tasks.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
            <p className="text-slate-500">
              Belum ada tugas.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() =>
                    handleToggleTask(
                      task.id,
                      task.completed
                    )
                  }
                  className="h-5 w-5"
                />

                <div className="flex-1">
                  <p
                    className={
                      task.completed
                        ? 'text-slate-400 line-through'
                        : 'text-slate-800'
                    }
                  >
                    {task.title}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    ID: {task.id} · User: {task.userId}
                  </p>
                </div>

                <span
                  className={
                    task.completed
                      ? 'rounded-full bg-green-100 px-3 py-1 text-xs text-green-700'
                      : 'rounded-full bg-yellow-100 px-3 py-1 text-xs text-yellow-700'
                  }
                >
                  {task.completed
                    ? 'Selesai'
                    : 'Pending'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}