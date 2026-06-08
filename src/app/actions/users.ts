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
