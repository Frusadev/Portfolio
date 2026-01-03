import { getPost } from "@/app/actions/blog";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import "highlight.js/styles/github-dark.css";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto pt-32 pb-20 px-4 max-w-3xl">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4 break-words">{post.title}</h1>
        <div className="text-muted-foreground mb-4">
          {new Date(post.createdAt).toLocaleDateString()}
        </div>
        <div className="flex justify-center gap-2">
          {post.tags?.map((tag) => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
      </div>
      
      {post.coverImage && (
        <div className="relative w-full h-64 md:h-96 mb-8 rounded-xl overflow-hidden">
          <Image 
            src={post.coverImage} 
            alt={post.title} 
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="prose prose-lg dark:prose-invert mx-auto">
        <ReactMarkdown
          rehypePlugins={[rehypeHighlight, rehypeRaw]}
          remarkPlugins={[remarkGfm]}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}
