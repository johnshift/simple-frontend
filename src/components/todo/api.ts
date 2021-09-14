import { Todo } from './types';

export const fetchTodoList = async (username: string): Promise<Todo[]> => {
  const res = await (await fetch(`http://localhost:8080/users/${username}/todos`)).json();
  return res;
};
