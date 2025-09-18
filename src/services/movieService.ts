import axios from "axios";
import type { Movie } from "../types/movie";

export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

interface MovieParams {
  params: {
    query: string;
    page: number;
  };
  headers: {
    Authorization: string;
  };
}

export async function fetchMovies(
  searchWord: string,
  page: number
): Promise<MoviesResponse> {
  const url = "https://api.themoviedb.org/3/search/movie";
  const options: MovieParams = {
    params: {
      query: searchWord,
      page,
    },
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_MOVIE_API_KEY}`,
    },
  };

  const { data } = await axios.get<MoviesResponse>(url, options);
  return data;
}
