import { createRoot } from "react-dom/client";
import {App} from "./app.tsx";
import { StrictMode } from "react";
import "todomvc-app-css/index.css";
import './style.css'
import React from "react"

createRoot(document.getElementById("root")!).render(
    <StrictMode>   
        <App/>
    </StrictMode>
)