import axios from 'axios';

const api = import.meta.env.VITE_API;

const endpoint = {
  USERS: 'users',
  TICKET_TYPES: 'ticket_types',
  RESERVATION_STATUSES: 'reservation_statuses',
  SEANCES: 'seances',
  MOVIES: 'movies',
  TICKET_DESKS: 'ticket_desks',
  HALLS: 'halls',
  MOVIE_GENRES: 'movie_genres',
  TICKETS: 'tickets',
  RESERVATIONS: 'reservations',
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
  const movieResponse = await getDataFromApi(endpoint.MOVIES + '/' + movieId);
  return movieResponse.data;
}
