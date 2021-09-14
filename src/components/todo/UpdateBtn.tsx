import React, { useState } from 'react';

import {
  Button, IconButton, Icon,
  FormControl, Textarea, FormLabel,
  AlertDialog, AlertDialogOverlay, AlertDialogContent,
  AlertDialogHeader, AlertDialogCloseButton, AlertDialogBody, AlertDialogFooter,
  useDisclosure,
} from '@chakra-ui/react';
import { FaEdit } from 'react-icons/fa';

import { SingleDatepicker } from 'chakra-dayzed-datepicker';

import { useMutation } from 'react-query';
import { useForm } from 'react-hook-form';
import { Todo } from './types';

import { apiPutTodo } from './api';
import { useStore } from '../../store';

type FormData = {
  description: string;
}

export const UpdateBtn = ({ todo }: { todo: Todo }): JSX.Element => {
  const cancelRef = React.useRef(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  // const [description, setDescription] = useState(todo.description);
  const [date, setDate] = useState(new Date());

  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      description: todo.description,
    },
  });

  const { updateTodo } = useStore();
  const { mutate } = useMutation<Todo, Error, Todo>(
    (updatedTodo) => apiPutTodo(updatedTodo),
    {
      onSuccess: (updatedTodo) => {
        onClose();
        updateTodo(updatedTodo);
      },
    },
  );

  return (
    <>
      <IconButton
        aria-label="update-todo"
        size="xs"
        colorScheme="green"
        variant="solid"
        isRound
        icon={<Icon as={FaEdit} />}
        onClick={() => {
          onOpen();
        }}
        mr={5}
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
          <form
            onSubmit={handleSubmit(({ description }) => {
              mutate({
                ...todo,
                description,
                targetDate: date.toISOString(),
              });
            })}
          >
            <AlertDialogBody>
              <FormControl>
                <FormLabel>Description:</FormLabel>
                <Textarea
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...register('description')}
                  size="lg"
                />
              </FormControl>
              <br />
              <FormControl>
                <FormLabel>Target Date:</FormLabel>
                <SingleDatepicker
                  name="date-input"
                  date={date}
                  onDateChange={setDate}
                />
              </FormControl>
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button
                type="submit"
                colorScheme="cyan"
              >
                Update
              </Button>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
