'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { ApiResponse } from '@/types/ApiResponse';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { verifySchema } from '@/schemas/verifySchema';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import HeroSection from '@/components/HeroSection';

export default function VerifyAccount() {
  const router = useRouter();
  const params = useParams<{ username: string }>();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
  });

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    try {
      const response = await axios.post<ApiResponse>(`/api/verify-code`, {
        username: params.username,
        code: data.code,
      });

      toast({
        title: 'Success',
        description: response.data.message,
      });

      router.replace('/sign-in');
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: 'Verification Failed',
        description:
          axiosError.response?.data.message ??
          'An error occurred. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <HeroSection>
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-gray-900 to-black text-white p-4">
        <Card className="w-full max-w-sm md:max-w-md lg:max-w-lg shadow-lg border border-gray-800 rounded-lg bg-gray-800">
          {/* Header */}
          <CardHeader>
            <CardTitle className="text-center text-2xl font-semibold text-gray-300">
              Verify Your Account
            </CardTitle>
            <CardDescription className="text-center text-gray-500">
              Enter the verification code sent to your email.
            </CardDescription>
          </CardHeader>

          {/* Form */}
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 flex flex-col items-center text-white"
              >
                <FormField
                  name="code"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm md:text-base">
                        Verification Code
                      </FormLabel>
                      <div className="flex justify-center gap-2">
                        <InputOTP maxLength={6} lenght={6} {...field} className="w-full p-4 rounded-lg border-2 border-gray-600 focus:border-blue-500 text-center">
                          <InputOTPGroup className="flex justify-between gap-2">
                            <InputOTPSlot index={0} className="w-12 h-12 text-center bg-gray-700 rounded-lg" />
                            <InputOTPSlot index={1} className="w-12 h-12 text-center bg-gray-700 rounded-lg" />
                            <InputOTPSlot index={2} className="w-12 h-12 text-center bg-gray-700 rounded-lg" />
                          </InputOTPGroup>
                          <InputOTPSeparator className="my-2 text-gray-500" />
                          <InputOTPGroup className="flex justify-between gap-2">
                            <InputOTPSlot index={3} className="w-12 h-12 text-center bg-gray-700 rounded-lg" />
                            <InputOTPSlot index={4} className="w-12 h-12 text-center bg-gray-700 rounded-lg" />
                            <InputOTPSlot index={5} className="w-12 h-12 text-center bg-gray-700 rounded-lg" />
                          </InputOTPGroup>
                        </InputOTP>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg shadow-md transition-all duration-300"
                >
                  Verify
                </Button>
              </form>
            </Form>
          </CardContent>

          {/* Footer */}
          <CardFooter className="text-center">
            <p className="text-sm text-gray-500">
              Didn’t receive the code?{" "}
              <a
                href="#"
                className="text-blue-600 hover:underline font-medium"
              >
                Resend Code
              </a>
            </p>
          </CardFooter>

          {/* Separator */}
          <div className="flex items-center text-xs text-gray-400 uppercase px-4 py-4 space-x-2">
            <div className="flex-1 border-t border-gray-700" />
            <span>Or</span>
            <div className="flex-1 border-t border-gray-700" />
          </div>

          {/* Help and Feedback */}
          <div className="flex justify-center text-sm text-gray-500 space-x-4 pb-4">
            <a href="#" className="hover:underline">
              Need help?
            </a>
            <a href="#" className="hover:underline">
              Send feedback
            </a>
          </div>
        </Card>
      </div>
    </HeroSection>
  );
}
