'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { User } from 'next-auth'
import { CiMenuFries } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";

const Navbar = () => {
  const { data: session } = useSession();
  const user: User = session?.user;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  return (
    <nav className="p-4 flex md:p-6 bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg text-white">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        {/* Logo */}
        <Link
          href="#"
          className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent mb-0 md:mb-0 hover:scale-105 transition-transform duration-300 ml-4"
        >
          True Feedback
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="block md:hidden focus:outline-none text-white"
          aria-label="Toggle Menu"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <RxCross2 className="w-6 h-6" />
          ) : (
            <CiMenuFries className="w-6 h-6" />
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
              <Link href="/sign-in">
                <button className="block w-full md:w-auto px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg shadow-md transition-all duration-300 text-center">
                  Login
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar