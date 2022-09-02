import { Column, Task } from "../../lib/types";
import { apiSlice } from "../apiSlice";

const tasksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    tasks: builder.query<Task[], Column>({
      query: (column: Column) => `/columns/${column.id}/tasks`,
      providesTags: ["Tasks"],
    }),
  }),
  overrideExisting: false,
});

export const { useTasksQuery } = tasksApi;
