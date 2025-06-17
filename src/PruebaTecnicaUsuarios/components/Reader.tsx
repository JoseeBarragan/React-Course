import { useUsers } from "../hooks/useUsers"
import React from "react"

export const Reader = () => {
    const {users} = useUsers()
    return (
        <h3 className="fixed bottom-5 bg-gray-400 rounded-md py-4 px-8">Cantidad de usuarios {users.length}</h3>
    )
}