'use client';

import { ApiResponse } from '@/types/ApiResponse';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDebounce } from 'usehooks-ts';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import axios, { AxiosError } from 'axios';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signUpSchema } from '@/schemas/signUpSchema';
import HeroSection from '@/components/HeroSection';

export default function SignUpForm() {
  const [username, setUsername] = useState('');
  const [usernameMessage, setUsernameMessage] = useState('');
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const debouncedUsername = useDebounce(username, 300);

  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (debouncedUsername) {
        setIsCheckingUsername(true);
        setUsernameMessage(''); // Reset message
        try {
          const response = await axios.get<ApiResponse>(
            `/api/check-username-unique?username=${debouncedUsername}`
          );
          setUsernameMessage(response.data.message);
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          setUsernameMessage(
            axiosError.response?.data.message ?? 'Error checking username'
          );
        } finally {
          setIsCheckingUsername(false);
        }
      }
    };
    checkUsernameUnique();
  }, [debouncedUsername]);

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post<ApiResponse>('/api/sign-up', data);

      toast({
        title: 'Success',
        description: response.data.message,
      });

      router.replace(`/verify/${username}`);

      setIsSubmitting(false);
    } catch (error) {
      console.error('Error during sign-up:', error);

      const axiosError = error as AxiosError<ApiResponse>;

      // Default error message
      let errorMessage = axiosError.response?.data.message;
      ('There was a problem with your sign-up. Please try again.');

      toast({
        title: 'Sign Up Failed',
        description: errorMessage,
        variant: 'destructive',
      });

      setIsSubmitting(false);
    }
  };

  return (
    <HeroSection>
      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className='lg:max-w-lg lg:mx-auto lg:me-0 ms-auto'>
            <div className='p-4 sm:p-7 flex flex-col bg-neutral-900 rounded-2xl shadow-lg'>
              <div className="text-center">
                <h1 className="block text-2xl font-bold text-gray-200">Start your free trial</h1>
                <p className="mt-2 text-sm text-gray-500">
                  Set up New Account &nbsp;
                  <a
                    className="text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium"
                    href="/sign-up"
                  >
                    Sign up here
                  </a>
                </p>
              </div>

              <div className='mt-5 text-white'>

                <FormField
                  name="username"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className='pb-5'>
                      <FormLabel>Username</FormLabel>
                      <Input
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          setUsername(e.target.value);
                        }}
                        className='text-gray-300 bg-transparent border-gray-500'
                      />
                      {isCheckingUsername && <Loader2 className="animate-spin" />}
                      {!isCheckingUsername && usernameMessage && (
                        <p
                          className={`text-sm ${usernameMessage === 'Username is unique'
                            ? 'text-green-500'
                            : 'text-red-500'
                            }`}
                        >
                          {usernameMessage}
                        </p>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className='pb-5'>
                      <FormLabel>Email</FormLabel>
                      <Input {...field} name="email" className='text-gray-300 bg-transparent border-gray-500' />
                      <p className='text-gray-500 text-xs'>We will send you a verification code</p>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="password"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className='pb-10'>
                      <FormLabel>Password </FormLabel>
                      <Input type="password" {...field} name="password" className='text-gray-300 bg-transparent border-gray-500' />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className='w-full bg-gray-800 hover:bg-slate-700' disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    'Sign Up'
                  )}
                </Button>
              </div>


            </div>

          </div>

        </form>
      </Form>
    </HeroSection>
  );
}

