import { getExperience } from "@/app/actions/portfolio";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { ExperienceTable } from "@/components/admin/experience-table";

export const dynamic = "force-dynamic";

export default async function AdminExperiencePage() {
  const experience = await getExperience();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-black uppercase tracking-tighter text-red-950">
          Experience
        </h1>
        <Button asChild className="bg-red-950 text-[#e6dcc6] hover:bg-red-900 rounded-none border-2 border-red-950 shadow-[4px_4px_0px_0px_#450a0a]">
          <Link href="/admin/experience/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Experience
          </Link>
        </Button>
      </div>

      <ExperienceTable experience={experience} />
    </div>
  );
}
