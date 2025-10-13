import type { BlogPost, BlogTag } from '@/lib/api';
import { AppSettingsService, BlogPostsService } from '@/lib/api';
import { Metadata } from 'next';
import BlogListClient from './BlogListClient';

// SSR: Her sayfa yenilendiğinde (F5) güncel verileri çek
export const dynamic = 'force-dynamic';

// Cache kullanma, her istekte taze veri
export const revalidate = 0;

// SSR: Dynamic metadata from API
export async function generateMetadata(): Promise<Metadata> {
  try {
    const seoSettings = await AppSettingsService.getSeoSettings();

    return {
      title:
        seoSettings?.title
          ?.replace('Ana Sayfa', 'Blog')
          ?.replace('Anasayfa', 'Blog') ||
        'Blog | Bark&Lounge - Pet Bakım Rehberleri ve İpuçları',
      description:
        seoSettings?.description ||
        'Evcil hayvan bakımı, eğitimi ve sağlığı hakkında uzman tavsiyeleri. Köpek ve kedi bakım rehberleri, beslenme önerileri ve daha fazlası.',
      keywords:
        seoSettings?.keywords ||
        'pet bakım, köpek bakımı, kedi bakımı, evcil hayvan sağlığı, pet eğitimi, Bark&Lounge blog',
      openGraph: {
        title: 'Blog | Bark&Lounge - Pet Bakım Rehberleri',
        description:
          'Evcil hayvan bakımı, eğitimi ve sağlığı hakkında uzman tavsiyeleri.',
        type: 'website',
        images: [
          {
            url: seoSettings?.og_image_url || '/images/blog-og.jpg',
            width: 1200,
            height: 630,
            alt: 'Bark&Lounge Blog',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Blog | Bark&Lounge - Pet Bakım Rehberleri',
        description:
          'Evcil hayvan bakımı, eğitimi ve sağlığı hakkında uzman tavsiyeleri.',
        images: [seoSettings?.og_image_url || '/images/blog-og.jpg'],
      },
    };
  } catch (error) {
    console.error('Blog SEO metadata alınamadı:', error);
    return fallbackMetadata;
  }
}

// Fallback metadata
const fallbackMetadata: Metadata = {
  title: 'Blog | Bark&Lounge - Pet Bakım Rehberleri ve İpuçları',
  description:
    'Evcil hayvan bakımı, eğitimi ve sağlığı hakkında uzman tavsiyeleri. Köpek ve kedi bakım rehberleri, beslenme önerileri ve daha fazlası.',
  keywords:
    'pet bakım, köpek bakımı, kedi bakımı, evcil hayvan sağlığı, pet eğitimi, Bark&Lounge blog',
  openGraph: {
    title: 'Blog | Bark&Lounge - Pet Bakım Rehberleri',
    description:
      'Evcil hayvan bakımı, eğitimi ve sağlığı hakkında uzman tavsiyeleri.',
    type: 'website',
    images: [
      {
        url: '/images/blog-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Bark&Lounge Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Bark&Lounge - Pet Bakım Rehberleri',
    description:
      'Evcil hayvan bakımı, eğitimi ve sağlığı hakkında uzman tavsiyeleri.',
    images: ['/images/blog-og.jpg'],
  },
};

// Server Component - SSR için async
const BlogPage = async () => {
  // SSR: Tüm blog verilerini sunucuda çek
  let initialData: {
    posts: BlogPost[];
    featuredPosts: BlogPost[];
    blogTags: BlogTag[];
  } | null = null;

  try {
    const [posts, featuredPosts, blogTags] = await Promise.all([
      BlogPostsService.getPublishedPosts(),
      BlogPostsService.getFeaturedPosts(),
      AppSettingsService.getActiveBlogTags(),
    ]);

    initialData = {
      posts: posts || [],
      featuredPosts: featuredPosts || [],
      blogTags: blogTags || [],
    };
  } catch (error) {
    console.error('❌ Blog SSR: Veri yüklenemedi:', error);
    // initialData null kalacak, client-side fallback devreye girecek
  }

  // Client component'e SSR verilerini geç
  return <BlogListClient initialData={initialData} />;
};

export default BlogPage;
