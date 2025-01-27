import React from 'react'
import { Twitter, Github, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 py-16 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-3 gap-36">
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <span className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent mb-4 md:mb-0 hover:scale-105 transition-transform duration-300 ml-4">True Feedback</span>
                        </div>
                        <p className="text-gray-400 mb-6">Empowering teams with honest, anonymous feedback for better communication.</p>
                        <div className="flex gap-4">
                            <a href="#" className="text-gray-400 hover:text-indigo-500 transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="https://github.com/Tejas-Gojariya" target="_blank" aria-label="GitHub" className="text-gray-400 hover:text-indigo-500 transition-colors">
                                <Github className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-indigo-500 transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white mb-4">Product</h4>
                        <ul className="space-y-3 text-gray-400">
                            <li><a href="#" className="hover:text-indigo-400 transition-colors">Features</a></li>
                            <li><a href="#" className="hover:text-indigo-400 transition-colors">Pricing</a></li>
                            <li><a href="#" className="hover:text-indigo-400 transition-colors">Security</a></li>
                            <li><a href="#" className="hover:text-indigo-400 transition-colors">Enterprise</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white mb-4">Company</h4>
                        <ul className="space-y-3 text-gray-400">
                            <li><a href="#" className="hover:text-indigo-400 transition-colors">About</a></li>
                            <li><a href="#" className="hover:text-indigo-400 transition-colors">Support</a></li>
                            <li><a href="#" className="hover:text-indigo-400 transition-colors">Blog</a></li>
                            <li><a href="#" className="hover:text-indigo-400 transition-colors">Terms</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
                    <p>© 2025 Anonymous Feedback. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer