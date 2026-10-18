"use client";

import * as React from "react";
import Link from "next/link";
import { addComment } from "@/app/actions/comments";
import { toast } from "sonner";
import { MessageSquare, Reply, CornerDownRight, Loader2 } from "lucide-react";
import { MarkdownContent } from "@/components/markdown/markdown-content";

export interface CommentUser {
  id: string;
  name: string;
  image?: string | null;
}

export interface CommentItem {
  id: string;
  content: string;
  createdAt: Date;
  parentId?: string | null;
  user: CommentUser;
}

interface CommentSectionProps {
  postId: string;
  initialComments?: CommentItem[];
  currentUser?: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;
}

export function CommentSection({
  postId,
  initialComments = [],
  currentUser,
}: CommentSectionProps) {
  const [comments, setComments] = React.useState<CommentItem[]>(initialComments);
  const [content, setContent] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [replyingToId, setReplyingToId] = React.useState<string | null>(null);
  const [replyContent, setReplyContent] = React.useState("");

  // Group top-level comments and replies
  const rootComments = comments.filter((c) => !c.parentId);
  const getReplies = (parentId: string) =>
    comments.filter((c) => c.parentId === parentId);

  const handleSubmit = async (e: React.FormEvent, parentId?: string) => {
    e.preventDefault();
    const commentText = parentId ? replyContent.trim() : content.trim();
    if (!commentText) return;

    if (!currentUser) {
      toast.error("Please sign in to leave a comment");
      return;
    }

    setSubmitting(true);
    try {
      const res = await addComment(postId, commentText, parentId);
      if (res.success) {
        toast.success("Comment posted");
        const newComment: CommentItem = {
          id: `temp-${Date.now()}`,
          content: commentText,
          createdAt: new Date(),
          parentId: parentId || null,
          user: {
            id: currentUser.id,
            name: currentUser.name || "Anonymous",
            image: currentUser.image || null,
          },
        };
        setComments((prev) => [newComment, ...prev]);
        if (parentId) {
          setReplyingToId(null);
          setReplyContent("");
        } else {
          setContent("");
        }
      } else {
        toast.error(res.error || "Failed to post comment");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="pt-16 mt-8 flex flex-col gap-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MessageSquare className="w-4 h-4 text-accent-secondary" />
          <h2 className="text-xl sm:text-2xl font-medium tracking-tight text-text-primary">
            Discussion
          </h2>
          <span className="text-xs font-mono text-text-muted bg-surface_elevated/80 px-2 py-0.5 rounded-full">
            {comments.length}
          </span>
        </div>
        {!currentUser && (
          <Link
            href="/auth/login"
            className="text-xs font-mono text-accent-secondary hover:text-white transition-colors"
          >
            Sign in to participate →
          </Link>
        )}
      </div>

      {/* Main Comment Box */}
      {currentUser ? (
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="rounded-3xl bg-surface/40 p-6 sm:p-8 flex flex-col gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-surface_elevated flex items-center justify-center text-xs font-mono text-text-primary">
              {currentUser.name?.[0]?.toUpperCase() || "U"}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-normal text-text-primary">
                {currentUser.name || "Signed in"}
              </span>
              <span className="text-[11px] font-mono text-text-muted">
                {currentUser.email}
              </span>
            </div>
          </div>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your thoughts, perspectives, or questions..."
            rows={3}
            className="w-full bg-surface_elevated/60 text-text-primary placeholder:text-text-muted text-sm rounded-2xl p-4 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all border-0 resize-none"
          />

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={submitting || !content.trim()}
              className="rounded-full bg-text-primary text-background hover:bg-white text-xs font-medium px-5 py-2.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              <span>Post comment</span>
            </button>
          </div>
        </form>
      ) : (
        <div className="rounded-3xl bg-surface/30 p-8 text-center flex flex-col items-center gap-3">
          <p className="text-sm text-text-secondary">
            Join the conversation. Sign in with GitHub or a magic link to comment.
          </p>
          <Link
            href="/auth/login"
            className="mt-2 rounded-full bg-surface_elevated hover:bg-surface_elevated/80 text-text-primary text-xs font-medium px-5 py-2.5 transition-colors"
          >
            Sign in
          </Link>
        </div>
      )}

      {/* Comments List */}
      <div className="flex flex-col gap-6">
        {rootComments.length === 0 ? (
          <p className="text-xs font-mono text-text-muted py-6">
            No comments yet. Be the first to start the conversation.
          </p>
        ) : (
          rootComments.map((comment) => {
            const replies = getReplies(comment.id);

            return (
              <div
                key={comment.id}
                className="rounded-3xl bg-surface/30 p-6 sm:p-8 flex flex-col gap-5"
              >
                {/* Author Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-surface_elevated flex items-center justify-center text-xs font-mono text-text-primary">
                      {comment.user.name?.[0]?.toUpperCase() || "A"}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-text-primary">
                        {comment.user.name}
                      </span>
                      <span className="text-[11px] font-mono text-text-muted">
                        {new Date(comment.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  {currentUser && (
                    <button
                      onClick={() =>
                        setReplyingToId(
                          replyingToId === comment.id ? null : comment.id
                        )
                      }
                      className="text-xs font-mono text-text-muted hover:text-text-primary transition-colors flex items-center gap-1.5"
                    >
                      <Reply className="w-3.5 h-3.5" />
                      <span>reply</span>
                    </button>
                  )}
                </div>

                {/* Content */}
                <div className="pl-1">
                  <MarkdownContent content={comment.content} />
                </div>

                {/* Reply Form */}
                {replyingToId === comment.id && currentUser && (
                  <form
                    onSubmit={(e) => handleSubmit(e, comment.id)}
                    className="mt-3 pl-4 flex flex-col gap-3"
                  >
                    <textarea
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder={`Reply to ${comment.user.name}...`}
                      rows={2}
                      className="w-full bg-surface_elevated/70 text-text-primary placeholder:text-text-muted text-xs rounded-2xl p-3 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all border-0 resize-none"
                    />
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setReplyingToId(null);
                          setReplyContent("");
                        }}
                        className="text-xs text-text-muted hover:text-text-primary px-3 py-1.5 transition-colors"
                      >
                        cancel
                      </button>
                      <button
                        type="submit"
                        disabled={submitting || !replyContent.trim()}
                        className="rounded-full bg-text-primary text-background hover:bg-white text-xs font-medium px-4 py-1.5 transition-all disabled:opacity-40"
                      >
                        {submitting ? "posting..." : "reply"}
                      </button>
                    </div>
                  </form>
                )}

                {/* Nested Replies */}
                {replies.length > 0 && (
                  <div className="mt-2 pl-4 sm:pl-6 flex flex-col gap-4 border-l-0">
                    {replies.map((reply) => (
                      <div
                        key={reply.id}
                        className="rounded-2xl bg-surface_elevated/40 p-4 sm:p-5 flex flex-col gap-3"
                      >
                        <div className="flex items-center gap-2.5">
                          <CornerDownRight className="w-3.5 h-3.5 text-text-muted shrink-0" />
                          <div className="w-6 h-6 rounded-full bg-surface flex items-center justify-center text-[10px] font-mono text-text-primary">
                            {reply.user.name?.[0]?.toUpperCase() || "A"}
                          </div>
                          <span className="text-xs font-medium text-text-primary">
                            {reply.user.name}
                          </span>
                          <span className="text-[10px] font-mono text-text-muted">
                            {new Date(reply.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="pl-6">
                          <MarkdownContent content={reply.content} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}

export default CommentSection;
