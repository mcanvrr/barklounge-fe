import {
  AppSettingsService,
  BlogPostsService,
  CustomerReviewsService,
  GalleryService,
  ServicesService,
  SliderService,
} from '@/lib/api';
import { Metadata } from 'next';
import React from 'react';
import HomeClient from './HomeClient';

// ISR: Regenerate every 10 minutes for fresh content
export const revalidate = 600; // 10 minutes

// SSR: Dynamic rendering için (her request'te yeni data)
// export const dynamic = 'force-dynamic';

// SSG: Generate metadata for home page (Server-side)
export async function generateMetadata(): Promise<Metadata> {
  try {
    // SEO settings'i server-side çek
    const seoSettings = await AppSettingsService.getSeoSettings();

    return {
      title:
        seoSettings?.title ||
        'Bark & Lounge - Pet Kuaför, Kreş ve Otel | Evcil Hayvan Bakım Merkezi',
      description:
        seoSettings?.description ||
        'Bark Lounge ailesi olarak evcil dostlarınıza konfor ve mutluluk sunuyoruz. Modern, hijyenik ortamda pet kuaför, bakım ve konaklama hizmetleri veriyoruz. Köpek ve kedi bakımı, eğitimi, pet hotel hizmetleri.',
      keywords:
        seoSettings?.keywords ||
        'pet kuaför, köpek kuaförü, kedi bakımı, pet hotel, evcil hayvan oteli, pet kreş, köpek eğitimi, pet bakım merkezi, Bark&Lounge',
      openGraph: {
        title:
          seoSettings?.og_title || 'Bark & Lounge - Pet Kuaför, Kreş ve Otel',
        description:
          seoSettings?.og_description ||
          'Evcil dostlarınıza konfor ve mutluluk sunuyoruz. Modern, hijyenik ortamda pet kuaför, bakım ve konaklama hizmetleri.',
        type: 'website',
        images: [
          {
            url: seoSettings?.og_image_url || '/images/home-og.jpg',
            width: 1200,
            height: 630,
            alt: 'Bark&Lounge Pet Bakım Merkezi',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title:
          seoSettings?.og_title || 'Bark & Lounge - Pet Kuaför, Kreş ve Otel',
        description:
          seoSettings?.og_description ||
          'Evcil dostlarınıza konfor ve mutluluk sunuyoruz. Modern, hijyenik ortamda pet kuaför, bakım ve konaklama hizmetleri.',
        images: [seoSettings?.og_image_url || '/images/home-og.jpg'],
      },
    };
  } catch (error) {
    console.error('SEO metadata alınamadı:', error);
    // Fallback metadata
    return {
      title:
        'Bark & Lounge - Pet Kuaför, Kreş ve Otel | Evcil Hayvan Bakım Merkezi',
      description:
        'Bark Lounge ailesi olarak evcil dostlarınıza konfor ve mutluluk sunuyoruz. Modern, hijyenik ortamda pet kuaför, bakım ve konaklama hizmetleri veriyoruz.',
    };
  }
}

// Server Component - Verileri server-side çek ve TAMAMEN HAZIR render et
const Home: React.FC = async () => {
  // SSR: Tüm veriler server'da paralel olarak çekiliyor
  // Sayfa ancak tüm veriler hazır olduğunda render edilecek
  console.log('🔄 SSR: Veriler çekiliyor...');

  try {
    // Paralel olarak TÜM verileri çek - Sayfa ancak bunlar hazır olunca render olur
    const [
      appSettings,
      about,
      aboutContent,
      seoSettings,
      servicesSection,
      slides,
      services,
      gallery,
      reviews,
      reviewStats,
      blogPosts,
      blogTags,
    ] = await Promise.all([
      AppSettingsService.getAppSettings(),
      AppSettingsService.getAbout(),
      AppSettingsService.getAboutContent(),
      AppSettingsService.getSeoSettings(),
      AppSettingsService.getServicesSection(),
      SliderService.getActiveSlides(),
      ServicesService.getActiveServices(),
      GalleryService.getActiveGalleryImages(),
      CustomerReviewsService.getActiveReviews(),
      CustomerReviewsService.getReviewStats(),
      BlogPostsService.getFeaturedPosts(),
      AppSettingsService.getActiveBlogTags(),
    ]);

    const initialData = {
      appSettings,
      about,
      aboutContent,
      seoSettings,
      servicesSection,
      slides,
      services,
      gallery,
      reviews,
      reviewStats,
      blogPosts,
      blogTags,
    };

    console.log('✅ SSR: Tüm veriler hazır, sayfa render ediliyor');
    console.log('📊 SSR Data:', {
      slides: slides.length,
      services: services.length,
      gallery: gallery.length,
      reviews: reviews.length,
    });

    return (
      <>
        {/* Tüm veriler hazır - Loading yok! */}
        <HomeClient initialData={initialData} />
        {/* Initial data script for hydration */}
        <script
          id='__NEXT_DATA_SSR__'
          type='application/json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(initialData),
          }}
        />
      </>
    );
  } catch (error) {
    console.error('❌ SSR: Kritik veri çekme hatası:', error);

    // Fallback: Veriler çekilemezse hata sayfası göster
    return (
      <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50'>
        <div className='text-center p-8 bg-white rounded-2xl shadow-xl max-w-md'>
          <div className='text-6xl mb-4'>⚠️</div>
          <h2 className='text-2xl font-bold text-gray-900 mb-2'>
            Veriler Yüklenemedi
          </h2>
          <p className='text-gray-600 mb-6'>
            Sayfa verileri sunucudan alınamadı. Lütfen daha sonra tekrar
            deneyin.
          </p>
          <button
            onClick={() => window.location.reload()}
            className='px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors'
          >
            Sayfayı Yenile
          </button>
        </div>
      </div>
    );
  }
};

export default Home;
