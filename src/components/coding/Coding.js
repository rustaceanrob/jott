import React, { useState } from 'react'
import Toolbar from '../utility/toolbar/Toolbar'
import Display from './Display'

export default function Coding({lang, setLang, frameworks, setFrameworks}) {
    const [chain, setChain] = useState([])
    const [codeReference, setCodeReference] = useState("")
    const [display, setDisplay] = useState("main")
    const showUpload = true
    
    return (
        <div className='w-full bg-gray-950'>
            <Toolbar lang={lang}  setLang={setLang} setDisplay={setDisplay} frameworks={frameworks} showUpload={!showUpload}/>
            <Display display={display} setDisplay={setDisplay} 
                    chain={chain} setChain={setChain}
                    codeReference={codeReference} setCodeReference={setCodeReference} 
                    lang={lang} setLang={setLang} 
                    frameworks={frameworks} setFrameworks={setFrameworks}/>
        </div>
    )
}
