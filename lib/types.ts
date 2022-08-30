export interface Board {
  id: number;
  name: string;
}

export interface Column {
  id: number;
  name: string;
  boardId: number;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: Status;
  columnId: number
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
  isCompleted: boolean;
  taskId: number;
}
