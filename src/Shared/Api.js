const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;
const BASEURL = 'https://api.themoviedb.org/3/';

export async function httpGet(endpoint, queryParams = null) {
  let url = queryParams
  ? `${BASEURL}${endpoint}?api_key=${API_KEY}&${new URLSearchParams(queryParams)}`
  : `${BASEURL}${endpoint}?api_key=${API_KEY}`;
  let response = await fetch(url)
    .catch(err => {console.log(err)});
  let data = response ? await response?.json() : {errors : ['Failed to fetch']};
  return data;
}