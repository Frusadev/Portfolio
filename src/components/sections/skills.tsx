"use client";

import { SkillTree } from "@/lib/types";
import SkillBranch from "../ui/skill-branch";
import { FaReact, FaNodeJs, FaCode } from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiPostgresql,
  SiMongodb,
  SiDocker,
  SiGit,
  SiPython,
  SiFastapi,
} from "react-icons/si";
import { BiCrown, BiTerminal } from "react-icons/bi";
import { Crown } from "lucide-react";
import { FaBookOpenReader } from "react-icons/fa6";

const skillTreeData: SkillTree[] = [
  {
    name: "Web Development",
    level: "expert",
    icon: <FaCode />,
    childSkills: [
      {
        name: "Frontend Development",
        level: "expert",
        icon: <FaCode />,
        childSkills: [
          {
            name: "React Ecosystem",
            level: "expert",
            icon: <FaReact />,
            childSkills: [
              { name: "Next.js", level: "expert", icon: <SiNextdotjs /> },
              { name: "React Native", level: "beginner", icon: <FaReact /> },
              { name: "Zustand", level: "advanced", icon: <FaCode /> },
            ],
          },
          {
            name: "Styling",
            level: "expert",
            icon: <SiTailwindcss />,
            childSkills: [
              {
                name: "Tailwind CSS",
                level: "expert",
                icon: <SiTailwindcss />,
              },
              { name: "Framer Motion", level: "beginner", icon: <FaCode /> },
            ],
          },
          {
            name: "Languages",
            level: "expert",
            icon: <SiTypescript />,
            childSkills: [
              { name: "TypeScript", level: "expert", icon: <SiTypescript /> },
              { name: "JavaScript", level: "expert", icon: <FaCode /> },
            ],
          },
        ],
      },
      {
        name: "Backend & DevOps",
        level: "expert",
        icon: <FaNodeJs />,
        childSkills: [
          {
            name: "Database",
            level: "advanced",
            icon: <SiPostgresql />,
            childSkills: [
              { name: "PostgreSQL", level: "advanced", icon: <SiPostgresql /> },
              { name: "MongoDB", level: "intermediate", icon: <SiMongodb /> },
            ],
          },
          {
            name: "Tools",
            level: "intermediate",
            icon: <SiDocker />,
            childSkills: [
              { name: "Docker", level: "intermediate", icon: <SiDocker /> },
              { name: "Git", level: "expert", icon: <SiGit /> },
            ],
          },
          {
            name: "Languages",
            level: "advanced",
            icon: <BiTerminal />,
            childSkills: [
              {
                name: "Python",
                level: "expert",
                icon: <SiPython />,
                childSkills: [
                  { name: "FastAPI", level: "advanced", icon: <SiFastapi /> },
                ],
              },
              {
                name: "TypeScript",
                level: "expert",
                icon: <SiTypescript />,
                childSkills: [
                  {
                    name: "ExpressJs",
                    level: "intermediate",
                    icon: <FaNodeJs />,
                  },
                  { name: "NestJs", level: "intermediate", icon: <FaNodeJs /> },
                  { name: "HonoJs", level: "intermediate", icon: <FaNodeJs /> },
                ],
              },
              {
                name: "Nim",
                level: "expert",
                icon: <BiCrown />,
                childSkills: [
                  {
                    name: "HappyX",
                    level: "beginner",
                    icon: <Crown />,
                  },
                  { name: "Prologue", level: "beginner", icon: <FaBookOpenReader /> },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

export default function Skills() {
  return (
    <div className="w-full  flex flex-col items-center justify-center py-20 px-4">
      <h1 className="mb-10 text-4xl font-bold text-center">
        Skills
      </h1>
      <SkillBranch skillNodes={skillTreeData} revealed={true} />
    </div>
  );
}
