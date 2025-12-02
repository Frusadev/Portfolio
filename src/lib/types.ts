import type { ReactNode } from "react";

export interface SkillTree {
  name: string;
  icon: ReactNode;
  level: "beginner" | "intermediate" | "advanced" | "expert";
  childSkills?: SkillTree[];
}
