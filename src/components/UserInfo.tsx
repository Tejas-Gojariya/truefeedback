import React, { useEffect, useState } from "react";
import { ArrowRight, Play } from 'lucide-react';
import Link from "next/link";

interface UserData {
    userCount: number;
    totalMessages: number;
    satisfactionPercentage: number;
}

const UserInfo: React.FC = () => {
    const [data, setData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/api/count-information");
                if (!res.ok) {  
                    throw new Error("Failed to fetch user data");
                }
                const result: UserData = await res.json();
                setData(result);
            } catch (err: unknown) {
                setError("Failed to load data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div className="relative overflow-hidden pt-20 pb-0">
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/20 to-gray-900"></div>
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80')] opacity-5"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                    <div className="text-center">
                        <h1 className="text-5xl md:text-7xl font-bold mb-6">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                                Dive into the World of
                            </span>
                            <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-500">
                                Anonymous Feedback
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
                            Create a space where ideas flow freely and feedback drives positive change.
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                                Your voice matters, your privacy is guaranteed.
                            </span>
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                            <Link href="/sign-in">
                                <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 flex items-center gap-2 group shadow-lg shadow-indigo-500/25">
                                    Get Started Free <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </Link>
                            <Link href="/demo">
                                <button className="px-8 py-4 rounded-xl text-lg font-semibold border border-gray-700 hover:bg-gray-800 transition-colors duration-200 flex items-center gap-2">
                                    Watch Demo <Play className="w-5 h-5" />
                                </button>
                            </Link>
                        </div>

                        {/* Stats Section */}
                        <div className="mt-20 grid gap-6 grid-cols-2 sm:gap-12 lg:grid-cols-3 lg:gap-8">
                            {loading ? (
                                // Skeleton UI while loading
                                Array(3).fill(0).map((_, index) => (
                                    <div key={index} className="animate-pulse">
                                        <div className="h-6 w-32 bg-gray-700 rounded mb-3"></div>
                                        <div className="h-10 w-24 bg-gray-800 rounded"></div>
                                        <div className="h-4 w-36 bg-gray-700 rounded mt-2"></div>
                                    </div>
                                ))
                            ) : (
                                <>
                                    {/* Total Feedback */}
                                    <div>
                                        <h4 className="text-lg sm:text-xl font-semibold text-white">Total Feedback</h4>
                                        <p className="mt-2 sm:mt-3 text-4xl sm:text-6xl font-bold text-blue-500">
                                            {data?.totalMessages || 0}+
                                        </p>
                                        <p className="mt-1 text-gray-400">Anonymous feedback collected</p>
                                    </div>

                                    {/* Active Users */}
                                    <div>
                                        <h4 className="text-lg sm:text-xl font-semibold text-white">Active Users</h4>
                                        <p className="mt-2 sm:mt-3 text-4xl sm:text-6xl font-bold text-blue-500">
                                            {data?.userCount || 0}+
                                        </p>
                                        <p className="mt-1 text-gray-400">Users actively engaging</p>
                                    </div>

                                    {/* Satisfaction Rate */}
                                    <div>
                                        <h4 className="text-lg sm:text-xl font-semibold text-white">Satisfaction Rate</h4>
                                        <p className="mt-2 sm:mt-3 text-4xl sm:text-6xl font-bold text-blue-500">
                                            {data?.satisfactionPercentage || 0}%
                                        </p>
                                        <p className="mt-1 text-gray-400">Positive feedback this year</p>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Error Message */}
                        {error && <p className="mt-6 text-red-500 text-lg">{error}</p>}
                    </div>
                </div>
            </div>
        </>
    );
};
export default UserInfo;