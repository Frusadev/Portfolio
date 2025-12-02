"use client";

import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { TextMarquee } from "../ui/text-marque";
import Image from "next/image";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export default function About() {
  return (
    <div
      className={cn(
        "relative flex flex-col px-4 md:px-15 w-full",
        poppins.className,
      )}
      id="about"
    >
      <div className="flex flex-col md:flex-row justify-around items-center gap-8">
        <div className="text-3xl max-w-[700px] mt-10 flex flex-col gap-4">
          <p>
            I&apos;m probably one the few last developers who somehow survived
            the vibe coding appocalypse. (I promise){" "}
          </p>
          <p>
            But seriously, I&apos;m a full stack dev and hopefully entrepreneur
            trying to make a difference in this world.
          </p>
        </div>
        <Image
          src="/illustrations/illus1.jpg"
          alt="About Illustration"
          className="rounded-2xl object-cover rotate-[-5deg] w-56 h-80 mt-10 md:mt-0"
          width={200}
          height={200}
        />
      </div>
      <div className="h-[50vh] md:h-screen flex flex-col justify-center overflow-hidden">
        {" "}
        <TextMarquee baseVelocity={1}>
          Fullstack Developer • Creative Engineer • UI Enthusiast • Problem
          Solver • Systems Thinker • Open Source Lover
        </TextMarquee>
        <TextMarquee baseVelocity={-1}>
          Design • Code • Architecture • Performance • Accessibility • Open
          Source • Innovation
        </TextMarquee>
      </div>
    </div>
  );
}
