import React, { useState } from 'react'
import { TbLayoutGridAdd } from 'react-icons/tb'
import { AiOutlineLoading } from 'react-icons/ai';
import { getFunctions, httpsCallable } from "firebase/functions"
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

export default function NewSnippet({uid, lang, frameworks, projectId, setDisplay}) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [name, setName] = useState('')
    const [prompt, setPrompt] = useState('')
    const functions = getFunctions()
    const getSnippetResponse = httpsCallable(functions, 'getSnippetResponse')

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
    
    const addSnippet = async () => {
        let response
        getSnippetResponse({lang: lang, frames: formatList(frameworks), prompt: prompt}).then((response) => {
            const code = response.data.content.trim()
            response = code
            setLoading(false)
        }).catch((error) => {
            console.log(error)
            setError(true)
            setLoading(false)
            response = ''
        })
        try {
            setLoading(true)
            await addDoc(collection(db, `users/${uid}/projects/${projectId}/snippets`), {"name": name, "prompt": prompt, "lang": lang, "frameworks": frameworks, "modelResponse": response});
            setDisplay("project")
        } catch (error) {
            setLoading(false)
            setError(true)
        }
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        addSnippet()
      }


    return (
        <div className='pt-5 pb-5'>
            <div className='pl-20 pr-20 flex flex-col justify-center items-center'>
                <h1 className='font-extrabold text-md sm:text-lg lg:text-xl text-gray-300 border-b pb-2 border-gray-700'>Describe your code</h1>
                <div className='grid grid-cols-1 gap-4 justify-center items-center w-full pt-5'>
                    <div className='flex flex-col justify-start items-start'>
                        <h1 maxlength="50" className='text-gray-300 font-bold pr-2 pb-2'>Name</h1>
                        <input className='text-md w-full border-gray-700 focus:outline-none bg-gray-800/80 rounded-md px-2 py-2 border border-gray-700' type='text' value={name} placeholder='Name your snippet' onChange={(event) => setName(event.target.value)}/>
                    </div>
                    <div className='flex flex-col justify-start items-start'>
                        <h1 className='text-gray-300 font-bold pr-2 pb-2'>Prompt</h1>
                        <textarea maxlength="500" rows="3" className='text-md w-full border-gray-700 focus:outline-none bg-gray-800/80 rounded-md px-2 py-2 border border-gray-700' type='text' value={prompt} placeholder='What are you working on? 500 characters' onChange={(event) => setPrompt(event.target.value)}/>
                    </div>
                    <div className='flex space-x-2 justify-end'>
                    <button className='px-2 py-2 hover:animate-pulse rounded-md border border-gray-700 text-gray-300 font-bold flex flex-row justify-end items-center' onClick={() => setDisplay("project")}>
                        <h1>Back</h1>
                    </button>
                        <button className='px-2 py-2 hover:animate-pulse rounded-md border border-gray-700 text-gray-300 font-bold flex flex-row justify-end items-center' onClick={(event) => handleSubmit(event)}>
                            <h1 className='pr-2'>Create</h1>
                            {loading ? (
                                <AiOutlineLoading className='animate-spin' size={20}/>
                            ): (
                                <TbLayoutGridAdd className="text-gray-300" size={20}/>
                            )}
                        </button>
                    </div>
                    {error && (
                        <h1 className='flex px-2 py-2 text-sm font-bold text-gray-300 border border-gray-700 justify-center items-center'>There was an error creating your snippet.</h1>
                    )
                    }
                </div>
            </div>
        </div>
    )
}
