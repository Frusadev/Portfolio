"use client";

import { cn } from "@/lib/utils";
import { JetBrains_Mono } from "next/font/google";
import { motion } from "framer-motion";
import { FileJson, User, Cpu, Globe, FolderOpen, ChevronRight, ChevronDown } from "lucide-react";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400", "700"],
});

export default function About() {
  return (
    <section id="about" className="py-20 px-4 bg-muted/30 overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-xl border border-border bg-card shadow-2xl overflow-hidden"
        >
            {/* Window Header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/50">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="ml-4 text-xs text-muted-foreground font-mono flex items-center gap-2">
                    <User className="w-3 h-3" />
                    frusadev — about-me.tsx
                </div>
            </div>

            {/* Editor Content */}
            <div className="grid md:grid-cols-[250px_1fr] min-h-[500px]">
                {/* Sidebar */}
                <div className="hidden md:block border-r border-border bg-muted/10 p-4 font-mono text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground mb-2 text-xs font-bold tracking-wider">
                        <span>EXPLORER</span>
                    </div>
                    <div className="space-y-1">
                        <div className="flex items-center gap-1 text-muted-foreground">
                            <ChevronDown className="w-4 h-4" />
                            <span className="font-bold text-foreground">PORTFOLIO</span>
                        </div>
                        <div className="pl-4 space-y-1">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <ChevronRight className="w-4 h-4" />
                                <FolderOpen className="w-4 h-4 text-blue-400" />
                                <span>src</span>
                            </div>
                            <div className="pl-6 space-y-1 border-l border-border ml-2">
                                <div className="flex items-center gap-2 text-blue-400 bg-primary/10 rounded px-2 py-1 cursor-pointer">
                                    <FileJson className="w-4 h-4" />
                                    <span>about-me.json</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                                    <Cpu className="w-4 h-4" />
                                    <span>skills.ts</span>
                                </div>
                                 <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                                    <Globe className="w-4 h-4" />
                                    <span>experience.tsx</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Code Area */}
                <div className={cn("p-6 md:p-8 overflow-x-auto bg-[#0c0c0c]", jetBrainsMono.className)}>
                    <div className="text-sm md:text-base space-y-1 font-medium leading-relaxed">
                        <div className="flex">
                            <span className="text-gray-600 w-8 select-none text-right pr-4">1</span>
                            <span className="text-purple-400">const</span> <span className="text-yellow-400 pl-2">developer</span> <span className="text-white pl-2">=</span> <span className="text-blue-400 pl-2">{`{`}</span>
                        </div>
                        <div className="flex">
                            <span className="text-gray-600 w-8 select-none text-right pr-4">2</span>
                            <span className="pl-8 text-sky-300">name</span><span className="text-white">:</span> <span className="text-green-400 pl-2">&quot;Daniel Ametsowou&quot;</span><span className="text-white">,</span>
                        </div>
                        <div className="flex">
                            <span className="text-gray-600 w-8 select-none text-right pr-4">3</span>
                            <span className="pl-8 text-sky-300">role</span><span className="text-white">:</span> <span className="text-green-400 pl-2">&quot;Full Stack Developer&quot;</span><span className="text-white">,</span>
                        </div>
                        <div className="flex">
                            <span className="text-gray-600 w-8 select-none text-right pr-4">4</span>
                            <span className="pl-8 text-sky-300">traits</span><span className="text-white">:</span> <span className="text-blue-400 pl-2">[</span>
                        </div>
                        <div className="flex">
                            <span className="text-gray-600 w-8 select-none text-right pr-4">5</span>
                            <span className="pl-12 text-green-400">&quot;Problem Solver&quot;</span><span className="text-white">,</span>
                        </div>
                        <div className="flex">
                            <span className="text-gray-600 w-8 select-none text-right pr-4">6</span>
                            <span className="pl-12 text-green-400">&quot;Creative Engineer&quot;</span><span className="text-white">,</span>
                        </div>
                        <div className="flex">
                            <span className="text-gray-600 w-8 select-none text-right pr-4">7</span>
                            <span className="pl-12 text-green-400">&quot;Open Source Lover&quot;</span>
                        </div>
                        <div className="flex">
                            <span className="text-gray-600 w-8 select-none text-right pr-4">8</span>
                            <span className="pl-8 text-blue-400">]</span><span className="text-white">,</span>
                        </div>
                        <div className="flex">
                            <span className="text-gray-600 w-8 select-none text-right pr-4">9</span>
                            <span className="pl-8 text-sky-300">description</span><span className="text-white">:</span> <span className="text-orange-300 pl-2">`</span>
                        </div>
                        <div className="flex">
                            <span className="text-gray-600 w-8 select-none text-right pr-4">10</span>
                            <span className="pl-12 text-gray-500 italic">{"// I'm probably one of the few last developers who"}</span>
                        </div>
                        <div className="flex">
                            <span className="text-gray-600 w-8 select-none text-right pr-4">11</span>
                            <span className="pl-12 text-gray-500 italic">{"// somehow survived the vibe coding apocalypse."}</span>
                        </div>
                        <div className="flex">
                            <span className="text-gray-600 w-8 select-none text-right pr-4">12</span>
                            <span className="pl-12 text-green-400">&quot;I am a passionate developer and hopefully entrepreneur</span>
                        </div>
                        <div className="flex">
                            <span className="text-gray-600 w-8 select-none text-right pr-4">13</span>
                            <span className="pl-12 text-green-400">trying to make a difference in this world. I build</span>
                        </div>
                        <div className="flex">
                            <span className="text-gray-600 w-8 select-none text-right pr-4">14</span>
                            <span className="pl-12 text-green-400">scalable systems and beautiful interfaces.&quot;</span><span className="text-orange-300">`</span>
                        </div>
                        <div className="flex">
                            <span className="text-gray-600 w-8 select-none text-right pr-4">15</span>
                            <span className="text-blue-400">{`}`}</span><span className="text-white">;</span>
                        </div>
                        <div className="flex mt-4">
                            <span className="text-gray-600 w-8 select-none text-right pr-4">16</span>
                            <span className="text-purple-400">export</span> <span className="text-purple-400 pl-2">default</span> <span className="text-yellow-400 pl-2">developer</span><span className="text-white">;</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
      </div>
    </section>
  );
}
