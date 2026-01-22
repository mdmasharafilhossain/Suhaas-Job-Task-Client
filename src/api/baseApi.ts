import { fetchBaseQuery } from "@reduxjs/toolkit/query";


const baseApi = fetchBaseQuery({
  baseUrl: "http://localhost:5000",
  credentials: "include",
});

export default baseApi;
