import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getLatestPosts } from "@/app/actions/blog";

export async function LatestArticles() {
  const posts = await getLatestPosts(3);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono text-text-muted tracking-wide">
          Latest articles & essays
        </span>
        <Link
          href="/blog"
          className="text-xs font-mono text-text-muted hover:text-text-primary transition-colors flex items-center gap-1"
        >
          View all writing <ArrowUpRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group rounded-3xl bg-surface/40 hover:bg-surface/70 transition-all duration-300 p-8 sm:p-10 flex flex-col justify-between gap-6 min-h-[220px]"
          >
            <div className="flex flex-col gap-3">
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono text-accent-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <h3 className="text-lg sm:text-xl font-normal text-text-primary group-hover:text-white transition-colors leading-snug">
                {post.title}
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed line-clamp-3">
                {post.description}
              </p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-mono text-text-muted">
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })}
              </span>
              <span className="text-xs text-text-muted group-hover:text-text-primary transition-colors flex items-center gap-1">
                Read
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default LatestArticles;
