import React from 'react'

export default function Tip({title, icon, description}) {
  return (
    <div className='flex flex-col w-full pl-5 pr-5 xl:pl-60 xl:pr-60 lg:pl-40 lg:pr-40 md:pl-20 md:pr-20 justify-start items-start text-gray-200 pt-2'>
        <div className='w-full bg-gray-800/50 border border-gray-700 px-5 py-5 rounded-md'>
            <div className='flex flex-row justify-center items-center text-md'>
                {icon}
                <h1 className='font-extrabold pl-2 text-sm'>{title}</h1>
            </div>
            <div className='pt-2 text-xs font-semibold '>
                <h1 className='flex flex-col justify-center items-center'>{description}</h1>
            </div>
        </div>
    </div>
  )
}
