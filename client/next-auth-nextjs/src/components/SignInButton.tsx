"use client";

import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'

const SignInButton = () => {
    const { data: session } = useSession()
    if (session && session.user) {
        return (
            <div className='flex gap-4 ml-auto'>
                <p className='text-sky-600'>{session.user.name}</p>
                <button className='bg-sky-600 text-white px-4 py-2 rounded-md' onClick={() => signOut()}>Sign Out</button>
            </div>
        )
    }
    return (
        <button className='bg-sky-600 text-white px-4 py-2 rounded-md' onClick={() => signIn()}>Sign In</button>
    )
}

export default SignInButton
