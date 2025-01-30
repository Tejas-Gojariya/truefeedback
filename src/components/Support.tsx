"use client"
import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowUpRight, Mail, Phone } from "lucide-react"

const Support = () => {
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
              Have a project in mind or just want to say hello? We'd love to hear from you. Fill out the form, and we'll
              get back to you as soon as possible.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="bg-gray-800 p-3 rounded-full">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <span className="text-white">hello@example.com</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-gray-800 p-3 rounded-full">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <span className="text-white">+1 (555) 123-4567</span>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <form className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2.5">
                <Label htmlFor="name" className="text-base font-normal text-gray-300">
                  Your name
                </Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  className="h-14 bg-gray-800 border-gray-700 text-white placeholder-gray-500 rounded-lg focus:ring-gray-600 focus:border-gray-600"
                />
              </div>
              <div className="space-y-2.5">
                <Label htmlFor="email" className="text-base font-normal text-gray-300">
                  Your email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="lorem@gmail.com"
                  className="h-14 bg-gray-800 border-gray-700 text-white placeholder-gray-500 rounded-lg focus:ring-gray-600 focus:border-gray-600"
                />
              </div>
            </div>

            <div className="space-y-2.5">
              <Label htmlFor="message" className="text-base font-normal text-gray-300">
                Message
              </Label>
              <Textarea
                id="message"
                placeholder="Let tell us know your project about"
                className="min-h-[150px] bg-gray-800 border-gray-700 text-white placeholder-gray-500 rounded-lg focus:ring-gray-600 focus:border-gray-600 resize-none"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-14 bg-white hover:bg-gray-100 text-gray-900 rounded-lg text-base font-medium"
            >
              Just Send
              <ArrowUpRight className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Support