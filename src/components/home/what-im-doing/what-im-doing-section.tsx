import * as React from "react";
import { LatestProjects } from "./latest-projects";
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
        "relative w-full min-h-[50vh] flex flex-col justify-start px-6 sm:px-12 md:px-16 lg:px-24 select-none py-24 md:py-32",
        className
      )}
    >
      <div className="max-w-7xl w-full flex flex-col gap-16">
        {/* Subsection 1: Latest Projects */}
        <LatestProjects />

        {/* Future subsections: Academic work, Spotify, Recent blog posts */}
      </div>
    </section>
  );
}

export default WhatImDoingSection;
