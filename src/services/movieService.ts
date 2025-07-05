import type { Movie } from '../types/movie'
const myToken = import.meta.env.VITE_TMDB_TOKEN;
import axios from 'axios';

interface FetchMoviesResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
  }

export default async function fetchMovies(query: string): Promise<FetchMoviesResponse> {
    const baseURL = 'https://api.themoviedb.org/3';
    const endPoint = '/search/movie';
    const url = baseURL + endPoint;
         
    const params = {
        query,
    };
         
    const headers = {
        Authorization: `Bearer ${myToken}`,
    };
         
    const res = await axios.get<FetchMoviesResponse>(url, { headers, params });
    return res.data;
};
    
