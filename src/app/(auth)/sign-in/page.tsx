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
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function SignInForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  }

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
            <div className="max-w-md mx-auto p-6 sm:p-6 md:p-8 bg-gray-900 rounded-2xl shadow-lg">
              <div className="text-center mb-6">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">Welcome Back 👋</h1>
                <p className="mt-2 text-sm md:text-base text-gray-400">
                  Don't have an account yet?&nbsp;
                  <a
                    className="text-blue-500 hover:underline focus:outline-none"
                    href="/sign-up"
                  >
                    Sign Up
                  </a>
                </p>
              </div>

              <div className="space-y-4">
                {/* Google Sign-In Button */}
                {/* <button
                  type="button"
                  className="w-full py-2 sm:py-3 px-4 inline-flex justify-center items-center gap-x-3 text-sm md:text-base font-medium rounded-lg border border-gray-700 bg-gray-800 text-gray-200 shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <svg
                    className="w-4 sm:w-5 h-auto"
                    width="46"
                    height="47"
                    viewBox="0 0 46 47"
                    fill="none"
                  >
                  </svg>
                  Sign in with Google
                </button> */}

                {/* Or Divider */}
                {/* <div className="py-3 flex items-center text-xs text-gray-500 uppercase before:flex-1 before:border-t before:border-gray-200 before:mr-4 sm:before:mr-6 after:flex-1 after:border-t after:border-gray-200 after:ml-4 sm:after:ml-6">
                  Or
                </div> */}

                {/* Email/Username Field */}
                <FormField
                  name="identifier"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="pb-4">
                      <FormLabel className="text-sm text-gray-300">Email/Username</FormLabel>
                      <Input
                        className="w-full p-2 sm:p-3 text-gray-300 bg-transparent border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500"
                        {...field}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password Field */}
                <FormField
                  name="password"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="pb-6 relative">
                      <FormLabel className="text-sm text-gray-300">Password</FormLabel>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          className="w-full p-2 sm:p-3 text-gray-300 bg-transparent border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                        >
                          {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                        </button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                >
                  Sign In
                </Button>
              </div>
            </div>
          </form>
        </Form>

      </HeroSection>
    </>
  )
}
