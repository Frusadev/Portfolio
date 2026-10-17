"use server";

import { db } from "@/core/db/setup";
import { posts } from "@/core/db/schemas/blog/schemas";
import { eq, desc, sql } from "drizzle-orm";
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

const FALLBACK_POSTS = [
  {
    id: "post-1",
    title: "On Intuition, Stochastic Processes, and Market Microstructure",
    slug: "intuition-stochastic-processes-market-microstructure",
    description: "Reflections on bridging continuous-time mathematics with real-world liquidity dynamics and algorithmic execution.",
    createdAt: new Date("2026-03-10"),
    tags: ["Quantitative Finance", "Probability"],
    views: 420,
  },
  {
    id: "post-2",
    title: "Designing for Stillness: The Craft of Borderless Interfaces",
    slug: "designing-for-stillness-borderless-interfaces",
    description: "Why stripping visible borders, uppercase typography, and visual friction elevates digital experiences into calm tools.",
    createdAt: new Date("2026-02-24"),
    tags: ["Design", "Typography"],
    views: 890,
  },
  {
    id: "post-3",
    title: "The Architecture of Curiosity: 1000 Hours Down the Rabbit Hole",
    slug: "the-architecture-of-curiosity",
    description: "How obsessive hyper-focus transforms complex unfamiliar domains into deeply intuitive mental models.",
    createdAt: new Date("2026-01-18"),
    tags: ["Creativity", "Thinking"],
    views: 1250,
  },
];

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

export async function getLatestPosts(limit = 3) {
  try {
    const results = await db
      .select()
      .from(posts)
      .where(eq(posts.published, true))
      .orderBy(desc(posts.createdAt))
      .limit(limit);
    if (results.length > 0) return results;
  } catch (error) {
    console.error("Failed to fetch latest posts from database, using fallback:", error);
  }
  return FALLBACK_POSTS.slice(0, limit);
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

export async function incrementPostViews(id: string) {
  try {
    const updated = await db
      .update(posts)
      .set({
        views: sql`${posts.views} + 1`,
      })
      .where(eq(posts.id, id))
      .returning({ views: posts.views });

    return { success: true, views: updated[0]?.views ?? 0 };
  } catch (error) {
    console.error("Failed to increment post views:", error);
    return { success: false, error: "Failed to increment post views" };
  }
}
