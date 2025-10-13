import type { Metadata } from 'next';
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

export const metadata: Metadata = {
  title: 'Bark & Lounge - Pet Kuaför, Kreş ve Otel',
  description:
    'Bark Lounge ailesi olarak evcil dostlarınıza konfor ve mutluluk sunuyoruz. Modern, hijyenik ortamda pet kuaför, bakım ve konaklama hizmetleri veriyoruz.',
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
      </body>
    </html>
  );
}
