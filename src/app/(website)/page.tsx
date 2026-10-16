import { HeySection } from "@/components/home/hey-section";
import { WhoAmISection } from "@/components/home/whoami-section";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-background text-foreground">
      {/* Opening Hero Block: Centered vertically relative to the screen on mobile */}
      <div className="min-h-[100dvh] flex flex-col justify-center">
        <HeySection />
        <WhoAmISection />
      </div>
    </main>
  );
}
