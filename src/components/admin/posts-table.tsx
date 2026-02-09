"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deletePost, togglePublishPost } from "@/app/actions/blog";
import { Edit, Trash2, Globe, Lock } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function PostsTable({ posts }: { posts: any[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    
    setLoading(id);
    const res = await deletePost(id);
    setLoading(null);

    if (res.success) {
      toast.success("Post deleted");
      router.refresh();
    } else {
      toast.error("Failed to delete post");
    }
  };

  const handleToggle = async (id: string, current: boolean) => {
    setLoading(id);
    const res = await togglePublishPost(id, current);
    setLoading(null);

    if (res.success) {
      toast.success(current ? "Post withdrawn" : "Post published");
      router.refresh();
    } else {
      toast.error("Failed to toggle status");
    }
  };

  return (
    <div className="border-4 border-red-950 bg-background overflow-hidden">
      <div className="grid grid-cols-[1fr_auto] md:grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 p-4 bg-red-950 text-[#e6dcc6] font-bold uppercase tracking-wider text-sm">
        <div>Title</div>
        <div className="hidden md:block">Date</div>
        <div className="hidden md:block">Views</div>
        <div className="hidden md:block">Status</div>
        <div>Actions</div>
      </div>
      
      {posts.length === 0 ? (
        <div className="p-8 text-center opacity-50 font-mono">No posts found.</div>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="grid grid-cols-[1fr_auto] md:grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 p-4 border-b-2 border-red-950 last:border-0 items-center hover:bg-red-950/5 transition-colors">
            <div className="font-bold truncate pr-4">{post.title}</div>
            <div className="hidden md:block text-sm font-mono opacity-70">
              {new Date(post.createdAt).toLocaleDateString()}
            </div>
            <div className="hidden md:block text-sm font-mono opacity-80">
              {post.views}
            </div>
            <div className="hidden md:block">
              <span className={`inline-flex items-center gap-1.5 px-2 py-1 text-xs uppercase font-bold border ${post.published ? 'bg-green-100 text-green-800 border-green-800' : 'bg-orange-100 text-orange-800 border-orange-800'}`}>
                {post.published ? <Globe size={12} /> : <Lock size={12} />}
                {post.published ? "Public" : "Draft"}
              </span>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => handleToggle(post.id, post.published)}
                disabled={loading === post.id}
                className="p-2 border-2 border-red-950 text-red-950 hover:bg-red-950 hover:text-[#e6dcc6] transition-colors disabled:opacity-50"
                title={post.published ? "Unpublish" : "Publish"}
              >
                {post.published ? <Lock size={16} /> : <Globe size={16} />}
              </button>
              <Link 
                href={`/admin/blog/${post.id}`}
                className="p-2 border-2 border-red-950 text-red-950 hover:bg-red-950 hover:text-[#e6dcc6] transition-colors"
                title="Edit"
              >
                <Edit size={16} />
              </Link>
              <button 
                onClick={() => handleDelete(post.id)}
                disabled={loading === post.id}
                className="p-2 border-2 border-red-950 text-red-950 hover:bg-red-500 hover:border-red-500 hover:text-white transition-colors disabled:opacity-50"
                title="Delete"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
