import React from 'react';

// ui
import {
  Center, Flex, Heading,
  Spinner, Table, Tbody, Td, Th,
  Thead, Tr, useToast,
} from '@chakra-ui/react';

import { useQuery } from 'react-query';

import { Todo } from './types';
import { useStore } from '../../store';
import { apiGetAllTodo } from './api';

import { DeleteBtn } from './DeleteBtn';
import { UpdateBtn } from './UpdateBtn';

const TodoList = (): JSX.Element => {
  const { todoList, setTodoList } = useStore();

  const toast = useToast();

  const username = 'johnshift';

  const { status } = useQuery<Todo[], Error>(
    ['allTodoList', username],
    () => apiGetAllTodo(username),
    {
      enabled: !!username, // only run when username is available,
      retry: 2,
      retryDelay: 800,
      onSuccess: (data) => {
        setTodoList(data);
      },
      onError: () => {
        toast({
          title: 'Failed to fetch todo list',
          status: 'error',
          duration: 2000,
        });
      },
    },
  );

  return (
    <Flex align="center" justify="center" h="100vh">
      {status === 'loading' && <Spinner size="xl" thickness="3px" speed="0.4s" color="red.500" />}
      {status === 'error' && <Heading size="3xl">Something went wrong :(</Heading>}
      {status === 'success'
        && (
          <Center>
            <Table>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Description</Th>
                  <Th>Done</Th>
                  <Th>Target Date</Th>
                  <Th />
                </Tr>
              </Thead>
              <Tbody>
                {todoList.map((todo: Todo): JSX.Element => (
                  <Tr key={todo.id}>
                    <Td>{todo.id}</Td>
                    <Td>{todo.description}</Td>
                    <Td>{todo.isDone.toString()}</Td>
                    <Td>{todo.targetDate}</Td>
                    <Td>

                      <UpdateBtn todo={todo} />

                      <DeleteBtn todoID={todo.id} />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Center>
        )}
    </Flex>
  );
};

export default TodoList;
