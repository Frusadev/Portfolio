"use client";

import { useMemo } from "react";
import Image from "next/image";
import { Github, ExternalLink, GitCommit, GitFork, Star, Activity } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { GithubActivityData } from "@/app/actions/github";

interface GithubActivityProps {
  data: GithubActivityData;
  className?: string;
}

export function GithubActivity({ data, className }: GithubActivityProps) {
  const {
    username,
    name,
    avatarUrl,
    totalContributions,
    publicRepos,
    followers,
    recentEvents,
    contributions,
  } = data;

  // Take the last 34 weeks (238 days) for balanced square proportions
  const displayDays = useMemo(() => {
    if (!contributions || contributions.length === 0) {
      const placeholder: { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }[] = [];
      const today = new Date();
      for (let i = 237; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        placeholder.push({
          date: d.toISOString().split("T")[0],
          count: 0,
          level: 0,
        });
      }
      return placeholder;
    }
    return contributions.slice(-238);
  }, [contributions]);

  // Group by weeks (columns of 7 days)
  const weeks = useMemo(() => {
    const cols: typeof displayDays[] = [];
    for (let i = 0; i < displayDays.length; i += 7) {
      cols.push(displayDays.slice(i, i + 7));
    }
    return cols;
  }, [displayDays]);

  const latestEvent = recentEvents && recentEvents.length > 0 ? recentEvents[0] : null;

  const getLevelBg = (level: number) => {
    switch (level) {
      case 1:
        return "bg-red-950/25 border-red-950/20";
      case 2:
        return "bg-red-950/50 border-red-950/40";
      case 3:
        return "bg-red-950/80 border-red-950/60";
      case 4:
        return "bg-red-950 border-red-950";
      default:
        return "bg-red-950/5 border-red-950/15";
    }
  };

  return (
    <div
      className={`flex flex-col justify-between h-full w-full p-3 md:p-[1.1vw] bg-background select-none overflow-hidden ${
        className || ""
      }`}
    >
      {/* Header Bar */}
      <div className="flex items-center justify-between gap-2 border-b md:border-b-[0.1vw] border-red-950/20 pb-1.5 md:pb-[0.35vw] shrink-0">
        <div className="flex items-center gap-2 md:gap-[0.5vw]">
          <div className="relative w-6 h-6 md:w-[1.6vw] md:h-[1.6vw] rounded-full overflow-hidden border-2 border-red-950 bg-red-950 text-[#e6dcc6] flex items-center justify-center shrink-0">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt={name || username}
                fill
                sizes="32px"
                className="object-cover"
              />
            ) : (
              <Github className="w-3.5 h-3.5 md:w-[1vw] md:h-[1vw]" />
            )}
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xs md:text-[0.85vw] font-black uppercase tracking-wider text-red-950 leading-tight">
                GitHub Activity
              </span>
              {/* Coffee / Brown themed live badge */}
              {/* <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-red-950/10 border border-red-950/30 text-red-950 text-[9px] md:text-[0.6vw] font-bold uppercase tracking-wider rounded-sm"> */}
              {/*   <span className="w-1.5 h-1.5 rounded-full bg-red-950 animate-pulse" /> */}
              {/*   Live */}
              {/* </span> */}
            </div>
            <span className="text-[10px] md:text-[0.65vw] font-mono text-red-950/60 leading-none">
              @{username}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 md:gap-[0.8vw]">
          <div className="hidden sm:flex items-center gap-2 text-[10px] md:text-[0.65vw] text-red-950/70 font-mono">
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3 md:w-[0.7vw] md:h-[0.7vw] opacity-70" />
              {publicRepos} repos
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <GitFork className="w-3 h-3 md:w-[0.7vw] md:h-[0.7vw] opacity-70" />
              {followers} followers
            </span>
          </div>

          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[10px] md:text-[0.7vw] font-bold text-red-950 hover:underline uppercase tracking-wider transition-opacity hover:opacity-80 shrink-0"
            title={`View @${username} on GitHub`}
          >
            <span>Profile</span>
            <ExternalLink className="w-3 h-3 md:w-[0.7vw] md:h-[0.7vw]" />
          </a>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="my-auto py-1 md:py-[0.2vw] flex flex-col justify-center overflow-hidden min-h-0">
        <div className="flex items-center justify-between text-[10px] md:text-[0.65vw] font-mono text-red-950/70 mb-1 shrink-0">
          <span className="font-bold flex items-center gap-1">
            <Activity className="w-3 h-3 md:w-[0.7vw] md:h-[0.7vw] text-red-950" />
            <span>{totalContributions.toLocaleString()} contributions</span>
          </span>
          <div className="flex items-center gap-1">
            <span className="text-[9px] md:text-[0.55vw] opacity-60">Less</span>
            <div className="w-2.5 h-2.5 md:w-[0.5vw] md:h-[0.5vw] aspect-square bg-red-950/5 border border-red-950/15" />
            <div className="w-2.5 h-2.5 md:w-[0.5vw] md:h-[0.5vw] aspect-square bg-red-950/25 border border-red-950/20" />
            <div className="w-2.5 h-2.5 md:w-[0.5vw] md:h-[0.5vw] aspect-square bg-red-950/50 border border-red-950/40" />
            <div className="w-2.5 h-2.5 md:w-[0.5vw] md:h-[0.5vw] aspect-square bg-red-950/80 border border-red-950/60" />
            <div className="w-2.5 h-2.5 md:w-[0.5vw] md:h-[0.5vw] aspect-square bg-red-950 border border-red-950" />
            <span className="text-[9px] md:text-[0.55vw] opacity-60">More</span>
          </div>
        </div>

        {/* Weeks Matrix - Guaranteed 1:1 Perfect Squares */}
        <div className="flex items-center justify-between gap-[2px] md:gap-[0.15vw] p-1 md:p-[0.25vw] bg-red-950/5 border border-red-950/20 overflow-hidden">
          {weeks.map((week, wIdx) => (
            <div
              key={wIdx}
              className="flex flex-col gap-[2px] md:gap-[0.15vw] flex-1 min-w-0"
            >
              {week.map((day, dIdx) => (
                <Tooltip key={dIdx}>
                  <TooltipTrigger asChild>
                    <div
                      className={`w-full aspect-square border transition-all duration-150 hover:scale-125 hover:z-20 cursor-pointer ${getLevelBg(
                        day.level
                      )}`}
                    />
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    className="bg-red-950 text-[#e6dcc6] text-[11px] font-mono px-2 py-1 border border-[#e6dcc6]/20 shadow-md"
                  >
                    <p className="font-bold">
                      {day.count} contribution{day.count === 1 ? "" : "s"}
                    </p>
                    <p className="text-[10px] opacity-80">{day.date}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Footer / Latest Event */}
      <div className="pt-1.5 md:pt-[0.3vw] border-t md:border-t-[0.1vw] border-red-950/20 flex items-center justify-between gap-2 shrink-0">
        {latestEvent ? (
          <div className="flex items-center gap-1.5 text-red-950 min-w-0 flex-1">
            <GitCommit className="w-3 h-3 md:w-[0.8vw] md:h-[0.8vw] shrink-0 opacity-70" />
            <span className="text-[10px] md:text-[0.7vw] font-bold shrink-0 text-red-950">
              {latestEvent.repo.replace(`${username}/`, "")}:
            </span>
            <span className="text-[10px] md:text-[0.65vw] text-red-950/70 truncate font-mono">
              {latestEvent.message}
            </span>
          </div>
        ) : (
          <div className="text-[10px] md:text-[0.65vw] text-red-950/70 font-mono">
            Active on GitHub • Building open-source software
          </div>
        )}

        <div className="text-[9px] md:text-[0.6vw] font-mono text-red-950/50 uppercase tracking-widest shrink-0">
          Recent Activity
        </div>
      </div>
    </div>
  );
}

export default GithubActivity;
