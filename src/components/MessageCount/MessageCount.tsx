'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Header from "./Header"
import Loader from "../../utils/Loader"
// import ErrorDisplay from './ErrorDisplay';
import MessageCountDisplay from './MessageCountDisplay';
import Unauthenticated from './Unauthenticated';

const MessageCount = () => {
  const { data: session } = useSession();

  const [messageCount, setMessageCount] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchMessageCount = async (): Promise<number | null> => {
    try {
      const response = await fetch('/api/get-profile', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        console.error('Failed to fetch message count:', response.statusText);
        return null;
      }

      const data = await response.json();
      return data.success ? data.messageCount : null;
    } catch (error) {
      console.error('Unexpected error:', error);
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

  if (!session) return <Unauthenticated />;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <Header user={session?.user} />
      {loading ? (
        <Loader />
      ) : messageCount !== null ? (
        <MessageCountDisplay count={messageCount} />
      ) : (
        < message="Failed to load message count." />
      )}
    </div>
  );
};

export default MessageCount;
