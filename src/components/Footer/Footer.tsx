'use client';

import Logo from '@/assets/logo.png';
import WhatsappIcon from '@/assets/WhatsApp_icon.png';
import { FOOTER_PAGES } from '@/data';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchAppSettings } from '@/store/slices/appSettingsSlice';
import type { NavigationLink, SocialLink } from '@/types';
import { cn } from '@/utils/styles';
import { IconBrandInstagram, IconBrandTiktok } from '@tabler/icons-react';
import { ChevronUp } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

// FooterFloating Component
const FooterFloating: React.FC = () => {
  const dispatch = useAppDispatch();
  const { settings: appSettings } = useAppSelector(state => state.appSettings);

  useEffect(() => {
    if (!appSettings) {
      dispatch(fetchAppSettings());
    }
  }, [dispatch, appSettings]);

  const whatsapp = {
    phone: appSettings?.phone_number || '+90 546 246 9237',
    message: 'Merhaba! Pet hizmetleriniz hakkında bilgi almak istiyorum.',
    href: `https://wa.me/${(
      appSettings?.phone_number || '+905462469237'
    ).replace(/\s+/g, '')}?text=${encodeURIComponent(
      'Merhaba! Pet hizmetleriniz hakkında bilgi almak istiyorum.'
    )}`,
    width: 60,
    height: 60,
  };
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setShowScrollTop(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <a
        href={whatsapp.href}
        target='_blank'
        rel='nofollow noopener noreferrer'
        title='WhatsApp ile bize ulaşın'
        aria-label='WhatsApp ile iletişime geçin'
        className='fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-20'
      >
        <Image
          src={WhatsappIcon}
          alt='WhatsApp ile iletişime geçin - Bark&Lounge'
          title='WhatsApp ile iletişime geçin'
          width={whatsapp.width}
          height={whatsapp.height}
          className='w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16'
        />
      </a>

      <button
        onClick={scrollToTop}
        className={cn(
          'fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 bg-navy-700 hover:bg-navy-900 text-white rounded-full p-2 sm:p-3 shadow-lg transition-all duration-300',
          {
            'opacity-100 translate-y-0': showScrollTop,
            'opacity-0 translate-y-2 pointer-events-none': !showScrollTop,
          }
        )}
        aria-label='Yukarı çık'
      >
        <ChevronUp className='h-5 w-5 sm:h-6 sm:w-6' />
      </button>
    </>
  );
};

// FooterSocial Component (reused from Header)
const FooterSocial: React.FC = () => {
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
      {socialLinks.map((item: SocialLink) => (
        <a
          key={item.key}
          href={item.href}
          target='_blank'
          rel='nofollow noopener noreferrer'
          title={`${item.key} hesabımızı takip edin`}
          aria-label={`${item.key} hesabımızı ziyaret edin`}
          className={cn(
            'h-9 w-9 lg:h-11 lg:w-11 rounded-full flex items-center justify-center cursor-pointer transition-colors hover:bg-navy-900! group',
            item.buttonClassname
          )}
        >
          {item.icon}
        </a>
      ))}
    </div>
  );
};

// FooterTop Component
const FooterTop: React.FC = () => {
  return (
    <div className='w-full bg-white border-t border-t-gray-200 relative'>
      <div className='container mx-auto py-6 sm:py-8 lg:py-10 px-4 flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-0'>
        <Image
          src={Logo}
          alt='Logo'
          width={70}
          height={70}
          className='sm:w-[80px] sm:h-[80px] lg:w-[90px] lg:h-[90px]'
        />
        <FooterSocial />
      </div>
    </div>
  );
};

// FooterLinks Component
interface FooterLinksProps {
  title: string;
  links: NavigationLink[];
}

const FooterLinks: React.FC<FooterLinksProps> = ({ title, links }) => {
  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith('#')) {
      e.preventDefault();

      // Check if we're on the home page
      if (window.location.pathname === '/') {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          const headerElement = document.querySelector(
            '[data-header]'
          ) as HTMLElement;
          const headerHeight = headerElement ? headerElement.offsetHeight : 0;
          const extraPadding = window.innerWidth < 1024 ? 20 : 10;

          const targetPosition =
            targetElement.getBoundingClientRect().top +
            window.pageYOffset -
            headerHeight -
            extraPadding;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth',
          });
        }
      } else {
        // Redirect to home page with hash
        window.location.href = `/${href}`;
      }
    }
  };

  return (
    <div className='flex flex-col gap-3 sm:gap-4 lg:gap-5'>
      <span className='text-lg sm:text-xl lg:text-2xl text-navy-900 font-bold'>
        {title}
      </span>
      <ul className='list-disc pl-4 flex flex-col gap-1 sm:gap-2'>
        {links.map((link, index) => (
          <li
            key={index}
            className='hover:pl-2 sm:hover:pl-3 transition-all font-medium text-sm sm:text-base'
          >
            <a
              href={link.href}
              title={`${link.text} sayfasına git`}
              onClick={e => handleSmoothScroll(e, link.href)}
              {...(link.href.startsWith('http') && {
                target: '_blank',
                rel: 'nofollow noopener noreferrer',
              })}
              aria-label={`${link.text} sayfasına git`}
            >
              {link.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

// FooterContact Component
const FooterContact: React.FC = () => {
  const { settings: appSettings } = useAppSelector(state => state.appSettings);

  const footerContact = {
    title: 'İletişim Bilgileri',
    address:
      appSettings?.location ||
      'Bahçelievler Mahallesi Ali Rıza Kuzucan Sk. No:50/B\n34180 İstanbul',
    email: appSettings?.email_address || 'barkloungetr@gmail.com',
    phone: appSettings?.phone_number || '+90 546 246 9237',
  };

  return (
    <div className='flex flex-col gap-3 sm:gap-4 lg:gap-5'>
      <span className='text-lg sm:text-xl lg:text-2xl text-navy-900 font-bold'>
        {footerContact.title}
      </span>
      <div className='flex flex-col gap-2 sm:gap-3'>
        <span className='text-xs sm:text-sm font-medium whitespace-pre-line leading-relaxed'>
          {footerContact.address}
        </span>
        <a
          href={`mailto:${footerContact.email}`}
          title={`${footerContact.email} adresine e-posta gönderin`}
          className='text-xs sm:text-sm font-medium hover:text-navy-700 transition-colors duration-200 cursor-pointer'
          aria-label={`${footerContact.email} adresine e-posta gönder`}
        >
          {footerContact.email}
        </a>
        <a
          href={`tel:${footerContact.phone.replace(/\s/g, '')}`}
          title={`${footerContact.phone} numarasını arayın`}
          className='text-xs sm:text-sm font-semibold text-navy-700 hover:text-navy-900 transition-colors duration-200 cursor-pointer'
          aria-label={`${footerContact.phone} numarasını ara`}
        >
          {footerContact.phone}
        </a>
      </div>
    </div>
  );
};

// FooterAbout Component
const FooterAbout: React.FC = () => {
  const { settings: appSettings } = useAppSelector(state => state.appSettings);

  const footerAbout = {
    title: 'Hakkımızda',
    description:
      appSettings?.footer_about_text ||
      'Siz işteyken, tatildeyken, biricik dostlarınız emin ellerde.',
    tagline: 'Siz işteyken, tatildeyken, biricik dostlarınız emin ellerde.',
  };

  return (
    <div className='flex flex-col gap-3 sm:gap-4 lg:gap-5'>
      <span className='text-lg sm:text-xl lg:text-2xl text-navy-900 font-bold'>
        {footerAbout.title}
      </span>
      <div className='flex flex-col gap-3 sm:gap-4'>
        <span className='text-xs sm:text-sm font-medium leading-relaxed'>
          {footerAbout.description}
        </span>
        <div className='flex items-center gap-2 text-navy-700'>
          <span className='text-xs sm:text-sm font-semibold'>
            {footerAbout.tagline}
          </span>
        </div>
      </div>
    </div>
  );
};

// FooterLinksSection Component
const FooterLinksSection: React.FC = () => {
  const footerPages = FOOTER_PAGES;

  return (
    <div className='border-t border-t-gray-200 bg-white'>
      <div className='container mx-auto py-6 sm:py-8 lg:py-10 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-24'>
        <FooterAbout />
        <FooterContact />
        <FooterLinks title='Sayfalar' links={footerPages} />
      </div>
    </div>
  );
};

// Main Footer Component
const Footer: React.FC = () => {
  const { settings: appSettings } = useAppSelector(state => state.appSettings);

  return (
    <>
      <FooterFloating />
      <FooterTop />
      <FooterLinksSection />
      <div className='bg-navy-900'>
        <div className='container mx-auto text-xs sm:text-sm font-semibold text-center text-white h-12 sm:h-16 flex items-center justify-center px-4'>
          {appSettings?.footer_copyright_text ||
            '© Bark & Lounge 2025. Tüm Hakları Saklıdır.'}
        </div>
      </div>
    </>
  );
};

// Export main component and sub-components
export default Footer;
export {
  FooterAbout,
  FooterContact,
  FooterFloating,
  FooterLinks,
  FooterLinksSection,
  FooterSocial,
  FooterTop,
};
