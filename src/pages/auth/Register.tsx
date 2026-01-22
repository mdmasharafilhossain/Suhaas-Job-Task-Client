/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSearchParams, useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FiUser, FiLock, FiCheckCircle, FiMail } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const registerSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Full name is required" })
    .min(2, { message: "Name must be at least 2 characters" })
    .max(100, { message: "Name is too long" })
    .regex(/^[a-zA-Z\s]*$/, { message: "Name can only contain letters and spaces" })
    .trim(),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, { 
      message: "Password must contain at least one uppercase letter, one lowercase letter, and one number" 
    })
    .trim(),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function Register() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const token = params.get("token");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    if (!token) {
      Swal.fire({
        title: 'Invalid Token',
        text: 'Registration token is missing or invalid',
        icon: 'error',
        confirmButtonColor: '#ef4444',
      });
      return;
    }

    try {
      Swal.fire({
        title: 'Creating Account...',
        text: 'Please wait while we set up your account',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      await axios.post(
        `${import.meta.env.BASE_API}/auth/register-via-invite`,
        {
          token,
          name: data.name,
          password: data.password,
        },
        { withCredentials: true }
      );

      Swal.close();

      await Swal.fire({
        title: 'Registration Successful!',
        text: 'Your account has been created successfully.',
        icon: 'success',
        confirmButtonColor: '#10b981',
        confirmButtonText: 'Continue to Login',
        timer: 3000,
        timerProgressBar: true,
      });

      navigate("/login");
      
    } catch (err: any) {
      Swal.close();

      const errorMessage = err.response?.data?.message || "Registration failed";
      
      Swal.fire({
        title: 'Registration Failed',
        text: errorMessage,
        icon: 'error',
        confirmButtonColor: '#ef4444',
        confirmButtonText: 'Try Again',
      });

      setError('root', {
        type: 'manual',
        message: errorMessage,
      });
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="h-2 bg-linear-to-r from-blue-600 to-indigo-700"></div>
            
            <div className="p-8 sm:p-10 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-linear-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg">
                  <FiMail className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-3">Invalid Invitation</h1>
              <p className="text-red-600 mb-6">
                The invitation link is invalid or has expired.
              </p>
              <button
                onClick={() => navigate("/login")}
                className="px-6 py-3 rounded-lg font-medium text-white bg-linear-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 transition-all duration-300"
              >
                Go to Login
              </button>
            </div>

            <div className="h-2 bg-linear-to-r from-indigo-700 to-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="h-2 bg-linear-to-r from-blue-600 to-indigo-700"></div>
          
          <div className="p-8 sm:p-10">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-linear-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg">
                  <FiCheckCircle className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Registration</h1>
              <p className="text-gray-600">Set up your account to get started</p>
              <div className="mt-2">
                <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                  Invitation Accepted
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register("name")}
                    type="text"
                    className={`pl-10 w-full px-4 py-3 rounded-lg border ${
                      errors.name 
                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    } focus:outline-none focus:ring-2 transition duration-200`}
                    placeholder="Enter your full name"
                    disabled={isSubmitting}
                  />
                </div>
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <span className="mr-1">•</span>
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Create Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    disabled={isSubmitting}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    className={`pl-10 w-full px-4 py-3 rounded-lg border ${
                      errors.password 
                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    } focus:outline-none focus:ring-2 transition duration-200`}
                    placeholder="Create a secure password"
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    disabled={isSubmitting}
                  >
                    <FiLock className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <span className="mr-1">•</span>
                    {errors.password.message}
                  </p>
                )}
              </div>

              {errors.root && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600 flex items-center">
                    <span className="mr-2">⚠</span>
                    {errors.root.message}
                  </p>
                </div>
              )}

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-700 flex items-center">
                  <span className="mr-2">🔒</span>
                  Your password is encrypted and stored securely.
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 rounded-lg font-semibold text-white shadow-lg transition-all duration-300 ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-linear-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-3"></div>
                    Creating Account...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <FiCheckCircle className="w-5 h-5 mr-2" />
                    Complete Registration
                  </div>
                )}
              </button>
            </form>

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Secure registration with encryption
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                By registering, you agree to our{' '}
                <button
                  type="button"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                  onClick={() => {
                    Swal.fire({
                      title: 'Terms & Privacy',
                      html: `
                        <div class="text-left">
                          <p class="mb-3">Your privacy is important to us:</p>
                          <ul class="list-disc pl-5 space-y-2">
                            <li>Your data is encrypted and stored securely</li>
                            <li>We never share your personal information</li>
                            <li>You have full control over your account</li>
                          </ul>
                        </div>
                      `,
                      confirmButtonColor: '#10b981',
                      confirmButtonText: 'I Agree',
                    });
                  }}
                >
                  Privacy Policy
                </button>
              </p>
            </div>
          </div>

          <div className="h-2 bg-linear-to-r from-indigo-700 to-blue-600"></div>
        </div>
      </div>
    </div>
  );
}