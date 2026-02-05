import { getProjects } from "@/app/actions/portfolio";
import AutoBentoGrid, { BentoItem } from "@/components/ui/auto-bento-grid";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await getProjects();

  const items: BentoItem[] = projects.map((project) => ({
    id: project.id,
    title: project.title,
    description: project.description,
    href: project.url || project.githubUrl || "#",
    tags: project.technologies || [],
    image: project.image || undefined,
    date: project.createdAt ? new Date(project.createdAt).getFullYear().toString() : undefined,
  }));

  // Ensure items is treated as BentoItem[] even if empty, preventing typescript errors with the component
  const displayItems = items;

  return (
    <div className="md:h-full w-full md:inline-block md:min-w-full bg-background">
       <div className="flex flex-col w-full h-auto md:h-full md:w-fit">
          <AutoBentoGrid items={displayItems} />
       </div>
    </div>
  );
}
