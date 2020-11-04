import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import './MovieTile.css';

import { GENRES } from '../../Shared/Api';

function MovieTile({ movie, type }) {

  const [mouseMoved, setMouseMoved] = useState(false);
  const [imgBaseUrl, setImgBaseUrl] = useState('');

  const history = useHistory();
  
  useEffect(() => {
    setImgBaseUrl(localStorage.getItem('IMG_BASE_URL'));
  }, []);

  let genres = [];
  movie.genre_ids.forEach(genre_id => {
    let genre = GENRES ? GENRES.find(genre => genre.id === genre_id).name : [];
    genres.push(genre);
  });


  const handleClick = () => {
    if (!mouseMoved) {
      history.push(`/${movie.id}`)
    }
  }

  return (
    <div
      onClick={handleClick}
      className={type === "upcoming" ? "upcoming-movie" : "now-playing"}
      onMouseMove={() => setMouseMoved(true)}
      onMouseDown={() => setMouseMoved(false)}
      onMouseUp={() => handleClick()} >
      <div className="poster">
        <img src={`${imgBaseUrl}w300/${movie.poster_path}`} alt={`${movie.title} img`} />
      </div>
      <h4>{movie.title}</h4>
      <p>{genres.slice(0, 3).join(', ')}</p>
    </div>
  );
}

export default MovieTile;
