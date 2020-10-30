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
  const upcomingSliderSettings = {
    className: "center",
    centerMode: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    speed: 500,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
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

  const nowplayingSliderSettings = {
    slidesToShow: 9,
    className: "center",
    swipeToSlide: true,
    infinite: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 7,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 5,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2.3,
        }
      }
    ]
  }

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
        <Slider {...upcomingSliderSettings}>
          {
            upcomingMovies.map(movie => {
              return <MovieTile key={movie.id} movie={movie} type="upcoming" />
            })
          }
        </Slider>
      </div>
      <div className="now-playing">
        <h3 className="list-header">Now In Cinemas</h3>
        <Slider {...nowplayingSliderSettings}>
          {
            nowPlayingMovies.map(movie => {
              return <MovieTile key={movie.id} movie={movie} type="nowPlaying" />
            })
          }
        </Slider>
      </div>
    </div>
    
  );
}

export default Dashboard;
