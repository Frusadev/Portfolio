"use client";

import { cn } from "@/lib/utils";
import { JetBrains_Mono } from "next/font/google";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal, Code2, Cpu, Coffee } from "lucide-react";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400", "700"],
});

export default function Hero() {
  const [text, setText] = useState("");
  const fullText = "Full Stack Developer & Entrepreneur";

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(timer);
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full min-h-screen flex items-center justify-center py-20 px-4 md:px-16 overflow-hidden">
      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Column: Terminal/Code Style Intro */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="absolute -left-4 -top-4 w-12 h-12 border-t-2 border-l-2 border-primary/30 rounded-tl-xl" />
            <div className="absolute -right-4 -bottom-4 w-12 h-12 border-b-2 border-r-2 border-primary/30 rounded-br-xl" />

            <h1
              className={cn(
                "text-5xl md:text-7xl font-bold tracking-tight mb-4",
                jetBrainsMono.className,
              )}
            >
              <span className="text-primary">&lt;</span>
              Daniel
              <br />
              Ametsowou
              <span className="text-primary">/&gt;</span>
            </h1>
          </motion.div>

          <div
            className={cn(
              "h-8 text-xl md:text-2xl text-muted-foreground",
              jetBrainsMono.className,
            )}
          >
            <span className="text-green-500">$</span> {text}
            <span className="animate-pulse">_</span>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            <Link href="#contact">
              <Button
                size="lg"
                className="rounded-none border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground transition-all"
              >
                <Terminal className="mr-2 h-5 w-5" />
                Contact_Me.sh
              </Button>
            </Link>
            <Link href="#projects">
              <Button
                size="lg"
                variant="outline"
                className="rounded-none border-2"
              >
                <Code2 className="mr-2 h-5 w-5" />
                View_Projects.exe
              </Button>
            </Link>
          </motion.div>

          {/* System Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-8 border-t border-border/50"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-md">
                <Cpu className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">System Status</p>
                <p className="font-bold text-sm">Online</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-md">
                <Coffee className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Caffeine Level</p>
                <p className="font-bold text-sm">98%</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Geeky Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative block mt-10 lg:mt-0"
        >
          <div className="relative w-64 h-64 md:w-96 md:h-96 mx-auto">
            {/* Abstract Tech Circle Background */}
            <div className="absolute inset-0 rounded-full border border-primary/20 animate-[spin_10s_linear_infinite]" />
            <div className="absolute inset-4 rounded-full border border-dashed border-primary/30 animate-[spin_15s_linear_infinite_reverse]" />

            {/* Main Image Container */}
            <div className="absolute inset-10 rounded-full overflow-hidden border-4 border-background shadow-2xl bg-muted">
              <Image
                src="/daniel.jpg"
                alt="Daniel Ametsowou"
                fill
                className="object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>

            <motion.div className="absolute bottom-10 left-0 bg-background border border-border p-3 rounded-lg shadow-lg">
              <div className="text-xs font-mono">
                git commit -m &quot;feat: success&quot;
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
