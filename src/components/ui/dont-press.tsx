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
      <p className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest text-red-950/40 select-none">
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
              className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-red-600 border-4 border-red-950 shadow-[6px_6px_0px_0px_rgba(69,10,10,1)] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center group relative overflow-hidden"
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
              
              <span className="text-[#e6dcc6] font-black uppercase text-[10px] md:text-xs text-center z-10 leading-tight">
                Do Not
                <br />
                Press
              </span>
            </motion.button>
            
            {/* Tempting arrows or indicators */}
            <motion.div
                className="absolute -right-8 top-0 text-red-950/30"
                animate={{ x: [-5, 5, -5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
            >
                <div className="text-xl font-black">←</div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="lost"
            className="flex flex-col items-center text-center space-y-3 z-10"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
          >
            <motion.div
                className="p-3 bg-red-950 rounded-full text-[#e6dcc6]"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
            >
                <Skull className="w-8 h-8 md:w-10 md:h-10" />
            </motion.div>
            
            <div>
                <h3 className="font-black text-red-950 text-lg md:text-xl uppercase leading-none">
                You Failed
                </h3>
                <p className="text-[10px] md:text-xs text-red-950/60 font-bold mt-1 uppercase tracking-wide">
                Simplicity is hard.
                </p>
            </div>

            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 bg-transparent border-2 border-red-950 text-red-950 text-[10px] font-bold uppercase tracking-wider hover:bg-red-950 hover:text-[#e6dcc6] transition-colors"
            >
              <RotateCcw size={14} />
              Try Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle background detail */}
       <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <div className="w-32 h-32 border-2 border-red-950 rounded-full border-dashed animate-[spin_10s_linear_infinite]" />
       </div>
    </div>
  );
}
