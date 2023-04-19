import React, { useState } from 'react'
import FrameworkSet from './FrameworkSet'
import { MdOutlineAddBox } from 'react-icons/md'

export default function FrameworkList({frameworks, setDisplay, setFrameworks}) {
    const [wildcard, setWildcard] = useState("")
    const categories = ["Popular Miscellaneous", "Web and Mobile", "Data and Machine Learning", "Cloud Service Providers"] //, "Web", "Cloud Service Providers", "Machine Learning"
    const frames = {"Popular Miscellaneous": ["Compojure", "Cocoa Touch", "Catalyst"," CodeIgniter", 
                                "Combine", "Cowboy", "Chicago Boss", "Django", "Fable", "Flask", "Grails","Hibernate","Hanami",
                                "Ktor", "Ruby on Rails", "Sinatra", "Spring Boot", "Struts", "SwiftUI"], 
                      "Web and Mobile": ["Angular", "Bootstrap", "Express.js", "Firebase" , "Flutter", "Node.js", "React", "React Native", "Tailwind" ,"Vue.js"], 
                      "Data and Machine Learning": ["Gen.jl", "ggplot2", "Flux.jl", "NumPy", "Pandas", "PyTorch", "Shiny", "StatsModels", "SKLearn", "TensorFlow"], 
                      "Cloud Service Providers": ["AWS", "Azure","DigitalOcean", "GCP", "IBM Cloud", "OCI (Oracle)", "OpenShift",
                                                  "Rackspace", "VMware Cloud"]}
    const handleAdd = (event) => {
      event.preventDefault()
      if (!frameworks.includes(wildcard) && frameworks.length < 3) { 
          setFrameworks([...frameworks, wildcard])
      }
      setWildcard("")
    }
    
    const handleClick = (event) => {
      event.preventDefault()
      setDisplay("main")
    }

    return (
      <div>
        <h1 className='font-bold text-md pb-2 text-gray-300 pt-5 pl-10'>Choose up to 3</h1>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 justify-start items-start p-10 pt-5">
          {
            categories.map((category) => {
              return <FrameworkSet category={category} listFrames={frames[category]} frameworks={frameworks} setFrameworks={setFrameworks}/>
            })
          }
          </div>
          <div className='flex flex-row justify-between items-end border-t pt-5 border-gray-700 pl-10 pr-10 pb-5'>
            <div>
              <h1 className='font-bold text-md pb-2 text-gray-300'>Add Unlisted</h1>
              <div className='flex flex-row justify-between items-center'>
                <input type='text' maxLength={100} placeholder='Pre-2022 Framework' className='text-md sm:w-[150%] border-gray-700 focus:outline-none bg-gray-800/80 rounded-md px-2 py-2 border border-gray-700'
                  value={wildcard}
                  onChange={(event) => setWildcard(event.target.value)}
                ></input>
                <div className='pl-2 cursor-pointer hover:animate-pulse' onClick={(event) => handleAdd(event)}>
                  <MdOutlineAddBox className='text-gray-300' size={25}/>
                </div>
              </div>
            </div>
            <div className='flex flex-row justify-center items-center'>
              <div className='pr-2'>
                <button className='border border-gray-700 rounded-md px-2 py-2 font-extrabold text-gray-300 hover:animate-pulse' onClick={(event) => setFrameworks([])}>Clear</button>
              </div>
              <button className='border border-gray-700 rounded-md px-2 py-2 font-extrabold text-gray-300 hover:animate-pulse' onClick={(event) => handleClick(event)}>Back</button>
            </div>
          </div>
      </div>
    )
}
