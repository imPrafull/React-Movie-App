import React, { useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import 'swiper/css'

import MovieTile from '../MovieTile/MovieTile';
import { httpGet } from '../../Shared/Api';
import './Dashboard.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Icon from '../../Assets/Icons/clapperboard.svg';

function Dashboard() {

  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();

  const upcomingSlider = {
    centeredSlides: true,
    slidesPerView: 'auto',
    loop: true,
    loopedSlides: 4,
    spaceBetween: 4,
    grabCursor: true,
    updateOnWindowResize: true,
    breakpoints: {
      480: {
        spaceBetween: 32,
      }
    },
    onAfterInit: (e) => {
      setTimeout(() => {
        e.slideTo(0, 200)
      }, 200);
    }
  }

  const nowPlayingSlider = {
    modules: [ FreeMode ],
    slidesPerView: 'auto',
    grabCursor: true,
    freeMode: {
      enabled: true,
      sticky: true,
      momentumBounce: false,
    }
  }

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {

    httpGet('genre/movie/list', {language: 'en-US'})
      .then(data => {
        if (data) {
          setGenres(data.genres);
          httpGet('movie/upcoming', {language: 'en-US', page: 1})  
            .then(data => {
              if (data) {
                setUpcomingMovies(data.results);
              }
              else {
                navigate("/error");
              }
            });

          httpGet('movie/now_playing', {language: 'en-US', page: 1})  
            .then(data => {
              if (data) {
                setNowPlayingMovies(data.results);
              }
              else {
                navigate("/error");
              }
            });
        }
        else {
          navigate("/error");
        }
      });
    
  }

  return (
    <div className="dashboard">
      <div className="header">
        <img src={Icon} alt="icon" />
        <h2 className="appname">Cineplex</h2>
      </div>
      <div>
        <h3 className="list-header">Upcoming Movies</h3>
        <Swiper {...upcomingSlider}>
          {
            upcomingMovies.map(movie => {
              return (
                <SwiperSlide key={movie.id}>
                  <MovieTile movie={movie} type="upcoming" genres={genres} />
                </SwiperSlide>
              )
            })
          }
        </Swiper>
      </div>
      <div className="now-playing-div">
        <h3 className="list-header">Now In Cinemas</h3>
        <Swiper className='now-playing-list' {...nowPlayingSlider}>
          {
            nowPlayingMovies.map(movie => {
              return (
                <SwiperSlide key={movie.id}>
                  <MovieTile movie={movie} type="nowPlaying" genres={genres} />
                </SwiperSlide>
              )
            })
          }
        </Swiper>
      </div>
    </div>
    
  );
}

export default Dashboard;
