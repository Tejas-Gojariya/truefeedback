'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { User } from 'next-auth'
import { CiMenuFries } from "react-icons/ci"
import { RxCross2 } from "react-icons/rx"

const Navbar = () => {
  const { data: session } = useSession()
  const user: User = session?.user
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev)
  }

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300"
          >
            True Feedback
          </Link>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? (
                <RxCross2 className="h-6 w-6" />
              ) : (
                <CiMenuFries className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {session ? (
              <>
                <span className="text-sm font-medium text-gray-300">
                  Welcome, {user.username || user.email}
                </span>
                <button
                  onClick={signOut}
                  className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg shadow-md transition-all duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link href="/sign-in">
                <button className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg shadow-md transition-all duration-300">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-4">
          {session ? (
            <>
              <span className="block text-sm font-medium text-gray-300 text-center">
                Welcome, {user.username || user.email}
              </span>
              <button
                onClick={signOut}
                className="w-full px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg shadow-md transition-all duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/sign-in">
              <button className="w-full px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg shadow-md transition-all duration-300">
                Login
              </button>
            </Link>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar