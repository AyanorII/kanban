import { toast } from "react-toastify";
import { TOAST_OPTIONS } from "../../constants";
import { AccessToken, AuthDto, Provider } from "../../lib/types";
import { apiSlice } from "../apiSlice";
export interface AuthPayload {
  email: string;
  password: string;
}

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AccessToken, AuthPayload>({
      query: (payload) => ({
        url: "/auth/login",
        method: "POST",
        body: payload,
      }),
      transformResponse: async (
        response: AccessToken | Promise<AccessToken>,
        meta,
        _args
      ) => {
        if (meta?.response?.ok) {
          toast.success("Welcome back! :)", TOAST_OPTIONS);
        }

        return response;
      },
    }),

    signUp: builder.mutation<AccessToken, AuthPayload>({
      query: (payload) => ({
        url: "/auth/signup",
        method: "POST",
        body: payload,
      }),
      transformResponse: async (
        response: AccessToken | Promise<AccessToken>,
        meta,
        _args
      ) => {
        if (meta?.response?.ok) {
          toast.success("Welcome to Kanban! :)", TOAST_OPTIONS);
        }

        return response;
      },
    }),

    signInWithProvider: builder.mutation<
      AccessToken,
      { provider: Provider; authDto: AuthDto }
    >({
      query: ({ provider, authDto }) => ({
        url: `/auth/${provider.toLowerCase()}`,
        method: "POST",
        body: authDto,
      }),
      transformResponse: async (response: any, _meta, _args) => {
        return response.accessToken;
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useSignUpMutation,
  useSignInWithProviderMutation,
} = authApi;
