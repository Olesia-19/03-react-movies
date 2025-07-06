import css from './MovieModal.module.css';
import { createPortal } from "react-dom";
import type { Movie } from '../../types/movie';
import { useEffect } from 'react';

interface MovieModalProps {
    movie: Movie;
    onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = "";
        }
    }, [onClose]);

    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    return createPortal(
        <div className={css.backdrop} role="dialog" aria-modal="true" onClick={handleBackdropClick}>
            <div className={css.modal}>
                <button className={css.closeButton} aria-label="Close modal" onClick={onClose}>
                    &times;
                </button>
                <img
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                    alt={movie.title}
                    className={css.image}
                />
                <div className={css.content}>
                    <h2>{movie.title}</h2>
                    <p>{movie.overview}</p>
                    <p>
                        <strong>Release Date:</strong> {movie.release_date}
                    </p>
                    <p>
                        <strong>Rating:</strong> {movie.vote_average}
                    </p>
                </div>
            </div>
        </div>, document.body
    );
}