"use client";

import { cn } from "@/lib/utils";
import { Terminal } from "lucide-react";
import { JetBrains_Mono } from "next/font/google";
import Link from "next/link";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400", "700"],
});

export default function Contact() {
  return (
    <footer
      id="contact"
      className={cn(
        "w-full py-20 bg-[#0c0c0c] text-gray-400 border-t border-gray-800 mt-20 font-mono text-sm",
        jetBrainsMono.className,
      )}
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Terminal Output Left */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-green-500 mb-6">
              <Terminal className="w-4 h-4" />
              <span>root@frusadev:~/contact</span>
            </div>
            
            <div className="space-y-2">
              <p className="text-gray-500"># Initialize contact protocol</p>
              <p><span className="text-blue-400">const</span> <span className="text-yellow-400">email</span> = <a href="mailto:daniel@ametsowou.me" className="text-green-400 hover:underline">&quot;daniel@ametsowou.me&quot;</a>;</p>
              <p><span className="text-blue-400">const</span> <span className="text-yellow-400">phone</span> = <a href="tel:+22870405717" className="text-green-400 hover:underline">&quot;+228 70 40 57 17&quot;</a>;</p>
              <p><span className="text-blue-400">const</span> <span className="text-yellow-400">location</span> = <span className="text-green-400">&quot;Lomé, Togo&quot;</span>;</p>
            </div>

            <div className="pt-6 space-y-2">
              <p className="text-gray-500"># Social networks connection</p>
              <div className="flex flex-col gap-1">
                <Link href="https://github.com/Frusadev" target="_blank" className="hover:text-white transition-colors flex items-center gap-2">
                  <span className="text-purple-500">git remote add</span> github
                </Link>
                <Link href="https://linkedin.com/in/frusadev" target="_blank" className="hover:text-white transition-colors flex items-center gap-2">
                  <span className="text-blue-500">ln -s</span> /in/frusadev linkedin
                </Link>
                <Link href="https://x.com/Frusasoft_FD" target="_blank" className="hover:text-white transition-colors flex items-center gap-2">
                  <span className="text-cyan-500">curl</span> x.com/Frusasoft_FD
                </Link>
              </div>
            </div>
          </div>

          {/* System Status Right */}
          <div className="border border-gray-800 bg-black/50 p-6 rounded-lg font-mono text-xs">
            <div className="flex justify-between items-center mb-4 border-b border-gray-800 pb-2">
              <span>SYSTEM_STATUS</span>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">UPTIME</span>
                <span>{new Date().getFullYear() - 2020} YEARS</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">VERSION</span>
                <span>v2.0.0-beta</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">MEMORY</span>
                <div className="w-24 h-2 bg-gray-800 rounded-full overflow-hidden mt-1">
                  <div className="w-[60%] h-full bg-green-500"></div>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">COFFEE</span>
                <div className="w-24 h-2 bg-gray-800 rounded-full overflow-hidden mt-1">
                  <div className="w-[90%] h-full bg-yellow-600"></div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-4 border-t border-gray-800 text-center">
              <p className="text-gray-600">© {new Date().getFullYear()} Frusadev. Executing shutdown sequence...</p>
            </div>
          </div>
        </div>
        
        <div className="text-center text-gray-600 text-xs">
          <span className="animate-pulse">_</span> EOF
        </div>
      </div>
    </footer>
  );
}
