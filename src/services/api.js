import axios from 'axios';

const api = import.meta.env.VITE_API;

export async function getAllMoviesData() {
  const response = await axios.get(`${api}/movies`);
  return response.data;
}
