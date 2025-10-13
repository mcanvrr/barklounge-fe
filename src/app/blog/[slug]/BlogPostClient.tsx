'use client';

import { SEO } from '@/components';
import { BlogPost } from '@/lib/api';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchPostBySlug, fetchPublishedPosts } from '@/store/slices/blogSlice';
import {
  ArrowLeft,
  Calendar,
  Check,
  Clock,
  Filter,
  Share2,
  User,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface BlogPostClientProps {
  slug: string;
  initialPost: BlogPost | null;
  initialRelatedPosts: BlogPost[];
}

const BlogPostClient = ({
  slug,
  initialPost,
  initialRelatedPosts,
}: BlogPostClientProps) => {
  const dispatch = useAppDispatch();
  const {
    currentPost: reduxPost,
    posts: allPosts,
    loading,
    error,
  } = useAppSelector(state => state.blog);

  // Use SSR data if available, fallback to Redux
  const post = initialPost || reduxPost;
  const relatedPosts =
    initialRelatedPosts.length > 0
      ? initialRelatedPosts
      : post && allPosts
      ? allPosts
          .filter(
            p =>
              p.id !== post.id &&
              p.tags &&
              post.tags &&
              p.tags.some(tag => post.tags!.includes(tag))
          )
          .slice(0, 3)
      : [];

  useEffect(() => {
    // Only fetch if no SSR data provided
    if (!initialPost) {
      dispatch(fetchPostBySlug(slug));
    }
    if (initialRelatedPosts.length === 0) {
      dispatch(fetchPublishedPosts());
    }
  }, [dispatch, slug, initialPost, initialRelatedPosts.length]);

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  // Only show loading if no SSR data
  if (!initialPost && loading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 pt-20 sm:pt-24 lg:pt-40 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4'></div>
          <p className='text-gray-600'>Blog yazısı yükleniyor...</p>
        </div>
      </div>
    );
  }

  if ((!initialPost && error) || !post) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 pt-20 sm:pt-24 lg:pt-40 flex items-center justify-center'>
        <div className='text-center'>
          <p className='text-red-600 mb-4'>
            Blog yazısı bulunamadı veya yüklenirken bir hata oluştu.
          </p>
          <Link
            href='/blog'
            className='px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors inline-block'
          >
            Blog&apos;a D\u00f6n
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO.BlogStructuredData post={post} />
      <BlogPostContent
        post={post}
        calculateReadTime={calculateReadTime}
        relatedPosts={relatedPosts}
      />
    </>
  );
};

const BlogPostContent = ({
  post,
  calculateReadTime,
  relatedPosts,
}: {
  post: BlogPost;
  calculateReadTime: (content: string) => number;
  relatedPosts: BlogPost[];
}) => {
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  // Copy link function
  const copyLinkToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setIsLinkCopied(true);

      // Reset after 2 seconds
      setTimeout(() => {
        setIsLinkCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Link kopyalanamadı:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = window.location.href;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);

      setIsLinkCopied(true);
      setTimeout(() => {
        setIsLinkCopied(false);
      }, 2000);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 pt-20 sm:pt-24 lg:pt-40'>
      {/* Beautiful Header */}
      <header className='bg-gradient-to-br from-white via-orange-50/30 to-amber-50/50 backdrop-blur-sm border-b border-orange-100'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between py-4'>
            {/* Back Button */}
            <Link
              href='/blog'
              className='inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm text-gray-700 hover:text-orange-600 rounded-xl border border-orange-200 hover:border-orange-300 transition-all transform hover:scale-105'
            >
              <ArrowLeft className='w-4 h-4' />
              <span className='font-medium'>Blog&apos;a Dön</span>
            </Link>

            {/* Share Button */}
            <button
              onClick={copyLinkToClipboard}
              className='inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-xl hover:from-orange-700 hover:to-amber-700 transition-all transform hover:scale-105 font-medium'
            >
              {isLinkCopied ? (
                <>
                  <Check className='w-4 h-4' />
                  <span>Bağlantı Kopyalandı</span>
                </>
              ) : (
                <>
                  <Share2 className='w-4 h-4' />
                  <span>Paylaş</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-5'>
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
          {/* Main Content */}
          <main className='lg:col-span-3'>
            {/* Article Header */}
            <div className='bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-sm mb-8'>
              {/* Tags */}
              <div className='flex flex-wrap gap-2 mb-6'>
                {post.tags &&
                  post.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className='inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 rounded-xl border border-orange-200 font-medium'
                    >
                      {tag}
                    </span>
                  ))}
              </div>

              {/* Title */}
              <h1 className='text-4xl md:text-5xl font-black bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 bg-clip-text text-transparent mb-6 leading-tight'>
                {post.title}
              </h1>

              {/* Meta Info */}
              <div className='flex flex-wrap items-center gap-6 text-gray-600 mb-8'>
                <div className='flex items-center gap-2'>
                  <div className='w-8 h-8 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl flex items-center justify-center'>
                    <User className='w-4 h-4 text-white' />
                  </div>
                  <span className='font-medium'>{post.author}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Calendar className='w-5 h-5 text-orange-600' />
                  <span>
                    {new Date(post.created_at).toLocaleDateString('tr-TR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <div className='flex items-center gap-2'>
                  <Clock className='w-5 h-5 text-orange-600' />
                  <span>{calculateReadTime(post.content)} dakika okuma</span>
                </div>
                <div className='flex items-center gap-2'>
                  <svg
                    className='w-5 h-5 text-orange-600'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                    />
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                    />
                  </svg>
                  <span>{post.view_count || 0} görüntülenme</span>
                </div>
              </div>
            </div>

            {/* Cover Image */}
            <div className='relative h-96 md:h-[500px] rounded-3xl overflow-hidden mb-8 shadow-lg'>
              <Image
                src={post.cover_image_url}
                alt={`${post.title} - Bark&Lounge blog yazısı`}
                title={post.title}
                fill
                className='object-cover'
                priority
                placeholder='blur'
                blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxOAPwCdABmX/9k='
              />
              <div className='absolute inset-0 bg-gradient-to-t from-orange-600/20 via-transparent to-transparent'></div>
            </div>

            {/* Content */}
            <div className='bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-sm'>
              {/* Excerpt Highlight */}
              <div className='mb-8 p-6 bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-orange-500 rounded-r-2xl'>
                <p className='text-lg text-gray-800 italic leading-relaxed font-medium'>
                  {post.excerpt}
                </p>
              </div>

              {/* Article Content */}
              <div
                className='prose prose-lg max-w-none blog-content'
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Tags Section */}
              <div className='mt-12 pt-8 border-t border-gray-200/50'>
                <div className='flex items-center gap-2 mb-6'>
                  <Filter className='w-5 h-5 text-orange-600' />
                  <h3 className='text-lg font-bold text-gray-900'>Etiketler</h3>
                </div>
                <div className='flex flex-wrap gap-3'>
                  {post.tags &&
                    post.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className='inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors cursor-pointer font-medium'
                      >
                        #{tag}
                      </span>
                    ))}
                </div>
              </div>

              {/* Back to Blog */}
              <div className='mt-12 pt-8 border-t border-gray-200/50 text-center'>
                <Link
                  href='/blog'
                  className='inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-2xl hover:from-orange-700 hover:to-amber-700 transition-all transform hover:scale-105 font-bold shadow-lg'
                >
                  <ArrowLeft className='w-5 h-5' />
                  Tüm Hikayeleri Keşfet
                </Link>
              </div>
            </div>
          </main>

          {/* Sidebar */}
          <aside className='lg:col-span-1 space-y-6'>
            {/* Author Card */}
            <div className='bg-white/60 backdrop-blur-sm rounded-3xl p-6 border border-white/50 shadow-sm relative z-10'>
              <div className='text-center'>
                <div className='w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-full mx-auto mb-4 flex items-center justify-center'>
                  <User className='w-8 h-8 text-white' />
                </div>
                <h3 className='font-bold text-gray-900 mb-2'>{post.author}</h3>
                <div className='text-xs text-gray-500'>
                  Bu yazıyı{' '}
                  {new Date(post.created_at).toLocaleDateString('tr-TR')}{' '}
                  tarihinde paylaştı
                </div>
              </div>
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className='bg-white/60 backdrop-blur-sm rounded-3xl p-6 border border-white/50 shadow-sm'>
                <div className='flex items-center gap-2 mb-6'>
                  <Filter className='w-5 h-5 text-orange-600' />
                  <h3 className='font-bold text-gray-900'>İlgili Yazılar</h3>
                </div>
                <div className='space-y-4'>
                  {relatedPosts.map((relatedPost: BlogPost) => (
                    <Link
                      key={relatedPost.id}
                      href={`/blog/${relatedPost.slug}`}
                      aria-label={`${relatedPost.title} blog yazısını oku`}
                      className='group block'
                    >
                      <div className='flex gap-3'>
                        <div className='relative w-16 h-16 flex-shrink-0'>
                          <Image
                            src={relatedPost.cover_image_url}
                            alt={`${relatedPost.title} - Bark&Lounge blog yazısı`}
                            title={relatedPost.title}
                            fill
                            className='object-cover rounded-xl'
                            sizes='64px'
                          />
                        </div>
                        <div className='flex-1 min-w-0'>
                          <h4 className='text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-orange-600 transition-colors'>
                            {relatedPost.title}
                          </h4>
                          <div className='flex items-center gap-2 mt-2 text-xs text-gray-500'>
                            <Calendar className='w-3 h-3' />
                            {new Date(
                              relatedPost.created_at
                            ).toLocaleDateString('tr-TR', {
                              day: 'numeric',
                              month: 'short',
                            })}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BlogPostClient;
