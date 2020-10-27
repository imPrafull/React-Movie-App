import React from 'react';
import { useHistory } from 'react-router-dom';

import './MovieTile.css';

import { IMGBASEURL, GENRES } from '../../Shared/Api';

function MovieTile({ movie, type }) {

  const history = useHistory();
  let genres = [];
  movie.genre_ids.forEach(genre_id => {
    let genre = GENRES.find(genre => genre.id === genre_id).name;
    genres.push(genre);
  });

  const handleClick = () => history.push(`/${movie.id}`)

  return (
    <div onClick={handleClick} className={ type === "upcoming" ? "upcoming-movie" : "now-playing"}>
      <div className="poster">
        <img src={`${IMGBASEURL}w300/${movie.poster_path}`} alt={`${movie.title} img`} />
      </div>
      <h4>{movie.title}</h4>
      <p>{genres.slice(0, 3).join(', ')}</p>
    </div>
  );
} 

export default MovieTile;
