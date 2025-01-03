'use client';

import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CardHeader, CardContent, Card } from '@/components/ui/card';
import { useCompletion } from 'ai/react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import * as z from 'zod';
import { ApiResponse } from '@/types/ApiResponse';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { messageSchema } from '@/schemas/messageSchema';

const specialChar = '||';

const parseStringMessages = (messageString: string): string[] => {
  return messageString.split(specialChar);
};

const initialMessageString =
  "What's your favorite movie?||Do you have any pets?||What's your dream job?";

export default function SendMessage() {
  const [rating, setRating] = useState<number | null>(null)
  const params = useParams<{ username: string }>();
  const username = params.username;

  const {
    complete,
    completion,
    isLoading: isSuggestLoading,
    error,
  } = useCompletion({
    api: '/api/suggest-messages',
    initialCompletion: initialMessageString,
  });

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
  });

  const messageContent = form.watch('content');

  const handleMessageClick = (message: string) => {
    form.setValue('content', message);
  };

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    setIsLoading(true);
    try {
      const response = await axios.post<ApiResponse>('/api/send-message', {
        ...data,
        username,
        rating // include the rating
      });

      toast({
        title: response.data.message,
        variant: 'default',
      });
      form.reset({ ...form.getValues(), content: '' });
      setRating(null) // reset the rating after submission
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: 'Error',
        description:
          axiosError.response?.data.message ?? 'Failed to sent message',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSuggestedMessages = async () => {
    try {
      complete('');
    } catch (error) {
      console.error('Error fetching messages:', error);
      // Handle error appropriately
    }
  };

  return (
    <div className="container mx-auto my-8 p-6 sm:p-8 md:p-10 bg-gray-800 rounded-xl shadow-xl max-w-4xl">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-white">
        Public Profile Link
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-medium text-gray-300">
                  Send Anonymous Message to @{username}
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your anonymous message here"
                    className="resize-none w-full p-4 bg-gray-700 text-white rounded-md border border-gray-600 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    {...field}
                  />
                </FormControl>

                {/* Feedback Rating Section */}
                <div className="mt-6 p-6 bg-gray-800 rounded-lg border-2 border-gray-600">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm font-medium text-gray-400">Feedback Rating</p>
                    {[...Array(5)].map((_, index) => (
                      <Button
                        key={index + 1}
                        onClick={() => setRating(index + 1)}
                        className={`p-3.5 rounded-full text-xl font-bold ${rating === index + 1
                          ? 'bg-gray-600 text-white'
                          : 'bg-gray-600 text-gray-300'
                          } hover:bg-gray-500 transition-all`}
                      >
                        {index + 1}
                      </Button>
                    ))}
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-center">
            {isLoading ? (
              <Button disabled className="flex items-center justify-center bg-gray-700 text-gray-400">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" disabled={isLoading || !messageContent} className="mt-4 bg-purple-600 text-white hover:bg-purple-700 transition-all">
                Send It
              </Button>
            )}
          </div>
        </form>
      </Form>

      <div className="space-y-8 my-8">

        {/* Suggested Messages Section */}
        <Card className="bg-gray-700 border-none">
          <CardHeader>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-200">Suggested Messages</h3>
          </CardHeader>
          <CardContent className="flex flex-col space-y-4 bg-gray-700">
            {error ? (
              <p className="text-red-500 text-center">{error.message}</p>
            ) : (
              parseStringMessages(completion).map((message, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full hover:text-white sm:w-auto text-gray-200 border-gray-500 bg-gray-800 hover:bg-gray-600 border-none transition-all"
                  onClick={() => handleMessageClick(message)}
                >
                  {message}
                </Button>
              ))
            )}
          </CardContent>
          <div className="text-center space-y-4">
            <Button
              onClick={fetchSuggestedMessages}
              className="mb-5 w-full sm:w-auto bg-gray-900 text-gray-300 hover:bg-gray-600 transition-all"
              disabled={isSuggestLoading}
            >
              Generate Suggestions
            </Button>
          </div>
        </Card>
      </div>

      <Separator className="my-6 border-gray-600" />

      {/* Create Account Section */}
      <div className="text-center p-5 space-y-4 mx-5">
        <div className="text-lg sm:text-xl pb-5 text-gray-300">
          Get Your Message Board
        </div>
        <Link href="/sign-up">
          <Button className="w-full sm:w-auto bg-purple-600 text-white hover:bg-purple-700 transition-all">
            Create Your Account
          </Button>
        </Link>
      </div>
    </div>
  );
}
