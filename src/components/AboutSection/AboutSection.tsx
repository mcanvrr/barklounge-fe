'use client';

import WhatsappIcon from '@/assets/WhatsApp_icon.png';
import { Section } from '@/components/ui';
import type {
  About,
  AboutContent,
  AppSettings,
} from '@/lib/api/services/appSettings';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchAbout, fetchAboutContent } from '@/store/slices/aboutSlice';
import { fetchAppSettings } from '@/store/slices/appSettingsSlice';
import { Award, Heart, Phone, Shield } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect } from 'react';

// AboutContent Component
const AboutContentComponent: React.FC<{
  about?: About | null;
  appSettings?: AppSettings | null;
}> = ({ about: ssrAbout, appSettings: ssrAppSettings }) => {
  const dispatch = useAppDispatch();
  const {
    about: reduxAbout,
    loading,
    error,
  } = useAppSelector(state => state.about);

  const { settings: reduxAppSettings } = useAppSelector(
    state => state.appSettings
  );

  const about = ssrAbout || reduxAbout;
  const appSettings = ssrAppSettings || reduxAppSettings;

  useEffect(() => {
    if (!ssrAbout && !reduxAbout) {
      dispatch(fetchAbout());
    }
    if (!ssrAppSettings && !reduxAppSettings) {
      dispatch(fetchAppSettings());
    }
  }, [dispatch, ssrAbout, reduxAbout, ssrAppSettings, reduxAppSettings]);

  const features = [
    {
      icon: Heart,
      title: 'Sevgi Dolu Bakım',
      description: 'Her dostumuzu ailemizin parçası gibi seviyoruz',
      bgColor: 'bg-pink-100 group-hover:bg-pink-200',
      iconColor: 'text-pink-600',
      textColor: 'group-hover:text-pink-600',
    },
    {
      icon: Shield,
      title: 'Güvenli Ortam',
      description: '7/24 kamera sistemi ve hijyenik tesis',
      bgColor: 'bg-green-100 group-hover:bg-green-200',
      iconColor: 'text-green-600',
      textColor: 'group-hover:text-green-600',
    },
    {
      icon: Award,
      title: 'Uzman Ekip',
      description: 'Veteriner denetiminde profesyonel hizmet',
      bgColor: 'bg-yellow-100 group-hover:bg-yellow-200',
      iconColor: 'text-yellow-600',
      textColor: 'group-hover:text-yellow-600',
    },
  ];

  return (
    <div className='space-y-6 sm:space-y-8 lg:space-y-10 animate-fade-in-up'>
      {/* Üst Başlık */}
      <div className='text-center lg:text-left'>
        <span className='inline-block bg-gradient-to-r from-navy-50 to-orange-50 text-navy-700 px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 rounded-full text-xs sm:text-sm font-semibold shadow-xl border-2 border-white hover:scale-105 transition-all duration-300'>
          🐾 Bark&Lounge
        </span>
      </div>

      {/* Ana Başlık */}
      <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 text-center lg:text-left leading-tight'>
        Evcil Hayvanlarınız
        <br />
        <span className='text-navy-600 relative group'>
          Emin Ellerde
          <div className='absolute -bottom-1 sm:-bottom-2 left-0 w-12 sm:w-16 h-0.5 sm:h-1 bg-navy-200 rounded-full group-hover:w-16 sm:group-hover:w-24 transition-all duration-500'></div>
          {/* Glowing Underline */}
          <div className='absolute -bottom-1 sm:-bottom-2 left-0 w-12 sm:w-16 h-0.5 sm:h-1 bg-gradient-to-r from-navy-300 to-navy-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm'></div>
          {/* Floating Particles */}
          <div className='absolute -top-1 sm:-top-2 -right-1 sm:-right-2 w-0.5 sm:w-1 h-0.5 sm:h-1 bg-navy-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping'></div>
          <div
            className='absolute -top-0.5 sm:-top-1 -right-2 sm:-right-4 w-0.5 h-0.5 bg-orange-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping'
            style={{ animationDelay: '0.5s' }}
          ></div>
        </span>
      </h1>

      {/* Açıklama */}
      {loading ? (
        <div
          className='flex justify-center animate-fade-in-up'
          style={{ animationDelay: '0.2s' }}
        >
          <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-navy-600'></div>
        </div>
      ) : error ? (
        <p
          className='text-base sm:text-lg lg:text-xl text-red-600 text-center lg:text-left leading-relaxed max-w-lg animate-fade-in-up'
          style={{ animationDelay: '0.2s' }}
        >
          Hakkımızda metni yüklenirken hata oluştu.
        </p>
      ) : (
        <p
          className='text-base sm:text-lg lg:text-xl text-gray-600 text-center lg:text-left leading-relaxed max-w-lg animate-fade-in-up'
          style={{ animationDelay: '0.2s' }}
        >
          {about?.about_description || 'Hakkımızda metni yükleniyor...'}
        </p>
      )}

      {/* Özellikler ve İletişim - Yan Yana */}
      <div
        className='grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 animate-fade-in-up'
        style={{ animationDelay: '0.4s' }}
      >
        {/* Özellikler */}
        <div className='bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2'>
          <h3 className='text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-6 sm:mb-8 text-center'>
            Neden Bizi Seçmelisiniz?
          </h3>
          <div className='space-y-4 sm:space-y-6'>
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className='flex items-center space-x-3 sm:space-x-4 group hover:bg-pink-50 p-2 sm:p-3 rounded-xl transition-all duration-300'
                >
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 ${feature.bgColor} rounded-full flex items-center justify-center transition-colors duration-300 flex-shrink-0`}
                  >
                    <IconComponent
                      className={`w-5 h-5 sm:w-6 sm:h-6 ${feature.iconColor}`}
                    />
                  </div>
                  <div>
                    <h4
                      className={`text-base sm:text-lg font-semibold text-gray-800 ${feature.textColor} transition-colors duration-300`}
                    >
                      {feature.title}
                    </h4>
                    <p className='text-xs sm:text-sm text-gray-600'>
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* İletişim Bölümü */}
        <div className='bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative'>
          {/* Glowing Background Effect */}
          <div className='absolute inset-0 bg-gradient-to-r from-navy-100 to-navy-200 rounded-xl sm:rounded-2xl opacity-0 hover:opacity-20 transition-opacity duration-300 blur-sm'></div>

          <div className='text-center space-y-6 sm:space-y-8 relative'>
            {/* Telefon İkonu */}
            <div className='flex justify-center'>
              <div className='w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-navy-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 hover:shadow-xl relative group'>
                <Phone className='w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 text-white group-hover:animate-bounce' />
                <div className='absolute inset-0 bg-navy-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300'></div>
                {/* Glowing Ring */}
                <div className='absolute inset-0 bg-navy-300 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-sm'></div>
                {/* Sparkles */}
                <div className='absolute -top-1 sm:-top-2 -right-1 sm:-right-2 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 animate-ping'></div>
                <div
                  className='absolute -bottom-0.5 sm:-bottom-1 -left-0.5 sm:-left-1 w-0.5 sm:w-1 h-0.5 sm:h-1 bg-yellow-300 rounded-full opacity-0 group-hover:opacity-100 animate-ping'
                  style={{ animationDelay: '0.5s' }}
                ></div>
              </div>
            </div>

            {/* Hemen Ulaşın */}
            <div>
              <h3 className='text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-2 sm:mb-3'>
                Bizimle İletişime Geçin
              </h3>
              <p className='text-sm sm:text-base lg:text-lg text-gray-600'>
                Dostlarınız için her zaman buradayız
              </p>
            </div>

            {/* İletişim Butonları */}
            <div className='space-y-4'>
              {/* Telefon Butonu */}
              <a
                href={`tel:${appSettings?.phone_number || '#'}`}
                title={`${
                  appSettings?.phone_number || 'Telefon'
                } numarasını arayın`}
                target='_blank'
                rel='noopener noreferrer'
                className='group relative flex items-center justify-center w-full bg-gradient-to-r from-navy-500 to-navy-600 hover:from-navy-600 hover:to-navy-700 text-white px-6 py-4 rounded-2xl font-semibold text-base transition-all duration-300 hover:scale-[1.02] hover:shadow-xl overflow-hidden'
              >
                {/* Background Animation */}
                <div className='absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700'></div>

                <div className='relative flex items-center space-x-3'>
                  <div className='w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300'>
                    <Phone className='w-4 h-4 group-hover:scale-110 transition-transform duration-300' />
                  </div>
                  <span className='text-white font-medium'>Bizi Arayın</span>
                </div>
              </a>

              {/* WhatsApp Butonu */}
              <a
                href={appSettings?.whatsapp_url || '#'}
                target='_blank'
                rel='noopener noreferrer'
                className='group relative flex items-center justify-center w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-4 rounded-2xl font-semibold text-base transition-all duration-300 hover:scale-[1.02] hover:shadow-xl overflow-hidden'
              >
                {/* Background Animation */}
                <div className='absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700'></div>

                <div className='relative flex items-center space-x-3'>
                  <div className='w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300'>
                    <Image
                      src={WhatsappIcon}
                      alt='WhatsApp'
                      width={16}
                      height={16}
                      className='w-4 h-4 group-hover:scale-110 transition-transform duration-300'
                    />
                  </div>
                  <span className='text-white font-medium'>
                    WhatsApp&apos;tan Ulaşın
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// AboutImage Component
const AboutImage: React.FC<{ aboutContent?: AboutContent | null }> = ({
  aboutContent: ssrAboutContent,
}) => {
  const dispatch = useAppDispatch();
  const {
    aboutContent: reduxAboutContent,
    loading,
    error,
  } = useAppSelector(state => state.about);

  const aboutContent = ssrAboutContent || reduxAboutContent;

  useEffect(() => {
    if (!ssrAboutContent && !reduxAboutContent) {
      dispatch(fetchAboutContent());
    }
  }, [dispatch, ssrAboutContent, reduxAboutContent]);

  return (
    <div
      className='flex justify-center lg:justify-end animate-fade-in-up'
      style={{ animationDelay: '0.6s' }}
    >
      <div className='relative w-full max-w-lg group'>
        <div className='rounded-2xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 relative'>
          {loading ? (
            <div className='w-full h-96 flex items-center justify-center bg-gray-200 rounded-2xl'>
              <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-navy-600'></div>
            </div>
          ) : error ? (
            <div className='w-full h-96 flex items-center justify-center bg-gray-200 rounded-2xl'>
              <span className='text-red-600'>
                Resim yüklenirken hata oluştu
              </span>
            </div>
          ) : (
            <Image
              src={aboutContent?.image_url || '/placeholder-image.jpg'}
              alt={
                aboutContent?.alt_text ||
                'Bark&Lounge pet hotel hizmeti - Mutlu köpek ve konforlu konaklama'
              }
              title={
                aboutContent?.alt_text ||
                'Pet hotel hizmetimizde mutlu köpekler'
              }
              width={500}
              height={500}
              className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700'
            />
          )}
          {/* Gradient Overlay */}
          <div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
          {/* Glowing Border */}
          <div className='absolute inset-0 bg-gradient-to-r from-navy-300 to-orange-300 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-sm'></div>
        </div>

        {/* Dekoratif Elementler */}
        <div className='absolute -top-4 -right-4 w-8 h-8 bg-navy-200 rounded-full opacity-60 group-hover:opacity-80 transition-all duration-300 group-hover:scale-110 group-hover:animate-pulse'>
          <div className='absolute inset-0 bg-navy-300 rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-300 blur-sm'></div>
          <div className='absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 animate-ping'></div>
        </div>

        <div className='absolute -bottom-4 -left-4 w-6 h-6 bg-orange-200 rounded-full opacity-60 group-hover:opacity-80 transition-all duration-300 group-hover:scale-110 group-hover:animate-pulse'>
          <div className='absolute inset-0 bg-orange-300 rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-300 blur-sm'></div>
          <div className='absolute -top-1 -right-1 w-1.5 h-1.5 bg-yellow-300 rounded-full opacity-0 group-hover:opacity-100 animate-ping'></div>
        </div>

        <div className='absolute top-1/2 -right-2 w-4 h-4 bg-pink-200 rounded-full opacity-40 group-hover:opacity-60 transition-all duration-300 group-hover:scale-125 group-hover:animate-ping'>
          <div className='absolute inset-0 bg-pink-300 rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-300 blur-sm'></div>
        </div>

        {/* Additional Floating Elements */}
        <div
          className='absolute top-1/4 -left-2 w-3 h-3 bg-green-200 rounded-full opacity-30 group-hover:opacity-60 transition-all duration-300 group-hover:scale-110 group-hover:animate-ping'
          style={{ animationDelay: '1s' }}
        ></div>
        <div
          className='absolute bottom-1/4 -right-6 w-2 h-2 bg-yellow-200 rounded-full opacity-40 group-hover:opacity-70 transition-all duration-300 group-hover:scale-125 group-hover:animate-ping'
          style={{ animationDelay: '1.5s' }}
        ></div>
      </div>
    </div>
  );
};

// Main AboutSection Component
const AboutSection: React.FC<{
  about?: About | null;
  aboutContent?: AboutContent | null;
  appSettings?: AppSettings | null;
}> = ({ about, aboutContent, appSettings }) => {
  return (
    <Section
      id='hakkimizda'
      background='gradient'
      padding='sm'
      className='relative overflow-hidden'
    >
      {/* Animated Background Elements */}
      <div className='absolute inset-0'>
        <div
          className='absolute top-16 right-16 w-16 h-16 bg-gradient-to-r from-navy-300 to-navy-500 rounded-full blur-xl opacity-30 animate-bounce'
          style={{ animationDuration: '3s' }}
        ></div>
        <div
          className='absolute bottom-16 left-16 w-20 h-20 bg-gradient-to-r from-orange-300 to-orange-500 rounded-full blur-xl opacity-30 animate-bounce'
          style={{ animationDuration: '4s', animationDelay: '1s' }}
        ></div>
      </div>

      <div className='container mx-auto relative px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 xl:gap-20 items-center'>
          <AboutContentComponent about={about} appSettings={appSettings} />
          <AboutImage aboutContent={aboutContent} />
        </div>
      </div>
    </Section>
  );
};

// Export main component and sub-components
export default AboutSection;
export { AboutContentComponent, AboutImage };
