import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bark & Lounge - Blog',
  description:
    'Bark Lounge ailesi olarak evcil dostlarınıza konfor ve mutluluk sunuyoruz. Modern, hijyenik ortamda pet kuaför, bakım ve konaklama hizmetleri veriyoruz.',
};

export default function BlogListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
