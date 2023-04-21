import React, { useState, useEffect } from 'react'
import { AiOutlineLoading } from 'react-icons/ai'
import { FaSignInAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

export default function LoginEmail() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [emailSent, setEmailSent] = useState(false)
    const navigate = useNavigate()
    const { user, signInEmail, resetPassword } = UserAuth()

    const handleSignIn = async (event) => {
        event.preventDefault()
        setLoading(true)
        await signInEmail(email, password, setLoading, setError)
    }

    const handleReset = (event) => {
        event.preventDefault()
        resetPassword(email, setEmailSent, setError)
    }

    useEffect(() => {
        if (user && user.emailVerified) {
            navigate('/')
        }
    }, [user])

    return (
        <div className='flex flex-col justify-start items-center bg-gradient-to-r from-gray-900 to-gray-700 text-gray-300 h-screen'>
            <div className='flex flex-row pt-20 lg:pl-60 lg:pr-60 pl-20 pr-20 justify-center sm:justify-start items-center transition transform duration-300 ease-in-out'>
                <h1 className='font-extrabold sm:text-3xl md:text-5xl text-xl'>Welcome Back.</h1>
            </div>
            <div className='pt-20 w-72 flex flex-col'>
                <div className='flex flex-col bg-gray-800 border border-gray-700 rounded justify-center items-center px-5 py-5 space-y-4'>
                    <input type='email' className='text-md w-full border-gray-700 focus:outline-none bg-gray-800/80 rounded-md px-2 py-2 border border-gray-700 focus:outline-gray-300' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    <input type='password' className='text-md w-full border-gray-700 focus:outline-none bg-gray-800/80 rounded-md px-2 py-2 border border-gray-700 focus:outline-gray-300' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    <div className='flex flex-row justify-center items-center border border-gray-700 rounded-md px-2 py-2 cursor-pointer hover:animate-pulse w-full' onClick={(event) => handleSignIn(event)}>
                        <button className='font-bold text-gray-300 pr-2'>Sign In</button>
                        {loading ? (
                            <AiOutlineLoading className='animate-spin' size={15}/>
                        ) : (
                            <FaSignInAlt/>
                        )}
                    </div>
                </div>
                {error && <div className='pt-5 pb-5 flex flex-col justify-center items-center'>
                                <h1 className='font-bold px-5 py-5 border border-gray-700 rounded-md text-xs text-gray-300'>
                                    There was an error completing your request.
                                </h1>
                            </div>}
                {emailSent && <div className='pt-5 pb-5 flex flex-col justify-center items-center'>
                    <h1 className='font-bold px-5 py-5 border border-gray-700 rounded-md text-xs text-gray-300'>
                        Password reset email sent.
                    </h1>
                </div>}
                <button className='justify-center items-center pt-2 text-sm text-gray-500 font-bold hover:scale-110 duration-200' onClick={(event) => handleReset(event)}>Forgot password?</button>
                <button className='justify-center items-center pt-2 text-sm text-gray-500 font-bold hover:scale-110 duration-200' onClick={() => navigate('/login')}>Back</button>
            </div>
        </div>
  )
}
