// 'use client';

// import React from 'react';

// const HeroSection = ({ children }) => (
//   <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
//     <div className="max-w-screen-xl mx-auto p-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-gray-800 rounded-lg shadow-lg p-10">
//         {/* Left Section */}
//         <div className="space-y-6">
//           <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
//             Anonymous Feedback Dashboard for 2025
//           </h2>
//           <p className="text-gray-300 leading-relaxed">
//             Manage feedback securely and effortlessly. Customize your feedback workflow, analyze data, and export insights seamlessly to improve your decision-making process.
//           </p>

//           <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-300">
//             “The perfect solution for collecting and managing feedback anonymously and efficiently.”
//           </blockquote>
//         </div>

//         {/* Right Section with children */}
//         <div className="relative">
//           {children}
//         </div>
//       </div>
//     </div>
//   </div>
// );

// export default HeroSection;

'use client';

import React, { useEffect, useState } from 'react';

const HeroSection = ({ children }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensure client-specific rendering
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
      <div className="max-w-screen-xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-gray-800 rounded-lg shadow-lg p-10">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              Anonymous Feedback Dashboard for 2025
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Manage feedback securely and effortlessly. Customize your feedback workflow, analyze data, and export insights seamlessly to improve your decision-making process.
            </p>
            <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-300">
              “The perfect solution for collecting and managing feedback anonymously and efficiently.”
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
