import { Subtask, Task } from "../../lib/types";
import { apiSlice } from "../apiSlice";
import { toast } from 'react-toastify';
import { TOAST_OPTIONS } from '../../constants';

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
      transformResponse: async (
        response: Subtask | Promise<Subtask>,
        meta,
        _args
      ) => {
        if (meta?.response?.status === 200) {
          const { title } = await response;
          toast.success(`Updated subtask '${title}'`, TOAST_OPTIONS);
        }

        return response;
      },
      invalidatesTags: ["Tasks", "Subtasks"],
    }),

    updateSubtaskCompleted: builder.mutation<Subtask, Subtask>({
      query: (subtask) => ({
        url: `/subtasks/${subtask.id}/completed`,
        method: "PATCH",
        body: subtask,
      }),
      transformResponse: async (
        response: Subtask | Promise<Subtask>,
        meta,
        _args
      ) => {
        if (meta?.response?.status === 200) {
          const { title } = await response;
          toast.success(`Updated subtask '${title}' status`, TOAST_OPTIONS);
        }

        return response;
      },
      invalidatesTags: ["Columns", "Tasks", "Subtasks"],
    }),

    deleteSubtask: builder.mutation<void, Subtask | number>({
      query: (subtask) => ({
        url: `/subtasks/${typeof subtask === "number" ? subtask : subtask.id}`,
        method: "DELETE",
      }),
      transformResponse: async (
        response: void | Promise<void>,
        meta,
        _args
      ) => {
        if (meta?.response?.status === 204) {
          toast.success(`Deleted subtask`, TOAST_OPTIONS);
        }

        return response;
      },
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
