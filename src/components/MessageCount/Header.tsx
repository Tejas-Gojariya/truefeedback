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
                <h2 className="text-lg font-semibold text-gray-700">
                    Welcome, {user?.name || user?.email || 'User'}
                </h2>
                <p className="text-sm text-gray-500">
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