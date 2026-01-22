import { fetchBaseQuery } from "@reduxjs/toolkit/query";


const baseApi = fetchBaseQuery({
  
  baseUrl: "https://job-task-eosin.vercel.app",
  
  credentials: "include",
});

export default baseApi;
