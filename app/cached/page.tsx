import TodoCachedApp from './components/TodoCachedApp';
import { getTodos } from '@/lib/todos';

export default async function CachedTodoPage() {
  // Mengambil data awal dari Server
  const initialTodos = await getTodos();

  return (
    <main className="min-h-screen bg-surface-alt px-5 py-12">
      <div className="mx-auto max-w-3xl">
        <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-lg">
          <header className="mb-7 border-b border-gray-100 pb-5 text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-accent">
              Todo App
            </p>

            <h1 className="mt-2 text-3xl font-bold text-foreground">
              Cached Todo List
            </h1>

            <p className="mt-2 text-sm text-muted">
              Data tugas tersimpan di localStorage.
            </p>
          </header>

          <TodoCachedApp
            initialTodos={initialTodos}
          />
        </div>
      </div>
    </main>
  );
}