"use client";

import * as React from "react";
import { toggleReaction } from "@/app/actions/reactions";
import { toast } from "sonner";
import { Heart, Lightbulb, Flame, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReactionBarProps {
  postId: string;
  initialReactions?: Record<string, string[]>;
  currentUserId?: string | null;
}

const REACTION_CONFIGS = [
  { type: "heart", label: "love", icon: Heart },
  { type: "insightful", label: "insightful", icon: Lightbulb },
  { type: "fire", label: "fire", icon: Flame },
  { type: "sparkle", label: "sparkle", icon: Sparkles },
];

export function ReactionBar({
  postId,
  initialReactions = {},
  currentUserId,
}: ReactionBarProps) {
  const [reactions, setReactions] =
    React.useState<Record<string, string[]>>(initialReactions);
  const [animatingType, setAnimatingType] = React.useState<string | null>(null);

  const handleToggle = async (type: string) => {
    if (!currentUserId) {
      toast.error("Please sign in to react to this article");
      return;
    }

    setAnimatingType(type);
    setTimeout(() => setAnimatingType(null), 400);

    // Optimistic state update
    setReactions((prev) => {
      const currentList = prev[type] || [];
      const hasReacted = currentList.includes(currentUserId);
      const updatedList = hasReacted
        ? currentList.filter((id) => id !== currentUserId)
        : [...currentList, currentUserId];

      return {
        ...prev,
        [type]: updatedList,
      };
    });

    try {
      const res = await toggleReaction(postId, type);
      if (!res.success) {
        toast.error(res.error || "Failed to save reaction");
      }
    } catch {
      toast.error("Failed to update reaction");
    }
  };

  return (
    <div className="pt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <span className="text-xs font-mono text-text-muted mr-1">
          Reactions:
        </span>
        <div className="flex flex-wrap items-center gap-2">
          {REACTION_CONFIGS.map((item) => {
            const Icon = item.icon;
            const userList = reactions[item.type] || [];
            const count = userList.length;
            const hasReacted = currentUserId ? userList.includes(currentUserId) : false;
            const isAnimating = animatingType === item.type;

            return (
              <button
                key={item.type}
                type="button"
                onClick={() => handleToggle(item.type)}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-xs font-mono transition-all flex items-center gap-1.5 group select-none",
                  hasReacted
                    ? "bg-surface_elevated text-text-primary shadow-sm ring-1 ring-white/10"
                    : "bg-surface/40 hover:bg-surface/70 text-text-secondary hover:text-text-primary",
                  isAnimating && "scale-110"
                )}
                title={`React with ${item.label}`}
              >
                <Icon
                  className={cn(
                    "w-3.5 h-3.5 transition-colors",
                    hasReacted
                      ? "text-accent-secondary fill-accent-secondary/20"
                      : "text-text-muted group-hover:text-text-primary"
                  )}
                />
                <span className="text-[11px] font-mono">
                  {count > 0 ? count : ""}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ReactionBar;
