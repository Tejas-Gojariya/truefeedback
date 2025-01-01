// 'use client';

// import { Button } from '@/components/ui/button';
// import {
//   Form,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import { useToast } from '@/components/ui/use-toast';
// import { ApiResponse } from '@/types/ApiResponse';
// import { zodResolver } from '@hookform/resolvers/zod';
// import axios, { AxiosError } from 'axios';
// import { useParams, useRouter } from 'next/navigation';
// import { useForm } from 'react-hook-form';
// import * as z from 'zod';
// import { verifySchema } from '@/schemas/verifySchema';

// export default function VerifyAccount() {
//   const router = useRouter();
//   const params = useParams<{ username: string }>();
//   const { toast } = useToast();
//   const form = useForm<z.infer<typeof verifySchema>>({
//     resolver: zodResolver(verifySchema),
//   });

//   const onSubmit = async (data: z.infer<typeof verifySchema>) => {
//     try {
//       const response = await axios.post<ApiResponse>(`/api/verify-code`, {
//         username: params.username,
//         code: data.code,
//       });

//       toast({
//         title: 'Success',
//         description: response.data.message,
//       });

//       router.replace('/sign-in');
//     } catch (error) {
//       const axiosError = error as AxiosError<ApiResponse>;
//       toast({
//         title: 'Verification Failed',
//         description:
//           axiosError.response?.data.message ??
//           'An error occurred. Please try again.',
//         variant: 'destructive',
//       });
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
//         <div className="text-center">
//           <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
//             Verify Your Account
//           </h1>
//           <p className="mb-4">Enter the verification code sent to your email</p>
//         </div>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//             <FormField
//               name="code"
//               control={form.control}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Verification Code</FormLabel>
//                   <Input {...field} />
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <Button type="submit">Verify</Button>
//           </form>
//         </Form>
//       </div>
//     </div>
//   );
// }


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
} from "@/components/ui/input-otp" // Import the OTP input component

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
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold text-gray-800">
            Verify Your Account
          </CardTitle>
          <CardDescription className="text-center text-gray-600">
            Enter the verification code sent to your email.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                name="code"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Verification Code</FormLabel>
                    {/* <InputOTP
                      {...field}
                      length={6} // Number of OTP inputs
                      className="mt-1"
                    /> */}
                    <InputOTP maxLength={6} length={6} {...field} className="mt-1">
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Verify
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="text-center">
          <p className="text-sm text-gray-500">
            Didn’t receive the code?{' '}
            <a
              href="/resend-code"
              className="text-blue-600 hover:underline font-medium"
            >
              Resend Code
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
