import React from "react"
import { CreateTodo } from "./CreateTodo"


export const Header: React.FC = () => {
    return(
        <header className="header">
            <h1>ToDo <img style={{width: "90px", height: "60px"}} src="https://miro.medium.com/v2/resize:fit:1000/1*C24eNZfu0CT5fSTBt6IugA.png"></img></h1>
            <CreateTodo/>
        </header>
    )
} 