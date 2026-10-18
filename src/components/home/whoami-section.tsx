"use client";

import * as React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface WhoAmISectionProps {
  className?: string;
}

const text = "I'm a hyperactive, imagination fueled creative.";

export function WhoAmISection({ className }: WhoAmISectionProps) {
  const containerRef = React.useRef<HTMLElement>(null);
  const words = text.split(" ");

  useGSAP(
    () => {
      const chars = gsap.utils.toArray<HTMLElement>(".whoami-char");
      // Reverse array so rightmost characters animate first (opposite direction)
      const reversedChars = [...chars].reverse();

      gsap.fromTo(
        reversedChars,
        {
          opacity: 0,
          filter: "blur(14px)",
          x: 16,
        },
        {
          opacity: 1,
          filter: "blur(0px)",
          x: 0,
          duration: 0.65,
          ease: "power3.out",
          stagger: 0.028,
          delay: 0.5,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 95%",
            once: true,
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="whoami"
      aria-label="Who am I"
      className={cn(
        "w-full flex items-start justify-start md:justify-end px-6 sm:px-12 md:px-16 lg:px-24 select-none pb-6 md:pb-32 pt-2 md:pt-4 overflow-x-clip",
        className
      )}
    >
      <div className="max-w-4xl md:max-w-3xl lg:max-w-4xl w-full text-left pl-6 sm:pl-16 md:pl-0">
        <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-normal tracking-tight text-accent-secondary leading-[1.18] flex flex-wrap justify-start gap-x-[0.3em] gap-y-2 text-left">
          {words.map((word, wordIndex) => (
            <span key={wordIndex} className="inline-flex whitespace-nowrap">
              {word.split("").map((char, charIndex) => (
                <span
                  key={charIndex}
                  className="whoami-char inline-block will-change-[filter,opacity,transform]"
                  style={{ opacity: 0, filter: "blur(14px)" }}
                >
                  {char}
                </span>
              ))}
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
}

export default WhoAmISection;
