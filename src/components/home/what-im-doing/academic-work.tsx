import * as React from "react";
import { getCurrentAcademicWork } from "@/app/actions/portfolio";

export async function AcademicWork() {
  const work = await getCurrentAcademicWork();

  return (
    <div className="rounded-3xl bg-surface/40 p-8 sm:p-12 md:p-14 flex flex-col md:flex-row md:items-center justify-between gap-8 md:gap-16">
      <div className="flex flex-col max-w-3xl">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono text-text-muted tracking-wide">
            Current academic occupation
          </span>
        </div>

        <h3 className="text-2xl sm:text-3xl md:text-4xl font-normal text-text-primary tracking-tight leading-snug mt-4">
          {work.title}
        </h3>

        {work.description && (
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed mt-4">
            {work.description}
          </p>
        )}
      </div>

      <div className="flex flex-wrap md:flex-col items-start md:items-end gap-3 flex-shrink-0">
        {work.institution && (
          <span className="text-xs sm:text-sm font-mono text-accent-primary bg-surface_elevated/90 px-4 py-2 rounded-full">
            {work.institution}
          </span>
        )}
        {work.field && (
          <span className="text-xs sm:text-sm font-mono text-text-muted bg-surface_elevated/60 px-4 py-2 rounded-full">
            {work.field}
          </span>
        )}
      </div>
    </div>
  );
}

export default AcademicWork;
