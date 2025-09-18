import axios from "axios";
import type { Movie } from "../types/movie";

interface DataHttpResponse {
  results: Movie[];
}

interface MovieParams {
  params: {
    query: string;
  };
  headers: {
    Authorization: string;
  };
}

export async function fetchMovies(searchWord: string): Promise<Movie[]> {
  const url: string = "https://api.themoviedb.org/3/search/movie";
  const options: MovieParams = {
    params: {
      query: searchWord,
    },
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_MOVIE_API_KEY}`,
    },
  };

  const response = await axios.get<DataHttpResponse>(url, options);

  return response.data.results;
}
