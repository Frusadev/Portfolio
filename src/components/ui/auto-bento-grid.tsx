"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

export interface BentoItem {
  id: string | number;
  title: string;
  description?: string;
  tags?: string[];
  image?: string;
  href?: string;
  date?: string;
  className?: string;
  span?: {
    mobile?: "full" | "half";
    desktop?: "lg" | "md" | "sm" | "wide" | "tall";
  };
}

interface AutoBentoGridProps {
  items: BentoItem[];
  className?: string;
}

function getLayoutClasses(
  index: number,
  total: number,
): {
  desktop: string;
  mobile: string;
  colSpan: number;
} {
  if (total === 1) {
    return {
      desktop: "flex-1 w-full h-full",
      mobile: "col-span-2 min-h-[calc(100vh-4rem)]",
      colSpan: 1,
    };
  }

  if (total === 2) {
    return {
      desktop: "row-span-3 col-span-1",
      mobile: "col-span-2 min-h-[calc(50vh-4rem)]",
      colSpan: 1,
    };
  }

  const cycle = [
    { d: "row-span-2 col-span-2", m: "col-span-2 min-h-[300px]", colSpan: 2 },
    { d: "row-span-1 col-span-1", m: "col-span-1 min-h-[200px]", colSpan: 1 },
    { d: "row-span-1 col-span-1", m: "col-span-1 min-h-[200px]", colSpan: 1 },

    {
      d: "row-span-2 col-span-1",
      m: "col-span-1 row-span-2 min-h-[300px]",
      colSpan: 1,
    },
    { d: "row-span-1 col-span-1", m: "col-span-1 min-h-[200px]", colSpan: 1 },
    { d: "row-span-1 col-span-1", m: "col-span-1 min-h-[200px]", colSpan: 1 },

    { d: "row-span-1 col-span-2", m: "col-span-2 min-h-[250px]", colSpan: 2 },
    { d: "row-span-1 col-span-1", m: "col-span-1 min-h-[200px]", colSpan: 1 },
    { d: "row-span-1 col-span-1", m: "col-span-1 min-h-[200px]", colSpan: 1 },

    { d: "row-span-1 col-span-1", m: "col-span-1 min-h-[200px]", colSpan: 1 },
  ];

  const config = cycle[index % cycle.length];
  return {
    desktop: config.d,
    mobile: config.m,
    colSpan: config.colSpan,
  };
}

function getBackgroundStyle(index: number, item: BentoItem) {
  if (item.image && index % 5 === 0) return "image-bg";
  if (index % 3 === 0) return "dark";
  if (index % 7 === 0) return "pattern";
  return "default";
}

const COL_MIN_PX = 280;

export default function AutoBentoGrid({
  items,
  className,
}: AutoBentoGridProps) {
  const isSingle = items.length === 1;

  return (
    <div
      className={cn(
        "grid grid-cols-2 w-full h-auto gap-0 bg-background",
        !isSingle &&
          "md:grid-rows-3 md:grid-flow-col md:auto-cols-[minmax(280px,22vw)] md:h-full md:w-fit",
        isSingle && "md:flex md:flex-col md:h-full md:w-full",
        "border-l-2 md:border-l-[0.3vw] border-t-2 md:border-t-[0.3vw] border-red-950",
        className,
      )}
    >
      {items.map((item, i) => {
        const layout = getLayoutClasses(i, items.length);
        const bgType = getBackgroundStyle(i, item);

        const minWidth = layout.colSpan * COL_MIN_PX;

        const isLargeDesktop =
          layout.desktop.includes("row-span-2") ||
          layout.desktop.includes("h-full") ||
          layout.desktop.includes("col-span-2");

        const isLargeMobile =
          layout.mobile.includes("col-span-2") ||
          layout.mobile.includes("row-span-2");

        return (
          <Link
            key={item.id}
            href={item.href || "#"}
            style={{ minWidth: `${minWidth}px` }}
            className={cn(
              "group relative flex flex-col overflow-hidden border-r-2 border-b-2 md:border-r-[0.3vw] md:border-b-[0.3vw] transition-colors duration-300",
              layout.mobile,
              `md:${layout.desktop}`,
              bgType === "dark"
                ? "bg-red-950 text-[#e6dcc6] hover:bg-red-900 border-black"
                : "bg-background text-red-950 hover:bg-red-950/5 border-red-950",
              item.className,
            )}
          >
            {bgType === "image-bg" && item.image && (
              <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-30 transition-opacity grayscale group-hover:grayscale-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="relative z-10 flex flex-col justify-between flex-1 p-6 md:p-[2vw] h-full min-w-0">
              <div className="flex justify-between items-start gap-2">
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 md:gap-[0.5vw] mb-4 md:mb-[1vw] min-w-0">
                    {item.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className={cn(
                          "text-[10px] md:text-[0.7vw] uppercase tracking-wider font-bold px-2 py-1 md:px-[0.5vw] md:py-[0.25vw] border border-current whitespace-nowrap",
                          bgType === "dark"
                            ? "border-[#e6dcc6]/30"
                            : "border-red-950/30",
                        )}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {item.href && (
                  <ArrowUpRight
                    className={cn(
                      "w-5 h-5 md:w-[1.25vw] md:h-[1.25vw] shrink-0 opacity-0 group-hover:opacity-100 transition-opacity",
                      bgType === "dark" ? "text-[#e6dcc6]" : "text-red-950",
                    )}
                  />
                )}
              </div>

              <div className="mt-auto min-w-0">
                {item.date && (
                  <p className="text-xs md:text-[0.7vw] mb-2 md:mb-[0.5vw] font-mono opacity-60">
                    {item.date}
                  </p>
                )}
                <h3
                  className={cn(
                    "font-bold uppercase tracking-tight leading-none mb-2 md:mb-[0.5vw] break-words",
                    isLargeMobile ? "text-3xl" : "text-xl",
                    isLargeDesktop ? "md:text-[3vw]" : "md:text-[1.5vw]",
                    "md:[font-size:max(14px,_var(--title-size,1.5vw))]",
                  )}
                  style={{
                    fontSize: undefined,
                  }}
                >
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-sm md:text-[0.9vw] leading-relaxed opacity-80 line-clamp-3 break-words md:[font-size:max(12px,0.9vw)]">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          </Link>
        );
      })}

      <div className="col-span-1 row-span-1 min-h-[200px] border-r-2 border-b-2 md:border-r-[0.3vw] md:border-b-[0.3vw] border-red-950 p-6 flex items-center justify-center hover:bg-red-950/5 bg-background">
        <p className="font-bold text-red-950/20 rotate-45 md:text-[1vw]">END</p>
      </div>
    </div>
  );
}
