/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetProjectsQuery, useCreateProjectMutation } from "../../redux/features/project/projects.api";

export default function Projects() {
  const { data: projects, isLoading } = useGetProjectsQuery();
  const [createProject] = useCreateProjectMutation();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    await createProject({
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      description: (form.elements.namedItem("description") as HTMLInputElement).value,
    });

    form.reset();
  };

  if (isLoading) return <p className="p-6">Loading projects...</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Projects</h1>

      {/* Create project (ALL USERS) */}
      <form onSubmit={submit} className="flex gap-2 mb-6">
        <input name="name" placeholder="Project name" className="input" required />
        <input name="description" placeholder="Description" className="input" required />
        <button className="btn">Create</button>
      </form>

      {/* Project list */}
      <div className="space-y-3">
        {projects?.map((project:any) => (
          <div
            key={project.id}
            className="border p-3 rounded bg-white shadow-sm"
          >
            <h2 className="font-semibold">{project.name}</h2>
            <p className="text-sm text-gray-600">{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
