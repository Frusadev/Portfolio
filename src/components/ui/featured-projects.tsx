import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";

type Project = {
  id: string;
  title: string;
  description: string;
  content: string | null;
  url: string | null;
  githubUrl: string | null;
  image: string | null;
  technologies: string[] | null;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export function FeaturedProjects({ projects }: { projects: Project[] }) {
  if (!projects || projects.length === 0) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-4">
        <h3 className="text-xl md:text-[2vw] font-bold text-red-950 mb-2">Featured Work</h3>
        <p className="text-sm md:text-[1vw] text-red-900/60">No projects to show yet.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col p-4 md:p-[1.5vw]">
      <div className="flex items-center justify-between mb-4 md:mb-[1vw]">
        <h3 className="text-xl md:text-[1.8vw] font-black uppercase tracking-tighter text-red-950">
          Featured Work
        </h3>
      </div>
      <div className="flex-1 overflow-y-auto pr-2 space-y-4 md:space-y-[1vw] custom-scrollbar">
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="group border-2 md:border-[0.2vw] border-red-950/20 hover:border-red-950 p-3 md:p-[1vw] transition-colors flex flex-col bg-red-950/5 hover:bg-red-950 text-red-950 hover:text-[#e6dcc6]"
          >
            <div className="flex justify-between items-start mb-2 md:mb-[0.5vw]">
              <h4 className="font-bold text-lg md:text-[1.2vw] leading-tight group-hover:text-[#e6dcc6]">
                {project.title}
              </h4>
              <div className="flex gap-2">
                {project.githubUrl && (
                  <Link href={project.githubUrl} target="_blank" className="opacity-70 hover:opacity-100">
                    <Github className="w-4 h-4 md:w-[1.2vw] md:h-[1.2vw]" />
                  </Link>
                )}
                {project.url && (
                  <Link href={project.url} target="_blank" className="opacity-70 hover:opacity-100">
                    <ArrowUpRight className="w-4 h-4 md:w-[1.2vw] md:h-[1.2vw]" />
                  </Link>
                )}
              </div>
            </div>
            <p className="text-sm md:text-[0.9vw] opacity-80 mb-3 md:mb-[1vw] line-clamp-2">
              {project.description}
            </p>
            {project.technologies && project.technologies.length > 0 && (
              <div className="flex flex-wrap gap-1 md:gap-[0.4vw] mt-auto">
                {project.technologies.slice(0, 3).map((tech, i) => (
                  <span 
                    key={i} 
                    className="text-[10px] md:text-[0.7vw] font-bold uppercase tracking-wider px-1.5 py-0.5 md:px-[0.5vw] md:py-[0.2vw] bg-red-950/10 group-hover:bg-[#e6dcc6]/20 rounded-sm"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="text-[10px] md:text-[0.7vw] font-bold uppercase tracking-wider px-1.5 py-0.5 md:px-[0.5vw] md:py-[0.2vw] bg-red-950/10 group-hover:bg-[#e6dcc6]/20 rounded-sm">
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
