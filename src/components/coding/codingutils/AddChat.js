import React, { useState, useEffect } from 'react'
import { collection, onSnapshot, addDoc, doc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { AiOutlineLoading } from "react-icons/ai"

export default function AddChat({push, lang, frameworks, setDisplay, uid}) {
    const [projects, setProjects] = useState()
    const [projectId, setProjectId] = useState('')
    const [selectedProject, setSelectedProject] = useState('')
    const [name, setName] = useState('')
    const [des, setDes] = useState('')
    const [snipName, setSnipName] = useState('')
    const [prompt, setPrompt] = useState('')
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    function handleProjectChange(event) {
        setSelectedProject(event.target.value);
        setProjectId(event.target.value);
    }

    const addSnippet = async (event) => {
        event.preventDefault()
        setLoading(true)
        if (projectId !== "") {
            addDoc(collection(db, `users/${uid}/projects/${projectId}/snippets/`), {"name": snipName, "prompt": prompt, "lang": lang, "frameworks": frameworks, "modelResponse": push}).then((response) => {
                setLoading(false)
                setDisplay("main")
            }).catch((error) => {
                console.log(error)
                setError(true)
            })
        } else {// create a new document reference with a random ID
            try {
                const collectionRef = collection(db, `users/${uid}/projects/`);
                const docRef = await addDoc(collectionRef, { "name": name, "description": des});
                addDoc(collection(db, `users/${uid}/projects/${docRef.id}/snippets/`), {"name": snipName, "prompt": prompt, "lang": lang, "frameworks": frameworks, "modelResponse": push}).then((response) => {
                    setLoading(false)
                    setDisplay("main")
                }).catch((error) => {
                    console.log(error)
                    setError(true)
                })
            } catch(error) {
                console.log(error)
                setError(true)
            }
        }

    }

    useEffect(() => {
        const projectsRef = collection(db, `users/${uid}/projects`)
        const unsubscribe = onSnapshot(projectsRef, (snapshot) => {
          const newProjects = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setProjects(newProjects);
        });
        return () => unsubscribe();
      }, [uid])

    return (
        <div className='flex flex-col items-center justify-center'>
            {!projects && <div className='pt-5 pb-5'><AiOutlineLoading className='animate-spin' size={20}/></div> }
            {projects ? (
                <div className='flex flex-col w-full justify-center items-center max-w-[512px] pl-5 pr-5'>
                    <label htmlFor="project" className="block font-bold text-gray-300 pb-2 pt-2 flex ">
                        Select a project:
                    </label>
                    <select
                        id="project"
                        name="project"
                        value={selectedProject}
                        onChange={handleProjectChange}
                        className="block w-full p-2 border border-gray-700 font-bold rounded-md shadow-sm bg-gray-800 focus:outline-none sm:text-sm">
                        <option value="">New Project</option>
                        {projects.map((option) => (
                        <option key={option.id} value={option.id}>
                            {option.name}
                        </option>
                        ))}
                    </select>
                    {selectedProject === "" && <div className='w-full'>
                            <div className='flex flex-col justify-start items-start pt-2'>
                                <h1 maxlength="50" className='text-gray-300 font-bold pr-2 pb-2'>Name</h1>
                                <input className='text-md w-full border-gray-700 focus:outline-none bg-gray-800/80 rounded-md px-2 py-2 border border-gray-700' type='text' value={name} placeholder='Name of your project' onChange={(event) => setName(event.target.value)}/>
                            </div>
                            <div className='flex flex-col justify-start items-start pt-2'>
                                <h1 className='text-gray-300 font-bold pr-2 pb-2'>Description</h1>
                                <textarea maxlength="150" className='text-md w-full border-gray-700 focus:outline-none bg-gray-800/80 rounded-md px-2 py-2 border border-gray-700' type='text' value={des} placeholder='What are you working on? 150 characters' onChange={(event) => setDes(event.target.value)}/>
                            </div>
                        </div>}
                    <div className='w-full'>
                        <div className='flex flex-col justify-start items-start pt-2'>
                            <h1 maxlength="50" className='text-gray-300 font-bold pr-2 pb-2'>Snippet Name</h1>
                            <input className='text-md w-full border-gray-700 focus:outline-none bg-gray-800/80 rounded-md px-2 py-2 border border-gray-700' type='text' value={snipName} placeholder='Memorable title' onChange={(event) => setSnipName(event.target.value)}/>
                        </div>
                        <div className='flex flex-col justify-start items-start pt-2'>
                            <h1 className='text-gray-300 font-bold pr-2 pb-2'>Snippet Name</h1>
                            <textarea maxlength="150" className='text-md w-full border-gray-700 focus:outline-none bg-gray-800/80 rounded-md px-2 py-2 border border-gray-700' type='text' value={prompt} placeholder='How will you remember this chat?' onChange={(event) => setPrompt(event.target.value)}/>
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )}
            <div className='flex flex-row w-full justify-between items-center pt-5 pb-5 max-w-[512px] pl-5 pr-5'>
                <button className='px-2 py-2 flex flex-row border border-gray-700 rounded-md' onClick={() => setDisplay("main")}>
                    <h1 className='font-bold text-gray-300'>Back</h1>
                </button>
                <button className='px-2 py-2 flex flex-row border border-gray-700 rounded-md' onClick={(event) => addSnippet(event)}>
                    {!loading ? (<h1 className='font-bold text-gray-300'>Add</h1>) : (<AiOutlineLoading className='animate-spin' size={20}/>)}
                </button>
            </div>
            {error && <h1 className='pt-5 text-gray-300 border-t border-gray-700 font-bold pb-5'>There was an error adding that to your projects</h1>}
        </div>
    )
}
