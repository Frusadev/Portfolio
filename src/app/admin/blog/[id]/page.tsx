import { notFound } from "next/navigation";
import { db } from "@/core/db/setup";
import { posts } from "@/core/db/schemas/blog/schemas";
import { eq } from "drizzle-orm";
import { PostForm } from "@/components/admin/post-form";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: PageProps) {
  const { id } = await params;

  const post = await db.query.posts.findFirst({
    where: eq(posts.id, id),
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h1 className="text-3xl font-black uppercase tracking-tighter text-red-950">
          Edit Post
        </h1>
        <div className="inline-flex items-center gap-2 border-2 border-red-950 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-red-950">
          Total Views: {post.views}
        </div>
      </div>
      <PostForm initialData={post} />
    </div>
  );
}
