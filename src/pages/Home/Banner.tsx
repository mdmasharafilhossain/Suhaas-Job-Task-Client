import React from "react";
import { FiFolder, FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router";
import { useAppSelector } from "../../redux/store/hooks";
import type { AuthUser } from "../../types";



const Banner: React.FC = () => {
  const navigate = useNavigate();
  const user = useAppSelector(
    (state): AuthUser | null => state.auth.user
  );

  return (
    <section className="min-h-screen w-full bg-linear-to-br from-blue-600 via-indigo-700 to-purple-800 flex items-center justify-center px-4">
      <div className="max-w-3xl text-center text-white">
      
        <div className="mx-auto mb-6 w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
          <FiFolder className="w-8 h-8 text-white" />
        </div>

   
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
          Manage Projects <br className="hidden sm:block" />
          With Confidence
        </h1>

      
        <p className="text-lg sm:text-xl text-white/90 mb-10">
          A secure, role-based project management system with invite-only
          onboarding and full administrative control.
        </p>

     
        {user && (
          <p className="mb-6 text-white/80">
            Welcome back,{" "}
            <span className="font-semibold text-white">
              {user.name}
            </span>{" "}
            ({user.role})
          </p>
        )}

        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/projects")}
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white text-indigo-700 font-semibold hover:bg-gray-100 transition"
          >
            Go to Project
            <FiArrowRight className="ml-2" />
          </button>

          {user?.role === "ADMIN" && (
            <button
              onClick={() => navigate("/projects-management")}
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl border border-white/40 text-white font-semibold hover:bg-white/10 transition"
            >
              Manage Projects
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Banner;
