import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/store.authSlice";
import { authApi } from "../features/auth/auth.api";
import { usersApi } from "../features/admin/user.api";
import { projectsApi } from "../features/project/projects.api";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [projectsApi.reducerPath]: projectsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(usersApi.middleware)
      .concat(projectsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
