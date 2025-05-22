import { useTodos } from "../app"
import { todo } from "../types"
import { Todo } from "./todo"
import React from "react"


export const Todos: React.FC =  () => {
    const {todos}= useTodos()
    return(
        <ul className="todo-list">
            {todos.map((todo: todo) => (
                <li key={todo.id} className={`${todo.completed ? "completed": ""}`}>
                    <Todo key={todo.id} id={todo.id} title={todo.title} completed={todo.completed}/>
                </li>
            ))}
        </ul>
    )
}