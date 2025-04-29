import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";

import styles from './MovieDetail.module.css';
import Star from '../../assets/icons/star.svg?url';
import Play from '../../assets/icons/play-circle.svg?url';
import Back from '../../assets/icons/back.svg?url';
import Clock from '../../assets/icons/clock.svg?url';
import { httpGet } from '../../shared/api';
import { Movie, Credits } from '../../types/movie';

function MovieDetail() {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [imgBaseUrl, setImgBaseUrl] = useState('');

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const castSlider = {
    modules: [FreeMode],
    slidesPerView: 'auto' as const,
    grabCursor: true,
    freeMode: {
      enabled: true,
      sticky: true,
      momentumBounce: false,
    }
  };

  useEffect(() => {
    const config = localStorage.getItem('CONFIG');
    if (config) {
      setImgBaseUrl(JSON.parse(config).imgBaseUrl);
    }

    const fetchMovieDetail = async () => {
      if (!id) return;
      
      const data = await httpGet<Movie>(`movie/${id}`, { language: 'en-US', append_to_response: 'credits,videos' });
      if (data) {
        setMovie(data);
      } else {
        navigate("/error");
      }
    };
    
    fetchMovieDetail();
  }, [id, navigate]);

  const getGenres = (genres?: { id: number; name: string }[]) => {
    if (!genres) return null;
    const limitedGenres = genres.slice(0, 3);
    return limitedGenres.map(genre => (
      <span key={genre.id}>{genre.name}</span>
    ));
  };

  const getCastList = (credits?: Credits) => {
    if (!credits?.cast) return null;
    const limitedCasts = credits.cast.slice(0, 10);
    return limitedCasts.map(cast => (
      <SwiperSlide key={cast.cast_id}>
        <div className={styles.cast}>
          <img className={styles.pic} src={`${imgBaseUrl}w185/${cast.profile_path}`} alt={cast.name} />
          <p className={styles.name}>{cast.name}</p>
          <p className={styles.characterName}>{cast.character}</p>
        </div>
      </SwiperSlide>
    ));
  };

  const getMovieDirector = (credits?: Credits) => {
    if (!credits?.crew) return null;
    const director = credits.crew.find(crew => crew.job.toLowerCase() === 'director');
    return director?.name;
  };

  const formatDate = (date?: string) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const openTrailer = () => {
    if (!movie?.videos?.results) return;
    const video = movie.videos.results.find(v => v.type === 'Trailer' || v.type === 'Teaser');
    if (video) {
      window.open(`https://www.youtube.com/watch?v=${video.key}`);
    }
  };

  if (!movie) return null;

  return (
    <div>
      <img className={styles.back} onClick={() => navigate(-1)} src={Back} alt="back" />
      <div className={styles.backdrop}>
        <img src={`${imgBaseUrl}w780/${movie.backdrop_path}`} alt={`${movie.title} backdrop`} />
      </div>

      <div className={styles.topBar}>
        <div className={styles.runtime}>
          <img src={Clock} alt="clock" />
          <p>{movie.runtime} min</p>
        </div>
        <div className={styles.rating}>
          <img src={Star} alt="star" />
          <p>{movie.vote_average?.toFixed(1)}<span>/10</span></p>
          <p>{movie.vote_count}</p>
        </div>
        <button className={styles.teaser} onClick={openTrailer}>
          <img src={Play} alt="play" />
        </button>
      </div>

      <div className={styles.movieHeader}>
        <h2 className={styles.movieTitle}>{movie.title}</h2>
        <p>{getMovieDirector(movie.credits)}</p>
        <div className={styles.movieDetail}>
          <p>{movie.adult ? 'R' : 'PG'}</p>
          <p>{formatDate(movie.release_date)}</p>
        </div>
        <div className={styles.genres}>
          <p>{getGenres(movie.genres)}</p>
        </div>
      </div>

      <div className={styles.summary}>
        <h3>Plot Summary</h3>
        <p>{movie.overview}</p>
      </div>

      <h3 className={styles.castTitle}>Cast</h3>
      <Swiper className={styles.castList} {...castSlider}>
        {getCastList(movie.credits)}
      </Swiper>
    </div>
  );
}

export default MovieDetail;