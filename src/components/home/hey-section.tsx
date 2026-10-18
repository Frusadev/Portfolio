"use client";

import * as React from "react";
import Image from "next/image";
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

      gsap.fromTo(
        ".hey-photo-link",
        {
          opacity: 0,
          filter: "blur(10px)",
          scale: 0.9,
        },
        {
          opacity: 1,
          filter: "blur(0px)",
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.65,
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
        "w-full flex items-start justify-start pt-24 sm:pt-32 md:pt-48 lg:pt-52 pb-2 md:pb-6 px-6 sm:px-12 md:px-16 lg:px-24 select-none overflow-x-clip",
        className
      )}
    >
      <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-medium tracking-tight text-text-primary leading-[1.08] flex flex-wrap items-center justify-start gap-x-[0.3em] gap-y-3 text-left">
        {words.map((word, wordIndex) => {
          const isDaniel = word === "Daniel";

          return (
            <span
              key={wordIndex}
              className={cn("inline-flex items-center whitespace-nowrap", isDaniel && "relative")}
            >
              {word.split("").map((char, charIndex) => (
                <span
                  key={charIndex}
                  className="hey-char inline-block will-change-[filter,opacity,transform]"
                  style={{ opacity: 0, filter: "blur(14px)" }}
                >
                  {char}
                </span>
              ))}

              {isDaniel && (
                <span
                  className="hey-photo-link absolute bottom-1 sm:bottom-2 md:bottom-4 right-0 w-36 h-28 sm:w-60 sm:h-48 md:w-72 md:h-60 lg:w-96 lg:h-76 xl:w-[420px] xl:h-[320px] pointer-events-none select-none z-10"
                  style={{ opacity: 0, filter: "blur(10px)" }}
                >
                  {/* Curvy trail of dashes from end of Daniel up and to the left */}
                  <svg
                    className="w-full h-full text-white/40 stroke-current overflow-visible"
                    fill="none"
                    viewBox="0 0 200 160"
                    aria-hidden="true"
                  >
                    <path
                      d="M 195 155 C 196 142, 202 100, 172 118 C 140 138, 118 78, 95 98 C 82 108, 72 85, 78 72"
                      strokeWidth="2"
                      strokeDasharray="4 4.5"
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>

                  {/* Elevated floating photo icon positioned at top-left of the curve */}
                  <div className="absolute top-0 left-0 pointer-events-auto">
                    {/* Ambient elevation glow */}
                    <div className="absolute -inset-2 rounded-full bg-white/10 blur-xl -z-10" />

                    <div className="relative w-18 h-18 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 xl:w-48 xl:h-48 aspect-square rounded-full overflow-hidden shrink-0 bg-surface_elevated shadow-[0_20px_50px_rgba(0,0,0,0.9),0_8px_20px_rgba(0,0,0,0.6)]">
                      <Image
                        src="/danielras.png"
                        alt="Daniel Ametsowou"
                        fill
                        sizes="(max-width: 640px) 80px, (max-width: 768px) 112px, (max-width: 1024px) 144px, 192px"
                        className="object-cover rounded-full select-none"
                        priority
                      />
                    </div>
                  </div>
                </span>
              )}
            </span>
          );
        })}
      </h1>
    </section>
  );
}

export default HeySection;
