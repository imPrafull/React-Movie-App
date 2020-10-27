import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './MovieDetail.css';
import Star from '../../Assets/Icons/star.svg';
import Play from '../../Assets/Icons/play-circle.svg';
import Clock from '../../Assets/Icons/clock.svg';
import { getMovieDetail } from '../../Shared/Api';
import { IMGBASEURL } from '../../Shared/Api';

function MovieDetail() {
  const [ movie, setMovie] = useState({});
  let { id } = useParams();

  useEffect(() => {
    fetchMovieDetail();
  }, []);
  
  const fetchMovieDetail = async () => {
    getMovieDetail(id)  
      .then(data => {
        if (data.errors) {
          console.log(data.errors[0]);
          return;
        }
        setMovie(data);
      });
  }

  const formatDate = (date) => {
    return (new Date(date).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'}))
  }

  return (
    <div>
      <div className="backdrop">
        <img src={`${IMGBASEURL}w780/${movie.backdrop_path}`} alt={`${movie.title} img`} />
      </div>
      <div className="top-bar">
        <div className="runtime">
          <img src={Clock} />
          <p>{movie.runtime} min</p>
        </div>
        <div className="rating">
          <img src={Star} />
          <p>{movie.vote_average}<span>/10</span></p>
          <p>{movie.vote_count}</p>
        </div>
        <img src={Play} />
      </div>
      <div className="movie-header">
        <h1 className="movie-title">{movie.title}</h1>
        <div className="movie-detail">
          <p>PG</p>
          <p>{formatDate(movie.release_date)}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
