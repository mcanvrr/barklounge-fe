'use client';

import { SliderItem } from '@/lib/api';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchSlides } from '@/store/slices/sliderSlice';
import Image from 'next/image';
import React, { useEffect } from 'react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import { Autoplay, EffectFade, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// SlideContent Component
interface SlideContentProps {
  slide: SliderItem;
}

const SlideContent: React.FC<SlideContentProps> = ({ slide }) => {
  return (
    <div className='h-full flex items-center justify-center relative overflow-hidden'>
      {/* Background Image */}
      <div className='absolute inset-0'>
        <Image
          src={slide.image_url}
          alt={`${slide.title} - ${slide.subtitle} - Bark&Lounge hizmetleri`}
          title={`${slide.title} - ${slide.subtitle}`}
          fill
          className='object-cover'
          sizes='100vw'
          priority
        />
      </div>

      {/* Dark Overlay for Text Readability */}
      <div className='absolute inset-0 bg-black/40' />

      {/* Content */}
      <div className='relative z-10 text-center text-white px-4 sm:px-6 lg:px-8'>
        {/* Ana Başlık - El Yazısı Stili */}
        <h2
          className='text-lg sm:text-xl md:text-2xl lg:text-3xl mb-2 sm:mb-3 md:mb-4 text-white/90 font-schoolbell'
          style={{
            textDecoration: 'underline',
            textUnderlineOffset: '4px',
          }}
        >
          {slide.title}
        </h2>

        {/* Alt Başlık - Büyük ve Kalın */}
        <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black mb-3 sm:mb-4 md:mb-6 tracking-tight leading-tight'>
          {slide.subtitle}
        </h2>

        {/* Açıklama */}
        {slide.description && (
          <p className='text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-6 md:mb-8 max-w-xs sm:max-w-lg md:max-w-2xl mx-auto text-white/90 leading-relaxed'>
            {slide.description}
          </p>
        )}

        {/* CTA Butonu */}
        <a
          href='#iletisim'
          title='İletişim bölümüne git'
          className='bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-full text-sm sm:text-base md:text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg inline-block'
        >
          Bize Ulaşın
        </a>
      </div>
    </div>
  );
};

// Main HomeSlider Component
const HomeSlider: React.FC<{ slides?: SliderItem[] }> = ({
  slides: ssrSlides,
}) => {
  const dispatch = useAppDispatch();
  const {
    slides: reduxSlides,
    loading,
    error,
  } = useAppSelector(state => state.slider);
  const [isMobile, setIsMobile] = React.useState(false);

  // Use SSR slides or fallback to Redux
  const slides = ssrSlides || reduxSlides;

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Only fetch if no SSR slides provided
    if (!ssrSlides) {
      dispatch(fetchSlides());
    }
  }, [dispatch, ssrSlides]);

  // Only show loading if no SSR slides
  if (!ssrSlides && loading) {
    return (
      <div className='h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[780px] relative bg-gradient-to-br from-navy-900 to-navy-700 flex items-center justify-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-orange-400'></div>
      </div>
    );
  }

  if (error || slides.length === 0) {
    return (
      <div className='h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[780px] relative bg-gradient-to-br from-navy-900 to-navy-700 flex items-center justify-center'>
        <div className='text-center text-white'>
          <h2 className='text-2xl font-bold mb-4'>
            Slider yüklenirken bir hata oluştu
          </h2>
          <button
            onClick={() => dispatch(fetchSlides())}
            className='px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors'
          >
            Tekrar Dene
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[780px] relative'>
      <Swiper
        modules={[Autoplay, EffectFade, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        effect='fade'
        fadeEffect={{
          crossFade: true,
        }}
        loop={true}
        navigation={
          !isMobile
            ? {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }
            : false
        }
        className='h-full'
      >
        {slides.map(slide => (
          <SwiperSlide key={slide.id}>
            <SlideContent slide={slide} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons - Only show on desktop/tablet */}
      {!isMobile && (
        <>
          <div className='swiper-button-prev !text-white !w-12 !h-12 !mt-0 !left-4 !top-1/2 !-translate-y-1/2 !bg-black/30 !backdrop-blur-sm !rounded-full !border !border-white/20 hover:!bg-black/50 transition-all duration-300'>
            <svg
              className='!w-6 !h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 19l-7-7 7-7'
              />
            </svg>
          </div>
          <div className='swiper-button-next !text-white !w-12 !h-12 !mt-0 !right-4 !top-1/2 !-translate-y-1/2 !bg-black/30 !backdrop-blur-sm !rounded-full !border !border-white/20 hover:!bg-black/50 transition-all duration-300'>
            <svg
              className='!w-6 !h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9 5l7 7-7 7'
              />
            </svg>
          </div>
        </>
      )}
    </div>
  );
};

// Export main component and sub-components
export default HomeSlider;
export { SlideContent };
