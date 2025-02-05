import React from 'react'
import Link from 'next/link';
import { FaXTwitter, FaGithub, FaLinkedinIn } from "react-icons/fa6";

const Footer = () => {
    return (
        <>
            <footer className=" rounded-lg shadow-sm bg-gray-900 m-4">
                <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <Link href="https://www.truefeedback.site/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                            <span className="self-center text-2xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 whitespace-nowrap dark:text-white">True Feedback</span>
                        </Link>
                        <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                            <li>
                                <Link href="/about" className="hover:underline me-4 md:me-6">About</Link>
                            </li>
                            <li>
                                <Link href="/terms" className="hover:underline me-4 md:me-6">Term</Link>
                            </li>
                            <li>
                                <Link href="/blog" className="hover:underline me-4 md:me-6">Blog</Link>
                            </li>
                            <li>
                                <Link href="/support" className="hover:underline">Support</Link>
                            </li>
                        </ul>
                    </div>
                    <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />

                    <div className="sm:flex sm:items-center sm:justify-between">
                        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2025 <Link href="#" className="hover:underline">True Feedback</Link>. All Rights Reserved.
                        </span>
                        <div className="flex mt-4 sm:justify-center sm:mt-0">
                            <Link href="https://x.com/Tejas_Gojariya" target='_blank' className="text-gray-400 hover:text-indigo-500 transition-colors ms-5">
                                <FaXTwitter />
                                <span className="sr-only">Twitter page</span>
                            </Link>
                            <Link href="https://github.com/Tejas-Gojariya/" target='_blank' className="text-gray-400 hover:text-indigo-500 transition-colors ms-5">
                                <FaGithub />
                                <span className="sr-only">GitHub account</span>
                            </Link>
                            <Link href="https://www.linkedin.com/in/tejas-gojariya/" target='_blank' className="text-gray-400 hover:text-indigo-500 transition-colors ms-5">
                                <FaLinkedinIn />
                                <span className="sr-only">Dribbble account</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer