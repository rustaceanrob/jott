import React from 'react'
import Languages from './Languages'
import Frameworks from './Frameworks'

export default function Toolbar({lang, setLang, setDisplay, frameworks, showUpload}) {
  
    return (
      <div className='flex flex-row items-center justify-between w-full border-b border-gray-700 pb-2 pl-2 pr-2'>
        <div className='flex flex-row justify-center items-center'>
          <Languages lang={lang} setLang={setLang} setDisplay={setDisplay}/>
          <div className='hidden sm:block'>
            <Frameworks frameworks={frameworks} setDisplay={setDisplay}/>
          </div>
        </div>
        {
          showUpload &&  <div className='bg-gray-700/50 px-2 py-2 rounded-md flex flex-row justify-center items-center hidden md:inline cursor-pointer hover:animate-pulse'>
                            <h1 className='text-sm font-semibold text-gray-300' onClick={() => setDisplay('upload')}>Add Code</h1>
                        </div>
        }
      </div>
    )
}
