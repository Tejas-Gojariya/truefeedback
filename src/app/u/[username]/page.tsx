'use client';

import React, { useState, useEffect, useCallback } from 'react';
import axios, { AxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Loader2, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CardHeader, CardContent, Card } from '@/components/ui/card';
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
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';



export default function SendMessage() {
  const [rating, setRating] = useState<number | null>(null);
  const params = useParams<{ username: string }>();
  const username = params.username;
  const [isSuggestLoading, setIsSuggestLoading] = useState(false);
  const [suggestedMessages, setSuggestedMessages] = useState<{ messageId: string, messageText: string }[]>([]);
  const [category, setCategory] = useState("");

  const fetchSuggestedMessages = useCallback(async () => {
    setIsSuggestLoading(true);
    try {
      const response = await axios.post('/api/suggest-messages');
      setSuggestedMessages(response.data.suggestions);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast({
        title: 'Error',
        description: 'Error fetching suggested messages',
        variant: 'destructive',
      });
    } finally {
      setIsSuggestLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSuggestedMessages();
  }, [fetchSuggestedMessages]);

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
        rating,
        category
      });

      toast({
        title: response.data.message,
        variant: 'default',
      });
      form.reset({ ...form.getValues(), content: '', });
      setRating(null);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: 'Error',
        description: axiosError.response?.data.message ?? 'Failed to send message',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto my-4 px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="p-6 sm:p-8 md:p-10 bg-gray-800 rounded-xl shadow-xl max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white mb-8">
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
                      className="w-full p-4 bg-gray-700 text-white rounded-md border border-gray-600 focus:ring-2 focus:ring-purple-500 focus:outline-none resize-none"
                      {...field}
                    />
                  </FormControl>
                  <div className="mt-6 p-6 bg-gray-800 rounded-lg border-2 border-gray-600">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                      <p className="text-sm font-medium text-gray-400">Feedback Rating</p>
                      <div className="flex flex-row sm:flex-row justify-center gap-3 w-full sm:w-auto">
                        {[...Array(5)].map((_, index) => (
                          <Button
                            key={index + 1}
                            onClick={() => setRating(index + 1)}
                            className={`p-3.5 rounded-full text-xl font-bold ${rating === index + 1
                              ? 'bg-gray-600 text-white'
                              : 'bg-gray-600 text-gray-300'
                              } hover:bg-gray-500 transition-all w-12 h-12 sm:w-12 sm:h-12`}
                          >
                            {index + 1}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className='text-white'>Select Category</span>
                  {/* Replace the above select with ShadCN Select */}
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="block w-full mt-1 border-gray-300 rounded-md shadow-sm">
                      <SelectValue placeholder="Select a Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Suggestions">Suggestions</SelectItem>
                      <SelectItem value="Bugs">Bugs</SelectItem>
                      <SelectItem value="success">Success</SelectItem>
                      <SelectItem value="Questions">Questions</SelectItem>
                      <SelectItem value="Genral Feedbacks">General Feedbacks</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center">
              <Button
                type="submit"
                disabled={isLoading || !messageContent}
                className="w-full sm:w-auto bg-purple-600 text-white hover:bg-purple-700 transition-all"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send It'
                )}
              </Button>
            </div>
          </form>
        </Form>
        <div className="my-8">
          <Card className="bg-gray-700">
            <CardHeader>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-200">
                Suggested Messages
              </h3>
            </CardHeader>
            <CardContent className="flex flex-col space-y-4">
              {suggestedMessages.length === 0 ? (
                <p className="text-slate-400 text-center">No suggestions available</p>
              ) : (
                suggestedMessages.map(({ messageId, messageText }) => {
                  return (
                    <div key={messageId} className="relative w-full">
                      <Button
                        variant="outline"
                        className="w-full px-4 py-2 text-gray-200 bg-gray-800 border border-gray-600 rounded-md hover:bg-gray-600"
                        onClick={() => handleMessageClick(messageText)}
                      >
                        <span className="block text-left whitespace-nowrap overflow-x-auto">
                          {messageText}
                        </span>
                      </Button>
                    </div>
                  );
                })
              )}
            </CardContent>
            <div className="text-center m-6">
              <Button
                onClick={fetchSuggestedMessages}
                className="w-full sm:w-auto bg-gray-900 text-gray-300 hover:bg-gray-600"
                disabled={isSuggestLoading}
              >
                {isSuggestLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    Suggest Messages <RefreshCcw className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </Card>
        </div>

        <Separator className="my-6" />
        <div className="text-center">
          <p className="text-lg sm:text-xl text-gray-300 mb-4">
            Get Your Message Board
          </p>
          <Link href="/sign-up">
            <Button className="bg-purple-600 text-white hover:bg-purple-700 transition-all">
              Create Your Account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
