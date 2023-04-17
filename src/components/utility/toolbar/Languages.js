import React, { useState } from 'react'
import { FaPython } from 'react-icons/fa'
import { IoLogoJavascript } from 'react-icons/io'
import { TbBrandGolang } from 'react-icons/tb'
import { FaJava, FaPhp } from 'react-icons/fa'
import { SiSwift, SiKotlin, SiRuby, SiCplusplus, SiMysql, SiCsharp} from 'react-icons/si'
import Language from './Language'

export default function Languages({lang, setLang, setDisplay}) {
    const handleClick = (event) => {
        event.preventDefault()
        setDisplay("languages")
    }

    return (
        <div className='bg-gray-700/50 px-2 py-2 rounded-md cursor-pointer pr-2'>
            <div className='' onClick={(event) => handleClick(event)}>
            {
                {
                    'Python': <Language language={"Python"} setLang={setLang} icon={<FaPython className="text-gray-300" size={20}/>}/>,
                    'JavaScript': <Language language={"JavaScript"} setLang={setLang} icon={<IoLogoJavascript className="text-gray-300" size={15}/>}/>,
                    'Go': <Language language={"Go"} setLang={setLang} icon={<TbBrandGolang className="text-gray-300" size={20}/>}/>,
                    'Java': <Language language={"Java"} setLang={setLang} icon={<FaJava className="text-gray-300" size={20}/>}/>,
                    'C#': <Language language={"C#"} setLang={setLang} icon={<SiCsharp className="text-gray-300" size={20}/>}/>,
                    'PHP': <Language language={"PHP"} setLang={setLang} icon={<FaPhp className="text-gray-300" size={20}/>}/>,
                    'Swift': <Language language={"Swift"} setLang={setLang} icon={<SiSwift className="text-gray-300" size={20}/>}/>,
                    'Kotlin': <Language language={"Kotlin"} setLang={setLang} icon={<SiKotlin className="text-gray-300" size={15}/>}/>,
                    'Ruby': <Language language={"Ruby"} setLang={setLang} icon={<SiRuby className="text-gray-300" size={15}/>}/>,
                    'C++': <Language language={"C++"} setLang={setLang} icon={<SiCplusplus className="text-gray-300" size={15}/>}/>,
                    'SQL': <Language language={"SQL"} setLang={setLang} icon={<SiMysql className="text-gray-300" size={20}/>}/>,
                    //add more language displays here
                } [lang] || <Language language={lang} setLang={setLang}/>
            }
            </div>
        </div>
    )
}
