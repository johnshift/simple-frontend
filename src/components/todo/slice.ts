import { SetState } from 'zustand';
import { Todo } from './types';

// state
import { AppState } from '../../store';

export interface TodoSlice {
  todoList: Todo[];
  currentId: number;
  setTodoList: (todolist: Todo[]) => void;
  addTodo: (todo: Todo) => void;
  deleteTodo: (id: number) => void;
  updateTodo: (todo: Todo) => void;
}

export const createTodoSlice = (set: SetState<AppState>): TodoSlice => ({

  // hardcoded init state
  todoList: [
    {
      id: 0, description: 'desc 0', isDone: false, targetDate: (new Date()).toISOString(),
    },
    {
      id: 1, description: 'desc 1', isDone: false, targetDate: (new Date()).toISOString(),
    },
    {
      id: 2, description: 'desc 2', isDone: false, targetDate: (new Date()).toISOString(),
    },
    {
      id: 3, description: 'desc 3', isDone: false, targetDate: (new Date()).toISOString(),
    },
  ],
  currentId: 0,

  // todoList: [],
  // currentId: 0,
  setTodoList: (todoList) => {
    set(() => ({ todoList }));
  },
  addTodo: (todo) => {
    set((state) => ({
      currentId: state.currentId + 1,
      todoList: [
        ...state.todoList,
        {
          ...todo,
          id: state.currentId + 1,
        },
      ],
    }));
  },
  deleteTodo: (id) => {
    set((state) => ({
      todoList: state.todoList.filter((todo) => todo.id !== id),
    }));
  },
  updateTodo: (todo) => {
    set((state) => ({
      todoList: state.todoList.map((t) => {
        if (t.id === todo.id) {
          return todo;
        }
        return t;
      }),
    }));
  },
});
