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

export const getSeancesData = (movieId = '', date = '') => {
  return getData(endpoint.SEANCES, {
    params: {
      movie_id: movieId,
      date: date,
    },
  });
};
