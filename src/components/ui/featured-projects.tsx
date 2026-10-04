import Link from "next/link";
import { ArrowUpRight, Github, FolderGit2 } from "lucide-react";

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
      <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-red-950 text-[#e6dcc6]">
        <FolderGit2 className="w-12 h-12 md:w-[4vw] md:h-[4vw] mb-4 opacity-50" />
        <h3 className="text-xl md:text-[2vw] font-black uppercase tracking-widest">No Projects</h3>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col bg-red-950 text-[#e6dcc6] relative overflow-hidden group/container p-4 md:p-[1.5vw]">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #e6dcc6 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
      
      <div className="flex items-center justify-between mb-4 md:mb-[1.5vw] z-10 border-b-2 border-[#e6dcc6]/20 pb-2 md:pb-[0.5vw]">
        <h3 className="text-2xl md:text-[2vw] font-black uppercase tracking-tighter flex items-center gap-2">
          <FolderGit2 className="w-6 h-6 md:w-[1.8vw] md:h-[1.8vw]" /> Featured
        </h3>
      </div>
      
      <div className="flex-1 overflow-y-auto pr-2 space-y-4 md:space-y-[1.2vw] custom-scrollbar z-10">
        {projects.map((project, idx) => (
          <div 
            key={project.id} 
            className="group relative border-2 md:border-[0.2vw] border-[#e6dcc6]/30 hover:border-[#e6dcc6] bg-background text-red-950 p-4 md:p-[1.2vw] transition-all duration-300 hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#e6dcc6] md:hover:shadow-[0.4vw_0.4vw_0_0_#e6dcc6]"
          >
            <div className="absolute top-0 right-0 bg-[#e6dcc6] text-red-950 text-xs md:text-[0.7vw] font-bold px-2 py-1 md:px-[0.5vw] md:py-[0.2vw] border-b-2 border-l-2 md:border-b-[0.2vw] md:border-l-[0.2vw] border-red-950">
              0{idx + 1}
            </div>
            
            <div className="flex justify-between items-start mb-2 md:mb-[0.5vw] pr-8 md:pr-[2vw]">
              <h4 className="font-black text-xl md:text-[1.4vw] leading-tight uppercase tracking-tight">
                {project.title}
              </h4>
            </div>
            
            <p className="text-sm md:text-[0.9vw] opacity-80 mb-4 md:mb-[1.5vw] line-clamp-2 font-medium">
              {project.description}
            </p>
            
            <div className="flex justify-between items-end mt-auto">
              {project.technologies && project.technologies.length > 0 ? (
                <div className="flex flex-wrap gap-1.5 md:gap-[0.4vw] max-w-[70%]">
                  {project.technologies.slice(0, 3).map((tech, i) => (
                    <span 
                      key={i} 
                      className="text-[10px] md:text-[0.7vw] font-bold uppercase tracking-wider px-2 py-1 md:px-[0.5vw] md:py-[0.2vw] bg-red-950/10 text-red-950 rounded-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              ) : <div />}
              
              <div className="flex gap-2 md:gap-[0.5vw]">
                {project.githubUrl && (
                  <Link href={project.githubUrl} target="_blank" className="p-2 md:p-[0.5vw] bg-red-950 text-[#e6dcc6] hover:bg-red-900 transition-colors border-2 md:border-[0.2vw] border-red-950">
                    <Github className="w-4 h-4 md:w-[1.2vw] md:h-[1.2vw]" />
                  </Link>
                )}
                {project.url && (
                  <Link href={project.url} target="_blank" className="p-2 md:p-[0.5vw] bg-red-950 text-[#e6dcc6] hover:bg-red-900 transition-colors border-2 md:border-[0.2vw] border-red-950">
                    <ArrowUpRight className="w-4 h-4 md:w-[1.2vw] md:h-[1.2vw]" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
