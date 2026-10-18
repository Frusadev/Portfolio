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
        "w-full flex items-start justify-start pt-4 sm:pt-8 md:pt-48 lg:pt-52 pb-2 md:pb-6 px-6 sm:px-12 md:px-16 lg:px-24 select-none",
        className
      )}
    >
      <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-medium tracking-tight text-text-primary leading-[1.08] flex flex-wrap items-center justify-start gap-x-[0.3em] gap-y-3 text-left">
        {words.map((word, wordIndex) => {
          const isDaniel = word === "Daniel";

          return (
            <span key={wordIndex} className="inline-flex items-center whitespace-nowrap">
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
                  className="hey-photo-link inline-flex items-end ml-1.5 sm:ml-3 md:ml-4 select-none relative self-center"
                  style={{ opacity: 0, filter: "blur(10px)" }}
                >
                  {/* Curvy trail of dashes */}
                  <svg
                    className="w-12 sm:w-16 md:w-24 lg:w-28 h-8 sm:h-12 md:h-16 lg:h-20 text-white/35 stroke-current overflow-visible shrink-0"
                    fill="none"
                    viewBox="0 0 120 60"
                    aria-hidden="true"
                  >
                    <path
                      d="M 2 48 C 20 58, 32 10, 52 22 C 68 32, 78 54, 96 42 C 106 32, 112 16, 118 10"
                      strokeWidth="1.75"
                      strokeDasharray="3.5 4"
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>

                  {/* Elevated floating photo icon with no movement */}
                  <div className="relative self-start -translate-y-2 sm:-translate-y-3 md:-translate-y-5 lg:-translate-y-6 shrink-0">
                    {/* Ambient elevation glow */}
                    <div className="absolute -inset-1.5 rounded-full bg-white/10 blur-md -z-10" />

                    <div className="relative w-9 h-9 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 aspect-square rounded-full overflow-hidden shrink-0 ring-2 ring-white/25 ring-offset-2 ring-offset-background bg-surface_elevated shadow-[0_16px_36px_rgba(0,0,0,0.85)]">
                      <Image
                        src="/danielras.png"
                        alt="Daniel Ametsowou"
                        fill
                        sizes="(max-width: 640px) 36px, (max-width: 768px) 48px, 80px"
                        className="object-cover rounded-full"
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
