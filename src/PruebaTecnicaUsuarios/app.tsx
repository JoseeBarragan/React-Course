import React, { useMemo, useState } from "react"
import { type User } from "./types";
import { Table } from "./components/table";
import { filtersUsers } from "./filters";
import { useUsers } from "./hooks/useUsers";
import { Reader } from "./components/Reader";

export function App () {
    const {isLoading, isError, users, refetch, fetchNextPage, hasNextPage} = useUsers()

    const [showColors, setColors] = useState(false);
    const [order, setOrder] = useState(false)
    const [query, setQuery] = useState("")
    const [orderName, setOrderName] = useState(false)
    const [orderLast, setOrderLast] = useState(false)
    
    const handleColors = () => {
        setColors(!showColors)
    } 

    const handleFilterCountry = () => {
        setOrder(!order)
    }

    const handleDeleteUser = (id: string) => {
        users.filter(user => user.login.uuid !== id) 
    }

    const handleRemoves = () => {
        void refetch()
    }

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value)
    }

    const handleFilterApellido = () => {
        setOrderLast(!orderLast)
    }

    const handleFilterName = () => {
        setOrderName(!orderName)
    }

    const sortedUsers = useMemo(() : User[] => {
        return filtersUsers(users, order, orderLast, orderName, query).length > 0 ? filtersUsers(users, order, orderLast, orderName, query) : [];
    }, [order, orderName, users, orderLast, query])

    return(
        <>
            <header className="my-6 flex justify-center gap-6">
                <button className="bg-black py-2 px-6 rounded-lg cursor-pointer" onClick={handleColors}>Colorear Filas</button>
                <button className="bg-black py-2 px-6 rounded-lg cursor-pointer" onClick={handleFilterCountry}>Ordenar por Pais</button>
                <button className="bg-black py-2 px-6 rounded-lg cursor-pointer" onClick={handleRemoves}>Reestablecer Eliminados</button>
                <input type="text" value={query} onChange={handleSearch} className="outline-none border rounded-lg border-black p-4" placeholder="Filtrado por Pais"/>
            </header>
            <Reader/>
            {sortedUsers.length == 0 || isError && <p className="m-auto w-md rounded-lg py-4 text-center mt-52 bg-red-500 ">{isError}</p>}
            {sortedUsers.length != 0 && !isError && <Table handleFilterApellido={handleFilterApellido} handleDeleteUser={handleDeleteUser} handleFilterName={handleFilterName} users={sortedUsers} showColors={showColors}/>}
            {isLoading && <span className="w-10 h-10 block rounded-full border-4 animate-spin m-auto border-t-blue-600 border-white"></span>}
            {hasNextPage && typeof isError !== "string" && !isLoading && <button onClick={() => {void fetchNextPage()}} className="bg-black py-2 px-6 rounded-lg cursor-pointer m-auto block">Cargar más resultados</button>}
            {!isLoading && !hasNextPage && <p className="m-auto w-md rounded-lg py-4 text-center">Ya no hay mas resultados</p>}
        </>
    )
}