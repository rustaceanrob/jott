import React from 'react'

export default function Framework({framework, frameworks, setFrameworks}) {

    // const [items, setItems] = useState(['item 1', 'item 2', 'item 3']);

    // // ...

    // const addItem = () => {
    // const newItem = 'item ' + (items.length + 1);
    // setItems([...items, newItem]);
    // };

    const handleClick = (event) => {
        event.preventDefault()
        if (!frameworks.includes(framework) && frameworks.length < 3) { 
            setFrameworks([...frameworks, framework])
        }
    }
    return (
        <button className='flex flex-row items-start justify-start' onClick={(event) => handleClick(event)}>
            <h1 className='font-bold hover:animate-pulse text-sm text-gray-300 items-start justify-start'>{framework}</h1>
        </button>
    )
}
