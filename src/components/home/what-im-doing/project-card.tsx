"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { GitHubIcon } from "@/components/icons/github-icon";

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  url: string | null;
  githubUrl: string | null;
  image: string | null;
  logo: string | null;
  technologies: string[] | null;
}

export function ProjectCard({ project }: { project: ProjectItem }) {
  const primaryLink = project.url || project.githubUrl || "#";
  const hasLink = Boolean(project.url || project.githubUrl);

  return (
    <div className="relative group flex flex-col items-center">
      {/* Solid Tooltip Popover on Hover */}
      <div
        className="absolute bottom-full mb-3.5 left-1/2 -translate-x-1/2 w-64 sm:w-72 p-4 rounded-2xl z-40 opacity-0 translate-y-1.5 scale-95 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-200 ease-out bg-[#141416] shadow-2xl shadow-black/90"
      >
        <div className="flex items-center justify-between gap-2">
          <h4 className="text-sm font-medium text-text-primary truncate">
            {project.title}
          </h4>
          {hasLink && (
            <Link
              href={primaryLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-text-primary transition-colors p-1"
              aria-label={`Visit ${project.title}`}
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>

        <p className="text-xs text-text-secondary leading-relaxed mt-1.5 line-clamp-3">
          {project.description}
        </p>

        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="text-[10px] text-text-muted bg-surface/80 px-2 py-0.5 rounded-full font-mono"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Main Trigger: Icon-Centric with Title Underneath */}
      <Link
        href={primaryLink}
        target={hasLink ? "_blank" : undefined}
        rel={hasLink ? "noopener noreferrer" : undefined}
        className="flex flex-col items-center group/btn focus:outline-none"
      >
        <div
          className={`w-20 h-20 sm:w-22 sm:h-22 rounded-2xl flex items-center justify-center p-4 transition-all duration-300 group-hover:scale-105 shadow-lg shadow-black/30 ${
            project.logo
              ? "bg-surface_elevated/90 group-hover:bg-surface_elevated"
              : "bg-[#EDEDED] text-[#111113] group-hover:bg-white"
          }`}
        >
          {project.logo ? (
            <img
              src={project.logo}
              alt={project.title}
              className="w-full h-full object-contain"
            />
          ) : (
            <GitHubIcon className="w-11 h-11 sm:w-12 sm:h-12 transition-transform duration-300 group-hover:scale-105" />
          )}
        </div>
        <span className="text-xs md:text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors mt-3 text-center max-w-[130px] truncate">
          {project.title}
        </span>
      </Link>
    </div>
  );
}

export default ProjectCard;
