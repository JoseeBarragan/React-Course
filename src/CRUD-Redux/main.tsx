import React from "react";
import { createRoot } from "react-dom/client";
import {App} from './app.tsx'
import './index.css';
import { store } from "./store/index.ts";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <App/>
    </Provider>
)