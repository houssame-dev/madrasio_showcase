import './globals.css';

import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import FloatingButtons from '@/components/FloatingButtons';

export const metadata: Metadata = {
  title: 'Madrasio | The All-in-One School Management System',
  description:
    'Streamline academics, simplify tuition collection, and keep parents engaged with Madrasio, the modern platform for private schools from primary to high school.',
  openGraph: {
    title: 'Madrasio | Modern School Management',
    description: 'The all-in-one platform for private schools globally.',
    url: 'https://madrasio.com',
    siteName: 'Madrasio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Madrasio | Modern School Management',
    description: 'The all-in-one platform for private schools globally.',
  },
  robots: { index: true, follow: true },
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#FFFFFF]">
        {children}
        <FloatingButtons />
      </body>
    </html>
  );
}
