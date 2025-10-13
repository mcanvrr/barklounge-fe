import { BlogPost as BlogPostType } from '@/types';
import {
  BookOpen,
  Calendar,
  Clock,
  Filter,
  Heart,
  Search,
  Sparkles,
  TrendingUp,
  User,
  X,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// BlogCard Component
interface BlogCardProps {
  post: BlogPostType;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  return (
    <article className='group bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300'>
      {/* Image */}
      <div className='relative h-48 sm:h-56 overflow-hidden'>
        <Image
          src={post.cover_image_url}
          alt={`${post.title} - Bark&Lounge blog yazısı`}
          title={post.title}
          fill
          className='object-cover group-hover:scale-110 transition-transform duration-700'
          sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
          placeholder='blur'
          blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxOAPwCdABmX/9k='
        />

        {/* Category Badge */}
        <div className='absolute top-3 left-3 sm:top-4 sm:left-4'>
          <span className='px-2 sm:px-3 py-1 sm:py-1.5 bg-white/95 backdrop-blur-sm text-gray-800 text-xs sm:text-sm font-medium rounded-full shadow-sm'>
            {post.tags?.[0] || 'Genel'}
          </span>
        </div>

        {/* Reading Time */}
        <div className='absolute top-3 right-3 sm:top-4 sm:right-4'>
          <div className='flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 sm:py-1.5 bg-black/70 backdrop-blur-sm text-white rounded-full text-xs sm:text-sm'>
            <Clock className='w-3 h-3 sm:w-3.5 sm:h-3.5' />
            <span className='font-medium'>
              {calculateReadTime(post.content)} dk
            </span>
          </div>
        </div>

        {/* Gradient Overlay */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
      </div>

      {/* Content */}
      <div className='p-4 sm:p-6'>
        {/* Meta Info */}
        <div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 mb-3'>
          <div className='flex items-center gap-1.5'>
            <User className='w-3 h-3 sm:w-4 sm:h-4' />
            <span className='font-medium'>{post.author}</span>
          </div>
          <div className='flex items-center gap-1.5'>
            <Calendar className='w-3 h-3 sm:w-4 sm:h-4' />
            <span>
              {new Date(post.created_at).toLocaleDateString('tr-TR', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>

        {/* Title */}
        <Link
          href={`/blog/${post.slug}`}
          aria-label={`${post.title} blog yazısını oku`}
        >
          <h3 className='text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 line-clamp-2 leading-tight group-hover:text-orange-600 transition-colors duration-200 cursor-pointer hover:text-orange-600'>
            {post.title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className='text-gray-600 mb-4 sm:mb-5 line-clamp-3 leading-relaxed text-xs sm:text-sm'>
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 pt-3 sm:pt-4 border-t border-gray-100'>
          {/* Tags */}
          <div className='flex gap-2'>
            {post.tags?.slice(1, 3).map(tag => (
              <span
                key={tag}
                className='px-2 sm:px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-lg hover:bg-gray-200 transition-colors cursor-pointer'
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Read More */}
          <Link
            href={`/blog/${post.slug}`}
            aria-label={`${post.title} blog yazısını oku`}
            className='inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-600 text-white text-xs sm:text-sm font-semibold rounded-lg hover:from-orange-700 hover:to-amber-700 transform hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md self-start sm:self-auto'
          >
            Oku
            <svg
              className='w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M17 8l4 4m0 0l-4 4m4-4H3'
              />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
};

// BlogHeader Component
interface BlogHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedTag: string | null;
  setSelectedTag: (tag: string | null) => void;
  allTags: string[];
  blogPosts: BlogPostType[];
  hasActiveFilters: boolean;
  clearFilters: () => void;
  filteredPosts: BlogPostType[];
}

const BlogHeader: React.FC<BlogHeaderProps> = ({
  searchTerm,
  setSearchTerm,
  selectedTag,
  setSelectedTag,
  allTags,
  blogPosts,
  hasActiveFilters,
  clearFilters,
  filteredPosts,
}) => {
  return (
    <header className='bg-gradient-to-br from-white via-orange-50/30 to-amber-50/50 backdrop-blur-sm border-b border-orange-100'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8'>
        {/* Header Row */}
        <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6'>
          {/* Brand */}
          <div className='text-center lg:text-left'>
            <div className='mb-2 sm:mb-3'>
              <h1 className='text-2xl sm:text-3xl lg:text-4xl font-black bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 bg-clip-text text-transparent mb-1'>
                Bark&Lounge Blog
              </h1>
              <p className='text-xs sm:text-sm text-amber-700 font-medium'>
                🐾 Hayvan Severlerin Blogu
              </p>
            </div>
          </div>

          {/* Enhanced Search */}
          <div className='flex-1 max-w-sm sm:max-w-md lg:max-w-lg'>
            <div className='relative group'>
              <div className='absolute inset-0 bg-gradient-to-r from-orange-400/20 to-amber-400/20 rounded-xl sm:rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity'></div>
              <div className='relative bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-orange-200 shadow-sm hover:shadow-md transition-all'>
                <div className='flex items-center'>
                  <Search className='absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-orange-500 w-4 h-4 sm:w-5 sm:h-5' />
                  <input
                    type='text'
                    placeholder='Köpek bakımı, eğitim, sağlık... ara 🔍'
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className='w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-2.5 sm:py-3.5 bg-transparent border-0 outline-none text-sm sm:text-base text-gray-800 placeholder-gray-500 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-orange-300 transition-all'
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className='absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 p-1 sm:p-1.5 hover:bg-orange-100 rounded-full transition-colors'
                    >
                      <X className='w-3 h-3 sm:w-4 sm:h-4 text-gray-400' />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Beautiful Filter Section */}
        <div className='mt-6 sm:mt-8'>
          <div className='bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/50 shadow-sm'>
            <div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-4 sm:mb-5'>
              <div className='flex items-center gap-3'>
                <div className='w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg sm:rounded-xl flex items-center justify-center'>
                  <Filter className='w-3 h-3 sm:w-4 sm:h-4 text-white' />
                </div>
                <span className='text-sm sm:text-base font-semibold text-gray-800'>
                  Etiketler & Kategoriler
                </span>
              </div>
              {hasActiveFilters && (
                <div className='flex items-center gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 text-xs font-semibold rounded-full border border-orange-200'>
                  <div className='w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-500 rounded-full animate-pulse'></div>
                  Filtre aktif
                </div>
              )}
            </div>

            <p className='text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4'>
              İlgilendiğiniz konulara göre içerikleri filtreleyin:
            </p>
            <div className='flex flex-wrap gap-2 sm:gap-3'>
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all transform hover:scale-105 border-2 ${
                  selectedTag === null
                    ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-lg border-orange-500'
                    : 'bg-white text-gray-700 hover:bg-orange-50 border-orange-200 hover:border-orange-300'
                }`}
              >
                ✨ Tümü ({blogPosts.length})
              </button>
              {allTags.map(tag => {
                const count = blogPosts.filter(post =>
                  post.tags?.includes(tag)
                ).length;
                return (
                  <button
                    key={tag}
                    onClick={() =>
                      setSelectedTag(selectedTag === tag ? null : tag)
                    }
                    className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all transform hover:scale-105 border-2 ${
                      selectedTag === tag
                        ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-lg border-orange-500'
                        : 'bg-white text-gray-700 hover:bg-orange-50 border-orange-200 hover:border-orange-300'
                    }`}
                  >
                    {tag} ({count})
                  </button>
                );
              })}

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className='px-3 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-red-100 to-pink-100 text-red-700 rounded-lg sm:rounded-xl hover:from-red-200 hover:to-pink-200 transition-all font-semibold border border-red-200 transform hover:scale-105 text-xs sm:text-sm'
                >
                  🗑️ Temizle
                </button>
              )}
            </div>

            {/* Enhanced Results Info */}
            {(hasActiveFilters || filteredPosts.length > 0) && (
              <div className='mt-4 sm:mt-5 pt-4 sm:pt-5 border-t border-gray-200/50'>
                <div className='flex items-center gap-2 text-xs sm:text-sm'>
                  <span className='text-gray-700 font-medium'>
                    <strong className='text-gray-900'>
                      {filteredPosts.length}
                    </strong>{' '}
                    harika içerik bulundu
                    {hasActiveFilters && (
                      <>
                        {searchTerm && (
                          <span className='text-orange-700'>
                            {' '}
                            • &quot;<strong>{searchTerm}</strong>&quot; için
                          </span>
                        )}
                        {selectedTag && (
                          <span className='text-orange-700'>
                            {' '}
                            • <strong>{selectedTag}</strong> kategorisinde
                          </span>
                        )}
                      </>
                    )}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

// BlogSidebar Component
interface BlogSidebarProps {
  blogPosts: BlogPostType[];
  allTags: string[];
}

const BlogSidebar: React.FC<BlogSidebarProps> = ({ blogPosts, allTags }) => {
  return (
    <aside className='space-y-6 sm:space-y-8'>
      {/* Popular Posts */}
      <div className='bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-gray-100 p-4 sm:p-6'>
        <div className='flex items-center gap-2 mb-4 sm:mb-6'>
          <TrendingUp className='w-4 h-4 sm:w-5 sm:h-5 text-orange-600' />
          <h3 className='text-sm sm:text-base font-bold text-gray-900'>
            Popüler Hikayeler
          </h3>
        </div>
        <div className='space-y-3 sm:space-y-4'>
          {blogPosts.slice(0, 4).map((post, index) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              aria-label={`${post.title} blog yazısını oku`}
              className='group block'
            >
              <div className='flex gap-3 sm:gap-4'>
                <div className='relative w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 flex-shrink-0'>
                  <Image
                    src={post.cover_image_url}
                    alt={`${post.title} - Bark&Lounge blog yazısı`}
                    title={post.title}
                    fill
                    className='object-cover rounded-lg sm:rounded-xl'
                    sizes='(max-width: 640px) 48px, (max-width: 1024px) 56px, 64px'
                  />
                  <div className='absolute -top-0.5 -left-0.5 sm:-top-1 sm:-left-1 w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold rounded-full flex items-center justify-center'>
                    {index + 1}
                  </div>
                </div>
                <div className='flex-1 min-w-0'>
                  <h4 className='text-xs sm:text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-orange-600 transition-colors leading-tight'>
                    {post.title}
                  </h4>
                  <div className='flex items-center gap-2 mt-1 sm:mt-2 text-xs text-gray-500'>
                    <Calendar className='w-3 h-3' />
                    {new Date(post.created_at).toLocaleDateString('tr-TR', {
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

      {/* Newsletter */}
      <div className='relative overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-br from-orange-600 via-amber-600 to-yellow-600 rounded-3xl'></div>
        <div className='relative bg-black/10 rounded-3xl p-8 text-white'>
          <div className='text-center mb-6'>
            <div className='w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mx-auto mb-4 flex items-center justify-center'>
              <Heart className='w-8 h-8 text-white' />
            </div>
            <h3 className='text-xl font-bold mb-2'>Pet Dünyasından Haberler</h3>
            <p className='text-white/90 text-sm'>
              Dostlarınız için en güncel bakım ipuçları ve özel içerikler
            </p>
          </div>
          <div className='space-y-4'>
            <input
              type='email'
              placeholder='E-posta adresin'
              className='w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-white/50 backdrop-blur-sm'
            />
            <button className='w-full px-4 py-3 bg-white text-orange-600 font-bold rounded-xl hover:bg-orange-50 hover:scale-105 hover:shadow-lg transition-all duration-300 transform active:scale-95'>
              💌 Abone Ol
            </button>
          </div>
        </div>
      </div>

      {/* Fun Stats */}
      <div className='bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-gray-100 p-4 sm:p-6'>
        <h3 className='text-sm sm:text-base font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2'>
          <Sparkles className='w-4 h-4 sm:w-5 sm:h-5 text-orange-600' />
          Eğlenceli İstatistikler
        </h3>
        <div className='space-y-3 sm:space-y-4'>
          <div className='flex items-center justify-between p-2.5 sm:p-3 bg-orange-50 rounded-lg sm:rounded-xl'>
            <span className='text-xs sm:text-sm text-gray-700 font-medium'>
              🐕 Toplam Hikaye
            </span>
            <span className='text-lg sm:text-xl lg:text-2xl font-bold text-orange-600'>
              {blogPosts.length}
            </span>
          </div>
          <div className='flex items-center justify-between p-2.5 sm:p-3 bg-amber-50 rounded-lg sm:rounded-xl'>
            <span className='text-xs sm:text-sm text-gray-700 font-medium'>
              📚 Kategori
            </span>
            <span className='text-lg sm:text-xl lg:text-2xl font-bold text-amber-600'>
              {allTags.length}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};

// FeaturedPost Component
interface FeaturedPostProps {
  post: BlogPostType;
}

const FeaturedPost: React.FC<FeaturedPostProps> = ({ post }) => {
  return (
    <div className='relative group'>
      <div className='absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-400 rounded-2xl sm:rounded-3xl blur-lg opacity-25 group-hover:opacity-40 transition-opacity'></div>
      <div className='relative bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-white/50 overflow-hidden'>
        <div className='flex flex-col lg:flex-row'>
          {/* Content Section */}
          <div className='flex-1 p-4 sm:p-6 md:p-8 lg:p-10'>
            <div className='flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6'>
              <div className='w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center'>
                <BookOpen className='w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white' />
              </div>
              <span className='px-2 sm:px-3 py-1 bg-orange-100 text-orange-700 text-xs sm:text-sm font-semibold rounded-full'>
                Öne Çıkan Hikaye
              </span>
            </div>

            <Link
              href={`/blog/${post.slug}`}
              aria-label={`${post.title} blog yazısını oku`}
            >
              <h2 className='text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight cursor-pointer hover:text-orange-600 transition-colors duration-200'>
                {post.title}
              </h2>
            </Link>
            <p className='text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base md:text-lg leading-relaxed'>
              {post.excerpt}
            </p>

            {/* Meta Info */}
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4'>
              <div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-gray-500 text-xs sm:text-sm'>
                <div className='flex items-center gap-2'>
                  <User className='w-3 h-3 sm:w-4 sm:h-4' />
                  <span className='font-medium'>{post.author}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Calendar className='w-3 h-3 sm:w-4 sm:h-4' />
                  <span>
                    {new Date(post.created_at).toLocaleDateString('tr-TR', {
                      day: 'numeric',
                      month: 'long',
                    })}
                  </span>
                </div>
              </div>

              <Link
                href={`/blog/${post.slug}`}
                aria-label={`${post.title} blog yazısını oku`}
                className='inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all transform hover:scale-105 shadow-lg'
              >
                Hikayeyi Oku
                <BookOpen className='w-3 h-3 sm:w-4 sm:h-4' />
              </Link>
            </div>
          </div>

          {/* Image Section */}
          <div className='relative h-48 sm:h-56 md:h-64 lg:h-auto lg:w-96 flex-shrink-0'>
            <Image
              src={post.cover_image_url}
              alt={`${post.title} - Bark&Lounge blog yazısı`}
              title={post.title}
              fill
              className='object-cover'
              sizes='(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 384px'
              priority
            />
            <div className='absolute inset-0 bg-gradient-to-t from-orange-600/20 via-transparent to-transparent'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// PostsGrid Component
interface PostsGridProps {
  filteredPosts: BlogPostType[];
  hasActiveFilters: boolean;
  hasFeaturedPost: boolean;
  clearFilters: () => void;
}

const PostsGrid: React.FC<PostsGridProps> = ({
  filteredPosts,
  hasActiveFilters,
  hasFeaturedPost,
  clearFilters,
}) => {
  // Eğer featured post varsa ve filtre aktif değilse, ilk postu atla
  // Çünkü o zaten featured olarak gösteriliyor
  const postsToShow = hasActiveFilters
    ? filteredPosts
    : hasFeaturedPost
    ? filteredPosts.slice(1)
    : filteredPosts;

  return (
    <div>
      <div className='flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8'>
        <div className='w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg flex items-center justify-center'>
          <Heart className='w-3 h-3 sm:w-5 sm:h-5 text-white' />
        </div>
        <h3 className='text-lg sm:text-xl lg:text-2xl font-bold text-gray-900'>
          {hasActiveFilters ? 'Arama Sonuçları' : 'Tüm Hikayeler'}
        </h3>
      </div>

      {postsToShow.length > 0 ? (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8'>
          {postsToShow.map(post => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className='bg-white rounded-2xl sm:rounded-3xl border border-gray-200 p-8 sm:p-12 lg:p-16 text-center'>
          <div className='w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-orange-100 rounded-full mx-auto mb-4 sm:mb-6 flex items-center justify-center'>
            <Search className='w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-orange-500' />
          </div>
          <h3 className='text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3'>
            Aradığın hikaye bulunamadı
          </h3>
          <p className='text-sm sm:text-base text-gray-600 mb-4 sm:mb-6'>
            Farklı anahtar kelimeler veya kategoriler deneyin
          </p>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className='px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm sm:text-base rounded-lg sm:rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all transform hover:scale-105 font-semibold'
            >
              Tüm Hikayeleri Göster
            </button>
          )}
        </div>
      )}
    </div>
  );
};

// Export main component and sub-components
export { BlogCard, BlogHeader, BlogSidebar, FeaturedPost, PostsGrid };
