import React from 'react';

// ui
import {
  Flex, Center, IconButton, Icon,
  Table, Thead, Tbody, Tr, Th, Td,
  Heading, useToast, Spinner,
} from '@chakra-ui/react';
import { FaEdit, FaTimes } from 'react-icons/fa';

import { useQuery } from 'react-query';
import { Todo } from './types';
import { useStore } from '../../store';

import { fetchTodoList } from './api';

const TodoList = (): JSX.Element => {
  const { todoList, setTodoList } = useStore();

  const toast = useToast();

  const username = 'johnshift';

  const { status } = useQuery<Todo[], Error>(
    ['allTodoList', username],
    () => fetchTodoList(username),
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
      { status === 'loading' && <Spinner size="xl" thickness="3px" speed="0.4s" color="red.500" />}
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

                  <IconButton
                    aria-label="update-todo"
                    size="xs"
                    colorScheme="green"
                    variant="solid"
                    isRound
                    icon={<Icon as={FaEdit} />}
                    mr={5}
                  />

                  <IconButton
                    aria-label="delete-todo"
                    size="xs"
                    colorScheme="red"
                    variant="solid"
                    isRound
                    icon={<Icon as={FaTimes} />}
                  />
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
