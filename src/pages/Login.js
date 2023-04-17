import React, { useState, useEffect } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { AiFillGithub, AiOutlineWarning, AiOutlineClose } from 'react-icons/ai'
import { SiFirefoxbrowser, SiGooglechrome, SiMicrosoftedge } from 'react-icons/si'
import { BsAndroid2, BsApple } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

export default function Login() {
    const [message, setMessage] = useState('')
    const [signInError, setSignInError] = useState(false)
    const navigate = useNavigate()
    const { user, signInWithGooglePopUp, signInWithGithubPopUp} = UserAuth()

    const handleGoogle = async () => {
        try {
            await signInWithGooglePopUp()
            navigate('/')
        } catch (error) {
            setSignInError(true)
        }                                  
    }

    const handleGithub = async () => {
        try {
            await signInWithGithubPopUp()
            navigate('/')
        } catch (error) {
            setSignInError(true)
        }    
    }

    // const navigateToTerms = () => {
    //     navigate('/terms')
    // }
    
    // const navigateToPolicy = () => {
    //     navigate('/privatepolicy')
    // }

    useEffect(() => {
        if (user) {
            navigate('/')
        }
        const now = new Date()
        const hours = now.getHours()
        if (hours < 12) {
            setMessage('Good morning ')
        } else if (hours < 16) {
            setMessage('Good afternoon ')
        } else {
            setMessage('Good evening ')
        }
    }, [user])



    return (
        <div className='flex flex-col justify-start items-center bg-gradient-to-r from-gray-900 to-gray-700 text-gray-300 h-screen'>
            <div className='pt-20 lg:pl-60 lg:pr-60 pl-20 pr-20'>
                <div className='flex justify-center sm:justify-start transition transform duration-300 ease-in-out'>
                    <h1 className='font-extrabold sm:text-xl text-lg pb-5'>{message}</h1>
                </div>
                <div className='flex flex-row pb-5 justify-center sm:justify-start items-center transition transform duration-300 ease-in-out'>
                    <h1 className='font-extrabold sm:text-5xl text-3xl'>Welcome to <span className='text-transparent bg-clip-text bg-gradient-to-t from-purple-800 to-purple-300'>Jott.</span></h1>
                </div>
                <div className='flex flex-row hidden lg:block items-center pt-10 transition transform duration-300 ease-in-out'>
                    <h1 className='font-extrabold sm:text-4xl xl:text-5xl text-3xl'>By programmers, for programmers.</h1>
                </div>
                <div className='flex flex-row justify-center items-center pt-20 pb-5'>
                    <h3 className='font-extrabold text-sm justify-center items-center'>Please sign in or sign up.</h3>
                </div>
                <div className='grid sm:grid-cols-2 grid-cols-1 sm:gap-4 gap-2 bg-gray-800 border rounded justify-between items-center px-5 py-5 md:pl-10 md:pr-10 xl:pl-40 xl:pr-40'>
                    <button onClick={handleGoogle} className='flex flex-row justify-center items-center bg-gray-700 px-2 py-2 border rounded-md hover:scale-110 hover:cursor-pointer duration-200'>
                        <h1 className='font-bold pr-2'>Google</h1>
                        <FcGoogle size={20}/>
                    </button>
                    <button onClick={handleGithub} className='flex flex-row justify-center items-center bg-gray-700 px-2 py-2 border px-2 py-2 rounded-md hover:scale-110 hover:cursor-pointer duration-200'>
                        <h1 className='font-bold pr-2'>GitHub</h1>
                        <AiFillGithub className='text-white' size={20}/>
                    </button>
                </div>
                <div className='flex flex-row hidden sm:block'>
                    <h3 className='text-sm flex justify-center items-center font-bold pt-5'>Supported Browsers</h3>
                    <div className='flex flex-row justify-center items-center px-5 py-5'>
                        <div className='pr-2'><SiGooglechrome className='text-purple-600 ' size={20}/></div>
                        <div className='pl-2 pr-2'><SiFirefoxbrowser className='text-purple-600' size={20}/></div>
                        <div className='pl-2'><SiMicrosoftedge className='text-purple-600' size={20}/></div>
                    </div>
                </div>
                <div className='flex flex-col block sm:hidden items-center pt-10 pb-10'>
                    <h3 className='font-extrabold text-sm justify-center items-center pb-5'>Try the app</h3>
                    <div className='flex flex-row justify-between items-center'>
                        <div className='pr-2 hover:scale-110 hover:animate-pulse duration-200'>
                            <BsAndroid2 className='text-green-700' size={30}/>
                        </div>
                        <div className='pl-2 hover:scale-110 hover:animate-pulse duration-200'>
                            <BsApple size={30}/>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <h1 className='text-xs font-semibold text-gray-400'>By using Jott you agree to the: </h1>
                    <h1 className='pt-1 text-xs font-semibold text-gray-400'><button>Terms</button> and <button>Private Policy</button></h1>
                </div>
            </div>
            {
                signInError ? (
                    <div className='absolute top-0 left-0 w-full h-screen bg-white/90 z-[2] justify-center items-center'>
                        <div className='relative flex pt-40 justify-center items-center'>
                            <div className='bg-red-300 px-10 py-10 rounded pl-5 pr-5 flex flex-col items-center justify-between'>
                                <AiOutlineWarning className="flex mb-5 text-gray-800" size={20}/>
                                <h1 className='justify-center items-center font-extrabold text-xl sm:text-2xl text-gray-800'>There was an error logging you in...</h1>
                                <h1 className='pt-2 font-bold text-sm text-slate-900'>Please try again later</h1>
                                <button onClick={() => setSignInError(!signInError)} className="flex hover:scale-110 duration-200 mt-5" ><AiOutlineClose className="text-gray-800" size={20}/></button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <></>
                )
            }
        </div>
    )
}