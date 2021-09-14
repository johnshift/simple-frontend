import React from 'react';

import {
  Center, Heading, Button, IconButton, Icon,
  AlertDialog, AlertDialogOverlay, AlertDialogContent,
  AlertDialogHeader, AlertDialogCloseButton, AlertDialogBody, AlertDialogFooter,
  useDisclosure,
} from '@chakra-ui/react';

import { FaTimes } from 'react-icons/fa';

import { useMutation } from 'react-query';
import { useStore } from '../../store';

import { apiDeleteTodo } from './api';

export const DeleteBtn = ({ todoID }: { todoID: number }): JSX.Element => {
  const cancelRef = React.useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { deleteTodo } = useStore();

  const { mutate } = useMutation<void, Error, {username: string, id: number}>(
    ({ username, id }) => apiDeleteTodo(username, id),
    {
      onSuccess: () => {
        onClose();
        deleteTodo(todoID);
      },
    },
  );

  return (
    <>
      <IconButton
        aria-label="delete-todo"
        size="xs"
        colorScheme="red"
        variant="solid"
        isRound
        icon={<Icon as={FaTimes} />}
        onClick={() => {
          onOpen();
        }}
      />
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Delete Todo</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <Center>
              <Heading size="2xl">Are you sure?</Heading>
            </Center>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              colorScheme="red"
              onClick={() => {
                mutate({ username: 'johnshift', id: todoID });
              }}
            >
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
