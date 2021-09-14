export interface Todo {
  id: number;
  username: string;
  description: string;
  isDone: boolean;
  targetDate: string; // ensure this is Date parseable
}
