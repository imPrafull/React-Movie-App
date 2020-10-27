const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;
const BASEURL = 'https://api.themoviedb.org/3/';
export var IMGBASEURL = '';
export var GENRES = {};

export async function getUpcomingMovies() {
  let response = await fetch(`${BASEURL}movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`)
    .catch(err => {console.log(err)});
  let data = response ? await response?.json() : {errors : ['Failed to fetch']};
  return data;
}

export async function getNowPlayingMovies() {
  let response = await fetch(`${BASEURL}movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`)
    .catch(err => {console.log(err)});
  let data = response ? await response?.json() : {errors : ['Failed to fetch']};
  return data;
}

export async function getMovieDetail(movieId) {
  let response = await fetch(`${BASEURL}movie/${movieId}?api_key=${API_KEY}&language=en-US&append_to_response=credits`)
    .catch(err => {console.log(err)});
  let data = response ? await response?.json() : {errors : ['Failed to fetch']};
  return data;
}

export async function getConfig() {
  let response = await fetch(`${BASEURL}configuration?api_key=${API_KEY}`)
    .catch(err => {console.log(err)});
  let data = response ? await response?.json() : {errors : ['Failed to fetch']};
  IMGBASEURL = data.images.base_url
  return data;
}

export async function getGenres() {
  let response = await fetch(`${BASEURL}genre/movie/list?api_key=${API_KEY}&language=en-US`)
    .catch(err => {console.log(err)});
  let data = response ? await response?.json() : {errors : ['Failed to fetch']};
  GENRES = data.genres;
  return data;
}