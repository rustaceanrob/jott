import React from 'react'

export default function ListLanguage({language, setLang, setDisplay}) {
    const handleClick = (event) => {
        event.preventDefault()
        setLang(language)
        setDisplay("main")
    }
    return (
        <button className='flex flex-row' onClick={(event) => handleClick(event)}><h1 className='font-bold text-gray-300 hover:animate-pulse'>{language}</h1></button>
    )
}
