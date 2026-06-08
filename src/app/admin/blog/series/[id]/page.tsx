import { getSeriesById, getPostsInSeries } from "@/app/actions/series";
import { getPosts } from "@/app/actions/blog";
import SeriesDetailsClientPage from "./client-page";
import { notFound } from "next/navigation";

export default async function AdminSeriesDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const series = await getSeriesById(resolvedParams.id);
  
  if (!series) {
    notFound();
  }

  const postsInSeries = await getPostsInSeries(series.id);
  const allPosts = await getPosts(false); // get all posts including drafts
  
  return (
    <SeriesDetailsClientPage 
      series={series} 
      initialPostsInSeries={postsInSeries} 
      availablePosts={allPosts} 
    />
  );
}
