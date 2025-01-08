import Link from 'next/link';

const Unauthenticated = () => (
  <div className="text-center">
    <p className="text-gray-700 mb-4">You are not logged in.</p>
    <Link href="/sign-in">
      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600">
        Login
      </button>
    </Link>
  </div>
);

export default Unauthenticated;
