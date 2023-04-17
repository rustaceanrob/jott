import React, { useState } from 'react'
import Coding from '../coding/Coding'
import Projects from '../projects/Projects'

export default function FeatureContainer({feature}) {
  const [lang, setLang] = useState("Python")
  const [frameworks, setFrameworks] = useState([])
  return (
    <div className='flex flex-col w-full h-full pt-2 justify-start items-center border-gray-700 border-l border-r border-b'>
      { feature === "coding" ? (
        <Coding lang={lang} setLang={setLang} frameworks={frameworks} setFrameworks={setFrameworks}/>
      ) : (
        <Projects lang={lang} setLang={setLang} frameworks={frameworks} setFrameworks={setFrameworks}/>
      )}
    </div>
  )
}
