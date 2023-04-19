import React from 'react'
import { UserAuth } from '../../../../context/AuthContext'

export default function UserChat({message}) {
    const { user } = UserAuth()
    return (
        <div className='flex flex-row justify-end items-center border-b border-gray-700 pb-4 pt-4'>
            <h1 className='text-gray-300 font-bold pr-2 sm:pr-4'>{message}</h1>
            <>{user?.photoURL && <img className="img-thumbnail border border-gray-500 object-contain h-7 w-7 rounded-3xl" src={user?.photoURL} alt={""}/>}</>
        </div>
    )
}
