import * as React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost } from "@/app/actions/blog";
import { getComments } from "@/app/actions/comments";
import { getReactions } from "@/app/actions/reactions";
import { getOptionalUser } from "@/app/actions/auth";
import { CommentSection } from "@/components/blog/comment-section";
import { ReactionBar } from "@/components/blog/reaction-bar";
import { marked } from "marked";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: `${post.title} — Daniel Ametsowou`,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const [comments, currentUser, reactions] = await Promise.all([
    getComments(post.id),
    getOptionalUser(),
    getReactions(post.id),
  ]);

  const htmlContent = await marked.parse(post.content || "");

  return (
    <article className="min-h-screen w-full bg-background text-foreground px-6 sm:px-8 py-28 md:py-36 select-none">
      <div className="max-w-3xl mx-auto flex flex-col gap-10">
        {/* Navigation & Metadata */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <span className="text-xs font-mono text-text-muted">
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono text-accent-secondary"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-text-primary leading-tight mt-2">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-text-secondary leading-relaxed mt-2">
            {post.description}
          </p>
        </div>

        {/* Article Body */}
        <div
          className="prose prose-invert max-w-none text-text-primary/90 leading-relaxed font-normal
            prose-headings:text-text-primary prose-headings:font-medium prose-headings:tracking-tight
            prose-p:leading-relaxed prose-p:text-text-secondary
            prose-a:text-accent-primary prose-a:underline prose-a:underline-offset-4
            prose-code:text-accent-secondary prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-surface_elevated/80 prose-pre:rounded-2xl
            prose-blockquote:text-text-secondary prose-blockquote:font-normal prose-blockquote:border-l-0
            prose-hr:border-0 prose-hr:h-[1px] prose-hr:bg-white/[0.06] prose-hr:my-10"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {/* Reactions Bar */}
        <ReactionBar
          postId={post.id}
          initialReactions={reactions}
          currentUserId={currentUser?.id}
        />

        {/* Comments Section */}
        <CommentSection
          postId={post.id}
          initialComments={comments}
          currentUser={currentUser}
        />

        {/* Footer Back Link */}
        <div className="pt-10 mt-6 border-t border-transparent flex items-center justify-between">
          <Link
            href="/blog"
            className="text-xs font-mono text-accent-secondary hover:text-white transition-colors"
          >
            ← View all articles
          </Link>
        </div>
      </div>
    </article>
  );
}
