import { WithId, Document, ObjectId } from "mongodb";

export interface Board extends WithId<Document> {
  _id: ObjectId;
  name: string;
  columns: Column[];
}

export interface Column {
  name: string;
  tasks: Task[];
}

export interface Task {
  title: string;
  description: string;
  status: Status;
  subtasks: Subtask[];
}

export enum Status {
  Doing = "Doing",
  Done = "Done",
  Empty = "",
  Todo = "Todo",
}

export interface Subtask {
  title: string;
  isCompleted: boolean;
}
