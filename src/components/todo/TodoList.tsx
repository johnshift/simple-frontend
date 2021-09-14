import React from 'react';

// ui
import {
  Flex, Center, IconButton, Icon,
  Table, Thead, Tbody, Tr, Th, Td,
} from '@chakra-ui/react';
import { FaEdit, FaTimes } from 'react-icons/fa';

// types
import { Todo } from './types';

// state
import { useStore } from '../../store';

const TodoList = (): JSX.Element => {
  const { todoList } = useStore();

  return (

    <Flex align="center" justify="center" h="100vh">
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
    </Flex>
  );
};

export default TodoList;
