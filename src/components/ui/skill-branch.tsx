"use client";

import { SkillTree } from "@/lib/types";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const levelColors = {
  beginner: "shadow-gray-500/50 border-gray-500",
  intermediate: "shadow-slate-500/50 border-slate-500",
  advanced: "shadow-neutral-500/50 border-neutral-500",
  expert: "shadow-zinc-500/50 border-zinc-500",
};

function SkillNode({ data }: { data: SkillTree }) {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = data.childSkills && data.childSkills.length > 0;

  const toggleOpen = () => {
    if (hasChildren) setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col items-center">
      <motion.div
        layout
        onClick={toggleOpen}
        className={cn(
          "cursor-pointer border-2 bg-background p-4 transition-all duration-300 hover:scale-105 rounded-3xl",
          levelColors[data.level],
          "shadow-lg"
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex items-center gap-2">
          <span className="text-2xl">{data.icon}</span>
          <span className="font-bold">{data.name}</span>
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && hasChildren && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-col items-center"
          >
            <div className="h-8 w-0.5 bg-border" />
            <div className="flex gap-8 pt-4">
              <SkillBranch skillNodes={data.childSkills!} revealed={true} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SkillBranch({
  skillNodes,
  revealed,
}: {
  skillNodes: SkillTree[];
  revealed: boolean;
}) {
  if (!revealed) return null;

  return (
    <div className="flex flex-wrap justify-center gap-8">
      {skillNodes.map((node, index) => (
        <SkillNode key={index} data={node} />
      ))}
    </div>
  );
}
