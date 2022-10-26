import {
  facebookAuthProvider,
  githubAuthProvider,
  googleAuthProvider,
} from "./firebase";
export interface Board {
  id: number;
  name: string;
  columns?: Column[];
}

export interface Column {
  id: number;
  name: string;
  boardId: number;
  color: string;
  tasks?: Task[];
}

export interface Task {
  id: number;
  title: string;
  description: string;
  subtasks?: Subtask[];
  status: string;
  columnId: number;
}

export interface Subtask {
  id: number;
  title: string;
  completed: boolean;
  taskId: number;
}

export type ModalType = {
  open: boolean;
  onClose: () => void;
};

export interface TaskPayload {
  id?: number | undefined;
  title: string;
  description: string;
  status: string;
  subtasks?: {
    title: string;
    id: number | undefined;
    taskId: number | undefined;
  }[];
  columnId: Column["id"];
}

export interface ServerError {
  data: {
    statusCode: number;
    message: string;
    error: string;
  };
  status: number;
}

export type AuthAction = "login" | "signup";

export type AccessToken = string | null;

export interface AuthResponse {
  accessToken: AccessToken;
}

export type ResponseData<T> = {
  data: T;
};

export type ProviderName = "google" | "github" | "facebook";

export type AuthProvider =
  | typeof googleAuthProvider
  | typeof githubAuthProvider
  | typeof facebookAuthProvider;

export interface Provider {
  name: ProviderName;
  provider: AuthProvider;
  icon: React.ReactNode;
}

export interface AuthDto {
  email: string;
  password: string;
}
