/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from "@reduxjs/toolkit/query/react";
import baseApi from "../../../api/baseApi";
import type { Project } from "../../../types";

export const projectsApi = createApi({
  reducerPath: "projectsApi",
  baseQuery: baseApi,
  tagTypes: ["Projects"],
  endpoints: (builder) => ({
  
    getProjects: builder.query<Project[], void>({
      query: () => "/projects",
      providesTags: ["Projects"],
    }),

 
    createProject: builder.mutation<Project, { name: string; description: string }>({
      query: (body) => ({
        url: "/projects",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Projects"],
    }),

  
    updateProject: builder.mutation<Project, { id: string; name: string; description: string }>({
      query: ({ id, ...body }) => ({
        url: `/projects/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Projects"],
    }),

   
    deleteProject: builder.mutation<void, string>({
      query: (id:any) => ({
        url: `/projects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Projects"],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectsApi;
