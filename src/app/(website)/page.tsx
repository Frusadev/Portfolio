import { HeySection } from "@/components/home/hey-section";
import { WhoAmISection } from "@/components/home/whoami-section";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-background text-foreground">
      <HeySection />
      <WhoAmISection />
    </main>
  );
}
