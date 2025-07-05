import styles from './SearchBar.module.css'
import toast, { Toaster } from 'react-hot-toast';

const notify = () => toast('Please enter your search query.');

interface SearchBarProps {
    onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
    const handleSubmit = (formData: FormData) => {
        const query = formData.get("query") as string;

        if (!query.trim()) {
            notify()
            return
        }

        onSubmit(query);
    }

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <a
                    className={styles.link}
                    href="https://www.themoviedb.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by TMDB
                </a>
                <form className={styles.form} action={handleSubmit}>
                    <input
                        className={styles.input}
                        type="text"
                        name="query"
                        autoComplete="off"
                        placeholder="Search movies..."
                        autoFocus
                    />
                    <button className={styles.button} type="submit" >
                        Search
                    </button>
                    <Toaster />
                </form>
            </div>
        </header>
    )
}