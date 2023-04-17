import React from 'react'
import Framework from './Framework'

export default function FrameworkSet({category, listFrames, frameworks, setFrameworks}) {
  return (
    <div className='flex flex-col'>
        <h1 className='font-extrabold pb-2 border-b border-gray-700'>{category}</h1>
        <div className='pt-2 grid grid-cols-3 gap-1'>
        {
            listFrames.map((framework) => { 
                return <Framework framework={framework} frameworks={frameworks} setFrameworks={setFrameworks}/>
            })
        }
        </div>
    </div>
  )
}
