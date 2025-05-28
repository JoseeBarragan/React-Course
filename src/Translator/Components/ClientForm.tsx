import React from "react"
import { useTranslate } from "../app"

export const ClientForm = () => {
    const {handleLanClient, handleChange, input, state} = useTranslate()

    return(
        <form action="">
            <select id="" onChange={handleLanClient} value={state.inputLan}>
                <option value="en">English</option>
                <option value="es">Español</option>
            </select><br />
            <br />
            <textarea placeholder="Translate" id="input" value={input} onChange={handleChange}/>
        </form>
    )
}
