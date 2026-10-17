"use server";

import { db } from "@/core/db/setup";
import { projects, experience, academicWork } from "@/core/db/schemas/portfolio/schemas";
import { eq, desc } from "drizzle-orm";
import { getCurrentUser } from "./auth";
import { revalidatePath } from "next/cache";
import { nanoid } from "nanoid";

async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    throw new Error("Unauthorized");
  }
  return user;
}

// Projects
export async function getProjects() {
  return await db.select().from(projects).orderBy(desc(projects.createdAt));
}

const FALLBACK_PROJECTS = [
  {
    id: "project-1",
    title: "Portfolio",
    description: "Minimalist, personal professional website built with Next.js, GSAP, and Lenis.",
    content: null,
    url: "https://danielametsowou.com",
    githubUrl: "https://github.com/danielametsowou/portfolio",
    image: null,
    logo: null,
    technologies: ["Next.js", "TypeScript", "GSAP", "Tailwind"],
    featured: true,
    createdAt: new Date("2026-03-01"),
    updatedAt: new Date("2026-03-01"),
  },
  {
    id: "project-2",
    title: "Quant Engine",
    description: "High-frequency quantitative analysis & statistical modeling toolkit.",
    content: null,
    url: null,
    githubUrl: "https://github.com/danielametsowou/quant-engine",
    image: null,
    logo: null,
    technologies: ["Python", "Rust", "NumPy"],
    featured: true,
    createdAt: new Date("2026-02-15"),
    updatedAt: new Date("2026-02-15"),
  },
  {
    id: "project-3",
    title: "ENSEA Research",
    description: "Applied econometric simulations and statistical market research platform.",
    content: null,
    url: null,
    githubUrl: "https://github.com/danielametsowou/ensea-research",
    image: null,
    logo: null,
    technologies: ["R", "Python", "Economics"],
    featured: false,
    createdAt: new Date("2026-01-20"),
    updatedAt: new Date("2026-01-20"),
  },
  {
    id: "project-4",
    title: "Neural Graph",
    description: "Graph neural networks for high-dimensional topological data analysis.",
    content: null,
    url: null,
    githubUrl: "https://github.com/danielametsowou/neural-graph",
    image: null,
    logo: null,
    technologies: ["PyTorch", "NetworkX", "CUDA"],
    featured: false,
    createdAt: new Date("2025-12-10"),
    updatedAt: new Date("2025-12-10"),
  },
  {
    id: "project-5",
    title: "Stochastic Lab",
    description: "Monte Carlo simulation harness for continuous-time option pricing models.",
    content: null,
    url: null,
    githubUrl: "https://github.com/danielametsowou/stochastic-lab",
    image: null,
    logo: null,
    technologies: ["Python", "SciPy", "Matplotlib"],
    featured: false,
    createdAt: new Date("2025-11-28"),
    updatedAt: new Date("2025-11-28"),
  },
  {
    id: "project-6",
    title: "Cadence UI",
    description: "Design system and motion primitives engineered for financial interfaces.",
    content: null,
    url: null,
    githubUrl: "https://github.com/danielametsowou/cadence-ui",
    image: null,
    logo: null,
    technologies: ["React", "TypeScript", "Tailwind"],
    featured: false,
    createdAt: new Date("2025-10-15"),
    updatedAt: new Date("2025-10-15"),
  },
  {
    id: "project-7",
    title: "Market Flow",
    description: "Real-time Level-2 order book depth visualization and liquidity analytics.",
    content: null,
    url: null,
    githubUrl: "https://github.com/danielametsowou/market-flow",
    image: null,
    logo: null,
    technologies: ["WebSockets", "Canvas", "TypeScript"],
    featured: false,
    createdAt: new Date("2025-09-04"),
    updatedAt: new Date("2025-09-04"),
  },
  {
    id: "project-8",
    title: "Paper Canvas",
    description: "Procedural geometry engine rendering tactile relief facets with WebGL.",
    content: null,
    url: null,
    githubUrl: "https://github.com/danielametsowou/paper-canvas",
    image: null,
    logo: null,
    technologies: ["Three.js", "WebGL", "GLSL"],
    featured: false,
    createdAt: new Date("2025-08-19"),
    updatedAt: new Date("2025-08-19"),
  },
  {
    id: "project-9",
    title: "Echo Stream",
    description: "Low-latency WebAudio signal processor and additive harmonic synthesizer.",
    content: null,
    url: null,
    githubUrl: "https://github.com/danielametsowou/echo-stream",
    image: null,
    logo: null,
    technologies: ["WebAudio", "DSP", "TypeScript"],
    featured: false,
    createdAt: new Date("2025-07-22"),
    updatedAt: new Date("2025-07-22"),
  },
];

export async function getLatestProjects(limit = 9) {
  try {
    const results = await db
      .select()
      .from(projects)
      .orderBy(desc(projects.createdAt))
      .limit(limit);
    if (results.length > 0) return results;
  } catch (error) {
    console.error("Failed to fetch latest projects from database, using fallback:", error);
  }
  return FALLBACK_PROJECTS.slice(0, limit);
}

const FALLBACK_ACADEMIC_WORK = {
  id: "academic-1",
  title: "Preparing for a Statistical & Economics Engineering Program at ENSEA",
  institution: "ENSEA",
  field: "Quantitative Finance & Economics",
  description:
    "Rigorous preparation encompassing advanced probability theory, statistical inference, micro-econometrics, and mathematical optimization for financial engineering and economic modeling.",
  status: "current",
  current: true,
  startDate: "2026-01-01",
  endDate: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export async function getCurrentAcademicWork() {
  try {
    const results = await db
      .select()
      .from(academicWork)
      .where(eq(academicWork.current, true))
      .orderBy(desc(academicWork.createdAt))
      .limit(1);
    if (results.length > 0) return results[0];
  } catch (error) {
    console.error("Failed to fetch academic work from database, using fallback:", error);
  }
  return FALLBACK_ACADEMIC_WORK;
}

export async function getProject(id: string) {
  const result = await db.select().from(projects).where(eq(projects.id, id));
  return result[0];
}

export async function createProject(data: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
  await requireAdmin();
  await db.insert(projects).values({ id: nanoid(), ...data });
  revalidatePath("/");
  revalidatePath("/admin/projects");
  return { success: true };
}

export async function updateProject(id: string, data: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
  await requireAdmin();
  await db.update(projects).set({ ...data, updatedAt: new Date() }).where(eq(projects.id, id));
  revalidatePath("/");
  revalidatePath("/admin/projects");
  return { success: true };
}

export async function deleteProject(id: string) {
  await requireAdmin();
  await db.delete(projects).where(eq(projects.id, id));
  revalidatePath("/");
  revalidatePath("/admin/projects");
  return { success: true };
}

// Experience
export async function getExperience() {
  return await db.select().from(experience).orderBy(desc(experience.startDate));
}

export async function getExperienceById(id: string) {
  const result = await db.select().from(experience).where(eq(experience.id, id));
  return result[0];
}

export async function createExperience(data: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
  await requireAdmin();
  try {
    await db.insert(experience).values({ id: nanoid(), ...data });
    revalidatePath("/");
    revalidatePath("/admin/experience");
    return { success: true };
  } catch (error) {
    console.error("Failed to create experience:", error);
    return { success: false, error: "Failed to create experience" };
  }
}

export async function updateExperience(id: string, data: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
  await requireAdmin();
  try {
    await db.update(experience).set({ ...data, updatedAt: new Date() }).where(eq(experience.id, id));
    revalidatePath("/");
    revalidatePath("/admin/experience");
    return { success: true };
  } catch (error) {
    console.error("Failed to update experience:", error);
    return { success: false, error: "Failed to update experience" };
  }
}

export async function deleteExperience(id: string) {
  await requireAdmin();
  try {
    await db.delete(experience).where(eq(experience.id, id));
    revalidatePath("/");
    revalidatePath("/admin/experience");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete experience:", error);
    return { success: false, error: "Failed to delete experience" };
  }
}
