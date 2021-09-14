import { Todo } from './types';

export const apiGetAllTodo = async (username: string): Promise<Todo[]> => {
  const res = await (await fetch(`http://localhost:8080/users/${username}/todos`)).json();
  return res;
};

export const apiDeleteTodo = async (username: string, id: number): Promise<void> => {
  (await fetch(
    `http://localhost:8080/users/${username}/todos/${id}`,
    {
      method: 'DELETE',
    },
  ));
};

export const apiPutTodo = async (todo: Todo): Promise<Todo> => {
  const res = await (await fetch(
    `http://localhost:8080/users/${todo.username}/todos/${todo.id}`,
    {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(todo),
    },
  )).json();

  return res;
};
