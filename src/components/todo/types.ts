export interface Todo {
  id: number;
  description: string;
  isDone: boolean;
  targetDate: string; // ensure this is Date parseable
}
