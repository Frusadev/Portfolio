"use client";

import { cn } from "@/lib/utils";
import { JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import { useEffect, useState } from "react";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400", "700"],
});
export default function Navbar() {
  const links = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About",
      href: "#about",
    },
    {
      label: "Contact",
      href: "#contact",
    },
  ];

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={cn(
        "flex items-center justify-center h-20 sticky top-0 z-50",
        scrolled
          ? "bg-background/50 dark:bg-white/50 backdrop-blur-lg text-background transition-all duration-300 border border-b-black/15"
          : "",
      )}
    >
      <div>
        {links.map((link) => (
          <Link
            href={link.href}
            key={link.href}
            onClick={(e) => {
              if (link.href.startsWith("#") || link.href === "/") {
                e.preventDefault();
                if (link.href === "/") {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                } else {
                  const element = document.querySelector(link.href);
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }
              }
            }}
            className={cn(
              "mx-2 md:mx-4 text-sm hover:underline underline-offset-4 duration-300 transition",
              jetBrainsMono.className,
            )}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
