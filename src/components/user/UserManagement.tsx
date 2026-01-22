/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  useGetUsersQuery,
  useUpdateUserRoleMutation,
  useToggleUserStatusMutation,
} from "../../redux/features/admin/user.api";
import { FiUser, FiShield, FiUserCheck, FiUserX, FiEdit2, FiRefreshCw } from "react-icons/fi";
import Swal from "sweetalert2";

export default function UserManagement() {
  const { data: users, isLoading } = useGetUsersQuery();
  const [updateRole, { isLoading: isUpdatingRole }] = useUpdateUserRoleMutation();
  const [toggleStatus, { isLoading: isTogglingStatus }] = useToggleUserStatusMutation();

  const handleRoleChange = async (id: string, newRole: string, email: string) => {
    const result = await Swal.fire({
      title: 'Change User Role',
      text: `Change ${email}'s role to ${newRole}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3b82f6',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, change it',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      try {
        await updateRole({ id, role: newRole }).unwrap();
        Swal.fire({
          title: 'Success!',
          text: `Role changed to ${newRole}`,
          icon: 'success',
          confirmButtonColor: '#10b981',
          timer: 2000,
          timerProgressBar: true,
        });
      } catch (error: any) {
        Swal.fire({
          title: 'Error!',
          text: error?.data?.message || 'Failed to update role',
          icon: 'error',
          confirmButtonColor: '#ef4444',
        });
      }
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: string, email: string) => {
    const newStatus = currentStatus === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    const action = currentStatus === "ACTIVE" ? "deactivate" : "activate";

    const result = await Swal.fire({
      title: `${action === 'activate' ? 'Activate' : 'Deactivate'} User`,
      text: `${action === 'activate' ? 'Activate' : 'Deactivate'} ${email}'s account?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: action === 'activate' ? '#10b981' : '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: `Yes, ${action} it`,
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      try {
        await toggleStatus({
          id,
          status: newStatus,
        }).unwrap();

        Swal.fire({
          title: 'Success!',
          text: `User ${action}d successfully`,
          icon: 'success',
          confirmButtonColor: '#10b981',
          timer: 2000,
          timerProgressBar: true,
        });
      } catch (error: any) {
        Swal.fire({
          title: 'Error!',
          text: error?.data?.message || `Failed to ${action} user`,
          icon: 'error',
          confirmButtonColor: '#ef4444',
        });
      }
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'ADMIN': return 'bg-purple-100 text-purple-800';
      case 'MANAGER': return 'bg-blue-100 text-blue-800';
      case 'STAFF': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    return status === 'ACTIVE' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <FiRefreshCw className="w-8 h-8 text-blue-600 animate-spin mb-2" />
          
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
          <div className="h-2 bg-linear-to-r from-blue-600 to-indigo-700"></div>
          
          <div className="p-6">
            <div className="flex items-center mb-8">
              <div className="w-10 h-10 rounded-lg bg-linear-to-br from-blue-600 to-indigo-700 flex items-center justify-center mr-3">
                <FiUser className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
                <p className="text-gray-600 text-sm">Manage user roles and account status</p>
              </div>
              <div className="ml-auto px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {users?.length || 0} Users
              </div>
            </div>

            {users?.length === 0 ? (
              <div className="text-center py-12">
                <FiUser className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
                <p className="text-gray-600">No users have been registered yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {users?.map(u => (
                  <div 
                    key={u.id} 
                    className="border border-gray-200 rounded-xl p-5 bg-white hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-start sm:items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          u.status === 'ACTIVE' 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {u.status === 'ACTIVE' ? (
                            <FiUserCheck className="w-5 h-5" />
                          ) : (
                            <FiUserX className="w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{u.email}</h3>
                          <div className="flex flex-wrap gap-2 mt-1">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getRoleBadgeColor(u.role)}`}>
                              <FiShield className="w-3 h-3 inline mr-1" />
                              {u.role}
                            </span>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadgeColor(u.status)}`}>
                              {u.status === 'ACTIVE' ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiEdit2 className="h-4 w-4 text-gray-400" />
                          </div>
                          <select
                            value={u.role}
                            onChange={(e) => handleRoleChange(u.id, e.target.value, u.email)}
                            disabled={isUpdatingRole}
                            className="pl-9 pr-8 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition duration-200 appearance-none bg-white"
                          >
                            <option value="ADMIN">ADMIN</option>
                            <option value="MANAGER">MANAGER</option>
                            <option value="STAFF">STAFF</option>
                          </select>
                        </div>

                        <button
                          onClick={() => handleToggleStatus(u.id, u.status, u.email)}
                          disabled={isTogglingStatus}
                          className={`flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                            u.status === 'ACTIVE'
                              ? 'bg-red-50 text-red-600 hover:bg-red-100'
                              : 'bg-green-50 text-green-600 hover:bg-green-100'
                          } ${isTogglingStatus ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          {isTogglingStatus ? (
                            <FiRefreshCw className="w-4 h-4 animate-spin mr-2" />
                          ) : u.status === 'ACTIVE' ? (
                            <FiUserX className="w-4 h-4 mr-2" />
                          ) : (
                            <FiUserCheck className="w-4 h-4 mr-2" />
                          )}
                          {u.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center text-xs text-gray-500">
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded">
                          User ID: {u.id.substring(0, 8)}...
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="h-2 bg-linear-to-r from-indigo-700 to-blue-600"></div>
        </div>

       
      </div>
    </div>
  );
}
