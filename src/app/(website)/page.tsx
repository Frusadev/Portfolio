import { HeySection } from "@/components/home/hey-section";
import { WhoAmISection } from "@/components/home/whoami-section";
import { LoveSection } from "@/components/home/love-section";
import { WhatImDoingSection } from "@/components/home/what-im-doing/what-im-doing-section";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-background text-foreground">
      {/* Opening Hero Block: Centered vertically relative to the screen on mobile */}
      <div className="min-h-[100dvh] flex flex-col justify-center">
        <HeySection />
        <WhoAmISection />
      </div>

      {/* 3rd Section: Philosophy & Loves */}
      <LoveSection />

      {/* 4th Section: What I'm Doing / Interactions */}
      <WhatImDoingSection />
    </main>
  );
}
