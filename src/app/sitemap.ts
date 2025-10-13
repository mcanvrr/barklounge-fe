import { BlogPostsService } from '@/lib/api';
import { MetadataRoute } from 'next';

// Her istekte yeni sitemap oluştur (güncel blog yazıları için)
export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://barkloungetr.com';

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
  ];

  try {
    // API'den blog yazılarını çek
    const blogPosts = await BlogPostsService.getPublishedPosts();

    // Blog posts
    const blogPages: MetadataRoute.Sitemap = blogPosts.map(post => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updated_at || post.created_at),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));

    return [...staticPages, ...blogPages];
  } catch (error) {
    console.error('Sitemap oluşturulurken hata:', error);
    // Hata durumunda sadece static sayfaları döndür
    return staticPages;
  }
}
