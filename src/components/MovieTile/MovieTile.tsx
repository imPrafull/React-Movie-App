import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MovieTile.module.css';
import { Movie, Genre } from '../../types/movie';

interface MovieTileProps {
  movie: Movie;
  type: 'upcoming' | 'nowPlaying';
  genres: Genre[];
}

function MovieTile({ movie, type, genres }: MovieTileProps) {
  const [imgBaseUrl, setImgBaseUrl] = useState('http://image.tmdb.org/t/p/');
  const navigate = useNavigate();
  
  useEffect(() => {
    const config = localStorage.getItem('CONFIG');
    if (config) {
      setImgBaseUrl(JSON.parse(config).imgBaseUrl);
    }
  }, []);

  const genresToShow = movie.genre_ids.map(genre_id => {
    const genre = genres?.find(genre => genre.id === genre_id);
    return genre ? genre.name : '';
  }).filter(Boolean);

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  const containerClass = type === "upcoming" ? styles.upcomingMovie : styles.nowPlaying;

  return (
    <div
      onClick={handleClick}
      className={`${containerClass} ${styles.mtContainer}`}
    >
      <img className={styles.poster} src={`${imgBaseUrl}w300/${movie.poster_path}`} alt={`${movie.title} img`} />
      <h4 className={styles.title}>{movie.title}</h4>
      <p className={styles.genres}>{genresToShow.slice(0, 3).join(', ')}</p>
    </div>
  );
}

export default MovieTile;