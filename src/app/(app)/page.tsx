'use client';

import messages from '@/messages.json';
import Footer from '@/components/Footer';
import UserInfo from '@/components/UserInfo';

export default function Home() {
  return (
    <>
      <div className="bg-gray-900 text-gray-300 min-h-screen px-6 py-10  overflow-hidden ">
        <div className=" space-y-16 relative max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <h1 className="text-5xl font-extrabold pb-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text">
              Dive into the World of Anonymous Feedback
            </h1>
            <p className="text-lg text-blue-400 italic">
              True Feedback - Where your identity remains a secret.
            </p>
          </div>

          {/* Feedback Messages */}
          <div className="grid sm:grid-cols-2 gap-6">
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
          </div>

          {/* Call to Action */}
          <div className="flex justify-center">
            <button className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white text-lg font-medium rounded-lg shadow">
              See More
            </button>
          </div>

          {/* Metrics Section */}
          <UserInfo />
        </div>
      </div>
      <Footer />
    </>
  );
}
