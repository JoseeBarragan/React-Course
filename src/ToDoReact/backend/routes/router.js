import {Router} from 'express'
import {TodoController} from '../Controller/TodoController.js'

export function AppRouter () {
    const appRouter = Router()
    appRouter.get('/', (req, res) => {
        const {filter} = req.query
        const Todos = TodoController.getAll(filter)
        res.json(Todos)
    })
    appRouter.post('/', (req, res) => {
        const Todos = TodoController.create(req.body)
        res.json(Todos)
    })
    appRouter.patch('/:id', (req, res) => {
        const {id} = req.params;
        const {completed} = req.body;
        const Todos = TodoController.changeState(id, completed);
        res.json(Todos)
    })
    appRouter.delete('/:completed', (req, res) => {
        const {completed} = req.params;
        const Todos = TodoController.delete(completed)
        res.json(Todos)
    })
    return appRouter;
}