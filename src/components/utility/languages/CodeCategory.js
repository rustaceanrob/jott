import React from 'react'
import ListLanguage from './ListLanguage'

export default function CodeCategory({type, languages, setLang, setDisplay}) {
  return (
    <div className='flex flex-col'>
        <h1 className='font-extrabold pb-2 border-b border-gray-700'>{type}</h1>
        <div className='grid grid-cols-2 gap-4 pt-5'>
        {
            languages.map((language) => {
                return <ListLanguage language={language} setLang={setLang} setDisplay={setDisplay}/>
            })
        }
        </div>
    </div>
  )
}
