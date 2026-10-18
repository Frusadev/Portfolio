"use server";

import { db } from "@/core/db/setup";
import { user } from "@/core/db/schemas/auth/schemas";
import { eq, desc } from "drizzle-orm";
import { getCurrentUser } from "./auth";
import { revalidatePath } from "next/cache";

async function requireAdmin() {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "admin") {
    throw new Error("Unauthorized");
  }
  return currentUser;
}

export async function getUsers() {
  await requireAdmin();
  try {
    return await db
      .select({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt,
      })
      .from(user)
      .orderBy(desc(user.createdAt));
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return [];
  }
}

export async function toggleUserStatus(userId: string, currentStatus: boolean) {
  await requireAdmin();
  try {
    await db.update(user).set({
      isActive: !currentStatus,
    }).where(eq(user.id, userId));
    
    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    console.error("Failed to toggle user status:", error);
    return { success: false, error: "Failed to toggle user status" };
  }
}

export async function getCurrentUserProfile() {
  const currentUser = await getCurrentUser();
  if (!currentUser) return null;
  try {
    const res = await db.select().from(user).where(eq(user.id, currentUser.id)).limit(1);
    if (res.length > 0) return res[0];
  } catch (error) {
    console.error("Failed to fetch user profile from db:", error);
  }
  return currentUser as any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export async function updateCurrentUserProfile(data: {
  handle?: string;
  name?: string;
  receiveEmails?: boolean;
}) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await db
      .update(user)
      .set({
        ...(data.handle !== undefined && { handle: data.handle }),
        ...(data.name !== undefined && { name: data.name }),
        ...(data.receiveEmails !== undefined && { receiveEmails: data.receiveEmails }),
        onboarded: true,
        updatedAt: new Date(),
      })
      .where(eq(user.id, currentUser.id));

    revalidatePath("/onboarding");
    return { success: true };
  } catch (error) {
    console.error("Failed to update profile:", error);
    return { success: false, error: "Failed to update profile" };
  }
}

export async function skipOnboarding() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await db
      .update(user)
      .set({
        onboarded: true,
        updatedAt: new Date(),
      })
      .where(eq(user.id, currentUser.id));

    revalidatePath("/onboarding");
    return { success: true };
  } catch (error) {
    console.error("Failed to skip onboarding:", error);
    return { success: false, error: "Failed to skip onboarding" };
  }
}
