import { createApi } from "@reduxjs/toolkit/query/react";
import baseApi from "../../../api/baseApi";
import type { User } from "../../../types";


export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: baseApi,
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => "/users",
    }),

    updateUserRole: builder.mutation<User, { id: string; role: string }>({
      query: ({ id, role }) => ({
        url: `/users/${id}/role`,
        method: "PATCH",
        body: { role },
      }),
    }),

    toggleUserStatus: builder.mutation<User, { id: string; status: string }>({
      query: ({ id, status }) => ({
        url: `/users/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useUpdateUserRoleMutation,
  useToggleUserStatusMutation,
} = usersApi;
