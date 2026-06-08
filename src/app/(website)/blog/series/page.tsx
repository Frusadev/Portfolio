import { getSeries } from "@/app/actions/series";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Series | Daniel Ametsowou",
  description: "Explore themed series of articles on web development, design, and more.",
};

export const revalidate = 60;

export default async function SeriesIndexPage() {
  const seriesList = await getSeries();

  return (
    <main className="flex-1 w-full min-h-screen bg-[#fbf5e9]">
        <div className="w-full max-w-4xl mx-auto p-6 md:p-12 pb-24 border-x-0 md:border-x-4 border-red-950 bg-background min-h-full shadow-[0px_0px_20px_rgba(0,0,0,0.05)]">
            <Link 
                href="/blog" 
                className="inline-flex items-center gap-2 text-red-950/60 hover:text-red-950 font-bold uppercase tracking-wider mb-8 transition-colors"
            >
                <ArrowLeft size={20} />
                Back to Blog
            </Link>

            <header className="mb-12">
                <h1 className="text-4xl md:text-6xl font-black text-red-950 leading-tight mb-4">
                    Blog Series
                </h1>
                <p className="text-xl text-red-900/60 font-medium leading-relaxed border-l-4 border-red-950 pl-6">
                    Deep dives into specific topics, organized into readable series.
                </p>
            </header>

            <div className="space-y-8">
                {seriesList.length === 0 ? (
                    <div className="p-8 border-2 border-dashed border-red-950/30 text-center text-red-950/50 font-bold uppercase tracking-widest">
                        No series published yet.
                    </div>
                ) : (
                    seriesList.map((series) => (
                        <Link 
                            key={series.id} 
                            href={`/blog/series/${series.slug}`}
                            className="block group"
                        >
                            <article className="p-6 md:p-8 bg-red-950 text-[#fbf5e9] border-4 border-red-950 shadow-[8px_8px_0px_0px_rgba(69,10,10,1)] group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-hover:shadow-none transition-all">
                                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-wider mb-4 group-hover:text-red-300 transition-colors">
                                    {series.title}
                                </h2>
                                <p className="text-lg opacity-80 leading-relaxed font-medium">
                                    {series.description}
                                </p>
                            </article>
                        </Link>
                    ))
                )}
            </div>
        </div>
    </main>
  );
}
