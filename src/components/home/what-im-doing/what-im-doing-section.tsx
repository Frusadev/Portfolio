import * as React from "react";
import { GithubHeatmap } from "./github-heatmap";
import { LatestProjects } from "./latest-projects";
import { LatestArticles } from "./latest-articles";
import { AcademicWork } from "./academic-work";
import { cn } from "@/lib/utils";

interface WhatImDoingSectionProps {
  className?: string;
}

export function WhatImDoingSection({ className }: WhatImDoingSectionProps) {
  return (
    <section
      id="interactions"
      aria-label="What I'm doing and interactions"
      className={cn(
        "relative w-full min-h-0 md:min-h-[50vh] flex flex-col justify-start px-6 sm:px-12 md:px-16 lg:px-24 select-none py-16 sm:py-24 md:py-36 lg:py-40",
        className
      )}
    >
      <div className="max-w-7xl w-full flex flex-col gap-12 sm:gap-16 md:gap-20">
        {/* Bento Row 1: GitHub Contribution Heatmap (Left) + 3x3 Projects Grid (Right) */}
        <div id="work" className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch scroll-mt-28">
          <GithubHeatmap />
          <LatestProjects />
        </div>

        {/* Bento Row 2: Latest Articles & Essays */}
        <div id="blog" className="scroll-mt-28">
          <LatestArticles />
        </div>

        {/* Bento Row 3: Current Academic Occupation */}
        <AcademicWork />
      </div>
    </section>
  );
}

export default WhatImDoingSection;
