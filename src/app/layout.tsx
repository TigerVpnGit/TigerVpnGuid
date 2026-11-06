import type { Metadata } from 'next';
import { config } from '@fortawesome/fontawesome-svg-core';
import { Inter, Vazirmatn } from 'next/font/google';
import localFont from 'next/font/local'; // اضافه کردن فونت محلی

import '@fortawesome/fontawesome-svg-core/styles.css';
import './globals.css';
import Providers from '@/components/Providers';
import Header from '@/components/Header';

config.autoAddCss = false;

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const vazirmatn = Vazirmatn({ subsets: ['arabic'], variable: '--font-vazirmatn', display: 'swap' });

// 👇 اینجا فونت اختصاصی شما معرفی میشه 👇
const blackFuture = localFont({
  src: './fonts/BlackFuture.otf', // ⚠️ اگر پسوند فایل شما otf یا woff هست، اینجا تغییر بدید
  variable: '--font-blackfuture',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Tiger VPN — Secure VPN setup guides',
  description: 'Step-by-step, multilingual VPN setup guides for Android, iOS, Windows and more.',
  metadataBase: new URL('https://example.github.io'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={`${inter.variable} ${vazirmatn.variable} ${blackFuture.variable}`}>
      <body className="flex min-h-screen flex-col">
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
        </Providers>
      </body>
    </html>
  );
}