"use client";

import * as React from "react";
import Link from "next/link";
import { deleteComment } from "@/app/actions/comments";
import { toast } from "sonner";
import { MessageSquare, Trash2, ArrowUpRight, Loader2 } from "lucide-react";

export interface CommentWithPost {
  id: string;
  content: string;
  createdAt: Date;
  user: {
    id: string;
    name?: string | null;
    email: string;
  };
  post: {
    id: string;
    title: string;
    slug: string;
  };
}

export function CommentsManager({
  initialComments,
}: {
  initialComments: CommentWithPost[];
}) {
  const [comments, setComments] = React.useState<CommentWithPost[]>(initialComments);
  const [deletingId, setDeletingId] = React.useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const res = await deleteComment(id);
      if (res.success) {
        toast.success("Comment deleted");
        setComments((prev) => prev.filter((c) => c.id !== id));
      } else {
        toast.error(res.error || "Failed to delete comment");
      }
    } catch {
      toast.error("Failed to delete comment");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-text-primary">
          Discussion comments
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          Review, moderate, and remove comments across all writing and essays.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {comments.length === 0 ? (
          <div className="rounded-3xl bg-surface/30 p-12 text-center text-xs font-mono text-text-muted">
            No reader comments to display.
          </div>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="rounded-3xl bg-surface/40 hover:bg-surface/50 p-6 sm:p-8 flex flex-col gap-4 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-surface_elevated flex items-center justify-center text-xs font-mono text-text-primary shrink-0">
                    {comment.user.name?.[0]?.toUpperCase() || "A"}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-text-primary">
                      {comment.user.name || "Anonymous"}
                    </span>
                    <span className="text-[11px] font-mono text-text-muted">
                      {comment.user.email}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <span className="text-xs font-mono text-text-muted">
                    {new Date(comment.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>

                  <Link
                    href={`/blog/${comment.post.slug}`}
                    target="_blank"
                    className="p-2 rounded-full bg-surface_elevated hover:bg-surface_elevated/80 text-text-muted hover:text-text-primary transition-colors"
                    title="View on blog"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleDelete(comment.id)}
                    disabled={deletingId === comment.id}
                    className="p-2 rounded-full bg-surface_elevated hover:bg-red-500/20 text-text-muted hover:text-red-400 transition-colors"
                    title="Delete comment"
                  >
                    {deletingId === comment.id ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Post Reference */}
              <div className="text-xs font-mono text-accent-secondary">
                On: {comment.post.title}
              </div>

              {/* Comment Content */}
              <p className="text-sm text-text-secondary leading-relaxed bg-surface_elevated/50 p-4 rounded-2xl">
                {comment.content}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CommentsManager;
