import React from 'react'
import Chat from './chat/Chat'
import LanguageList from '../utility/languages/LanguageList'
import FrameworkList from '../utility/frameworks/FrameworkList'

export default function Display({chain, setChain, display, setDisplay, lang, setLang, frameworks, setFrameworks}) {
  return (
    <div className='bg-gray-900 justify-center items-center'>
        {
            {
                'main': <Chat lang={lang} frameworks={frameworks} chain={chain} setChain={setChain}/>,
                'languages': <LanguageList setDisplay={setDisplay} setLang={setLang}/>, 
                'frameworks': <FrameworkList frameworks={frameworks} setDisplay={setDisplay} setFrameworks={setFrameworks}/>, 
            } [display] 
        }
    </div>
  )
}
