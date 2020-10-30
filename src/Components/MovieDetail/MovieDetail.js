import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ScrollContainer from 'react-indiana-drag-scroll';

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

  const getGenres = (genres) => {
    let limitedGenres = genres && genres.slice(0, 3);
    let result = limitedGenres && limitedGenres.map(genre => <span key={genre.id}>{genre.name}</span>);
    return result;
  }

  const getCastList = (credits) => {
    let limitedCasts = (credits && credits.cast) && credits.cast.slice(0,10);
    let result = limitedCasts && limitedCasts.map(cast => {
      return (
        <div key={cast.cast_id}>
          <div>
            <img src={`${IMGBASEURL}w185/${cast.profile_path}`} alt={cast.name} />
          </div>
          <p className="cast-name">{cast.name}</p>
          <p className="character-name">{cast.character}</p>
        </div>
      )
    });
    return result;
  }

  const getMovieDirector = (credits) => {
    let director = (credits && credits.crew) && credits.crew.find(crew => crew.job.toLowerCase() == 'director');
    if (director) {
      return director.name
    }
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
          <img src={Clock} alt="clock" />
          <p>{movie.runtime} min</p>
        </div>
        <div className="rating">
          <img src={Star} alt="star" />
          <p>{movie.vote_average}<span>/10</span></p>
          <p>{movie.vote_count}</p>
        </div>
        <img src={Play} alt="play" />
      </div>

      <div className="movie-header">
        <h2 className="movie-title">{movie.title}</h2>
        <p>{ getMovieDirector(movie.credits)}</p>
        <div className="movie-detail">
          <p>{movie.adult ? 'R' : 'PG'}</p>
          <p>{ formatDate(movie.release_date) }</p>
        </div>
        <div className="genres">
          <p>{ getGenres(movie.genres) }</p>
        </div>
      </div>

      <div className="summary">
        <h3>Plot Summary</h3>
        <p>{movie.overview}</p>
      </div>

      <h3 className="cast-title">Cast</h3>
      <ScrollContainer horizontal={true} className="scroll-container">
        <div className="cast">
          <div className="cast-list">
            { getCastList(movie.credits) }
          </div>
        </div>
      </ScrollContainer>
    </div>
  );
}

export default MovieDetail;
