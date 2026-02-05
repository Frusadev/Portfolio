import { ExperienceForm } from "@/components/admin/experience-form";

export default function NewExperiencePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black uppercase tracking-tighter text-red-950">
        New Experience
      </h1>
      <ExperienceForm />
    </div>
  );
}
