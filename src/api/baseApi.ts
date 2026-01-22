import { fetchBaseQuery } from "@reduxjs/toolkit/query";


const baseApi = fetchBaseQuery({
  baseUrl: import.meta.env.BASE_API,
  credentials: "include",
});

export default baseApi;
