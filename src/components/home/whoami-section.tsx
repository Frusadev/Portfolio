"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface WhoAmISectionProps {
  className?: string;
}

const text = "I'm a hyperactive, imagination fueled creative.";

export function WhoAmISection({ className }: WhoAmISectionProps) {
  const words = text.split(" ");

  // Count total characters to compute right-to-left delay
  let charCounter = 0;
  const wordCharMap = words.map((word) => {
    const chars = word.split("").map((char) => ({
      char,
      index: charCounter++,
    }));
    return { word, chars };
  });

  const totalChars = charCounter;

  return (
    <section
      id="whoami"
      aria-label="Who am I"
      className={cn(
        "min-h-[60vh] md:min-h-[80vh] w-full flex items-center justify-start px-6 sm:px-12 md:px-16 lg:px-24 select-none py-16 md:py-24",
        className
      )}
    >
      <div className="max-w-6xl">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal tracking-tight text-accent-secondary leading-[1.18] flex flex-wrap gap-x-[0.3em] gap-y-2">
          {wordCharMap.map(({ chars }, wordIndex) => (
            <span key={wordIndex} className="inline-flex whitespace-nowrap">
              {chars.map(({ char, index }) => {
                // Reverse delay: rightmost characters animate first (delay closest to 0.1s)
                const reverseIndex = totalChars - 1 - index;
                const delay = 0.12 + reverseIndex * 0.028;

                return (
                  <motion.span
                    key={index}
                    initial={{
                      opacity: 0,
                      filter: "blur(14px)",
                      x: 16,
                    }}
                    whileInView={{
                      opacity: 1,
                      filter: "blur(0px)",
                      x: 0,
                    }}
                    viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
                    transition={{
                      duration: 0.6,
                      ease: [0.16, 1, 0.3, 1],
                      delay,
                    }}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                );
              })}
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
}

export default WhoAmISection;
