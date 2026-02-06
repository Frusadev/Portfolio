"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Skull, RotateCcw } from "lucide-react";

export default function DoNotPress() {
  const [status, setStatus] = useState<"idle" | "lost">("idle");

  const handlePress = () => {
    setStatus("lost");
  };

  const handleReset = () => {
    setStatus("idle");
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full relative overflow-hidden bg-red-950/5">
      <p className="absolute top-3 left-3 md:top-[0.8vw] md:left-[0.8vw] text-[10px] md:text-[0.7vw] font-bold uppercase tracking-widest text-red-950/40 select-none">
        Self Control Test
      </p>

      <AnimatePresence mode="wait">
        {status === "idle" ? (
          <motion.div
            key="button-container"
            className="relative z-10"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0, rotate: 15 }}
          >
            <motion.button
              className="w-20 h-20 md:w-[6vw] md:h-[6vw] rounded-full bg-red-600 border-4 md:border-[0.3vw] border-red-950 shadow-[6px_6px_0px_0px_rgba(69,10,10,1)] md:shadow-[0.4vw_0.4vw_0px_0px_rgba(69,10,10,1)] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center group relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePress}
            >
              {/* Pulse effect */}
              <motion.div 
                className="absolute inset-0 bg-white opacity-20"
                animate={{ opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              <span className="text-[#e6dcc6] font-black uppercase text-[10px] md:text-[0.9vw] text-center z-10 leading-tight">
                Do Not
                <br />
                Press
              </span>
            </motion.button>
            
            {/* Tempting arrows or indicators */}
            <motion.div
                className="absolute -right-8 top-0 md:-right-[2vw] md:top-0 text-red-950/30"
                animate={{ x: [-5, 5, -5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
            >
                <div className="text-xl md:text-[1.5vw] font-black">←</div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="lost"
            className="flex flex-col items-center text-center space-y-3 md:space-y-[0.75vw] z-10"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
          >
            <motion.div
                className="p-3 md:p-[0.75vw] bg-red-950 rounded-full text-[#e6dcc6]"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
            >
                <Skull className="w-8 h-8 md:w-[2.5vw] md:h-[2.5vw]" />
            </motion.div>
            
            <div>
                <h3 className="font-black text-red-950 text-lg md:text-[1.2vw] uppercase leading-none">
                You Failed
                </h3>
                <p className="text-[10px] md:text-[0.8vw] text-red-950/60 font-bold mt-1 md:mt-[0.25vw] uppercase tracking-wide">
                Simplicity is hard.
                </p>
            </div>

            <button
              onClick={handleReset}
              className="flex items-center gap-2 md:gap-[0.5vw] px-4 py-2 md:px-[1vw] md:py-[0.5vw] bg-transparent border-2 md:border-[0.15vw] border-red-950 text-red-950 text-[10px] md:text-[0.7vw] font-bold uppercase tracking-wider hover:bg-red-950 hover:text-[#e6dcc6] transition-colors"
            >
              <RotateCcw size={14} className="md:w-[0.9vw] md:h-[0.9vw]" />
              Try Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle background detail */}
       <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <div className="w-32 h-32 md:w-[8vw] md:h-[8vw] border-2 md:border-[0.2vw] border-red-950 rounded-full border-dashed animate-[spin_10s_linear_infinite]" />
       </div>
    </div>
  );
}
