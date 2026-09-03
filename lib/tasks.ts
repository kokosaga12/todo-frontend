import {
  todoService,
  FetchTodosParams,
} from '@/services/todoService';

import {
  ApiTodo,
  TaskItem,
} from '@/types/api-todo';


// Data Adapter
export function mapTodoToTaskItem(
  apiTodo: ApiTodo
): TaskItem {
  return {
    id: apiTodo.id,
    title: apiTodo.todo,
    completed: apiTodo.completed,
    userId: apiTodo.userId,
    source: 'dummyjson-api',
  };
}


// Ambil dan Format Daftar Tugas
export async function getTasks(
  params: FetchTodosParams = {
    limit: 15,
    skip: 0,
  }
): Promise<{
  tasks: TaskItem[];
  total: number;
  limit: number;
  skip: number;
}> {
  try {
    const response =
      await todoService.fetchTodos(params);

    const tasks =
      response.todos.map(mapTodoToTaskItem);

    return {
      tasks,
      total: response.total,
      limit: response.limit,
      skip: response.skip,
    };
  } catch (error) {
    console.error(
      '[lib/tasks.ts] Error mengambil tasks dari API:',
      error
    );

    throw error;
  }
}


// Ambil dan Format Satu Tugas Spesifik
export async function getTaskById(
  id: number | string
): Promise<TaskItem | null> {
  try {
    const apiTodo =
      await todoService.fetchTodoById(id);

    return mapTodoToTaskItem(apiTodo);
  } catch (error) {
    console.error(
      `[lib/tasks.ts] Error mengambil task dengan ID ${id}:`,
      error
    );

    throw error;
  }
}


// Statistik Data
export function getTaskStats(
  tasks: TaskItem[]
) {
  const total = tasks.length;

  const completed =
    tasks.filter(
      (task) => task.completed
    ).length;

  const pending =
    total - completed;

  const completionPercentage =
    total > 0
      ? Math.round(
          (completed / total) * 100
        )
      : 0;

  return {
    total,
    completed,
    pending,
    completionPercentage,
  };
}