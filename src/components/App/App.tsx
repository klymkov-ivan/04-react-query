import toast, { Toaster } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import { useEffect, useState } from "react";
import MovieGrid from "../MovieGrid/MovieGrid";
import type { Movie } from "../../types/movie";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import ReactPaginate from "react-paginate";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchMovies, type MoviesResponse } from "../../services/movieService";
import css from "./App.module.css";

const errorMessage = () => toast.error("No movies found for your request");

export default function App() {
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [movieSelected, setMovieSelected] = useState<Movie | null>(null);

  const { data, isLoading, isError, isFetching } = useQuery<MoviesResponse>({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: query.trim().length > 0,
    placeholderData: keepPreviousData,
  });

  const movies = data?.results ?? [];
  const totalPages = data?.total_pages ?? 0;

  useEffect(() => {
    if (!isLoading && !isError && query && data && data.total_results === 0) {
      errorMessage();
    }
  }, [data, isLoading, isError, query]);

  function handleSearch(searchFilmName: string) {
    setPage(1);
    setQuery(searchFilmName);
  }

  const openModal = (movie: Movie) => setMovieSelected(movie);
  const closeModal = () => setMovieSelected(null);

  const showGrid = !isLoading && !isError && movies.length > 0;

  return (
    <>
      <SearchBar onSubmit={handleSearch} />

      {totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <ErrorMessage />
      ) : showGrid ? (
        <>
          <MovieGrid onSelect={openModal} movies={movies} />
        </>
      ) : null}

      {isFetching && !isLoading ? <Loader /> : null}

      {movieSelected && (
        <MovieModal movie={movieSelected} onClose={closeModal} />
      )}
      <Toaster />
    </>
  );
}
