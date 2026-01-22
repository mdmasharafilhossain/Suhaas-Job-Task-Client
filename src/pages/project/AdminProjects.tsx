/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  useGetProjectsQuery,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} from "../../redux/features/project/projects.api";
import { useState } from "react";
import Swal from "sweetalert2";
import { FiEdit, FiTrash2, FiSave, FiX, FiFolder, FiLoader } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { projectSchema, type ProjectFormData } from "../../schema/projects/project.schema";



export default function AdminProjects() {
  const { data: projects, isLoading } = useGetProjectsQuery();
  const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();
  const [deleteProject, { isLoading: isDeleting }] = useDeleteProjectMutation();

  const [editingId, setEditingId] = useState<string | null>(null);


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const startEdit = (p: any) => {
    setEditingId(p.id);
    
    setValue("name", p.name);
    setValue("description", p.description);
    reset({ name: p.name, description: p.description });
  };

  const cancelEdit = () => {
    setEditingId(null);
    
    reset();
  };

  const onSubmit = async (data: ProjectFormData) => {
    if (!editingId) return;

    try {
      await updateProject({
        id: editingId,
        name: data.name,
        description: data.description,
      }).unwrap();

      Swal.fire({
        title: 'Success!',
        text: 'Project updated successfully',
        icon: 'success',
        confirmButtonColor: '#10b981',
        timer: 2000,
        timerProgressBar: true,
      });

      cancelEdit();
    } catch (error: any) {
      Swal.fire({
        title: 'Error!',
        text: error?.data?.message || 'Failed to update project',
        icon: 'error',
        confirmButtonColor: '#ef4444',
      });
    }
  };

  const handleDelete = async (id: string, projectName: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `Delete project "${projectName}"? This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        await deleteProject(id).unwrap();

        Swal.fire({
          title: 'Deleted!',
          text: 'Project has been deleted.',
          icon: 'success',
          confirmButtonColor: '#10b981',
          timer: 2000,
          timerProgressBar: true,
        });
      } catch (error: any) {
        Swal.fire({
          title: 'Error!',
          text: error?.data?.message || 'Failed to delete project',
          icon: 'error',
          confirmButtonColor: '#ef4444',
        });
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <FiLoader className="w-8 h-8 text-blue-600 animate-spin mb-2" />
          <p className="text-gray-600">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
          <div className="h-2 bg-linear-to-r from-blue-600 to-indigo-700"></div>
          
          <div className="p-6">
            <div className="flex items-center mb-8">
              <div className="w-10 h-10 rounded-lg bg-linear-to-br from-blue-600 to-indigo-700 flex items-center justify-center mr-3">
                <FiFolder className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Project Management</h1>
                <p className="text-gray-600 text-sm">Manage all projects in the system</p>
              </div>
              <div className="ml-auto px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {projects?.length || 0} Projects
              </div>
            </div>

            {projects?.length === 0 ? (
              <div className="text-center py-12">
                <FiFolder className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
                <p className="text-gray-600">Create projects from the main projects page</p>
              </div>
            ) : (
              <div className="space-y-4">
                {projects?.map((p: any) => (
                  <div
                    key={p.id}
                    className={`border rounded-xl p-5 transition-all duration-300 ${
                      editingId === p.id
                        ? 'border-blue-300 bg-blue-50 shadow-md'
                        : 'border-gray-200 bg-white hover:shadow-md'
                    }`}
                  >
                    {editingId === p.id ? (
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Project Name
                            </label>
                            <input
                              {...register("name")}
                              type="text"
                              className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition duration-200 ${
                                errors.name 
                                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                                  : 'border-blue-300 focus:ring-blue-500 focus:border-blue-500'
                              }`}
                              placeholder="Enter project name"
                              disabled={isSubmitting || isUpdating}
                            />
                            {errors.name && (
                              <p className="mt-2 text-sm text-red-600 flex items-center">
                                <span className="mr-1">•</span>
                                {errors.name.message}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Description
                            </label>
                            <textarea
                              {...register("description")}
                              className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition duration-200 min-h-25 resize-y ${
                                errors.description 
                                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                                  : 'border-blue-300 focus:ring-blue-500 focus:border-blue-500'
                              }`}
                              placeholder="Enter project description"
                              disabled={isSubmitting || isUpdating}
                            />
                            {errors.description && (
                              <p className="mt-2 text-sm text-red-600 flex items-center">
                                <span className="mr-1">•</span>
                                {errors.description.message}
                              </p>
                            )}
                          </div>

                          <div className="flex space-x-3 pt-2">
                            <button
                              type="submit"
                              disabled={isSubmitting || isUpdating}
                              className={`flex items-center justify-center px-5 py-2.5 rounded-lg font-medium text-white transition-all duration-300 ${
                                isSubmitting || isUpdating
                                  ? 'bg-gray-400 cursor-not-allowed'
                                  : 'bg-linear-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800'
                              }`}
                            >
                              {(isSubmitting || isUpdating) ? (
                                <>
                                  <FiLoader className="w-4 h-4 animate-spin mr-2" />
                                  Saving...
                                </>
                              ) : (
                                <>
                                  <FiSave className="w-4 h-4 mr-2" />
                                  Save Changes
                                </>
                              )}
                            </button>

                            <button
                              type="button"
                              onClick={cancelEdit}
                              disabled={isSubmitting || isUpdating}
                              className="flex items-center justify-center px-5 py-2.5 rounded-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all duration-300"
                            >
                              <FiX className="w-4 h-4 mr-2" />
                              Cancel
                            </button>
                          </div>
                        </div>
                      </form>
                    ) : (
                      <>
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h2 className="font-semibold text-lg text-gray-900 mb-1">{p.name}</h2>
                            <p className="text-gray-600 text-sm">{p.description}</p>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => startEdit(p)}
                              disabled={isDeleting}
                              className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors duration-200"
                              title="Edit project"
                            >
                              <FiEdit className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => handleDelete(p.id, p.name)}
                              disabled={isDeleting}
                              className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors duration-200"
                              title="Delete project"
                            >
                              {isDeleting ? (
                                <FiLoader className="w-4 h-4 animate-spin" />
                              ) : (
                                <FiTrash2 className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-gray-100">
                          <div className="flex items-center text-xs text-gray-500">
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded mr-3">
                              Project ID: {p.id.substring(0, 8)}...
                            </span>
                            <span>Created recently</span>
                          </div>
                        </div>
                      </>
                    )}
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
