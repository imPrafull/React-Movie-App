import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './MovieTile.css';

function MovieTile({ movie, type, genres }) {

  // const [mouseMoved, setMouseMoved] = useState(false);
  const [imgBaseUrl, setImgBaseUrl] = useState('http://image.tmdb.org/t/p/');

  const navigate = useNavigate();
  
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
    navigate(`/movie/${movie.id}`)
  }

  return (
    <div
      onClick={handleClick}
      className={`${type === "upcoming" ? "upcoming-movie" : "now-playing"} mt-container`}
      onMouseUp={() => handleClick()} >
        <img className='poster' src={`${imgBaseUrl}w300/${movie.poster_path}`} alt={`${movie.title} img`} />
      <h4 className='title'>{movie.title}</h4>
      <p className='genres'>{genresToShow.slice(0, 3).join(', ')}</p>
    </div>
  );
}

export default MovieTile;
