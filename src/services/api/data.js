import defaultClient from '@/services/api/defaultClient.js';
import endpoint from '@/services/api/endpoint.js';

export async function getAllMoviesData() {
  const moviesResponse = await defaultClient.get(endpoint.MOVIES);
  return moviesResponse.data;
}

export async function getMovieData(movieId) {
  const movieResponse = await defaultClient.get(`${endpoint.MOVIES}/${movieId}`);
  return movieResponse.data;
}

export async function getMovieGenresData() {
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

export async function getUserData() {
  const userResponse = await defaultClient.get(endpoint.USER);
  return userResponse.data;
}