import create from 'zustand';
import { TodoSlice, createTodoSlice } from './components/todo/slice';

// export type AppState = TodoSlice & etc & etc;
export type AppState = TodoSlice;

export const useStore = create<AppState>((set) => ({
  ...createTodoSlice(set),
}));
