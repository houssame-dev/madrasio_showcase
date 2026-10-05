import './globals.css';

import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Madrasio | The All-in-One School Management System for Modern Private Schools',
  description:
    'Streamline academics, simplify tuition collection, and keep parents engaged — all inside a secure, multilingual platform built for global education.',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
