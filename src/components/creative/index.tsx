"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useSpring } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

import { GridPattern } from "./grid-pattern";

export { GridPattern };

// 1. Minecraft Block
export const MinecraftBlock = () => {
  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="relative w-32 h-32 md:w-40 md:h-40 hover:scale-110 transition-transform duration-300">
         {/* Using the SVG directly or via Image */}
         <Image 
            src="/illustrations/mc.svg" 
            alt="Minecraft Block" 
            fill
            className="object-contain drop-shadow-[4px_4px_0px_rgba(69,10,10,1)]"
         />
      </div>
    </div>
  );
};

// 2. Drifting Dot (Avoids Cursor) or Follows Lazy
export const DriftingDot = () => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { damping: 50, stiffness: 400 }); // Slow spring
  const y = useSpring(0, { damping: 50, stiffness: 400 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    // Calculate relative to center
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;
    
    // Drifts towards but "never reaches" (laggy)
    x.set(clientX - centerX);
    y.set(clientY - centerY);
  };

  return (
    <div 
        ref={ref} 
        onMouseMove={handleMouseMove} 
        onMouseLeave={() => { x.set(0); y.set(0); }}
        className="w-full h-full flex items-center justify-center relative overflow-hidden cursor-crosshair"
    >
      <div className="absolute inset-0 text-[10px] text-red-950/20 p-2 font-mono">
        TRY_TO_CATCH_ME
      </div>
      <motion.div
        style={{ x, y }}
        className="w-4 h-4 bg-red-950 rounded-full"
      />
    </div>
  );
};

// 3. Day Progress Bar
export const DayProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const seconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
      const totalSeconds = 24 * 3600;
      setProgress((seconds / totalSeconds) * 100);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 md:p-[1.5vw] gap-2 md:gap-[0.5vw]">
      <div className="text-xs md:text-[0.8vw] font-bold text-red-950">DAY_PROGRESS</div>
      <div className="w-full h-4 md:h-[1vw] border-2 md:border-[0.2vw] border-red-950 p-[2px] md:p-[0.1vw]">
        <div 
            className="h-full bg-red-950 transition-all duration-1000 ease-linear"
            style={{ width: `${progress}%` }}
        />
      </div>
      <div className="text-[10px] md:text-[0.7vw] text-red-950/60 font-mono">{progress.toFixed(4)}%</div>
    </div>
  );
};

// 4. Irregular Clock
export const IrregularClock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        
        const tick = () => {
            setTime(new Date());
            // Random delay between 500ms and 1500ms
            const delay = 500 + Math.random() * 1000;
            timeoutId = setTimeout(tick, delay);
        };
        
        tick();
        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="font-mono text-xl md:text-[2.5vw] font-bold text-red-950">
                {time.toLocaleTimeString()}
            </div>
            <div className="text-[10px] md:text-[0.7vw] text-red-950/50 mt-2 md:mt-[0.5vw]">IRREGULAR_TICK</div>
        </div>
    );
};

// 5. Rotating Square (Faster on Interaction)
export const RotatingSquare = () => {
    const [speed, setSpeed] = useState(20); // seconds per rotation

    return (
        <div 
            className="w-full h-full flex items-center justify-center"
            onMouseEnter={() => setSpeed(2)}
            onMouseLeave={() => setSpeed(20)}
        >
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ 
                    duration: speed, 
                    ease: "linear", 
                    repeat: Infinity 
                }}
                className="w-16 h-16 border-4 border-red-950 bg-red-950/10"
            />
        </div>
    );
};

// 6. Growing Line
export const GrowingLine = () => {
    const [width, setWidth] = useState(0);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setWidth(prev => (prev + 1) % 100); // cycle 0-100%
        }, 1000); // 1% per second approx for demo (screen size varies)
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full h-full flex flex-col justify-end pb-8 px-6">
             <div className="text-xs mb-2 font-mono">GROWING_LINE_1PX/S</div>
             <div className="h-[2px] bg-red-950 transition-all duration-300" style={{ width: `${width}%` }} />
        </div>
    );
};

// 7. Blinking Caret Terminal
export const TerminalCaret = () => {
    return (
        <div className="w-full h-full p-6 font-mono text-sm text-red-950 flex flex-col">
            <div>&gt; _init_creative_mode</div>
            <div>&gt; loading_assets...</div>
            <div className="flex">
                &gt; waiting_for_input<span className="animate-pulse ml-1 inline-block w-2 h-4 bg-red-950"></span>
            </div>
        </div>
    );
};

// 8. Ticking Metronome
export const Metronome = () => {
    const [side, setSide] = useState('left');
    
    useEffect(() => {
        const interval = setInterval(() => {
            setSide(prev => prev === 'left' ? 'right' : 'left');
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-40 h-2 bg-red-950/10 rounded-full relative">
                <motion.div 
                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-red-950 rounded-full shadow-sm"
                    animate={{ left: side === 'left' ? '0%' : '100%' }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                />
            </div>
        </div>
    );
};

// 9. Hover Ripple (Simple)
export const HoverRipple = () => {
  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden group">
      <div className="absolute inset-0 bg-red-950/0 group-hover:bg-red-950/5 transition-colors duration-500" />
      <div className="w-8 h-8 rounded-full border-2 border-red-950 group-hover:scale-[10] opacity-0 group-hover:opacity-10 transition-all duration-700 ease-out" />
      <span className="z-10 font-bold pointer-events-none">HOVER_ME</span>
    </div>
  );
};

// 10. Infinite Spinner
export const InfiniteSpinner = () => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-4">
            <div className="w-8 h-8 border-4 border-red-950/20 border-t-red-950 rounded-full animate-spin" />
            <div className="text-[10px] animate-pulse">LOADING_ETERNITY...</div>
        </div>
    );
};

// 11. Dodging Button (Uncatchable)
export const DodgingButton = () => {
    const [text, setText] = useState("CLICK_ME");
    const x = useSpring(0, { stiffness: 400, damping: 15 });
    const y = useSpring(0, { stiffness: 400, damping: 15 });

    const dodge = (e: React.MouseEvent | React.TouchEvent | unknown) => {
        // Calculate interaction position relative to viewport or element
        // Since button moves, we use client coordinates
        let clientX, clientY;
        const event = e as React.MouseEvent | React.TouchEvent; // Cast for access
        
        if ('touches' in event) {
           clientX = event.touches[0].clientX;
           clientY = event.touches[0].clientY;
        } else if ('clientX' in event) {
           clientX = event.clientX;
           clientY = event.clientY;
        } else {
            return;
        }

        // Current button position (approximate since we don't have ref rect easily every frame, 
        // but we assume it's roughly near its original center + offset)
        // A simpler "run away" strategy:
        // Use a large random jump but biased by the quadrant of the interaction
        
        // If we don't have rect refs, purely random "far" jump is safer than calculating vectors 
        // that might result in 0 movement if not careful.
        // But user asked for "far away enough from cursor".
        
        // Let's maximize the jump distance.
        // Range: X: -70 to 70, Y: -50 to 50 (approx based on previous 140/100)
        
        const currentX = x.get();
        const currentY = y.get();

        // Calculate a new position that is far from the current one
        // We pick 4 candidates and choose the furthest from current
        
        let bestX = 0;
        let bestY = 0;
        let maxDist = 0;
        
        for (let i = 0; i < 4; i++) {
             const randX = (Math.random() - 0.5) * 200; // Increased range
             const randY = (Math.random() - 0.5) * 150;
             const dist = Math.sqrt(Math.pow(randX - currentX, 2) + Math.pow(randY - currentY, 2));
             if (dist > maxDist) {
                 maxDist = dist;
                 bestX = randX;
                 bestY = randY;
             }
        }
        
        // Ensure it moves
        x.set(bestX);
        y.set(bestY);
        
        const taunts = ["NOPE!", "TOO_SLOW!", "TRY_AGAIN", "MISSED!", "TOO_FAST!"];
        setText(taunts[Math.floor(Math.random() * taunts.length)]);
    };

    return (
        <div className="w-full h-full flex items-center justify-center relative overflow-visible z-30">
            <motion.button
                style={{ x, y }}
                onMouseEnter={dodge}
                onTouchStart={dodge}
                className="bg-red-950 text-[#e6dcc6] px-4 py-2 md:px-[1vw] md:py-[0.5vw] font-bold text-xs md:text-[0.9vw] uppercase shadow-[4px_4px_0px_0px_rgba(69,10,10,0.5)] md:shadow-[0.3vw_0.3vw_0px_0px_rgba(69,10,10,0.5)] z-20 whitespace-nowrap"
            >
                {text}
            </motion.button>
        </div>
    );
};

// 22. Time Sky (Vertical)
export const TimeSky = () => {
  const [isDay, setIsDay] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
        const hour = new Date().getHours();
        setIsDay(hour >= 6 && hour < 18);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return <div className="w-full h-full bg-[#e6dcc6]" />;

  return (
    <div className="w-full h-full relative flex flex-col border-none">
       {/* Sky */}
       <div className={cn(
           "flex-1 relative transition-colors duration-1000 border-b-4 border-red-950 overflow-hidden", 
           isDay ? "bg-[#87CEEB]" : "bg-[#1a1a2e]"
       )}>
          {/* Celestial Body */}
          <motion.div
             initial={{ y: 50, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ duration: 1.5, type: "spring" }}
             className={cn(
               "absolute top-8 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full border-4 border-red-950 shadow-[4px_4px_0px_0px_rgba(69,10,10,1)] z-10",
               isDay ? "bg-[#FFD700]" : "bg-[#F4F6F0]"
             )}
          />
          
          {/* Clouds or Stars */}
          {isDay ? (
             <>
                <motion.div 
                    animate={{ x: [0, 100, 0] }} 
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-4 left-4 w-12 h-8 bg-white/80 rounded-full blur-sm" 
                />
             </>
          ) : (
             <>
                 <div className="absolute top-4 left-10 w-1 h-1 bg-white rounded-full animate-pulse" />
                 <div className="absolute top-10 right-10 w-1 h-1 bg-white rounded-full animate-pulse delay-75" />
                 <div className="absolute top-20 left-1/2 w-1.5 h-1.5 bg-white rounded-full animate-pulse delay-150" />
             </>
          )}

       </div>
       
       {/* Ground */}
       <div className={cn(
           "h-1/3 w-full relative transition-colors duration-1000 flex items-end justify-center pb-4", 
           isDay ? "bg-[#6cc349]" : "bg-[#503120]" 
       )}>
           {/* Tiny Yellow Dots */}
           <div className="absolute top-3 left-6 w-1 h-1 bg-[#FFD700] rounded-full opacity-80" />
           <div className="absolute top-5 right-12 w-1.5 h-1.5 bg-[#FFD700] rounded-full opacity-60" />
           <div className="absolute bottom-6 left-1/4 w-1 h-1 bg-[#FFD700] rounded-full opacity-70" />
           <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-[#FFD700] rounded-full opacity-90" />
           <div className="absolute bottom-4 right-8 w-1.5 h-1.5 bg-[#FFD700] rounded-full opacity-50" />
           <div className="absolute top-4 left-1/2 w-1 h-1 bg-[#FFD700] rounded-full opacity-75" />
           
           {/* Text Label */}
           <div className="bg-[#e6dcc6] px-3 py-1 border-2 border-red-950 text-red-950 font-bold text-xs uppercase shadow-[2px_2px_0px_0px_rgba(69,10,10,1)] z-10">
              {isDay ? "06:00 - 18:00" : "18:00 - 06:00"}
           </div>
       </div>
    </div>
  );
};

// 12. Breathing Circle
export const BreathingCircle = () => {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <motion.div
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-16 h-16 rounded-full border-2 border-red-950 bg-red-950/5"
            />
        </div>
    );
};

// 13. Hue Shift Gradient
export const HueShifter = () => {
    return (
        <div className="w-full h-full relative overflow-hidden">
             <motion.div 
                animate={{ filter: ["hue-rotate(0deg)", "hue-rotate(90deg)", "hue-rotate(0deg)"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-br from-[#e6dcc6] via-[#dccfac] to-[#cbb88a]"
             />
             <div className="relative z-10 flex items-center justify-center h-full font-bold text-red-950 mix-blend-overlay">
                COLOR_SHIFT
             </div>
        </div>
    );
};

// 14. Subtle Noise Texture
export const NoiseField = () => {
    return (
        <div className="w-full h-full relative overflow-hidden bg-[#e6dcc6]">
            <div className="absolute inset-0 opacity-20 pointer-events-none"
             style={{
                 backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
             }} 
            />
            <div className="flex items-center justify-center h-full text-red-950/40 text-xs font-mono">
                STATIC_NOISE
            </div>
        </div>
    );
};

// 15. Minimal Wave
export const MinimalWave = () => {
    return (
        <div className="w-full h-full flex items-center justify-center overflow-hidden">
             <div className="flex gap-1 items-end h-20">
                 {[...Array(5)].map((_, i) => (
                     <motion.div
                        key={i}
                        animate={{ height: ["20%", "80%", "20%"] }}
                        transition={{ 
                            duration: 1.5, 
                            repeat: Infinity, 
                            ease: "easeInOut",
                            delay: i * 0.2
                        }}
                        className="w-4 bg-red-950"
                     />
                 ))}
             </div>
        </div>
    );
};

// 16. Pixel Traveller
export const PixelTraveller = () => {
    return (
        <div className="w-full h-full relative p-4">
            <motion.div
                animate={{ 
                    x: [0, 200, 200, 0, 0],
                    y: [0, 0, 100, 100, 0],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="w-2 h-2 bg-red-950 absolute top-4 left-4"
            />
            <div className="absolute bottom-4 right-4 text-xs opacity-50">TRAVELLER</div>
        </div>
    );
};

// 17. Corner Morph
export const CornerMorph = () => {
    return (
        <div className="w-full h-full flex items-center justify-center p-8">
            <motion.div
                animate={{ 
                    borderRadius: ["0%", "50%", "0%", "25%", "0%"],
                    rotate: [0, 180, 0]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="w-full h-full bg-red-950"
            />
        </div>
    );
};

// 18. Circle Fill
export const CircleFill = () => {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="relative w-24 h-24 rounded-full border-2 border-red-950 overflow-hidden">
                <motion.div
                    animate={{ height: ["0%", "100%", "0%"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-0 left-0 w-full bg-red-950"
                />
            </div>
        </div>
    );
};

// 19. Diagonal Sweep
export const DiagonalSweep = () => {
    return (
        <div className="w-full h-full relative overflow-hidden bg-red-950/5">
             <motion.div
                animate={{ left: ["-100%", "200%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-red-950/20 to-transparent -skew-x-12"
             />
        </div>
    );
};

// 20. Warp Box
export const WarpBox = () => {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <motion.div
                 whileHover={{ 
                     borderRadius: ["20%", "10%", "50%", "10%"],
                     scale: 0.9,
                     rotate: 15
                 }}
                 className="w-24 h-24 bg-red-950 cursor-pointer"
            />
        </div>
    );
};

// 21. Dot Grid
export const DotGrid = () => {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="grid grid-cols-5 gap-2">
                {[...Array(25)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{ opacity: [0.2, 1, 0.2] }}
                        transition={{ 
                            duration: 2, 
                            repeat: Infinity, 
                            delay: Math.random() * 2,
                            ease: "easeInOut" 
                        }}
                        className="w-1.5 h-1.5 bg-red-950 rounded-full"
                    />
                ))}
            </div>
        </div>
    );
};


