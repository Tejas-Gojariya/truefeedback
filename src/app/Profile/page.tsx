'use client'

import useSWR from 'swr';
import { useSession } from 'next-auth/react';
import React from 'react'
import Header from "../../components/MessageCount/Header"
import Loader from '../../utils/Loader';
import ErrorDisplay from '../../components/MessageCount/ErrorDisplay';
import MessageCountDisplay from '../../components/MessageCount/MessageCountDisplay';
import Unauthenticated from "../../components/MessageCount/Unauthenticated"
import ChangePassword from "../../components/MessageCount/ChangePassword"
import Link from 'next/link';

const fetcher = async (url: string) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });

  if (!response.ok) {
    throw new Error(`Error : ${response.statusText}`);
  }

  const data = await response.json();
  if (data.success) {
    return data.messageCount;
  } else {
    throw new Error(data.message || "Faild to fetch message count.");
  }
}

const MessageCount = () => {
  const { data: session } = useSession();

  const { data: messageCount, error, isValidating } = useSWR(
    session ? "/api/get-profile" : null,
    fetcher
  );

  if (!session) return <Unauthenticated />

  return (
    <>
      <Link className='text-white flex justify-end p-4' href="/dashboard">Back</Link>
      <div className="my-4 mx-2 sm:mx-4 md:mx-6 lg:mx-auto p-4 sm:p-6 md:p-8 bg-gray-800 text-gray-100 rounded-lg shadow-md w-full max-w-full md:max-w-6xl">
        <Header user={session.user} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {isValidating ? (
            <Loader />
          ) : error ? (
            <ErrorDisplay message={error.message} />
          ) : (
            <MessageCountDisplay count={messageCount} />
          )}
        </div>
        <ChangePassword />
      </div>
    </>
  )
}

export default MessageCount