'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { User } from 'next-auth'

const Navbar = () => {
  const { data: session } = useSession();
  const user: User = session?.user;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  return (
    <nav className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className='flex items-center justify-between h-16'>
          <div className='flex items-center gap-2'>
            {/* Logo */}
            <a
              href="#"
              className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent mb-4 md:mb-0 hover:scale-105 transition-transform duration-300 ml-4"
            >
              True Feedback
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="block md:hidden focus:outline-none text-white"
            aria-label="Toggle Menu"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>

          {/* Links */}
          <div
            className={`${isMenuOpen ? "block" : "hidden"
              } w-full md:flex md:items-center md:space-x-6 md:space-y-0 space-y-4 mt-4 md:mt-0 md:w-auto`}
          >
            {session ? (
              <>
                {/* User Greeting */}
                <span className="block text-sm font-medium text-gray-300 text-center md:text-left">
                  Welcome, {user.username || user.email}
                </span>
                {/* Logout Button */}
                <button
                  onClick={signOut}
                  className="block w-full md:w-auto px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg shadow-md transition-all duration-300 text-center"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* Login Button */}
                {/* <Link href="/sign-in">
                  <button className="block w-full md:w-auto px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg shadow-md transition-all duration-300 text-center">
                    Login
                  </button>
                </Link> */}
                <div className="hidden md:flex items-center gap-8 text-white">
                  <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
                  <a href="#testimonials" className="hover:text-indigo-400 transition-colors">Testimonials</a>
                  {/* <a href="#pricing" className="hover:text-indigo-400 transition-colors">Pricing</a> */}
                  {/* <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                    Sign In
                  </button> */}
                  <Link href="/sign-in">
                    <button className="block w-full md:w-auto px-6 py-2 bg-blue-900 hover:bg-blue-600 text-white rounded-lg shadow-md transition-all duration-300 text-center">
                      Login
                    </button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar