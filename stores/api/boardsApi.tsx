import { Board } from "../../lib/types";
import { apiSlice } from "../apiSlice";

export interface BoardPayload {
  id?: number;
  name: string;
  columns: {
    name: string;
    id?: number;
  }[];
}

const boardsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    boards: builder.query<Board[], void>({
      query: () => "/boards",
      providesTags: ["Boards", "Columns", "Subtasks", "Subtasks"],
    }),
    createBoard: builder.mutation<Board, BoardPayload>({
      query: (payload: BoardPayload) => {
        const columns = payload.columns
          .filter((column) => column.name !== "")
          .map(({name}) => ({ name }));

        return {
          url: "/boards",
          method: "POST",
          body: { ...payload, columns },
        };
      },
      invalidatesTags: ["Boards"],
    }),
    updateBoard: builder.mutation({
      query: (payload: BoardPayload) => {
        const { id } = payload

        return {
          url: `/boards/${id}`,
          method: "PATCH",
          body: payload ,
        };
      },
      invalidatesTags: ["Boards", "Columns"]
    }),
    deleteBoard: builder.mutation<void, Board>({
      query: (board) => ({
        url: `/boards/${board.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Boards", "Columns", "Tasks"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateBoardMutation,
  useBoardsQuery,
  useDeleteBoardMutation,
  useUpdateBoardMutation,
} = boardsApi;
