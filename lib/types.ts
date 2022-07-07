export interface Board {
  id: number;
  name: string;
  columns: Column[];
}

export interface Column {
  id: number;
  name: string;
  tasks: Task[];
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: Status;
}

export enum Status {
  Doing = "Doing",
  Done = "Done",
  Empty = "",
  Todo = "Todo",
}

export interface Subtask {
  id: number;
  title: string;
  completed: boolean;
}

export type Theme = "light" | "dark";
