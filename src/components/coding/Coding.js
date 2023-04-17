import React, { useState } from 'react'
import Toolbar from '../utility/toolbar/Toolbar'
import Display from './Display'

export default function Coding({lang, setLang, frameworks, setFrameworks}) {
    const [chain, setChain] = useState([])
    // const [codeReference, setCodeReference] = useState("")
    const [display, setDisplay] = useState("main")
    
    return (
        <div className='w-full bg-gray-900'>
            <Toolbar lang={lang}  setLang={setLang} setDisplay={setDisplay} frameworks={frameworks}/>
            <Display display={display} setDisplay={setDisplay} chain={chain} setChain={setChain} lang={lang} setLang={setLang} frameworks={frameworks} setFrameworks={setFrameworks}/>
        </div>
    )
}
