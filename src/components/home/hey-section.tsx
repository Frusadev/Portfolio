"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface HeySectionProps {
  className?: string;
}

const text = "Hey! I'm Daniel";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.045,
      delayChildren: 0.15,
    },
  },
};

const charVariants: Variants = {
  hidden: {
    opacity: 0,
    filter: "blur(14px)",
    x: -16,
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    x: 0,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function HeySection({ className }: HeySectionProps) {
  const words = text.split(" ");

  return (
    <section
      id="hey"
      aria-label="Hey"
      className={cn(
        "min-h-[80vh] md:min-h-screen w-full flex items-center justify-start px-6 sm:px-12 md:px-16 lg:px-24 select-none",
        className
      )}
    >
      <motion.h1
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-medium tracking-tight text-text-primary leading-[1.08] flex flex-wrap gap-x-[0.3em] gap-y-2"
      >
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className="inline-flex whitespace-nowrap">
            {word.split("").map((char, charIndex) => (
              <motion.span
                key={charIndex}
                variants={charVariants}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </span>
        ))}
      </motion.h1>
    </section>
  );
}

export default HeySection;
