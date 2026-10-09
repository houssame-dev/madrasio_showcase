import './globals.css';

import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';

import FloatingButtons from '@/components/FloatingButtons';
import { LanguageProvider } from '@/components/LanguageProvider';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.madrasio.com'),
  alternates: {
    canonical: 'https://www.madrasio.com',
    languages: {
      en: 'https://www.madrasio.com',
      fr: 'https://www.madrasio.com/fr',
      ar: 'https://www.madrasio.com/ar',
      'x-default': 'https://www.madrasio.com',
    },
  },
  title: 'Madrasio | School Management System for Private Schools',
  description:
    'Run your private school with absolute clarity. Flat-rate pricing, free data migration, and full access to all core modules. Start your 30-day free trial.',
  keywords: [
    'school management system',
    'private school software',
    'student information system',
    'multilingual school software',
  ],
  openGraph: {
    title: 'Madrasio | School Management System for Private Schools',
    description:
      'Run your private school with absolute clarity. Flat-rate pricing, free data migration, and full access to all core modules.',
    url: 'https://www.madrasio.com',
    siteName: 'Madrasio',
    locale: 'en_US',
    alternateLocale: ['fr_FR', 'ar_MA'],
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Madrasio School Management System',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Madrasio | School Management System for Private Schools',
    description:
      'Run your private school with absolute clarity. Flat-rate pricing, free data migration, and full access to all core modules.',
    images: ['/og-image.jpg'],
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`antialiased bg-[#FFFFFF] ${inter.className}`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:start-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#14213D] focus:text-white focus:rounded-lg focus:outline-none"
        >
          Skip to main content
        </a>
        <LanguageProvider>
          {children}
          <FloatingButtons />
        </LanguageProvider>
      </body>
    </html>
  );
}
