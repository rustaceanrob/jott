import React from 'react'
import { SiFirebase } from 'react-icons/si'

export default function FrameworkIcon({frame}) {
  return (
    <div className='text-gray-300'>
        {
            {  
                "Firebase": <SiFirebase/>

            } [frame] || <></>
        }
    </div>
  )
}
