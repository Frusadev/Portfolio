"use client";

import { cn } from "@/lib/utils";
import { Mail, Phone } from "lucide-react";
import { Poppins } from "next/font/google";
import Link from "next/link";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export default function Contact() {
  return (
    <div
      id="contact"
      className={cn(
        "w-full flex flex-col items-center justify-center py-20 gap-10 bg-foreground text-background rounded-t-3xl mt-20 md:px-5",
        poppins.className,
      )}
    >
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-4xl font-bold">Get in Touch</h2>
        <p className="text-xl opacity-80 text-center">
          Let&apos;s build something amazing together
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 md:gap-16">
        <Link
          href="mailto:daniel@ametsowou.me"
          className="flex items-center gap-3 text-xl hover:text-primary transition-colors group"
        >
          <div className="p-4 rounded-full bg-background/10 group-hover:bg-background/20 transition-colors">
            <Mail className="w-6 h-6" />
          </div>
          <span>daniel@ametsowou.me</span>
        </Link>

        <Link
          href="tel:+22870405717"
          className="flex items-center gap-3 text-xl hover:text-primary transition-colors group"
        >
          <div className="p-4 rounded-full bg-background/10 group-hover:bg-background/20 transition-colors">
            <Phone className="w-6 h-6" />
          </div>
          <span>+228 70 40 57 17</span>
        </Link>
      </div>

      <div className="flex flex-col items-center gap-2 mt-10">
        <h3 className="text-2xl font-bold">Daniel Ametsowou</h3>
        <span className="text-lg opacity-70">(Frusadev)</span>
      </div>
    </div>
  );
}
