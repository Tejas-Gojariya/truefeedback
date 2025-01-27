'use client';

import React, { useEffect, useState } from 'react';

const HeroSection = ({ children }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-gray-800 rounded-lg shadow-lg px-6 py-8 sm:px-10 sm:py-12 md:px-14 md:py-16 lg:px-20 lg:py-24">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            Simplify Your Feedback Collection
            </h2>
            <p className="text-gray-300 leading-relaxed">
            Collect feedback securely and privately, tailor your process to your needs, and access valuable insights to drive better decisions for your organization.
            </p>
            <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-300">
              “Anonymous feedback made easy, secure, and impactful.”
            </blockquote>
          </div>
          {/* Render children only on the client */}
          {isClient && <div className="relative">{children}</div>}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
