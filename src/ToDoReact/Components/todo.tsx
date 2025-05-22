import { type todo } from "../types"
import { useTodos } from "../app"
import React, { useState } from "react"

type Props = todo

export const Todo: React.FC<Props> = ({id, title, completed}) => {
    const {setTodos} = useTodos()
    const [comp, setComp] = useState(completed)

    const handleChange = () => {
        setComp(!comp);
        (async () => {
            completed = !completed

            const response = await fetch(`http://localhost:3000/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    completed: completed
                })
            })
            const data = await response.json()
            setTodos(data)
        })();
    }

    const handleClick = () => {
        setTodos((prevTodos: todo[]) => {
                const index = prevTodos.findIndex(todo => todo.id === id)
                const newTodos = [...prevTodos] 
                newTodos.splice(index, 1)       
                return newTodos
        })
    }

    return(
        <div className="view">
            <input type="checkbox" className="toggle" checked={comp} onChange={handleChange} />
            <label>{title}</label>
            <button className="destroy" onClick={handleClick}/>
        </div>
    )
}