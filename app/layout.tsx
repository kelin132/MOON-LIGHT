import type { Metadata } from 'next';
import { Fraunces, Manrope, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  weight: ['400', '500', '600', '700', '800'],
});

const jbmono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jbmono',
  weight: ['400', '500', '600'],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://moonlighthaven.example.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Moonlight Haven',
    template: '%s · Moonlight Haven',
  },
  description:
    'The ultimate community platform with profiles, guilds, cards, casino games, chat, leaderboards, and more.',
  openGraph: {
    title: 'Moonlight Haven',
    description:
      'The ultimate community platform with profiles, guilds, cards, casino games, chat, leaderboards, and more.',
    url: siteUrl,
    siteName: 'Moonlight Haven',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Moonlight Haven',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Moonlight Haven',
    description:
      'The ultimate community platform with profiles, guilds, cards, casino games, chat, leaderboards, and more.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable} ${jbmono.variable}`}>
      <body className="font-body bg-void min-h-screen antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
