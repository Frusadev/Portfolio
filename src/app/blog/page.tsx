import { getPosts } from "@/app/actions/blog";
import BlogList from "@/components/blog/blog-list";
import { JetBrains_Mono } from "next/font/google";
import { cn } from "@/lib/utils";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400", "700"],
});

export default async function BlogPage() {
  const posts = await getPosts(true); // Only published

  return (
    <main className={cn("container mx-auto pt-32 pb-20 px-4 max-w-4xl", jetBrainsMono.className)}>
      <div className="mb-12 border-b border-gray-800 pb-8">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <span>~/workspace/blog</span>
          <span>/</span>
          <span className="text-green-500">index.js</span>
        </div>
        
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 break-words">
          <span className="text-purple-500">const</span> <span className="text-yellow-400">Thoughts</span> <span className="text-white">=</span> <span className="text-blue-400">require</span>(<span className="text-green-400">&apos;./brain&apos;</span>);
        </h1>
        
        <p className="text-gray-400 max-w-2xl leading-relaxed">
          <span className="text-gray-600">{"// A collection of technical deep dives, tutorials, and"}</span><br/>
          <span className="text-gray-600">{"// random thoughts about software engineering."}</span>
        </p>
      </div>
      
      <BlogList posts={posts} />
    </main>
  );
}
