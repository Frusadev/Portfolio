import * as React from "react";
import { getLatestProjects } from "@/app/actions/portfolio";
import { ProjectCard } from "./project-card";

export async function LatestProjects() {
  const projects = await getLatestProjects(9);

  return (
    <div className="rounded-3xl bg-surface/40 p-8 sm:p-10 flex flex-col justify-between gap-8 h-full">
      <div className="flex items-center">
        <span className="text-xs font-mono text-text-muted tracking-wide">
          Latest projects
        </span>
      </div>

      <div className="grid grid-cols-3 gap-y-7 gap-x-4 sm:gap-x-8 sm:gap-y-9 justify-items-center">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

export default LatestProjects;
