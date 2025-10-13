'use client';

import Logo from '@/assets/logo.png';
import { HEADER_LINKS } from '@/data';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchAppSettings } from '@/store/slices/appSettingsSlice';
import { toggleMobileMenu } from '@/store/slices/appSlice';
import type { NavigationLink, SocialLink } from '@/types';
import { cn } from '@/utils/styles';
import { IconBrandInstagram, IconBrandTiktok } from '@tabler/icons-react';
import { Clock, Mail, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

// HeaderTop Component
const HeaderTop: React.FC = () => {
  const dispatch = useAppDispatch();
  const { settings: appSettings } = useAppSelector(state => state.appSettings);

  useEffect(() => {
    if (!appSettings) {
      dispatch(fetchAppSettings());
    }
  }, [dispatch, appSettings]);

  // Header top items from AppSettings
  const headerTopItems = [
    {
      icon: Mail,
      label: 'E-posta Adresi',
      description: appSettings?.email_address || 'info@barklounge.com',
    },
    {
      icon: Phone,
      label: 'Telefon',
      description: appSettings?.phone_number || '+90 546 246 9237',
    },
    {
      icon: Clock,
      label: 'Çalışma Saatleri',
      description: appSettings?.working_hours || '10:00 - 19:00',
    },
  ];

  return (
    <div className='hidden sm:block w-full bg-gradient-to-r from-navy-800 to-navy-900 transition-all duration-200 ease-out'>
      <div className='container h-16 lg:h-20 mx-auto flex items-center text-white justify-end px-4'>
        <div className='flex items-center gap-6 lg:gap-10'>
          {headerTopItems.map((item, index) => {
            // Email ve telefon için link oluştur
            const isEmail = item.label === 'E-posta Adresi';
            const isPhone = item.label === 'Telefon';

            const content = (
              <>
                <item.icon className='w-5 h-5 lg:w-6 lg:h-6 text-white/60 flex-shrink-0 group-hover:text-white/90 transition-colors duration-300' />
                <div className='flex flex-col'>
                  <span className='text-xs lg:text-sm font-bold text-white leading-tight group-hover:text-white/90 transition-colors duration-300'>
                    {item.description}
                  </span>
                  <span className='text-[10px] lg:text-xs font-medium text-white/80 leading-tight group-hover:text-white/70 transition-colors duration-300'>
                    {item.label}
                  </span>
                </div>
              </>
            );

            return (
              <div
                key={item.label}
                className='flex items-center gap-3 lg:gap-4 group hover:scale-105 transition-all duration-200 ease-out'
                style={{
                  animationDelay: `${index * 50}ms`,
                  animation: 'fadeInUp 0.3s ease-out forwards',
                  opacity: 0,
                }}
              >
                {isEmail ? (
                  <a
                    href={`mailto:${item.description}`}
                    title={`${item.description} adresine e-posta gönderin`}
                    className='flex items-center gap-3 lg:gap-4 cursor-pointer'
                    aria-label={`${item.description} adresine e-posta gönder`}
                  >
                    {content}
                  </a>
                ) : isPhone ? (
                  <a
                    href={`tel:${item.description.replace(/\s/g, '')}`}
                    title={`${item.description} numarasını arayın`}
                    className='flex items-center gap-3 lg:gap-4 cursor-pointer'
                    aria-label={`${item.description} numarasını ara`}
                  >
                    {content}
                  </a>
                ) : (
                  content
                )}
                {index !== headerTopItems.length - 1 && (
                  <div className='w-[1px] h-6 lg:h-8 bg-white/10' />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// HeaderNavigation Component
interface HeaderNavigationProps {
  isScrolled: boolean;
}

const HeaderNavigation: React.FC<HeaderNavigationProps> = ({ isScrolled }) => {
  const pathname = usePathname();
  const headerLinks = HEADER_LINKS;
  const [activeHash, setActiveHash] = React.useState<string>('');

  // Hash değişikliklerini dinle
  React.useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(window.location.hash);
    };

    // Sayfa yüklendiğinde hash'i kontrol et
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Scroll ile aktif section'ı belirle
  React.useEffect(() => {
    const handleScroll = () => {
      if (pathname !== '/') return; // Sadece anasayfada çalışsın

      const sections = [
        'hakkimizda',
        'hizmetlerimiz',
        'galeri',
        'hakkimizda-detay',
        'yorumlar',
        'iletisim',
      ];
      const scrollPosition = window.scrollY + 200; // Header yüksekliği için offset

      // En üstteyken anasayfa aktif olsun
      if (scrollPosition < 300) {
        setActiveHash('');
        return;
      }

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveHash(`#${sectionId}`);
            break;
          }
        }
      }
    };

    // Sadece anasayfada scroll listener ekle
    if (pathname === '/') {
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll(); // İlk yüklemede kontrol et
    }

    return () => {
      if (pathname === '/') {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [pathname]);

  const isActive = (href: string): boolean => {
    if (href === '/') {
      return pathname === '/' && (typeof window === 'undefined' || !activeHash);
    }

    if (href.startsWith('#')) {
      return activeHash === href;
    }

    return pathname === href || pathname.startsWith(href);
  };

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      // Target element bulundu, normal scroll yap
      const headerElement = document.querySelector(
        '[data-header]'
      ) as HTMLElement;
      const headerHeight = headerElement
        ? headerElement.offsetHeight
        : isScrolled
        ? 80
        : 120;

      const getResponsivePadding = () => {
        if (window.innerWidth >= 1024) return 20; // Desktop
        if (window.innerWidth >= 768) return 30; // Tablet
        return 40; // Mobile
      };

      const extraPadding = getResponsivePadding();
      const elementPosition = targetElement.offsetTop;
      const offsetPosition = elementPosition - headerHeight - extraPadding;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth',
      });

      // Hash'i güncelle
      window.history.pushState(null, '', href);
      setActiveHash(href);
    } else {
      // Target element bulunamadı (blog sayfasındayken), ana sayfaya yönlendir
      window.location.href = `/${href}`;
    }
  };

  const renderLink = (item: NavigationLink, index: number) => {
    const active = isActive(item.href);
    const isHashLink = item.href.startsWith('#');

    const linkClasses = cn('text-lg font-semibold relative group', {
      'text-navy-700 font-bold': active,
      'text-black/80 hover:text-navy-700': !active,
    });

    if (isHashLink) {
      return (
        <a
          key={index}
          href={item.href}
          title={`${item.text} bölümüne git`}
          className={`${linkClasses} hover:-translate-y-0.5 active:scale-95 transition-all duration-200 ease-out`}
          aria-label={`${item.text} bölümüne git`}
          onClick={e => handleSmoothScroll(e, item.href)}
        >
          <span className='relative z-10'>{item.text}</span>
          <div className='absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-navy-600 to-navy-500 w-0 opacity-0 group-hover:w-full group-hover:opacity-100 transition-all duration-400 ease-out' />
        </a>
      );
    }

    return (
      <div
        key={index}
        className='hover:-translate-y-0.5 active:scale-95 transition-all duration-200 ease-out'
      >
        <Link
          href={item.href}
          title={`${item.text} sayfasına git`}
          className={linkClasses}
          aria-label={`${item.text} sayfasına git`}
          onClick={() => {
            // Normal sayfa linklerine tıklandığında hash aktifliğini temizle
            setActiveHash('');
          }}
        >
          <span className='relative z-10'>{item.text}</span>
          <div className='absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-navy-600 to-navy-500 w-0 opacity-0 group-hover:w-full group-hover:opacity-100 transition-all duration-400 ease-out' />
        </Link>
      </div>
    );
  };

  return (
    <div className='flex flex-col lg:flex-row items-center gap-4 lg:gap-10 w-full lg:w-auto'>
      {headerLinks.map(renderLink)}
    </div>
  );
};

// HeaderSocial Component
const HeaderSocial: React.FC = () => {
  const { settings: appSettings } = useAppSelector(state => state.appSettings);

  // Create social links from AppSettings
  const socialLinks = [
    appSettings?.instagram_url && {
      key: 'instagram',
      href: appSettings.instagram_url,
      buttonClassname: 'instagram',
      icon: (
        <IconBrandInstagram className='h-6 w-6 text-white group-hover:scale-x-125 transition-all' />
      ),
    },
    appSettings?.tiktok_url && {
      key: 'tiktok',
      href: appSettings.tiktok_url,
      buttonClassname: 'bg-black',
      icon: (
        <IconBrandTiktok className='h-6 w-6 text-white group-hover:scale-x-125 transition-all' />
      ),
    },
  ].filter(Boolean) as SocialLink[];

  return (
    <div className='flex items-center gap-3 lg:gap-4'>
      {socialLinks.map((item: SocialLink, index: number) => (
        <a
          key={item.key}
          href={item.href}
          target='_blank'
          rel='nofollow noopener noreferrer'
          title={`${item.key} hesabımızı takip edin`}
          aria-label={`${item.key} hesabımızı ziyaret edin`}
          className={cn(
            'h-9 w-9 lg:h-11 lg:w-11 rounded-full flex items-center justify-center cursor-pointer group hover:scale-105 hover:-translate-y-0.5 active:scale-95 transition-all duration-200 ease-out',
            item.buttonClassname
          )}
          style={{
            animationDelay: `${index * 80}ms`,
            animation: 'fadeInUp 0.4s ease-out forwards',
            opacity: 0,
          }}
        >
          {item.icon}
        </a>
      ))}
    </div>
  );
};

// Main Header Component
const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const isMobileMenuOpen = useAppSelector(state => state.app.isMobileMenuOpen);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleToggleMobileMenu = () => {
    dispatch(toggleMobileMenu());
  };

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY;

          // HeaderTop sadece sayfa en üstündeyken gözüksün
          if (scrollTop > 50) {
            setIsScrolled(true);
          } else {
            setIsScrolled(false);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className='w-full'>
      {!isScrolled && (
        <div className='fixed top-0 left-0 right-0 z-40'>
          <HeaderTop />
        </div>
      )}
      <div
        data-header='true'
        className={cn(
          'w-full fixed left-0 right-0 z-50 transition-all duration-200 ease-out bg-white/95 backdrop-blur-md',
          isScrolled ? 'top-0' : 'top-0 sm:top-16 lg:top-20'
        )}
      >
        <div
          className='bg-white border-b border-b-gray-300 transition-all duration-500 ease-out'
          style={{
            height: '5rem',
          }}
        >
          <div
            className='container mx-auto flex items-center justify-between px-4 transition-all duration-500 ease-out'
            style={{
              height: '5rem',
            }}
          >
            {/* Logo */}
            <Link
              href='/'
              title='Bark & Lounge - Ana sayfa'
              className='flex-shrink-0 hover:scale-105 active:scale-95 transition-transform duration-300 ease-out'
              aria-label='Ana sayfaya dön'
            >
              <div
                className='transition-all duration-500 ease-out'
                style={{
                  width: '5rem',
                  height: '5rem',
                }}
              >
                <Image
                  src={Logo}
                  alt='Bark & Lounge Logo'
                  width={60}
                  height={60}
                  className='w-full h-full object-contain'
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className='hidden lg:flex items-center gap-10'>
              <HeaderNavigation isScrolled={isScrolled} />
            </div>

            {/* Desktop Social Links */}
            <div className='hidden lg:flex items-center'>
              <HeaderSocial />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={handleToggleMobileMenu}
              className='lg:hidden flex flex-col items-center justify-center w-8 h-8 space-y-1 hover:scale-105 active:scale-95 transition-transform duration-200 ease-out'
              aria-label='Menüyü aç/kapat'
            >
              <span
                className={`block w-6 h-0.5 bg-gray-700 transition-transform duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                }`}
              ></span>
              <span
                className={`block w-6 h-0.5 bg-gray-700 transition-opacity duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`}
              ></span>
              <span
                className={`block w-6 h-0.5 bg-gray-700 transition-transform duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                }`}
              ></span>
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`lg:hidden bg-white border-t border-gray-200 overflow-hidden transition-all duration-500 ease-out ${
              isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className='container mx-auto px-4 py-4 space-y-4'>
              {/* Mobile Navigation */}
              <div className='flex flex-col space-y-3'>
                <HeaderNavigation isScrolled={isScrolled} />
              </div>

              {/* Mobile Social Links */}
              <div className='flex items-center justify-center pt-4 border-t border-gray-200'>
                <HeaderSocial />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export main component and sub-components
export default Header;
export { HeaderNavigation, HeaderSocial, HeaderTop };
