"use client";

import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaPython, FaGitAlt } from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiPostgresql,
  SiFastapi,
} from "react-icons/si";
import { useRef } from "react";

const stickers = [
  { icon: <FaReact />, color: "text-[#61DAFB]", rotate: 0 },
  { icon: <SiNextdotjs />, rotate: 12 },
  { icon: <SiFastapi />, color: "text-[#339999]", rotate: 12 },
  { icon: <SiTypescript />, color: "text-[#3178C6]", rotate: -5 },
  { icon: <SiTailwindcss />, color: "text-[#06B6D4]", rotate: 8 },
  { icon: <FaNodeJs />, color: "text-[#339933]", rotate: -10 },
  { icon: <SiPostgresql />, color: "text-[#4169E1]", rotate: 5 },
  { icon: <FaGitAlt />, color: "text-[#F05032]", rotate: -8 },
  { icon: <FaPython />, color: "text-[#3776AB]", rotate: 15 },
];

export default function DraggableStickers() {
  const containerRef = useRef(null);

  return (
    <div
      className="hidden md:flex flex-1 w-full relative min-h-[200px]"
      ref={containerRef}
    >
      <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
      </div>
      {stickers.map((sticker, index) => (
        <motion.div
          key={index}
          drag
          dragConstraints={containerRef}
          dragElastic={0.2}
          whileHover={{ scale: 1.2, cursor: "grab", zIndex: 50 }}
          whileDrag={{ scale: 1.1, cursor: "grabbing", zIndex: 50 }}
          initial={{
            x: (index % 4) * 100 + 20,
            y: Math.floor(index / 4) * 80 + 20,
            rotate: sticker.rotate,
          }}
          className={`absolute text-4xl ${sticker.color} p-4 bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/10`}
        >
          {sticker.icon}
        </motion.div>
      ))}
    </div>
  );
}
