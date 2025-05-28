import React, { ChangeEvent, createContext, Dispatch, SetStateAction, useContext, useReducer, useState, useRef } from "react"
import {ClientForm} from './Components/ClientForm.tsx'
import {ResponseForm} from './Components/ResponseForm.tsx'
import { HTMLSelectElement } from "happy-dom"

const TranslateContext = createContext<ContextValues>()

interface ContextValues {
    input: string,
    setInput: Dispatch<SetStateAction<string>>,
    handleLanClient: React.FC<React.ChangeEvent<HTMLSelectElement>>,
    state: Props,
    handleLanResponse: React.FC<React.ChangeEvent<HTMLSelectElement>>,
    loading: boolean,
    setLoading: Dispatch<SetStateAction<boolean>>,
    handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
}

interface ActionProps{
    type?: string,
    draft?: string,
    translate?: string,
    phrase?: string
}

const initialState = {inputLan: "en", outputLan: "es", inputText: "", outputText: ""}

const Reducer = (state: Props, action: ActionProps) => {
    switch(action.draft){
        case "client":
            switch (action.type) {
                case "en":
                    return{
                        ...state,
                        inputLan: "en"
                    }
                case "es":
                    return{
                        ...state,
                        inputLan: "es"
                    }
            }
            return state
        case "response":
            switch(action.type){
                case "en":
                    return{
                        ...state,
                        outputLan: "en"
                    }
                case "es":
                    return{
                        ...state,
                        outputLan: "es"
                    }
            }
            return state
        case "exchange":
            return{
                ...state,
                inputLan: state.outputLan,
                outputLan: state.inputLan,
                inputText: state.outputText,
                outputText: state.inputText
            }
    }
    if(action.phrase?.length != undefined) {
        if(action.phrase.length < 2) return {...state, outputText: ""}
    }
    if((action.translate?.length != 0) == false || action.phrase?.length != 0){
        console.log(action, state)
        return{
            ...state,
            inputText: action.phrase,
            outputText: action.translate
        }
    }
    return state
}

interface Props {
    inputLan: string,
    outputLan: string,
    inputText: string,
    outputText: string
}


export function App () {
    const [state, dispatch] = useReducer(Reducer, initialState);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const timeoutRef = useRef<number | null>(null)

    //: React.FC<React.ChangeEvent<HTMLSelectElement>> 
    const handleLanClient = (event: ChangeEvent<HTMLSelectElement>) => dispatch({
        type: event.target.value,
        draft: "client"
    })
    
    const handleLanResponse = (event: ChangeEvent<HTMLSelectElement>) => dispatch({
        type: event.target.value,
        draft: "response"
    })

    const handleChange = async (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(event.target?.value)
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
      
        setLoading(true);
        timeoutRef.current = setTimeout(async () => {
            const response = await fetch(`https://api.mymemory.translated.net/get?q=${event.target.value}&langpair=${state.inputLan}|${state.outputLan}`);
            const data = await response.json();
            const ans = data.responseData.translatedText;
            dispatch({ phrase: event.target.value, translate: ans });
            setLoading(false);
        }, 500);
    };

    const changeLan = () => {
        dispatch({draft: "exchange"})
        setInput(state.outputText)
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
      
        setLoading(true);
        timeoutRef.current = setTimeout(async () => {
            const response = await fetch(`https://api.mymemory.translated.net/get?q=${state.outputText}&langpair=${state.outputLan}|${state.inputLan}`);
            const data = await response.json();
            const ans = data.responseData.translatedText;
            dispatch({ phrase: state.inputText, translate: ans });
            setLoading(false);
        }, 800);
    }
    
    return(
        <TranslateContext.Provider value={{input, setInput, handleLanClient, state, handleLanResponse, loading, setLoading, handleChange}}>
            <main>
                <h1>Google translator</h1>
                <span onClick={changeLan}><svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z"></path></svg></span>
                <div className="main">
                    <ClientForm/>
                    <ResponseForm/>
                </div>
            </main>
        </TranslateContext.Provider>
    )
}

export const useTranslate = () => useContext(TranslateContext)