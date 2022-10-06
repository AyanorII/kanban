import { Board, Column } from "../../lib/types";
import { apiSlice } from "../apiSlice";
import { toast } from 'react-toastify';
import { TOAST_OPTIONS } from '../../constants';

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
      transformResponse: (response: Column | Promise<Column>, meta, _args) => {
        if (meta?.response?.status === 201) {
          toast.success(`Added column`, TOAST_OPTIONS);
        }

        return response;
      },
      invalidatesTags: ["Columns"],
    }),

    deleteColumn: builder.mutation<void, number>({
      query: (id: number) => ({
        url: `/columns/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response: void | Promise<void>, meta, _args) => {
        if (meta?.response?.status === 204) {
          toast.success(`Deleted column`, TOAST_OPTIONS);
        }

        return response;
      },
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
