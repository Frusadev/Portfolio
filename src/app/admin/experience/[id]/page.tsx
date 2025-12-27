import { getExperienceById } from "@/app/actions/portfolio";
import ExperienceForm from "@/components/admin/experience-form";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditExperiencePage({ params }: PageProps) {
  const { id } = await params;
  const experience = await getExperienceById(id);

  if (!experience) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Edit Experience</h1>
      <ExperienceForm experience={experience} />
    </div>
  );
}
