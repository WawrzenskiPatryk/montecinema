import defaultClient from '@/services/api/defaultClient.js';
import endpoint from '@/services/api/endpoint.js';

const getData = async (endpoint, params = {}) => {
  const { data } = await defaultClient.get(endpoint, params);
  return data;
};

export const getAllMoviesData = () => getData(endpoint.MOVIES);

export const getMovieData = movieId => getData(`${endpoint.MOVIES}/${movieId}`);

export const getMovieGenresData = () => getData(endpoint.GENRES);

export const getUserData = () => getData(endpoint.USER);

export const getSeancesData = (movie_id = '', date = '') => {
  return getData(endpoint.SEANCES, {
    params: {
      movie_id,
      date,
    },
  });
};

export const getReservationsData = (user_email = '', page = 0, per_page = 25) => {
  return getData(endpoint.RESERVATIONS, {
    params: {
      user_email,
      page,
      per_page,
    },
  });
};
