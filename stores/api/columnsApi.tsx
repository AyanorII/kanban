import { Board, Column } from "../../lib/types";
import { apiSlice } from "../apiSlice";

const columnsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    columns: builder.query<Column[], Board>({
      query: (board: Board) => `/boards/${board.id}/columns`,
    }),
  }),
  overrideExisting: false,
});

export const { useColumnsQuery } = columnsApi;
