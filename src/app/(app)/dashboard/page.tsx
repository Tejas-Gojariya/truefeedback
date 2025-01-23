'use client';

import { MessageCard } from '@/components/MessageCard';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { Message } from '@/model/User';
import { ApiResponse } from '@/types/ApiResponse';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { Loader2, RefreshCcw } from 'lucide-react';
import { User } from 'next-auth';
import { useSession } from 'next-auth/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AcceptMessageSchema } from '@/schemas/acceptMessageSchema';
import { genratePDF } from '../../../helpers/pdfGenerator';
import { generateCSV } from '../../../helpers/csvGenerator';
import Link from 'next/link';
import ErrorMessage from '@/components/ErrorMessage';

function UserDashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);

  const { toast } = useToast();

  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter((message) => message._id !== messageId));
  };

  const { data: session } = useSession();

  const form = useForm({
    resolver: zodResolver(AcceptMessageSchema),
  });

  const { register, watch, setValue } = form;
  const acceptMessages = watch('acceptMessages');

  const fetchAcceptMessages = useCallback(async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.get<ApiResponse>('/api/accept-messages');
      setValue('acceptMessages', response.data.isAcceptingMessages);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: 'Error',
        description:
          axiosError.response?.data.message ??
          'Failed to fetch message settings',
        variant: 'destructive',
      });
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue, toast]);

  const fetchMessages = useCallback(
    async (refresh: boolean = false) => {
      setIsLoading(true);
      setIsSwitchLoading(false);
      try {
        const response = await axios.get<ApiResponse>('/api/get-messages');
        // console.log(response.data)
        setMessages(response.data.messages || []);
        if (refresh) {
          toast({
            title: 'Refreshed Messages',
            description: 'Showing latest messages',
          });
        }
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        toast({
          title: 'Error',
          description:
            axiosError.response?.data.message ?? 'Failed to fetch messages',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
        setIsSwitchLoading(false);
      }
    },
    [setIsLoading, setMessages, toast]
  );

  // Fetch initial state from the server
  useEffect(() => {
    if (!session || !session.user) return;

    fetchMessages();

    fetchAcceptMessages();
  }, [session, setValue, toast, fetchAcceptMessages, fetchMessages]);

  // Handle switch change
  const handleSwitchChange = async () => {
    try {
      const response = await axios.post<ApiResponse>('/api/accept-messages', {
        acceptMessages: !acceptMessages,
      });
      setValue('acceptMessages', !acceptMessages);
      toast({
        title: response.data.message,
        variant: 'default',
      });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: 'Error',
        description:
          axiosError.response?.data.message ??
          'Failed to update message settings',
        variant: 'destructive',
      });
    }
  };

  if (!session || !session.user) {
    return <div></div>;
  }

  const { username } = session.user as User;

  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const profileUrl = `${baseUrl}/u/${username}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    toast({
      title: 'URL Copied!',
      description: 'Profile URL has been copied to clipboard.',
    });
  };

  return (
    <div className="my-4 mx-2 sm:mx-4 md:mx-6 lg:mx-auto p-4 sm:p-6 md:p-8 bg-gray-800 text-gray-100 rounded-lg shadow-md w-full max-w-full md:max-w-6xl">
      <div className='flex justify-between items-center'>
        <h1 className="text-2xl sm:text-2xl lg:text-3xl pb-4 font-extrabold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text text-start">
          User Dashboard
        </h1>
        <Link href="/Profile">
          <Button className='font-semibold hover:bg-slate-900'>Profile</Button>
        </Link>
      </div>


      {/* Unique Link Section */}
      <div className="mb-6">
        <h2 className="text-sm sm:text-base font-bold mb-2">Copy Your Unique Link</h2>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <input
            type="text"
            value={profileUrl}
            disabled
            className="w-full p-2 sm:p-3 bg-gray-700 text-gray-400 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <Button
            className="w-full sm:w-auto px-3 py-2 sm:px-4 sm:py-2 bg-purple-500 text-white hover:bg-purple-600 rounded-lg font-medium transition-all"
            onClick={copyToClipboard}
          >
            Copy
          </Button>
        </div>
      </div>

      {/* Export & Toggle Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center py-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 w-full sm:w-auto">
          <Button
            className="w-full sm:w-auto px-3 py-2 bg-gray-700 text-gray-300 hover:bg-gray-600 rounded-lg font-medium transition-all"
            onClick={() => genratePDF(messages, username)}
          >
            Export to PDF
          </Button>
          <Button
            className="w-full sm:w-auto px-3 py-2 bg-gray-700 text-gray-300 hover:bg-gray-600 rounded-lg font-medium transition-all"
            onClick={() => generateCSV(messages, username)}
          >
            Export to CSV
          </Button>
        </div>
        <div className="flex items-center gap-3 bg-gray-700 px-4 py-2 rounded-lg w-full sm:w-auto">
          <span className="text-xs sm:text-sm font-medium">
            Accept Messages: {acceptMessages ? 'On' : 'Off'}
          </span>
          <Switch
            {...register('acceptMessages')}
            checked={acceptMessages}
            onCheckedChange={handleSwitchChange}
            disabled={isSwitchLoading}
            className="bg-white rounded-full focus:ring-2 focus:ring-purple-500"
          />

        </div>
      </div>

      <Separator className="border-gray-600 my-4" />

      {/* Reviews Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
        <h3 className="text-base sm:text-lg font-semibold text-center sm:flex sm:text-left">
          Read your reviews
        </h3>
        <Button
          className="p-2 sm:p-3 bg-gray-700 text-gray-300 hover:bg-gray-600 rounded-lg transition-all w-full sm:w-auto"
          onClick={(e) => {
            e.preventDefault();
            fetchMessages(true);
          }}
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <RefreshCcw className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Messages Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {messages.length > 0 ? (
          messages.map((message) => (
            <MessageCard
              key={message._id}
              message={message}
              onMessageDelete={handleDeleteMessage}
            />
          ))
        ) : (
          <ErrorMessage />
        )}
      </div>
    </div>

  );
}

export default UserDashboard;
