import {useEffect, useState} from 'react';

const NAVIGATION_EVENT = 'pushstate';

function navigate (href) {
    window.history.pushState({}, '', href);
    const navigationEvent = new Event(NAVIGATION_EVENT);
    window.dispatchEvent(navigationEvent);
}

function HomePage() {
    return(
        <>
            <h2>Home</h2>
            <button onClick={() => navigate('/src/ReactRouter/about')}>Ir al about</button>
        </>
    )
}

function About() {
    return(
        <>
            <h2>About</h2>
            <button onClick={() => navigate('/src/ReactRouter/')}>Ir al Home</button>
        </>
    )
}


export function App () {
    const[currentPath, setPath] = useState(window.location.pathname)
    
    useEffect(() => {
        const onLocationChange = () => {
            setPath(window.location.pathname);
        }

        window.addEventListener(NAVIGATION_EVENT, onLocationChange);
        window.addEventListener('popstate', onLocationChange)

        return () => {
            window.removeEventListener(NAVIGATION_EVENT, onLocationChange)
            window.addEventListener('popstate', onLocationChange)
        }
    }, [])
    
    return(
        <main>
            {currentPath === '/src/ReactRouter/' && <HomePage/>}
            {currentPath === '/src/ReactRouter/about' && <About/>}
        </main>
    )
}