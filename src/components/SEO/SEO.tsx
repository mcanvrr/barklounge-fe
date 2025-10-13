'use client';

import type { AppSettings, SeoSettings } from '@/lib/api/services/appSettings';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchSeoSettings } from '@/store/slices/appSettingsSlice';
import React, { useEffect } from 'react';

// Simplified StructuredData Component
interface StructuredDataProps {
  data: Record<string, unknown>;
  id?: string;
}

const StructuredData: React.FC<StructuredDataProps> = ({ data, id }) => {
  // Ensure @context is set
  const jsonLd = {
    '@context': 'https://schema.org',
    ...data,
  };

  return (
    <script
      id={id}
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

// Simplified Blog Post interface for Bark Lounge
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  created_at: string;
  cover_image_url: string;
  tags?: string[];
}

// Simplified BlogStructuredData Component for Bark Lounge
interface BlogStructuredDataProps {
  post: BlogPost;
}

const BlogStructuredData: React.FC<BlogStructuredDataProps> = ({ post }) => {
  const structuredData = {
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.cover_image_url,
    author: {
      '@type': 'Organization',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Bark & Lounge',
      logo: 'https://api.barkloungetr.com/uploads/images/seo/1760384769339-alo5x6i5ivg.png',
    },
    datePublished: post.created_at,
    dateModified: post.created_at,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://barkloungetr.com/blog/${post.slug}`,
    },
    url: `https://barkloungetr.com/blog/${post.slug}`,
    keywords: post.tags?.join(', ') || '',
    articleSection: 'Pet Bakım',
    wordCount: post.content.split(/\s+/).length,
    inLanguage: 'tr-TR',
  };

  return <StructuredData data={structuredData} id='blog-post' />;
};

// HomeStructuredData Component for Bark & Lounge
const HomeStructuredData = ({
  appSettings: ssrAppSettings,
  seoSettings: ssrSeoSettings,
}: {
  appSettings?: AppSettings | null;
  seoSettings?: SeoSettings | null;
}) => {
  const dispatch = useAppDispatch();
  const { settings: reduxAppSettings, seoSettings: reduxSeoSettings } =
    useAppSelector(state => state.appSettings);

  const appSettings = ssrAppSettings || reduxAppSettings;
  const seoSettings = ssrSeoSettings || reduxSeoSettings;

  useEffect(() => {
    if (!ssrSeoSettings && !reduxSeoSettings) {
      dispatch(fetchSeoSettings());
    }
  }, [dispatch, ssrSeoSettings, reduxSeoSettings]);

  const structuredData = {
    '@type': 'LocalBusiness',
    '@id': 'https://barkloungetr.com',
    name: 'Bark & Lounge',
    description:
      seoSettings?.description ||
      'Bark Lounge ailesi olarak evcil dostlarınıza konfor ve mutluluk sunuyoruz. Modern, hijyenik ortamda pet kuaför, bakım ve konaklama hizmetleri veriyoruz.',
    url: 'https://barkloungetr.com',
    telephone: appSettings?.phone_number || '+90 546 246 9237',
    email: appSettings?.email_address || 'barkloungetr@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress:
        appSettings?.location ||
        'Bahçelievler Mahallesi Ali Rıza Kuzucan Sk. No:50/B',
      addressLocality: 'Bahçelievler',
      addressRegion: 'İstanbul',
      postalCode: '34180',
      addressCountry: 'TR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 41.0766,
      longitude: 29.0233,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '10:00:00',
        closes: '19:00:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '10:00:00',
        closes: '19:00:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Sunday'],
        opens: '00:00:00',
        closes: '00:00:00',
      },
    ],
    paymentAccepted: 'Cash, Credit Card, Bank Transfer',
    currenciesAccepted: 'TRY',
    image:
      seoSettings?.og_image_url ||
      'https://api.barkloungetr.com/uploads/images/seo/1760384769339-alo5x6i5ivg.png',
    logo:
      seoSettings?.og_image_url ||
      'https://api.barkloungetr.com/uploads/images/seo/1760384769339-alo5x6i5ivg.png',
    sameAs: [
      appSettings?.facebook_url,
      appSettings?.instagram_url,
      appSettings?.tiktok_url,
    ].filter(Boolean),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Pet Bakım Hizmetleri',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Pet Kuaför',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Pet Hotel',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Pet Kreş',
          },
        },
      ],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: 4.8,
      reviewCount: 66,
      bestRating: 5,
      worstRating: 1,
    },
    knowsAbout: ['Evcil Hayvan Bakımı', 'Pet Otel', 'Pet Kreş', 'Pet Kuaför'],
  };

  return <StructuredData data={structuredData} id='local-business' />;
};

// Export components
export { BlogStructuredData, HomeStructuredData, StructuredData };

// Export types
export type { BlogPost };
