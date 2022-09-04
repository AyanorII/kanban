import { Board } from "../../lib/types";
import { apiSlice } from "../apiSlice";

const boardsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    boards: builder.query<Board[], void>({
      query: () => "/boards",
      providesTags: ["Boards", "Columns", "Subtasks", "Subtasks"],
    }),
  }),
  overrideExisting: false,
});

export const { useBoardsQuery } = boardsApi;
