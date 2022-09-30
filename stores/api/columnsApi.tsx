import { Board, Column } from "../../lib/types";
import { apiSlice } from "../apiSlice";

export type AddColumnPayload = {
  boardId: number;
  name: string;
};

const columnsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    boardColumns: builder.query<Column[], Board>({
      query: (board) => `/boards/${board.id}/columns`,
      providesTags: ["Columns"],
    }),
    addColumn: builder.mutation({
      query: (payload: AddColumnPayload) => ({
        url: "/columns",
        method: "POST",
        body: payload,
      }),
      // transformResponse: (response) => response.data,
      invalidatesTags: ["Columns"],
    }),
    deleteColumn: builder.mutation<void, number>({
      query: (id: number) => ({
        url: `/columns/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Boards", "Columns"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useBoardColumnsQuery,
  useAddColumnMutation,
  useDeleteColumnMutation,
} = columnsApi;
