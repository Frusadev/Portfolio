import { PostForm } from "@/components/admin/post-form";
import { db } from "@/core/db/setup";
import { posts } from "@/core/db/schemas/blog/schemas";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const result = await db.select().from(posts).where(eq(posts.id, id)).limit(1);
  const post = result[0];

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edit Post</h1>
      <PostForm post={post} />
    </div>
  );
}
