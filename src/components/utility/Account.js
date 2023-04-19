import React, { useState , useEffect} from 'react'
import { UserAuth } from '../../context/AuthContext'

export default function Account() {
    const [signup, setSignup] = useState('')
    const { user } = UserAuth()

    useEffect(() => {
        setSignup(new Date(user?.metadata?.creationTime).toISOString().substring(0, 10))
    }, [user])

    return (
        <div className='flex flex-col justify-center items-center pl-20 lg:pl-60 lg:pr-60 md:pl-40 md:pr-40 pr-20 pt-5 pb-5'>
            <div className='flex flex-col w-72 sm:w-96 border border-gray-700 rounded-md px-5 py-5'>
                <div className='flex flex-row justify-between items-center border-b border-gray-700 pb-4'>
                    <h1 className='font-extrabold'>Account Details</h1>
                    <div>{user.photoURL && <img className="img-thumbnail object-contain h-10 w-10 rounded-3xl" src={user.photoURL} alt={""}/>}</div>
                </div>
                <div className='flex flex-row border-gray-700  border-b pt-2 pb-2'>
                    <h1 className='font-bold text-gray-300 pr-2'>Date Joined:</h1>
                    <h1 className='font-bold text-gray-300'>{signup}</h1>
                </div>
            </div>
        </div>
    )
}
