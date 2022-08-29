import axios from 'axios';

const api = import.meta.env.VITE_API;

const endpoint = {
  MOVIES: 'movies',
  GENRES: 'movie_genres',
};

async function getDataFromApi(endpoint) {
  const response = await axios.get(`${api}/${endpoint}`);
  return response;
}

export async function getAllMoviesData() {
  const moviesResponse = await getDataFromApi(endpoint.MOVIES);
  return moviesResponse.data;
}

export async function getMovieData(movieId) {
  const movieResponse = await getDataFromApi(`${endpoint.MOVIES}/${movieId}`);
  return movieResponse.data;
}

export async function getMovieGenres() {
  const genreResponse = await getDataFromApi(`${endpoint.GENRES}`);
  return genreResponse.data;
}
