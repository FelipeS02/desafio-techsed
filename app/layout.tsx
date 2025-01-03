import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Header from '@/components/ui/header';
import StoreProvider from '@/components/providers/store';

import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Techsed | Felipe Saracho',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='es' suppressHydrationWarning>
      <link rel='icon' href='/icon.ico' type='image/x-icon' />

      <StoreProvider>
        <body className={`${inter.variable} antialiased`}>
          <Header />
          <div className='m-auto mt-6 w-full max-w-section flex-grow items-start justify-start rounded-md p-4 md:border md:shadow-md'>
            {children}
          </div>
        </body>
      </StoreProvider>
    </html>
  );
}
