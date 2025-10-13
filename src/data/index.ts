/**
 * Centralized data management for the application
 * Only essential static data that cannot be managed via API
 */

import { type NavigationLink, type PetType } from '@/types';

// ===== NAVIGATION DATA =====
export const HEADER_LINKS: NavigationLink[] = [
  { href: '/', text: 'Ana Sayfa' },
  { href: '#hakkimizda', text: 'Hakkımızda' },
  { href: '#hizmetlerimiz', text: 'Hizmetlerimiz' },
  { href: '#galeri', text: 'Galeri' },
  { href: '#yorumlar', text: 'Yorumlar' },
  { href: '/blog', text: 'Blog' },
  { href: '#iletisim', text: 'İletişim' },
];

export const FOOTER_PAGES: NavigationLink[] = [
  { href: '/', text: 'Ana Sayfa' },
  { href: '#hakkimizda', text: 'Hakkımızda' },
  { href: '#hizmetlerimiz', text: 'Hizmetlerimiz' },
  { href: '#galeri', text: 'Galeri' },
  { href: '#yorumlar', text: 'Yorumlar' },
  { href: '/blog', text: 'Blog' },
  { href: '#iletisim', text: 'İletişim' },
];

export const FOOTER_SERVICES: NavigationLink[] = [
  { href: '#', text: 'Pet Hotel' },
  { href: '#', text: 'Pet Kuaför' },
  { href: '#', text: 'Pet Kreş' },
];

// ===== PET TYPES DATA =====
export const PET_TYPES: { value: PetType; label: string }[] = [
  { value: 'dog', label: 'Köpek' },
  { value: 'cat', label: 'Kedi' },
];

// ===== DATA EXPORTS =====
// Re-export individual data files for backward compatibility
export * from './blog_posts';
export * from './header_links';
