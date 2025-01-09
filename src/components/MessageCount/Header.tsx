'use client'
import React from 'react'
import { signOut } from 'next-auth/react'
import { User } from "next-auth";

interface HeaderProps {
    user: User | undefined;
}

const Header = ({ user }: HeaderProps) => {
    return (
        <header className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4 sm:gap-0">
            {/* User Greeting */}
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <h1 className="text-2xl sm:text-2xl lg:text-3xl pb-4 font-extrabold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text text-start">
                    Welcome, {user?.username || user?.email || 'User'}
                </h1>
                <p className="text-lg text-blue-400 italic">
                    You’re logged in! 🎉
                </p>
            </div>

            {/* Logout Button */}
            <button
                onClick={() => signOut()}
                className="px-5 py-2 bg-red-500 text-white text-sm font-medium rounded-lg shadow hover:bg-red-600 transition-colors duration-200 ease-in-out sm:self-start"
            >
                Logout
            </button>
        </header>
    )
}

export default Header