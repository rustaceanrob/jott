import React, { useEffect, useState } from 'react'
import { doc, getDoc, collection, deleteDoc } from 'firebase/firestore';
import { db } from "../../config/firebase";
import { AiOutlineLoading } from 'react-icons/ai'
import SystemChat from '../coding/chat/systemchat/SystemChat'

export default function SnippetView({uid, projectId, snippetId, setDisplay}) {
    const [snippet, setSnippet] = useState()
    const [error, setError] = useState(false)

    async function deleteSnippetById(event) {
        event.preventDefault()
        try {
          const snipRef = doc(collection(db, `users/${uid}/projects/${projectId}/snippets`), snippetId);
          await deleteDoc(snipRef);
          setDisplay("project")
        } catch (error) {
          setDisplay("project")
          console.error("Error deleting project: ", error);
        }
      }

    useEffect(() => {
        const docRef = doc(db, 'users', uid, 'projects', projectId, 'snippets', snippetId)
        getDoc(docRef).then((doc) => {
            if (doc.exists()) {
                setSnippet(doc.data())
            } else {
                setError(true)
            }
          }).catch((error) => {
            console.log('Error getting document:', error)
          })
    }, [uid, projectId, snippetId])

    return (
        <div className='flex flex-col justify-center items-center w-full p-5'>
        {!snippet && <AiOutlineLoading className='pt-5 animate-spin' size={20}/> }
        {snippet ? (
            <div className='flex flex-col w-full pt-5'>
                <h1 className='font-extrabold text-gray-500 border-b border-gray-700 pb-2'>{snippet.prompt}</h1>
                <SystemChat message={snippet['modelResponse']} lang={snippet['lang']} isSnip={true}/>
            </div>
        ): (
            <></>
        )}
        {error && <h1 className='flex flex-row justify-center items-center p-5 text-gray-300 font-extrabold'>There was an error loading that snippet</h1>}
        <div className='flex flex-row justify-between items-center pt-5 pb-5'>
            <button className='text-gray-500 font-bold hover:animate-pulse pr-5' onClick={(event) => deleteSnippetById(event)}>Delete</button>
            <button className='text-gray-300 font-bold hover:animate-pulse pl-5' onClick={() => setDisplay('project')}>Back</button>
        </div>
        </div>
    )
}
