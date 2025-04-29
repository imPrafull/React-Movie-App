import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import 'swiper/css';

import MovieTile from '../../components/MovieTile/MovieTile';
import { httpGet } from '../../shared/api';
import styles from './Dashboard.module.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
const Icon = require('../../assets/icons/clapperboard.svg').default
import { Movie, Genre } from '../../types/movie';

function Dashboard() {
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const navigate = useNavigate();

  const upcomingSlider = {
    centeredSlides: true,
    slidesPerView: 'auto' as const,
    loop: true,
    loopedSlides: 4,
    spaceBetween: 4,
    grabCursor: true,
    updateOnWindowResize: true,
    breakpoints: {
      480: {
        spaceBetween: 32,
      },
      850: {
        centeredSlides: false,
        spaceBetween: 32,
      }
    }
  };

  const nowPlayingSlider = {
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
    fetchList();
  }, []);

  const fetchList = async () => {
    const genresData = await httpGet<{ genres: Genre[] }>('genre/movie/list', { language: 'en-US' });
    
    if (genresData) {
      setGenres(genresData.genres);
      
      const upcomingData = await httpGet<{ results: Movie[] }>('movie/upcoming', { language: 'en-US', page: 1 });
      if (upcomingData) {
        setUpcomingMovies(upcomingData.results);
      } else {
        navigate("/error");
      }

      const nowPlayingData = await httpGet<{ results: Movie[] }>('movie/now_playing', { language: 'en-US', page: 1 });
      if (nowPlayingData) {
        setNowPlayingMovies(nowPlayingData.results);
      } else {
        navigate("/error");
      }
    } else {
      navigate("/error");
    }
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <img src={Icon} alt="icon" />
        <h2 className={styles.appname}>MoviesNow</h2>
      </div>
      <div>
        <h3 className={styles.listHeader}>Upcoming Movies</h3>
        <Swiper className={styles.upcomingMovies} {...upcomingSlider}>
          {upcomingMovies.map(movie => (
            <SwiperSlide key={movie.id}>
              <MovieTile movie={movie} type="upcoming" genres={genres} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className={styles.nowPlayingDiv}>
        <h3 className={styles.listHeader}>Now In Cinemas</h3>
        <Swiper className={styles.nowPlayingList} {...nowPlayingSlider}>
          {nowPlayingMovies.map(movie => (
            <SwiperSlide key={movie.id}>
              <MovieTile movie={movie} type="nowPlaying" genres={genres} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Dashboard