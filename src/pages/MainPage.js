import React, { useEffect, useState } from 'react'
import Header from '../components/navigation/Header'
import Sidebar from '../components/navigation/Sidebar'
import FeatureContainer from '../components/utility/FeatureContainer'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

export default function MainPage() {
    const navigate = useNavigate()
    const [feature, setFeature] = useState("coding")
    const { user, logOut } = UserAuth()

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
        if (!user.emailVerified) {
            navigate('/login')
        }
    }, [user])
    
    const handleSignOut = async () => {
        try {
            await logOut()
            navigate('/login')
        } catch(error) {
            return
        }
    }


    return (
        <>
            <div className='bg-gray-900 flex flex-col object-cover h-screen text-white z-[1]'>
                <Header user={user} setFeature={setFeature} handleSignOut={handleSignOut}/>
                <div className='flex flex-row xl:pl-0 pl-5 pr-5 xl:pr-20 bg-gray-900 pb-5'>
                    <Sidebar setFeature={setFeature}/>
                    <FeatureContainer feature={feature}/>
                </div>
            </div>
        </>
    )
}
