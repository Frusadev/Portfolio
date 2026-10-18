"use client";

import * as React from "react";
import Link from "next/link";
import { createPost, updatePost, deletePost } from "@/app/actions/blog";
import { toast } from "sonner";
import {
  Plus,
  Trash2,
  Pencil,
  ArrowUpRight,
  Loader2,
  FileText,
  Sparkles,
  Eye,
  CheckCircle2,
  Clock,
} from "lucide-react";

export interface PostData {
  id: string;
  title: string;
  slug: string;
  description: string;
  content?: string | null;
  published?: boolean | null;
  tags?: string[] | null;
  createdAt: Date;
  views?: number | null;
}

export function ArticlesManager({
  initialPosts = [],
}: {
  initialPosts: PostData[];
}) {
  const [posts, setPosts] = React.useState<PostData[]>(initialPosts);
  const [isCreating, setIsCreating] = React.useState(false);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);
  const [deletingId, setDeletingId] = React.useState<string | null>(null);

  // Form states
  const [title, setTitle] = React.useState("");
  const [slug, setSlug] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [content, setContent] = React.useState("");
  const [tagString, setTagString] = React.useState("");
  const [published, setPublished] = React.useState(true);

  // Auto-slug generator from title
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingId) {
      const generated = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setSlug(generated);
    }
  };

  const resetForm = () => {
    setTitle("");
    setSlug("");
    setDescription("");
    setContent("");
    setTagString("");
    setPublished(true);
    setEditingId(null);
    setIsCreating(false);
  };

  const startEdit = (post: PostData) => {
    setEditingId(post.id);
    setTitle(post.title);
    setSlug(post.slug);
    setDescription(post.description);
    setContent(post.content || "");
    setTagString(post.tags ? post.tags.join(", ") : "");
    setPublished(post.published ?? true);
    setIsCreating(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !slug.trim() || !description.trim()) {
      toast.error("Please provide title, slug, and description");
      return;
    }

    setSubmitting(true);
    try {
      const tags = tagString
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const postPayload = {
        title: title.trim(),
        slug: slug.trim(),
        description: description.trim(),
        content: content.trim(),
        tags,
        published,
      };

      if (editingId) {
        const res = await updatePost(editingId, postPayload);
        if (res.success) {
          toast.success("Article updated");
          setPosts((prev) =>
            prev.map((p) => (p.id === editingId ? { ...p, ...postPayload } : p))
          );
          resetForm();
        } else {
          toast.error(res.error || "Failed to update article");
        }
      } else {
        const res = await createPost(postPayload);
        if (res.success) {
          toast.success("Article created");
          const newPost: PostData = {
            id: `post-${Date.now()}`,
            ...postPayload,
            createdAt: new Date(),
            views: 0,
          };
          setPosts([newPost, ...posts]);
          resetForm();
        } else {
          toast.error(res.error || "Failed to create article");
        }
      }
    } catch {
      toast.error("An unexpected error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const res = await deletePost(id);
      if (res.success) {
        toast.success("Article deleted");
        setPosts((prev) => prev.filter((p) => p.id !== id));
      } else {
        toast.error(res.error || "Failed to delete article");
      }
    } catch {
      toast.error("Failed to delete article");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-text-primary">
            Writing & Articles
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            Publish long-form essays, technical notes, and curious explorations. Supports Markdown, LaTeX math ($math$), and code.
          </p>
        </div>
        <button
          onClick={() => {
            if (isCreating) {
              resetForm();
            } else {
              setIsCreating(true);
            }
          }}
          className="rounded-full bg-text-primary text-background hover:bg-white text-xs font-medium px-5 py-2.5 transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{isCreating ? "cancel" : "new article"}</span>
        </button>
      </div>

      {/* Creation / Edit Form */}
      {isCreating && (
        <form
          onSubmit={handleSave}
          className="rounded-3xl bg-surface/50 p-6 sm:p-10 flex flex-col gap-6 animate-in fade-in duration-300"
        >
          <div className="flex items-center gap-2 text-xs font-mono text-accent-secondary">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{editingId ? "Edit article" : "Write new article"}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono text-text-muted">
                article title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. On Stochastic Microstructure and Curiosity"
                required
                className="w-full bg-surface_elevated/80 text-text-primary placeholder:text-text-muted text-sm rounded-2xl px-4 py-3.5 focus:outline-none focus:ring-1 focus:ring-white/20 border-0"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono text-text-muted">
                url slug *
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, "-"))}
                placeholder="e.g. stochastic-microstructure"
                required
                className="w-full bg-surface_elevated/80 text-text-primary placeholder:text-text-muted text-sm rounded-2xl px-4 py-3.5 focus:outline-none focus:ring-1 focus:ring-white/20 border-0 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono text-text-muted">
                summary description *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="One or two sentences summarizing the post..."
                rows={2}
                required
                className="w-full bg-surface_elevated/80 text-text-primary placeholder:text-text-muted text-sm rounded-2xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white/20 border-0 resize-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono text-text-muted">
                tags (comma-separated)
              </label>
              <input
                type="text"
                value={tagString}
                onChange={(e) => setTagString(e.target.value)}
                placeholder="Creativity, Quantitative Finance, Architecture"
                className="w-full bg-surface_elevated/80 text-text-primary placeholder:text-text-muted text-sm rounded-2xl px-4 py-3.5 focus:outline-none focus:ring-1 focus:ring-white/20 border-0"
              />
            </div>
          </div>

          {/* Markdown Content */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono text-text-muted">
                content (markdown & latex supported)
              </label>
              <span className="text-[11px] font-mono text-accent-secondary">
                Use $x^2$ for inline math or $$...$$ for display equations
              </span>
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="# Heading\n\nWrite your thoughts, rabbit holes, and explorations here..."
              rows={14}
              className="w-full bg-surface_elevated/80 text-text-primary placeholder:text-text-muted text-sm font-mono rounded-2xl p-4 focus:outline-none focus:ring-1 focus:ring-white/20 border-0 resize-y leading-relaxed"
            />
          </div>

          {/* Published toggle */}
          <div className="flex items-center gap-3 pt-1">
            <input
              type="checkbox"
              id="published"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="w-4 h-4 rounded bg-surface_elevated border-0 text-text-primary focus:ring-0 cursor-pointer"
            />
            <label
              htmlFor="published"
              className="text-xs font-mono text-text-secondary cursor-pointer"
            >
              publish immediately (uncheck to save as private draft)
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={resetForm}
              className="text-xs font-mono text-text-muted hover:text-text-primary px-4 py-2 transition-colors"
            >
              cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="rounded-full bg-text-primary text-background hover:bg-white text-xs font-medium px-6 py-2.5 transition-all disabled:opacity-40 flex items-center gap-2"
            >
              {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              <span>{editingId ? "update article" : "publish article"}</span>
            </button>
          </div>
        </form>
      )}

      {/* Posts List */}
      <div className="flex flex-col gap-4">
        {posts.length === 0 ? (
          <div className="rounded-3xl bg-surface/30 p-12 text-center text-xs font-mono text-text-muted">
            No articles created yet. Click &quot;new article&quot; to write your first post.
          </div>
        ) : (
          posts.map((post) => {
            const isPublished = post.published ?? true;

            return (
              <div
                key={post.id}
                className="rounded-3xl bg-surface/40 hover:bg-surface/50 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 transition-colors"
              >
                <div className="flex items-start gap-4 min-w-0">
                  <div className="p-3 rounded-2xl bg-surface_elevated text-accent-secondary shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>

                  <div className="flex flex-col gap-1.5 min-w-0">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h2 className="text-base sm:text-lg font-medium text-text-primary truncate">
                        {post.title}
                      </h2>
                      <span
                        className={`inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full ${
                          isPublished
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-surface_elevated text-text-muted"
                        }`}
                      >
                        {isPublished ? (
                          <CheckCircle2 className="w-3 h-3" />
                        ) : (
                          <Clock className="w-3 h-3" />
                        )}
                        <span>{isPublished ? "published" : "draft"}</span>
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed line-clamp-2 max-w-2xl">
                      {post.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      <span className="text-[11px] font-mono text-text-muted">
                        /blog/{post.slug}
                      </span>
                      {post.views !== undefined && post.views !== null && (
                        <span className="text-[11px] font-mono text-text-muted flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {post.views}
                        </span>
                      )}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] font-mono text-accent-secondary bg-surface_elevated px-2 py-0.5 rounded-md"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                  <Link
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    className="p-2 rounded-full bg-surface_elevated hover:bg-surface_elevated/80 text-text-muted hover:text-text-primary transition-colors"
                    title="View live post"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => startEdit(post)}
                    className="p-2 rounded-full bg-surface_elevated hover:bg-surface_elevated/80 text-text-muted hover:text-text-primary transition-colors"
                    title="Edit article"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(post.id)}
                    disabled={deletingId === post.id}
                    className="p-2 rounded-full bg-surface_elevated hover:bg-red-500/20 text-text-muted hover:text-red-400 transition-colors"
                    title="Delete article"
                  >
                    {deletingId === post.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default ArticlesManager;
