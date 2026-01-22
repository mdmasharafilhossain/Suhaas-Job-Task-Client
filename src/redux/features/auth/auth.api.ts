import { createApi } from "@reduxjs/toolkit/query/react";
import baseApi from "../../../api/baseApi";
import type { User } from "../../../types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseApi,
  tagTypes: ["Me"],
  endpoints: (builder) => ({
    login: builder.mutation<{ user: User }, { email: string; password: string }>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),

    getMe: builder.query<{ user: User }, void>({
      query: () => "/auth/me",
      providesTags: ["Me"],
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
         invalidatesTags: ["Me"],
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetMeQuery,
  useLogoutMutation,
} = authApi;
