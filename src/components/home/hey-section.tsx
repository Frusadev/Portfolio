"use client";

import * as React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

interface HeySectionProps {
  className?: string;
}

const text = "Hey! I'm Daniel";

export function HeySection({ className }: HeySectionProps) {
  const containerRef = React.useRef<HTMLElement>(null);
  const words = text.split(" ");

  useGSAP(
    () => {
      const chars = gsap.utils.toArray<HTMLElement>(".hey-char");
      gsap.fromTo(
        chars,
        {
          opacity: 0,
          filter: "blur(14px)",
          x: -16,
        },
        {
          opacity: 1,
          filter: "blur(0px)",
          x: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.045,
          delay: 0.15,
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="hey"
      aria-label="Hey"
      className={cn(
        "w-full flex items-center justify-center md:items-start md:justify-start pt-32 sm:pt-40 md:pt-48 lg:pt-52 pb-4 md:pb-8 px-6 sm:px-12 md:px-16 lg:px-24 select-none",
        className
      )}
    >
      <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-medium tracking-tight text-text-primary leading-[1.08] flex flex-wrap justify-center md:justify-start gap-x-[0.3em] gap-y-2 text-center md:text-left">
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className="inline-flex whitespace-nowrap">
            {word.split("").map((char, charIndex) => (
              <span
                key={charIndex}
                className="hey-char inline-block will-change-[filter,opacity,transform]"
                style={{ opacity: 0, filter: "blur(14px)" }}
              >
                {char}
              </span>
            ))}
          </span>
        ))}
      </h1>
    </section>
  );
}

export default HeySection;
