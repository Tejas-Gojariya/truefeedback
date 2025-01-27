'use client';

import Footer from '@/components/Footer';
import UserInfo from '@/components/UserInfo';
import { Features } from '@/components/Features';
import { CTA } from '@/components/CTA';
import { Testimonials } from '@/components/Testimonials';

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-gray-900 text-gray-100">
        <UserInfo />
        <Features />
        <Testimonials />
        <CTA />
        <Footer />
      </div>
    </>
  );
}
