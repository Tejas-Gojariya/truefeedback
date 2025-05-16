import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import AuthProvider from '../context/AuthProvider';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TrueFeedback – Collect Honest Feedback Easily',
  description: 'TrueFeedback helps you gather honest, anonymous feedback from users, clients, or team members with secure and simple forms.',
  keywords: [
    'anonymous feedback',
    'feedback tool',
    'team feedback',
    'client feedback',
    'user feedback',
    'feedback form',
    'employee feedback',
  ],
  authors: [{ name: 'Tejas Gojariya' }],
  openGraph: {
    title: 'TrueFeedback – Collect Honest Feedback Easily',
    description: 'TrueFeedback helps you gather honest, anonymous feedback from users, clients, or team members with secure and simple forms.',
    url: 'https://www.truefeedback.site',
    siteName: 'TrueFeedback',
    images: [
      {
        url: 'https://www.truefeedback.site/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TrueFeedback – Anonymous Feedback Tool Preview',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TrueFeedback – Collect Honest Feedback Easily',
    description: 'TrueFeedback helps you gather honest, anonymous feedback from users, clients, or team members with secure and simple forms.',
    creator: '@Tejas_Gojariya',
    images: ['https://www.truefeedback.site/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL('https://www.truefeedback.site'),
  alternates: {
    canonical: 'https://www.truefeedback.site',
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={`${inter.className} bg-gray-900`}>
          <Navbar />
          {children}
          <Footer />
          <Toaster />
          <script defer data-domain="truefeedback.site" src="https://plausible.io/js/script.js"></script>
          <script src="https://api.testit.so/script.js?project=67ece367881c04033243caae"></script>
        </body>
      </AuthProvider>
    </html>
  );
}
