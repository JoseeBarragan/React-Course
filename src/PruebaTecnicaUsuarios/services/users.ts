import { QueryFunctionContext } from "@tanstack/react-query";
import { User } from "../types";

export const fetchUsers = async ({pageParam = 1}: QueryFunctionContext): Promise<{ users: User[]; nextCursor: number }> => {
    try{
        const result = await fetch(`https://randomuser.me/api/?results=10&seed=midudev&page=${pageParam}`)
        const data = await result.json()
        const currentPage = data.info.page
        const nextCursor = currentPage > 3 ? undefined : currentPage + 1;
        return {
            users: data.results,
            nextCursor
        }
    }
    catch(err){
        console.log(err)
        return {
            users: [],
            nextCursor: 1
        }
    }
} 