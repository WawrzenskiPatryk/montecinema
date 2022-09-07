import axios from 'axios';

const api = import.meta.env.VITE_API;

export const endpoint = {
  MOVIES: 'movies',
  GENRES: 'movie_genres',
  SEANCES: 'seances',
  USER: 'user',
};

export const defaultClient = axios.create({
  baseURL: api,
  headers: { 'Content-Type': 'application/json' },
});

export async function getAllMoviesData() {
  const moviesResponse = await defaultClient.get(endpoint.MOVIES);
  return moviesResponse.data;
}

export async function getMovieData(movieId) {
  const movieResponse = await defaultClient.get(`${endpoint.MOVIES}/${movieId}`);
  return movieResponse.data;
}

export async function getMovieGenres() {
  const genreResponse = await defaultClient.get(`${endpoint.GENRES}`);
  return genreResponse.data;
}

export async function getSeancesData(movieId = null, date = null) {
  const hasNoQuery = movieId === null && date === null;
  const hasMovieIdQuery = movieId !== null && date === null;
  const hasDateQuery = movieId === null && date !== null;
  const hasAllPossibleQueries = movieId !== null && date !== null;

  let exactEndpoint;

  if (hasNoQuery) {
    exactEndpoint = `${endpoint.SEANCES}`;
  } else if (hasMovieIdQuery) {
    exactEndpoint = `${endpoint.SEANCES}?movie_id=${movieId}`;
  } else if (hasDateQuery) {
    exactEndpoint = `${endpoint.SEANCES}?date=${date}`;
  } else if (hasAllPossibleQueries) {
    exactEndpoint = `${endpoint.SEANCES}?movie_id=${movieId}&date=${date}`;
  }

  const screeningsResponse = await defaultClient.get(exactEndpoint);
  return screeningsResponse.data;
}

export async function getUser() {
  const userResponse = await defaultClient.get(endpoint.USER);
  return userResponse.data;
}
