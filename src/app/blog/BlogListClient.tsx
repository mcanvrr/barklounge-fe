'use client';

import { Blog } from '@/components';
import type { BlogPost, BlogTag } from '@/lib/api';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchBlogTags,
  setInitialBlogTags,
} from '@/store/slices/appSettingsSlice';
import {
  fetchFeaturedPosts,
  fetchPublishedPosts,
  setInitialData as setInitialBlogData,
} from '@/store/slices/blogSlice';
import React, { useEffect, useMemo, useState } from 'react';

interface BlogListClientProps {
  initialData?: {
    posts: BlogPost[];
    featuredPosts: BlogPost[];
    blogTags: BlogTag[];
  } | null;
}

const BlogListClient: React.FC<BlogListClientProps> = ({ initialData }) => {
  const dispatch = useAppDispatch();
  const {
    posts: blogPosts,
    featuredPosts,
    loading,
    error,
  } = useAppSelector(state => state.blog);

  const { blogTags } = useAppSelector(state => state.appSettings);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    // SSR verisi varsa Redux store'u hydrate et
    if (initialData) {
      dispatch(
        setInitialBlogData({
          posts: initialData.posts,
          featuredPosts: initialData.featuredPosts,
        })
      );
      dispatch(setInitialBlogTags(initialData.blogTags));
    } else {
      // SSR verisi yoksa client-side'da fetch et
      dispatch(fetchPublishedPosts());
      dispatch(fetchFeaturedPosts());
      dispatch(fetchBlogTags());
    }
  }, [dispatch, initialData]);

  // Blog etiketlerini kullan
  const allTags = Array.isArray(blogTags) ? blogTags.map(tag => tag.name) : [];

  const filteredPosts = useMemo(() => {
    // blogPosts array olduğundan emin ol
    let filtered = Array.isArray(blogPosts) ? blogPosts : [];

    if (searchTerm) {
      filtered = filtered.filter(
        post =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (post.tags &&
            post.tags.some(tag =>
              tag.toLowerCase().includes(searchTerm.toLowerCase())
            )) ||
          post.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedTag) {
      filtered = filtered.filter(
        post => post.tags && post.tags.includes(selectedTag)
      );
    }

    // Redux state'ten gelen array immutable olduğu için kopyasını oluştur
    return [...filtered].sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }, [blogPosts, searchTerm, selectedTag]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTag(null);
  };

  const hasActiveFilters = Boolean(searchTerm || selectedTag);
  const featuredPost =
    Array.isArray(featuredPosts) && featuredPosts.length > 0
      ? featuredPosts[0]
      : null;

  // SSR verisi varsa loading gösterme
  if (loading && !initialData) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 pt-20 sm:pt-40 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4'></div>
          <p className='text-gray-600'>Blog yazıları yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 pt-20 sm:pt-40 flex items-center justify-center'>
        <div className='text-center'>
          <p className='text-red-600 mb-4'>
            Blog yazıları yüklenirken bir hata oluştu.
          </p>
          <button
            onClick={() => {
              dispatch(fetchPublishedPosts());
              dispatch(fetchFeaturedPosts());
            }}
            className='px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors'
          >
            Tekrar Dene
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 pt-20 sm:pt-40'>
      <Blog.BlogHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        allTags={allTags}
        blogPosts={Array.isArray(blogPosts) ? blogPosts : []}
        hasActiveFilters={hasActiveFilters}
        clearFilters={clearFilters}
        filteredPosts={filteredPosts}
      />

      <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-5'>
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8'>
          {/* Main Content */}
          <main className='lg:col-span-3 space-y-6 sm:space-y-8 lg:space-y-10'>
            {/* Featured Article */}
            {!hasActiveFilters && featuredPost && (
              <Blog.FeaturedPost post={featuredPost} />
            )}

            {/* Posts Grid */}
            <Blog.PostsGrid
              filteredPosts={filteredPosts}
              hasActiveFilters={hasActiveFilters}
              hasFeaturedPost={!hasActiveFilters && featuredPost !== null}
              clearFilters={clearFilters}
            />
          </main>

          {/* Sidebar */}
          <aside className='lg:col-span-1'>
            <Blog.BlogSidebar
              blogPosts={Array.isArray(blogPosts) ? blogPosts : []}
              allTags={allTags}
            />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BlogListClient;
