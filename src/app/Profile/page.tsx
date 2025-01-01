'use client'

import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { User } from 'next-auth';

const MessageCount = () => {
  const { data: session } = useSession();
  const user: User | undefined = session?.user;

  const [messageCount, setMessageCount] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchMessageCount = async (): Promise<number | null> => {
    try {
      const response = await fetch('/api/get-profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.error('Failed to fetch message count:', response.statusText);
        return null;
      }

      const data = await response.json();
      if (data.success) {
        return data.messageCount;
      } else {
        console.error('API error:', data.message);
        return null;
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      return null;
    }
  };

  useEffect(() => {
    if (session) {
      const getMessageCount = async () => {
        setLoading(true);
        const count = await fetchMessageCount();
        setMessageCount(count);
        setLoading(false);
      };

      getMessageCount();
    }
  }, [session]);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md border border-gray-200">
      {session ? (
        <>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-700">
                Welcome, {user?.name || user?.email || 'User'}
              </h2>
              <p className="text-sm text-gray-500">You’re logged in!</p>
            </div>
            <button
              onClick={() => signOut()}
              className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
            >
              Logout
            </button>
          </div>
          {loading ? (
            <div className="text-gray-500 text-center">Loading message count...</div>
          ) : messageCount !== null ? (
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800">{messageCount}</p>
              <p className="text-gray-500">Messages in your account</p>
            </div>
          ) : (
            <div className="text-center text-red-500">
              <p>Failed to load message count.</p>
            </div>
          )}
        </>
      ) : (
        <div className="text-center">
          <p className="text-gray-700 mb-4">You are not logged in.</p>
          <Link href="/sign-in">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600">
              Login
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MessageCount;


