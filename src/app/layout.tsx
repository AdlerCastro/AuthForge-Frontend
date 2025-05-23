import type { Metadata } from 'next';
import { fonts } from '@/lib/fonts';
import './globals.css';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'AuthForge',
  description:
    'AuthForge is a modern authentication solution providing secure, customizable, and easy-to-integrate authentication flows for your applications.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='pt-br' data-theme='light'>
      <body className={`${fonts.inter.variable} font-inter antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
