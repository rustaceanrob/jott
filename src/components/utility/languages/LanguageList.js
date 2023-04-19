import React from 'react'
import CodeCategory from './CodeCategory'

export default function LanguageList({setDisplay, setLang}) {
    const categories = ["Web", "Functional", "OOP, Mobile, iOS", "Data"]
    const languages = {"Web": ["JavaScript", "TypeScript", "HTML", "CSS", "JSX", "TSX", "PHP"],
                        "OOP, Mobile, iOS": ["Java", "C#", "Dart", "Python", "Swift", "Kotlin", "Ruby", "Objective-C", "C++"],
                       "Functional": ["Haskell", "Lisp", "Clojure", "F#", "OCaml", "Erlang", "Scala"], 
                       "Data": ["SQL", "R", "SAS", "MATLAB", "Julia"]}

    return (
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 justify-center items-center p-10">
          {
            categories.map((category) => {
              return <CodeCategory languages={languages[category]} type={category} setDisplay={setDisplay} setLang={setLang}/>
            })
          }
        </div>
    )
}
