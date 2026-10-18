import * as React from "react";
import { getPosts } from "@/app/actions/blog";
import { ArticlesManager } from "@/components/admin/articles-manager";

export const metadata = {
  title: "Articles — Admin",
};

export default async function AdminArticlesPage() {
  const posts = await getPosts(false);

  return <ArticlesManager initialPosts={posts} />;
}
