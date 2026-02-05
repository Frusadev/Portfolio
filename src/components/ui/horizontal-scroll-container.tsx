"use client";

import { useRef, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function HorizontalScrollContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isVertical = pathname?.startsWith("/blog/") && pathname !== "/blog";

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let currentScroll = isVertical ? container.scrollTop : container.scrollLeft;
    let targetScroll = currentScroll;
    let isAnimating = false;
    const ease = 0.05; // Lower for smoother/heavier feel

    const updateScroll = () => {
      // Linear interpolation (Lerp)
      const diff = targetScroll - currentScroll;
      
      if (Math.abs(diff) < 0.1) {
        currentScroll = targetScroll;
        if (isVertical) {
          container.scrollTop = currentScroll;
        } else {
          container.scrollLeft = currentScroll;
        }
        isAnimating = false;
        return;
      }

      currentScroll += diff * ease;
      if (isVertical) {
        container.scrollTop = currentScroll;
      } else {
        container.scrollLeft = currentScroll;
      }
      
      requestAnimationFrame(updateScroll);
    };

    const handleWheel = (e: WheelEvent) => {
      // Disable custom scroll logic on mobile/small screens
        if (window.innerWidth < 768) return;

      // Prioritize vertical scroll, but can support horizontal too if needed
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      
      if (Math.abs(delta) > 0.1) {
        e.preventDefault();
        
        // Multiplier adds "weight" to the scroll
        targetScroll += delta * 2.5; 
        
        // Clamp to container bounds
        const maxScroll = isVertical 
            ? container.scrollHeight - container.clientHeight
            : container.scrollWidth - container.clientWidth;

        targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));

        if (!isAnimating) {
          isAnimating = true;
          requestAnimationFrame(updateScroll);
        }
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [isVertical]);

  return (
    <main
      ref={containerRef}
      className={`flex-1 w-full h-full no-scrollbar relative flex flex-col ${isVertical ? "md:flex-col md:overflow-y-hidden" : "md:flex-row md:overflow-x-auto md:overflow-y-hidden"} overflow-y-auto overflow-x-hidden ${
        className || ""
      }`}
    >
      {children}
    </main>
  );
}
