'use client';

import { useEffect, useState } from 'react';
import { HomeIcon, MoveLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
    const [stars, setStars] = useState<{ top: string; left: string; delay: string; duration: string }[]>([]);

    useEffect(() => {
        setStars([...Array(30)].map(() => ({
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            delay: `${Math.random() * 3}s`,
            duration: `${1 + Math.random() * 2}s`,
        })));
    }, []);

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#030014] p-4 relative overflow-hidden">
            {/* Space background */}
            <div className="absolute inset-0 bg-cover bg-center opacity-20"
                style={{ backgroundImage: "url('/space-bg.jpg')" }}
            />

            {/* Animated nebula effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-[500px] h-[500px] bg-purple-500/10 rounded-full -top-40 -left-40 blur-3xl animate-pulse" />
                <div className="absolute w-[500px] h-[500px] bg-blue-500/10 rounded-full -bottom-40 -right-40 blur-3xl animate-pulse delay-1000" />
            </div>

            <div className="max-w-4xl w-full flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
                {/* Left side content */}
                <div className="flex-1 space-y-8 text-center lg:text-left">
                    <div className="space-y-4">
                        <h1 className="text-8xl md:text-9xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient">
                            404
                        </h1>
                        <h2 className="text-2xl md:text-3xl font-bold text-white/90">
                            Lost in Deep Space
                        </h2>
                        <p className="text-gray-400 text-sm md:text-base max-w-md mx-auto lg:mx-0">
                            Houston, we have a problem! The page you're looking for has drifted into a digital black hole.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                        <Link
                            href="/"
                            className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all duration-200 gap-2 hover:gap-3 group"
                        >
                            <HomeIcon className="w-4 h-4" />
                            <span>Return Home</span>
                        </Link>
                        <button
                            onClick={() => {
                                if (typeof window !== "undefined") window.history.back();
                            }}
                            className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all duration-200 gap-2 hover:gap-3 backdrop-blur-sm"
                        >
                            <MoveLeft className="w-4 h-4" />
                            <span>Go Back</span>
                        </button>
                    </div>
                </div>

                {/* Right side illustration */}
                <div className="relative w-full max-w-sm lg:max-w-md aspect-square">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-3xl animate-pulse" />
                    <Image
                        src="/404.jpeg"
                        alt="Lost astronaut floating in space"
                        fill
                        className="object-cover rounded-2xl shadow-2xl"
                        priority
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-[#030014]/90 to-transparent" />

                    {/* Floating elements */}
                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-blue-500/20 rounded-full animate-pulse" />
                    <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-purple-500/20 rounded-full animate-pulse delay-300" />
                </div>
            </div>

            {/* Animated stars */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {stars.map((star, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
                        style={{
                            top: star.top,
                            left: star.left,
                            animationDelay: star.delay,
                            animationDuration: star.duration,
                        }}
                    />
                ))}
            </div>
        </div>
    );
}