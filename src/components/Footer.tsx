import React from 'react'
import { Twitter, Github } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-gray-400 text-sm py-6">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
                {/* Copyright Section */}
                <div className="text-center md:text-left mb-4 md:mb-0">
                    <p className="text-gray-300">
                        © 2025 <span className="font-semibold text-gray-100">True Feedback</span>. All rights reserved.
                    </p>
                </div>

                {/* Social Media Links */}
                <div className="flex space-x-6">
                    <a
                        href="#"
                        target="_blank"
                        className="text-gray-400 hover:text-pink-500 transition-colors duration-300"
                        aria-label="Twitter"
                    >
                        <Twitter className="w-6 h-6" />
                    </a>
                    <a
                        href="https://github.com/Tejas-Gojariya"
                        target="_blank"
                        className="text-gray-400 hover:text-purple-500 transition-colors duration-300"
                        aria-label="GitHub"
                    >
                        <Github className="w-6 h-6" />
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer