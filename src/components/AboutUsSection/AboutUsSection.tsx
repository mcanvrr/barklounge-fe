'use client';

import type { About } from '@/lib/api/services/appSettings';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchAbout } from '@/store/slices/aboutSlice';
import { useEffect } from 'react';

export default function AboutUsSection({
  about: ssrAbout,
}: {
  about?: About | null;
}) {
  const dispatch = useAppDispatch();
  const { about: reduxAbout } = useAppSelector(state => state.about);

  const about = ssrAbout || reduxAbout;

  useEffect(() => {
    if (!ssrAbout && !reduxAbout) {
      dispatch(fetchAbout());
    }
  }, [dispatch, ssrAbout, reduxAbout]);
  return (
    <section className='relative w-full overflow-hidden'>
      <div className='w-full'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-0 items-center min-h-[600px]'>
          {/* Sol Taraf - Navy Background */}
          <div className='bg-gradient-to-br from-navy-600 via-navy-700 to-navy-800 p-12 lg:p-16 text-white relative overflow-hidden'>
            {/* Modern Background Elements */}
            <div className='absolute inset-0'>
              <div className='absolute top-8 right-8 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-pulse'></div>
              <div
                className='absolute bottom-8 left-8 w-24 h-24 bg-white/5 rounded-full blur-2xl animate-pulse'
                style={{ animationDelay: '2s' }}
              ></div>
              <div
                className='absolute top-1/2 right-12 w-16 h-16 bg-white/5 rounded-full blur-xl animate-pulse'
                style={{ animationDelay: '4s' }}
              ></div>
            </div>

            <div className='relative z-10'>
              {/* Header Badge */}
              <div className='mb-8'>
                <div className='inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-semibold border border-white/30 hover:scale-105 transition-transform duration-300'>
                  <span>🐾</span>
                  <span>Bark&Lounge</span>
                </div>
              </div>

              {/* Main Title */}
              <h2 className='text-5xl lg:text-6xl font-bold mb-8 leading-tight'>
                Hakkımızda
              </h2>

              {/* Description */}
              <p className='text-blue-100 leading-relaxed mb-12 text-lg font-medium'>
                {about?.about_description ||
                  'Bark&Lounge olarak evcil hayvanlarınızın sağlığı ve mutluluğu bizim önceliğimizdir.'}
              </p>

              {/* Enhanced Statistics */}
              <div className='grid grid-cols-2 gap-4'>
                <div className='bg-white/15 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 group'>
                  <div className='text-3xl mb-2 group-hover:scale-110 transition-transform duration-300'>
                    🏨
                  </div>
                  <div className='text-4xl font-bold text-white mb-2'>
                    {about?.pet_hotel_customers || 515}+
                  </div>
                  <div className='text-blue-200 text-sm font-medium'>
                    Pet Hotel Müşterisi
                  </div>
                </div>

                <div className='bg-white/15 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 group'>
                  <div className='text-3xl mb-2 group-hover:scale-110 transition-transform duration-300'>
                    ✂️
                  </div>
                  <div className='text-4xl font-bold text-white mb-2'>
                    {about?.pet_grooming_customers || 144}+
                  </div>
                  <div className='text-blue-200 text-sm font-medium'>
                    Pet Kuaför Müşterisi
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sağ Taraf - Dog Image */}
          <div className='relative bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 h-full min-h-[600px] flex items-center justify-center overflow-hidden'>
            {/* Background Pattern */}
            <div className='absolute inset-0'>
              <div className='absolute top-12 right-12 w-20 h-20 bg-pink-200/30 rounded-full blur-2xl animate-bounce'></div>
              <div className='absolute bottom-16 left-12 w-16 h-16 bg-orange-200/30 rounded-full blur-xl animate-pulse'></div>
              <div className='absolute top-1/4 left-8 w-12 h-12 bg-purple-200/20 rounded-full blur-lg animate-ping'></div>
              <div
                className='absolute bottom-1/4 right-16 w-14 h-14 bg-blue-200/25 rounded-full blur-xl animate-bounce'
                style={{ animationDelay: '1.5s' }}
              ></div>
            </div>

            <div className='relative w-full h-full flex items-center justify-center'>
              {/* Main Dog Visual */}
              <div className='relative'>
                <div className='w-80 h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-orange-100 via-amber-100 to-pink-100 rounded-full flex items-center justify-center shadow-2xl border-8 border-white/50 group hover:scale-105 transition-all duration-700'>
                  <div className='text-9xl lg:text-[10rem] transform group-hover:rotate-12 transition-transform duration-500'>
                    🐕
                  </div>
                </div>

                {/* Floating Elements Around Dog */}
                <div className='absolute -top-6 -right-6 text-3xl animate-bounce'>
                  ❤️
                </div>
                <div
                  className='absolute -bottom-6 -left-6 text-2xl animate-pulse'
                  style={{ animationDelay: '1s' }}
                >
                  💕
                </div>
                <div
                  className='absolute top-1/2 -right-12 text-xl animate-ping'
                  style={{ animationDelay: '2s' }}
                >
                  🐾
                </div>
                <div
                  className='absolute top-1/4 -left-8 text-lg animate-bounce'
                  style={{ animationDelay: '3s' }}
                >
                  ✨
                </div>
                <div
                  className='absolute bottom-1/4 -right-8 text-xl animate-pulse'
                  style={{ animationDelay: '4s' }}
                >
                  🌟
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
