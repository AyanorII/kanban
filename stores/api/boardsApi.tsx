import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { Board } from "../../lib/types";

export const boardsApi = createApi({
  reducerPath: "boardsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/boards",
  }),
  endpoints: (builder) => ({
    boards: builder.query({
      query: () => "",
      transformResponse: (response: Board[]) => response,
    }),
  }),
});

export const { useBoardsQuery } = boardsApi;
