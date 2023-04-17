import React from 'react'
import { AiFillFolderOpen } from 'react-icons/ai'
import { AiOutlineCode } from 'react-icons/ai'

export default function Sidebar({setFeature}) {
  return (
    <div className='hidden h-[80%] w-[20%] xl:block justify-center items-center border-gray-700 z-[5] bg-gray-900'>
        <div className='flex flex-col gap-4 justify-center items-center pt-10 z-[10] pb-10'>
            <div className='flex w-[80%] cursor-pointer justify-center items-center border border-gray-400 rounded-md duration-200 hover:bg-gray-600/50 hover:animate-pulse' onClick={() => setFeature("coding")}>
                <button className='flex flex-row justify-center items-center px-2 py-2'>
                    <h1 className='font-extrabold pr-3 text-gray-300'>
                        Code
                    </h1>
                    <AiOutlineCode className="text-gray-300" size={20}/>
                </button>
            </div>
            <div className='flex w-[80%] justify-center items-center cursor-pointer border border-gray-400 rounded-md duration-200 hover:bg-gray-600/50 hover:animate-pulse' onClick={() => setFeature("projects")}>
                <button className='flex flex-row justify-center items-center px-2 py-2'>
                    <h1 className='font-extrabold pr-3 text-gray-300'>
                        Projects
                    </h1>
                    <AiFillFolderOpen className="text-gray-300" size={20}/>
                </button>
            </div>
            <div className='pt-5 pb-5 border-b border-gray-700'>
                <button className='px-2 py-2 justify-center items-center text-gray-300 hover:animate-pulse duration-200 text-sm font-semibold md:block hidden'>Account</button>
            </div>
        </div>
        {/* <div className="relative h-[40%] z-[200]">
            <div className="absolute inset-0 "></div>
            <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-purple-900/50 to-gray-900 transform skew-y-12"></div>
        </div> */}
    </div>
  )
}
