import React, { useEffect, useState } from 'react'
import { FiSend } from 'react-icons/fi'
import { AiOutlineArrowUp } from 'react-icons/ai'
import { RxReset } from 'react-icons/rx'
import { getFunctions, httpsCallable } from "firebase/functions"

const ProgressBar = ({ progress, setProgress, items }) => {

  const calculateProgress = () => {
    const totalChars = [...items].reduce((acc, item) => acc + item["content"].length, 0);
    const progress = Math.min(Math.round((totalChars / 10000) * 100), 100);
    setProgress(progress);
  };

  useEffect(() => {
    calculateProgress()
    console.log(progress)
  }, [items])

  return (
    <div className="pl-4 pr-4 relative w-full h-4 bg-gradient-to-l from-gray-800 to-gray-900 rounded-full border-gray-700 border">
      <div className="absolute top-0 left-0 h-full bg-purple-600 rounded-full" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default function ChatBar({lang, frameworks, chain, setChain, setResponseLoading}) {
  const [inputValue, setInputValue] = useState()
  const [progress, setProgress] = useState(0);
  const functions = getFunctions()
  const getChainResponse = httpsCallable(functions, 'getChainResponse')

  function handleInputChange(event) {
    setInputValue(event.target.value)
  }

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const resetChain = () => {
    setChain([])
  };

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

  function handleAddItem() {
    if (inputValue) {
      let openAiMessage = chain;
      setResponseLoading(true)
      openAiMessage.push({"role": "user", "content": inputValue})
      getChainResponse({lang: lang, frames: formatList(frameworks), chain: openAiMessage}).then((response) => {
          const code = response.data.content.trim()
          setChain([...chain, {"role": "assistant", "content": code}])
          setResponseLoading(false)
      }).catch((error) => {
        setChain([...chain, {"role": "assistant", "content": "There was an error getting that response. You can try again, but the chat likely got too long."}])
        setResponseLoading(false)
      })
      console.log(openAiMessage)
      setInputValue('')
    }
  }

  return (
    <div className='flex flex-col w-full'>
      <div className='flex flex-row justify-end items-end w-full pt-10 bg-gray-900 pb-5'>
        <div className='flex flex-row w-full border-t border-gray-700 justify-center items-center pt-5 pl-5 pr-5 xl:pl-60 xl:pr-60 lg:pl-40 lg:pr-40 md:pl-20 md:pr-20'>
        <textarea type='text' rows="2" placeholder="Type your chat here" className='text-md w-full border-gray-700 focus:outline-none bg-gray-800/80 rounded-md px-2 py-2 border border-gray-700'
          value={inputValue}
          onChange={handleInputChange}
          onSubmit={handleAddItem}
        ></textarea>
            <div className='pl-2'>
                <button disabled={progress > 100} className='flex flex-row justify-center items-center rounded-md border border-gray-700 text-gray-300 px-2 py-2 hover:animate-pulse duration-200' onClick={handleAddItem}>
                    <h1 className='pr-2 font-semibold'>Send</h1>
                    <FiSend size={20}/>
                </button>
            </div>
        </div>
      </div>
      <div className='flex items-center justify-between pt-2 pb-4 pl-2 pr-2'>
        <div className="flex flex-row items-center sm:pl-10 pl-2 sm:pr-5 lg:pr-10 pr-2 hover:animate-pulse" onClick={scrollToTop}>
          <button className="flex text-gray-300 font-bold pr-2">Scroll</button>
          <AiOutlineArrowUp className='text-gray-300'/>
        </div>
        <ProgressBar items={chain} progress={progress} setProgress={setProgress}/>
        <div className="flex flex-row items-center sm:pr-10 pr-2 sm:pl-5 lg:pl-10 pl-2 hover:animate-pulse" onClick={resetChain}>
          <button className="text-gray-300 font-bold pr-2">Reset</button>
          <RxReset className='text-gray-300'/>
        </div>
      </div>
    </div>
  )
}
