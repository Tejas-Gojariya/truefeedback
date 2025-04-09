import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import AuthProvider from '../context/AuthProvider';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'True Feedback',
  description: 'Real feedback from real people.',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" >
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

