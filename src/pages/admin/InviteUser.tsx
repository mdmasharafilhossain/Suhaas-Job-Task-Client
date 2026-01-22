/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useInviteUserMutation } from "../../redux/features/admin/user.api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Swal from "sweetalert2";
import { FiMail, FiUserPlus, FiLink, FiShield, FiCopy, FiCheck } from "react-icons/fi";

const inviteSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" })
    .trim(),
  role: z
    .string()
    .min(1, { message: "Role selection is required" }),
});

type InviteFormData = z.infer<typeof inviteSchema>;

export default function InviteUser() {
  const [inviteUser, { isLoading }] = useInviteUserMutation();
  const [inviteLink, setInviteLink] = useState("");
  const [copied, setCopied] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InviteFormData>({
    resolver: zodResolver(inviteSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      role: "",
    },
  });

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      Swal.fire({
        title: 'Copy Failed',
        text: 'Could not copy link to clipboard',
        icon: 'error',
        confirmButtonColor: '#ef4444',
      });
    }
  };

  const onSubmit = async (data: InviteFormData) => {
    try {
      const res = await inviteUser({ email: data.email, role: data.role }).unwrap();
      
      await Swal.fire({
        title: 'Invite Sent!',
        html: `
          <div class="text-left">
            <p class="mb-3">Invitation has been sent to:</p>
            <p class="font-medium text-blue-600 mb-4">${data.email}</p>
            <p class="text-sm text-gray-600">The user will receive an email with registration instructions.</p>
          </div>
        `,
        icon: 'success',
        confirmButtonColor: '#10b981',
        confirmButtonText: 'Continue',
        timer: 3000,
        timerProgressBar: true,
      });

      if (res.link) {
        setInviteLink(res.link);
        
        await Swal.fire({
          title: '📋 Invitation Link',
          html: `
            <div class="text-left">
              <p class="mb-2">Direct registration link:</p>
              <div class="p-3 bg-gray-100 rounded-lg text-sm break-all font-mono mb-4">
                ${res.link}
              </div>
              <p class="text-sm text-gray-600">You can also copy this link and share it directly.</p>
            </div>
          `,
          icon: 'info',
          showCancelButton: true,
          confirmButtonColor: '#3b82f6',
          cancelButtonColor: '#6b7280',
          confirmButtonText: 'Copy Link',
          cancelButtonText: 'Close',
        }).then((result) => {
          if (result.isConfirmed) {
            copyToClipboard();
            Swal.fire({
              title: 'Copied!',
              text: 'Link copied to clipboard',
              icon: 'success',
              confirmButtonColor: '#10b981',
              timer: 1500,
            });
          }
        });
      }

      reset();
    } catch (err: any) {
      Swal.fire({
        title: 'Invite Failed',
        text: err?.data?.message || "Failed to send invitation",
        icon: 'error',
        confirmButtonColor: '#ef4444',
        confirmButtonText: 'Try Again',
      });
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-4 sm:p-6">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
          <div className="h-2 bg-linear-to-r from-blue-600 to-indigo-700"></div>
          
          <div className="p-6 sm:p-8">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-linear-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg">
                  <FiUserPlus className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Invite User</h1>
              <p className="text-gray-600">Send invitation to join the platform</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register("email")}
                    type="email"
                    className={`pl-10 w-full px-4 py-3 rounded-lg border ${
                      errors.email 
                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    } focus:outline-none focus:ring-2 transition duration-200`}
                    placeholder="Enter user's email address"
                    disabled={isSubmitting}
                  />
                </div>
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <span className="mr-1">•</span>
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  User Role
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiShield className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    {...register("role")}
                    className={`pl-10 w-full px-4 py-3 rounded-lg border ${
                      errors.role 
                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    } focus:outline-none focus:ring-2 transition duration-200 appearance-none`}
                    disabled={isSubmitting}
                  >
                    <option value="">Select a role</option>
                    <option value="STAFF">Staff</option>
                    <option value="MANAGER">Manager</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <div className="w-5 h-5 text-gray-400">▼</div>
                  </div>
                </div>
                {errors.role && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <span className="mr-1">•</span>
                    {errors.role.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isLoading}
                className={`w-full py-3 px-4 rounded-lg font-semibold text-white shadow-lg transition-all duration-300 ${
                  isSubmitting || isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-linear-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800'
                }`}
              >
                {(isSubmitting || isLoading) ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-3"></div>
                    Sending Invite...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <FiUserPlus className="w-5 h-5 mr-2" />
                    Send Invitation
                  </div>
                )}
              </button>
            </form>

            {inviteLink && (
              <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center mb-3">
                  <FiLink className="w-5 h-5 text-blue-600 mr-2" />
                  <h3 className="font-semibold text-gray-900">Invitation Link</h3>
                </div>
                <div className="relative">
                  <div className="p-3 bg-white border border-gray-300 rounded-lg break-all text-sm font-mono mb-3">
                    {inviteLink}
                  </div>
                  <button
                    onClick={copyToClipboard}
                    className="w-full flex items-center justify-center py-2 px-4 rounded-lg font-medium text-white bg-linear-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 transition-all duration-300"
                  >
                    {copied ? (
                      <>
                        <FiCheck className="w-4 h-4 mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <FiCopy className="w-4 h-4 mr-2" />
                        Copy Link to Clipboard
                      </>
                    )}
                  </button>
                </div>
                <p className="mt-3 text-xs text-gray-600">
                  Share this link directly if the email invitation wasn't received.
                </p>
              </div>
            )}

            
          </div>

          <div className="h-2 bg-linear-to-r from-indigo-700 to-blue-600"></div>
        </div>
      </div>
    </div>
  );
}