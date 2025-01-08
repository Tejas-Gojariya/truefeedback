'use client'
import React from 'react'
import { signOut } from 'next-auth/react'
import { User } from "next-auth";

interface HeaderProps {
    user: User | undefined;
}

const Header = ({ user }: HeaderProps) => {
    return (
        <div>
            <div>
                <h2>
                    Welcome, {user?.name || user?.email || 'User'}
                </h2>
                <p>You're logged in!</p>
            </div>
            <button
                onClick={() => signOut()}
                className=""
            >
                Logout
            </button>
            {/* <button className='' onClick={() => signOut}>Logout</button> */}
        </div>
    )
}

export default Header