import React, { useEffect, useState } from 'react'
import { AiFillCopy, AiOutlineDownload, AiFillSave } from 'react-icons/ai'
import { BiSave } from 'react-icons/bi'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { hopscotch } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export default function SystemChat({message, lang, isSnip}) {
    const [blocks, setBlocks] = useState([])
    const [styledLang, setStyledLang] = useState(lang.toLowerCase())

    const copyToClip = async (event, codes) => {
        event.preventDefault()
        await navigator.clipboard.writeText(codes)
        alert("Copied to clipboard!")
    }

    useEffect(() => {
        const regex = /```[^`\s]*\s?/g
        setBlocks(message.split(regex))
        setStyledLang(lang.toLowerCase())
    }, [])
    return (
            <div className='pt-5'>
                {blocks.map((codes, index) => {
                    if (index % 2 === 0) {
                        return ( <div>
                                { codes ? (
                                    <div className='border rounded-md border-gray-700 shadow-xl shadow px-5 py-5'>
                                        <p className='font-semibold text-gray-300' style={{"whiteSpace" : "pre-wrap"}}>{codes.trim()}</p>
                                    </div>
                                ) : (
                                        <></>
                                )
                            }
                            </div>
                        )
                    } else {
                        return (
                            <div className='rounded-sm pt-2 pb-2'>
                                <div className='flex flex-row justify-end items-end pl-2 pr-2 pb-2 '>
                                    {!isSnip && 
                                    <button className='border border-gray-700 text-gray-300 flex flex-row justify-center items-center px-1 py-1 rounded-md hover:animate-pulse ' onClick={(event) => copyToClip(event, codes)}>
                                        <h1 className='font-extrabold text-xs pr-2'>Save to Projects</h1>
                                        <BiSave/>
                                    </button>
                                    }
                                    <div className='pl-2 hidden sm:block'>
                                        <button className='border border-gray-700 text-gray-300 flex flex-row justify-center items-center px-1 py-1 rounded-md hover:animate-pulse' onClick={(event) => copyToClip(event, codes)}>
                                            <h1 className='font-extrabold text-xs pr-2'>Download Code</h1>
                                            <AiOutlineDownload/>
                                        </button>
                                    </div>
                                    <div className='pl-2 hidden sm:block'>
                                        <button className='border border-gray-700 text-gray-300 flex flex-row justify-center items-center px-1 py-1 rounded-md hover:animate-pulse' onClick={(event) => copyToClip(event, codes)}>
                                            <h1 className='font-extrabold text-xs pr-2'>Copy Code</h1>
                                            <AiFillCopy/>
                                        </button>
                                    </div>
                                </div>
                                <SyntaxHighlighter className="border rounded-sm border-gray-700 text-sm" showLineNumbers={true} language={styledLang} style={hopscotch}>
                                    {codes.trim()}
                                </SyntaxHighlighter>
                            </div>
                        )
                    }
                })}
            </div>
        )
}
