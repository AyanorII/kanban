import { toast } from "react-toastify";
import { TOAST_OPTIONS } from "../../constants";
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
          .map(({ name }) => ({ name }));

        return {
          url: "/boards",
          method: "POST",
          body: { ...payload, columns },
        };
      },
      transformResponse: async (
        response: Board | Promise<Board>,
        meta,
        args
      ) => {
        const created = meta?.response?.status === 201;
        const { name } = await response;

        if (created) {
          toast.success(`Created board '${name}'`, TOAST_OPTIONS);
        }

        return response;
      },
      invalidatesTags: ["Boards"],
    }),

    updateBoard: builder.mutation({
      query: (payload: BoardPayload) => {
        const { id } = payload;

        return {
          url: `/boards/${id}`,
          method: "PATCH",
          body: payload,
        };
      },
      transformResponse: (response: Board | Promise<Board>, meta, _args) => {
        if (meta?.response?.status === 200) {
          toast.success(`Updated board`, TOAST_OPTIONS);
        }

        return response;
      },
      invalidatesTags: ["Boards", "Columns"],
    }),

    deleteBoard: builder.mutation<void, Board>({
      query: (board) => ({
        url: `/boards/${board.id}`,
        method: "DELETE",
      }),
      transformResponse: (response: void | Promise<void>, meta, _args) => {
        if (meta?.response?.status === 204) {
          toast.success(`Successfully deleted board`, TOAST_OPTIONS);
        }

        return response;
      },
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
