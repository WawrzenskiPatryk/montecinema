import axios from 'axios';

const api = import.meta.env.VITE_API;

const endpoint = {
  MOVIES: 'movies',
  GENRES: 'movie_genres',
  SEANCES: 'seances',
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

  const screeningsResponse = await getDataFromApi(exactEndpoint);
  return screeningsResponse.data;
}
