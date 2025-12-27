"use server";

import { db } from "@/core/db/setup";
import { projects, experience } from "@/core/db/schemas/portfolio/schemas";
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
  await db.insert(experience).values({ id: nanoid(), ...data });
  revalidatePath("/");
  revalidatePath("/admin/experience");
  return { success: true };
}

export async function updateExperience(id: string, data: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
  await requireAdmin();
  await db.update(experience).set({ ...data, updatedAt: new Date() }).where(eq(experience.id, id));
  revalidatePath("/");
  revalidatePath("/admin/experience");
  return { success: true };
}

export async function deleteExperience(id: string) {
  await requireAdmin();
  await db.delete(experience).where(eq(experience.id, id));
  revalidatePath("/");
  revalidatePath("/admin/experience");
  return { success: true };
}
