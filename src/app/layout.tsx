import type { Metadata } from 'next';
import { Geist, Geist_Mono, Noto_Sans_Thai } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar';
import QueryProviders from '@/providers/query-providers';
import { Toaster } from 'sonner';
import AuthProvider from '@/providers/auth-providers';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const notoSansTH = Noto_Sans_Thai({
  variable: '--font-noto-sans-thai',
  subsets: ['thai'],
});

export const metadata: Metadata = {
  title: 'อย่าหาว่าพี่สอน',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${notoSansTH.className} ${geistSans.variable} ${geistMono.variable}  antialiased`}
      >
        <Toaster
          richColors
          position="top-center"
        />
        <QueryProviders>
          <AuthProvider>
            <Navbar />
            {children}
          </AuthProvider>
        </QueryProviders>
      </body>
    </html>
  );
}
