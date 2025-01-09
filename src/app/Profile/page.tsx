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
import UserProfile from '@/components/MessageCount/UserProfile';

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
      <div className="my-4 mx-2 sm:mx-4 md:mx-6 lg:mx-auto p-4 sm:p-6 md:p-8 bg-gray-800 text-gray-100 rounded-lg shadow-md w-full max-w-full md:max-w-6xl">
        <Header user={session.user} />
        {isValidating ? (
          <Loader />
        ) : error ? (
          <ErrorDisplay message={error.message} />
        ) : (
          <MessageCountDisplay count={messageCount} />
        )}
        <div className='flex justify-between items-center'>
          {/* <h1 className="text-2xl sm:text-2xl lg:text-3xl pb-4 font-extrabold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text text-start">
            User Dashboard
          </h1> */}
          {/* <p href="/Profile">
            <button className='font-semibold'>Profile</button>
          </p> */}
        </div>
        {/* <UserProfile /> */}
        <ChangePassword />
      </div>
    </>
  )
}

export default MessageCount