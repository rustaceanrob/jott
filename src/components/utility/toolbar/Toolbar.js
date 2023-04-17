import React from 'react'
import Languages from './Languages'
import Frameworks from './Frameworks'

export default function Toolbar({lang, setLang, setDisplay, frameworks, icon}) {
  
    return (
      <div className='flex flex-row items-center justify-between w-full border-b border-gray-700 pb-2 pl-2 pr-2'>
        <div className='flex flex-row justify-center items-center'>
          <Languages lang={lang} setLang={setLang} setDisplay={setDisplay}/>
          <div className='hidden sm:block'>
            <Frameworks frameworks={frameworks} setDisplay={setDisplay}/>
          </div>
        </div>
        <div>
          {icon}
        </div>
        {/* <div className='bg-gray-700/50 px-2 py-2 rounded-md flex flex-row justify-center items-center hidden lg:inline cursor-pointer'>
          { icon }
        </div> */}
      </div>
    )
}
