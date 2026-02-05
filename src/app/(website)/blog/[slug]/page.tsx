import { notFound } from "next/navigation";
import { getPost } from "@/app/actions/blog";
import { marked } from "marked";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";

export const revalidate = 60; // Revalidate every minute

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata(props: PostPageProps): Promise<Metadata> {
  const params = await props.params;
  const post = await getPost(params.slug);

  if (!post) {
    return {
      title: "Not Found",
      description: "The post you are looking for does not exist."
    };
  }

  return {
    title: `${post.title} | Daniel Ametsowou`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: `https://daniel.ametsowou.me/blog/${post.slug}`,
      images: post.coverImage ? [{ url: post.coverImage }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export default async function PostPage(props: PostPageProps) {
  const params = await props.params;
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  const contentHtml = await marked.parse(post.content || "");

  // Format date
  const date = new Date(post.createdAt || Date.now()).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="flex-1 w-full min-h-screen md:h-full overflow-y-auto no-scrollbar bg-[#fbf5e9]">
        <div className="w-full max-w-4xl mx-auto p-6 md:p-12 pb-24 border-x-0 md:border-x-4 border-red-950 bg-background min-h-full shadow-[0px_0px_20px_rgba(0,0,0,0.05)]">
            <Link 
                href="/blog" 
                className="inline-flex items-center gap-2 text-red-950/60 hover:text-red-950 font-bold uppercase tracking-wider mb-8 transition-colors"
            >
                <ArrowLeft size={20} />
                Back to Blog
            </Link>

            <header className="mb-12 space-y-6">
                <h1 className="text-4xl md:text-6xl font-black text-red-950 leading-tight">
                    {post.title}
                </h1>
                <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags?.map((tag) => (
                        <span key={tag} className="px-3 py-1 bg-red-950/5 text-red-950 text-xs font-bold uppercase tracking-widest border border-red-950/20">
                            {tag}
                        </span>
                    ))}
                </div>
                <p className="text-xl md:text-2xl text-red-900/60 font-medium leading-relaxed border-l-4 border-red-950 pl-6">
                    {post.description}
                </p>
                <div className="flex items-center text-sm font-bold text-red-950/40 uppercase tracking-widest">
                    <span>{date}</span>
                    <span className="mx-2">•</span> 
                    <span>{Math.ceil((post.content?.length || 0) / 1000)} min read</span>
                </div>
            </header>

            {post.coverImage && (
                <div className="w-full aspect-video relative mb-12 border-4 border-red-950 overflow-hidden shadow-[8px_8px_0px_0px_rgba(69,10,10,1)]">
                    <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            )}

            <article 
                className="prose prose-xl prose-stone max-w-none 
                prose-headings:font-bold prose-headings:text-red-950 prose-headings:font-sans
                prose-p:text-red-950/80 prose-p:leading-relaxed
                prose-li:text-red-950/80
                prose-strong:text-red-950 prose-strong:font-black
                prose-blockquote:border-l-4 prose-blockquote:border-red-950 prose-blockquote:bg-red-950/5 prose-blockquote:p-6 prose-blockquote:not-italic
                prose-a:text-red-950 prose-a:underline prose-a:decoration-2 prose-a:underline-offset-2 hover:prose-a:text-red-700
                prose-img:border-4 prose-img:border-red-950 prose-img:shadow-[4px_4px_0px_0px_rgba(69,10,10,1)]
                prose-pre:bg-[#1e1e1e] prose-pre:border-2 prose-pre:border-red-950
                "
                dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
        </div>
    </main>
  );
}
