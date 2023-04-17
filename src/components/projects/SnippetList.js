import React, {useState, useEffect} from 'react'
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase";
import { MdOutlineAddBox, MdSnippetFolder } from 'react-icons/md';
import { AiOutlineCode } from "react-icons/ai"

export default function SnippetList({uid, projectName, projectId, setDisplay}) {
    const [snippets, setSnippets] = useState([])

    useEffect(() => {
      const projectsRef = collection(db, `users/${uid}/projects/${projectId}/snippets`)
      const unsubscribe = onSnapshot(projectsRef, (snapshot) => {
        const newProjects = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSnippets(newProjects);
      });
      return () => unsubscribe();
    }, [uid, projectId]);

    return (
        <div className='flex flex-col items-center justify-center'>
        {
          snippets.length === 0 ? (
            <div className='pt-5 pb-5 space-y-5'>
                <h1 className='font-extrabold text-gray-400 pb-2 border-b border-gray-700'>{projectName}</h1>
                <div className='flex flex-col px-5 py-5 border border-gray-700 rounded-md justify-center items-center pt-5'>
                    <h1 className='font-extrabold text-gray-300 text-sm md:text-md pb-4'>You don't have any snippets yet.</h1>
                    <button className='px-2 py-2 hover:animate-pulse rounded-md border border-gray-700 text-gray-300 font-bold flex flex-row justify-center items-center' onClick={() => setDisplay("newsnippet")}>
                    <h1 className='pr-2'>New Snippet</h1>
                    <MdOutlineAddBox/>
                    </button>
                </div>
            </div>
          ) : (
            <div className='flex flex-col justify-center items-center sm:pl-10 sm:pr-10 lg:pl-20 lg:pr-20 pb-5 w-full'>
              <div className="grid grid-cols-1 gap-2 sm:gap-4 md:grid-cols-2 pt-10 pb-10 p-5 w-full">
                {snippets.map((snip) => (
                  <div
                    key={snip.id}
                    className="border border-gray-700 w-full rounded-md shadow-md flex items-start justify-between px-5 py-5"
                    >
                    <div className="flex flex-col pr-2">
                      <h2 className="text-lg font-medium">{snip.name}</h2>
                      <p className="text-gray-500 break-all">{snip.prompt}</p>
                    </div>
                    <div>
                      <button className="flex flex-row font-medium py-2 px-4 rounded-md border border-gray-700 cursor-pointer hover:animate-pulse justify-center items-center">
                          <h1 className='text-gray-300 pr-2'>View</h1>
                          <MdSnippetFolder className='text-gray-300' size={20}/>
                      </button>
                      <div className='flex flex-row pt-2 justify-center items-center'>
                          <AiOutlineCode className="text-gray-300" size={15}/>
                          <h1 className='pr-2 text-gray-300 text-sm font-bold pl-2'>{snip.lang}</h1>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className='px-2 py-2 hover:animate-pulse rounded-md border border-gray-700 text-gray-300 font-bold flex flex-row justify-center items-center' onClick={() => setDisplay("newsnippet")}>
                <h1 className='pr-2'>New Snippet</h1>
                <MdOutlineAddBox/>
              </button>
            </div>
          )
        }
        <div className='flex flex-col w-full justify-end items-end pb-5 pr-5 pt-5'>
            <button className='px-2 py-2 flex flex-row border border-gray-700 rounded-md' onClick={() => setDisplay("project")}>
                <h1 className='font-bold text-gray-300'>Back</h1>
            </button>
        </div>
      </div>
    )
}
