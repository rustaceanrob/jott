import React from 'react'
import LanguageList from '../utility/languages/LanguageList'
import FrameworkList from '../utility/frameworks/FrameworkList'
import ProjectsList from './ProjectsList'
import NewProject from './NewProject'
import SnippetList from './SnippetList'
import NewSnippet from './NewSnippet'
import SnippetView from './SnippetView'

export default function Display({uid, projectId, projectName, setProjectName, setProjectId, display, setDisplay, snippetId, setSnippetId, lang, setLang, frameworks, setFrameworks}) {
  return (
    <div className='bg-gray-900 justify-between items-center'>
        {
            {
                'main': <ProjectsList uid={uid} setDisplay={setDisplay} setProjectId={setProjectId} setProjectName={setProjectName}/>,
                'newproject': <NewProject uid={uid} setDisplay={setDisplay} lang={lang} frameworks={frameworks}/>,
                'project': <SnippetList uid={uid} projectName={projectName} setDisplay={setDisplay} projectId={projectId} setSnippetId={setSnippetId}/>,
                'newsnippet': <NewSnippet uid={uid} lang={lang} frameworks={frameworks} projectId={projectId} setDisplay={setDisplay}/>,
                'snippetview': <SnippetView uid={uid} projectId={projectId} snippetId={snippetId} setDisplay={setDisplay}/>,
                'languages': <LanguageList setDisplay={setDisplay} setLang={setLang}/>, 
                'frameworks': <FrameworkList frameworks={frameworks} setDisplay={setDisplay} setFrameworks={setFrameworks}/>, 
            } [display] 
        }
    </div>
  )
}