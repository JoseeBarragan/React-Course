import React, { useState, createContext, useContext, Dispatch, SetStateAction } from "react"
import Example from "./components/example.tsx";
import {CreateNewUser} from "./components/createNewUsers.tsx"
import { Toaster } from "sonner";
import "./index.css"
import { ModalEdit } from "./components/Modal.tsx";
import { UserWithId } from "./store/users/slice.ts";

type ContextValues = {
    setEdit: Dispatch<SetStateAction<UserWithId | null>>
    edit: UserWithId | null
}

const EditContext = createContext<ContextValues>()


export function App (){
    const [edit, setEdit] = useState<UserWithId | null>(null)
    return (
        <EditContext.Provider value={{setEdit, edit}}>
            {edit && <ModalEdit/>}
            <div className="dark:bg-gray-800 dark:border-0 max-w-7xl w-full border border-solid shadow-sm border-gray-200 rounded-lg p-6">
                <Example/>
            </div>
            <CreateNewUser/>
            <Toaster richColors/>
        </EditContext.Provider>
    );
}

export const useEdit = () => useContext(EditContext)  