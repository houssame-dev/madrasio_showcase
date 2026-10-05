import './globals.css';

import type { Metadata } from 'next';
import type { ReactNode } from 'react';

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
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#FFFFFF]">{children}</body>
    </html>
  );
}
