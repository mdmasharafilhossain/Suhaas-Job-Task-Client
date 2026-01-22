import { useEffect } from "react";
import { useGetMeQuery } from "../redux/features/auth/auth.api";
import { useAppDispatch } from "../redux/store/hooks";
import { setCredentials, logout } from "../redux/store/store.authSlice";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  const { data, isLoading, isError } = useGetMeQuery();

  useEffect(() => {
    if (data?.user) {
      dispatch(setCredentials({ user: data.user }));
    }

    if (isError) {
      dispatch(logout());
    }
  }, [data, isError, dispatch]);

  // Optional: block UI until auth check finishes
  if (isLoading) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  return <>{children}</>;
}
