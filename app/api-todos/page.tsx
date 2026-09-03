import ApiTodoList from './components/ApiTodoList';

import { getTasks } from '@/lib/tasks';

export default async function ApiTodosPage() {
  const result = await getTasks({
    limit: 15,
    skip: 0,
  });

  return (
    <ApiTodoList
      initialTasks={result.tasks}
    />
  );
}