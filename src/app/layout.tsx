import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata, Viewport } from 'next';
import { Schoolbell, Sora } from 'next/font/google';
import { Footer, Header } from '../components';
import ReduxProvider from '../components/ReduxProvider';
import './globals.css';

const sora = Sora({
  variable: '--font-sora',
  subsets: ['latin'],
});

const schoolBell = Schoolbell({
  variable: '--font-schoolbell',
  weight: '400',
  subsets: ['latin'],
});

export const viewport: Viewport = {
  themeColor: '#007aff',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  colorScheme: 'light',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://barkloungetr.com'),
  title: 'Bark & Lounge - Pet Kuaför, Kreş ve Otel',
  description:
    'Bark Lounge ailesi olarak evcil dostlarınıza konfor ve mutluluk sunuyoruz. Modern, hijyenik ortamda pet kuaför, bakım ve konaklama hizmetleri veriyoruz.',
  keywords:
    'pet kuaför, köpek kuaförü, kedi bakımı, pet hotel, pet kreş, evcil hayvan bakımı, Bark&Lounge, İstanbul',
  authors: [{ name: 'Bark & Lounge', url: 'https://barkloungetr.com' }],
  creator: 'Bark & Lounge',
  publisher: 'Bark & Lounge',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/icon/favicon.ico',
    apple: '/icon/apple-icon.png',
    shortcut: '/icon/favicon-16x16.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='tr'>
      <body
        className={`${sora.variable} ${schoolBell.variable} font-sans antialiased h-dvh flex flex-col`}
      >
        <ReduxProvider>
          <Header />
          <main className='flex-1'>{children}</main>
          <Footer />
        </ReduxProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
