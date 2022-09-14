import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getAllMoviesData, getMovieData, getMovieGenresData } from '@/services/api/data.js';

vi.mock('@/services/api/data.js', () => ({
  getAllMoviesData: vi.fn(),
  getMovieData: vi.fn(),
  getMovieGenresData: vi.fn(),
}));

const expectedMovieObject = {
  description:
    'An orphaned boy enrolls in a school of wizardry, where he learns the truth about himself, his family and the terrible evil that haunts the magical world.',
  genre: { id: 3, name: 'Fantasy' },
  id: 1,
  length: 159,
  poster_url: 'https://images-na.ssl-images-amazon.com/images/I/713KEd-8jyL._AC_SL1500_.jpg',
  release_date: '2001-11-16',
  title: "Harry Potter and the Philosopher's Stone",
};

const expectedGenres = [
  { id: 1, name: 'Thriller' },
  { id: 2, name: 'Comedy' },
  { id: 3, name: 'Fantasy' },
  { id: 4, name: 'Sci-Fi' },
  { id: 5, name: 'Romance' },
  { id: 6, name: 'Family' },
  { id: 7, name: 'Horror' },
  { id: 8, name: 'Documentary' },
  { id: 9, name: 'Action' },
];

describe('data.js', () => {
  describe('getAllMoviesData', () => {
    beforeEach(() => {
      getAllMoviesData.mockImplementationOnce(() => Promise.resolve([expectedMovieObject]));
    });

    it('returns all movies data from API', async () => {
      const moviesData = await getAllMoviesData();
      const firstMovieData = moviesData[0];

      expect(firstMovieData).toStrictEqual(expectedMovieObject);
    });
  });
  describe('getMovieData', () => {
    beforeEach(() => {
      getMovieData.mockImplementationOnce(() => Promise.resolve(expectedMovieObject));
    });

    it('returns single movie data from API by given ID', async () => {
      const movieData = await getMovieData(1);

      expect(movieData).toStrictEqual(expectedMovieObject);
    });
  });
  describe('getMovieGenresData', () => {
    beforeEach(() => {
      getMovieGenresData.mockImplementationOnce(() => Promise.resolve(expectedGenres));
    });

    it('returns expected movie genre objects', async () => {
      const genres = await getMovieGenresData();

      expect(genres).toStrictEqual(expectedGenres);
    });
  });
});
