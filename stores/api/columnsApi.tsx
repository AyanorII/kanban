import { Board, Column } from "../../lib/types";
import { apiSlice } from "../apiSlice";

export type AddColumnPayload = {
  board: Board;
  name: string;
};

const columnsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    boardColumns: builder.query<Column[], Board>({
      query: (board) => `/boards/${board.id}/columns`,
      providesTags: ["Columns"],
    }),
    addColumn: builder.mutation({
      query: ({ board, name }: AddColumnPayload) => ({
        url: "/columns",
        method: "POST",
        body: { column: { board_id: board.id, name } },
      }),
      invalidatesTags: ["Columns"],
    }),
  }),
  overrideExisting: false,
});

export const { useBoardColumnsQuery, useAddColumnMutation } =
  columnsApi;
