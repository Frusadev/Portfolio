import * as React from "react";
import { getLatestProjects } from "@/app/actions/portfolio";
import { ProjectCard } from "./project-card";

export async function LatestProjects() {
  const projects = await getLatestProjects(3);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <span className="text-xs font-mono text-text-muted tracking-wide">
          Latest projects
        </span>
      </div>

      <div className="grid grid-cols-3 gap-8 sm:gap-12 md:gap-16 justify-items-start max-w-2xl">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

export default LatestProjects;
