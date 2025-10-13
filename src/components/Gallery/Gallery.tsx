'use client';

import { GalleryItem } from '@/lib/api';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchGalleryImages } from '@/store/slices/gallerySlice';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// No lightbox library — Swiper thumbnails only

const Image = dynamic(() => import('next/image'), { ssr: false });

export default function Gallery({
  images: ssrImages,
}: {
  images?: GalleryItem[];
}) {
  const dispatch = useAppDispatch();
  const {
    images: reduxGalleryImages,
    loading,
    error,
  } = useAppSelector(state => state.gallery);

  const galleryImages = ssrImages || reduxGalleryImages;

  useEffect(() => {
    if (!ssrImages && reduxGalleryImages.length === 0) {
      dispatch(fetchGalleryImages());
    }
  }, [dispatch, ssrImages, reduxGalleryImages.length]);

  const renderContent = () => {
    if (loading) {
      return (
        <div className='flex justify-center items-center h-32'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-navy-600'></div>
        </div>
      );
    }

    if (error || galleryImages.length === 0) {
      return (
        <div className='flex justify-center items-center h-32'>
          <p className='text-gray-500'>
            Galeri resimleri yüklenirken bir hata oluştu.
          </p>
        </div>
      );
    }

    return (
      <Swiper
        modules={[Autoplay]}
        spaceBetween={16}
        slidesPerView={5}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 8,
          },
          480: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 4,
            spaceBetween: 12,
          },
          768: {
            slidesPerView: 5,
            spaceBetween: 14,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 16,
          },
        }}
        className='w-full'
      >
        {galleryImages.map((image: GalleryItem, index: number) => (
          <SwiperSlide key={image.id} className='p-0'>
            <div className='relative w-full h-full aspect-square overflow-hidden transition-opacity duration-300 rounded-lg bg-gray-100 flex items-center justify-center'>
              {/* Plain anchor (no lightbox) - kept so user can open image in new tab if desired */}
              <a
                href={image.image_url}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={`Galeri resmi ${index + 1} - ${
                  image.title || 'Bark&Lounge'
                }`}
                className='w-full h-full block'
              >
                <div className='relative w-full h-full overflow-hidden rounded-lg'>
                  <Image
                    src={image.image_url}
                    alt={
                      image.alt_text ||
                      image.title ||
                      'Bark&Lounge galeri resmi'
                    }
                    title={image.title || 'Bark&Lounge'}
                    className='w-full h-full object-cover transform hover:scale-105 transition-transform duration-300 rounded-lg'
                    width={500}
                    height={500}
                    sizes='(max-width: 480px) 50vw, (max-width: 640px) 33.33vw, (max-width: 768px) 25vw, 20vw'
                  />
                </div>
              </a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    );
  };

  return (
    <div id='galeri' className='w-full py-1 overflow-hidden'>
      {renderContent()}
    </div>
  );
}
