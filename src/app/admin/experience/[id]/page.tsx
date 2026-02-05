import { notFound } from "next/navigation";
import { db } from "@/core/db/setup";
import { experience } from "@/core/db/schemas/portfolio/schemas";
import { eq } from "drizzle-orm";
import { ExperienceForm } from "@/components/admin/experience-form";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditExperiencePage({ params }: PageProps) {
  const { id } = await params;

  const result = await db.query.experience.findFirst({
    where: eq(experience.id, id),
  });

  if (!result) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black uppercase tracking-tighter text-red-950">
        Edit Experience
      </h1>
      <ExperienceForm initialData={result} />
    </div>
  );
}
