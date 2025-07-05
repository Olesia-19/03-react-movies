import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import fetchMovies from '../../services/movieService';
import type { Movie } from '../../types/movie';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';

const notify = () => toast('No movies found for your request.');

export default function App() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

    const handleSearch = async (query: string) => {        
        try {
            setIsError(false);
            setMovies([]);
            setIsLoading(true);
            const data = await fetchMovies(query);
            if (data.results.length === 0) {
                notify()
                return
            }
            setMovies(data.results)
        } catch {
            setIsError(true);
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <>
            <SearchBar onSubmit={handleSearch} />
            <Toaster />            
            {isLoading ? <Loader /> : <MovieGrid movies={movies} onSelect={setSelectedMovie } />}
            {isError && <ErrorMessage />}
            {selectedMovie && (
            <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
            )}
        </>
    ) 
}