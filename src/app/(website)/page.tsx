import { HeySection } from "@/components/home/hey-section";
import { WhoAmISection } from "@/components/home/whoami-section";
import { LoveSection } from "@/components/home/love-section";
import { WhatImDoingSection } from "@/components/home/what-im-doing/what-im-doing-section";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-background text-foreground overflow-x-clip">
      {/* Opening Hero Block: Centered vertically relative to the screen on mobile */}
      <div className="min-h-[75dvh] sm:min-h-[85dvh] md:min-h-[90dvh] flex flex-col justify-center pt-16 sm:pt-20 md:py-0">
        <HeySection />
        <WhoAmISection />
      </div>

      {/* 3rd Section: Philosophy & Loves */}
      <LoveSection />

      {/* 4th Section: What I'm Doing / Interactions */}
      <WhatImDoingSection />

      {/* Footer */}
      <footer className="w-full px-6 sm:px-12 md:px-16 lg:px-24 py-16 sm:py-20 md:py-24 text-center select-none">
        <p className="text-xs sm:text-sm font-mono text-text-muted">
          Merci d&apos;avoir pris le temps de visiter :).
        </p>
      </footer>
    </main>
  );
}

