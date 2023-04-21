import React, { useState } from 'react'
import Chat from './chat/Chat'
import LanguageList from '../utility/languages/LanguageList'
import FrameworkList from '../utility/frameworks/FrameworkList'
import Upload from './codingutils/Upload'
import AddChat from './codingutils/AddChat'
import { UserAuth } from '../../context/AuthContext'

export default function Display({chain, setChain, display, setDisplay, lang, setLang, frameworks, setFrameworks, codeReference, setCodeReference}) {
  const [push, setPush] = useState('')
  const { user } = UserAuth()

  return (
    <div className='bg-gray-900 justify-center items-center'>
        {
            {
                'main': <Chat lang={lang} frameworks={frameworks} chain={chain} setChain={setChain} setDisplay={setDisplay} setPush={setPush}/>,
                'languages': <LanguageList setDisplay={setDisplay} setLang={setLang}/>, 
                'frameworks': <FrameworkList frameworks={frameworks} setDisplay={setDisplay} setFrameworks={setFrameworks}/>,
                'upload': <Upload lang={lang} setDisplay={setDisplay} setCodeReference={setCodeReference}/>,
                'addtoprojects': <AddChat push={push} lang={lang} frameworks={frameworks} setDisplay={setDisplay} uid={user?.uid}/>
            } [display] 
        }
    </div>
  )
}
