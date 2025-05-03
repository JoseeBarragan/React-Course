import {useState} from 'react';

function useMovies({ search }){
    const [responseMovies, setResponse] = useState([]);
    const [loading, setLoading] = useState(false);
    const movies = responseMovies.Search;

    const mappedMovies = movies?.map(movie => ({
        id: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        poster: movie.Poster
    }));
    const getMovies = () => {
        if(search){
            (async () => {
                try{
                    setLoading(true);
                    const response = await fetch(`http://www.omdbapi.com/?apikey=e1674c4f&s=${search}`)
                    const data = await response.json();
                    setResponse(data);
                }
                catch(e){
                    console.error(e);
                }
                finally{
                    setLoading(false);
                }
            })();
        }else{
            setResponse(["No se ha encontrado la pelicula"])
        }
    }
    return {movies: mappedMovies, loading,  getMovies}

}
export default useMovies;