import React from 'react'
import { MdOutlineAddBox } from 'react-icons/md'
import FrameworkIcon from './FrameworkIcon'

export default function Frameworks({frameworks, setDisplay}) {

    const handleClick = (event) => {
      event.preventDefault()
      setDisplay("frameworks")
    }

    return (
      <div className='pl-2 sm:pt-0 flex flex-row justify-center items-center'>
        <div className='bg-gray-700/50 px-2 py-2 rounded-md flex flex-row justify-center items-center' onClick={(event) => handleClick(event)}>
            <button className='flex flex-row text-sm font-semibold text-gray-300 hover:animate-pulse duration-200 cursor-pointer pr-2'>Manage Frameworks</button>
            <MdOutlineAddBox className="hover:animate-pulse duration-200 cursor-pointer text-gray-300" size={20}/>
        </div>
        <div className='flex flex-row pl-2 justify-center items-center'>
        {
          frameworks.length !== 0 ? (
            <div className='flex flex-row'>
              {frameworks.map((frame) => {
                return ( 
                  <div className='flex flex-row justify-center items-center pr-2'>
                    <div className='flex flex-row border justify-center items-center rounded-md border-gray-700 px-2 py-1'>
                      <h1 className=' pl-1 font-semibold text-sm text-gray-300'>{frame}</h1>
                      <FrameworkIcon frame={frame}/>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <></>
          )
        }
        </div>
      </div>
    )
}
