import { BlogPost } from '@/lib/api';
import { Metadata } from 'next';
import BlogPostClient from './BlogPostClient';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// SSR: Her sayfa yenilendiğinde (F5) güncel verileri çek
export const dynamic = 'force-dynamic';

// Cache kullanma, her istekte taze veri
export const revalidate = 0;

// SSG: Generate static params for all blog posts (required for static export)
export async function generateStaticParams() {
  try {
    // Try to fetch blog posts from API
    const { BlogPostsService } = await import('@/lib/api');

    const posts = await BlogPostsService.getPublishedPosts();

    // Return all published blog post slugs
    return posts.map(post => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.warn(
      'Failed to fetch blog posts for generateStaticParams, using fallback:',
      error
    );

    // Fallback for when API is not available (development/build time)
    return [{ slug: 'test-post-1' }, { slug: 'test-post-2' }];
  }
}

// SSG: Generate metadata for each blog post
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  try {
    const { BlogPostsService } = await import('@/lib/api');
    const resolvedParams = await params;
    const post = await BlogPostsService.getPostBySlug(resolvedParams.slug);

    return {
      title: `${post.title} | Bark&Lounge Blog`,
      description: post.excerpt,
      keywords: post.tags?.join(', ') || 'bark lounge, pet, blog',
      authors: [{ name: post.author }],
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: 'article',
        images: [
          {
            url: post.cover_image_url,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
        publishedTime: post.created_at,
        authors: [post.author],
        tags: post.tags,
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt,
        images: [post.cover_image_url],
      },
    };
  } catch (error) {
    console.warn('Blog post metadata could not be generated:', error);

    // Fallback metadata
    return {
      title: `Blog Yazısı | Bark&Lounge`,
      description: 'Bark&Lounge blog yazısı',
      keywords: 'bark lounge, pet, blog',
      openGraph: {
        title: 'Blog Yazısı | Bark&Lounge',
        description: 'Bark&Lounge blog yazısı',
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Blog Yazısı | Bark&Lounge',
        description: 'Bark&Lounge blog yazısı',
      },
    };
  }
}

const BlogPostPage = async ({ params }: BlogPostPageProps) => {
  const resolvedParams = await params;

  // SSR: Fetch blog post data on server
  let initialPost: BlogPost | null = null;
  let relatedPosts: BlogPost[] = [];

  try {
    const { BlogPostsService } = await import('@/lib/api');

    // Fetch current post and all posts for related posts
    const [post, allPosts] = await Promise.all([
      BlogPostsService.getPostBySlug(resolvedParams.slug),
      BlogPostsService.getPublishedPosts().catch(() => []),
    ]);

    initialPost = post;

    // Find related posts (same tags)
    if (post && allPosts.length > 0) {
      relatedPosts = allPosts
        .filter(
          p =>
            p.id !== post.id &&
            p.tags &&
            post.tags &&
            p.tags.some(tag => post.tags!.includes(tag))
        )
        .slice(0, 3);
    }

    console.log('✅ SSR: Blog post data fetched', {
      slug: resolvedParams.slug,
    });
  } catch (error) {
    console.error('❌ SSR: Blog post fetch error:', error);
    // Client will handle the error state
  }

  return (
    <BlogPostClient
      slug={resolvedParams.slug}
      initialPost={initialPost}
      initialRelatedPosts={relatedPosts}
    />
  );
};

export default BlogPostPage;
