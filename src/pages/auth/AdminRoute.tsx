import { Navigate } from "react-router";
import { useAppSelector } from "../../redux/store/hooks";
import Swal from "sweetalert2";
import { useEffect } from "react";
import type { Props } from "../../types";



export default function AdminRoute({ children }: Props) {
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (user && user.role !== "ADMIN") {
      Swal.fire({
        icon: "error",
        title: "Unauthorized",
        text: "You do not have permission to access this page.",
        confirmButtonColor: "#dc2626",
      });
    }
  }, [user]);

  if (!user || user.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return children;
}
