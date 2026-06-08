"use client";

import { useState } from "react";
import { deleteComment } from "@/app/actions/comments";
import { toast } from "sonner";
import { Loader2, Trash2 } from "lucide-react";
import Link from "next/link";

interface CommentsClientPageProps {
  initialComments: {
    id: string;
    content: string;
    createdAt: Date;
    user: { id: string; name: string | null; email: string };
    post: { id: string; title: string; slug: string };
  }[];
}

export default function CommentsClientPage({ initialComments }: CommentsClientPageProps) {
  const [comments, setComments] = useState(initialComments);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this comment?")) return;
    
    setLoadingId(id);
    const result = await deleteComment(id);
    setLoadingId(null);

    if (result.success) {
      toast.success("Comment deleted");
      setComments(comments.filter(c => c.id !== id));
    } else {
      toast.error(result.error || "Failed to delete comment");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center pb-4 border-b-4 border-red-950">
        <h1 className="text-3xl font-bold uppercase tracking-widest text-red-950">Comments Management</h1>
      </div>

      <div className="overflow-x-auto bg-background border-4 border-red-950 shadow-[8px_8px_0px_0px_rgba(69,10,10,1)]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-red-950 text-[#e6dcc6] border-b-4 border-red-950">
              <th className="p-4 font-bold uppercase tracking-wider text-sm">User</th>
              <th className="p-4 font-bold uppercase tracking-wider text-sm">Post</th>
              <th className="p-4 font-bold uppercase tracking-wider text-sm">Comment</th>
              <th className="p-4 font-bold uppercase tracking-wider text-sm">Date</th>
              <th className="p-4 font-bold uppercase tracking-wider text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment) => (
              <tr key={comment.id} className="border-b-2 border-red-950/20 hover:bg-red-950/5 transition-colors">
                <td className="p-4 font-medium text-red-950">
                  <div className="font-bold">{comment.user.name}</div>
                  <div className="text-xs text-red-950/60">{comment.user.email}</div>
                </td>
                <td className="p-4">
                  <Link href={`/blog/${comment.post.slug}`} className="text-red-950 font-bold hover:underline">
                    {comment.post.title}
                  </Link>
                </td>
                <td className="p-4 text-red-950/80 max-w-md truncate">
                  {comment.content}
                </td>
                <td className="p-4 text-red-950/80 text-sm">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </td>
                <td className="p-4">
                  <button
                    onClick={() => handleDelete(comment.id)}
                    disabled={loadingId === comment.id}
                    className="p-2 text-red-700 hover:bg-red-700 hover:text-white border-2 border-transparent hover:border-red-700 transition-all"
                    title="Delete Comment"
                  >
                    {loadingId === comment.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 size={18} />
                    )}
                  </button>
                </td>
              </tr>
            ))}
            {comments.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-red-950/60 font-bold uppercase tracking-widest">
                  No comments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
