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
    <div>
      <Header user={session.user} />
      {isValidating ? (
        <Loader />
      ) : error ? (
        <ErrorDisplay message={error.message} />
      ) : (
        <MessageCountDisplay count={messageCount} />
      )}
      <ChangePassword />
    </div>
  )
}

export default MessageCount