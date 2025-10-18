'use client';

import { CustomerReview } from '@/lib/api';
import type { AppSettings } from '@/lib/api/services/appSettings';
import type { ReviewStats } from '@/lib/api/services/customerReviews';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchReviews, fetchReviewStats } from '@/store/slices/reviewsSlice';
import { MapPin, Quote, Star } from 'lucide-react';
import { useEffect } from 'react';

// Tarihi "X zaman önce" formatında göstermek için yardımcı fonksiyon
const getRelativeTime = (dateString: string): string => {
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'Az önce';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} dakika önce`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} saat önce`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} gün önce`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks} hafta önce`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} ay önce`;
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears} yıl önce`;
};

export default function GoogleReviewsSection({
  reviews: ssrReviews,
  reviewStats: ssrReviewStats,
  appSettings: ssrAppSettings,
}: {
  reviews?: CustomerReview[];
  reviewStats?: ReviewStats | null;
  appSettings?: AppSettings | null;
}) {
  const dispatch = useAppDispatch();
  const {
    reviews: reduxReviews,
    reviewStats: reduxReviewStats,
    loading,
    error,
  } = useAppSelector(state => state.reviews);
  const { settings: reduxAppSettings } = useAppSelector(
    state => state.appSettings
  );

  const reviews = ssrReviews || reduxReviews;
  const reviewStats = ssrReviewStats || reduxReviewStats;
  const appSettings = ssrAppSettings || reduxAppSettings;

  useEffect(() => {
    if (!ssrReviews && reduxReviews.length === 0) {
      dispatch(fetchReviews());
    }
    if (!ssrReviewStats && !reduxReviewStats) {
      dispatch(fetchReviewStats());
    }
  }, [
    dispatch,
    ssrReviews,
    reduxReviews.length,
    ssrReviewStats,
    reduxReviewStats,
  ]);

  const overallRating = Number(reviewStats?.average_rating) || 4.9;
  const totalReviews = Number(reviewStats?.total_reviews) || 127;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index: number) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section
      id='yorumlar'
      className='relative w-full bg-gradient-to-br from-orange-50/40 via-navy-50/30 to-pink-50/20 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden'
    >
      {/* Background Elements */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute -top-16 sm:-top-24 lg:-top-32 -right-16 sm:-right-24 lg:-right-32 w-40 sm:w-60 lg:w-80 h-40 sm:h-60 lg:h-80 bg-gradient-to-br from-navy-200/20 to-navy-400/10 rounded-full blur-3xl'></div>
        <div className='absolute -bottom-16 sm:-bottom-24 lg:-bottom-32 -left-16 sm:-left-24 lg:-left-32 w-40 sm:w-60 lg:w-80 h-40 sm:h-60 lg:h-80 bg-gradient-to-br from-orange-200/20 to-orange-400/10 rounded-full blur-3xl'></div>
      </div>

      <div className='container mx-auto relative z-10 px-4 sm:px-6 lg:px-8'>
        {/* Header Section */}
        <div className='text-center mb-12 sm:mb-16 lg:mb-20'>
          <div className='inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-navy-50 to-orange-50 text-navy-700 px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 rounded-full text-xs sm:text-sm font-semibold shadow-xl border-2 border-white mb-6 sm:mb-8'>
            <span>💬</span>
            <span>Müşteri Yorumları</span>
          </div>

          <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-navy-900 via-navy-700 to-navy-900 bg-clip-text text-transparent mb-6 sm:mb-8 leading-tight'>
            Müşteri Deneyimleri
          </h2>

          <div className='w-16 sm:w-20 lg:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-navy-400 via-orange-400 to-navy-400 rounded-full mx-auto mb-8 sm:mb-10'></div>

          {/* Overall Rating */}
          <div className='flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8'>
            <div className='text-center'>
              <div className='text-4xl sm:text-5xl lg:text-6xl font-bold text-navy-900 mb-1 sm:mb-2'>
                {overallRating.toFixed(1)}
              </div>
              <div className='flex justify-center gap-1 mb-1 sm:mb-2'>
                {renderStars(5)}
              </div>
              <div className='text-sm sm:text-base text-gray-600 font-medium'>
                {totalReviews}+ mutlu müşteri
              </div>
            </div>

            <div className='w-px h-12 sm:h-16 lg:h-20 bg-gray-300 hidden sm:block'></div>
            <div className='w-12 sm:w-16 lg:w-20 h-px bg-gray-300 sm:hidden'></div>

            <div className='text-center'>
              <div className='flex items-center gap-1 sm:gap-2 text-lg sm:text-xl lg:text-2xl font-bold text-navy-900 mb-1 sm:mb-2'>
                <span>🐾</span>
                <span>Bark&Lounge</span>
              </div>
              <div className='flex items-center gap-1 text-xs sm:text-sm text-gray-600'>
                <MapPin className='w-3 h-3 sm:w-4 sm:h-4' />
                <span>İstanbul, Türkiye</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        {loading ? (
          <div className='flex justify-center items-center py-12'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-navy-600'></div>
          </div>
        ) : error ? (
          <div className='text-center py-12'>
            <p className='text-red-600 mb-4'>
              Yorumlar yüklenirken bir hata oluştu.
            </p>
            <button
              onClick={() => {
                dispatch(fetchReviews());
                dispatch(fetchReviewStats());
              }}
              className='px-4 py-2 bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition-colors'
            >
              Tekrar Dene
            </button>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8'>
            {reviews.map((review: CustomerReview, index: number) => (
              <div
                key={review.id}
                className='bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl border border-white/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative overflow-hidden group'
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Quote Icon */}
                <div className='absolute top-4 sm:top-6 right-4 sm:right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-300'>
                  <Quote className='w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-navy-600' />
                </div>

                {/* User Info */}
                <div className='flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6'>
                  <div className='w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-navy-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base lg:text-lg shadow-md'>
                    {review.avatar
                      ? review.avatar
                      : review.name
                          .split(' ')
                          .map((n: string) => n[0])
                          .join('')
                          .toUpperCase()}
                  </div>
                  <div className='flex-1'>
                    <h4 className='font-bold text-navy-900 text-base sm:text-lg'>
                      {review.name}
                    </h4>
                    <div className='flex items-center gap-2'>
                      <div className='flex gap-1'>
                        {renderStars(review.rating)}
                      </div>
                      <span className='text-xs sm:text-sm text-gray-500'>
                        • {getRelativeTime(review.review_date)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Review Text */}
                <p className='text-gray-700 leading-relaxed text-xs sm:text-sm lg:text-base mb-4 sm:mb-6'>
                  &ldquo;{review.text}&rdquo;
                </p>

                {/* Verified Badge */}
                <div className='flex items-center gap-2'>
                  <div className='flex items-center gap-1 bg-green-50 px-2 sm:px-3 py-1 rounded-full text-xs font-medium text-green-700'>
                    <span className='text-xs sm:text-sm'>✅</span>
                    <span>Doğrulanmış müşteri</span>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className='absolute bottom-3 sm:bottom-4 right-3 sm:right-4 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-orange-300 rounded-full opacity-0 group-hover:opacity-60 animate-pulse transition-opacity duration-300'></div>
                <div className='absolute top-1/2 left-3 sm:left-4 w-1 sm:w-1.5 h-1 sm:h-1.5 bg-navy-300 rounded-full opacity-0 group-hover:opacity-50 animate-ping transition-opacity duration-300'></div>
              </div>
            ))}
          </div>
        )}

        {/* CTA Section */}
        <div className='text-center mt-12 sm:mt-16 lg:mt-20'>
          <div className='bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 shadow-xl border border-white/50 max-w-2xl mx-auto'>
            <h3 className='text-xl sm:text-2xl lg:text-3xl font-bold text-navy-900 mb-3 sm:mb-4'>
              Siz de Deneyiminizi Paylaşın
            </h3>
            <p className='text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 leading-relaxed'>
              Bark&Lounge hizmetlerimizden memnun kaldıysanız, deneyiminizi
              paylaşarak diğer pet sahiplerine yardımcı olabilirsiniz.
            </p>

            <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center'>
              <a
                href='https://share.google/lpi8lziWR2qrTXyhe'
                target='_blank'
                rel='nofollow noopener noreferrer'
                title='Google üzerinden yorum bırakın'
                aria-label='Yorum Bırak'
                className='bg-gradient-to-r from-navy-600 to-navy-700 hover:from-navy-700 hover:to-navy-800 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-sm sm:text-base font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2'
              >
                <span>💬</span>
                <span>Yorum Bırak</span>
              </a>

              <a
                href={`tel:${appSettings?.phone_number || '#'}`}
                target='_blank'
                rel='noopener noreferrer'
                title={`${
                  appSettings?.phone_number || 'Telefon'
                } numarasını arayın`}
                aria-label='Bizi Arayın'
                className='bg-white border-2 border-navy-200 text-navy-600 hover:bg-navy-50 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-sm sm:text-base font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2'
              >
                <span>📞</span>
                <span>Bizi Arayın</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
