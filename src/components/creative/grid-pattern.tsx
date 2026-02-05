"use client";

import { motion } from "framer-motion";

export const GridPattern = () => {
    return (
        <div className="w-full h-full bg-[#e6dcc6] relative overflow-hidden flex items-center justify-center">
             <div className="inset-0 absolute opacity-20" 
                style={{ backgroundImage: 'radial-gradient(#450a0a 1px, transparent 1px)', backgroundSize: '16px 16px' }}
             />
             <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                 className="w-16 h-16 border-2 border-dashed border-red-950 rounded-full"
             />
        </div>
    );
};
