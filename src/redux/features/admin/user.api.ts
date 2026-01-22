import { createApi } from "@reduxjs/toolkit/query/react";
import baseApi from "../../../api/baseApi";
import type { User } from "../../../types";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: baseApi,

  tagTypes: ["Users"],

  endpoints: (builder) => ({

    getUsers: builder.query<User[], void>({
      query: () => "/users",
      providesTags: ["Users"], 
    }),


    updateUserRole: builder.mutation<User, { id: string; role: string }>({
      query: ({ id, role }) => ({
        url: `/users/${id}/role`,
        method: "PATCH",
        body: { role },
      }),
      invalidatesTags: ["Users"], 
    }),


    toggleUserStatus: builder.mutation<User, { id: string; status: string }>({
      query: ({ id, status }) => ({
        url: `/users/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Users"], 
    }),

  
    inviteUser: builder.mutation<
      { message: string; link?: string },
      { email: string; role: string }
    >({
      query: (body) => ({
        url: "/auth/invite",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useUpdateUserRoleMutation,
  useToggleUserStatusMutation,
  useInviteUserMutation,
} = usersApi;
