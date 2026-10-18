"use client";

import * as React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface LoveSectionProps {
  className?: string;
}

export function LoveSection({ className }: LoveSectionProps) {
  const sectionRef = React.useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const phrases = gsap.utils.toArray<HTMLElement>(".love-phrase");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "bottom 45%",
          scrub: 1,
        },
      });

      tl.fromTo(
        phrases,
        {
          opacity: 0.18,
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
        "relative w-full min-h-0 md:min-h-screen flex items-center justify-start px-6 sm:px-12 md:px-16 lg:px-24 select-none py-16 sm:py-24 md:py-36 lg:py-40",
        className
      )}
    >
      <div className="max-w-7xl w-full z-20">
        <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal leading-[1.65] md:leading-[1.75] text-text-primary tracking-tight">
          <span className="love-phrase inline">
            I love working on things I enjoy learning about, and I&apos;m
            naturally drawn to creative fields, whether technical or not.{" "}
          </span>

          <span className="love-phrase inline">
            I love building and understanding complex algorithms,{" "}
          </span>

          <span className="love-phrase inline">
            I love building beautiful pages.{" "}
          </span>

          <span className="love-phrase inline">
            I love creative humor,{" "}
          </span>

          <span className="love-phrase inline">
            I love unusual music,{" "}
          </span>

          <span className="love-phrase inline">
            I love mathematics,{" "}
          </span>

          <span className="love-phrase inline">
            I love chess,{" "}
          </span>

          <span className="love-phrase inline">
            I love finance,{" "}
          </span>

          <span className="love-phrase inline">
            I love economy.{" "}
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
