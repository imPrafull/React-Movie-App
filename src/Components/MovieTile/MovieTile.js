import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import './MovieTile.css';

function MovieTile({ movie, type, genres }) {

  const [mouseMoved, setMouseMoved] = useState(false);
  const [imgBaseUrl, setImgBaseUrl] = useState('http://image.tmdb.org/t/p/');

  const history = useHistory();
  
  useEffect(() => {
    if (localStorage.getItem('CONFIG')) {
      setImgBaseUrl(JSON.parse(localStorage.getItem('CONFIG')).imgBaseUrl);
    }
  }, []);

  let genresToShow = [];
  movie.genre_ids.forEach(genre_id => {
    let genre = genres ? genres.find(genre => genre.id === genre_id).name : [];
    genresToShow.push(genre);
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
      <p>{genresToShow.slice(0, 3).join(', ')}</p>
    </div>
  );
}

export default MovieTile;
