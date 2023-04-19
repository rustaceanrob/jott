import React, { useState, useEffect } from 'react'
import { AiOutlineLoading } from 'react-icons/ai'
import { FaSignInAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

export default function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [emailSent, setEmailSent] = useState(false)
    const navigate = useNavigate()
    const { user, createEmail } = UserAuth()

    const handleSignIn = (event) => {
        event.preventDefault()
        setLoading(true)
        createEmail(email, password)
        setEmailSent(true)
    }

    const handleIsVerified = (event) => {
        window.location.reload()
        if (user && user.emailVerified) {
            navigate('/')
        }
    }

    useEffect(() => {
        if (user && user.emailVerified) {
            navigate('/')
        }
    }, [user])

    return (
        <div className='flex flex-col justify-start items-center bg-gradient-to-r from-gray-900 to-gray-700 text-gray-300 h-screen'>
            <div className='flex flex-row pt-20 lg:pl-60 lg:pr-60 pl-20 pr-20 justify-center sm:justify-start items-center transition transform duration-300 ease-in-out'>
                <h1 className='font-extrabold sm:text-xl md:text-3xl'>Welcome to the newest way to code</h1>
            </div>
            <div className='pt-20 w-72 flex flex-col'>
                <div className='flex flex-col bg-gray-800 border border-gray-700 rounded justify-center items-center px-5 py-5 space-y-4'>
                    <input type='email' className='text-md w-full border-gray-700 focus:outline-none bg-gray-800/80 rounded-md px-2 py-2 border border-gray-700 focus:outline-gray-300' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    <input type='password' className='text-md w-full border-gray-700 focus:outline-none bg-gray-800/80 rounded-md px-2 py-2 border border-gray-700 focus:outline-gray-300' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    <h1 className='text-xs text-gray-500'>Your password should be at least 8 charcaters and include a special character</h1>
                    <div className='flex flex-row justify-center items-center border border-gray-700 rounded-md px-2 py-2 cursor-pointer hover:animate-pulse w-full'>
                        <button className='font-bold text-gray-300 pr-2' onClick={(event) => handleSignIn(event)}>Register</button>
                        {loading ? (
                            <AiOutlineLoading className='animate-spin' size={15}/>
                        ) : (
                            <FaSignInAlt/>
                        )}
                    </div>
                </div>
                {emailSent && <div className='pt-5 pb-5 flex flex-col justify-center items-center'>
                                <h1 className='font-bold px-5 py-5 border border-gray-700 rounded-md text-xs text-gray-300'>A verfication was sent to your email. 
                                After you are verified, click this <button className="font-extrabold underline" onClick={handleIsVerified}>button</button>
                                </h1>
                            </div>
                }
                <button className='justify-center items-center pt-5 text-sm text-gray-500 font-bold hover:scale-110 duration-200' onClick={() => navigate('/login')}>Main Login</button>
            </div>
        </div>
  )
}
