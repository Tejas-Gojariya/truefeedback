'use client';

export default function About() {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center py-16 px-6 md:px-20">
      <div className="max-w-3xl text-center">
        <h1 className="text-5xl font-extrabold text-gray-100">About True Feedback</h1>
        <p className="mt-4 text-lg text-gray-400 leading-relaxed">
          True Feedback is a platform designed to facilitate open, honest, and anonymous communication.
          We provide individuals and organizations with the ability to share and receive constructive feedback
          without barriers, fostering a culture of transparency and growth.
        </p>
      </div>

      <div className="mt-12 max-w-4xl text-left">
        <h2 className="text-3xl font-bold text-gray-100 border-b border-gray-700 pb-2">Our Mission</h2>
        <p className="mt-3 text-lg text-gray-400 leading-relaxed">
          We strive to create an environment where feedback is valued and encouraged. Our goal is to remove the
          fear of judgment and enable people to express their thoughts freely while maintaining complete anonymity.
        </p>
      </div>

      {/* <div className="mt-10 max-w-4xl text-left">
        <h2 className="text-3xl font-bold text-gray-100 border-b border-gray-700 pb-2">Core Values</h2>
        <ul className="mt-3 space-y-4 text-lg text-gray-400 list-disc">
          <li><span className="font-semibold text-gray-200">Anonymity:</span> Users can share feedback without revealing their identity.</li>
          <li><span className="font-semibold text-gray-200">Transparency:</span> Open and honest communication fosters growth.</li>
          <li><span className="font-semibold text-gray-200">Security:</span> Data protection and privacy are our top priorities.</li>
          <li><span className="font-semibold text-gray-200">Simplicity:</span> A user-friendly interface ensures a seamless experience.</li>
        </ul>
      </div> */}

      <div className="mt-10 max-w-4xl text-left">
        <h2 className="text-3xl font-bold text-gray-100 border-b border-gray-700 pb-2">How It Works</h2>
        <p className="mt-3 text-lg text-gray-400 leading-relaxed">
          True Feedback allows users to submit feedback anonymously, ensuring honest opinions can be shared without
          concern. Organizations and individuals can review feedback, respond constructively, and implement meaningful
          improvements.
        </p>
      </div>

      <div className="mt-16 max-w-4xl text-left">
        <h2 className="text-3xl font-bold text-gray-100 border-b border-gray-700 pb-2">Frequently Asked Questions</h2>
        <div className="mt-5 space-y-6">
          <div className="bg-gray-800 p-5 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-200">Is my feedback truly anonymous?</h3>
            <p className="mt-2 text-gray-400">Yes! We ensure that all feedback remains anonymous and cannot be traced back to the sender.</p>
          </div>
          <div className="bg-gray-800 p-5 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-200">Who can use True Feedback?</h3>
            <p className="mt-2 text-gray-400">Anyone! Whether you're an individual, a team, or an organization, True Feedback is designed for everyone.</p>
          </div>
          <div className="bg-gray-800 p-5 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-200">How secure is my feedback?</h3>
            <p className="mt-2 text-gray-400">We use encryption and security best practices to protect all feedback shared on our platform.</p>
          </div>
        </div>
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-4xl font-bold text-gray-100">Be Part of the Change</h2>
        <p className="mt-3 text-lg text-gray-400">
          Join True Feedback today and contribute to a more open and constructive communication culture.
        </p>
        <button className="mt-6 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-xl shadow-md transition-all">
          Get Started
        </button>
      </div>
    </div>
  );
}
