"use client";

import * as React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { PaperCanvas } from "@/components/home/paper-canvas";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface LoveSectionProps {
  className?: string;
}

export function LoveSection({ className }: LoveSectionProps) {
  const sectionRef = React.useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = React.useState(0);

  useGSAP(
    () => {
      const phrases = gsap.utils.toArray<HTMLElement>(".love-phrase");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "bottom 45%",
          scrub: 1,
          onUpdate: (self) => {
            setScrollProgress(self.progress);
          },
        },
      });

      tl.fromTo(
        phrases,
        {
          opacity: 0.2,
          filter: "blur(10px)",
          y: 12,
        },
        {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          stagger: 0.1,
          ease: "none",
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="love"
      aria-label="What I love"
      className={cn(
        "relative w-full min-h-screen flex items-center justify-start px-6 sm:px-12 md:px-16 lg:px-24 select-none py-28 md:py-40",
        className
      )}
    >
      {/* Shared WebGL Paper Canvas for all 8 3D models */}
      <PaperCanvas containerRef={sectionRef} scrollProgress={scrollProgress} />

      <div className="max-w-5xl w-full z-20">
        <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal leading-[1.65] md:leading-[1.75] text-text-primary tracking-tight">
          <span className="love-phrase inline">
            I love working on things I enjoy learning about, and I&apos;m
            naturally drawn to creative fields, whether technical or not.{" "}
          </span>

          <span className="love-phrase inline">
            I love building and understanding complex algorithms
            <span
              id="figure-algorithms"
              className="inline-block w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 align-middle ml-2.5 mr-0.5"
              aria-hidden="true"
            />,{" "}
          </span>

          <span className="love-phrase inline">
            I love building beautiful pages
            <span
              id="figure-interfaces"
              className="inline-block w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 align-middle ml-2.5 mr-0.5"
              aria-hidden="true"
            />.{" "}
          </span>

          <span className="love-phrase inline">
            I love creative humor
            <span
              id="figure-humor"
              className="inline-block w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 align-middle ml-2.5 mr-0.5"
              aria-hidden="true"
            />,{" "}
          </span>

          <span className="love-phrase inline">
            I love unusual music
            <span
              id="figure-music"
              className="inline-block w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 align-middle ml-2.5 mr-0.5"
              aria-hidden="true"
            />,{" "}
          </span>

          <span className="love-phrase inline">
            I love mathematics
            <span
              id="figure-math"
              className="inline-block w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 align-middle ml-2.5 mr-0.5"
              aria-hidden="true"
            />,{" "}
          </span>

          <span className="love-phrase inline">
            I love chess
            <span
              id="figure-chess"
              className="inline-block w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 align-middle ml-2.5 mr-0.5"
              aria-hidden="true"
            />,{" "}
          </span>

          <span className="love-phrase inline">
            I love finance
            <span
              id="figure-finance"
              className="inline-block w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 align-middle ml-2.5 mr-0.5"
              aria-hidden="true"
            />,{" "}
          </span>

          <span className="love-phrase inline">
            I love economy
            <span
              id="figure-economy"
              className="inline-block w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 align-middle ml-2.5 mr-0.5"
              aria-hidden="true"
            />.{" "}
          </span>

          <span className="love-phrase inline text-accent-secondary">
            I can love anything.
          </span>
        </p>
      </div>
    </section>
  );
}

export default LoveSection;
