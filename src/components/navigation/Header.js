import React from 'react'
import { CiLogout } from 'react-icons/ci'
import Topbar from './Topbar'

export default function Header({user, setFeature, handleSignOut}) {
  return (
    <div className='flex flex-row bg-gradient-to-b from-gray-900 to-gray-950 justify-between items-center pl-5 pr-5 pt-2 sm:pt-4 border-b border-gray-700 pb-2 sm:pb-4 z-[10]'>
        <div className='flex flex-row'>
            <Topbar setFeature={setFeature}/>
        </div>
        <div className='flex flex-row justify-center items-center'>
            <button className="flex flex-row justify-center items-center rounded border border-gray-700 pr-2 px-2 py-2 bg-gray-800 hover:bg-gray-700 hover:scale-110 duration-200" onClick={handleSignOut}>
                <span className='text-sm font-bold text-gray-300'>Sign Out</span>
                <CiLogout size={16} className='sm:ml-2 ml-1'/>
            </button>
            {user?.photoURL && <button className='pl-4 pr-2' onClick={() => setFeature('account')}>
                <img className="img-thumbnail border border-gray-500 object-contain h-10 w-10 rounded-3xl" src={user?.photoURL} alt={""}/>
            </button>}
        </div>
    </div>
  )
}
