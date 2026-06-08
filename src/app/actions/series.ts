"use server";

import { db } from "@/core/db/setup";
import { series, seriesPosts, posts } from "@/core/db/schemas/blog/schemas";
import { eq, desc } from "drizzle-orm";
import { getCurrentUser } from "./auth";
import { revalidatePath } from "next/cache";
import { nanoid } from "nanoid";

async function requireAdmin() {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "admin") {
    throw new Error("Unauthorized");
  }
  return currentUser;
}

export async function getSeries() {
  try {
    const result = await db
      .select()
      .from(series)
      .orderBy(desc(series.createdAt));
    return result;
  } catch (error) {
    console.error("Failed to fetch series:", error);
    return [];
  }
}

export async function getSeriesBySlug(slug: string) {
  try {
    const result = await db
      .select()
      .from(series)
      .where(eq(series.slug, slug))
      .limit(1);
    return result[0] || null;
  } catch (error) {
    console.error("Failed to fetch series by slug:", error);
    return null;
  }
}

export async function getSeriesById(id: string) {
  try {
    const result = await db
      .select()
      .from(series)
      .where(eq(series.id, id))
      .limit(1);
    return result[0] || null;
  } catch (error) {
    console.error("Failed to fetch series by id:", error);
    return null;
  }
}

export async function createSeries(data: {
  title: string;
  slug: string;
  description: string;
}) {
  await requireAdmin();
  try {
    await db.insert(series).values({
      id: nanoid(),
      ...data,
    });
    revalidatePath("/admin/blog/series");
    revalidatePath("/blog");
    return { success: true };
  } catch (error) {
    console.error("Failed to create series:", error);
    return { success: false, error: "Failed to create series" };
  }
}

export async function addPostToSeries(
  seriesId: string,
  postId: string,
  position: number,
) {
  await requireAdmin();
  try {
    await db.insert(seriesPosts).values({
      seriesId,
      postId,
      position,
    });
    revalidatePath("/admin/blog/series");

    const post = await db
      .select()
      .from(posts)
      .where(eq(posts.id, postId))
      .limit(1)
      .then((r) => r[0]);
    if (post) {
      revalidatePath(`/blog/${post.slug}`);
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to add post to series:", error);
    return { success: false, error: "Failed to add post to series" };
  }
}

export async function getSeriesForPost(postId: string) {
  try {
    const result = await db
      .select({
        id: series.id,
        title: series.title,
        slug: series.slug,
        position: seriesPosts.position,
      })
      .from(seriesPosts)
      .innerJoin(series, eq(seriesPosts.seriesId, series.id))
      .where(eq(seriesPosts.postId, postId));

    return result;
  } catch (error) {
    console.error("Failed to fetch series for post:", error);
    return [];
  }
}

export async function getPostsInSeries(seriesId: string) {
  try {
    const result = await db
      .select({
        id: posts.id,
        title: posts.title,
        slug: posts.slug,
        position: seriesPosts.position,
      })
      .from(seriesPosts)
      .innerJoin(posts, eq(seriesPosts.postId, posts.id))
      .where(eq(seriesPosts.seriesId, seriesId))
      .orderBy(seriesPosts.position);

    return result;
  } catch (error) {
    console.error("Failed to fetch posts in series:", error);
    return [];
  }
}
