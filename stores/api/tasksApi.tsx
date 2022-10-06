import { toast } from "react-toastify";
import { TOAST_OPTIONS } from "../../constants";
import { Column, Task, TaskPayload } from "../../lib/types";
import { apiSlice } from "../apiSlice";

const tasksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    tasks: builder.query<Task[], Column>({
      query: (column: Column) => `/columns/${column.id}/tasks`,
      providesTags: ["Tasks"],
    }),

    updateTask: builder.mutation<Task, TaskPayload>({
      query: (task) => {
        const { id } = task;

        return {
          url: `/tasks/${id}`,
          method: "PATCH",
          body: task,
        };
      },
      transformResponse: async (
        response: Task | Promise<Task>,
        meta,
        _args
      ) => {
        if (meta?.response?.status === 200) {
          const { title } = await response;
          toast.success(`Updated task '${title}'`, TOAST_OPTIONS);
        }

        return response;
      },
      invalidatesTags: ["Boards", "Columns", "Tasks", "Subtasks"],
    }),

    updateTaskStatus: builder.mutation<Task, Task>({
      query: (task) => {
        const { id } = task;

        return {
          url: `/tasks/${id}/status`,
          method: "PATCH",
          body: task,
        };
      },
      transformResponse: async (
        response: Task | Promise<Task>,
        meta,
        _args
      ) => {
        if (meta?.response?.status === 200) {
          const { title } = await response;
          toast.success(`Updated status of task '${title}'`, TOAST_OPTIONS);
        }

        return response;
      },
      invalidatesTags: ["Boards", "Columns", "Tasks"],
    }),

    createTask: builder.mutation<Task, TaskPayload>({
      query: (task) => {
        let { subtasks, ...rest } = task;
        subtasks = subtasks?.filter((subtask) => subtask.title !== "");

        return { url: "/tasks", method: "POST", body: { ...rest, subtasks } };
      },
      transformResponse: async (
        response: Task | Promise<Task>,
        meta,
        _args
      ) => {
        if (meta?.response?.status === 201) {
          const { title } = await response;
          toast.success(`Created task '${title}'`, TOAST_OPTIONS);
        }

        return response;
      },
      invalidatesTags: ["Boards", "Columns", "Tasks", "Subtasks"],
    }),

    deleteTask: builder.mutation<void, Task>({
      query: (task) => {
        const { id } = task;

        return {
          url: `/tasks/${id}`,
          method: "DELETE",
        };
      },
      transformResponse: (response: void | Promise<void>, meta, _args) => {
        if (meta?.response?.status === 204) {
          toast.success(`Deleted task`, TOAST_OPTIONS);
        }

        return response;
      },
      invalidatesTags: ["Columns", "Tasks"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useTasksQuery,
  useUpdateTaskMutation,
  useUpdateTaskStatusMutation,
  useCreateTaskMutation,
  useDeleteTaskMutation,
} = tasksApi;
