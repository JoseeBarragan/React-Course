export interface todo {
        id: string,
        title: string,
        completed: boolean
}

export type ListOfTodos = todo[]

export interface Props {
    todos: ListOfTodos
}