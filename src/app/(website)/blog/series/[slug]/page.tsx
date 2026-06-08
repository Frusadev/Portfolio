import { notFound } from "next/navigation";
import { getSeriesBySlug, getPostsInSeries } from "@/app/actions/series";
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import { Metadata } from "next";

export const revalidate = 60;

interface SeriesPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata(props: SeriesPageProps): Promise<Metadata> {
  const params = await props.params;
  const series = await getSeriesBySlug(params.slug);

  if (!series) {
    return {
      title: "Series Not Found",
    };
  }

  return {
    title: `${series.title} | Daniel Ametsowou`,
    description: series.description,
  };
}

export default async function SeriesPage(props: SeriesPageProps) {
  const params = await props.params;
  const series = await getSeriesBySlug(params.slug);

  if (!series) {
    notFound();
  }

  const posts = await getPostsInSeries(series.id);

  return (
    <main className="flex-1 w-full min-h-screen bg-[#fbf5e9]">
        <div className="w-full max-w-4xl mx-auto p-6 md:p-12 pb-24 border-x-0 md:border-x-4 border-red-950 bg-background min-h-full shadow-[0px_0px_20px_rgba(0,0,0,0.05)]">
            <Link 
                href="/blog/series" 
                className="inline-flex items-center gap-2 text-red-950/60 hover:text-red-950 font-bold uppercase tracking-wider mb-8 transition-colors"
            >
                <ArrowLeft size={20} />
                All Series
            </Link>

            <header className="mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-950/5 text-red-950 text-xs font-bold uppercase tracking-widest border border-red-950/20 mb-4">
                    <BookOpen size={14} /> Series
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-red-950 leading-tight mb-4">
                    {series.title}
                </h1>
                <p className="text-xl text-red-900/60 font-medium leading-relaxed border-l-4 border-red-950 pl-6">
                    {series.description}
                </p>
            </header>

            <div className="space-y-6">
                <h2 className="text-2xl font-bold uppercase tracking-widest text-red-950 border-b-4 border-red-950 pb-2 mb-6">
                    Articles in this series ({posts.length})
                </h2>
                
                {posts.length === 0 ? (
                    <div className="p-8 border-2 border-dashed border-red-950/30 text-center text-red-950/50 font-bold uppercase tracking-widest">
                        No articles added yet.
                    </div>
                ) : (
                    <div className="flex flex-col gap-6">
                        {posts.map((post, index) => (
                            <Link 
                                key={post.id} 
                                href={`/blog/${post.slug}`}
                                className="group flex gap-6 items-start p-6 border-2 border-red-950 hover:bg-red-950/5 transition-colors"
                            >
                                <div className="text-4xl font-black text-red-950/20 group-hover:text-red-950 transition-colors w-12 text-center shrink-0">
                                    {index + 1}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold uppercase tracking-wider text-red-950 mb-2 group-hover:underline decoration-2 underline-offset-4">
                                        {post.title}
                                    </h3>
                                    <div className="text-sm font-bold uppercase tracking-widest text-red-950/60">
                                        Read Article →
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    </main>
  );
}
