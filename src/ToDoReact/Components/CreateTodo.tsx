import React, { useState } from "react"
import { useTodos } from "../app";

export const CreateTodo: React.FC = () => {
    const [inputValue, setInputValue] = useState('');
    const {handleAddTodo} = useTodos()
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault()
        handleAddTodo({title: inputValue})
        setInputValue('')
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" 
            className="new-todo" 
            value={inputValue} 
            onChange={(event) => {setInputValue(event.target.value)}}
            onKeyDown={() => {}}
            placeholder="Que quieres hacer?"
            autoFocus
            />
        </form>
    )
}