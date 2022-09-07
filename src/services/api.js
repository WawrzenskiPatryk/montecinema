import axios from 'axios';
import router from '@/router';
import { useAuthStore } from '../store/auth';

export const defaultClient = axios.create({
  baseURL: import.meta.env.VITE_API,
  headers: { 'Content-Type': 'application/json' },
});

defaultClient.interceptors.response.use(
  response => response,
  async error => {
    if (error.response.status === 401) {
      const auth = useAuthStore();
      await auth.logout();
      router.push({ name: 'LoginPage' });
    }
    return Promise.reject(error);
  }
);

export const endpoint = {
  MOVIES: '/movies',
  GENRES: '/movie_genres',
  SEANCES: '/seances',
  USER: '/user',
  LOGIN: '/login',
  REGISTER: '/register',
};

export function setAuthHeader(authHeader) {
  defaultClient.defaults.headers.common['Authorization'] = authHeader;
}

export function removeAuthHeader() {
  delete defaultClient.defaults.headers.common['Authorization'];
}

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

export async function login(credentials) {
  const loginResponse = await defaultClient.post(endpoint.LOGIN, {
    user: {
      email: credentials.email,
      password: credentials.password,
    },
  });
  return loginResponse;
}

export async function register(credentials) {
  const registerResponse = await defaultClient.post(endpoint.REGISTER, {
    user: {
      email: credentials.email,
      password: credentials.password,
      date_of_birth: '1990-01-01',
    },
  });
  return registerResponse;
}
