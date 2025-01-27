'use client';

import messages from '@/messages.json';
import Footer from '@/components/Footer';
import UserInfo from '@/components/UserInfo';
import { Shield, Users, Star, ArrowRight, Play } from 'lucide-react';
import { Features } from '@/components/features';
import { CTA } from '@/components/CTA';
import { Testimonials } from '@/components/testimonials';

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-gray-900 text-gray-100">
        {/* <div className=" space-y-16 relative max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto"> */}
        {/* Hero Section */}
        {/* <div className="text-center space-y-6">
            <h1 className="text-5xl font-extrabold pb-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text">
              Dive into the World of Anonymous Feedback
            </h1>
            <p className="text-lg text-blue-400 italic">
              True Feedback - Where your identity remains a secret.
            </p>
          </div> */}

        {/* Feedback Messages */}
        {/* <div className="grid sm:grid-cols-2 gap-6">
            {messages.map((item, index) => (
              <div key={index} className="flex h-auto">
                <div className="flex flex-col bg-white rounded-xl dark:bg-neutral-900">
                  <div className="flex-auto p-4 md:p-6">
                    <p className="text-base italic md:text-lg text-gray-800 dark:text-neutral-200">
                      {item.content}
                    </p>
                  </div>

                  <div className="p-4 bg-gray-100 rounded-b-xl md:px-7 dark:bg-neutral-800">
                    <div className="flex items-center gap-x-3">
                      <div className="grow">
                        <p className="text-sm sm:text-base font-semibold text-gray-800 dark:text-neutral-200">
                          {item.user}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-neutral-400">
                          {item.received}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div> */}
        <div className="relative overflow-hidden pt-40 pb-24">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/20 to-gray-900"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80')] opacity-5"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <div className="text-center">
              {/* <div className="inline-block mb-4">
                  <span className="bg-indigo-500/10 text-indigo-400 text-lg font-medium px-4 py-2 rounded-full border border-indigo-500/20">
                    Trusted by 10,000+ teams worldwide
                  </span>
                </div> */}
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                  {/* Transform Your Team's */}
                  Dive into the World of
                </span>
                <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-500">
                  {/* Communication Culture */}
                  Anonymous Feedback
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
                Create a space where ideas flow freely and feedback drives positive change.
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                  Your voice matters, your privacy is guaranteed.
                </span>
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 flex items-center gap-2 group shadow-lg shadow-indigo-500/25">
                  Get Started Free <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 rounded-xl text-lg font-semibold border border-gray-700 hover:bg-gray-800 transition-colors duration-200 flex items-center gap-2">
                  Watch Demo <Play className="w-5 h-5" />
                </button>
              </div>
              {/* <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                  <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700">
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <Shield className="w-8 h-8 text-indigo-400" />
                      <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                        Encrypted
                      </span>
                    </div>
                    <p className="text-gray-400 text-lg">End-to-end encryption for ultimate privacy</p>
                  </div>
                  <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700">
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <Users className="w-8 h-8 text-indigo-400" />
                      <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                        10k+ Users
                      </span>
                    </div>
                    <p className="text-gray-400 text-lg">Trusted by global teams</p>
                  </div>
                  <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700">
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <Star className="w-8 h-8 text-indigo-400" />
                      <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                        4.9/5 Rating
                      </span>
                    </div>
                    <p className="text-gray-400 text-lg">From 1,000+ reviews</p>
                  </div>
                </div> */}
              <UserInfo />

            </div>
          </div>
        </div>
        <Features />
        <Testimonials />
        <CTA />

        {/* Call to Action */}
        {/* <div className="flex justify-center">
            <button className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white text-lg font-medium rounded-lg shadow">
              See More
            </button>
          </div> */}

        {/* Metrics Section */}
        {/* <UserInfo /> */}
        {/* </div> */}
        <Footer />
      </div>
    </>
  );
}
