import { getPosts } from "@/app/actions/blog";
import Link from "next/link";
import { Plus } from "lucide-react";
import { PostsTable } from "@/components/admin/posts-table";

export default async function AdminBlogPage() {
  const posts = await getPosts(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center pb-6 border-b-4 border-red-950">
        <h2 className="text-3xl font-bold uppercase tracking-wider text-red-950">Blog Posts</h2>
        <Link 
          href="/admin/blog/new" 
          className="flex items-center gap-2 px-4 py-2 bg-red-950 text-[#e6dcc6] font-bold uppercase tracking-wider hover:bg-red-900 transition-colors shadow-[4px_4px_0px_0px_rgba(69,10,10,1)]"
        >
          <Plus size={18} />
          New Post
        </Link>
      </div>

      <PostsTable posts={posts} />
    </div>
  );
}
