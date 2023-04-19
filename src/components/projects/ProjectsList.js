import React, {useState, useEffect} from 'react'
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase";
import { MdOutlineAddBox, MdSnippetFolder } from 'react-icons/md';
import { AiOutlineLoading } from "react-icons/ai"

export default function ProjectsList({uid, setDisplay, setProjectId, setProjectName}) {
    const [projects, setProjects] = useState()

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
    }, [uid]);

    const handleClickToSnip = (event, id, name) => {
      event.preventDefault()
      setProjectId(id)
      setProjectName(name)
      setDisplay("project")
    }

    return (
      <div className='flex flex-col items-center justify-center'>
        {!projects && <div className='pt-5 pb-5'><AiOutlineLoading className='animate-spin' size={20}/></div> }
        {
          projects ? (
            <div className=' w-full'>
              {
                projects.length === 0 ? (
                  <div className='pt-5 pb-5 pl-5 pr-5'>
                    <div className='flex flex-col px-5 py-5 border border-gray-700 rounded-md justify-center items-center'>
                      <h1 className='font-extrabold text-gray-300 text-sm md:text-md pb-4'>You don't have any projects yet.</h1>
                      <button className='px-2 py-2 hover:animate-pulse rounded-md border border-gray-700 text-gray-300 font-bold flex flex-row justify-center items-center' onClick={() => setDisplay("newproject")}>
                        <h1 className='pr-2'>New Project</h1>
                        <MdOutlineAddBox/>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className='flex flex-col justify-center items-center sm:pl-10 sm:pr-10 lg:pl-20 lg:pr-20 pb-5'>
                    <div className="grid grid-cols-1 gap-2 sm:gap-4 md:grid-cols-2 pt-10 pb-10 p-5 w-full">
                      {projects.map((project) => (
                        <div
                          key={project.id}
                          className="border border-gray-700 w-full rounded-md shadow-md flex items-start justify-between px-5 py-5"
                          >
                          <div className="flex flex-col pr-2">
                            <h2 className="text-lg font-medium">{project.name}</h2>
                            <p className="text-gray-500 break-all">{project.description}</p>
                          </div>
                          <div>
                            <button className="flex flex-row font-medium py-2 px-4 rounded-md border border-gray-700 cursor-pointer hover:animate-pulse justify-center items-center" onClick={(event) => handleClickToSnip(event, project.id, project.name)}>
                                <h1 className='text-gray-300 pr-2'>Snippets</h1>
                                <MdSnippetFolder className='text-gray-300' size={20}/>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button className='px-2 py-2 hover:animate-pulse rounded-md border border-gray-700 text-gray-300 font-bold flex flex-row justify-center items-center' onClick={() => setDisplay("newproject")}>
                      <h1 className='pr-2'>New Project</h1>
                      <MdOutlineAddBox/>
                    </button>
                  </div>
                )
              }
            </div>
          ) : (
            <></>
          )
        }
      </div>
    )
}
