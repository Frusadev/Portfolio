"use server";

import { db } from "@/core/db/setup";
import { posts } from "@/core/db/schemas/blog/schemas";
import { eq, desc } from "drizzle-orm";
import { getCurrentUser } from "./auth";
import { revalidatePath } from "next/cache";
import { nanoid } from "nanoid";

// Helper to check admin
async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    throw new Error("Unauthorized");
  }
  return user;
}

export async function getPosts(publishedOnly = true) {
  try {
    if (publishedOnly) {
      return await db.select().from(posts).where(eq(posts.published, true)).orderBy(desc(posts.createdAt));
    }
    return await db.select().from(posts).orderBy(desc(posts.createdAt));
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return [];
  }
}

export async function getPost(slug: string) {
  try {
    const result = await db.select().from(posts).where(eq(posts.slug, slug)).limit(1);
    return result[0] || null;
  } catch (error) {
    console.error("Failed to fetch post:", error);
    return null;
  }
}

export async function createPost(data: { title: string; description: string; content: string; slug: string; coverImage?: string; tags?: string[] }) {
  const user = await requireAdmin();
  
  try {
    await db.insert(posts).values({
      id: nanoid(),
      ...data,
      authorId: user.id,
      published: false,
    });
    revalidatePath("/blog");
    revalidatePath("/admin/blog");
    return { success: true };
  } catch (error) {
    console.error("Failed to create post:", error);
    return { success: false, error: "Failed to create post" };
  }
}

export async function updatePost(id: string, data: { title: string; description: string; content: string; slug: string; coverImage?: string; tags?: string[] }) {
  await requireAdmin();
  
  try {
    await db.update(posts).set({
      ...data,
      updatedAt: new Date(),
    }).where(eq(posts.id, id));
    revalidatePath("/blog");
    revalidatePath("/admin/blog");
    return { success: true };
  } catch (error) {
    console.error("Failed to update post:", error);
    return { success: false, error: "Failed to update post" };
  }
}

export async function deletePost(id: string) {
  await requireAdmin();
  
  try {
    await db.delete(posts).where(eq(posts.id, id));
    revalidatePath("/blog");
    revalidatePath("/admin/blog");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete post:", error);
    return { success: false, error: "Failed to delete post" };
  }
}

export async function togglePublishPost(id: string, currentState: boolean) {
  await requireAdmin();
  
  try {
    await db.update(posts).set({
      published: !currentState,
    }).where(eq(posts.id, id));
    revalidatePath("/blog");
    revalidatePath("/admin/blog");
    return { success: true };
  } catch (error) {
    console.error("Failed to toggle publish:", error);
    return { success: false, error: "Failed to toggle publish" };
  }
}
