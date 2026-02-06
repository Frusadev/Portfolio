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
  // Fallback if not calculated
  span?: {
    mobile?: "full" | "half";
    desktop?: "lg" | "md" | "sm" | "wide" | "tall";
  };
}

interface AutoBentoGridProps {
  items: BentoItem[];
  className?: string;
}

function getLayoutClasses(index: number, total: number) {
  // Special cases for small numbers of items to fill viewport
  if (total === 1) {
    return { 
      desktop: "flex-1 w-full h-full min-w-[calc(100vw-17rem)]", // Full height, wide (account for sidebar + safety)
      mobile: "col-span-2 min-h-[calc(100vh-4rem)]" // Fill mobile screen
    };
  }
  
  if (total === 2) {
    // Two columns spanning full height
    return { 
      desktop: "row-span-3 col-span-1 min-w-[300px]", 
      mobile: "col-span-2 min-h-[calc(50vh-4rem)]" // 50% of viewport minus header (approx)
    };
  }

  // A simple pseudo-random cycle that feels varied
  const cycle = [
    // 2x2 block
    { d: "row-span-2 col-span-2", m: "col-span-2 min-h-[300px]" }, 
    // Fill the gap of 3rd row with 1x1 items or pair them
    { d: "row-span-1 col-span-1", m: "col-span-1 min-h-[200px]" },
    { d: "row-span-1 col-span-1", m: "col-span-1 min-h-[200px]" },
    
    // Tall block sequence
    { d: "row-span-2 col-span-1", m: "col-span-1 row-span-2 min-h-[300px]" },
    { d: "row-span-1 col-span-1", m: "col-span-1 min-h-[200px]" },
    { d: "row-span-1 col-span-1", m: "col-span-1 min-h-[200px]" },

    // Wide block sequence
    { d: "row-span-1 col-span-2", m: "col-span-2 min-h-[250px]" },
    { d: "row-span-1 col-span-1", m: "col-span-1 min-h-[200px]" },
    { d: "row-span-1 col-span-1", m: "col-span-1 min-h-[200px]" },

    // Standard filler
    { d: "row-span-1 col-span-1", m: "col-span-1 min-h-[200px]" },
  ];

  const config = cycle[index % cycle.length];
  return {
    desktop: config.d,
    mobile: config.m,
  };
}

// Background styling logic dependent on index and content
function getBackgroundStyle(index: number, item: BentoItem) {
  if (item.image && (index % 5 === 0)) {
    return "image-bg";
  }
  if (index % 3 === 0) {
    return "dark"; // Accent background
  }
  if (index % 7 === 0) {
    return "pattern"; // Could be a texture
  }
  return "default";
}

export default function AutoBentoGrid({ items, className }: AutoBentoGridProps) {
  const isSingle = items.length === 1;
  
  // Desktop: Fixed height container (h-full), grid-flow-col, 3 rows
  // Mobile: Auto height, grid-cols-2
  return (
    <div
      className={cn(
        // Mobile Layout
        "grid grid-cols-2 w-full h-auto gap-0 bg-background",
         // Desktop Layout - assuming parent controls scroll
        !isSingle && "md:grid-rows-3 md:grid-flow-col md:auto-cols-[max(300px,22vw)] md:h-full md:w-fit",
        isSingle && "md:flex md:flex-col md:h-full md:w-full", // Flex grow for single item to ensure full coverage
        // Borders
        "border-l-2 md:border-l-[0.3vw] border-t-2 md:border-t-[0.3vw] border-red-950",
        className
      )}
    >
      {items.map((item, i) => {
        const layout = getLayoutClasses(i, items.length);
        const bgType = getBackgroundStyle(i, item);
        
        return (
          <Link
            key={item.id}
            href={item.href || "#"}
            className={cn(
              "group relative flex flex-col overflow-hidden border-r-2 border-b-2 md:border-r-[0.3vw] md:border-b-[0.3vw] transition-colors duration-300",
              layout.mobile,
              `md:${layout.desktop}`,
              bgType === "dark" 
                ? "bg-red-950 text-[#e6dcc6] hover:bg-red-900 border-black" 
                : "bg-background text-red-950 hover:bg-red-950/5 border-red-950",
              item.className
            )}
          >
            {/* Background Image Logic */}
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

            {/* Content Container */}
            <div className="relative z-10 flex flex-col justify-between flex-1 p-6 md:p-[2vw] h-full">
              
              {/* Top Section */}
              <div className="flex justify-between items-start">
                 {item.tags && item.tags.length > 0 && (
                     <div className="flex flex-wrap gap-2 md:gap-[0.5vw] mb-4 md:mb-[1vw]">
                         {item.tags.slice(0, 2).map(tag => (
                             <span key={tag} className={cn(
                                 "text-[10px] md:text-[0.7vw] uppercase tracking-wider font-bold px-2 py-1 md:px-[0.5vw] md:py-[0.25vw] border border-current",
                                 bgType==="dark" ? "border-[#e6dcc6]/30" : "border-red-950/30"
                             )}>
                                 {tag}
                             </span>
                         ))}
                     </div>
                 )}
                 {item.href && (
                        <ArrowUpRight className={cn(
                            "w-5 h-5 md:w-[1.25vw] md:h-[1.25vw] opacity-0 group-hover:opacity-100 transition-opacity",
                             bgType === "dark" ? "text-[#e6dcc6]" : "text-red-950"
                        )} />
                 )}
              </div>

              {/* Main Text */}
              <div className="mt-auto">
                 {item.date && (
                     <p className={cn(
                         "text-xs md:text-[0.7vw] mb-2 md:mb-[0.5vw] font-mono opacity-60",
                     )}>
                         {item.date}
                     </p>
                 )}
                 <h3 className={cn(
                     "font-bold uppercase tracking-tight leading-none mb-2 md:mb-[0.5vw]",
                     // Mobile sizing based on mobile layout span
                     (layout.mobile.includes("col-span-2") || layout.mobile.includes("row-span-2")) ? "text-3xl" : "text-xl",
                     // Desktop sizing based on desktop layout span
                     (layout.desktop.includes("row-span-2") || layout.desktop.includes("h-full")) ? "md:text-[3vw]" : "md:text-[1.5vw]"
                 )}>
                    {item.title}
                 </h3>
                 {item.description && (
                     <p className={cn(
                         "text-sm md:text-[0.9vw] leading-relaxed opacity-80 line-clamp-3",
                          // Hide description on smallest boxes if needed, or truncate more
                     )}>
                         {item.description}
                     </p>
                 )}
              </div>
            </div>
          </Link>
        );
      })}
      
      {/* Decorative End Filler to ensure grid looks complete if needed */}
       <div className="col-span-1 row-span-1 min-h-[200px] border-r-2 border-b-2 md:border-r-[0.3vw] md:border-b-[0.3vw] border-red-950 p-6 flex items-center justify-center hover:bg-red-950/5 bg-background">
          <p className="font-bold text-red-950/20 rotate-45 md:text-[1vw]">END</p>
        </div>
    </div>
  );
}
