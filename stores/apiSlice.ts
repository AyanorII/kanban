import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api/v1" }),
  tagTypes: ["Boards", "Columns", "Tasks", "Subtasks"],
  endpoints: (builder) => ({}),
});
