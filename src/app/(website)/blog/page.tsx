import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getPosts } from "@/app/actions/blog";

export const metadata = {
  title: "Blog — Daniel Ametsowou",
  description: "Essays and notes on quantitative engineering, aesthetics, economics, and curiosity.",
};

export default async function BlogPage() {
  const posts = await getPosts(true);

  return (
    <main className="min-h-screen w-full bg-background text-foreground px-6 sm:px-12 md:px-16 lg:px-24 py-28 md:py-36 select-none">
      <div className="max-w-7xl w-full mx-auto flex flex-col gap-16 md:gap-20">
        {/* Page Hero */}
        <div className="flex flex-col max-w-3xl">
          <Link
            href="/"
            className="text-xs font-mono text-text-muted hover:text-text-primary transition-colors mb-6 inline-flex items-center gap-1.5"
          >
            ← Home
          </Link>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-text-primary">
            Writing
          </h1>
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed mt-4">
            Essays, mathematical reflections, and long-form explorations on algorithms, finance, and creative architecture.
          </p>
        </div>

        {/* Articles List / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group rounded-3xl bg-surface/40 hover:bg-surface/70 transition-all duration-300 p-8 sm:p-10 flex flex-col justify-between gap-8 min-h-[260px]"
            >
              <div className="flex flex-col gap-4">
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono text-accent-secondary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <h2 className="text-xl sm:text-2xl font-normal text-text-primary group-hover:text-white transition-colors leading-snug">
                  {post.title}
                </h2>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed line-clamp-3">
                  {post.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-mono text-text-muted">
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <span className="text-xs text-text-muted group-hover:text-text-primary transition-colors flex items-center gap-1">
                  Read article
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
