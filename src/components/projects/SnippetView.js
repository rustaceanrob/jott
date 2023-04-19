import React, { useEffect, useState } from 'react'
import { doc, getDoc, collection, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from "../../config/firebase";
import { AiOutlineLoading, AiOutlineEdit } from 'react-icons/ai'
import { getFunctions, httpsCallable } from "firebase/functions"
import SystemChat from '../coding/chat/systemchat/SystemChat'

export default function SnippetView({uid, projectId, snippetId, setDisplay}) {
    const [snippet, setSnippet] = useState()
    const [error, setError] = useState(false)
    const [edit, setEdit] = useState('')
    const functions = getFunctions()
    const getEdit = httpsCallable(functions, 'getEdit')
    const [editLoading, setEditLoading] = useState(false)

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

    const handleEditChange = (e) => {
        e.preventDefault()
        setEdit(e.target.value)
    }

    function formatList(list) {
        if (list.length === 0) {
          return "";
        } else if (list.length === 1) {
          return list[0];
        } else if (list.length === 2) {
          return list[0] + " and " + list[1];
        } else {
          var result = "";
          for (var i = 0; i < list.length - 1; i++) {
            result += list[i] + ", ";
          }
          result += "and " + list[list.length - 1];
          return result;
        }
      }

    function handleEdit() {
        if (edit) {
            setEditLoading(true)
            getEdit({lang: snippet["lang"], frames: formatList(snippet['frameworks']), prompt: snippet["prompt"], previousMessage: snippet["modelResponse"], edit: edit}).then((response) => {
                const code = response.data.content.trim()
                console.log(code)
                updateDoc(doc(collection(db, `users/${uid}/projects/${projectId}/snippets/`), snippetId), {"modelResponse": code}).then((response) => {
                    setEditLoading(false)
                    setDisplay('project')
                }).catch((error) => {
                    console.log(error)
                    setError(true)
                })
                setEditLoading(false)
            }).catch((error) => {
                console.log(error)
                setError(true)
                setEditLoading(false)
            })
            setEdit('')
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        handleEdit()
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
        <div className='flex flex-col items-center justify-center p-5'>
            {!snippet && <AiOutlineLoading className='animate-spin' size={20}/> }
            {snippet ? (
                <div className='flex flex-col w-full pt-5'>
                    <h1 className='font-extrabold text-gray-500 border-b border-gray-700 pb-2 break-all'>{snippet.prompt}</h1>
                    <SystemChat message={snippet['modelResponse']} lang={snippet['lang']} isSnip={true}/>
                </div>
            ): (
                <></>
            )}
            <div>{error && <h1 className='flex flex-row justify-center items-center text-gray-100 font-extrabold pt-5'>There was an error loading that snippet</h1>}</div>
            <div className='flex flex-col justify-center items-center pt-5 pb-5 w-full'>
                <h1 className='font-bold text-gray-300 pb-2'>Suggest an edit</h1>
                <div className='flex flex-row space-x-2 pt-2 w-full pl-5 pr-5 md:pr-20 md:pl-20'>
                    <input type='text' className='text-md w-full border-gray-700 focus:outline-none bg-gray-800/80 rounded-md px-2 py-2 border border-gray-700' placeholder='(i.e. Use SDK Version 9)' value={edit} onChange={(e) => handleEditChange(e)}></input>
                    <div className='border border-gray-700 font-bold text-gray-300 px-2 py-2 rounded-md pl-2 flex flex-row justify-center items-center cursor-pointer hover:animate-pulse' onClick={(event) => handleSubmit(event)}>
                        <h1 className='pr-2'>Submit</h1>
                        {
                            editLoading ? (
                                <AiOutlineLoading className='animate-spin' size={20}/>
                            ) : (  
                                <AiOutlineEdit className='text-gray-300' size={15}/>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className='flex flex-row justify-between items-center pt-2 pb-5'>
                <button className='text-gray-500 font-bold hover:animate-pulse pr-5' onClick={(event) => deleteSnippetById(event)}>Delete</button>
                <button className='text-gray-300 font-bold hover:animate-pulse pl-5' onClick={() => setDisplay('project')}>Back</button>
            </div>
        </div>
    )
}
