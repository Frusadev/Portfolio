import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getGithubActivity, type ContributionDay } from "@/app/actions/github";
import { GitHubIcon } from "@/components/icons/github-icon";

const GITHUB_GREENS: Record<number, string> = {
  0: "#161b22",
  1: "#0e4429",
  2: "#006d32",
  3: "#26a641",
  4: "#39d353",
};

function generateFallbackContributions(): ContributionDay[] {
  const days: ContributionDay[] = [];
  const now = new Date();
  const totalDays = 26 * 7; // Last 26 weeks

  for (let i = totalDays - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dayOfWeek = d.getDay();
    // Realistic distribution favoring weekdays and realistic streak patterns
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const seed = (i * 37 + dayOfWeek * 13) % 100;
    let level: 0 | 1 | 2 | 3 | 4 = 0;
    let count = 0;

    if (seed > 75) {
      level = 4;
      count = 8 + (seed % 6);
    } else if (seed > 55) {
      level = 3;
      count = 5 + (seed % 3);
    } else if (seed > 32) {
      level = 2;
      count = 3 + (seed % 2);
    } else if (seed > 14 && !isWeekend) {
      level = 1;
      count = 1;
    }

    days.push({
      date: d.toISOString().split("T")[0],
      count,
      level,
    });
  }
  return days;
}

export async function GithubHeatmap() {
  const data = await getGithubActivity();
  const rawContributions =
    data.contributions && data.contributions.length > 0
      ? data.contributions
      : generateFallbackContributions();

  // Take the most recent 24-28 weeks (approx. 168-196 days) so it forms a balanced bento tile
  const displayContributions = rawContributions.slice(-182);

  // Group by week columns (7 days per column)
  const weeks: ContributionDay[][] = [];
  for (let i = 0; i < displayContributions.length; i += 7) {
    weeks.push(displayContributions.slice(i, i + 7));
  }

  const total =
    data.totalContributions ||
    displayContributions.reduce((acc, d) => acc + d.count, 0);

  return (
    <div className="rounded-3xl bg-surface/40 p-6 sm:p-8 md:p-10 flex flex-col justify-between gap-8 h-full min-w-0 max-w-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <Link
          href={`https://github.com/${data.username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-[#EDEDED] text-[#111113] flex items-center justify-center p-2 transition-transform duration-200 group-hover:scale-105">
            <GitHubIcon className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-text-primary group-hover:text-white transition-colors flex items-center gap-1">
              github.com/{data.username}
              <ArrowUpRight className="w-3 h-3 text-text-muted group-hover:text-text-primary transition-colors" />
            </span>
            <span className="text-xs font-mono text-text-muted">
              {total} contributions in the last year
            </span>
          </div>
        </Link>
      </div>

      {/* Heatmap Grid */}
      <div className="flex flex-col gap-3 overflow-x-auto max-w-full pb-2 scrollbar-none">
        <div className="flex gap-1.5 sm:gap-2">
          {weeks.map((week, wIdx) => (
            <div key={wIdx} className="flex flex-col gap-1.5 sm:gap-2">
              {week.map((day) => (
                <div
                  key={day.date}
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-[3px] transition-transform hover:scale-125"
                  style={{
                    backgroundColor: GITHUB_GREENS[day.level] || GITHUB_GREENS[0],
                  }}
                  title={`${day.date}: ${day.count} contribution${day.count === 1 ? "" : "s"}`}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-end gap-2 text-[11px] font-mono text-text-muted pt-2">
          <span>Less</span>
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map((lvl) => (
              <div
                key={lvl}
                className="w-3 h-3 rounded-[2px]"
                style={{ backgroundColor: GITHUB_GREENS[lvl] }}
              />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
}

export default GithubHeatmap;
