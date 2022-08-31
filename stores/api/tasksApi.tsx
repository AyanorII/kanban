import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { Column, Task } from "../../lib/types";

export const tasksApi = createApi({
  reducerPath: "tasksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/columns",
  }),
  endpoints: (builder) => ({
    tasks: builder.query({
      query: (columnId: number) => `/${columnId}`,
      transformResponse: (response: Column): Task[] => response.tasks!,
    }),
  }),
});

export const { useTasksQuery } = tasksApi;
