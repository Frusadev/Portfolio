import { notFound } from "next/navigation";
import { db } from "@/core/db/setup";
import { projects } from "@/core/db/schemas/portfolio/schemas";
import { eq } from "drizzle-orm";
import { ProjectForm } from "@/components/admin/project-form";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: PageProps) {
  const { id } = await params;

  const project = await db.query.projects.findFirst({
    where: eq(projects.id, id),
  });

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black uppercase tracking-tighter text-red-950">
        Edit Project
      </h1>
      <ProjectForm initialData={project} />
    </div>
  );
}
