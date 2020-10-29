import React, { useState, useEffect} from 'react';

import MovieTile from '../MovieTile/MovieTile';
import { getUpcomingMovies, getNowPlayingMovies } from '../../Shared/Api';
import './Dashboard.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import Icon from '../../Assets/Icons/clapperboard.svg';

function Dashboard() {

  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    // centerPadding: "1px",
    slidesToShow: 1,
    speed: 500
  };

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    getUpcomingMovies()  
      .then(data => {
        if (data.errors) {
          console.log(data.errors[0]);
          return;
        }
        setUpcomingMovies(data.results);
      });

    getNowPlayingMovies()  
      .then(data => {
        if (data.errors) {
          console.log(data.errors[0]);
          return;
        }
        setNowPlayingMovies(data.results);
      });
    
  }

  return (
    <div>
      <div className="header">
        <img src={Icon} />
        <h2 className="appname">Cineplex</h2>
      </div>
      <div>
        <h3 className="list-header">Upcoming Movies</h3>
        <Slider {...settings}>
          {
            upcomingMovies.map(movie => {
              return <MovieTile key={movie.id} movie={movie} type="upcoming" />
            })
          }
        </Slider>
      </div>
      <div className="now-playing">
        <h3 className="list-header">Now In Cinemas</h3>
        <ul className="now-playing-list">
          {
            nowPlayingMovies.map(movie => {
              return <MovieTile key={movie.id} movie={movie} type="nowPlaying" />
            })
          }
        </ul>
      </div>
    </div>
    
  );
}

export default Dashboard;
