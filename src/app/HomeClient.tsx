'use client';

import { useAppDispatch } from '@/store/hooks';
import React, { useEffect } from 'react';
import { HomeSlider, SEO } from '../components';
import AboutSection from '../components/AboutSection/AboutSection';
import AboutUsSection from '../components/AboutUsSection/AboutUsSection';
import ContactFormSection from '../components/ContactFormSection/ContactFormSection';
import Gallery from '../components/Gallery';
import GoogleReviewsSection from '../components/GoogleReviewsSection/GoogleReviewsSection';
import ServicesSectionComponent from '../components/ServicesSection/ServicesSection';

// Import API types
import type {
  About,
  AboutContent,
  AppSettings,
  BlogTag,
  SeoSettings,
  ServicesSection as ServicesSectionType,
} from '@/lib/api/services/appSettings';
import type { BlogPost } from '@/lib/api/services/blogPosts';
import type {
  CustomerReview,
  ReviewStats,
} from '@/lib/api/services/customerReviews';
import type { GalleryItem } from '@/lib/api/services/gallery';
import type { ServiceItem } from '@/lib/api/services/services';
import type { SliderItem } from '@/lib/api/services/slider';

// Type for SSR initial data
interface InitialData {
  appSettings: AppSettings | null;
  about: About | null;
  aboutContent: AboutContent | null;
  seoSettings: SeoSettings | null;
  servicesSection: ServicesSectionType | null;
  slides: SliderItem[];
  services: ServiceItem[];
  gallery: GalleryItem[];
  reviews: CustomerReview[];
  reviewStats: ReviewStats | null;
  blogPosts: BlogPost[];
  blogTags: BlogTag[];
}

interface HomeClientProps {
  initialData: InitialData;
}

// Client component - Server'dan gelen verilerle render et
const HomeClient: React.FC<HomeClientProps> = ({ initialData }) => {
  const dispatch = useAppDispatch();

  // Initial data'yı Redux store'a koy (hydration için)
  useEffect(() => {
    if (initialData) {
      // Her slice için initial data'yı dispatch et
      // Bu sayede client-side navigation'da da veriler hazır olur
      dispatch({
        type: 'appSettings/setInitialData',
        payload: {
          settings: initialData.appSettings,
          seoSettings: initialData.seoSettings,
          servicesSection: initialData.servicesSection,
          blogTags: initialData.blogTags,
        },
      });

      dispatch({
        type: 'about/setInitialData',
        payload: {
          about: initialData.about,
          aboutContent: initialData.aboutContent,
        },
      });

      dispatch({
        type: 'slider/setInitialData',
        payload: initialData.slides,
      });

      dispatch({
        type: 'services/setInitialData',
        payload: initialData.services,
      });

      dispatch({
        type: 'gallery/setInitialData',
        payload: initialData.gallery,
      });

      dispatch({
        type: 'reviews/setInitialData',
        payload: {
          reviews: initialData.reviews,
          reviewStats: initialData.reviewStats,
        },
      });

      dispatch({
        type: 'blog/setInitialData',
        payload: {
          featuredPosts: initialData.blogPosts,
        },
      });
    }
  }, [initialData, dispatch]);

  return (
    <>
      <SEO.HomeStructuredData
        appSettings={initialData.appSettings}
        seoSettings={initialData.seoSettings}
      />
      <div className='pt-20 sm:pt-36'>
        {/* Tüm componentler SSR verileriyle render edildi */}
        <HomeSlider.default slides={initialData.slides} />
        <AboutSection
          aboutContent={initialData.aboutContent}
          appSettings={initialData.appSettings}
        />
        <ServicesSectionComponent
          services={initialData.services}
          about={initialData.about}
          reviewStats={initialData.reviewStats}
          appSettings={initialData.appSettings}
        />
        <Gallery images={initialData.gallery} />
        <AboutUsSection about={initialData.about} />
        <GoogleReviewsSection
          reviews={initialData.reviews}
          reviewStats={initialData.reviewStats}
          appSettings={initialData.appSettings}
        />
        <ContactFormSection appSettings={initialData.appSettings} />
      </div>
    </>
  );
};

export default HomeClient;
