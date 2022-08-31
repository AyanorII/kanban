import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { Subtask, Task } from "../../lib/types";

export const subtasksApi = createApi({
  reducerPath: "subtasksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/tasks",
  }),
  endpoints: (builder) => ({
    subtasks: builder.query({
      query: (taskId: number) => `/${taskId}`,
      transformResponse: (response: Task): Subtask[] => response.subtasks!,
    }),
  }),
});

export const { useSubtasksQuery } = subtasksApi;
