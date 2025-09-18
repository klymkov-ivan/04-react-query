import css from "./SearchBar.module.css";
import toast from "react-hot-toast";

interface SearchBarProps {
  onSubmit: (value: string) => void;
}

const notify = () => toast.error("Please enter your search query");

export default function SearchBar({ onSubmit }: SearchBarProps) {
  function handleSubmit(formData: FormData) {
    const searchName = formData.get("query") as string;

    if (searchName.trim() === "") {
      notify();
      return;
    }
    onSubmit(searchName);
  }

  return (
    <header className={css.header}>
      <div className={css.container}>
        <a
          className={css.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
        <form action={handleSubmit} className={css.form}>
          <input
            className={css.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <button className={css.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
}
