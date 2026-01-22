import { useEffect } from "react";
import { useGetMeQuery } from "../redux/features/auth/auth.api";
import { useAppDispatch } from "../redux/store/hooks";
import { setCredentials} from "../redux/store/store.authSlice";
import { FiRefreshCw } from "react-icons/fi";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetMeQuery();

  useEffect(() => {
    if (data?.user) {
      dispatch(setCredentials({ user: data.user }));
    }
  }, [data, dispatch]);

  if (isLoading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="flex flex-col items-center">
              <FiRefreshCw className="w-8 h-8 text-blue-600 animate-spin mb-2" />
              
            </div>
          </div>;
  }

  return <>{children}</>;
}

