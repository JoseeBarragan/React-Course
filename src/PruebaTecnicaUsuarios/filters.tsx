import { User } from "./types"

export const filtersUsers = (users: User[] | undefined,country: boolean, orderLast: boolean, orderName: boolean, query: string) : User[] => {
    if(users != undefined){
        if(query.length != 0){
            const draft = structuredClone(users) 
            const newUsers = draft?.filter(user => user.location.country.toLowerCase().includes(query.toLowerCase()));
            return newUsers
        }
        if(country){
            const draft = structuredClone(users)
            const newUsers = draft?.sort((a,b) => a.location.country.localeCompare(b.location.country))
            return newUsers
        }
        else if(orderLast){
            const draft = structuredClone(users)
            const newUsers = draft?.sort((a,b) => a.name.last.localeCompare(b.name.last))
            return newUsers
        }
        else if(orderName){
            const draft = structuredClone(users)
            const newUsers = draft?.sort((a,b) => a.name.first.localeCompare(b.name.first))
            return newUsers
        }
        return users
    }
    return []
} 