import { Subtask, Task } from "../../lib/types";
import { apiSlice } from "../apiSlice";

export const subtasksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    subtasks: builder.query<Subtask[], Task>({
      query: (task: Task) => `/tasks/${task.id}/subtasks`,
      providesTags: ["Subtasks"],
    }),
    updateSubtask: builder.mutation<Subtask, Subtask>({
      query: (subtask) => ({
        url: `/subtasks/${subtask.id}`,
        method: "PATCH",
        body: subtask,
      }),
      invalidatesTags: ["Tasks", "Subtasks"],
    }),
    updateSubtaskCompleted: builder.mutation<Subtask, Subtask>({
      query: (subtask) => ({
        url: `/subtasks/${subtask.id}/completed`,
        method: "PATCH",
        body: subtask,
      }),
      invalidatesTags: ["Columns", "Tasks", "Subtasks" ]
    }),
    deleteSubtask: builder.mutation<void, Subtask | number>({
      query: (subtask) => ({
        url: `/subtasks/${typeof subtask === "number" ? subtask : subtask.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tasks", "Subtasks"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useSubtasksQuery,
  useUpdateSubtaskMutation,
  useDeleteSubtaskMutation,
  useUpdateSubtaskCompletedMutation,
} = subtasksApi;
