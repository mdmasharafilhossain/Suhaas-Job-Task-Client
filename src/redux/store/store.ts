import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/store.authSlice";
import { authApi } from "../features/auth/auth.api";
// import { authApi } from "../features/auth/auth.api";
// import { adminApi } from "../features/admin/admin.api";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    // [adminApi.reducerPath]: adminApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
    //   .concat(adminApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
