import { getProject } from "@/app/actions/portfolio";
import ProjectForm from "@/components/admin/project-form";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: PageProps) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Edit Project</h1>
      <ProjectForm project={project} />
    </div>
  );
}
