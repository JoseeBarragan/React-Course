import { Button, Card, TextInput, Title } from "@tremor/react";
import React, { useState } from "react";
import { useUsersActions } from "../hooks/userActions";

export function CreateNewUser() {
    const {handleCreateUser} = useUsersActions()
    const [result, setResult] = useState<boolean | null>(null)
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [github, setGit] = useState<string>("")
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.currentTarget.reset();
        if(name == "" || email == "" || github == "") {setResult(false); return}
        setResult(true)
        handleCreateUser(name, email, github)
        return
    }
    return (
        <Card className="dark:bg-gray-800 dark:border-0 mt-5 border max-w-7xl w-full border-gray-200 shadow-sm rounded-lg ring-0">
            <Title className="mb-1">Create New User</Title>

            <form className="space-y-2" onSubmit={handleSubmit}>
                <TextInput onChange={(e) => setName(e.target.value)} className="dark:bg-gray-900 dark:border-0 p-2 max-w-full border border-gray-200 rounded-lg focus:outline-none" placeholder="Here's the name"/>
                <TextInput onChange={(e) => setEmail(e.target.value)} type="email" className="dark:bg-gray-900 dark:border-0 p-2 max-w-full border border-gray-200 rounded-lg focus:outline-none" placeholder="Here's the email"/>
                <TextInput onChange={(e) => setGit(e.target.value)} className="dark:bg-gray-900 dark:border-0 p-2 max-w-full border border-gray-200 rounded-lg focus:outline-none" placeholder="Here's the github user"/>

                <div>
                    <Button type="submit" 
                        className="border-0 text-white bg-blue-500 p-3 cursor-pointer active:bg-blue-700 hover:bg-blue-600 rounded-2xl">
                        Create User
                    </Button>
                    {result === true && <span className="border border-green-600 bg-green-300 ml-3 rounded-lg py-2 px-4 text-green-800">Salio todo bien</span>}
                    {result === false && <span className="border border-red-600 bg-red-300 ml-3 rounded-lg py-2 px-4 text-red-800">Salio todo mal</span>}
                </div>
            </form>
        </Card>
    )
}