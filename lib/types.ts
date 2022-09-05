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
  status: string;
  column_id: number;
}

export interface Subtask {
  id: number;
  title: string;
  completed: boolean;
  task: Task;
}

export type ModalType = {
  open: boolean;
  onClose: () => void;
};
