import React, { useState } from "react"
import { useEdit } from "../app"
import { Button, Card, TextInput, Title } from "@tremor/react";
import { useUsersActions } from "../hooks/userActions";
import { UserWithId } from "../store/users/slice";


export function ModalEdit () {
    const {setEdit, edit} = useEdit()
    const {handleEditUser} = useUsersActions()
    const [name, setName] = useState<string | undefined>(edit?.name)
    const [email, setEmail] = useState<string | undefined >(edit?.email)
    const [github, setGithub] = useState<string | undefined>(edit?.github)
    const user: UserWithId = {
        name: name,
        email: email,
        github: github,
        id: edit?.id
    }
    return (
        <>
            <div onClick={() => setEdit(null)} className="bg-black opacity-50 absolute top-0 left-0 w-full h-full"></div>
            <div className="dark:bg-gray-800 w-10/12 min-h-79 max-h-4/11 max-w-2xl absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl">
                <Card className="border-none ring-0 space-y-3">
                    <Title className="text-xl">Edit User: <span className="ml-2">{edit?.name}</span></Title>
                    <TextInput onChange={(event) => setName(event.target.value)} placeholder={ edit?.name} className="dark:bg-gray-900 dark:border-none ring-0 pl-2 py-1 rounded-lg border-gray-300"/>
                    <TextInput onChange={(event) => setEmail(event.target.value)} placeholder={ edit?.email} className="dark:bg-gray-900 dark:border-none ring-0 pl-2 py-1 rounded-lg border-gray-300"/>
                    <TextInput onChange={(event) => setGithub(event.target.value)} placeholder={ edit?.github} className="dark:bg-gray-900 dark:border-none ring-0 pl-2 py-1 rounded-lg border-gray-300"/>
                    <Button className="cursor-pointer border-none text-white bg-blue-500 rounded-xl hover:bg-blue-600 active:bg-blue-700" onClick={() => handleEditUser(user)}>Submit</Button>
                </Card>
            </div>
        </>
    )
}