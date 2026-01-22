import { Navigate } from "react-router";
import { useAppSelector } from "../../redux/store/hooks";
import Swal from "sweetalert2";
import { useEffect } from "react";
import type { Props } from "../../types";




export default function PrivateRoute({ children }: Props) {
  const isAuthenticated = useAppSelector(
    (state) => state.auth.isAuthenticated
  );

  useEffect(() => {
    if (!isAuthenticated) {
      Swal.fire({
        icon: "error",
        title: "Access Denied",
        text: "You must be logged in to access this page.",
        confirmButtonColor: "#2563eb",
      });
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
