import React from "react";
import { useTranslate } from "../app";


export const ResponseForm = () => {
    const {state, handleLanResponse, loading} = useTranslate()
    return(
        <form action="">
            <select id="" onChange={handleLanResponse} value={state.outputLan}>
                <option value="es">Español</option>
                <option value="en">English</option>
            </select><br />
            <br />
            <textarea readOnly value={loading ? "Traduciendo...": state.outputText} placeholder="Translate"/>
        </form>
    )
}