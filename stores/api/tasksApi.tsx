import { AddTaskPayload } from "../../components/Tasks/AddTaskButton";
import { Column, Task } from "../../lib/types";
import { apiSlice } from "../apiSlice";

const tasksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    tasks: builder.query<Task[], Column>({
      query: (column: Column) => `/columns/${column.id}/tasks`,
      providesTags: ["Tasks"],
    }),
    updateTask: builder.mutation<Task, Task>({
      query: (task) => {
        const { id, title, description, column_id, status } = task;

        return {
          url: `/tasks/${id}`,
          method: "PATCH",
          body: { title, description, column_id, status },
        };
      },
      invalidatesTags: ["Boards", "Columns", "Tasks", "Subtasks"],
    }),
    createTask: builder.mutation<Task, AddTaskPayload>({
      query: (task) => {
        const subtasks = task.subtasks.map((subtask) => ({ title: subtask }));

        const payload = {
          ...task,
          subtasks,
        };

        return {
          url: "/tasks",
          method: "POST",
          body: { task: payload },
        };
      },
      invalidatesTags: ["Boards", "Columns", "Tasks", "Subtasks"],
    }),
  }),
  overrideExisting: false,
});

export const { useTasksQuery, useUpdateTaskMutation, useCreateTaskMutation } =
  tasksApi;
