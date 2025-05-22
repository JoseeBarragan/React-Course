import {TodoModel} from '../Models/TodoModel.js'

export class TodoController {
    static getAll = (filter) => {
        const Todos = TodoModel.getAll(filter)
        return Todos
    }
    static create = (data) => {
        const {title} = data
        const Todos = TodoModel.create(title)
        return Todos
    }
    static changeState = (id, completed) => {
        const Todos = TodoModel.changeState(id, completed)
        return Todos
    }
    static delete = (completed) => {
        const Todos = TodoModel.delete(completed);
        return Todos
    }
}