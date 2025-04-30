import { useState, useEffect } from 'react';

export const App = () => {
    const [fact, setFact] = useState('');
    const [img, setimg] = useState('');
    
    useEffect(() => {
        (async () => {
            try{
                const response = await fetch('https://catfact.ninja/fact');
                const data = await response.json();
                const {fact} = data;
                setFact(fact); 
                const word = fact.slice(0, data.fact.indexOf(' '));
                const responseI = await fetch(`https://cataas.com/cat/says/${word}?size=50&color=red&json=true`);
                const dataI = await responseI.json();
                setimg(dataI.url);
            }
            catch (error){
                console.error('Error fetching cat fact:', error);
            }
        })();
    }, [])

    const handleClick = async () =>{
        const response = await fetch('https://catfact.ninja/fact');
        const data = await response.json();
        const {fact} = data;
        setFact(fact); 
        const word = fact.slice(0, data.fact.indexOf(' '));
        const responseI = await fetch(`https://cataas.com/cat/says/${word}?size=50&color=red&json=true`);
        const dataI = await responseI.json();
        setimg(dataI.url);
    }

    return(
        <main>
            <h1>App de gatos</h1>
            <button onClick={handleClick}>Get new fact</button>
            <p> {fact} </p>
            <img src={img}/>
        </main>
    )

}