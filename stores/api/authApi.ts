import { toast } from "react-toastify";
import { TOAST_OPTIONS } from "../../constants";
import { AccessToken, AuthDto, AuthResponse } from '../../lib/types';
import { apiSlice } from "../apiSlice";
export interface AuthPayload {
  email: string;
  password: string;
}

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, AuthPayload>({
      query: (payload) => ({
        url: "/auth/login",
        method: "POST",
        body: payload,
      }),
      transformResponse: async (
        response: AuthResponse | Promise<AuthResponse>,
        meta,
        _args
      ) => {
        if (meta?.response?.ok) {
          toast.success("Welcome back! :)", TOAST_OPTIONS);
        }

        return response;
      },
    }),

    signUp: builder.mutation<AuthResponse, AuthPayload>({
      query: (payload) => ({
        url: "/auth/signup",
        method: "POST",
        body: payload,
      }),
      transformResponse: async (
        response: AuthResponse | Promise<AuthResponse>,
        meta,
        _args
      ) => {
        if (meta?.response?.ok) {
          toast.success("Welcome to Kanban! :)", TOAST_OPTIONS);
        }

        return response;
      },
    }),

    signInWithProvider: builder.mutation<AccessToken, AuthDto>({
      query: (authDto) => ({
        url: `/auth/provider`,
        method: "POST",
        body: authDto,
      }),
      transformResponse: async (response: AuthResponse, _meta, _args) => {
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
