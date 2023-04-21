import React, { useState } from 'react'
import Tip from './Tip'
import { BsCodeSlash, BsFillInfoSquareFill, BsDownload, BsFillLightningChargeFill } from 'react-icons/bs'
import { HiDocumentSearch } from 'react-icons/hi'
import ChatBar from './ChatBar'
import ChatLog from './ChatLog'

export default function Chat({lang, frameworks, chain, setChain, setDisplay, setPush}) {
  const [responseLoading, setResponseLoading] = useState(false)
  return (
    <div className='flex flex-col items-center justify-center pb-5'>
        {
          chain.length !== 0 ? (
            <ChatLog lang={lang} chain={chain} responseLoading={responseLoading} setDisplay={setDisplay} setPush={setPush}/>
          ) : (
            <div className='flex flex-col justify-center items-center'>
              <Tip title={"This is your coding assistant"} icon={<BsFillInfoSquareFill size={15}/>} description={"Ask a question and get code and comments back as a response"}/>
              <Tip title={"Add Frameworks"} icon={<HiDocumentSearch size={20}/>} description={"Choose from an array of reference documentation"}/>
              <div className='hidden lg:block w-full'>
                <Tip title={"Refactor Code"} icon={<BsCodeSlash size={15}/>} description={"Attach code and reference it with your questions"}/>
              </div>
              <Tip title={"Save Responses"} icon={<BsDownload size={15}/>} description={"Copy code and add to your projects"}/>
              <Tip title={"Ready?"} icon={<BsFillLightningChargeFill className="text-green-600" size={15}/>} description={"Enter a chat to get started"}/>
            </div>
          )
        }
        <ChatBar lang={lang} frameworks={frameworks} chain={chain} setChain={setChain} setResponseLoading={setResponseLoading}/>
    </div>
  )
}
