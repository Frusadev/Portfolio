"use server";

import { db } from "@/core/db/setup";
import { comments } from "@/core/db/schemas/blog/schemas";
import { user } from "@/core/db/schemas/auth/schemas";
import { posts } from "@/core/db/schemas/blog/schemas";
import { eq, desc } from "drizzle-orm";
import { getCurrentUser } from "./auth";
import { revalidatePath } from "next/cache";
import { nanoid } from "nanoid";
import { sendEmail } from "@/core/services/email";
import NewCommentEmail from "@/components/emails/new-comment";
import CommentReplyEmail from "@/components/emails/comment-reply";

export async function addComment(postId: string, content: string, parentId?: string) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const id = nanoid();
    await db.insert(comments).values({
      id,
      postId,
      userId: currentUser.id,
      parentId: parentId || null,
      content,
    });

    // Fetch post and author for email notification
    const post = await db.select().from(posts).where(eq(posts.id, postId)).limit(1).then(r => r[0]);
    
    if (post) {
      if (parentId) {
        // Send email to the parent comment author
        const parentComment = await db.select({
          userEmail: user.email,
          userId: user.id
        })
        .from(comments)
        .innerJoin(user, eq(comments.userId, user.id))
        .where(eq(comments.id, parentId))
        .limit(1)
        .then(r => r[0]);

        if (parentComment && parentComment.userEmail && parentComment.userId !== currentUser.id) {
          await sendEmail({
            to: parentComment.userEmail,
            subject: `New reply to your comment on: ${post.title}`,
            component: CommentReplyEmail,
            props: {
              postTitle: post.title,
              postSlug: post.slug,
              replyContent: content,
              replierName: currentUser.name || "A user",
            },
          });
        }
      } else {
        // Find all admins
        const admins = await db.select().from(user).where(eq(user.role, "admin"));
        
        // Send email to all admins
        for (const admin of admins) {
          await sendEmail({
            to: admin.email,
            subject: `New Comment on: ${post.title}`,
            component: NewCommentEmail,
            props: {
              postTitle: post.title,
              postSlug: post.slug,
              commentContent: content,
              authorName: currentUser.name || "A user",
            },
          });
        }
      }
    }

    revalidatePath(`/blog/${post?.slug}`);
    revalidatePath("/admin/blog/comments");
    return { success: true };
  } catch (error) {
    console.error("Failed to add comment:", error);
    return { success: false, error: "Failed to add comment" };
  }
}

export async function getComments(postId: string) {
  try {
    const result = await db
      .select({
        id: comments.id,
        content: comments.content,
        createdAt: comments.createdAt,
        parentId: comments.parentId,
        user: {
          id: user.id,
          name: user.name,
          image: user.image,
        },
      })
      .from(comments)
      .innerJoin(user, eq(comments.userId, user.id))
      .where(eq(comments.postId, postId))
      .orderBy(desc(comments.createdAt));
      
    return result;
  } catch (error) {
    console.error("Failed to fetch comments:", error);
    return [];
  }
}

export async function deleteComment(id: string) {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "admin") {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const comment = await db.select().from(comments).where(eq(comments.id, id)).limit(1).then(r => r[0]);
    if (comment) {
      const post = await db.select().from(posts).where(eq(posts.id, comment.postId)).limit(1).then(r => r[0]);
      await db.delete(comments).where(eq(comments.id, id));
      if (post) {
        revalidatePath(`/blog/${post.slug}`);
      }
      revalidatePath("/admin/blog/comments");
    }
    return { success: true };
  } catch (error) {
    console.error("Failed to delete comment:", error);
    return { success: false, error: "Failed to delete comment" };
  }
}

export async function getAllComments() {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "admin") {
    return [];
  }

  try {
    const result = await db
      .select({
        id: comments.id,
        content: comments.content,
        createdAt: comments.createdAt,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        post: {
          id: posts.id,
          title: posts.title,
          slug: posts.slug,
        }
      })
      .from(comments)
      .innerJoin(user, eq(comments.userId, user.id))
      .innerJoin(posts, eq(comments.postId, posts.id))
      .orderBy(desc(comments.createdAt));
      
    return result;
  } catch (error) {
    console.error("Failed to fetch all comments:", error);
    return [];
  }
}
