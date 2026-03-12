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

// ─── Types ────────────────────────────────────────────────────────────────────

interface CellLayout {
  colSpan: number;
  rowSpan: number;
}

interface PlacedCell extends CellLayout {
  colStart: number; // 1-indexed
  rowStart: number; // 1-indexed
}

// ─── Band definitions ─────────────────────────────────────────────────────────
// The grid has ROWS fixed sub-rows and grows horizontally (columns expand).
// 6 sub-rows = 3 visual rows. A normal item spans 2 sub-rows, a "half" item
// spans 1 sub-row. Every band must fill exactly ROWS sub-rows per column used.
//
// Band A: hero(2col×4row) + 2 smalls below
// Band B: 3 equal items stacked (1 column)
// Band C: 1 normal + 2 halves + 1 normal (1 column)
// Band D: wide top + 2 smalls middle + wide bottom (2 columns)
// Band E: 1 tall + 3 halves (1 column)

const ROWS = 6;

const BANDS: CellLayout[][] = [
  // A — hero pattern (2 columns)
  [
    { colSpan: 2, rowSpan: 4 },
    { colSpan: 1, rowSpan: 2 },
    { colSpan: 1, rowSpan: 2 },
  ],
  // B — standard column (1 column, 3 items)
  [
    { colSpan: 1, rowSpan: 2 },
    { colSpan: 1, rowSpan: 2 },
    { colSpan: 1, rowSpan: 2 },
  ],
  // C — half items column (1 column, 4 items)
  [
    { colSpan: 1, rowSpan: 2 },
    { colSpan: 1, rowSpan: 1 },
    { colSpan: 1, rowSpan: 1 },
    { colSpan: 1, rowSpan: 2 },
  ],
  // D — wide blocks (2 columns, 4 items)
  [
    { colSpan: 2, rowSpan: 2 },
    { colSpan: 1, rowSpan: 2 },
    { colSpan: 1, rowSpan: 2 },
    { colSpan: 2, rowSpan: 2 },
  ],
  // E — tall + halves (1 column, 4 items)
  [
    { colSpan: 1, rowSpan: 3 },
    { colSpan: 1, rowSpan: 1 },
    { colSpan: 1, rowSpan: 1 },
    { colSpan: 1, rowSpan: 1 },
  ],
];

const BAND_CYCLE = [0, 1, 2, 3, 1, 4]; // A B C D B E → repeat

// ─── Placement algorithm ──────────────────────────────────────────────────────
//
// The grid has a fixed number of ROWS and grows horizontally. We scan
// column-first (left → right), then row (top → bottom within each column)
// to find the first position where a cell's colSpan × rowSpan block fits
// without exceeding ROWS.

function placeCells(total: number): PlacedCell[] {
  const layouts: CellLayout[] = [];
  let bandCycleIndex = 0;

  while (layouts.length < total) {
    const band = BANDS[BAND_CYCLE[bandCycleIndex % BAND_CYCLE.length]];
    const remaining = total - layouts.length;
    const slots = band.slice(0, remaining);
    for (const s of slots) layouts.push(s);
    bandCycleIndex++;
  }

  const occupied = new Set<string>();
  const placed: PlacedCell[] = [];

  function isOccupied(c: number, r: number) {
    return occupied.has(`${c},${r}`);
  }

  function occupy(c: number, r: number, cs: number, rs: number) {
    for (let dc = 0; dc < cs; dc++)
      for (let dr = 0; dr < rs; dr++)
        occupied.add(`${c + dc},${r + dr}`);
  }

  // Scan column-first: for each column try every valid row within ROWS,
  // then move to the next column. This ensures items fill vertically
  // within a column before creating new columns (horizontal growth).
  function findNextFree(cs: number, rs: number): [number, number] {
    let col = 1;
    while (true) {
      for (let row = 1; row <= ROWS - rs + 1; row++) {
        let fits = true;
        outer: for (let dc = 0; dc < cs; dc++) {
          for (let dr = 0; dr < rs; dr++) {
            if (isOccupied(col + dc, row + dr)) { fits = false; break outer; }
          }
        }
        if (fits) return [col, row];
      }
      col++;
    }
  }

  for (const layout of layouts) {
    const [col, row] = findNextFree(layout.colSpan, layout.rowSpan);
    occupy(col, row, layout.colSpan, layout.rowSpan);
    placed.push({ ...layout, colStart: col, rowStart: row });
  }

  return placed;
}

// ─── Styling helpers ──────────────────────────────────────────────────────────

function getBackgroundStyle(index: number, item: BentoItem) {
  if (item.image && index % 5 === 0) return "image-bg";
  if (index % 3 === 0) return "dark";
  if (index % 7 === 0) return "pattern";
  return "default";
}

function getTitleSize(cell: CellLayout): string {
  const area = cell.colSpan * cell.rowSpan;
  if (area >= 8) return "clamp(1.5rem, 2.2vw, 2.25rem)";   // hero (2×4)
  if (area >= 4) return "clamp(1.25rem, 1.8vw, 1.875rem)";  // wide (2×2) or tall
  if (cell.rowSpan >= 2) return "clamp(1rem, 1.2vw, 1.25rem)"; // normal (1×2)
  return "clamp(0.875rem, 1vw, 1rem)";                       // half (1×1)
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function AutoBentoGrid({ items, className }: AutoBentoGridProps) {
  const allItems = [...items, null]; // null = END filler
  const placed = placeCells(allItems.length);

  return (
    <div
      className={cn(
        // Mobile: 2-col vertical flow
        "grid grid-cols-2 w-full gap-0 bg-background",
        // Desktop: fixed 6 sub-rows, columns grow horizontally
        "md:grid-cols-none md:grid-rows-6 md:grid-flow-col md:auto-cols-[clamp(220px,18vw,320px)] md:h-full md:w-max",
        "border-l-2 md:border-l-[0.3vw] border-t-2 md:border-t-[0.3vw] border-red-950",
        className,
      )}
    >
      {items.map((item, i) => {
        const cell = placed[i];
        const bgType = getBackgroundStyle(i, item);
        const isLargeMobile = cell.colSpan >= 2 || cell.rowSpan >= 4;
        const isHalf = cell.rowSpan <= 1;

        return (
          <Link
            key={item.id}
            href={item.href || "#"}
            className={cn(
              "group relative flex flex-col overflow-hidden",
              "border-r-2 border-b-2 md:border-r-[0.3vw] md:border-b-[0.3vw]",
              "transition-colors duration-300",
              // Mobile sizing
              isLargeMobile
                ? "col-span-2 min-h-[260px]"
                : isHalf
                  ? "col-span-1 min-h-[120px]"
                  : "col-span-1 min-h-[200px]",
              // Desktop: explicit placement via CSS vars (only applied at md+)
              "md:min-h-0 md:[grid-column:var(--md-col)] md:[grid-row:var(--md-row)]",
              bgType === "dark"
                ? "bg-red-950 text-[#e6dcc6] hover:bg-red-900 border-black"
                : "bg-background text-red-950 hover:bg-red-950/5 border-red-950",
              item.className,
            )}
            style={{
              "--md-col": `${cell.colStart} / span ${cell.colSpan}`,
              "--md-row": `${cell.rowStart} / span ${cell.rowSpan}`,
            } as React.CSSProperties}
          >
            {bgType === "image-bg" && item.image && (
              <div className="absolute inset-0 z-0 overflow-hidden opacity-20 group-hover:opacity-30 transition-opacity grayscale group-hover:grayscale-0">
                <Image src={item.image} alt={item.title} fill className="object-cover" />
              </div>
            )}

            <div className={cn(
              "relative z-10 flex flex-col justify-between flex-1 min-w-0",
              isHalf ? "p-4 md:p-[1.2vw]" : "p-7 md:p-[2.2vw]",
            )}>
              <div className="flex justify-between items-start gap-2">
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {item.tags.slice(0, isHalf ? 1 : 2).map((tag) => (
                      <span
                        key={tag}
                        className={cn(
                          "text-[11px] md:text-[0.75vw] uppercase tracking-wider font-bold",
                          "px-2 py-1 border border-current whitespace-nowrap",
                          bgType === "dark" ? "border-[#e6dcc6]/30" : "border-red-950/30",
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
                      "w-5 h-5 md:w-[1.3vw] md:h-[1.3vw] shrink-0",
                      "opacity-0 group-hover:opacity-100 transition-opacity",
                      bgType === "dark" ? "text-[#e6dcc6]" : "text-red-950",
                    )}
                  />
                )}
              </div>

              <div className="mt-auto min-w-0">
                {item.date && !isHalf && (
                  <p className="text-xs md:text-[0.75vw] mb-2 font-mono opacity-60">
                    {item.date}
                  </p>
                )}
                <h3
                  className="font-bold uppercase tracking-tight leading-none mb-2 break-words"
                  style={{ fontSize: getTitleSize(cell) }}
                >
                  {item.title}
                </h3>
                {item.description && (
                  <p
                    className={cn(
                      "leading-relaxed opacity-80 break-words",
                      isHalf ? "line-clamp-1" : "line-clamp-3",
                    )}
                    style={{ fontSize: "clamp(0.875rem, 0.95vw, 1rem)" }}
                  >
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          </Link>
        );
      })}

      {/* END filler — explicitly placed by the algorithm */}
      {(() => {
        const cell = placed[items.length];
        return (
          <div
            className={cn(
              "col-span-1 min-h-[120px] md:min-h-0 border-r-2 border-b-2 md:border-r-[0.3vw] md:border-b-[0.3vw] border-red-950 p-6 flex items-center justify-center hover:bg-red-950/5 bg-background",
              "md:[grid-column:var(--md-col)] md:[grid-row:var(--md-row)]",
            )}
            style={{
              "--md-col": `${cell.colStart} / span ${cell.colSpan}`,
              "--md-row": `${cell.rowStart} / span ${cell.rowSpan}`,
            } as React.CSSProperties}
          >
            <p className="font-bold text-red-950/20 rotate-45 text-sm md:text-[1vw]">END</p>
          </div>
        );
      })()}
    </div>
  );
}