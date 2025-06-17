import React from "react";
import { User } from "../types";

interface Props {
    users: User[],
    showColors: boolean,
    handleFilterName: () => void,
    handleDeleteUser: (id: string) => void, 
    handleFilterApellido: () => void
}

export function Table ({handleFilterApellido, handleDeleteUser, users, showColors, handleFilterName}: Props){
    return(
        <div className="p-6 w-9/12 m-auto">
                <table className="w-full m-auto">
                    <thead>
                        <tr>
                            <th className="p-4">Foto</th>
                            <th className="p-4" onClick={handleFilterName}>Nombre</th>
                            <th className="p-4" onClick={handleFilterApellido}>Apellido</th>
                            <th className="p-4">Pais</th>
                            <th className="p-4">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="space-y-4 overflow-auto">
                        {
                            users?.map((user, index) => {
                                const backgroundColor = index % 2 === 0 ? "bg-gray-500" : "bg-gray-800";  
                                const background = showColors ? backgroundColor : "transparent";
                                return(
                                   <tr key={user.cell} className={`hover:bg-blue-600 border-b-10 border-b-gray-900 ${background}`} >
                                        <td className="border-none ring-0">
                                            <img src={user.picture.thumbnail} className="mx-auto" alt="" />
                                        </td>
                                        <td className="border-none ring-0">
                                                <p className="text-center">{user.name.first}</p>
                                        </td>
                                        <td>
                                            <div>
                                                <p className="text-center">{user.name.last}</p>
                                            </div>
                                        </td>
                                        <td>
                                            <p className="text-center">{user.location.country}</p>
                                        </td>
                                        <td className="">
                                            <button className="bg-black m-auto block rounded-lg px-6 py-2 cursor-pointer" onClick={() => handleDeleteUser(user.login.uuid)}>Borrar</button>
                                        </td>
                                   </tr> 
                                ) 
                            })
                        }   
                    </tbody>
                </table>
            </div>
    )
}