import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getLatestProjects } from "@/app/actions/portfolio";
import { ProjectCard } from "./project-card";

export async function LatestProjects() {
  const projects = await getLatestProjects(9);

  return (
    <div className="rounded-3xl bg-surface/40 p-6 sm:p-8 md:p-10 flex flex-col justify-between gap-8 h-full min-w-0 max-w-full">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono text-text-muted tracking-wide">
          Latest projects
        </span>
        <Link
          href="/projects"
          className="text-xs font-mono text-text-muted hover:text-text-primary transition-colors flex items-center gap-1 group"
        >
          <span>view all projects</span>
          <ArrowUpRight className="w-3 h-3 text-text-muted group-hover:text-text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-y-7 gap-x-4 sm:gap-x-8 sm:gap-y-9 justify-items-center">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </div>
  );
}

export default LatestProjects;
