import { Earth, Mail, Phone, Code } from "lucide-react";
import SpriteAnimation from "@/components/ui/sprite-animation";
import DoNotPress from "@/components/ui/dont-press";
import { TextMarquee } from "@/components/ui/text-marque";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaWhatsapp } from "react-icons/fa";
import { 
  DayProgressBar, 
  IrregularClock, 
  DodgingButton,
  GridPattern
} from "@/components/creative";
import { MusicPlayer } from "@/components/music-player";

export default function Home() {
  return (
    <div className="w-full min-h-full md:h-full md:inline-block md:min-w-full bg-background">
      <div className="grid grid-cols-2 md:grid-cols-none md:grid-rows-3 md:grid-flow-col md:auto-cols-[max(300px,22vw)] w-full min-h-full md:h-full border-l-4 md:border-l-[0.3vw] border-t-4 md:border-t-[0.3vw] border-red-950 bg-background md:w-fit">
        {/* Hero / Intro Card - Large */}
        <div className="col-span-2 md:col-span-2 md:row-span-2 border-r-4 border-b-4 md:border-r-[0.3vw] md:border-b-[0.3vw] border-red-950 p-6 pt-20 md:p-[2vw] flex flex-col justify-center items-start text-left md:items-start md:text-left bg-background min-h-[200px] md:min-h-0">
          <h1 className="text-4xl md:text-[4vw] leading-tight font-bold text-red-950 mb-4">
            Hi, I&apos;m Daniel.
          </h1>
          <p className="text-base md:text-[1.25vw] text-red-900/80 md:max-w-[30vw] leading-relaxed">
            I build accessible, pixel-perfect, secure, and performant web
            applications. I enjoy creating things that live on the internet,
            from simple websites to complex web applications.
          </p>
        </div>

        {/* Current Status */}
        <div className="col-span-1 md:col-span-1 md:row-span-1 border-r-4 border-b-4 md:border-r-[0.3vw] md:border-b-[0.3vw] border-red-950 p-4 md:p-[1.5vw] flex flex-col justify-between hover:bg-red-950/5 transition-colors bg-red-950 md:bg-background overflow-hidden min-h-[200px] md:min-h-0 text-[#e6dcc6] md:text-red-950">
          <h3 className="text-base md:text-[1.3vw] font-bold text-[#e6dcc6] md:text-red-950">
            Current Focus
          </h3>
          <p className="text-sm md:text-[1.1vw] leading-tight">
            Building <span className="font-bold">Quivo Agency</span> and
            exploring AI agents.
          </p>
        </div>

        {/* Location / Time */}
        <div className="col-span-1 md:col-span-1 md:row-span-1 border-r-4 border-b-4 md:border-r-[0.3vw] md:border-b-[0.3vw] border-red-950 p-4 md:p-[1.5vw] flex flex-col justify-center items-center text-center hover:bg-red-950/5 transition-colors bg-background overflow-hidden min-h-[200px] md:min-h-0">
          <div className="text-xl md:text-[2.5vw] mb-1 md:mb-2">
            <Earth />
          </div>
          <p className="font-bold text-red-950 text-sm md:text-[1vw]">
            Based in Lome, Togo
          </p>
          <p className="text-xs md:text-[0.8vw] opacity-70">
            Available for Remote Work
          </p>
        </div>

        {/* Experience / Tech Stack */}
        <div className="col-span-2 row-span-1 md:col-span-1 md:row-span-2 border-r-4 border-b-4 md:border-r-[0.3vw] md:border-b-[0.3vw] border-red-950 p-4 md:p-[1.5vw] flex flex-col hover:bg-red-950/5 transition-colors bg-red-950 md:bg-background overflow-hidden min-h-[240px] md:min-h-0">
          <h3 className="text-lg md:text-[1.3vw] font-bold text-[#e6dcc6] md:text-red-950 mb-2 md:mb-[1vw]">
            Tech Arsenal
          </h3>
          <ul className="space-y-1 md:space-y-[0.5vw] text-[#e6dcc6]/90 md:text-red-900/90 font-medium text-xs md:text-[0.9vw]">
            <li className="flex items-center gap-2 md:gap-[0.5vw]">
              <div className="w-1.5 h-1.5 md:w-[0.4vw] md:h-[0.4vw] bg-[#e6dcc6] md:bg-red-950 rounded-full" /> React &
              Next.js
            </li>
            <li className="flex items-center gap-2 md:gap-[0.5vw]">
              <div className="w-1.5 h-1.5 md:w-[0.4vw] md:h-[0.4vw] bg-[#e6dcc6] md:bg-red-950 rounded-full" /> TypeScript
            </li>
            <li className="flex items-center gap-2 md:gap-[0.5vw]">
              <div className="w-1.5 h-1.5 md:w-[0.4vw] md:h-[0.4vw] bg-[#e6dcc6] md:bg-red-950 rounded-full" /> Node.js &
              Bun
            </li>
            <li className="flex items-center gap-2 md:gap-[0.5vw]">
              <div className="w-1.5 h-1.5 md:w-[0.4vw] md:h-[0.4vw] bg-[#e6dcc6] md:bg-red-950 rounded-full" /> Tailwind
              CSS
            </li>
            <li className="flex items-center gap-2 md:gap-[0.5vw]">
              <div className="w-1.5 h-1.5 md:w-[0.4vw] md:h-[0.4vw] bg-[#e6dcc6] md:bg-red-950 rounded-full" /> PostgreSQL
            </li>
            <li className="flex items-center gap-2 md:gap-[0.5vw]">
              <div className="w-1.5 h-1.5 md:w-[0.4vw] md:h-[0.4vw] bg-[#e6dcc6] md:bg-red-950 rounded-full" /> Docker
            </li>
          </ul>
        </div>

        {/* Philosophy - Made smaller on mobile if needed, but span-1 is fine */}
        <div className="col-span-2 md:col-span-1 md:row-span-1 border-r-4 border-b-4 md:border-r-[0.3vw] md:border-b-[0.3vw] border-red-950 p-4 md:p-[1.5vw] flex flex-col justify-center bg-red-950 text-[#e6dcc6] overflow-hidden min-h-[160px] md:min-h-0 hover:scale-[1.02] transition-transform duration-300">
          <p className="text-sm md:text-[1.5vw] font-bold text-center leading-tight">
            &quot;Simplicity is the ultimate sophistication.&quot;
          </p>
        </div>

        {/* Sprite Animation - Kept playful */}
        <div className="col-span-1 md:col-span-1 md:row-span-1 border-r-4 border-b-4 md:border-r-[0.3vw] md:border-b-[0.3vw] border-red-950 p-4 md:p-[1.5vw] flex flex-col justify-center items-center hover:bg-red-950/5 transition-colors bg-background overflow-hidden min-h-[180px] md:min-h-0">
          <SpriteAnimation />
        </div>

        {/* Now Playing / Music Vibe - REORDERED: Above Game */}
        <div className="col-span-1 md:col-span-1 md:row-span-1 border-r-4 border-b-4 md:border-r-[0.3vw] md:border-b-[0.3vw] border-red-950 p-4 md:p-[1.5vw] flex flex-col justify-between bg-red-950/5 hover:bg-red-950/10 transition-colors min-h-[180px] md:min-h-0 group">
          <MusicPlayer />
        </div>

        {/* Stats / Grid Item - REORDERED: Above Game */}
        <div className="col-span-2 md:col-span-1 md:row-span-1 border-r-4 border-b-4 md:border-r-[0.3vw] md:border-b-[0.3vw] border-red-950 p-4 md:p-[1.5vw] flex flex-col justify-center items-center hover:bg-red-950 text-red-950 hover:text-[#e6dcc6] transition-colors min-h-[180px] md:min-h-0 group cursor-default">
          <Code className="w-8 h-8 md:w-[3vw] md:h-[3vw] mb-2 group-hover:scale-110 transition-transform" />
          <p className="text-3xl md:text-[2.5vw] font-black">99%</p>
          <p className="text-xs md:text-[0.7vw] font-bold uppercase tracking-widest opacity-80">
            Typesafe
          </p>
        </div>

        {/* Don't Press Game - REORDERED: Below Music/Stats */}
        <div className="col-span-2 md:col-span-1 md:row-span-1 border-r-4 border-b-4 md:border-r-[0.3vw] md:border-b-[0.3vw] border-red-950 flex flex-col justify-center items-center bg-background min-h-[260px] md:min-h-0 overflow-hidden relative">
          <DoNotPress />
        </div>

        {/* Vibe Code Claim - Full Width on Mobile */}
        <div className="col-span-2 md:col-span-2 md:row-span-1 border-r-4 border-b-4 md:border-r-[0.3vw] md:border-b-[0.3vw] border-red-950 p-4 md:p-[2vw] flex flex-col justify-center items-start bg-[#e6dcc6] text-red-950 overflow-hidden min-h-[140px] md:min-h-0 hover:bg-[#dccfac] transition-colors">
          <h3 className="text-xl md:text-[2.2vw] font-black uppercase tracking-tighter mb-1 md:mb-[0.5vw]">
            NO VIBE CODING
          </h3>
          <p className="text-sm md:text-[1.2vw] font-medium leading-relaxed max-w-prose">
            I&apos;m probably the last developer alive who&apos;s never vibe coded.{" "}
            <span className="italic opacity-60">(I promise).</span>
          </p>
        </div>

        {/* Marquee Banner */}
        <div className="col-span-2 md:col-span-2 md:row-span-1 border-r-4 border-b-4 md:border-r-[0.3vw] md:border-b-[0.3vw] border-red-950 bg-red-950 text-[#e6dcc6] overflow-hidden flex items-center min-h-[100px] md:min-h-0">
          <TextMarquee
            baseVelocity={2}
            className="text-3xl md:text-[3vw] font-black uppercase tracking-widest py-4 md:py-[1vw]"
          >
            Open for Work • Full Stack Developer • UI/UX Design • React •
            Node.js •
          </TextMarquee>
        </div>

        {/* Contact/Social CTA */}
        <div className="col-span-2 md:col-span-2 md:row-span-1 border-r-4 border-b-4 md:border-r-[0.3vw] md:border-b-[0.3vw] border-red-950 p-4 md:p-[2vw] flex items-center justify-between hover:bg-red-950/5 transition-colors bg-background overflow-hidden min-h-[140px] md:min-h-0">
          <div>
            <h3 className="text-xl md:text-[2vw] font-bold text-red-950">
              Let&apos;s work together
            </h3>
            <p className="opacity-80 text-sm md:text-[1vw]">
              Have a project in mind?
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <button className="px-3 py-2 md:px-[2vw] md:py-[1vw] bg-red-950 text-[#e6dcc6] font-bold uppercase tracking-wider hover:bg-red-900 transition-colors text-sm md:text-[1.2vw]">
                Get in touch
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md md:max-w-[40vw] bg-[#fbf5e9] border-4 md:border-[0.3vw] border-red-950 text-red-950 p-6 md:p-[2vw]">
              <DialogHeader className="md:space-y-[1vw]">
                <DialogTitle className="text-2xl md:text-[2vw] font-bold uppercase tracking-wide">
                  Get in Touch
                </DialogTitle>
                <DialogDescription className="text-red-900/80 md:text-[1vw]">
                  Feel free to reach out for collaborations or just a friendly
                  hello.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col space-y-4 md:space-y-[1.5vw] py-4 md:py-[1.5vw]">
                <div className="flex items-center space-x-3 md:space-x-[1vw] text-lg md:text-[1.2vw] font-medium p-3 md:p-[1vw] border-2 md:border-[0.2vw] border-red-950/20 rounded md:rounded-[0.5vw] hover:bg-red-950/5 transition-colors">
                  <Mail className="h-5 w-5 md:w-[1.5vw] md:h-[1.5vw]" />
                  <a href="mailto:daniel@ametsowou.me">daniel@ametsowou.me</a>
                </div>
                <div className="flex items-center space-x-3 md:space-x-[1vw] text-lg md:text-[1.2vw] font-medium p-3 md:p-[1vw] border-2 md:border-[0.2vw] border-red-950/20 rounded md:rounded-[0.5vw] hover:bg-red-950/5 transition-colors">
                  <Phone className="h-5 w-5 md:w-[1.5vw] md:h-[1.5vw]" />
                  <a href="tel:+22870405717">+228 70405717</a>
                </div>
                <div className="flex items-center space-x-3 md:space-x-[1vw] text-lg md:text-[1.2vw] font-medium p-3 md:p-[1vw] border-2 md:border-[0.2vw] border-red-950/20 rounded md:rounded-[0.5vw] hover:bg-red-950/5 transition-colors">
                  <FaWhatsapp className="h-5 w-5 md:w-[1.5vw] md:h-[1.5vw]" />
                  <a
                    href="https://wa.me/22870405717"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    +228 70405717
                  </a>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* More filler for grid completeness if needed, or dynamic content */}
        <div className="col-span-1 md:col-span-1 md:row-span-1 border-r-4 border-b-4 md:border-r-[0.3vw] md:border-b-[0.3vw] border-red-950 p-4 md:p-[1.5vw] flex items-center justify-center bg-yellow-400/20 hover:bg-yellow-400/30 transition-colors overflow-hidden relative group min-h-[180px] md:min-h-0">
          <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="text-9xl md:text-[8vw]">☕</span>
          </div>
          <p className="font-bold text-red-950 rotate-45 text-sm md:text-[1vw] z-10">
            FUELLED BY COFFEE
          </p>
        </div>
        <div className="col-span-1 md:col-span-1 md:row-span-1 border-r-4 border-b-4 md:border-r-[0.3vw] md:border-b-[0.3vw] border-red-950 p-4 md:p-[1.5vw] flex items-center justify-center bg-blue-400/10 hover:bg-blue-400/20 transition-colors overflow-hidden min-h-[180px] md:min-h-0">
          <p className="font-bold text-red-950 -rotate-12 text-sm md:text-[1vw]">
            PIXEL PERFECT
          </p>
        </div>

        {/* Creative Elements */}
        


        {/* 2 Cols of 1x1 items */}
        <div className="col-span-1 md:col-span-1 md:row-span-1 border-r-4 border-b-4 md:border-r-[0.3vw] md:border-b-[0.3vw] border-red-950 hover:bg-red-950/5 transition-colors bg-red-950/5 overflow-hidden min-h-[180px] md:min-h-0">
           <IrregularClock />
        </div>
        <div className="col-span-1 md:col-span-1 md:row-span-1 border-r-4 border-b-4 md:border-r-[0.3vw] md:border-b-[0.3vw] border-red-950 hover:bg-red-950/5 transition-colors bg-background overflow-hidden min-h-[180px] md:min-h-0">
           <DayProgressBar />
        </div>
        <div className="col-span-2 md:col-span-1 md:row-span-1 border-r-4 border-b-4 md:border-r-[0.3vw] md:border-b-[0.3vw] border-red-950 hover:bg-red-950/5 transition-colors bg-background overflow-hidden min-h-[180px] md:min-h-0">
             <DodgingButton />
        </div>
        
        {/* Filler Grid Pattern */}
        <div className="col-span-2 md:col-span-1 md:row-span-3 border-r-4 border-b-4 md:border-r-[0.3vw] md:border-b-[0.3vw] border-red-950 hover:bg-red-950/5 transition-colors bg-background overflow-hidden min-h-[180px] md:min-h-0">
             <GridPattern />
        </div>
      </div>
    </div>
  );
}
