import { useTodos } from '../app.tsx'
import {Filters} from './filters.tsx'
import React from "react"

interface Props {
    activeCount: number,
    completedCount: number,
}

export const Footer: React.FC<Props> = ({activeCount, completedCount}) => {
    const {handleRemoveAllCompleted} = useTodos()
    return(
    <footer className="footer">
        <span className="todo-count">
            <strong>{activeCount}</strong> tareas pendientes
        </span>
        <Filters/>
        {
            completedCount > 0 && (
                <button 
                onClick={handleRemoveAllCompleted}
                className='clear-completed'>
                    Borrar Completadas
                </button>
            )
        }
    </footer>
  )  
}