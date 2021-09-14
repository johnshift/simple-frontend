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
  todoList: [],
  currentId: 0,
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
