import { Earth } from "lucide-react";
import SpriteAnimation from "@/components/ui/sprite-animation";

export default function Home() {
  return (
    <div className="w-full min-h-full md:h-full md:inline-block md:min-w-full bg-background">
      <div className="grid grid-cols-2 md:grid-cols-none md:grid-rows-3 md:grid-flow-col md:auto-cols-[300px] w-full min-h-full md:h-full border-l-2 md:border-l-4 border-t-2 md:border-t-4 border-red-950 bg-background md:w-fit">
        {/* Hero / Intro Card - Large */}
        <div className="col-span-2 md:col-span-2 md:row-span-2 border-r-2 border-b-2 md:border-r-4 md:border-b-4 border-red-950 p-6 md:p-8 flex flex-col justify-center bg-background min-h-[300px] md:min-h-0">
          <h1 className="text-2xl md:text-6xl font-bold text-red-950 mb-4">
            Hi, I'm Daniel.
          </h1>
          <p className="text-sm md:text-xl text-red-900/80 max-w-lg leading-relaxed">
            I build accessible, pixel-perfect, secure, and performant web
            applications. I enjoy creating things that live on the internet,
            from simple websites to complex web applications.
          </p>
        </div>

        {/* Current Status */}
        <div className="col-span-1 md:col-span-1 md:row-span-1 border-r-2 border-b-2 md:border-r-4 md:border-b-4 border-red-950 p-4 md:p-6 flex flex-col justify-between hover:bg-red-950/5 transition-colors bg-background overflow-hidden min-h-[180px] md:min-h-0">
          <h3 className="text-sm md:text-xl font-bold text-red-950">Current Focus</h3>
          <p className="text-xs md:text-lg">
            Building <span className="font-bold">Quivo Agency</span> and
            exploring AI agents.
          </p>
        </div>

        {/* Location / Time */}
        <div className="col-span-1 md:col-span-1 md:row-span-1 border-r-2 border-b-2 md:border-r-4 md:border-b-4 border-red-950 p-4 md:p-6 flex flex-col justify-center items-center text-center hover:bg-red-950/5 transition-colors bg-background overflow-hidden min-h-[180px] md:min-h-0">
          <div className="text-xl md:text-4xl mb-1 md:mb-2">
            <Earth />
          </div>
          <p className="font-bold text-red-950 text-xs md:text-base">Based in Lome, Togo</p>
          <p className="text-[10px] md:text-sm opacity-70">Available for Remote Work</p>
        </div>

        {/* Experience / Tech Stack */}
        <div className="col-span-1 row-span-2 md:col-span-1 md:row-span-2 border-r-2 border-b-2 md:border-r-4 md:border-b-4 border-red-950 p-4 md:p-6 flex flex-col hover:bg-red-950/5 transition-colors bg-background overflow-hidden min-h-[250px] md:min-h-0">
          <h3 className="text-base md:text-xl font-bold text-red-950 mb-2 md:mb-4">Tech Arsenal</h3>
          <ul className="space-y-1 md:space-y-2 text-red-900/90 font-medium text-[10px] md:text-base">
            <li>React & Next.js</li>
            <li>TypeScript</li>
            <li>Node.js & Bun</li>
            <li>Tailwind CSS</li>
            <li>PostgreSQL & Drizzle</li>
            <li>Docker</li>
          </ul>
        </div>

        {/* Philosophy */}
        <div className="col-span-1 md:col-span-1 md:row-span-1 border-r-2 border-b-2 md:border-r-4 md:border-b-4 border-red-950 p-4 md:p-6 flex flex-col justify-center bg-red-950 text-[#e6dcc6] overflow-hidden min-h-[180px] md:min-h-0">
          <p className="text-xs md:text-2xl font-bold text-center">
            "Simplicity is the ultimate sophistication."
          </p>
        </div>

        {/* filler or project teaser */}
        <div className="col-span-1 md:col-span-1 md:row-span-1 border-r-2 border-b-2 md:border-r-4 md:border-b-4 border-red-950 p-4 md:p-6 flex flex-col justify-center items-center hover:bg-red-950/5 transition-colors bg-background overflow-hidden min-h-[180px] md:min-h-0">
          <SpriteAnimation />
        </div>

        {/* Contact/Social CTA */}
        <div className="col-span-2 md:col-span-2 md:row-span-1 border-r-2 border-b-2 md:border-r-4 md:border-b-4 border-red-950 p-4 md:p-6 flex items-center justify-between hover:bg-red-950/5 transition-colors bg-background overflow-hidden min-h-[150px] md:min-h-0">
          <div>
            <h3 className="text-lg md:text-2xl font-bold text-red-950">
              Let's work together
            </h3>
            <p className="opacity-80 text-xs md:text-base">Have a project in mind?</p>
          </div>
          <button className="px-3 py-2 md:px-6 md:py-3 bg-red-950 text-[#e6dcc6] font-bold uppercase tracking-wider hover:bg-red-900 transition-colors text-xs md:text-base">
            Get in touch
          </button>
        </div>

        {/* More filler for grid completeness if needed, or dynamic content */}
        <div className="col-span-1 md:col-span-1 md:row-span-1 border-r-2 border-b-2 md:border-r-4 md:border-b-4 border-red-950 p-4 md:p-6 flex items-center justify-center hover:bg-red-950/5 transition-colors bg-background overflow-hidden">
          <p className="font-bold text-red-950/50 rotate-45 text-xs md:text-base">CREATIVE</p>
        </div>
        <div className="col-span-1 md:col-span-1 md:row-span-1 border-r-2 border-b-2 md:border-r-4 md:border-b-4 border-red-950 p-4 md:p-6 flex items-center justify-center hover:bg-red-950/5 transition-colors bg-background overflow-hidden">
          <p className="font-bold text-red-950/50 -rotate-12 text-xs md:text-base">DEVELOPER</p>
        </div>
      </div>
    </div>
  );
}
