import { Earth, Mail, Phone, Music, Code } from "lucide-react";
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
  MinecraftBlock, 
  DriftingDot, 
  DayProgressBar, 
  IrregularClock, 
  RotatingSquare, 
  GrowingLine, 
  TerminalCaret, 
  Metronome, 
  HoverRipple,
  InfiniteSpinner,
  DodgingButton,
  BreathingCircle,
  HueShifter,
  NoiseField,
  MinimalWave,
  PixelTraveller,
  CornerMorph,
  CircleFill,
  DiagonalSweep,
  WarpBox,
  DotGrid
} from "@/components/creative";

export default function Home() {
  return (
    <div className="w-full min-h-full md:h-full md:inline-block md:min-w-full bg-background">
      <div className="grid grid-cols-2 md:grid-cols-none md:grid-rows-3 md:grid-flow-col md:auto-cols-[300px] w-full min-h-full md:h-full border-l-2 md:border-l-4 border-t-2 md:border-t-4 border-red-950 bg-background md:w-fit">
        {/* Hero / Intro Card - Large */}
        <div className="col-span-2 md:col-span-2 md:row-span-2 border-r-2 border-b-2 md:border-r-4 md:border-b-4 border-red-950 p-6 md:p-8 flex flex-col justify-center bg-background min-h-[300px] md:min-h-0">
          <h1 className="text-2xl md:text-6xl font-bold text-red-950 mb-4">
            Hi, I&apos;m Daniel.
          </h1>
          <p className="text-sm md:text-xl text-red-900/80 max-w-lg leading-relaxed">
            I build accessible, pixel-perfect, secure, and performant web
            applications. I enjoy creating things that live on the internet,
            from simple websites to complex web applications.
          </p>
        </div>

        {/* Current Status */}
        <div className="col-span-1 md:col-span-1 md:row-span-1 border-r-2 border-b-2 md:border-r-4 md:border-b-4 border-red-950 p-4 md:p-6 flex flex-col justify-between hover:bg-red-950/5 transition-colors bg-background overflow-hidden min-h-[160px] md:min-h-0">
          <h3 className="text-sm md:text-xl font-bold text-red-950">
            Current Focus
          </h3>
          <p className="text-xs md:text-lg leading-tight">
            Building <span className="font-bold">Quivo Agency</span> and
            exploring AI agents.
          </p>
        </div>

        {/* Location / Time */}
        <div className="col-span-1 md:col-span-1 md:row-span-1 border-r-2 border-b-2 md:border-r-4 md:border-b-4 border-red-950 p-4 md:p-6 flex flex-col justify-center items-center text-center hover:bg-red-950/5 transition-colors bg-background overflow-hidden min-h-[160px] md:min-h-0">
          <div className="text-xl md:text-4xl mb-1 md:mb-2">
            <Earth />
          </div>
          <p className="font-bold text-red-950 text-xs md:text-base">
            Based in Lome, Togo
          </p>
          <p className="text-[10px] md:text-sm opacity-70">
            Available for Remote Work
          </p>
        </div>

        {/* Experience / Tech Stack */}
        <div className="col-span-1 row-span-2 md:col-span-1 md:row-span-2 border-r-2 border-b-2 md:border-r-4 md:border-b-4 border-red-950 p-4 md:p-6 flex flex-col hover:bg-red-950/5 transition-colors bg-background overflow-hidden min-h-[200px] md:min-h-0">
          <h3 className="text-base md:text-xl font-bold text-red-950 mb-2 md:mb-4">
            Tech Arsenal
          </h3>
          <ul className="space-y-1 md:space-y-2 text-red-900/90 font-medium text-[10px] md:text-sm">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-red-950 rounded-full" /> React &
              Next.js
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-red-950 rounded-full" /> TypeScript
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-red-950 rounded-full" /> Node.js &
              Bun
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-red-950 rounded-full" /> Tailwind
              CSS
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-red-950 rounded-full" /> PostgreSQL
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-red-950 rounded-full" /> Docker
            </li>
          </ul>
        </div>

        {/* Philosophy - Made smaller on mobile if needed, but span-1 is fine */}
        <div className="col-span-1 md:col-span-1 md:row-span-1 border-r-2 border-b-2 md:border-r-4 md:border-b-4 border-red-950 p-4 md:p-6 flex flex-col justify-center bg-red-950 text-[#e6dcc6] overflow-hidden min-h-[140px] md:min-h-0 hover:scale-[1.02] transition-transform duration-300">
          <p className="text-xs md:text-2xl font-bold text-center leading-tight">
            &quot;Simplicity is the ultimate sophistication.&quot;
          </p>
        </div>

        {/* Sprite Animation - Kept playful */}
        <div className="col-span-1 md:col-span-1 md:row-span-1 border-r-2 border-b-2 md:border-r-4 md:border-b-4 border-red-950 p-4 md:p-6 flex flex-col justify-center items-center hover:bg-red-950/5 transition-colors bg-background overflow-hidden min-h-[140px] md:min-h-0">
          <SpriteAnimation />
        </div>

        {/* Now Playing / Music Vibe - REORDERED: Above Game */}
        <div className="col-span-1 md:col-span-1 md:row-span-1 border-r-2 border-b-2 md:border-r-4 md:border-b-4 border-red-950 p-4 flex flex-col justify-between bg-red-950/5 hover:bg-red-950/10 transition-colors min-h-[160px] md:min-h-0 group">
          <div className="flex justify-between items-start">
            <Music className="text-red-950 w-6 h-6 animate-pulse" />
            <div className="flex space-x-1 items-end h-6">
              <span className="w-1 h-2 bg-red-950 animate-[bounce_1s_infinite]" />
              <span className="w-1 h-4 bg-red-950 animate-[bounce_1.2s_infinite]" />
              <span className="w-1 h-3 bg-red-950 animate-[bounce_0.8s_infinite]" />
            </div>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider font-bold text-red-950/60">
              On Repeat
            </p>
            <p className="font-bold text-red-950 text-sm md:text-base leading-tight truncate">
              Raindance
            </p>
            <p className="text-xs text-red-950/80 truncate">Spotify</p>
          </div>
        </div>

        {/* Stats / Grid Item - REORDERED: Above Game */}
        <div className="col-span-1 md:col-span-1 md:row-span-1 border-r-2 border-b-2 md:border-r-4 md:border-b-4 border-red-950 p-4 flex flex-col justify-center items-center hover:bg-red-950 text-red-950 hover:text-[#e6dcc6] transition-colors min-h-[160px] md:min-h-0 group cursor-default">
          <Code className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
          <p className="text-3xl font-black">99%</p>
          <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">
            Typesafe
          </p>
        </div>

        {/* Don't Press Game - REORDERED: Below Music/Stats */}
        <div className="col-span-2 md:col-span-1 md:row-span-1 border-r-2 border-b-2 md:border-r-4 md:border-b-4 border-red-950 flex flex-col justify-center items-center bg-background min-h-[220px] md:min-h-0 overflow-hidden relative">
          <DoNotPress />
        </div>

        {/* Vibe Code Claim - Full Width on Mobile */}
        <div className="col-span-2 md:col-span-2 md:row-span-1 border-r-2 border-b-2 md:border-r-4 md:border-b-4 border-red-950 p-4 md:p-8 flex flex-col justify-center items-start bg-[#e6dcc6] text-red-950 overflow-hidden min-h-[120px] md:min-h-0 hover:bg-[#dccfac] transition-colors">
          <h3 className="text-lg md:text-3xl font-black uppercase tracking-tighter mb-1 md:mb-2">
            NO VIBE CODING
          </h3>
          <p className="text-xs md:text-lg font-medium leading-relaxed max-w-prose">
            I&apos;m probably the last developer alive who&apos;s never vibe coded.{" "}
            <span className="italic opacity-60">(I promise).</span>
          </p>
        </div>

        {/* Marquee Banner */}
        <div className="col-span-2 md:col-span-2 md:row-span-1 border-r-2 border-b-2 md:border-r-4 md:border-b-4 border-red-950 bg-red-950 text-[#e6dcc6] overflow-hidden flex items-center min-h-[80px] md:min-h-0">
          <TextMarquee
            baseVelocity={2}
            className="text-2xl md:text-4xl font-black uppercase tracking-widest py-4"
          >
            Open for Work • Full Stack Developer • UI/UX Design • React •
            Node.js •
          </TextMarquee>
        </div>

        {/* Contact/Social CTA */}
        <div className="col-span-2 md:col-span-2 md:row-span-1 border-r-2 border-b-2 md:border-r-4 md:border-b-4 border-red-950 p-4 md:p-6 flex items-center justify-between hover:bg-red-950/5 transition-colors bg-background overflow-hidden min-h-[120px] md:min-h-0">
          <div>
            <h3 className="text-lg md:text-2xl font-bold text-red-950">
              Let&apos;s work together
            </h3>
            <p className="opacity-80 text-xs md:text-base">
              Have a project in mind?
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <button className="px-3 py-2 md:px-6 md:py-3 bg-red-950 text-[#e6dcc6] font-bold uppercase tracking-wider hover:bg-red-900 transition-colors text-xs md:text-base">
                Get in touch
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-[#fbf5e9] border-4 border-red-950 text-red-950">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold uppercase tracking-wide">
                  Get in Touch
                </DialogTitle>
                <DialogDescription className="text-red-900/80">
                  Feel free to reach out for collaborations or just a friendly
                  hello.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col space-y-4 py-4">
                <div className="flex items-center space-x-3 text-lg font-medium p-3 border-2 border-red-950/20 rounded hover:bg-red-950/5 transition-colors">
                  <Mail className="h-5 w-5" />
                  <a href="mailto:daniel@ametsowou.me">daniel@ametsowou.me</a>
                </div>
                <div className="flex items-center space-x-3 text-lg font-medium p-3 border-2 border-red-950/20 rounded hover:bg-red-950/5 transition-colors">
                  <Phone className="h-5 w-5" />
                  <a href="tel:+22870405717">+228 70405717</a>
                </div>
                <div className="flex items-center space-x-3 text-lg font-medium p-3 border-2 border-red-950/20 rounded hover:bg-red-950/5 transition-colors">
                  <FaWhatsapp className="h-5 w-5" />
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
        <div className="col-span-1 md:col-span-1 md:row-span-1 border-r-2 border-b-2 md:border-r-4 md:border-b-4 border-red-950 p-4 md:p-6 flex items-center justify-center hover:bg-yellow-400/20 transition-colors bg-background overflow-hidden relative group">
          <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="text-9xl">☕</span>
          </div>
          <p className="font-bold text-red-950 rotate-45 text-xs md:text-base z-10">
            FUELLED BY COFFEE
          </p>
        </div>
        <div className="col-span-1 md:col-span-1 md:row-span-1 border-r-2 border-b-2 md:border-r-4 md:border-b-4 border-red-950 p-4 md:p-6 flex items-center justify-center hover:bg-blue-400/20 transition-colors bg-background overflow-hidden min-h-[140px] md:min-h-0">
          <p className="font-bold text-red-950 -rotate-12 text-xs md:text-base">
            PIXEL PERFECT
          </p>
        </div>

        {/* Creative Elements */}
        
        {/* Col 7 */}
        <div className="col-span-1 md:col-span-1 md:row-span-1 border-r-2 border-b-2 md:border-r-4 md:border-b-4 border-red-950 hover:bg-red-950/5 transition-colors bg-background overflow-hidden min-h-[140px] md:min-h-0">
          <MinecraftBlock />
        </div>
        <div className="col-span-1 md:col-span-1 md:row-span-1 border-r-2 border-b-2 md:border-r-4 md:border-b-4 border-red-950 hover:bg-red-950/5 transition-colors bg-background overflow-hidden min-h-[140px] md:min-h-0">
           <DriftingDot />
        </div>
        <div className="col-span-1 md:col-span-1 md:row-span-1 border-r-2 border-b-2 md:border-r-4 md:border-b-4 border-red-950 hover:bg-red-950/5 transition-colors bg-background overflow-hidden min-h-[140px] md:min-h-0">
           <DayProgressBar />
        </div>

        {/* Col 8 */}
        <div className="col-span-1 md:col-span-1 md:row-span-1 border-r-2 border-b-2 md:border-r-4 md:border-b-4 border-red-950 hover:bg-red-950/5 transition-colors bg-background overflow-hidden min-h-[140px] md:min-h-0">
           <IrregularClock />
        </div>
        <div className="col-span-1 md:col-span-1 md:row-span-1 border-r-2 border-b-2 md:border-r-4 md:border-b-4 border-red-950 hover:bg-red-950/5 transition-colors bg-background overflow-hidden min-h-[140px] md:min-h-0">
           <RotatingSquare />
        </div>
        <div className="col-span-1 md:col-span-1 md:row-span-1 border-r-2 border-b-2 md:border-r-4 md:border-b-4 border-red-950 hover:bg-red-950/5 transition-colors bg-background overflow-hidden min-h-[140px] md:min-h-0">
           <GrowingLine />
        </div>

        {/* Col 9 */}
        <div className="col-span-1 md:col-span-1 md:row-span-1 border-r-2 border-b-2 md:border-r-4 md:border-b-4 border-red-950 hover:bg-red-950/5 transition-colors bg-background overflow-hidden min-h-[140px] md:min-h-0">
             <TerminalCaret />
        </div>
        <div className="col-span-1 md:col-span-1 md:row-span-1 border-r-2 border-b-2 md:border-r-4 md:border-b-4 border-red-950 hover:bg-red-950/5 transition-colors bg-background overflow-hidden min-h-[140px] md:min-h-0">
             <Metronome />
        </div>
        <div className="col-span-1 md:col-span-1 md:row-span-1 border-r-2 border-b-2 md:border-r-4 md:border-b-4 border-red-950 hover:bg-red-950/5 transition-colors bg-background overflow-hidden min-h-[140px] md:min-h-0">
             <HoverRipple />
        </div>

        {/* Col 10 */}
        <div className="col-span-1 md:col-span-1 md:row-span-1 border-r-2 border-b-2 md:border-r-4 md:border-b-4 border-red-950 hover:bg-red-950/5 transition-colors bg-background overflow-hidden min-h-[140px] md:min-h-0">
             <InfiniteSpinner />
        </div>
        <div className="col-span-1 md:col-span-1 md:row-span-1 border-r-2 border-b-2 md:border-r-4 md:border-b-4 border-red-950 hover:bg-red-950/5 transition-colors bg-background overflow-hidden min-h-[140px] md:min-h-0">
             <DodgingButton />
        </div>
        <div className="col-span-1 md:col-span-1 md:row-span-1 border-r-2 border-b-2 md:border-r-4 md:border-b-4 border-red-950 hover:bg-red-950/5 transition-colors bg-background overflow-hidden min-h-[140px] md:min-h-0">
             <BreathingCircle />
        </div>

        {/* New Set - More Fills/Textures */}
        <div className="col-span-1 md:col-span-1 md:row-span-1 border-r-2 border-b-2 md:border-r-4 md:border-b-4 border-red-950 hover:bg-red-950/5 transition-colors bg-background overflow-hidden min-h-[140px] md:min-h-0">
             <HueShifter />
        </div>
        <div className="col-span-1 md:col-span-1 md:row-span-1 border-r-2 border-b-2 md:border-r-4 md:border-b-4 border-red-950 hover:bg-red-950/5 transition-colors bg-background overflow-hidden min-h-[140px] md:min-h-0">
             <NoiseField />
        </div>
        <div className="col-span-1 md:col-span-1 md:row-span-1 border-r-2 border-b-2 md:border-r-4 md:border-b-4 border-red-950 hover:bg-red-950/5 transition-colors bg-background overflow-hidden min-h-[140px] md:min-h-0">
             <MinimalWave />
        </div>
        <div className="col-span-1 md:col-span-1 md:row-span-1 border-r-2 border-b-2 md:border-r-4 md:border-b-4 border-red-950 hover:bg-red-950/5 transition-colors bg-background overflow-hidden min-h-[140px] md:min-h-0">
             <PixelTraveller />
        </div>
        <div className="col-span-1 md:col-span-1 md:row-span-1 border-r-2 border-b-2 md:border-r-4 md:border-b-4 border-red-950 hover:bg-red-950/5 transition-colors bg-background overflow-hidden min-h-[140px] md:min-h-0">
             <CornerMorph />
        </div>
        <div className="col-span-1 md:col-span-1 md:row-span-1 border-r-2 border-b-2 md:border-r-4 md:border-b-4 border-red-950 hover:bg-red-950/5 transition-colors bg-background overflow-hidden min-h-[140px] md:min-h-0">
             <CircleFill />
        </div>
        <div className="col-span-1 md:col-span-1 md:row-span-1 border-r-2 border-b-2 md:border-r-4 md:border-b-4 border-red-950 hover:bg-red-950/5 transition-colors bg-background overflow-hidden min-h-[140px] md:min-h-0">
             <DiagonalSweep />
        </div>
        <div className="col-span-1 md:col-span-1 md:row-span-1 border-r-2 border-b-2 md:border-r-4 md:border-b-4 border-red-950 hover:bg-red-950/5 transition-colors bg-background overflow-hidden min-h-[140px] md:min-h-0">
             <WarpBox />
        </div>
        <div className="col-span-1 md:col-span-1 md:row-span-1 border-r-2 border-b-2 md:border-r-4 md:border-b-4 border-red-950 hover:bg-red-950/5 transition-colors bg-background overflow-hidden min-h-[140px] md:min-h-0">
             <DotGrid />
        </div>
      </div>
    </div>
  );
}
