"use client";
import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowUpRight, Mail, Phone } from "lucide-react"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supportSchema } from "@/schemas/supportSchema";
import { z } from "zod";
import Link from 'next/link';

type SupportFormData = z.infer<typeof supportSchema>;

const Support = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SupportFormData>({
    resolver: zodResolver(supportSchema),
  });

  useEffect(() => {
    setLoading(false);
    setServerError("");
    setSuccess("");
  }, []);

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState("");

  const onSubmit = async (data: SupportFormData) => {
    setLoading(true);
    setServerError("");
    setSuccess("");

    try {
      const res = await fetch("/api/support", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.message || "Something went wrong");
      }

      setSuccess("Message sent successfully!");
      reset();
    } catch (err: any) {
      setServerError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Information Side */}
          <div className="space-y-8">
            <div className="space-y-1">
              <h1 className="text-[40px] leading-tight font-semibold text-white">Love to hear from you,</h1>
              <div className="flex items-center gap-2">
                <h2 className="text-[40px] leading-tight font-semibold text-white">Get in touch</h2>
                <span className="text-3xl">👋</span>
              </div>
            </div>
            <p className="text-gray-300 text-lg">
              Welcome to the support page of TrueFeedback. If you have any questions, issues, or feedback, we’re here to help! Below, you’ll find answers to common questions and ways to get in touch with our support team.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="bg-gray-800 p-3 rounded-full">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <Link href="https://mail.google.com/mail/?view=cm&fs=1&to=tejasgojariya036@gmail.com"
                  target="_blank" className="text-white">tejasgojariya036@gmail.com</Link>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2.5">
                <Label htmlFor="username" className="text-base font-normal text-gray-300">
                  Your name
                </Label>
                <Input
                  id="username"
                  defaultValue=""
                  {...register("username")}
                  placeholder="Enter your name"
                  className="h-14 bg-gray-800 border-gray-700 text-white placeholder-gray-500 rounded-lg focus:ring-gray-600 focus:border-gray-600"
                />
                {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
              </div>

              <div className="space-y-2.5">
                <Label htmlFor="email" className="text-base font-normal text-gray-300">
                  Your email
                </Label>
                <Input
                  id="email"
                  defaultValue=""
                  type="email"
                  {...register("email")}
                  placeholder="lorem@gmail.com"
                  className="h-14 bg-gray-800 border-gray-700 text-white placeholder-gray-500 rounded-lg focus:ring-gray-600 focus:border-gray-600"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>
            </div>

            <div className="space-y-2.5">
              <Label htmlFor="message" className="text-base font-normal text-gray-300">
                Message
              </Label>
              <Textarea
                id="message"
                defaultValue=""
                {...register("message")}
                placeholder="Let us know about your project"
                className="min-h-[150px] bg-gray-800 border-gray-700 text-white placeholder-gray-500 rounded-lg focus:ring-gray-600 focus:border-gray-600 resize-none"
              />
              {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
            </div>

            {serverError && <p className="text-red-500 font-medium text-start">{serverError}</p>}
            {success && <p className="text-green-500 font-medium text-start">{success}</p>}

            <Button
              type="submit"
              className="w-full h-14 bg-white hover:bg-gray-100 text-gray-900 rounded-lg text-base font-medium"
              disabled={loading}
            >
              {loading ? "Sending..." : "Just Send"}
              <ArrowUpRight className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Support