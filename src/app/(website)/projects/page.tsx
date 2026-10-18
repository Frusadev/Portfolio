import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import { getProjects } from "@/app/actions/portfolio";
import { GitHubIcon } from "@/components/icons/github-icon";

export const metadata = {
  title: "Projects — Daniel Ametsowou",
  description: "Things built, explored, and brought to life with imagination and curiosity.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="min-h-screen w-full bg-background text-foreground px-6 sm:px-12 md:px-16 lg:px-24 py-28 md:py-36 select-none">
      <div className="max-w-7xl w-full mx-auto flex flex-col gap-16 md:gap-20">
        {/* Page Hero */}
        <div className="flex flex-col max-w-3xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-text-primary">
            Projects
          </h1>
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed mt-4">
            Things I&apos;ve built, explored, and brought to life. Driven by wild imagination, deep curiosity, and the simple joy of creating.
          </p>
        </div>

        {/* Projects Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {projects.map((project) => {
            const primaryLink = project.url || project.githubUrl || "#";
            const hasLink = Boolean(project.url || project.githubUrl);

            return (
              <div
                key={project.id}
                className="group rounded-3xl bg-surface/40 hover:bg-surface/70 transition-all duration-300 p-8 sm:p-10 flex flex-col justify-between gap-8"
              >
                <div className="flex flex-col gap-6">
                  {/* Icon Tile */}
                  <div
                    className={`w-18 h-18 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center p-4 transition-transform duration-300 group-hover:scale-105 shadow-md shadow-black/30 ${
                      project.logo
                        ? "bg-surface_elevated/90"
                        : "bg-[#EDEDED] text-[#111113]"
                    }`}
                  >
                    {project.logo ? (
                      <img
                        src={project.logo}
                        alt={project.title}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <GitHubIcon className="w-10 h-10 sm:w-11 sm:h-11" />
                    )}
                  </div>

                  {/* Title & Description */}
                  <div className="flex flex-col gap-2.5">
                    <h2 className="text-xl sm:text-2xl font-normal text-text-primary group-hover:text-white transition-colors">
                      {project.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-[11px] font-mono text-text-muted bg-surface_elevated/70 px-2.5 py-1 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Actions / Links */}
                <div className="flex items-center gap-4 pt-2">
                  {project.url && (
                    <Link
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-accent-primary hover:text-white transition-colors inline-flex items-center gap-1"
                    >
                      Visit project <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                  {project.githubUrl && (
                    <Link
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-text-muted hover:text-text-primary transition-colors inline-flex items-center gap-1.5"
                    >
                      <Github className="w-3.5 h-3.5" />
                      Source
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
