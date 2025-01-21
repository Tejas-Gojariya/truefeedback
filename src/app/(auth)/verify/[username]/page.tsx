'use client';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { verifySchema } from "@/schemas/verifySchema";
import HeroSection from "@/components/HeroSection";

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
        title: "Success",
        description: response.data.message,
      });

      router.replace("/sign-in");
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Verification Failed",
        description:
          axiosError.response?.data.message ??
          "An error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <HeroSection>
      <div className="flex flex-col justify-center items-center text-white">
        <Card className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg shadow-lg border border-gray-700 bg-gray-900">
          {/* Header */}
          <CardHeader className="">
            <CardTitle className="text-center text-xl sm:text-2xl font-semibold text-gray-300">
              Verify Your Account
            </CardTitle>
            <CardDescription className="text-center text-sm sm:text-base text-gray-500">
              Enter the verification code sent to your email. Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, laudantium?
            </CardDescription>
          </CardHeader>

          {/* Form */}
          <CardContent className="p-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 sm:space-y-6"
              >
                <FormField
                  name="code"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white text-sm sm:text-base">
                        Verification Code
                      </FormLabel>
                      <Input
                        {...field}
                        placeholder="Enter 6-digit code"
                        maxLength={6}
                        className="text-center bg-gray-700 border-gray-600 text-white focus:border-blue-500"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md shadow transition-all duration-300"
                >
                  Verify
                </Button>
              </form>
            </Form>
          </CardContent>

          {/* Footer */}
          <CardFooter className="text-center p-4">
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
        </Card>
      </div>
    </HeroSection>
  );
}
