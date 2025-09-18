import toast, { Toaster } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import { useState } from "react";
import MovieGrid from "../MovieGrid/MovieGrid";
import type { Movie } from "../../types/movie";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import { fetchMovies } from "../../services/movieService";

const errorMessage = () => toast.error("No movies found for your request");

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [movieSelected, setMovieSelected] = useState<Movie | null>(null);

  const openModal = (movie: Movie) => {
    setMovieSelected(movie);
  };

  const closeModal = () => {
    setMovieSelected(null);
  };

  async function handleSearch(searchFilmName: string) {
    try {
      setIsError(false);
      setIsLoading(true);

      const res = await fetchMovies(searchFilmName);
      setMovies(res);

      if (res.length === 0) {
        errorMessage();
      }
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <ErrorMessage />
      ) : (
        movies.length > 0 && <MovieGrid onSelect={openModal} movies={movies} />
      )}
      {movieSelected && (
        <MovieModal movie={movieSelected} onClose={closeModal} />
      )}
      <Toaster />
    </>
  );
}
