import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState, type JSX} from "react"
import {Todos} from './Components/todos.tsx'
import { TODO_FILTERS } from "./consts.ts";
import { FilterValue } from "./Components/filters.tsx";
import { Footer } from "./Components/footer.tsx";
import React from "react"
import { Header } from "./Components/Header.tsx";
import { todo } from "./types";

interface Props {
    todos: todo[],
    setTodos: Dispatch<SetStateAction<todo[]>>
    handleRemoveAllCompleted: () => void,
    handleAddTodo: (title: Pick<todo, "title">) => void,
    filterSelected: FilterValue,
    handleFilter: (filter: FilterValue) => void
}

const TodosContext = createContext<Props>();


export function App() : JSX.Element {
    const [todos, setTodos] = useState<todo[]>([])
    const [filterSelected, setFilter] = useState<FilterValue>(TODO_FILTERS.ALL)
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("http://localhost:3000", {
                method: 'GET',
                mode: 'cors'
            })
            const data = await response.json()
            setTodos(data)
        }
        fetchData();
    }, [])

    const handleFilter = (filter: FilterValue) => {
        setFilter(filter)
    }

    const handleRemoveAllCompleted = () => {
        (async () => {
            const response = await fetch('http://localhost:3000/true', {
                method: 'DELETE'
            })
            const data = await response.json()
            setTodos(data)
        })();
    }

    const handleAddTodo = ({title}: Pick<todo, "title">):void => {
        (async () => {
            const response = await fetch("http://localhost:3000", {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    title: title
                })
            })
            const data = await response.json()
            setTodos(data)
        })();
    }
    const active = todos.filter(todo => todo.completed === false).length
    return(
        <TodosContext.Provider value={{todos, setTodos, handleRemoveAllCompleted, handleAddTodo, filterSelected, handleFilter}}>
            <div className="todoapp">
                <Header/>
                <Todos/>
                <Footer 
                completedCount={todos.length}
                activeCount={active} />
            </div>
        </TodosContext.Provider>
    )
}

export const useTodos = () => useContext(TodosContext)