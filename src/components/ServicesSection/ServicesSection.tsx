'use client';

import { Section } from '@/components/ui';
import { ServiceItem } from '@/lib/api';
import type { About } from '@/lib/api/services/appSettings';
import type { ReviewStats } from '@/lib/api/services/customerReviews';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchAbout } from '@/store/slices/aboutSlice';
import { fetchServicesSection } from '@/store/slices/appSettingsSlice';
import { fetchReviewStats } from '@/store/slices/reviewsSlice';
import { fetchServices } from '@/store/slices/servicesSlice';
import { Pet } from '@/types';
import { Cat, Dog, GraduationCap, Heart, Scissors } from 'lucide-react';
import React, { useEffect } from 'react';

// BackgroundElements Component
const BackgroundElements: React.FC = () => {
  return (
    <div className='absolute inset-0 overflow-hidden'>
      <div className='absolute -top-32 -right-32 w-80 h-80 bg-gradient-to-br from-navy-300/30 to-navy-500/20 rounded-full blur-3xl animate-pulse'></div>
      <div
        className='absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-br from-orange-300/30 to-orange-500/20 rounded-full blur-3xl animate-pulse'
        style={{ animationDelay: '2s' }}
      ></div>
      <div
        className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-pink-200/20 to-purple-300/15 rounded-full blur-2xl animate-pulse'
        style={{ animationDelay: '4s' }}
      ></div>
      <div
        className='absolute top-20 right-20 w-3 h-3 bg-orange-400/60 rounded-full animate-bounce'
        style={{ animationDelay: '1s' }}
      ></div>
      <div
        className='absolute bottom-32 left-32 w-2 h-2 bg-navy-400/60 rounded-full animate-bounce'
        style={{ animationDelay: '3s' }}
      ></div>
      <div
        className='absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-pink-400/60 rounded-full animate-bounce'
        style={{ animationDelay: '5s' }}
      ></div>
    </div>
  );
};

// ServicesHeader Component
const ServicesHeader: React.FC = () => {
  const dispatch = useAppDispatch();
  const { servicesSection, loading } = useAppSelector(
    state => state.appSettings
  );

  useEffect(() => {
    if (!servicesSection) {
      dispatch(fetchServicesSection());
    }
  }, [dispatch, servicesSection]);

  return (
    <div className='text-center mb-12 sm:mb-16 lg:mb-20 xl:mb-24 px-4 sm:px-6 lg:px-8'>
      <div className='inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-navy-50 to-orange-50 text-navy-700 px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 rounded-full text-xs sm:text-sm font-semibold mb-6 sm:mb-8 shadow-xl border-2 border-white hover:scale-105 transition-all duration-300'>
        <span>🐾 Hizmetlerimiz</span>
      </div>
      <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-navy-900 via-navy-700 to-navy-900 bg-clip-text text-transparent mb-6 sm:mb-8 leading-tight'>
        {loading
          ? 'Yükleniyor...'
          : servicesSection?.heading || 'Neler Yapıyoruz?'}
      </h2>
      <div className='w-16 sm:w-20 lg:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-navy-400 via-orange-400 to-navy-400 rounded-full mx-auto mb-6 sm:mb-8 lg:mb-10'></div>
      {loading ? (
        <div className='flex justify-center'>
          <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-navy-600'></div>
        </div>
      ) : (
        <p className='text-base sm:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium'>
          {servicesSection?.description ||
            'Evcil dostlarınız için en kaliteli hizmetleri sunuyoruz. 💖 Profesyonel ekibimizle güvenli ve sevgi dolu bir ortam sağlıyoruz.'}
        </p>
      )}
    </div>
  );
};

// Icon mapping for service types
const getServiceIcon = (serviceType: string) => {
  switch (serviceType) {
    case 'hotel':
      return Heart;
    case 'grooming':
      return Scissors;
    case 'daycare':
      return GraduationCap;
    default:
      return Heart;
  }
};

const getServiceIconBg = (serviceType: string) => {
  switch (serviceType) {
    case 'hotel':
      return 'from-pink-200 to-rose-300';
    case 'grooming':
      return 'from-sky-200 to-blue-300';
    case 'daycare':
      return 'from-violet-200 to-purple-300';
    default:
      return 'from-pink-200 to-rose-300';
  }
};

// ServiceCard Component
interface ServiceCardProps {
  service: ServiceItem;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const IconComponent = getServiceIcon(service.service_type);
  const iconBg = getServiceIconBg(service.service_type);

  return (
    <div className='group relative h-full'>
      <div
        className={`absolute inset-0 bg-gradient-to-br ${iconBg} rounded-3xl opacity-0 group-hover:opacity-15 transition-all duration-500 blur-2xl scale-105 -z-10`}
      ></div>
      <div className='relative bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl hover:shadow-2xl border border-white/50 transition-all duration-500 hover:-translate-y-3 overflow-hidden h-full flex flex-col group-hover:bg-white/90'>
        <div
          className={`absolute top-0 left-0 right-0 h-1 sm:h-1.5 bg-gradient-to-r ${iconBg} group-hover:h-1.5 sm:group-hover:h-2 transition-all duration-300`}
        ></div>
        <div className='absolute top-3 sm:top-4 right-3 sm:right-4 w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-xl opacity-50'></div>
        <div className='flex items-center justify-between mb-4 sm:mb-6'>
          <div className='relative'>
            <div
              className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br ${iconBg} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 relative z-10`}
            >
              <IconComponent className='w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-gray-800 drop-shadow-sm' />
              <div
                className={`absolute inset-0 bg-gradient-to-br ${iconBg} rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-md scale-150`}
              ></div>
            </div>
            <div
              className={`absolute inset-0 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 border-2 border-white/50 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-700`}
            ></div>
          </div>
          <div className='flex gap-1.5 sm:gap-2'>
            <div
              className={`w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r ${iconBg} rounded-full opacity-40 group-hover:opacity-80 group-hover:scale-125 transition-all duration-300`}
            ></div>
            <div
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r ${iconBg} rounded-full opacity-30 group-hover:opacity-60 group-hover:scale-110 transition-all duration-300`}
              style={{ transitionDelay: '0.1s' }}
            ></div>
            <div
              className={`w-1 h-1 sm:w-1.5 sm:h-1.5 bg-gradient-to-r ${iconBg} rounded-full opacity-20 group-hover:opacity-40 group-hover:scale-105 transition-all duration-300`}
              style={{ transitionDelay: '0.2s' }}
            ></div>
          </div>
        </div>
        <div className='flex-1 flex flex-col space-y-3 sm:space-y-4 lg:space-y-5'>
          <div className='relative'>
            <h3 className='text-lg sm:text-xl font-bold text-navy-900 group-hover:text-navy-700 transition-colors duration-300 leading-tight'>
              {service.title}
            </h3>
            <div
              className={`absolute -bottom-0.5 sm:-bottom-1 left-0 h-0.5 bg-gradient-to-r ${iconBg} w-6 sm:w-8 group-hover:w-8 sm:group-hover:w-12 transition-all duration-700 rounded-full`}
            ></div>
          </div>
          <p className='text-gray-600 leading-relaxed text-xs sm:text-sm flex-1 group-hover:text-gray-700 transition-colors duration-300'>
            {service.description}
          </p>
          <div className='flex flex-wrap gap-1.5 sm:gap-2 mb-4'>
            {service.features && service.features.length > 0 ? (
              service.features.map((feature, idx) => {
                const badgeVariants = [
                  'px-2 sm:px-3 py-1 sm:py-1.5 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 text-xs font-semibold rounded-lg border border-blue-300/50 group-hover:from-blue-200 group-hover:to-blue-300 group-hover:scale-105 transition-all duration-300 shadow-sm',
                  'px-2 sm:px-3 py-1 sm:py-1.5 bg-gradient-to-r from-green-100 to-green-200 text-green-700 text-xs font-semibold rounded-lg border border-green-300/50 group-hover:from-green-200 group-hover:to-green-300 group-hover:scale-105 transition-all duration-300 shadow-sm',
                  'px-2 sm:px-3 py-1 sm:py-1.5 bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 text-xs font-semibold rounded-lg border border-purple-300/50 group-hover:from-purple-200 group-hover:to-purple-300 group-hover:scale-105 transition-all duration-300 shadow-sm',
                  'px-2 sm:px-3 py-1 sm:py-1.5 bg-gradient-to-r from-orange-100 to-orange-200 text-orange-700 text-xs font-semibold rounded-lg border border-orange-300/50 group-hover:from-orange-200 group-hover:to-orange-300 group-hover:scale-105 transition-all duration-300 shadow-sm',
                ];
                return (
                  <span
                    key={idx}
                    className={badgeVariants[idx % badgeVariants.length]}
                    style={{ transitionDelay: `${idx * 0.05}s` }}
                  >
                    {feature}
                  </span>
                );
              })
            ) : (
              <span className='px-2 sm:px-3 py-1 sm:py-1.5 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 text-xs font-semibold rounded-lg border border-gray-300/50'>
                Özellikler yakında eklenecek
              </span>
            )}
          </div>

          {/* İletişim Butonu */}
          <div className='mt-auto pt-3'>
            <a
              href='#iletisim'
              title={`${service.title} için iletişime geçin`}
              className='w-full inline-flex items-center justify-center px-4 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold text-sm sm:text-base rounded-xl hover:from-blue-700 hover:to-blue-800 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 transform group-hover:shadow-xl relative z-20'
              aria-label={`${service.title} hizmeti için iletişime geç`}
            >
              <span className='mr-2'>💬</span>
              İletişime Geç
            </a>
          </div>
        </div>
        <div className='absolute bottom-6 right-6 w-2 h-2 bg-orange-300 rounded-full opacity-0 group-hover:opacity-60 animate-bounce transition-opacity duration-300'></div>
        <div
          className='absolute top-1/2 right-4 w-1.5 h-1.5 bg-navy-300 rounded-full opacity-0 group-hover:opacity-50 animate-ping transition-opacity duration-300'
          style={{ animationDelay: '0.5s' }}
        ></div>
        <div className='absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500'>
          <div className='absolute top-8 right-8 w-16 h-16 bg-gradient-to-br from-orange-200 to-navy-200 rounded-full blur-2xl'></div>
          <div className='absolute bottom-8 left-8 w-12 h-12 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full blur-xl'></div>
        </div>
      </div>
    </div>
  );
};

// ServicesGrid Component
interface ServicesGridProps {
  services: ServiceItem[];
}

const ServicesGrid: React.FC<ServicesGridProps> = ({ services }) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16 lg:mb-20 px-4 sm:px-6 lg:px-8'>
      {services.map(service => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
};

// PetIconsSection Component
const PetIconsSection: React.FC = () => {
  const pets: Pet[] = [
    { id: 1, icon: Cat, name: 'Kedi', color: 'from-green-400 to-green-600' },
    { id: 2, icon: Dog, name: 'Köpek', color: 'from-blue-400 to-blue-600' },
  ];

  return (
    <div className='bg-gray-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 xl:p-16 mb-12 sm:mb-16 lg:mb-20 mx-4 sm:mx-6 lg:mx-8 xl:mx-0'>
      <div className='text-center mb-8 sm:mb-10 lg:mb-12'>
        <div className='inline-block bg-yellow-400 text-gray-800 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold mb-4 sm:mb-6'>
          Dostlarımız Bize Emanet!
        </div>
        <h3 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2'>
          Hizmet Verdiğimiz Petler
        </h3>
      </div>
      <div className='flex justify-center items-center gap-8 sm:gap-12 lg:gap-16 xl:gap-20'>
        {pets.map(pet => {
          const IconComponent = pet.icon;
          return (
            <div key={pet.id} className='group text-center'>
              <div className='relative mb-4 sm:mb-6'>
                <div className='w-20 h-20 sm:w-22 sm:h-22 lg:w-24 lg:h-24 xl:w-28 xl:h-28 bg-gray-700 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110 relative overflow-hidden cursor-pointer border-2 border-gray-600'>
                  <IconComponent className='w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 xl:w-14 xl:h-14 text-gray-400 group-hover:text-white transition-all duration-700 relative z-10 group-hover:rotate-[360deg]' />
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${pet.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full`}
                  ></div>
                </div>
              </div>
              <p className='text-lg sm:text-xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-300'>
                {pet.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// CTASection Component
const CTASection: React.FC<{
  about?: About | null;
  services?: ServiceItem[];
  reviewStats?: ReviewStats | null;
}> = ({
  about: ssrAbout,
  services: ssrServices,
  reviewStats: ssrReviewStats,
}) => {
  const dispatch = useAppDispatch();
  const { about: reduxAbout } = useAppSelector(state => state.about);
  const { services: reduxServices } = useAppSelector(state => state.services);
  const { reviewStats: reduxReviewStats } = useAppSelector(
    state => state.reviews
  );

  const about = ssrAbout || reduxAbout;
  const services = ssrServices || reduxServices;
  const reviewStats = ssrReviewStats || reduxReviewStats;

  useEffect(() => {
    if (!ssrAbout && !reduxAbout) {
      dispatch(fetchAbout());
    }
    if (!ssrReviewStats && !reduxReviewStats) {
      dispatch(fetchReviewStats());
    }
  }, [dispatch, ssrAbout, reduxAbout, ssrReviewStats, reduxReviewStats]);

  // Toplam müşteri sayısını hesapla
  const totalCustomers =
    (about?.pet_hotel_customers || 0) + (about?.pet_grooming_customers || 0);

  // Aktif hizmet sayısını hesapla
  const activeServicesCount = services?.length || 6;

  // Yorum istatistikleri
  const averageRating = Number(reviewStats?.average_rating) || 4.9;
  const totalReviews = Number(reviewStats?.total_reviews) || totalCustomers;

  return (
    <div className='text-center space-y-8'>
      <div className='flex justify-center gap-8 lg:gap-12 mb-8'>
        <div className='text-center group'>
          <div className='text-3xl lg:text-4xl font-bold bg-gradient-to-r from-navy-600 to-navy-800 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300'>
            {totalCustomers}+
          </div>
          <div className='text-sm lg:text-base text-gray-600 font-medium'>
            Mutlu Müşteri
          </div>
          <div className='w-12 h-0.5 bg-gradient-to-r from-navy-400 to-orange-400 mx-auto mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
        </div>
        <div className='w-px h-16 bg-gradient-to-b from-transparent via-gray-300 to-transparent'></div>
        <div className='text-center group'>
          <div className='text-3xl lg:text-4xl font-bold bg-gradient-to-r from-orange-500 to-orange-700 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300'>
            {activeServicesCount}
          </div>
          <div className='text-sm lg:text-base text-gray-600 font-medium'>
            Farklı Hizmet
          </div>
          <div className='w-12 h-0.5 bg-gradient-to-r from-orange-400 to-navy-400 mx-auto mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
        </div>
        <div className='w-px h-16 bg-gradient-to-b from-transparent via-gray-300 to-transparent'></div>
        <div className='text-center group'>
          <div className='text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-500 to-green-700 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300'>
            7/24
          </div>
          <div className='text-sm lg:text-base text-gray-600 font-medium'>
            Destek
          </div>
          <div className='w-12 h-0.5 bg-gradient-to-r from-green-400 to-navy-400 mx-auto mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
        </div>
      </div>
      <div className='flex flex-col sm:flex-row justify-center gap-4 mt-6'>
        <button className='group bg-white/80 backdrop-blur-sm border-2 border-navy-200 text-navy-600 px-6 py-3 rounded-2xl font-semibold hover:bg-navy-50 hover:border-navy-300 transition-all duration-300 flex items-center justify-center gap-2'>
          <span>📞</span>
          <span>Bizi Arayın</span>
          <div className='w-0 group-hover:w-4 h-0.5 bg-navy-400 transition-all duration-300'></div>
        </button>
        <button className='group bg-white/80 backdrop-blur-sm border-2 border-orange-200 text-orange-600 px-6 py-3 rounded-2xl font-semibold hover:bg-orange-50 hover:border-orange-300 transition-all duration-300 flex items-center justify-center gap-2'>
          <span>💬</span>
          <span>Mesaj Gönderin</span>
          <div className='w-0 group-hover:w-4 h-0.5 bg-orange-400 transition-all duration-300'></div>
        </button>
        <button className='group bg-white/80 backdrop-blur-sm border-2 border-green-200 text-green-600 px-6 py-3 rounded-2xl font-semibold hover:bg-green-50 hover:border-green-300 transition-all duration-300 flex items-center justify-center gap-2'>
          <span>📍</span>
          <span>Konumumuz</span>
          <div className='w-0 group-hover:w-4 h-0.5 bg-green-400 transition-all duration-300'></div>
        </button>
      </div>
      <div className='mt-8 flex items-center justify-center gap-2 text-gray-600'>
        <div className='flex text-yellow-400 text-lg'>{'⭐'.repeat(5)}</div>
        <span className='font-medium'>{averageRating.toFixed(1)}/5</span>
        <span className='text-gray-400'>•</span>
        <span className='text-sm'>{totalReviews}+ değerlendirme</span>
      </div>
    </div>
  );
};

// Main ServicesSection Component
const ServicesSection: React.FC<{
  services?: ServiceItem[];
  about?: About | null;
  reviewStats?: ReviewStats | null;
}> = ({ services: ssrServices, about, reviewStats }) => {
  const dispatch = useAppDispatch();
  const {
    services: reduxServices,
    loading,
    error,
  } = useAppSelector(state => state.services);

  const services = ssrServices || reduxServices;

  useEffect(() => {
    if (!ssrServices && reduxServices.length === 0) {
      dispatch(fetchServices());
    }
  }, [dispatch, ssrServices, reduxServices.length]);

  if (loading) {
    return (
      <Section
        id='hizmetlerimiz'
        background='gradient'
        padding='sm'
        className='relative overflow-hidden'
      >
        <BackgroundElements />
        <div className='container mx-auto relative z-10'>
          <ServicesHeader />
          <div className='flex justify-center items-center py-12'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-navy-600'></div>
          </div>
        </div>
      </Section>
    );
  }

  if (error) {
    return (
      <Section
        id='hizmetlerimiz'
        background='gradient'
        padding='sm'
        className='relative overflow-hidden'
      >
        <BackgroundElements />
        <div className='container mx-auto relative z-10'>
          <ServicesHeader />
          <div className='text-center py-12'>
            <p className='text-red-600 mb-4'>
              Hizmetler yüklenirken bir hata oluştu.
            </p>
            <button
              onClick={() => dispatch(fetchServices())}
              className='px-4 py-2 bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition-colors'
            >
              Tekrar Dene
            </button>
          </div>
        </div>
      </Section>
    );
  }

  return (
    <Section
      id='hizmetlerimiz'
      background='gradient'
      padding='sm'
      className='relative overflow-hidden'
    >
      <BackgroundElements />
      <div className='container mx-auto relative z-10'>
        <ServicesHeader />
        <ServicesGrid services={services} />
        <PetIconsSection />
        <CTASection
          about={about}
          services={services}
          reviewStats={reviewStats}
        />
      </div>
    </Section>
  );
};

// Export main component and sub-components
export default ServicesSection;
export {
  BackgroundElements,
  CTASection,
  PetIconsSection,
  ServiceCard,
  ServicesGrid,
  ServicesHeader,
};
