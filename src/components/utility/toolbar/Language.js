import React from 'react'

export default function Language({language, setLang, icon, pad}) {
    const handleClick = () => {
        setLang(language)
    }

    return (
        <div className={`flex flex-row justify-start items-center hover:animate-pulse duration-200 ${pad}`} onClick={() => handleClick()}>
            {
                icon ? (
                    <>
                        <h1 className={`text-sm font-semibold pr-2 text-gray-300`}>{language}</h1>
                        {icon}
                    </>
                ) : (
                    <h1 className={`text-sm font-semibold text-gray-300`}>{language}</h1>
                )
            }
        </div>
    )
}
