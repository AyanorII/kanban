import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { Board, Column } from "../../lib/types";

type ColumnState = {
  columns: Column[];
  loading: boolean;
  error: string | null;
};

export const columnsApi = createApi({
  reducerPath: "columnsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/boards",
  }),
  endpoints: (builder) => ({
    columns: builder.query({
      query: (boardId: number) => `/${boardId}`,
      transformResponse: (response: Board): Column[] => response.columns!,
    }),
  }),
});

export const { useColumnsQuery } = columnsApi;
