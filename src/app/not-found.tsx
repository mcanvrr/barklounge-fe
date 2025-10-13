import { Home, Search } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
  title: 'Sayfa Bulunamadı | Bark&Lounge',
  description:
    'Aradığınız sayfa bulunamadı. Bark&Lounge ana sayfasına dönmek için tıklayın.',
  robots: 'noindex, nofollow',
};

const NotFoundPage: React.FC = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center px-4'>
      <div className='max-w-2xl mx-auto text-center'>
        {/* 404 Animation */}
        <div className='mb-8'>
          <div className='relative'>
            {/* Animated 404 */}
            <h3 className='text-9xl md:text-[12rem] font-black bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 bg-clip-text text-transparent leading-none animate-pulse'>
              404
            </h3>

            {/* Floating Elements */}
            <div className='absolute -top-4 -right-4 w-8 h-8 bg-orange-200 rounded-full animate-bounce opacity-60'></div>
            <div
              className='absolute -bottom-4 -left-4 w-6 h-6 bg-amber-200 rounded-full animate-bounce opacity-60'
              style={{ animationDelay: '0.5s' }}
            ></div>
            <div
              className='absolute top-1/2 -right-8 w-4 h-4 bg-yellow-200 rounded-full animate-bounce opacity-60'
              style={{ animationDelay: '1s' }}
            ></div>
          </div>
        </div>

        {/* Error Message */}
        <div className='mb-8'>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
            Oops! Sayfa Bulunamadı
          </h2>
          <p className='text-lg text-gray-600 leading-relaxed'>
            Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir.
            <br />
            Endişelenmeyin, evcil dostunuz için doğru yerdeyiz! 🐕
          </p>
        </div>

        {/* Action Buttons */}
        <div className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-8'>
          <Link
            href='/'
            className='inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-semibold rounded-2xl hover:from-orange-700 hover:to-amber-700 transition-all transform hover:scale-105 shadow-lg'
          >
            <Home className='w-5 h-5' />
            Ana Sayfaya Dön
          </Link>

          <Link
            href='/blog'
            className='inline-flex items-center gap-2 px-8 py-4 bg-white text-orange-600 font-semibold rounded-2xl border-2 border-orange-200 hover:border-orange-300 hover:bg-orange-50 transition-all transform hover:scale-105 shadow-lg'
          >
            <Search className='w-5 h-5' />
            Blog&apos;u Keşfet
          </Link>
        </div>

        {/* Helpful Links */}
        <div className='bg-white/60 backdrop-blur-sm rounded-3xl p-6 border border-white/50 shadow-sm'>
          <h3 className='text-xl font-bold text-gray-900 mb-4'>
            Belki Bunları Arıyorsunuz?
          </h3>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <Link
              href='/'
              className='p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-200 hover:border-orange-300 transition-all group'
            >
              <div className='text-orange-600 font-semibold group-hover:text-orange-700'>
                🏠 Ana Sayfa
              </div>
              <div className='text-sm text-gray-600'>
                Hizmetlerimizi keşfedin
              </div>
            </Link>

            <Link
              href='/blog'
              className='p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-200 hover:border-orange-300 transition-all group'
            >
              <div className='text-orange-600 font-semibold group-hover:text-orange-700'>
                📝 Blog
              </div>
              <div className='text-sm text-gray-600'>Pet bakım rehberleri</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
