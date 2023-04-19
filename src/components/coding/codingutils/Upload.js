import React, { useState, useEffect } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { hopscotch } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const Upload = ({lang, setDisplay, setCodeReference}) => {
    const [code, setCode] = useState('')
    const [styledLang, setStyledLang] = useState(lang.toLowerCase())
    const [done, setDone] = useState(false)

    useEffect(() => {
        setStyledLang(lang.replace('-', '').replace('++', 'pp').replace('#', 'sharp').replace('JSX', 'javascript').replace('TSX', 'typescript').toLowerCase())
    }, [])

    const handleCodeChange = (event) => {
        event.preventDefault()
        setCode(event.target.value);
        setCodeReference(event.target.value)
    };

    const clearCode = (event) => {
        event.preventDefault()
        setDone(false)
        setCode('')
    }

    return (
        <div className="flex flex-col items-center justify-center w-full pl-2 pr-2 pb-2 pt-2">
            <div className="w-full max-w-md">
                <label className="block mb-2 font-bold text-gray-300" htmlFor="code">
                Paste Reference Code:
                </label>
                {done ? (
                    <div className='border border-gray-700'>
                        <SyntaxHighlighter showLineNumbers language={styledLang} style={hopscotch}>
                            {code}
                        </SyntaxHighlighter>
                    </div>
                ) : (
                <textarea
                    className="block w-full px-3 py-2 leading-tight border border-gray-700 bg-gray-800/80 rounded-md focus:outline-none focus:shadow-outline"
                    rows="5"
                    id="code"
                    maxlength="10000"
                    value={code}
                    onChange={handleCodeChange}
                />
                )}
                <div className='pt-5 pb-2 flex flex-row justify-between items-center'>
                    <button className='border border-gray-700 rounded-md hover:animate-pulse px-2 py-2 font-bold text-gray-300 text-sm' onClick={() => setDisplay('main')}>Back</button>
                    <div className='flex flex-row justify-center items-center space-x-2'>
                        <button className='border border-gray-700 rounded-md hover:animate-pulse px-2 py-2 font-bold text-gray-300 text-sm' onClick={(event) => clearCode(event)}>Clear</button>
                        <button className='border border-gray-700 rounded-md hover:animate-pulse px-2 py-2 font-bold text-gray-300 text-sm' onClick={() => setDone(!done)}>Add</button>
                    </div>
                </div>
            </div>
        </div>
    );
    };

export default Upload;
