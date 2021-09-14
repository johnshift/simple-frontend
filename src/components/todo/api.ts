import { Todo } from './types';

export const apiGetAllTodo = async (username: string): Promise<Todo[]> => {
  const res = await (await fetch(`http://localhost:8080/users/${username}/todos`)).json();
  return res;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const apiDeleteTodo = async (username: string, id: number): Promise<void> => {
  (await fetch(
    `http://localhost:8080/users/${username}/todos/${id}`,
    { method: 'DELETE' },
  ));
};
