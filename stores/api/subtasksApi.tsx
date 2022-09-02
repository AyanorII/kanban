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
      invalidatesTags: ["Subtasks"],
    }),
  }),
  overrideExisting: false,
});

export const { useSubtasksQuery, useUpdateSubtaskMutation } = subtasksApi;
