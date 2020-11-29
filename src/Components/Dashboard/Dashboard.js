import React, { useState, useEffect} from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import { useHistory } from "react-router-dom";

import MovieTile from '../MovieTile/MovieTile';
import { httpGet } from '../../Shared/Api';
import './Dashboard.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import Icon from '../../Assets/Icons/clapperboard.svg';

function Dashboard() {

  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const history = useHistory();

  const upcomingSliderSettings = {
    className: "center",
    centerMode: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    speed: 500,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

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
                history.push("/error");
              }
            });

          httpGet('movie/now_playing', {language: 'en-US', page: 1})  
            .then(data => {
              if (data) {
                setNowPlayingMovies(data.results);
              }
              else {
                history.push("/error");
              }
            });
        }
        else {
          history.push("/error");
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
        <Slider {...upcomingSliderSettings}>
          {
            upcomingMovies.map(movie => {
              return <MovieTile key={movie.id} movie={movie} type="upcoming" genres={genres} />
            })
          }
        </Slider>
      </div>
      <div className="now-playing-div">
        <h3 className="list-header">Now In Cinemas</h3>
        <ScrollContainer horizontal={true} className="scroll-container">
          <div className="now-playing-list">
          {
            nowPlayingMovies.map(movie => {
              return <MovieTile key={movie.id} movie={movie} type="nowPlaying" genres={genres} />
            })
          }
          </div>
        </ScrollContainer>
      </div>
    </div>
    
  );
}

export default Dashboard;
