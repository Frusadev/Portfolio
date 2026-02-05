"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

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
    <div className="w-full h-full flex flex-col items-center justify-center p-6 gap-2">
      <div className="text-xs font-bold text-red-950">DAY_PROGRESS</div>
      <div className="w-full h-4 border-2 border-red-950 p-[2px]">
        <div 
            className="h-full bg-red-950 transition-all duration-1000 ease-linear"
            style={{ width: `${progress}%` }}
        />
      </div>
      <div className="text-[10px] text-red-950/60 font-mono">{progress.toFixed(4)}%</div>
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
            <div className="font-mono text-xl md:text-3xl font-bold text-red-950">
                {time.toLocaleTimeString()}
            </div>
            <div className="text-[10px] text-red-950/50 mt-2">IRREGULAR_TICK</div>
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

// 11. Dodging Button (Once)
export const DodgingButton = () => {
    const [dodged, setDodged] = useState(false);
    const x = useSpring(0);
    const y = useSpring(0);

    const handleHover = () => {
        if (!dodged) {
            const randomX = (Math.random() - 0.5) * 100;
            const randomY = (Math.random() - 0.5) * 100;
            x.set(randomX);
            y.set(randomY);
            setDodged(true);
            setTimeout(() => {
                x.set(0);
                y.set(0);
                setDodged(false); // Reset after 2s for replayability
            }, 2000);
        }
    };

    return (
        <div className="w-full h-full flex items-center justify-center">
            <motion.button
                style={{ x, y }}
                onMouseEnter={handleHover}
                className="bg-red-950 text-[#e6dcc6] px-4 py-2 font-bold text-xs uppercase shadow-[4px_4px_0px_0px_rgba(69,10,10,0.5)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-shadow"
            >
                {dodged ? "MISSED!" : "CLICK_ME"}
            </motion.button>
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

