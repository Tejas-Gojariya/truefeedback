import React from 'react'
import { Twitter, Github } from 'lucide-react';

const Footer = () => {
    return (
        <div className='text-start flex justify-between p-6 bg-gray-900 text-gray-400 text-sm'>
            <div className=''>
                © 2025 True Feedback. All rights reserved.
            </div>
            <div className="sm:flex sm:items-center sm:justify-between">
                <div className="flex mt-4 sm:justify-center sm:mt-0">
                    <a href="#" target='_blank' className="text-gray-500 hover:text-gray-600 dark:hover:text-white ms-5">
                        <Twitter className='w-5 h-5' />
                        <span className="sr-only">Twitter page</span>
                    </a>
                    <a href="https://github.com/Tejas-Gojariya" target='_blank' className="text-gray-500 hover:text-gray-600 dark:hover:text-white ms-5">
                        <Github className='w-5 h-5' />
                        <span className="sr-only">GitHub account</span>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Footer