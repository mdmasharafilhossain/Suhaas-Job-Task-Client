/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useGetProjectsQuery, useCreateProjectMutation } from "../../redux/features/project/projects.api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Swal from "sweetalert2";
import { FiPlus, FiFolder, FiEdit, FiTrash2, FiLoader } from "react-icons/fi";
import { projectSchema, type ProjectFormData } from "../../schema/projects/project.schema";


export default function Projects() {
  const { data: projects, isLoading, refetch } = useGetProjectsQuery();
  const [createProject, { isLoading: isCreating }] = useCreateProjectMutation();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (data: ProjectFormData) => {
    try {
      await createProject(data).unwrap();
      
      await Swal.fire({
        title: 'Success!',
        text: 'Project created successfully',
        icon: 'success',
        confirmButtonColor: '#10b981',
        timer: 2000,
        timerProgressBar: true,
      });

      reset();
      setIsFormOpen(false);
      refetch();
    } catch (error: any) {
      Swal.fire({
        title: 'Error!',
        text: error?.data?.message || 'Failed to create project',
        icon: 'error',
        confirmButtonColor: '#ef4444',
      });
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
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Projects</h1>
          <p className="text-gray-600">Manage and organize your projects</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
              <div className="h-2 bg-linear-to-r from-blue-600 to-indigo-700"></div>
              
              <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-3">
                  <h2 className="text-xl font-semibold text-gray-900">Your Projects</h2>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium self-start sm:self-center">
                    {projects?.length || 0} projects
                  </span>
                </div>

                {projects?.length === 0 ? (
                  <div className="text-center py-8 sm:py-12">
                    <FiFolder className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
                    <p className="text-gray-600 mb-4">Create your first project to get started</p>
                    <button
                      onClick={() => setIsFormOpen(true)}
                      className="px-6 py-2 rounded-lg font-medium text-white bg-linear-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 text-sm sm:text-base"
                    >
                      Create Project
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    {projects?.map((project: any) => (
                      <div
                        key={project.id}
                        className="border border-gray-200 rounded-xl p-4 sm:p-5 hover:shadow-md transition-all duration-300 bg-white group"
                      >
                        <div className="flex justify-between items-start mb-3 gap-2">
                          <div className="flex items-center min-w-0">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-linear-to-br from-blue-100 to-indigo-100 flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                              <FiFolder className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate text-sm sm:text-base">
                              {project.name}
                            </h3>
                          </div>
                          <div className="flex space-x-1 sm:space-x-2 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                            <button className="p-1 sm:p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                              <FiEdit className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                            </button>
                            <button className="p-1 sm:p-1.5 hover:bg-red-50 rounded-lg transition-colors">
                              <FiTrash2 className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
                            </button>
                          </div>
                        </div>
                        <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 mb-3 sm:mb-4">
                          {project.description}
                        </p>
                        <div className="pt-3 sm:pt-4 border-t border-gray-100 flex justify-between items-center">
                          <span className="text-xs text-gray-500 truncate mr-2">Created recently</span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs whitespace-nowrap">
                            Active
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 lg:sticky lg:top-6">
              <div className="h-2 bg-linear-to-r from-blue-600 to-indigo-700"></div>
              
              <div className="p-4 sm:p-6">
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-linear-to-br from-blue-600 to-indigo-700 flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                    <FiPlus className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">
                    {isFormOpen ? "New Project" : "Create Project"}
                  </h2>
                </div>

                {!isFormOpen ? (
                  <div className="text-center py-6 sm:py-8">
                    <FiFolder className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
                    <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">Start a new project to organize your work</p>
                    <button
                      onClick={() => setIsFormOpen(true)}
                      className="w-full py-2.5 sm:py-3 px-4 rounded-lg font-semibold text-white bg-linear-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-lg transition-all duration-300 text-sm sm:text-base"
                    >
                      <div className="flex items-center justify-center">
                        <FiPlus className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                        Create New Project
                      </div>
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Project Name
                      </label>
                      <input
                        {...register("name")}
                        type="text"
                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border ${
                          errors.name 
                            ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                            : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                        } focus:outline-none focus:ring-2 transition duration-200 text-sm sm:text-base`}
                        placeholder="Enter project name"
                        disabled={isSubmitting}
                      />
                      {errors.name && (
                        <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600 flex items-start">
                          <span className="mr-1 mt-0.5">•</span>
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
                        rows={3}
                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border ${
                          errors.description 
                            ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                            : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                        } focus:outline-none focus:ring-2 transition duration-200 text-sm sm:text-base min-h-[80px] sm:min-h-[100px] resize-y`}
                        placeholder="Describe your project..."
                        disabled={isSubmitting}
                      />
                      {errors.description && (
                        <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600 flex items-start">
                          <span className="mr-1 mt-0.5">•</span>
                          {errors.description.message}
                        </p>
                      )}
                    </div>

                    <div className="flex space-x-2 sm:space-x-3 pt-3 sm:pt-4">
                      <button
                        type="button"
                        onClick={() => {
                          setIsFormOpen(false);
                          reset();
                        }}
                        disabled={isSubmitting}
                        className="flex-1 py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all duration-300 text-sm sm:text-base"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting || isCreating}
                        className={`flex-1 py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg font-semibold text-white shadow-lg transition-all duration-300 text-sm sm:text-base ${
                          isSubmitting || isCreating
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-linear-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800'
                        }`}
                      >
                        {(isSubmitting || isCreating) ? (
                          <div className="flex items-center justify-center">
                            <FiLoader className="w-4 h-4 sm:w-5 sm:h-5 animate-spin mr-1 sm:mr-2" />
                            <span className="truncate">Creating...</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center">
                            <FiPlus className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                            <span className="truncate">Create Project</span>
                          </div>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}