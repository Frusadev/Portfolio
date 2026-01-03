"use client";

import Link from "next/link";
import { JetBrains_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { FileText } from "lucide-react";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400", "700"],
});

interface Post {
  id: string;
  title: string;
  slug: string;
  description: string;
  createdAt: Date;
  tags: string[] | null;
}

interface BlogListProps {
  posts: Post[];
}

export default function BlogList({ posts }: BlogListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = posts.filter((post) => {
    const query = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(query) ||
      post.description.toLowerCase().includes(query) ||
      post.tags?.some((tag) => tag.toLowerCase().includes(query))
    );
  });

  return (
    <div className={cn("space-y-8 font-mono text-sm", jetBrainsMono.className)}>
      {/* Command Prompt Search */}
      <div className="flex items-center gap-2 bg-black/40 p-3 md:p-4 rounded-lg border border-gray-800 text-gray-300 text-xs md:text-sm">
        <span className="text-green-500">➜</span>
        <span className="text-blue-400">~</span>
        <span className="text-gray-500 whitespace-nowrap">grep -i</span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-transparent border-none outline-none flex-1 text-yellow-300 placeholder-gray-700 min-w-0"
          placeholder='"search pattern..."'
          autoFocus
        />
      </div>

      {/* File Listing Header */}
      <div className="hidden md:grid grid-cols-12 gap-4 text-gray-600 border-b border-gray-800 pb-2 px-2">
        <div className="col-span-2">PERMISSIONS</div>
        <div className="col-span-2">USER</div>
        <div className="col-span-2">SIZE</div>
        <div className="col-span-2">DATE</div>
        <div className="col-span-4">NAME</div>
      </div>

      <div className="space-y-1">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <Link 
              href={`/blog/${post.slug}`} 
              key={post.id} 
              className="group block hover:bg-white/5 rounded px-2 py-3 md:py-2 transition-colors"
            >
              <div className="grid md:grid-cols-12 gap-2 md:gap-4 items-start md:items-center">
                {/* Metadata (Hidden on mobile) */}
                <div className="hidden md:block col-span-2 text-gray-500 text-xs">-rw-r--r--</div>
                <div className="hidden md:block col-span-2 text-yellow-500 text-xs">frusadev</div>
                <div className="hidden md:block col-span-2 text-gray-500 text-xs">{post.description.length * 12}B</div>
                <div className="hidden md:block col-span-2 text-blue-400 text-xs">
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </div>

                {/* File Name / Title */}
                <div className="col-span-12 md:col-span-4 flex flex-col md:flex-row md:items-center gap-1 md:gap-2 min-w-0">
                  <div className="flex items-center gap-2 min-w-0">
                    <FileText className="w-4 h-4 text-gray-500 group-hover:text-yellow-400 transition-colors shrink-0" />
                    <span className="text-gray-300 group-hover:text-green-400 transition-colors truncate font-bold md:font-normal">
                      {post.title.toLowerCase().replace(/\s+/g, '-')}.md
                    </span>
                  </div>
                  {/* Mobile Date */}
                  <div className="md:hidden text-blue-400 text-[10px] pl-6">
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric"
                    })} • {post.description.length * 12}B
                  </div>
                </div>
              </div>
              
              {/* Mobile Description Preview */}
              <div className="md:hidden mt-2 pl-6 text-xs text-gray-500 line-clamp-2">
                # {post.description}
              </div>
            </Link>
          ))
        ) : (
          <div className="text-gray-500 py-8 px-2">
            zsh: no matches found: {searchQuery}
          </div>
        )}
      </div>
      
      <div className="pt-8 text-gray-600 text-xs">
        <span className="text-green-500">➜</span> <span className="text-blue-400">~</span> <span className="animate-pulse">_</span>
      </div>
    </div>
  );
}
