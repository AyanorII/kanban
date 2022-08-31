export interface Board {
  id: number;
  name: string;
  columns?: Column[];
}

export interface Column {
  id: number;
  name: string;
  boardId: number;
  tasks?: Task[];
}

export interface Task {
  id: number;
  title: string;
  description: string;
  subtasks?: Subtask[];
  status: Status;
  columnId: number
}

export enum Status {
  Doing = "Doing",
  Done = "Done",
  Todo = "Todo",
}

export interface Subtask {
  id: number;
  title: string;
  completed: boolean;
  taskId: number;
}
