import {useState, useEffect, useRef} from 'react';
import useMovies from './useMovies.tsx';

function useSearch () {
    const [search, setSearch] = useState('');
    const [error, setError] = useState(null);
    const isFirstRender = useRef(true);

    const updateSearch = (newSearch: string) => {
        setSearch(newSearch)
    }
    const updateError = (newError: string | null) => {
        setError(newError);
    }    
    useEffect(() => {
        if(isFirstRender.current){
            isFirstRender.current = search === '';
            return;
        }
        if(search === ''){
            updateError('No se ha encontrado la pelicula');
            return;
        } 
        updateError(null);
    }, [search])
    return{search, updateSearch, error};
}

export const App = () => {
    const { search, updateSearch, error} = useSearch();
    const {movies, loading,  getMovies} = useMovies({search});
    const inputRef = useRef(null);
    const moviesResult = movies;
    const anyMovie = moviesResult?.length > 0;
    const handleChange = (event) => {
        updateSearch(event.target.value);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        // const value = inputRef.current
        // const invalue = value?.value
        getMovies();
        /*ALTERNATIVA PARA CONSEGUIR EL INPUT SOLO CON JS*/
        /* 
        event.preventDefault();
        const {query} = Object.fromEntries(new window.FormData(event.target)) 
        console.log({query})
        */ 
    }

    return( 
        <div>
            <header>
                <form onSubmit={handleSubmit}>
                    <label>Ingrese el nombre su pelicula:</label><br></br>
                    <input onChange={handleChange} value={search} ref={inputRef} type="text" placeholder="Ingrese el nombre de la pelicula" id="input" />
                    <button className='btn' type='submit'>Enviar</button>
                </form>
                {error && <p style={{color: 'red'}}>{error}</p>}
            </header>
            <main>
                {
                    loading ? (
                        <p>Cargando...</p>): (
                                anyMovie ? (
                                    <ul className='movies'>
                                        {
                                            moviesResult.map( (movs) => (
                                                <li key={movs.id} className='movie'>
                                                    <h3>{movs.title}</h3>
                                                    <p>{movs.year}</p>
                                                    <img src={movs.poster} alt={movs.title} />
                                                </li>
                                            ))
                                        }
                                    </ul>
                                ): (
                                    <p>No se han encontrado peliculas para esta busqueda</p>  
                                    )
                        )
                }
            </main>
        </div>

    )
}