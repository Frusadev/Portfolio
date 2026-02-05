import { MetadataRoute } from 'next';
import { getPosts } from './actions/blog';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://daniel.ametsowou.me';

  // Static routes
  const routes = [
    '',
    '/blog',
    '/projects',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 1,
  }));

  // Dynamic routes (posts)
  const posts = await getPosts();
  const postRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.createdAt || new Date()), // Fallback if no date
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...routes, ...postRoutes];
}
