import { PostForm } from "@/components/admin/post-form";

export default function NewPostPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black uppercase tracking-tighter text-red-950">
        New Post
      </h1>
      <PostForm />
    </div>
  );
}
