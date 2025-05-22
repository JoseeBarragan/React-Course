import { randomUUID } from 'node:crypto'
import {createRequire} from 'node:module'
const require = createRequire(import.meta.url)
let Todos = require("../Mocks/Todos.json")

export class TodoModel {
    static getAll = (filter) => {
        if(filter === 'all') return Todos
        if(filter === 'completed'){
            return Todos.filter(todo => todo.completed === true) 
        }
        else if(filter === 'active'){
            return Todos.filter(todo => todo.completed === false)
        }
        return Todos
    }
    static create = (title) => {
        const Todo = {
            id: randomUUID(),
            title: title,
            completed: false
        }
        Todos.push(Todo)
        return Todos
    }
    static changeState = (id, completed) => {
        const index = Todos.findIndex(todo => todo.id === id);
        const newTodos = {
            ...Todos[index],
            completed: completed
        }
        Todos[index] = newTodos
        return Todos
    }
    static delete = (completed) => {
        Todos = Todos.filter(todo => todo.completed === !completed)      
        return Todos
    }
}