import { Board } from "../../lib/types";
import { apiSlice } from "../apiSlice";

export interface BoardPayload {
  name: string;
  columns: {
    title: string;
  }[];
}

const boardsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    boards: builder.query<Board[], void>({
      query: () => "/boards",
      providesTags: ["Boards", "Columns", "Subtasks", "Subtasks"],
    }),
    createBoard: builder.mutation<Board, BoardPayload>({
      query: (payload: BoardPayload) => ({
        url: "/boards",
        method: "POST",
        body: payload,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useCreateBoardMutation, useBoardsQuery } = boardsApi;
