import React from 'react'
import Link from 'next/link'
import SignInButton from './SignInButton'

const AppBar = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white font-bold text-xl">My App</div>
                <div className="space-x-4">
                    <Link href="/" className="text-white hover:text-gray-300">
                        Home
                    </Link>
                    <Link href="/posts" className="text-white hover:text-gray-300">
                        User Posts
                    </Link>
                    <SignInButton />
                </div>
            </div>
        </nav>
    )
}

export default AppBar
