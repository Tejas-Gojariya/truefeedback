"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { ArrowRight, Copy, QrCode, Share2, Star, Link2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CardContent } from "@/components/ui/card"
import Image from "next/image"

export default function TrueFeedbackOverview() {
    const [scrollY, setScrollY] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <div className="min-h-screen text-gray-100">
            <main className="container py-12">
                {/* Hero Section */}
                <section className="mx-auto  max-w-5xl">
                    <h1 className="animate-fade-in text-center text-4xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        How It Works
                    </h1>
                    <div className="mt-12 grid gap-8 md:grid-cols-3">
                        {[
                            {
                                title: "Create Account",
                                description: "Sign up in seconds with your email and get your personal feedback link",
                                icon: "🔐",
                            },
                            {
                                title: "Share Your Link",
                                description: "Share your unique feedback link or QR code with anyone you want feedback from",
                                icon: "🔗",
                            },
                            {
                                title: "Receive Feedback",
                                description: "Get anonymous, honest feedback with ratings and categories to help you improve",
                                icon: "📊",
                            },
                        ].map((step, index) => (
                            <AnimatedCard key={index} index={index}>
                                <CardContent className="p-6 bg-gray-800 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] h-full">
                                    <div className="mb-4 text-4xl">{step.icon}</div>
                                    <h3 className="mb-2 text-xl font-semibold text-white">{step.title}</h3>
                                    <p className="text-gray-400">{step.description}</p>
                                </CardContent>
                            </AnimatedCard>
                        ))}
                    </div>
                </section>

                {/* Main Feature Showcase */}
                <section className="mx-auto mt-20 max-w-6xl rounded-xl bg-gray-800 p-8 shadow-lg border border-gray-700 animate-on-scroll">
                    <div className="grid gap-8 md:grid-cols-2">
                        <div>
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                                Get Feedback From Anyone
                            </h2>
                            <p className="mt-4 text-lg text-gray-400">
                                Your personal feedback page makes it easy for others to share their thoughts anonymously.
                            </p>

                            <div className="mt-8 space-y-6">
                                <FeatureItem
                                    title="Personal Feedback Link"
                                    description="Share your unique URL with anyone to collect feedback"
                                    icon={<Share2 className="h-5 w-5 text-blue-500" />}
                                />

                                <FeatureItem
                                    title="Anonymous Responses"
                                    description="Encourage honest feedback without social barriers"
                                    icon={<Star className="h-5 w-5 text-yellow-500" />}
                                />

                                <FeatureItem
                                    title="Easy Sharing Options"
                                    description="Copy link, generate QR code, or share directly"
                                    icon={<QrCode className="h-5 w-5 text-green-500" />}
                                />
                            </div>

                            <div className="mt-8">
                                <Button
                                    size="lg"
                                    className="gap-2 bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 hover:gap-3"
                                >
                                    Create Your Feedback Page <ArrowRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="rounded-lg border border-gray-700 bg-gray-850 p-6 transition-all duration-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                            <div className="mb-4 flex items-center justify-between rounded-md bg-gray-900 p-3 shadow-sm border border-gray-700">
                                <div className="flex items-center gap-2">
                                    <Link2 className="h-5 w-5 text-yellow-500" />
                                    <span className="font-medium text-gray-200"> Unique URL</span>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-8 bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white"
                                    >
                                        <Copy className="mr-1 h-4 w-4" /> Copy
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-8 bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white"
                                    >
                                        <QrCode className="mr-1 h-4 w-4" /> QR
                                    </Button>
                                </div>
                            </div>

                            <div className="rounded-lg border border-gray-700 bg-gray-900 p-6 shadow-sm">
                                <h3 className="mb-4 text-xl font-semibold text-white">Leave Feedback for John</h3>

                                <div className="space-y-4">
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-300">Your Message</label>
                                        <textarea
                                            className="min-h-[100px] w-full rounded-md border border-gray-700 bg-gray-800 p-2 text-sm text-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                            placeholder="Share your thoughts anonymously..."
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-300">Rating</label>
                                        <div className="flex gap-1">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <button key={i} className="rounded-md p-1 hover:text-yellow-500 transition-colors">
                                                    <Star className={`h-6 w-6 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-600"}`} />
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-300">Category</label>
                                        <select className="w-full rounded-md border border-gray-700 bg-gray-800 p-2 text-sm text-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors">
                                            <option>General Feedback</option>
                                            <option>Success</option>
                                            <option>Questions</option>
                                        </select>
                                    </div>

                                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-transform hover:scale-[1.02]">
                                        Submit Anonymous Feedback
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Dashboard Preview */}
                <section className="mx-auto mt-20 max-w-5xl animate-on-scroll">
                    <h2 className="text-center text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        Manage Your Feedback
                    </h2>
                    <p className="mt-4 text-center text-lg text-gray-400">
                        View, analyze, and export all the feedback you receive in one place
                    </p>

                    <div className="mt-8 overflow-hidden rounded-xl border border-gray-700 bg-gray-800 shadow-lg">
                        <div className="border-b border-gray-700 bg-gray-850 p-4">
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-white">Your Feedback Dashboard</h3>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white"
                                >
                                    Export Data
                                </Button>
                            </div>
                        </div>

                        <div className="grid gap-6 p-6 md:grid-cols-3">
                            <StatCard value="12" label="Total Responses" color="blue" />
                            <StatCard value="4.2" label="Average Rating" color="yellow" />
                            <StatCard value="3" label="Categories" color="green" />
                        </div>

                        <div className="border-t border-gray-700 p-6">
                            <h4 className="mb-4 font-medium text-white">Recent Feedback</h4>
                            <Image src="/review.png"
                                width={1000}
                                height={1200}
                                alt="reviewImage"
                            />
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

function FeatureItem({
    title,
    description,
    icon,
}: {
    title: string
    description: string
    icon: React.ReactNode
}) {
    return (
        <div className="flex gap-3 group">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-700 group-hover:bg-gray-600 transition-colors">
                {icon}
            </div>
            <div>
                <h3 className="font-medium text-white group-hover:text-blue-400 transition-colors">{title}</h3>
                <p className="text-sm text-gray-400">{description}</p>
            </div>
        </div>
    )
}

function AnimatedCard({ children, index }: { children: React.ReactNode; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.unobserve(entry.target)
                }
            },
            { threshold: 0.1 },
        )

        if (cardRef.current) {
            observer.observe(cardRef.current)
        }

        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current)
            }
        }
    }, [])

    return (
        <div
            ref={cardRef}
            className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            style={{ transitionDelay: `${index * 150}ms` }}
        >
            {children}
        </div>
    )
}

function StatCard({ value, label, color }: { value: string; label: string; color: "blue" | "yellow" | "green" }) {
    const colorClasses = {
        blue: "bg-blue-900/30 border-blue-800 text-blue-400",
        yellow: "bg-yellow-900/30 border-yellow-800 text-yellow-400",
        green: "bg-green-900/30 border-green-800 text-green-400",
    }

    return (
        <div className={`rounded-lg border p-4 text-center transition-transform hover:scale-105 ${colorClasses[color]}`}>
            <div className="text-3xl font-bold">{value}</div>
            <div className="mt-1 text-sm text-gray-400">{label}</div>
        </div>
    )
}