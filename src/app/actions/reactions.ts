"use server";

import { db } from "@/core/db/setup";
import { reactions } from "@/core/db/schemas/blog/schemas";
import { eq, and } from "drizzle-orm";
import { getOptionalUser } from "./auth";
import { nanoid } from "nanoid";
import { posts } from "@/core/db/schemas/blog/schemas";
import { revalidatePath } from "next/cache";

export async function toggleReaction(postId: string, type: string) {
  const currentUser = await getOptionalUser();
  if (!currentUser) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const existing = await db
      .select()
      .from(reactions)
      .where(
        and(
          eq(reactions.postId, postId),
          eq(reactions.userId, currentUser.id)
        )
      )
      .limit(1);

    if (existing.length > 0) {
      if (existing[0].type === type) {
        await db.delete(reactions).where(eq(reactions.id, existing[0].id));
      } else {
        await db.update(reactions).set({ type }).where(eq(reactions.id, existing[0].id));
      }
    } else {
      await db.insert(reactions).values({
        id: nanoid(),
        postId,
        userId: currentUser.id,
        type,
      });
    }

    const post = await db.select().from(posts).where(eq(posts.id, postId)).limit(1).then(r => r[0]);
    if (post) {
      revalidatePath(`/blog/${post.slug}`);
    }
    return { success: true };
  } catch (error) {
    console.error("Failed to toggle reaction:", error);
    return { success: false, error: "Failed to toggle reaction" };
  }
}

export async function getReactions(postId: string) {
  try {
    const result = await db
      .select({
        id: reactions.id,
        type: reactions.type,
        userId: reactions.userId,
      })
      .from(reactions)
      .where(eq(reactions.postId, postId));
      
    // Group by type
    const grouped = result.reduce((acc, curr) => {
      if (!acc[curr.type]) {
        acc[curr.type] = [];
      }
      acc[curr.type].push(curr.userId);
      return acc;
    }, {} as Record<string, string[]>);

    return grouped;
  } catch (error) {
    console.error("Failed to fetch reactions:", error);
    return {};
  }
}
