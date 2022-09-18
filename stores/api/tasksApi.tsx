import { Column, Task, TaskPayload } from "../../lib/types";
import { apiSlice } from "../apiSlice";

const tasksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    tasks: builder.query<Task[], Column>({
      query: (column: Column) => `/columns/${column.id}/tasks`,
      providesTags: ["Tasks"],
    }),
    updateTask: builder.mutation<Task, any>({
      query: (task) => {
        const { id } = task;

        return {
          url: `/tasks/${id}`,
          method: "PATCH",
          body: task,
        };
      },
      invalidatesTags: ["Boards", "Columns", "Tasks", "Subtasks"],
    }),
    createTask: builder.mutation<Task, TaskPayload>({
      query: (task) => {
        const payload = {
          ...task,
        };

        return {
          url: "/tasks",
          method: "POST",
          body: task,
        };
      },
      invalidatesTags: ["Boards", "Columns", "Tasks", "Subtasks"],
    }),
    deleteTask: builder.mutation<Task, any>({
      query: (task) => {
        const { id } = task;

        return {
          url: `/tasks/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Columns", "Tasks"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useTasksQuery,
  useUpdateTaskMutation,
  useCreateTaskMutation,
  useDeleteTaskMutation,
} = tasksApi;
