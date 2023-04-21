import React, { useState } from 'react'
import Display from './Display'
import Toolbar from '../utility/toolbar/Toolbar'
import { UserAuth } from '../../context/AuthContext'

export default function Projects({lang, setLang, frameworks, setFrameworks}) {
    const [display, setDisplay] = useState("main")
    const { user } = UserAuth()
    const [projectName, setProjectName] = useState('')
    const [projectId, setProjectId] = useState('')
    const [snippetId, setSnippetId] = useState('')
    const showUpload = false

    return (
        <div className='flex flex-col justify-between w-full bg-gray-950'>
            <Toolbar lang={lang}  setLang={setLang} setDisplay={setDisplay} frameworks={frameworks} showUpload={showUpload}/>
            <Display  uid={user?.uid} projectId={projectId} setProjectId={setProjectId} 
                        projectName={projectName} setProjectName={setProjectName} display={display} 
                        setDisplay={setDisplay} lang={lang} setLang={setLang} snippetId={snippetId}
                        setSnippetId={setSnippetId} frameworks={frameworks} setFrameworks={setFrameworks}/>
        </div>
    )
}
