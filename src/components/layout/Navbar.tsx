import { NavLink, useNavigate } from "react-router";

import { logout as logoutAction } from "../../redux/store/store.authSlice";
import { useLogoutMutation } from "../../redux/features/auth/auth.api";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";


export default function Navbar() {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [logoutApi] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
    } finally {
      dispatch(logoutAction());
      navigate("/login");
    }
  };

  const linkClass =
    "px-3 py-2 rounded hover:bg-gray-200 transition font-medium";

  return (
    <nav className="bg-white border-b shadow-sm px-6 py-3 flex justify-between items-center">
      {/* Left */}
      <div className="flex gap-3 items-center">
        <span className="font-bold text-lg text-blue-600">
          Job Task
        </span>

        {isAuthenticated && (
          <>
            <NavLink to="/dashboard" className={linkClass}>
              Dashboard
            </NavLink>

            <NavLink to="/projects" className={linkClass}>
              Projects
            </NavLink>

            {user?.role === "ADMIN" && (
              <>
                <NavLink to="/users" className={linkClass}>
                  Users
                </NavLink>

                <NavLink to="/invite" className={linkClass}>
                  Invite User
                </NavLink>

                <NavLink to="/audit-logs" className={linkClass}>
                  Audit Logs
                </NavLink>
              </>
            )}
          </>
        )}
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <>
            <span className="text-sm text-gray-600">
              {user?.email} ({user?.role})
            </span>

            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <NavLink
            to="/login"
            className="px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
}
