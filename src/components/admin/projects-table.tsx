"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteProject, updateProject } from "@/app/actions/portfolio";
import { Edit, Trash2, Star, Github, Globe } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ProjectsTable({ projects }: { projects: any[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    
    setLoading(id);
    const res = await deleteProject(id);
    setLoading(null);

    if (res.success) {
      toast.success("Project deleted");
      router.refresh();
    } else {
      toast.error("Failed to delete project");
    }
  };

  const handleToggleFeatured = async (id: string, current: boolean) => {
    setLoading(id);
    const res = await updateProject(id, { featured: !current });
    setLoading(null);

    if (res.success) {
      toast.success(current ? "Project unfeatured" : "Project featured");
      router.refresh();
    } else {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="border-4 border-red-950 bg-background overflow-hidden">
      <div className="grid grid-cols-[1fr_auto] md:grid-cols-[2fr_1fr_1fr_auto] gap-4 p-4 bg-red-950 text-[#e6dcc6] font-bold uppercase tracking-wider text-sm">
        <div>Project</div>
        <div className="hidden md:block">Links</div>
        <div className="hidden md:block">Featured</div>
        <div>Actions</div>
      </div>
      
      {projects.length === 0 ? (
        <div className="p-8 text-center opacity-50 font-mono">No projects found.</div>
      ) : (
        projects.map((project) => (
          <div key={project.id} className="grid grid-cols-[1fr_auto] md:grid-cols-[2fr_1fr_1fr_auto] gap-4 p-4 border-b-2 border-red-950 last:border-0 items-center hover:bg-red-950/5 transition-colors">
            <div>
              <div className="font-bold truncate pr-4">{project.title}</div>
              <div className="text-xs opacity-70 truncate">{project.description}</div>
            </div>
            <div className="hidden md:flex gap-2">
              {project.githubUrl && <Github size={16} className="opacity-50" />}
              {project.url && <Globe size={16} className="opacity-50" />}
            </div>
            <div className="hidden md:block">
              {project.featured && (
                <span className="inline-flex items-center gap-1.5 px-2 py-1 text-xs uppercase font-bold border bg-yellow-100 text-yellow-800 border-yellow-800">
                  <Star size={12} fill="currentColor" />
                  Featured
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => handleToggleFeatured(project.id, project.featured)}
                disabled={loading === project.id}
                className={`p-2 border-2 border-red-950 transition-colors disabled:opacity-50 ${project.featured ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' : 'text-red-950 hover:bg-red-950 hover:text-[#e6dcc6]'}`}
                title={project.featured ? "Unfeature" : "Feature"}
              >
                <Star size={16} fill={project.featured ? "currentColor" : "none"} />
              </button>
              <Link 
                href={`/admin/projects/${project.id}`}
                className="p-2 border-2 border-red-950 text-red-950 hover:bg-red-950 hover:text-[#e6dcc6] transition-colors"
                title="Edit"
              >
                <Edit size={16} />
              </Link>
              <button 
                onClick={() => handleDelete(project.id)}
                disabled={loading === project.id}
                className="p-2 border-2 border-red-950 text-red-950 hover:bg-red-500 hover:border-red-500 hover:text-white transition-colors disabled:opacity-50"
                title="Delete"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
