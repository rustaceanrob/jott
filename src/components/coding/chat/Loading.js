import React from 'react'
import { AiOutlineLoading, AiOutlineInfoCircle } from 'react-icons/ai'

export default function Loading({message}) {
  return (
    <div className='flex flex-row justify-center items-center pt-5'>
        <div className='flex flex-row justify-center items-center px-5 py-5 border rounded-md border-gray-700'>
            <AiOutlineInfoCircle/>
            <h1 className='text-gray-300 font-semibold pl-4 pr-4'>{message}</h1>
            <AiOutlineLoading className='animate-spin' size={20}/>
        </div>
    </div>
  )
}
