import React, { useState } from 'react'
import { MdMenu, MdClose } from 'react-icons/md'
import Logo from '../../assets/jott-big-rounded.png'

export default function Topbar({setFeature}) {
    const [mobileNav, setMobileNav] = useState(false)

    return (
        <div className='flex flex-row justify-center items-center xl:hidden block'>
            {/* <img className="img-thumbnail object-contain h-10 w-10 rounded-3xl hidden sm:block" src={Logo} alt={""}/> */}
            <button className='pl-4 px-2 py-2 justify-center items-center text-gray-300 hover:animate-pulse duration-200 font-extrabold sm:block hidden' onClick={() => setFeature("coding")}>Code</button>
            <button className='px-2 py-2 justify-center items-center text-gray-300 hover:animate-pulse duration-200 font-extrabold sm:block hidden pr-4' onClick={() => setFeature("projects")}>Projects</button>
            <button className='border-l border-gray-700 pl-4 px-2 py-2 justify-center items-center text-gray-300 hover:animate-pulse duration-200 font-semibold md:block hidden'>Account</button>
            <button onClick={() => setMobileNav(!mobileNav)}><MdMenu className='hover:scale-110 duration-200 block sm:hidden' size={20}/></button>
            {
                mobileNav ? (
                    <div className='absolute top-0 left-0 w-full h-screen bg-gray-600'>
                        <div className='flex flex-col pt-5 pl-10 pr-10'>
                            <button className="pb-10" onClick={() => setMobileNav(!mobileNav)}><MdClose className="hover:scale-110 duration-200" size={20}/></button>
                            <div className='flex flex-col  pt-10 pb-10 border rounded-md bg-gradient-to-r from-gray-900 to-gray-700 '>
                                <button className='font-extrabold px-2 py-2 hover:scale-110 duration-200'>Code</button>
                                <button className='font-extrabold px-2 py-2 hover:scale-110 duration-200'>Projects</button>
                                <button className='font-extrabold px-2 py-2 hover:scale-110 duration-200'>Account</button>
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
