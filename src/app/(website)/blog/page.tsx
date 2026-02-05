import { getPosts } from "@/app/actions/blog";
import AutoBentoGrid, { BentoItem } from "@/components/ui/auto-bento-grid";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await getPosts(true);

  // Map database posts to Bento items
  const items: BentoItem[] = posts.map((post) => ({
    id: post.id,
    title: post.title,
    description: post.description,
    href: `/blog/${post.slug}`,
    tags: post.tags || [],
    image: post.coverImage || undefined,
    date: post.createdAt ? new Date(post.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    }) : undefined,
  }));

  return (
    <div className="md:h-full w-full md:inline-block md:min-w-full bg-background">
       <div className="flex flex-col w-full h-auto md:h-full md:w-fit">
          {/* Header Block for the Page - integrated into the flow or separate? 
              The AutoBentoGrid expects a list. We might want a 'Header' item as the first item.
          */}
          
          <AutoBentoGrid items={items} />
       </div>
    </div>
  );
}
