import Link from 'next/link';

const Unauthenticated = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
    <p className="text-lg font-semibold text-gray-300 mb-2">
      You are not logged in.
    </p>
    <p className="text-sm text-gray-400 mb-6">
      Please log in to access your account and view your dashboard.
    </p>
    <Link href="/sign-in">
      <button className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg transition transform hover:bg-blue-600 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300">
        Login
      </button>
    </Link>
  </div>
);

export default Unauthenticated;
