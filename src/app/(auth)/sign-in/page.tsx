'use client'

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { signIn } from 'next-auth/react';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { signInSchema } from '@/schemas/signInSchema';
import HeroSection from '@/components/HeroSection';

export default function SignInForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const { toast } = useToast();
  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    const result = await signIn('credentials', {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    });

    if (result?.error) {
      if (result.error === 'CredentialsSignin') {
        toast({
          title: 'Login Failed',
          description: 'Incorrect username or password',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Error',
          description: result.error,
          variant: 'destructive',
        });
      }
    }

    if (result?.url) {
      router.replace('/dashboard');
    }
  };

  return (
    <>
      <HeroSection>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="lg:max-w-lg lg:mx-auto lg:me-0 ms-auto">
              <div className="p-4 sm:p-7 flex flex-col bg-neutral-900 rounded-2xl shadow-lg">
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

                <div className="mt-5 text-white">
                  <button
                    type="button"
                    className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-700 bg-gray-800 text-gray-200 shadow-sm hover:bg-gray-700 focus:outline-none focus:bg-gray-700 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    <svg
                      className="w-4 h-auto"
                      width="46"
                      height="47"
                      viewBox="0 0 46 47"
                      fill="none"
                    >
                      <path
                        d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z"
                        fill="#4285F4"
                      />
                      <path
                        d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z"
                        fill="#34A853"
                      />
                      <path
                        d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z"
                        fill="#EB4335"
                      />
                    </svg>
                    Sign up with Google
                  </button>

                  <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6">Or</div>

                  <FormField
                    name="identifier"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className='pb-5'>
                        <FormLabel>Email/Username</FormLabel>
                        <Input className='text-gray-300 bg-transparent border-gray-500' {...field} />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="password"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className='pb-10'>
                        <FormLabel>Password</FormLabel>
                        <Input className='text-gray-300 bg-transparent border-gray-500' type="password" {...field} />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button className='w-full bg-gray-800 hover:bg-slate-700' type="submit">Sign In</Button>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </HeroSection>
    </>
  )
}
